export const errors = {
  methods: {
    connectionError(err) {
      return this.error("firestore", "Connection problem with firestore servers. Object: " + err);
    },
    cdnProblem(err) {
      return this.error("cdn", "Connection problem with cdn servers. Object: " + err);
    },
    notFound(err) {
      return this.error("404", "Requested content could not found. Probable url mismatch. Object: " + err);
    },
    unknownError(err) {
      return this.error("url", "Have no idea what the hell just happened. Kindly inform the idiot dev please, thanks. Object: " + err);
    },
    error(code, reason) {
      this.$q.loading.hide();
      this.$router.push("/error?code=" + code);
      return Promise.reject(reason);
    }
  }
};