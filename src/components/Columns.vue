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
import { errors } from "../mixin/errors.js";

export default {
  name: "ColumnsComponent",
  mixins: [errors],
  props: { store: Object, updateLayout: Object },
  data() {
    return {
      contentArrayData: [],
      contentArray: [],
      columns: []
    };
  },
  watch: {
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
    contentArray() {
      this.resetArrays();
      this.setArrays();
    }
  },
  methods: {
    resetArrays() {
      this.columns = [];

      this.columns.push([]);
      if (this.$q.screen.sm) this.columns.push([]);
      else if (this.$q.screen.md) this.columns.push([], []);
      else if (this.$q.screen.lg) this.columns.push([], [], []);
      else if (this.$q.screen.xl) this.columns.push([], [], [], [], []);
    },
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
    fetchThen(querySnapshots, done) {
      if (querySnapshots.empty === false) {
        for (const doc of querySnapshots.docs) {
          this.contentArray.push(doc);
          this.contentArrayData.push(doc.data());
        }
        done();
      } else if (
        querySnapshots.empty === true &&
        this.contentArray.length < 1
      ) {
        this.notFound("Columns Component could not fetch any item.");
        return;
      } else done(true);
    },
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
    scrollHandler(ev) {
      if (
        this.$route.path === "/photography" ||
        this.$route.path === "/reviews"
      )
        this.updateLayout.value =
          ev.srcElement.scrollTop /
          (ev.srcElement.scrollHeight - window.innerHeight);
    },
    triggerScroll(from) {
      if (
        this.$route.path === "/photography" ||
        this.$route.path === "/reviews"
      ) {
        let el = document.querySelector(`[href='${from.path}']`);
        if (el) el.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    },
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
    const el = document.querySelector("div.scrollable");

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