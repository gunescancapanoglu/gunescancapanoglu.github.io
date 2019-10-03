<template>
  <q-page class="flex">
    <transition
      @after-enter="afterEnter"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
    >
      <keep-alive include="ColumnsComponent">
        <router-view
          v-if="$route.path === '/photography'"
          :store="store"
          :updateLayout="updateLayout"
        >
          <template v-slot:default="slotProps">
            <router-link :to="{path: '/photography/' + slotProps.item.id}">
              <div class="q-pa-xs">
                <q-card :id="slotProps.item.id" flat>
                  <q-img
                    :src="slotProps.item.image + '?t=' + Math.random()"
                    contain
                    style="max-height:100vh;min-height: 100px;"
                    v-on="slotProps.item.image ? { error: cdnProblem } : {}"
                  >
                    <template v-slot:loading>
                      <q-spinner color="primary" size="2em"></q-spinner>
                    </template>
                  </q-img>
                </q-card>
              </div>
            </router-link>
          </template>
        </router-view>
        <router-view
          v-if="$route.path !== '/photography'"
          :store="store"
          :updateLayout="updateLayout"
        >
          <template v-slot:default="slotProps">
            <q-spinner
              :class="{'opacity-some': !loading}"
              class="fixed transition-some"
              color="primary"
              size="5em"
            ></q-spinner>
            <img
              :class="{'opacity-some': loading}"
              :src="slotProps.item.image + '?t=' + Math.random()"
              class="transition-some"
              @load="loading = false"
              style="max-height:100vh;max-width:100vw;"
              v-on="slotProps.item.image ? { error: cdnProblem } : {}"
            />
          </template>
        </router-view>
      </keep-alive>
    </transition>
  </q-page>
</template>

<script>
// Photography page combines two component with
// each unique set of slot component group,
// to handle templating better/easier to eyes of the dev


import { errors } from "../mixins/errors.js";

export default {
  name: "PhotographyPage",
  mixins: [errors],
  props: { updateLayout: Object },
  watch: {
    "$route.path": function() {
      if (this.$route.name === "photograph") this.loading = true;
    }
  },
  data() {
    return {
      loading: true,
      store: this.$db.collection("photographs")
    };
  },
  methods: {
    // Triggers after component transitions in
    // after coming back from item component
    afterEnter() {
      if (this.$route.path === "/photography")
        this.$root.$emit("triggerScroll");
    }
  }
};
</script>

<style scoped="">
.opacity-some {
  opacity: 0;
}

.transition-some {
  transition: opacity 1s;
}
</style>