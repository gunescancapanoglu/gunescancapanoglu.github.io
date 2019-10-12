<template>
  <div :class="{'q-pa-xl': !$q.screen.xs}" class="text-center scrollable">
    <p>{{header}}</p>
    <p>
      <ImageComponent
        src="/statics/c000025_900.jpg"
        q
        contain
        inlineStyle="max-height:50vh;max-width:50vw;min-height:100px;min-width:100px;"
      ></ImageComponent>
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
import ImageComponent from "components/Image.vue";

export default {
  name: "ErrorPage",
  components: { ImageComponent },
  data() {
    return {
      header:
        "Whoa, dude?!? you found something that does not exist. Congrats!!",
      reason:
        "Well, if we could make people accept the fact that non-existence is some kind of existence. I mean at least we define the non-existence of it. This counts for something, am I right? It exists in our minds as non-existence after all.",
      conclusion:
        "Unfortunately, this won't change the fact that this is a 404 situation. Which means the page you are looking for does not exist anymore or never have ever existed even before (Which means what actually? What is before?), the URL you typed or clicked is totally wrong now whatever the reason being. I really wish I could show you something interesting (Like the rest of the website!) though...",
      link1:
        "Well no matter, keep looking what you are looking for and I know that it is really hard and something that I can totally relate to but this time please try to stay inside the limits of our boring existence and",
      link2:
        "Or if you think you have already spent more time than you normally would and think that this web site is outrageously irrelevant and unprofessional, you can directly"
    };
  },
  created() {
    // Change the default 404 message according to error type; firestore or cdn
    if (this.$route.path === "/error") {
      let reason = this.$route.query.code;
      this.header = "Oops! This was totally not intentional...";
      this.reason = `You can not seem to be able to connect to ${reason} servers. There might be a couple of reasons for this though. Your connection to the servers might not be working at the moment. Or we might just pass the free tier quota for ${reason}. Which only proves that I am a cheap bastard. On my defense never expected such a high amount of visitors. Another option is some villainous jerk just attacked the site and caused quota to fill up.`;
      this.conclusion =
        "Whether I am cheap (Which I am!) or we are being attacked by some weirdo without any meaningful reason to live (Something that i can totally relate to!), you can try to browse later or;";
      this.link1 =
        "If you think the connection is ok now and that this site is worthy of your precious time";
      this.link2 = "Or you can just avoid all this unnecessary drama and";
    }
  }
};
</script>

<style scoped="">
div.scrollable {
  max-height: 100vh;
  overflow-y: auto;
}
</style>