<template>
  <q-page class="flex" style="min-height:100vh;">
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
            <router-link :to="{path: '/photography/' + slotProps.item.id}" class="flex q-pa-xs">
              <q-card :id="slotProps.item.id" flat square>
                <ImageComponent
                  :src="slotProps.item.image"
                  inlineStyle="max-height:100vh;min-height:100px;width:100%"
                ></ImageComponent>
              </q-card>
            </router-link>
          </template>
        </router-view>
        <router-view
          v-if="$route.path !== '/photography'"
          :store="store"
          :updateLayout="updateLayout"
        >
          <template v-slot:default="slotProps">
            <ImageComponent
              :src="slotProps.item.image"
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
  data() {
    return {
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