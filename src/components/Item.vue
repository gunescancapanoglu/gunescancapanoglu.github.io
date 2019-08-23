<template>
  <div>
    <q-carousel
      v-model="slide"
      animated
      infinite
      class="full-width"
      style="position:fixed;top:0;right:0;bottom:0;left:0;height:100%;"
      v-touch-swipe.horizontal="handleSwipe"
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
import navigationMixin from "../mixin/navigation.js";

export default {
  name: "ItemComponent",
  mixins: [navigationMixin],
  props: { updateLayout: Object, store: Object },
  data() {
    return {
      slide: -1,
      collection: [],
      count: 0
    };
  },
  methods: {
    next() {
      this.changeSlide(1);
    },
    prev() {
      this.changeSlide(-1);
    },
    first() {
      this.changeSlide(this.slide - this.count);
    },
    last() {
      this.changeSlide(this.slide - 1);
    },

    changeSlide(val) {
      if (this.slide - val <= this.count && this.slide - val > 0) {
        this.slide -= val;
        this.updateLayout.buffer = (this.count - this.slide + 1) / this.count;
        this.$router.push({ params: { id: this.slide } });
        this.fetch(this.slide);
      } else if (this.slide - val < 1) {
        this.slide = this.count;
        this.updateLayout.buffer = (this.count - this.slide + 1) / this.count;
        this.$router.push({ params: { id: this.slide } });
        this.fetch(this.slide);
      } else if (this.slide - val > this.count) {
        this.slide = 1;
        this.$router.push({ params: { id: this.slide } });
        this.updateLayout.buffer = (this.count - this.slide + 1) / this.count;
        this.fetch(this.slide);
      }
    },

    fetch(id) {
      let check = function(kid) {
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
      }.bind(this);

      let prev = check(id + 1);
      let one = check(id);
      let next = check(id - 1);

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
        if (prev) prom.push(this.fetchOne(prev));
        if (one) prom.push(this.fetchOne(one));
        if (next) prom.push(this.fetchOne(next));
      }

      Promise.all(prom).then(
        function(querySnapshots) {
          let prom2 = [],
            obj = [];
          querySnapshots.forEach(querySnapshot =>
            querySnapshot.docs.forEach(
              function(doc) {
                if (this.$route.name !== "photograph")
                  prom2.push(
                    this.store
                      .doc(doc.id)
                      .collection("review")
                      .get()
                  );
                obj.push(doc.data());
              }.bind(this)
            )
          );
          if (prom2.length)
            Promise.all(prom2).then(queryS =>
              queryS.forEach((query, index) =>
                this.collection.push({
                  ...obj[index],
                  ...query.docs[0].data()
                })
              )
            );
          else this.collection.push(...obj);
          this.collection.sort((a, b) => b.id - a.id);
          this.updateLayout.value = (this.count - id + 1) / this.count;
        }.bind(this)
      );
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
    }
  },
  created() {
    this.store
      .doc("data")
      .get()
      .then(
        function(querySnapshots) {
          this.count = querySnapshots.data().count;
          let id = Number(this.$route.params.id);
          this.updateLayout.value = this.updateLayout.buffer =
            (this.count - id + 1) / this.count;
          this.fetch(id);
          this.slide = id;
        }.bind(this)
      );

    window.addEventListener("keyup", this.handleKey);
  },
  destroyed() {
    this.updateLayout.value = this.updateLayout.buffer = 0;

    window.removeEventListener("keyup", this.handleKey);
  }
};
</script>