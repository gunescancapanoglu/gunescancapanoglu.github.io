<template>
  <q-layout @scroll="scrollHandler" @scroll-height="scrollHeightHandler">
    <q-page-container @[keyUpEvent]="handleKey" @[wheelEvent]="handleWheel">
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
      >
        <div v-if="ifPagePhotograph" @[clickEvent]="handleClick">
          <router-view
            ref="itemNav"
            :updateLayout="updateLayout"
            tabindex="-1"
            v-touch-swipe="handleSwipe"
          ></router-view>
        </div>
        <div v-else-if="ifReview" @[clickEvent]="handleClick">
          <router-view
            ref="itemNav"
            :updateLayout="updateLayout"
            tabindex="-1"
            v-touch-swipe.horizontal="handleSwipe"
          ></router-view>
        </div>
        <div v-else @[clickEvent]="handleClick">
          <router-view :updateLayout="updateLayout"></router-view>
        </div>
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
import { animation } from "../mixins/constants.js";

export default {
  name: "MainLayout",
  data() {
    return {
      updateLayout: {
        // Linear progression component models.
        value: 0,
        buffer: 0,

        // Page chip counters.
        page: 0,
        lastPage: 0
      },

      // Navigation icon opacity is dynamic.
      qFabOpacity: 0.3,

      // Position after returning from individual review.
      scrollPosition: 0
    };
  },

  computed: {
    // Events are dynamic, bound to child components
    keyUpEvent() {
      return this.ifPagePhotograph || this.ifReview ? "keyup" : null;
    },
    wheelEvent() {
      return this.ifPagePhotograph ? "wheel" : null;
    },
    clickEvent() {
      return this.ifPagePhotograph ? "click" : null;
    },
    touchEvent() {
      return;
      this.ifPagePhotograph ? "v-touch-swipe" : null;
    },
    ifPagePhotograph() {
      return this.$route.name === "page" || this.$route.name === "photograph";
    },
    ifReview() {
      return this.$route.name === "review";
    }
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
    },

    // Called to update linear progression bar.
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
    },

    handleKey(ev) {
      ev.preventDefault();
      if (!this.$q.loading.isActive) {
        switch (ev.keyCode) {
          case 37:
            if (!this.ifReview) this.$root.$emit("prev", animation.left);
            break;
          case 39:
            if (!this.ifReview) this.$root.$emit("next", animation.right);
            break;
          case 38:
            if (!this.ifReview) this.$root.$emit("prev", animation.up);
            break;
          case 40:
            if (!this.ifReview) this.$root.$emit("next", animation.down);
            break;
          case 33:
            if (!this.ifReview) this.$root.$emit("prev", animation.up);
            break;
          case 34:
            if (!this.ifReview) this.$root.$emit("next", animation.down);
            break;
          case 36:
            if (!this.ifReview) this.$root.$emit("first");
            break;
          case 35:
            if (!this.ifReview) this.$root.$emit("last");
            break;
          case 27:
            if (this.$route.name === "photograph")
              this.$router.push("/photography");
            else if (this.ifReview) this.$router.push("/reviews");
            break;
        }
      }
    },
    handleWheel(ev) {
      ev.preventDefault();
      if (!this.$q.loading.isActive && ev.deltaY > 0)
        this.$root.$emit("next", animation.down);
      else if (!this.$q.loading.isActive && ev.deltaY < 0)
        this.$root.$emit("prev", animation.up);
    },
    handleClick(ev) {
      ev.preventDefault();
      if (
        !this.$q.loading.isActive &&
        ev.clientX > ev.currentTarget.offsetWidth / 2
      )
        this.$root.$emit("next", animation.right);
      else if (!this.$q.loading.isActive)
        this.$root.$emit("prev", animation.left);
    },
    handleSwipe(ev) {
      ev.evt.preventDefault();
      if (
        !this.$q.loading.isActive &&
        ev.evt.type === "touchmove" &&
        ev.touch
      ) {
        switch (ev.direction) {
          case "right":
            this.$root.$emit("prev", animation.left);
            break;
          case "left":
            this.$root.$emit("next", animation.right);
            break;
          case "down":
            this.$root.$emit("prev", animation.up);
            break;
          case "up":
            this.$root.$emit("next", animation.down);
            break;
        }
      }
    }
  },
  mounted() {
    if (this.$refs.itemNav) this.$refs.itemNav.$el.focus();
  },
  updated() {
    if (this.$refs.itemNav) this.$refs.itemNav.$el.focus();
  }
};
</script>