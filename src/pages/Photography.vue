<template>
  <q-page class="flex">
    <transition
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
                <q-card flat>
                  <q-img :src="slotProps.item.url" contain style="max-height:100vh" />
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
            <img :src="slotProps.item.url" style="max-height:100vh;max-width:100vw;" />
          </template>
        </router-view>
      </keep-alive>
    </transition>
  </q-page>
</template>

<script>
export default {
  name: "PhotographyPage",
  props: { updateLayout: Object },
  data() {
    return {
      store: this.$db.collection("photographs")
    };
  }
};
</script>