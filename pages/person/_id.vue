<template>
    <v-content>
      <client-only>
        <v-flex lg6 md6 sm12 xs12 pt-4 mt-5 pt-5 class="ratingdiv">
          <div class="mx-2 my-0 ratingsystm text-md-right">
            <div class="innerdiv">
            </div>
          </div>
          <div>
            <v-btn @click="component = 'movie-listing'" small>
              <v-icon>clear_all</v-icon> Movies
            </v-btn>
            <v-btn @click="component = 'series-listing'" small>
              <v-icon>view_module</v-icon> Series 
            </v-btn>
          </div>
        </v-flex>
      </client-only>
      <keep-alive>
        <component v-bind:is="component" :personId="personId" :person="person" :personType="personType"></component>
      </keep-alive>
    </v-content>
</template>
<script>
import movieListing from '~/components/default/listingByPerson/movieListing'
import seriesListing from '~/components/default/listingByPerson/seriesListing'
export default {
  name:'person',
  middleware:['auth','subscription_needed'],
  components: {
    'movie-listing' : movieListing,
    'series-listing' : seriesListing
  },
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  data () {
    return {
      component: 'movie-listing',
      personId:'',
      person:[],
      personType:'',
    }
  },
  methods:{
    getPersonDetails(){
      try {
        if(this.personType == 'cast' || this.personType == 'directors'){
          // Good to go
          this.$axios.get(`/${this.personType}/list/${this.personId}`).then((response) => {
            this.person = response.data.data[0]
          }, (err) => {
            if (!err.response) {
              this.$store.commit('snackIt', "Server isn't responding video category can't be fetched")
            } else {
              console.log(err.response.status)
              if(err.response.status==404){
                this.$store.commit('snackIt', "This person type does not exist")
              }else{
                let errorMsg = err.response.data.errors.error
                console.log(errorMsg)
                this.$store.commit('snackIt', errorMsg[0])
              }
            }
          })
        }else{
          this.$store.commit('snackIt', "Unknown person type")
          return
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
  beforeMount(){
    this.personId = this.$route.params.id
    this.personType = this.$route.query.type
    this.getPersonDetails()
  }
}
</script>
<style scoped>

</style> 