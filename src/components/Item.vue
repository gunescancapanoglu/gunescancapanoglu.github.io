<template>
  <div>
    <q-carousel
      v-model="slide"
      animated
      infinite
      class="full-width"
      style="position:fixed;top:0;right:0;bottom:0;left:0;height:100%;"
      v-touch-swipe.horizontal="handleSwipe"
      :style="$route.name === 'photograph' ? { 'background-color': 'black'} : { 'background-color': ''}"
    >
      <q-carousel-slide
        v-for="item in collection"
        :key="item.id"
        :name="item.id"
        class="column no-wrap q-pa-none"
        :class="{'flex-center': $route.name === 'photograph'}"
        @click="handleClick"
      >
        <slot :item="item" />
      </q-carousel-slide>
    </q-carousel>

    <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-btn
        round
        color="primary"
        icon="mdi-close"
        style="opacity: .3;"
        @click="$router.push($route.name === 'photograph' ? '/photography' : '/reviews')"
      />
    </q-page-sticky>
  </div>
</template>

<script>
import { navigation } from "../mixin/navigation.js";
import { errors } from "../mixin/errors.js";

export default {
  name: "ItemComponent",
  mixins: [navigation, errors],
  props: { updateLayout: Object, store: Object },
  data() {
    return {
      slide: -1,
      collection: [],
      count: 0,
      fetching: true
    };
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
    updateSlide() {
      this.updateLayout.buffer = (this.count - this.slide + 1) / this.count;
      this.$router.push({
        params: {
          id:
            this.$route.name === "photograph"
              ? this.collection.find(item => item.id === this.slide).id
              : this.collection.find(item => item.id === this.slide).url
        }
      });
      this.fetch(this.slide);
    },
    changeSlide(val) {
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
    check(kid) {
      if (
        kid > 0 &&
        kid <= this.count &&
        !this.collection.find(item => item.id === kid)
      ) {
        return kid;
      } else if (
        kid < 1 &&
        !this.collection.find(item => item.id === this.count)
      ) {
        return this.count;
      } else if (
        kid > this.count &&
        !this.collection.find(item => item.id === 1)
      ) {
        return 1;
      } else return -1;
    },
    fetchReview(queryS, obj) {
      for (const [index, query] of queryS.entries()) {
        this.collection.push({
          ...obj[index],
          ...query.docs[0].data()
        });
      }
      this.fetching = false;
    },
    fetchThen(querySnapshots, id) {
      let prom2 = [],
        obj = [];
      for (const querySnapshot of querySnapshots) {
        for (const doc of querySnapshot.docs) {
          if (this.$route.name !== "photograph")
            prom2.push(
              this.store
                .doc(doc.id)
                .collection("review")
                .get()
            );
          obj.push(doc.data());
        }
      }
      if (prom2.length)
        Promise.all(prom2)
          .catch(this.connectionError)
          .then(queryS => this.fetchReview(queryS, obj));
      else {
        this.collection.push(...obj);
        this.fetching = false;
      }
      this.collection.sort((a, b) => b.id - a.id);
      this.updateLayout.value = (this.count - id + 1) / this.count;
    },
    fetch(id) {
      this.fetching = true;

      let prev = this.check(id + 1);
      let one = this.check(id);
      let next = this.check(id - 1);

      let prom = [];

      if (prev === id + 1 && one === id && next === id - 1) {
        prom.push(this.fetchRange(id + 2, 3));
      } else if (prev !== id + 1 && one === id && next === id - 1) {
        prom.push(this.fetchRange(id + 1, 2));
        prom.push(this.fetchOne(prev));
      } else if (prev === id + 1 && one === id && next !== id - 1) {
        prom.push(this.fetchRange(id + 2, 2));
        prom.push(this.fetchOne(next));
      } else {
        // Probably will never trigger!
        if (prev) prom.push(this.fetchOne(prev));
        if (one) prom.push(this.fetchOne(one));
        if (next) prom.push(this.fetchOne(next));
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
      this.slide =
        this.$route.name === "photograph"
          ? Number(this.$route.params.id)
          : Number(this.$route.params.id.split("-")[0]);
      this.updateLayout.value = this.updateLayout.buffer =
        (this.count - this.slide + 1) / this.count;
      this.fetch(this.slide);
    }
  },
  created() {
    this.store
      .doc("data")
      .get()
      .catch(this.connectionError)
      .then(querySnapshots => this.init(querySnapshots));

    window.addEventListener("keyup", this.handleKey);
  },
  destroyed() {
    this.updateLayout.value = this.updateLayout.buffer = 0;

    window.removeEventListener("keyup", this.handleKey);
  }
};
</script>