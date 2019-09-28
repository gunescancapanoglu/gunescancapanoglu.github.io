import { animation } from "../mixin/constants.js";

export const navigation = {
  methods: {
    // Event listener registered in template
    handleSwipe(ev) {
      if (!this.$q.loading.isActive && ev.evt.type === "touchmove" && ev.touch) {
        switch (ev.direction) {
          case "right":
            this.prev(animation.left);
            break;
          case "left":
            this.next(animation.right);
            break;
          case "down":
            if (this.$route.name === "page" || this.$route.name === "photograph") this.prev(animation.up);
            break;
          case "up":
            if (this.$route.name === "page" || this.$route.name === "photograph") this.next(animation.down);
            break;
        }
      }
    },

    // Event listener registered in template
    handleClick(ev) {
      if (this.$route.name === "page" || this.$route.name === "photograph")
        if (
          !this.$q.loading.isActive &&
          ev.type === "click" &&
          ev.clientX > ev.currentTarget.offsetWidth / 2
        )
          this.next(animation.right);
        else if (!this.$q.loading.isActive && ev.type === "click")
          this.prev(animation.left);
    },

    // Event listener registered in created hook
    handleKey(ev) {
      if (!this.$q.loading.isActive && ev.type === "keyup") {
        switch (ev.keyCode) {
          case 37:
            this.prev(animation.left);
            break;
          case 39:
            this.next(animation.right);
            break;
          case 38:
            if (this.$route.name === "page" || this.$route.name === "photograph") this.prev(animation.up);
            break;
          case 40:
            if (this.$route.name === "page" || this.$route.name === "photograph") this.next(animation.down);
            break;
          case 33:
            this.prev(animation.up);
            break;
          case 34:
            this.next(animation.down);
            break;
          case 36:
            this.first();
            break;
          case 35:
            this.last();
            break;
          case 27:
            if (this.$route.name !== 'page' && this.$route.name === 'photograph') this.$router.push('/photography');
            else if (this.$route.name !== 'page' && this.$route.name !== 'photograph') this.$router.push('/reviews');
            break;
        }
      }
    },

    // Event listener registered in created hook
    handleWheel(ev) {
      if (!this.$q.loading.isActive && ev.type === "wheel" && ev.deltaY > 0)
        this.next(animation.down);
      else if (!this.$q.loading.isActive && ev.type === "wheel" && ev.deltaY < 0)
        this.prev(animation.up);
    }
  }
};