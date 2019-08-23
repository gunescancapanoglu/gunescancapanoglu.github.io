<template>
  <div class="row full-width items-center justify-around content-around">
    <q-page-sticky position="top-right" :offset="[9, 9]" style="opacity: .3">
      <q-chip dense :label="dataSend.pageChip" />
    </q-page-sticky>
    <div class="col-6">
      <q-card flat class="q-ma-sm flex">
        <q-img
          contain
          basic
          @load="dataSend.reveal"
          style="max-height:90vh"
          :src="dataSend.content.image"
        />
      </q-card>
    </div>
    <div class="col-6 col-md-4 col-lg-3 col-xl-2">
      <q-card flat bordered class="q-ma-sm">
        <q-card-section>{{dataSend.content.text}}</q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResumeComponent",
  props: { dataSend: Object }
};
</script>