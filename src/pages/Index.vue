<template>
  <q-page class="flex" @click="handleClick">
    <transition
      :enter-active-class="enterClassName"
      :leave-active-class="leaveClassName"
      @after-leave="hide"
    >
      <div
        v-show="!$q.loading.isActive"
        class="row full-width items-center justify-around content-around"
        v-touch-swipe="handleSwipe"
      >
        <q-page-sticky :offset="[9, 9]" position="top-right" style="opacity: .3">
          <q-chip :label="pageChip" dense></q-chip>
        </q-page-sticky>
        <div class="col-6">
          <q-card class="q-ma-sm flex" flat>
            <q-img
              :src="image + '?t=' + Math.random()"
              @load="reveal"
              contain
              basic
              v-on="image ? { error: cdnProblem } : {}"
              style="max-height:90vh"
            ></q-img>
          </q-card>
        </div>
        <div class="col-6 col-md-4 col-lg-3 col-xl-2">
          <q-card class="q-ma-sm" flat bordered>
            <q-card-section>{{text}}</q-card-section>
          </q-card>
        </div>
      </div>
    </transition>
  </q-page>
</template>

<script>
// '/' index page of the website.
// Fetches the list of some pages that has both the story and images.
// Interactively, page keeps loading the next/prev image and story text.

let compHidePromResFunc;

import { animation } from "../mixin/constants.js";
import { navigation } from "../mixin/navigation.js";
import { errors } from "../mixin/errors.js";

export default {
  name: "IndexPage",
  mixins: [navigation, errors],
  props: { updateLayout: Object },
  data() {
    return {
      // Animation names/types for transition element
      enterClassName: animation.in.enter,
      leaveClassName: animation.in.leave,

      // Page url list fetched from list.json
      list: [],

      // Fetched content
      image: "",
      text: "",

      // Current page
      page: 0,
      pageChip: "",

      // Notification object
      notify: undefined,

      // Promises array to synchronize transition with fetches
      proms: []
    };
  },
  watch: {
    // URL change triggers new page load
    "$route.params.id": function(newId, oldId) {
      this.page = Number(newId ? newId : "");
      this.page = this.page < 2 ? 1 : this.page;
      this.fetch(this.page, this.page > Number(oldId));
    },

    // Triggered when sticky button first/last page clicked
    "updateLayout.page": function(newPage, oldPage) {
      if (newPage > oldPage) this.last();
      else this.first();
    },

    // Page amount is used in parent component to show/hide last page number
    "list.length": function(val) {
      this.updateLayout.lastPage = this.list.length;
    }
  },
  methods: {
    // Updates progress bar buffer in layout, shows loading plugin, decides which direction should queried

    fetchThen(querySnapshots, page) {
      // Get page count if have not already
      let pageDoc = querySnapshots.find(value => "exists" in value);
      if (pageDoc.exists === true) {
        let docData = pageDoc.data();
        if (Number.isInteger(docData.count) && docData.count > 0)
          this.list = Array(docData.count).fill(undefined);
        else {
          this.notFound("Index Page could not fetch number of pages.");
          return;
        }
      } else {
        this.notFound("Index Page could not fetch number of pages.");
        return;
      }

      // Get content from firestore query object
      let docs = querySnapshots.find(value => "empty" in value);
      if (docs.empty === false) {
        let doc = docs.docs.find(value => "exists" in value);
        if (doc.exists === true) this.list[page - 1] = doc;
        else {
          this.notFound(
            "Index Page could not fetch detail of page number: " + page
          );
          return;
        }
      } else {
        this.notFound(
          "Index Page could not fetch detail of page number: " + page
        );
        return;
      }

      // Update content
      ({ image: this.image, text: this.text } = this.list[page - 1].data());

      // Empty promises array for next transition/fetch
      this.proms = [];
    },

    // page: to be fetched: Number
    // isNewBigger: direction for query: Boolean
    fetch(page, isNewBigger) {
      this.$q.loading.show();
      this.updateLayout.buffer =
        this.list.length > 0 ? page / this.list.length : 0;

      // Fetch if page never fetched before
      if (!this.list[page - 1]) {
        // Fetch if first or last page is needed
        if (page === 1 || page === this.list.length) {
          this.proms.push(
            this.$db
              .collection("pages")
              .orderBy("id", page === 1 ? "asc" : "desc")
              .limit(1)
              .get()
          );
        }
        // Fetch if the previous page is already fetched
        else if (
          (isNewBigger && this.list[page - 2]) ||
          (!isNewBigger && this.list[page + 1])
        ) {
          this.proms.push(
            this.$db
              .collection("pages")
              .orderBy("id", isNewBigger ? "asc" : "desc")
              .startAfter(this.list[isNewBigger ? page - 2 : page + 1])
              .limit(1)
              .get()
          );
        }
        // Fetch if none of the above; nothing known accept page number
        else {
          this.proms.push(
            this.$db
              .collection("pages")
              .where("id", "==", page)
              .limit(1)
              .get()
          );
        }
      }

      Promise.all(this.proms)
        .catch(this.connectionError)
        .then((querySnapshots, page) => this.fetchThen(querySnapshots, page));
    },

    // Triggers when first div under transition leaves the page, hides notification and starts fetching content
    hide() {
      if (typeof this.notify === "function") this.notify();

      // Resolve manual transition promise
      compHidePromResFunc("resolve");
    },

    // Triggers image loaded, updates progress bar and page chip in layout and hide loading plugin
    reveal() {
      this.updateLayout.value = this.page / this.list.length;
      this.pageChip = this.page + "/" + this.list.length;
      this.$q.loading.hide();

      // Setup next manual promise for transitions
      this.proms.push(
        new Promise((resolve, reject) => (compHidePromResFunc = resolve))
      );
    },

    // Updates transition effect with the param
    // Param list is const animation
    animationDirection(direction) {
      this.enterClassName = direction.enter;
      this.leaveClassName = direction.leave;
    },

    // Triggers prev page loading if page exists or notifies, updates animation with param
    prev(direction) {
      if (this.page > 1) {
        this.animationDirection(direction);
        this.$router.push("/" + (this.page < 3 ? "" : this.page - 1));
      } else this.notifyShow("You are looking at first page =]");
    },

    // Triggers next page loading if page exists or notifies, updates animation with param
    next(direction) {
      if (this.page < this.list.length) {
        this.animationDirection(direction);
        this.$router.push("/" + (this.page + 1));
      } else
        this.notifyShow(
          "Last page sadly =[ Yo want more of me? Use reveal me button =]"
        );
    },

    // Triggers first page loading if it can or notifies, updates animation with param
    first() {
      if (this.page !== 1) {
        this.animationDirection(animation.in);
        this.$router.push("/");
      } else this.notifyShow("You are looking at first page =]");
    },

    // Triggers last page loading if it can or notifies, updates animation with param
    last() {
      if (this.page !== this.list.length) {
        this.animationDirection(animation.in);
        this.$router.push("/" + this.list.length);
      } else
        this.notifyShow(
          "Last page sadly =[ Yo want more of me? Use reveal me button =]"
        );
    },

    // Triggers notify and prepares its destruction
    notifyShow(message) {
      if (typeof this.notify !== "function") {
        this.notify = this.$q.notify({
          message: message,
          position: "top-right",
          onDismiss: () => (this.notify = undefined)
        });
      }
    }
  },
  created() {
    this.$q.loading.show();

    // Fetches page count
    this.proms.push(
      this.$db
        .collection("pages")
        .doc("data")
        .get()
    );

    window.addEventListener("keyup", this.handleKey);
    window.addEventListener("wheel", this.handleWheel);

    // Fetch first page
    this.page = Number(this.$route.params.id ? this.$route.params.id : "");
    if (this.page === 1) {
      this.$router.push("/");
    } else {
      this.page = this.page < 2 ? 1 : this.page;
      this.fetch(this.page, true);
    }
  },
  destroyed() {
    window.removeEventListener("keyup", this.handleKey);
    window.removeEventListener("wheel", this.handleWheel);
    if (typeof this.notify === "function") this.notify();
    this.updateLayout.value = this.updateLayout.buffer = 0;
  },
  beforeRouteUpdate(to, from, next) {
    if (!this.$q.loading.isActive || (to.path === "/" && from.path === "/1")) {
      next();
    } else next(false);
  },
  beforeRouteLeave(to, from, next) {
    if (this.$q.loading.isActive) {
      next(false);
    } else next();
  }
};
</script>