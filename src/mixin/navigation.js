import animation from "../mixin/constants.js";

const navigation = {
  methods: {
    // Event listener registered in template
    handleSwipe(e) {
      if (!this.$q.loading.isActive && e.evt.type === "touchmove" && e.touch) {
        switch (e.direction) {
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
    handleClick(e) {
      if (this.$route.name === "page" || this.$route.name === "photograph")
        if (
          !this.$q.loading.isActive &&
          e.type === "click" &&
          e.clientX > e.currentTarget.offsetWidth / 2
        )
          this.next(animation.right);
        else if (!this.$q.loading.isActive && e.type === "click")
          this.prev(animation.left);
    },

    // Event listener registered in created hook
    handleKey(e) {
      if (!this.$q.loading.isActive && e.type === "keyup") {
        switch (e.keyCode) {
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
    handleWheel(e) {
      if (!this.$q.loading.isActive && e.type === "wheel" && e.deltaY > 0)
        this.next(animation.down);
      else if (!this.$q.loading.isActive && e.type === "wheel" && e.deltaY < 0)
        this.prev(animation.up);
    }
  }
};

export default navigation;