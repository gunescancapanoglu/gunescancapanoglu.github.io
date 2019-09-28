<template>
  <q-page class="flex">
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
      @after-enter="afterEnter"
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
                    @error="cdnProblem"
                  >
                    <template v-slot:loading>
                      <q-spinner color="primary" size="2em" />
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
            <img
              :src="slotProps.item.image + '?t=' + Math.random()"
              style="max-height:100vh;max-width:100vw;"
            />
          </template>
        </router-view>
      </keep-alive>
    </transition>
  </q-page>
</template>

<script>
import { errors } from "../mixin/errors.js";

export default {
  name: "PhotographyPage",
  mixins: [errors],
  props: { updateLayout: Object },
  data() {
    return {
      store: this.$db.collection("photographs")
    };
  },
  methods: {
    afterEnter() {
      if (this.$route.path === "/photography")
        this.$root.$emit("triggerScroll");
    }
  }
};
</script>