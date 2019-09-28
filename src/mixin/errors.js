export const errors = {
  methods: {
    connectionError(err) {
      this.$q.loading.hide();
      this.$router.push("/error/firestore");
      return Promise.reject(new Error("Connection problem with firestore servers with error:" + err));
    }, cdnProblem() {
      this.$q.loading.hide();
      this.$router.push("/error/cdn");
      return Promise.reject(new Error("Connection problem with cdn servers."));
    }
  }
};