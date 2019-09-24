<template>
  <q-page class="flex">
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
      @after-enter="afterEnter"
    >
      <keep-alive include="ColumnsComponent">
        <router-view v-if="$route.path === '/reviews'" :store="store" :updateLayout="updateLayout">
          <template v-slot:default="slotProps">
            <router-link :to="{path: '/reviews/' + slotProps.item.id}">
              <div class="q-pa-md">
                <q-card>
                  <q-img v-if="slotProps.item.url" :src="slotProps.item.url" />

                  <q-card-section v-if="slotProps.item.title">
                    <div class="text-h6">{{slotProps.item.title}}</div>
                  </q-card-section>

                  <q-card-section v-if="slotProps.item.excerpt">{{slotProps.item.excerpt}}</q-card-section>
                </q-card>
              </div>
            </router-link>
          </template>
        </router-view>
        <router-view v-if="$route.path !== '/reviews'" :store="store" :updateLayout="updateLayout">
          <template v-slot:default="slotProps">
            <div class="row">
              <div v-if="slotProps.item.url" class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-1">
                <q-img
                  class="float-right"
                  :src="slotProps.item.url"
                  style="max-height:100vh;max-width:100vw;"
                />
              </div>
              <q-card-section
                v-if="slotProps.item.title"
                class="col-xs-12 col-sm-6 col-md-3 col-lg-2 col-xl-1"
              >
                <div class="text-h6">{{slotProps.item.title}}</div>
              </q-card-section>
              <q-card-section
                v-if="slotProps.item.text"
                class="col-xs-12 col-sm-12 col-md-5 col-lg-6 col-xl-3"
                v-html="slotProps.item.text"
              ></q-card-section>
            </div>
          </template>
        </router-view>
      </keep-alive>
    </transition>
  </q-page>
</template>

<script>
export default {
  name: "ReviewsPage",
  props: { updateLayout: Object },
  data() {
    return {
      store: this.$db.collection("reviews")
    };
  },
  methods: {
    afterEnter() {
      if (this.$route.path === "/reviews") this.$root.$emit("triggerScroll");
    }
  }
};
</script>