export const errors = {
  methods: {
    connectionError(err) {
      return this.error("firestore", "Connection problem with firestore servers. Object: " + err ? err : undefined);
    },
    cdnProblem(err) {
      return this.error("cdn", "Connection problem with cdn servers. Object: " + err ? err : undefined);
    },
    notFound(err) {
      return this.error("404", "Requested content could not found. Probable url mismatch. Object: " + err ? err : undefined);
    },
    error(code, reason) {
      this.$q.loading.hide();
      this.$router.push("/error?code=" + code);
      return Promise.reject(reason);
    }
  }
};