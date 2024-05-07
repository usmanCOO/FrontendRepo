<template>
    <v-content>
      <client-only>
        <v-flex lg6 md6 sm12 xs12 pt-4 mt-5 pt-5 class="ratingdiv">
          <div class="mx-2 my-0 ratingsystm text-md-right">
            <div class="innerdiv">
            </div>
          </div>
          <div>
            <v-btn @click="component = 'movies'" small>
              <v-icon>clear_all</v-icon> Movies
            </v-btn>
            <v-btn @click="component = 'series'" small>
              <v-icon>view_module</v-icon> Series 
            </v-btn>
          </div>
        </v-flex>
      </client-only>
      <keep-alive>
        <component v-bind:is="component"></component>
      </keep-alive>
    </v-content>
</template>
<script>
import movies from '~/components/default/myList/movies'
import series from '~/components/default/myList/series'
export default {
  name:'person',
  middleware:['auth','subscription_needed'],
  components: {
    'movies' : movies,
    'series' : series
  },
  head(){
    return {
      titleTemplate: this.$t('watch_list')+' - %s',
      meta:[
        {
          name:'description',
          content:'Your watchlist'
        }
      ]
    }
  },
  data () {
    return {
      component: 'movies',
    }
  },
  methods:{
   
  },
  beforeMount(){
    
  }
}
</script>
<style scoped>

</style> 