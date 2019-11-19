<template>
  <div>
    <q-carousel
      v-model="slide"
      :style="$route.name === 'photograph' ? { 'background-color': 'black'} : { 'background-color': ''}"
      class="full-width"
      animated
      infinite
      style="position:fixed;top:0;right:0;bottom:0;left:0;height:100%;"
      v-touch-swipe.horizontal="handleSwipe"
    >
      <q-carousel-slide
        v-for="item in collection"
        :class="{'flex-center': $route.name === 'photograph'}"
        :key="item.id"
        :name="item.id"
        class="column no-wrap q-pa-none"
      >
        <slot :item="item"></slot>
      </q-carousel-slide>
    </q-carousel>

    <div
      v-if="$route.name === 'photograph'"
      class="absolute-center full-width full-height row"
      v-touch-swipe="handleSwipe"
    >
      <router-link :to="prevSlideId" class="col-6" @click.native.prevent="prev" event></router-link>
      <router-link :to="nextSlideId" class="col-6" @click.native.prevent="next" event></router-link>
    </div>

    <q-page-sticky :offset="[18, 18]" position="top-right">
      <q-btn
        @click="$router.push($route.name === 'photograph' ? '/photography' : '/reviews')"
        round
        color="primary"
        icon="mdi-close"
        style="opacity:.3;"
      ></q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
// /photography and /reviews pages use this component to render gallery items
// as a quasar carousel item. Previous and next items are only loaded when
// middle item is requested.

import { navigation } from "../mixins/navigation.js";
import { errors } from "../mixins/errors.js";
import { utils } from "../mixins/utils.js";

export default {
  name: "ItemComponent",
  mixins: [navigation, errors, utils],
  props: { updateLayout: Object, store: Object },
  data() {
    return {
      // Carousel component model, slide number to show.
      slide: 0,

      // Item list.
      collection: [],

      // Total item number.
      count: 0,

      // Is currently fetching.
      fetching: true,

      // Notification object.
      notify: undefined
    };
  },
  computed: {
    // Generate links for search engine optimization.
    prevSlideId() {
      if (this.slide > 0 && this.slide < this.count)
        return (this.slide + 1).toString();
      else return "1";
    },
    nextSlideId() {
      if (this.slide > 1 && this.slide <= this.count)
        return (this.slide - 1).toString();
      else return this.count.toString();
    },

    curLink() {
      let tmp = "";
      let tmp_item = this.collection.find(x => x.id === this.slide);
      if (
        this.slide > 1 &&
        this.slide <= this.count &&
        this.count > 0 &&
        tmp_item !== undefined
      )
        tmp = tmp + this.slide + "-" + this.generateLink(tmp_item.title);
      return tmp;
    }
  },
  methods: {
    next() {
      if (!this.fetching) this.changeSlide(1);
    },
    prev() {
      if (!this.fetching) this.changeSlide(-1);
    },
    first() {
      if (!this.fetching) this.changeSlide(this.slide - this.count);
    },
    last() {
      if (!this.fetching) this.changeSlide(this.slide - 1);
    },

    // Update url according to item to be shown.
    updateSlide() {
      this.$router
        .push({
          params: {
            id:
              this.$route.name === "photograph"
                ? this.slide
                : (review => review.id + "-" + this.generateLink(review.title))(
                    this.collection.find(item => item.id === this.slide)
                  )
          }
        })
        .then(
          () => this.fetch(this.slide),
          resp =>
            resp.name === "NavigationDuplicated"
              ? (this.notify = this.$q.notify({
                  message: "You are at the start/end of the gallery =]",
                  position: "top-right",
                  onDismiss: () => (this.notify = undefined)
                }))
              : this.unknownError(resp)
        );
    },

    // Decide prev/next direction of the navigation.
    changeSlide(val) {
      if (typeof this.notify === "function") this.notify();
      if (this.slide - val <= this.count && this.slide - val > 0) {
        this.slide -= val;
        this.updateSlide();
      } else if (this.slide - val < 1) {
        this.slide = this.count;
        this.updateSlide();
      } else if (this.slide - val > this.count) {
        this.slide = 1;
        this.updateSlide();
      }
    },

    // Check whether requested item is pre-fetched and ready to be rendered.
    check(kid) {
      if (
        kid > 0 &&
        kid <= this.count &&
        !this.collection.find(item => item.id === kid)
      )
        return kid;
      else if (kid < 1 && !this.collection.find(item => item.id === this.count))
        return this.count;
      else if (kid > this.count && !this.collection.find(item => item.id === 1))
        return 1;
      else return -1;
    },

    // Called after fetching reviews to populate item lists.
    fetchReview(queryS, obj) {
      if (queryS.length > 0) {
        queryS.forEach((query, index) =>
          this.collection.push({
            ...obj[index],
            ...query.docs[0].data()
          })
        );
        if (this.$route.name !== "photography") {
          if (this.$route.params.id !== this.curLink)
            history.pushState({}, null, "/reviews/" + this.curLink);
          document.title = this.collection.find(
            item => item.id === this.slide
          ).title;
        }
        this.fetching = false;
      } else
        return this.notFound(
          "Item Component could not fetch the detail item/items."
        );
    },

    // Called after fetch to populate item lists.
    fetchThen(querySnapshots, id) {
      let documents = [];
      querySnapshots.forEach(item =>
        item.empty === false ? documents.push(...item.docs) : {}
      );
      let prom2 = [],
        obj = [];

      documents.forEach(doc => {
        if (this.$route.name !== "photograph")
          // Enters only showing review items and fetches review details
          prom2.push(
            this.store
              .doc(doc.id)
              .collection("review")
              .get()
          );
        obj.push(doc.data());
      }, this);

      if (prom2.length)
        Promise.all(prom2)
          .catch(this.connectionError)
          .then(queryS => this.fetchReview(queryS, obj));
      else {
        this.collection.push(...obj);
        document.title =
          "Over 20 years, and tens of thousands of stills these are the best I can come up with. Please, don't judge...";
        this.fetching = false;
      }

      // Collection can be manually sorted in firestore database through id.
      this.collection.sort((a, b) => b.id - a.id);
    },

    // Fetches chosen item, prev item and next item, if not already fetched.
    fetch(id) {
      this.updateLayout.value = (this.count - this.slide + 1) / this.count;

      this.fetching = true;

      let prev = this.check(id + 1);
      let one = this.check(id);
      let next = this.check(id - 1);

      let prom = [];

      // Decides which one fetched and didn't. And then if required uses
      // appropriate function
      if (prev === id + 1 && one === id && next === id - 1) {
        prom.push(this.fetchRange(id + 2, 3));
      } else if (prev !== id + 1 && one === id && next === id - 1) {
        prom.push(this.fetchRange(id + 1, 2));
        prom.push(this.fetchOne(prev));
      } else if (prev === id + 1 && one === id && next !== id - 1) {
        prom.push(this.fetchRange(id + 2, 2));
        prom.push(this.fetchOne(next));
      } else {
        if (prev !== -1) prom.push(this.fetchOne(prev));
        if (one !== -1) prom.push(this.fetchOne(one));
        if (next !== -1) prom.push(this.fetchOne(next));
      }

      Promise.all(prom)
        .catch(this.connectionError)
        .then(querySnapshots => this.fetchThen(querySnapshots, id));
    },

    fetchOne(id) {
      return this.store.where("id", "==", id).get();
    },

    fetchRange(startItem, amount) {
      return this.store
        .orderBy("id", "desc")
        .where("id", "<", startItem)
        .limit(amount)
        .get();
    },

    init(querySnapshots) {
      this.count = querySnapshots.data().count;
      // Review route might have string in the URL.
      this.slide =
        this.$route.name === "photograph"
          ? Number(this.$route.params.id)
          : Number(this.$route.params.id.split("-")[0]);
      if (this.slide > 0 && this.slide <= this.count) this.fetch(this.slide);
      else
        return this.notFound("Item Component could not fetch the item/items.");
    }
  },

  created() {
    // Fetching item count.
    this.store
      .doc("data")
      .get()
      .catch(this.connectionError)
      .then(querySnapshots => this.init(querySnapshots));

    if (this.$route.name === "photograph") {
      window.addEventListener("keyup", this.handleKey);
      window.addEventListener("wheel", this.handleWheel);
    }
  },

  destroyed() {
    this.updateLayout.value = this.updateLayout.buffer = 0;

    window.removeEventListener("keyup", this.handleKey);
    window.removeEventListener("wheel", this.handleWheel);
  }
};
</script>