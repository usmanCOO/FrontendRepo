<!-- the custome made circular loader -->
<template>
  <v-layout row justify-center>
    <v-dialog v-model="loading" persistent fullscreen content-class="loading-dialog" style="background:#1c1c1c">
      <v-container fill-height>
        <v-layout row justify-center align-center>
          <!-- <v-progress-circular indeterminate :size="100" :width="4" color="#ffc511"></v-progress-circular> -->
          <lottie/>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
</template>
<script>
  import Lottie from './loader.vue';

export default {
  
  name: "spinner",
     components: {
      'lottie': Lottie
    },
  data() {
    return {
      loading: true
    };
  }
};
</script>
<style>
.v-dialog {

background: #1c1c1c !important;}
</style>