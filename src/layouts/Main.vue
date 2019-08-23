<template>
  <q-layout @scroll="scrollHandler" @scroll-height="scrollHeightHandler">
    <q-page-container>
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
      >
        <router-view :updateLayout="updateLayout" />
      </transition>

      <q-linear-progress
        class="fixed-top"
        :value="updateLayout.value"
        :buffer="updateLayout.buffer"
      />

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-fab
          @show="qFabOpacity = 1"
          @hide="qFabOpacity = .3"
          :style="{opacity: qFabOpacity}"
          style="transition: opacity .3s;"
          direction="up"
          color="primary"
          icon="mdi-plus"
          active-icon="mdi-close"
        >
          <q-fab-action
            v-if="$route.name === 'page' && $route.path !== '/' && $route.path !== '/1'"
            color="primary"
            icon="mdi-page-first"
            @click="updateLayout.page--"
          >
            <q-tooltip anchor="center left" self="center right">First page</q-tooltip>
          </q-fab-action>

          <q-fab-action
            v-if="$route.name === 'page' && $route.path !== '/' + updateLayout.lastPage"
            color="primary"
            icon="mdi-page-last"
            @click="updateLayout.page++"
          >
            <q-tooltip anchor="center left" self="center right">Last page</q-tooltip>
          </q-fab-action>

          <q-fab-action
            v-if="$route.name !== 'page'"
            color="primary"
            icon="mdi-home-variant"
            to="/"
          >
            <q-tooltip anchor="center left" self="center right">Home</q-tooltip>
          </q-fab-action>

          <q-fab-action
            v-if="$route.path !== '/photography'"
            color="primary"
            icon="mdi-image-filter-hdr"
            to="/photography"
          >
            <q-tooltip anchor="center left" self="center right">Photography</q-tooltip>
          </q-fab-action>

          <q-fab-action
            v-if="$route.path !== '/reviews'"
            color="primary"
            icon="mdi-gamepad"
            to="/reviews"
          >
            <q-tooltip anchor="center left" self="center right">Oyun yazıları</q-tooltip>
          </q-fab-action>

          <q-fab-action
            v-if="$route.path !== '/contact'"
            color="primary"
            icon="mdi-at"
            to="/contact"
          >
            <q-tooltip anchor="center left" self="center right">Contact</q-tooltip>
          </q-fab-action>

          <q-fab-action color="primary" icon="mdi-help" @click="showHelp">
            <q-tooltip anchor="center left" self="center right">How to navigate</q-tooltip>
          </q-fab-action>
        </q-fab>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
// TODO ADD ESC and NO MOUSE WHEEL IN HELP DIALOG CUSTOMIZE HELP DIALOG FOR DIFFERENT PAGES
// TODO FIX LINEAR PROGRESSING IN ALL PAGES
export default {
  name: "MainLayout",
  data() {
    return {
      updateLayout: {
        value: 0,
        buffer: 0,
        page: 0,
        lastPage: 0
      },
      qFabOpacity: 0.3,
      scrollPosition: 0
    };
  },
  methods: {
    showHelp() {
      let message;
      if (this.$q.platform.is.mobile)
        message =
          "<em>Swipe horizontally/vertically:</em> Next/prev page<br><em>Tap right/left side of screen:</em> Next/prev page<br><em>Tap and hod:</em><br>You can use floating buttons for first/last page and to navigate to the rest of the site.";
      else
        message =
          "<em>Click and move horizontally/vertically with mouse:</em> Next/prev page<br><em>Click right/left side of screen with mouse:</em> Next/prev page<br><em>Mouse wheel down/up:</em> Next/prev page<br><em>Left/right/up/down/page up/page down keys:</em> Next/prev page<br><em>Home/end keys:</em> First/last page<br>You can use floating buttons for first/last page and to navigate to the rest of the site.";
      this.$q.dialog({
        message: message,
        html: true,
        position: "bottom",
        ok: false,
        "full-width": true
      });
    },
    scrollHandler(val) {
      if (
        this.$route.path === "/photography" ||
        this.$route.path === "/reviews"
      )
        this.scrollPosition = val.position;
      this.updateLayout.value =
        val.position / (document.body.scrollHeight - window.innerHeight);
    },
    scrollHeightHandler(val) {
      if (
        this.$route.path === "/photography" ||
        this.$route.path === "/reviews"
      )
        this.updateLayout.value =
          this.scrollPosition /
          (document.body.scrollHeight - window.innerHeight);
    }
  }
};
</script>