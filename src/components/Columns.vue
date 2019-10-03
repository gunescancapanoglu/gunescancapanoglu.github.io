<template>
  <div class="scrollable full-width" @scroll="scrollHandler" tabindex="0">
    <q-infinite-scroll class="row" @load="fetch">
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
          <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
        </div>
      </template>
    </q-infinite-scroll>
  </div>
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
      // Data list
      contentArrayData: [],

      // Raw item list from firestore
      contentArray: [],

      // Two dimensional array
      columns: []
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
      for (
        let i = 0;
        i < this.contentArrayData.length;
        i += this.columns.length
      ) {
        for (let j = 0; j < this.columns.length; j++) {
          if (this.contentArrayData[i + j])
            this.columns[j].push(this.contentArrayData[i + j]);
        }
      }
    },

    // Called after fetch to populate item lists.
    fetchThen(querySnapshots, done) {
      if (querySnapshots.empty === false) {
        for (const doc of querySnapshots.docs) {
          this.contentArray.push(doc);
          this.contentArrayData.push(doc.data());
        }
        done();
      } else if (querySnapshots.empty === true && this.contentArray.length < 1)
        return this.notFound("Columns Component could not fetch any item.");
      else done(true);
    },

    // Called by infinite scroll component to decide and fetch the amount of items.
    fetch(index, done) {
      let prom,
        itemAmount = Math.pow(this.columns.length, 2) * 3;

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
        .catch(this.connectionError)
        .then(querySnapshots => this.fetchThen(querySnapshots, done));
    },

    // Called to update linear progression bar.
    scrollHandler(ev) {
      if (
        this.$route.path === "/photography" ||
        this.$route.path === "/reviews"
      )
        this.updateLayout.value =
          ev.srcElement.scrollTop /
          (ev.srcElement.scrollHeight - window.innerHeight);
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
    // This app is designed like a book. So in the global stylus file,
    // body is rid of scroll bars.
    // Cause Vue is unable to directly work with body, to have direct/easier
    // control/access over scroll events, scrollability is moved from body to
    // wrapping div.
    const el = document.querySelector("div.scrollable");

    // By default browser required to focus on custom scrollable div.
    // Unless div won't be scrollable, till clicked/focused.
    el.focus();

    this.updateLayout.value = this.updateLayout.buffer =
      el.scrollTop / (el.scrollHeight - window.innerHeight);
  },
  deactivated() {
    this.updateLayout.value = this.updateLayout.buffer = 0;
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
div.scrollable {
  max-height: 100vh;
  overflow-y: auto;
}

div >>> .q-infinite-scroll__loading {
  margin-right: auto;
  margin-left: auto;
}

div >>> a {
  text-decoration: initial;
  color: initial;
}
</style>