export const errors = {
  methods: {
    connectionError(err) {
      this.$q.loading.hide();
      this.$router.push("/error/firestore");
      return Promise.reject(new Error("Connection problem with firestore servers with error:" + err ? err : undefined));
    }, cdnProblem(err) {
      this.$q.loading.hide();
      this.$router.push("/error/cdn");
      return Promise.reject(new Error("Connection problem with cdn servers. Object: " + err ? err : undefined));
    }, notFound(err) {
      this.$q.loading.hide();
      this.$router.push("/404");
      return Promise.reject("Requestd content could not found. Url is probably wrongly typed. Object: " + err ? err : undefined);
    }
  }
};