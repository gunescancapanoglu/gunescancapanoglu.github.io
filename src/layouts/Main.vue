<template>
  <q-layout>
    <q-page-container>
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
      >
        <router-view :updateLayout="updateLayout"></router-view>
      </transition>

      <q-linear-progress
        :buffer="updateLayout.buffer"
        :value="updateLayout.value"
        class="fixed-top"
      ></q-linear-progress>

      <q-page-sticky :offset="[18, 18]" position="bottom-right">
        <q-fab
          :style="{opacity: qFabOpacity}"
          @hide="qFabOpacity = .3"
          @show="qFabOpacity = 1"
          style="transition: opacity .3s;"
          direction="up"
          color="primary"
          icon="mdi-plus"
          active-icon="mdi-close"
        >
          <q-fab-action
            v-if="$route.name === 'page' && $route.path !== '/' && $route.path !== '/1'"
            @click="updateLayout.page--"
            color="primary"
            icon="mdi-page-first"
          >
            <q-tooltip anchor="center left" self="center right">First page</q-tooltip>
          </q-fab-action>

          <q-fab-action
            v-if="$route.name === 'page' && $route.path !== '/' + updateLayout.lastPage"
            @click="updateLayout.page++"
            color="primary"
            icon="mdi-page-last"
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

          <q-fab-action @click="showHelp" color="primary" icon="mdi-help">
            <q-tooltip anchor="center left" self="center right">How to navigate</q-tooltip>
          </q-fab-action>
        </q-fab>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
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
      let message =
        "These are general instructions,some options might not apply every page.<br>";
      if (this.$q.platform.is.mobile)
        message +=
          "<br><em>Swipe horizontally/vertically:</em> Next/prev page<br><em>Tap right/left side of screen:</em> Next/prev page";
      else
        message +=
          "<br><em>Click and move horizontally/vertically with mouse:</em> Next/prev page<br><em>Click right/left side of screen with mouse:</em> Next/prev page<br><em>Mouse wheel down/up:</em> Next/prev page<br><em>Left/right/up/down/page up/page down keys:</em> Next/prev page<br><em>Home/end keys:</em> First/last page<br><em>Esc key:</em> Close photograph/review";
      message +=
        "<br>You can use floating buttons for first/last page and to navigate to the rest of the site.";
      this.$q.dialog({
        message: message,
        html: true,
        position: "bottom",
        ok: false,
        "full-width": true
      });
    }
  }
};
</script>