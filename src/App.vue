<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$q.loading.setDefaults({
      delay: 0,
      backgroundColor: "grey-3",
      spinnerColor: "primary"
    });
  }
};
</script>