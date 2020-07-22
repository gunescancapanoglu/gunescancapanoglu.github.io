<template>
  <q-infinite-scroll class="row full-width" @load="fetch">
    <div
      v-for="(array, index) in columns"
      :key="index"
      class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
    >
      <div v-for="item in array" :key="item.id" class="col-12">
        <slot :item="item"></slot>
      </div>
    </div>
    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots :style="done ? 'display:none;': ''" color="primary" size="40px"></q-spinner-dots>
      </div>
    </template>
  </q-infinite-scroll>
</template>

<script>
// /photographs and /reviews pages use this component to actively re-render
// the whole gallery responsively. Due photographs/reviews having different
// ratios, instead of grid row, columns are being used which makes the order
// of the items rendered differently under different screen resolution.
// This component, solves the problem aggressively recreating the two
// dimensional arrays of items, which reactively re-renders very efficiently.
// With the possibility of certain rows having longer/shorter height than
// the others which might result odd looking page footers.

import { errors } from "../mixins/errors.js";

export default {
  name: "ColumnsComponent",
  mixins: [errors],
  props: { store: Object, updateLayout: Object },
  data() {
    return {
      // Data list, gotten from firestore with data() function,
      // for vue to react on.
      contentArrayData: [],

      // Raw item list from firestore.
      contentArray: [],

      // Two dimensional array which is used for responsiveness.
      columns: [],

      // Whether there are more images to be loaded or not.
      done: false
    };
  },
  watch: {
    // To achieve real-time responsiveness, screen sizes are watched.
    // Without reloading the page, whenever screen sizes pasts breakpoints,
    // two dim. array is recreated to maintain item order in the gallery.
    "$q.screen.xs": function(val) {
      if (val) {
        this.resetArrays();
        this.setArrays();
      }
    },
    "$q.screen.sm": function(val) {
      if (val) {
        this.resetArrays();
        this.setArrays();
      }
    },
    "$q.screen.md": function(val) {
      if (val) {
        this.resetArrays();
        this.setArrays();
      }
    },
    "$q.screen.lg": function(val) {
      if (val) {
        this.resetArrays();
        this.setArrays();
      }
    },
    "$q.screen.xl": function(val) {
      if (val) {
        this.resetArrays();
        this.setArrays();
      }
    },

    // Every time item list is updated (i.e. via infinite scroll) two dim.
    // array (columns) has to be reset and re-populate.
    // Due to Vue being really efficient reordering arrays this reset/recreate
    // process is pretty cheap. So further optimization is unnecessary.
    contentArray() {
      this.resetArrays();
      this.setArrays();
    }
  },
  methods: {
    // Other than resetting two dim. array  (columns), this function decides
    // number of column based on screen size.
    resetArrays() {
      this.columns = [];

      this.columns.push([]);
      if (this.$q.screen.sm) this.columns.push([]);
      else if (this.$q.screen.md) this.columns.push([], []);
      else if (this.$q.screen.lg) this.columns.push([], [], []);
      else if (this.$q.screen.xl) this.columns.push([], [], [], [], []);
    },

    // Two dim. array (columns) re-population.
    setArrays() {
      this.contentArrayData.reduce(
        (acc, val) => {
          let nextIt = acc.it.next();
          if (nextIt.done) {
            acc.it = acc.columns[Symbol.iterator]();
            nextIt = acc.it.next();
          }
          nextIt.value.push(val);
          return acc;
        },
        {
          columns: this.columns,
          it: this.columns[Symbol.iterator]()
        }
      );
    },

    // Called after fetch to populate item lists.
    fetchThen(querySnapshots, done) {
      if (querySnapshots.empty === false) {
        querySnapshots.docs.forEach(doc => {
          this.contentArray.push(doc);
          this.contentArrayData.push(doc.data());
        }, this);
        done();
      } else if (querySnapshots.empty === true && this.contentArray.length < 1)
        return this.notFound("Columns Component could not fetch any item.");
      else done((this.done = true));
    },

    // Called by infinite scroll component to decide and fetch the amount of items.
    fetch(index, done) {
      let prom,
        itemAmount = this.columns.length * 4;

      if (this.contentArray.length === 0)
        prom = this.store
          .orderBy("id", "desc")
          .limit(itemAmount)
          .get();
      else
        prom = this.store
          .orderBy("id", "desc")
          .startAfter(this.contentArray[this.contentArray.length - 1])
          .limit(itemAmount)
          .get();

      prom
        .then(querySnapshots => this.fetchThen(querySnapshots, done))
        .catch(this.connectionError);
    },

    // Called just after coming to the gallery page and to scroll
    // to the item that has been clicked previously.
    triggerScroll(from) {
      if (
        this.$route.path === "/photography" ||
        this.$route.path === "/reviews"
      ) {
        let el = document.querySelector(`[href='${from.path}']`);
        if (el) el.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    },

    // Called to setup global event listener for triggerScroll function
    // to be called when the transition effect is complete
    setupScrollAfterTransition(to, from) {
      if (
        (to.path === "/photography" && from.name === "photograph") ||
        (to.path === "/reviews" && from.name !== "photograph")
      ) {
        this.$root.$once("triggerScroll", () => this.triggerScroll(from));
      }
    }
  },

  created() {
    this.resetArrays();
  },
  activated() {
    if (this.$route.path === "/photography")
      document.title =
        "Over 20 years, and tens of thousands of stills these are the best I can come up with. Please, don't judge...";
    else
      document.title =
        "I grew up imagining working for a gaming magazine thinking it would be awesome! Oh boy, was I wrong...";
  },
  destroyed() {
    this.$root.$off("triggerScroll");
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setupScrollAfterTransition(to, from);
      next();
    });
  }
};
</script>

<style scoped="">
div >>> .q-infinite-scroll__loading {
  margin-right: auto;
  margin-left: auto;
}

div >>> a {
  text-decoration: initial;
  color: initial;
}
</style>