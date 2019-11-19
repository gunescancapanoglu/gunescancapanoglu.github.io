<template>
  <div
    :class="{'q-pa-xs': $q.screen.xs, 'q-pa-sm': $q.screen.sm, 'q-pa-md': $q.screen.md, 'q-pa-lg': $q.screen.lg,'q-pa-xl': $q.screen.xl}"
    class="text-center"
  >
    <p>{{header}}</p>
    <p>
      <q-img
        :src="image"
        contain
        style="max-height:50vh;max-width:50vw;min-height:100px;min-width:100px;"
      ></q-img>
    </p>
    <p>{{reason}}</p>
    <p>
      <strong>{{conclusion}}</strong>
    </p>
    <p>
      {{link1}}
      <q-btn type="a" to="/" size="md" label="Go home" no-wrap dense></q-btn>
    </p>
    <p>
      {{link2}}
      <q-btn type="a" to="/contact" size="md" label="Go contact" no-wrap dense></q-btn>
    </p>
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
  data() {
    return {
      header:
        "Whoa, dude?!? You found something that does not exist. Congrats!!",
      image: "",
      reason:
        "Well, if we could make people accept the fact that non-existence is some kind of existence. I mean at least we define the non-existence of it. This counts for something, am I right? It exists in our minds as non-existence after all.",
      conclusion:
        "Unfortunately, this won't change the fact that this is a 404 situation. Which means the page you are looking for does not exist anymore or never have ever existed even before -Which means what actually? What is before? The URL you typed or clicked is totally wrong, whatever the reason being. I really wish I could show you something interesting though...",
      link1:
        "Well no matter, keep looking what you are looking for and I know that it is really hard and something that I can totally relate to but this time please try to stay inside the limits of our boring existence and",
      link2:
        "Or if you think you have already spent more time than you normally would and think that this web site is outrageously irrelevant and unprofessional, you can directly"
    };
  },
  created() {
    document.title = "DON'T GO AWAY PLEEEEEEEAAAAASE!";
    // Change the default 404 message according to error type; firestore or cdn
    if (this.$route.path === "/error") {
      let reason = this.$route.query.code;
      this.header = "Oops! This was totally not intentional...";
      import("../mixins/error_image.js").then(module => {
        this.image = module.image;
      });
      this.reason = `You can not seem to be able to connect to ${reason} servers. There might be a couple of reasons for this though. Your connection to the servers might not be working at the moment. Or we might just pass the free tier quota for ${reason}. Which only proves that I am a cheap bastard. On my defense never expected such a high amount of visitors. Another option is some villainous jerk just attacked the site and caused quota to fill up.`;
      this.conclusion =
        "Whether I am cheap -Which I am!- or we are being attacked by some weirdo without any meaningful reason to live -Something that i can totally relate to! You can try to browse later or;";
      this.link1 =
        "If you think the connection is ok now and that this site is worthy of your precious time";
      this.link2 = "Or you can just avoid all this unnecessary drama and";
    } else {
      import("../mixins/404_image.js").then(module => {
        this.image = module.image;
      });
    }
  }
};
</script>

<style scoped="">
* {
  font-size: 1.4vh;
}
</style>