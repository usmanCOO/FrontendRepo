<!-- VODlix's centralized msg -->
<template>
  <v-snackbar color="#262626" v-model="show" left :timeout="timeout" bottom class="pb-3">
    {{message}}
    <v-btn color="#F00000" flat @click.native="show = false">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      message: '',
      timeout: 3000,
    }
  },
  created() {
    this.$store.watch(state => state.snack, () => {
      const msg = this.$store.state.snack
      if (msg !== '') {
        this.show = true
        this.message = this.$store.state.snack
        this.$store.commit('snackIt', '')
      }
    })
  }
}
</script>