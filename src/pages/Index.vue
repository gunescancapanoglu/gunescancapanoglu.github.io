<template>
  <q-page class="no-overlay flex" style="min-height:100vh;">
    <transition
      :enter-active-class="enterClassName"
      :leave-active-class="leaveClassName"
      @after-leave="hide"
    >
      <div
        v-show="!$q.loading.isActive"
        class="full-width row items-center justify-evenly"
        v-touch-swipe="handleSwipe"
      >
        <div class="absolute-center full-width full-height row">
          <router-link :to="prevLink" class="col-7" @click.native.prevent="prev" event></router-link>
          <router-link :to="nextLink" class="col-5" @click.native.prevent="next" event></router-link>
        </div>
        <router-link :to="prevLink" class="col-7" @click.native.prevent="prev" event>
          <q-card :class="marginByScreen" flat>
            <q-carousel
              v-model="slide"
              :autoplay="frequency"
              @before-transition="beforeCarouselTransition"
              infinite
              navigation
              height="100%"
              navigation-icon="mdi-circle"
            >
              <q-carousel-slide
                v-for="(image, index) in images"
                :key="index"
                :name="index"
                style="padding:0;"
              >
                <ImageComponent
                  :ratio="2/3"
                  :src="image"
                  @load="reveal"
                  contain
                  inlineStyle="max-height:100vh;"
                  q
                ></ImageComponent>
              </q-carousel-slide>
            </q-carousel>
          </q-card>
        </router-link>
        <router-link
          :to="nextLink"
          class="col-5"
          @click.native.prevent="next"
          style="text-decoration:none;color:rgb(0,0,0);"
          event
        >
          <q-card :bordered="!$q.screen.xs" :class="marginByScreen" flat>
            <q-card-section :style="$q.screen.xs ? 'padding:0;': ''">
              <div v-html="text"></div>
            </q-card-section>
          </q-card>
        </router-link>
        <q-page-sticky :offset="[9, 9]" position="top-right" style="opacity:.3">
          <q-chip :label="pageChip" dense></q-chip>
        </q-page-sticky>
      </div>
    </transition>
  </q-page>
</template>

<script>
// '/' index page of the website.
// Fetches the list of some pages that has both the story and images.
// Dynamically, page keeps loading the next/prev image and story text.

let compHidePromResFunc;

import ImageComponent from "components/Image.vue";

import { animation } from "../mixins/constants.js";
import { navigation } from "../mixins/navigation.js";
import { errors } from "../mixins/errors.js";
import { utils } from "../mixins/utils.js";

export default {
  name: "IndexPage",
  mixins: [navigation, errors, utils],
  components: { ImageComponent },
  props: { updateLayout: Object },
  data() {
    return {
      // Animation names/types for transition element.
      enterClassName: animation.in.enter,
      leaveClassName: animation.in.leave,

      // Raw page url list.
      list: [],

      // Content.
      images: [],
      text: "",

      // Current page.
      page: 0,
      pageChip: "",

      // Notification object.
      notify: undefined,

      // Promises array to synchronize transition with fetches.
      proms: [],

      // Selected carousel slide.
      slide: 0,

      // Whether carousel is revealed.
      isRevealed: false,

      // Carousel frequency.
      frequency: 0
    };
  },
  computed: {
    marginByScreen() {
      return {
        "q-mx-xs": this.$q.screen.xs,
        "q-mx-sm": this.$q.screen.sm,
        "q-mx-md": this.$q.screen.md,
        "q-mx-lg": this.$q.screen.lg,
        "q-mx-xl": this.$q.screen.xl
      };
    },

    curLink() {
      let tmp = "/";
      if (
        this.page > 1 &&
        this.page <= this.list.length &&
        this.list.length > 0 &&
        this.list[this.page - 1] !== undefined
      )
        tmp =
          tmp +
          this.page +
          "-" +
          this.generateLink(this.list[this.page - 1].title);
      return tmp;
    },
    prevLink() {
      let tmp = "/";
      if (
        this.page > 2 &&
        this.list.length > 0 &&
        this.list[this.page - 2] !== undefined
      )
        tmp =
          tmp +
          (this.page - 1) +
          "-" +
          this.generateLink(this.list[this.page - 2].title);
      return tmp;
    },
    nextLink() {
      let tmp = "/";
      if (
        this.page <= this.list.length &&
        this.list.length > 0 &&
        this.list[this.page] !== undefined
      )
        tmp =
          tmp +
          (this.page + 1) +
          "-" +
          this.generateLink(this.list[this.page].title);
      return tmp;
    }
  },
  watch: {
    // URL change triggers new page load.
    "$route.params.id": function(newId) {
      newId = Number(newId.split("-")[0]);
      this.page = Number(newId ? newId : "");
      this.page = this.page < 2 ? 1 : this.page;
      this.fetch();
    },

    // Triggered when sticky button first/last page clicked.
    "updateLayout.page": function(newPage, oldPage) {
      if (newPage > oldPage) this.last();
      else this.first();
    },

    // Page amount is used in parent component to show/hide last page number.
    "list.length": function(val) {
      this.updateLayout.lastPage = this.list.length;
    }
  },
  methods: {
    // querySnapshots: fetched firestore: object.
    fetchThen(querySnapshots) {
      // Get page count if have not already.
      let pageDoc = querySnapshots.find(value => "exists" in value);
      if (pageDoc && pageDoc.exists === true) {
        let docData = pageDoc.data();
        if (Number.isInteger(docData.count) && docData.count > 0)
          this.list = Array(docData.count).fill(undefined);
        else
          return this.notFound("Index Page could not fetch number of pages.");
      } else if (this.list.length < 1)
        return this.notFound("Index Page could not fetch number of pages.");

      // Get content from firestore query object.
      let docs = querySnapshots.find(value => "empty" in value);
      if (docs && docs.empty === false) {
        let tempList = [];
        docs.docs
          .filter(value => "exists" in value && value.exists === true)
          .forEach(doc => tempList.push(doc.data()));
        if (tempList.length < 1)
          return this.notFound(
            "Index Page could not fetch detail of page number: " + this.page
          );
        tempList.forEach(x => this.list.splice(x.id - 1, 1, x));
      } else if (this.list[this.page - 1] === undefined)
        return this.notFound(
          "Index Page could not fetch detail of page number: " + this.page
        );

      // Update content.
      let tmp = (this.images = []);
      ({ images: tmp, text: this.text, title: document.title } = this.list[
        this.page - 1
      ]);
      this.images.push(...tmp);
      if (this.$route.path !== this.curLink)
        history.pushState({}, null, this.curLink);

      // Empty promises array for next transition/fetch.
      this.proms = [];
      this.isRevealed = false;
      this.slide = 0;
    },

    fetch() {
      // Prepare for fetching.
      this.$q.loading.show();
      this.updateLayout.buffer =
        this.list.length > 0 ? this.page / this.list.length : 0;
      this.slide = -1;

      // Filter non-cached items to fetch.
      let requestedList = [this.page - 1, this.page, this.page + 1].filter(
        x => x > 0
      );
      let cachedList = this.list
        .filter(page => (page ? requestedList.includes(page.id) : false))
        .map(x => x.id);
      requestedList = requestedList.filter(
        idCached => !cachedList.includes(idCached)
      );

      if (requestedList.length > 0)
        this.proms.push(
          this.$db
            .collection("pages")
            .where("id", "in", requestedList)
            .get()
        );

      // Rid of manual promise and handle responses.
      Promise.all(this.proms)
        .catch(this.connectionError)
        .then(querySnapshots =>
          this.fetchThen(querySnapshots.filter(value => value !== "resolve"))
        );
    },

    // Triggers when first div under transition leaves the page,
    // hides notification and starts fetching content.
    hide() {
      // Used to reset carousel slide changing frequency.
      this.frequency = 0;

      // Close notification.
      if (typeof this.notify === "function") this.notify();

      // Resolve manual transition promise.
      compHidePromResFunc(Promise.resolve("resolve"));
    },

    // Triggers image loaded, updates progress bar and
    // page chip in layout and hide loading plugin.
    reveal() {
      // Used to reset carousel slide changing frequency.
      this.frequency = 32000 / this.images.length;
      if (!this.isRevealed) {
        this.updateLayout.value = this.page / this.list.length;
        this.pageChip = this.page + "/" + this.list.length;
        this.$q.loading.hide();

        // Setup next manual promise for transitions.
        this.proms.push(
          new Promise((resolve, reject) => (compHidePromResFunc = resolve))
        );
        this.isRevealed = true;
      }
    },

    // Used to reset carousel slide changing frequency.
    // Without it browser will spend carousel time to loading the image.
    beforeCarouselTransition() {
      this.frequency = 0;
    },

    // Updates transition effect with the param.
    // Param list is const animation.
    animationDirection(direction) {
      this.enterClassName = direction.enter;
      this.leaveClassName = direction.leave;
    },

    // Triggers prev page loading if page exists or notifies,
    // updates animation with param.
    prev(direction = animation.in) {
      if (!direction || !direction.enter || !direction.leave)
        direction = animation.in;
      if (this.page > 1) {
        this.animationDirection(direction);
        this.$router.push(this.prevLink);
      } else this.notifyShow("You are looking at first page =]");
    },

    // Triggers next page loading if page exists or notifies,
    // updates animation with param.
    next(direction = animation.in) {
      if (!direction || !direction.enter || !direction.leave)
        direction = animation.in;
      if (this.page < this.list.length) {
        this.animationDirection(direction);
        this.$router.push(this.nextLink);
      } else
        this.notifyShow(
          "Last page sadly =[, use the button down below on the right side for more!"
        );
    },

    // Triggers first page loading if it can or notifies,
    // updates animation with param.
    first() {
      if (this.page !== 1) {
        this.animationDirection(animation.in);
        this.$router.push("/");
      } else this.notifyShow("You are looking at first page =]");
    },

    // Triggers last page loading if it can or notifies,
    // updates animation with param.
    last() {
      if (this.page !== this.list.length) {
        this.animationDirection(animation.in);
        this.$router.push("/" + (this.list.length > 0 ? this.list.length : ""));
      } else
        this.notifyShow(
          "Last page sadly =[ Yo want more of me? Use reveal me button =]"
        );
    },

    // Triggers notify and prepares its destruction.
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

    // Fetches page count.
    this.proms.push(
      this.$db
        .collection("pages")
        .doc("data")
        .get()
    );

    window.addEventListener("keyup", this.handleKey);
    window.addEventListener("wheel", this.handleWheel);

    // Fetch first page.
    let id = Number(this.$route.params.id.split("-")[0]);
    this.page = Number(id ? id : "");
    if (this.page === 1) {
      this.$router.push("/");
    } else {
      this.page = this.page < 2 ? 1 : this.page;
      this.fetch();
    }
  },

  updated() {
    // a tags kept for proper indexing
    // Without changing page

    // URLs in text prevented to trigger page change event
    // instead opens links in new pages
    document.querySelectorAll("a.col-5 a").forEach(link => {
      if (link && !link.onclick)
        link.onclick = ev => {
          ev.stopPropagation();
        };
    });

    // Buttons in carousel navigation prevented to trigger page change event
    let buttons = document.querySelectorAll(
      "div.q-carousel__navigation-inner button"
    );
    if (buttons.length > 0)
      buttons.forEach(button => {
        button.onclick = ev => {
          ev.preventDefault();
          ev.stopPropagation();
        };
      });
  },

  destroyed() {
    window.removeEventListener("keyup", this.handleKey);
    window.removeEventListener("wheel", this.handleWheel);
    if (typeof this.notify === "function") this.notify();
    this.updateLayout.value = this.updateLayout.buffer = 0;
  },

  // Prevent GitHub 404.
  beforeRouteEnter(to, from, next) {
    let redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect !== location.pathname) next(redirect);
    else next();
  },

  // Prevent page loading while in transition.
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

<style scoped="">
.no-overlay {
  overflow: hidden;
}
* {
  font-size: 2vh;
}
</style>