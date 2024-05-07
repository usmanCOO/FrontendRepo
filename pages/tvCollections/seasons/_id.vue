<template>
  <v-content>
    <div class="Vidlix_active_layout mt-5 pt-2">
      <div class="rowContainer_layout active">
        <v-flex class="pt-3 pl-3">
          <div pl-2 class="title">{{seriesDetails.series_name}}</div>
          <!-- catagory_season -->
          <div class="dropsea d-block mt-3">
            <v-menu v-if="seasons && seasons.length > 0" offset-y>
              <v-btn slot="activator" color="primary">
                Season {{selectedSeasonSequence}} 
                <v-icon>expand_more</v-icon>
              </v-btn>
              <v-list class="listseason">
                <v-list-tile v-for="season in seasons" :key="season.season_id" @click="updateSeason(season.season_id)" >
                  <v-list-tile-title active-class="highlighted"> 
                    Season {{season.sequence}}
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
        </v-flex>
        <template v-if="seasonVideos">
          <template v-for="(seasonVids, index) in seasonVideos">
            <template v-if="seasonVids && seasonVids.length > 0">
              <div v-if="seasonVideos && seasonVideos.length > 0" class="rowContainer_title_card"  id="row-1">
                <v-layout row wrap my-2 mx-0 py-3>
                  <v-flex v-for="seasonVid in seasonVids" :key="seasonVid.videoid" lg2 md4 sm4 xs6 class="item_thumb">
                    <v-hover>
                      <v-card slot-scope="{ hover }" dark class="block-holder mx-1 my-1" :ref="`conventional`+index+seasonVid.videoid">
                        <router-link class="sliderimg" to="">
                          <v-img
                          :src="hover ? seasonVid.gif != null ? seasonVid.gif : seasonVid.thumbs.original : seasonVid.thumbs.original"
                          :lazy-src="`${seasonVid.thumbs.original}`"
                          aspect-ratio="1"
                          class="grey lighten-2"
                          >
                            <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-layout>
                          </v-img>
                        </router-link>
                        <div class="hover__detaillist">
                          <router-link :to="`/watch/${seasonVid.videoid}?type=series&series_id=${seriesDetails.series_id}&season_id=${selectedSeasonId}`">
                            <div class="bob-overview-wrapper"> 
                              <div class="title mx-2 mt-2">{{seasonVid.title}}</div>
                              <time class="caption time mx-2">{{seasonVid.duration}}</time>
                              <p class="caption dec mx-2">{{seasonVid.description}}</p>
                            </div>
                          </router-link>
                        </div>
                        <span :ref="`conventional`+index+seasonVid.videoid+'Arrow'"></span>
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-layout>
              </div>
            </template>
          </template>
        </template>
      </div>
    </div>
    <template v-if='dataLoading'>
      <circleLoader/>
    </template>
    <!-- Load more loader -->
  </v-content>
</template>
<script>
import videoDetails from '~/components/default/base/videoDetails'
import circleLoader from '~/components/default/circleLoader'
export default {
  name:'movies',
  middleware:['auth','subscription_needed'],
  components: {
    videoDetails,
    circleLoader
  },
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  data(){
    return{
      page: 1,
      seriesDetails:'',
      seasons:[],
      dataLoading:true,
      dataArray : [],
      seasonVideos : [],
      selectedSeasonSequence:1,
    }
  },
  methods:{
    sortEpisodes(){
      let finalArray = []
      let count = this.dataArray.length
      var videosPerRow = 6
      let iteration = Math.ceil(count/videosPerRow)
      let lower = 0
      let upper = videosPerRow
      for(let i=0;i<iteration;i++){
        finalArray.push(this.dataArray.slice(lower, upper));
        upper = upper+videosPerRow
        lower = lower + videosPerRow
      }
      this.seasonVideos = finalArray
    },
    updateSeason(seasonId){
      let season = this.$findObjectByKey(this.seasons,'season_id',seasonId)
      this.selectedSeasonEpisodes = season.episodes
      this.selectedSeasonSequence = season.sequence
      this.selectedSeasonId = season.season_id
      this.dataArray = season.episodes
      this.sortEpisodes()
    },
    setPageData(){
      try{
        this.dataLoading = true
        this.$axios.get(`/series/list/${this.$route.params.id}?maturity_level=${this.$store.getters.currentProfile.maturity_level}`).then((response) => {
          this.dataLoading = false
          let baseObj = response.data.series
          this.seriesDetails = baseObj.series_by_id[0]
          this.selectedSeasonId = this.seriesDetails.seasons[0].season_id
          this.seasons = this.seriesDetails.seasons 
          this.dataArray = this.seriesDetails.seasons[0].episodes
          this.sortEpisodes()
        },(err)=>{
          this.dataLoading = false
          if (!err.response) {
            this.$store.commit('snackIt', "Server isn't responding video categories can't be fetched")
          } else {
            let errorMsg = err.response.data.errors.error
            console.log(errorMsg)
            this.$store.commit('snackIt', errorMsg[0])
          }
        }); 
      }catch(err){
        console.log(err)
      }
    },
  },
  beforeMount(){
    this.setPageData()
  },
}
</script>