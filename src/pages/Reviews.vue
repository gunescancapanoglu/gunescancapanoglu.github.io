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
            <router-link :to="{path: '/reviews/' + slotProps.item.url}">
              <div class="q-pa-md">
                <q-card>
                  <q-img
                    v-if="slotProps.item.image"
                    :src="slotProps.item.image + '?t=' + Math.random()"
                    style="max-height:100vh;min-height: 100px;"
                  >
                    <template v-slot:loading>
                      <q-spinner color="primary" size="2em" />
                    </template>
                  </q-img>

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
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-2">
                <div class="row">
                  <div v-if="slotProps.item.image" class="col-xs-12 col-sm-grow col-md-12">
                    <q-img
                      contain
                      class="float-right"
                      :src="slotProps.item.image + '?t=' + Math.random()"
                      style="max-height:100vh;max-width:100vw;min-height: 100px;"
                    >
                      <template v-slot:loading>
                        <q-spinner color="primary" size="2em" />
                      </template>
                    </q-img>
                  </div>
                  <q-card-section v-if="slotProps.item.title" class="col-xs-12 col-sm-6 col-md-12">
                    <div class="text-h6">{{slotProps.item.title}}</div>
                  </q-card-section>
                </div>
              </div>
              <q-card-section
                v-if="slotProps.item.text"
                class="col-xs-12 col-sm-12 col-md-6 col-lg-5 col-xl-3"
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