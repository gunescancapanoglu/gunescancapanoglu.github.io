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
                  <ImageComponent
                    :src="slotProps.item.image"
                    contain
                    inlineStyle="max-height:100vh;min-height: 100px;"
                    q
                  ></ImageComponent>
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
            <ImageComponent
              :class="{'opacity-some': loading, 'transition-some': true}"
              :src="slotProps.item.image"
              @load="loading = false"
              inlineStyle="max-height:100vh;max-width:100vw;object-fit:scale-down;"
            ></ImageComponent>
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

import ImageComponent from "components/Image.vue";

export default {
  name: "PhotographyPage",
  components: { ImageComponent },
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
  transition: 0.5s opacity;
}
</style>