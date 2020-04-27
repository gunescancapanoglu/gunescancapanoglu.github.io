<template>
  <q-page class="flex" style="min-height:100vh;">
    <div
      :class="{'q-pt-xs': $q.screen.xs,'q-pt-sm': $q.screen.sm,'q-pt-md': $q.screen.md,'q-pt-lg': $q.screen.lg,'q-pt-xl': $q.screen.xl,'q-pl-xs': $q.screen.xs,'q-pl-sm': $q.screen.sm,'q-pl-md': $q.screen.md,'q-pl-lg': $q.screen.lg,'q-pl-xl': $q.screen.xl}"
      class="full-width row content-around"
      style="margin-bottom:74px;"
    >
      <div :class="paddingRightAndBottom" class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
        <q-img :src="images[0]" contain></q-img>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-8 col-lg-9 col-xl-10 row">
        <div class="col-12 row">
          <div
            :class="paddingRightAndBottom"
            class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-2 self-center"
          >
            <q-btn
              v-show="!show"
              class="full-width"
              @click="show = !show"
              size="xl"
              no-caps
              color="accent"
            >
              <q-img :src="reveal"></q-img>
            </q-btn>
            <q-img v-show="show" :src="image" contain></q-img>
          </div>
          <div
            :class="paddingRightAndBottom"
            class="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-4 row items-center"
          >
            <div class="col-3">Download my resume:</div>
            <div class="col">
              <a
                href="statics/resumes/gunescancapanoglu1.pdf"
              >
                <q-btn label="1-Page version" no-caps color="primary" dense></q-btn>
              </a>
            </div>
            <div class="col">
              <a
                href="statics/resumes/gunescancapanoglu2.pdf"
              >
                <q-btn label="2-Page version" no-caps color="primary" dense></q-btn>
              </a>
            </div>
            <div class="col">
              <a
                href="statics/resumes/gunescancapanoglu3.pdf"
              >
                <q-btn label="3-Page version" no-caps color="primary" dense></q-btn>
              </a>
            </div>
            <div class="col">
              <a
                href="statics/resumes/gunescancapanoglu6.pdf"
              >
                <q-btn label="6-Page version" no-caps color="primary" dense></q-btn>
              </a>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 row items-center">
            <div :class="paddingRightAndBottom" class="col">
              <a href="https://github.com/gunescancapanoglu">
                <q-img
                  src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"
                  contain
                ></q-img>
              </a>
            </div>
            <div :class="paddingRightAndBottom" class="col">
              <a
                href="https://www.linkedin.com/in/g%C3%BCne%C5%9F-can-%C3%A7apano%C4%9Flu-87b407150/"
              >
                <q-img
                  src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.svg.original.svg"
                  contain
                ></q-img>
              </a>
            </div>
            <div :class="paddingRightAndBottom" class="col">
              <a href="https://www.kariyer.net/ozgecmis/gunescancapanoglu_en">
                <q-img src="https://aday-asset.mncdn.com/img/kariyernet_logo.png" contain></q-img>
              </a>
            </div>
          </div>
        </div>
        <div class="col-12 row self-end">
          <div :class="paddingRightAndBottom" class="col-12 col-xl-4">
            <a
              href="statics/resumes/gunescan.capanoglu.me.pdf"
            >
              <q-btn label="Download the story in pdf format" no-caps color="primary" dense></q-btn>
            </a>
          </div>
          <div class="col-12 col-xl-8 row items-center">
            <div :class="paddingRightAndBottom" class="col-12 col-md-2">
              <a href="http://creativecommons.org/licenses/by-sa/4.0/" rel="license">
                <img
                  src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
                  alt="Creative Commons License"
                  style="border-width:0"
                />
              </a>
            </div>
            <div :class="paddingRightAndBottom" class="col-12 col-md-10">
              All the images -except brand logos obviously- you see in this whole web site are licensed under a
              <a
                href="http://creativecommons.org/licenses/by-sa/4.0/"
                rel="license"
              >Creative Commons Attribution-ShareAlike 4.0 International License</a>.
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { images } from "../mixins/contact_images.js";

export default {
  name: "ContactPage",
  data() {
    return {
      images: images,
      show: false
    };
  },
  computed: {
    // Image is concatenated to prevent scraping.
    // Have no idea whether this will work or not.
    // I mean simple spiders probably do not run the js after downloading
    // the page. It would be really costly to do something like that.
    image() {
      return this.images[1] + this.images[2] + this.images[3];
    },
    reveal() {
      return this.images[4] + this.images[5] + this.images[6];
    },
    buttonAndIconSize() {
      if (this.$q.screen.xs) return "xs";
      else if (this.$q.screen.sm) return "sm";
      else if (this.$q.screen.md) return "md";
      else if (this.$q.screen.lg) return "lg";
      else if (this.$q.screen.xl) return "xl";
    },
    paddingRightAndBottom() {
      return {
        "q-pr-xs": this.$q.screen.xs,
        "q-pr-sm": this.$q.screen.sm,
        "q-pr-md": this.$q.screen.md,
        "q-pr-lg": this.$q.screen.lg,
        "q-pr-xl": this.$q.screen.xl,
        "q-pb-xs": this.$q.screen.xs,
        "q-pb-sm": this.$q.screen.sm,
        "q-pb-md": this.$q.screen.md,
        "q-pb-lg": this.$q.screen.lg,
        "q-pb-xl": this.$q.screen.xl
      };
    }
  },
  created() {
    document.title = "I admit I am a little bit of an attention seeker...";
  }
};
</script>

<style scoped="">
* {
  text-align: center;
}
</style>