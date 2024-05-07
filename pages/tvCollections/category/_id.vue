<template>
  <v-content>
    <seriesCategories :switchLayout="switchLayout"/>
    <div class="Vidlix_active_layout">
      <div class="Movies__Categorylist active"> 
        <!-- cat videos -->
        <section v-if="seriesByCategories && seriesByCategories.length > 0" class="innerTrending__Video"> 
          <div class="swiper-container slider">
            <div class="title">{{sCat.category_name}}</div>
            <div v-swiper="swiperTrending" :instanceName="'swipperTr'">
              <div class="swiper-wrapper slider-v">
                <div v-for="categorySeries in seriesByCategories" class="swiper-slide innerthumbs__v" @mouseenter="hoverIn" @mouseleave="hoverOut">
                  <div class="v-thumb" :ref="`category${categorySeries.series_id}`">
                    <div class="sliderimg">
                      <v-img
                      :src="`${categorySeries.thumb}`"
                      :lazy-src="`${categorySeries.thumb}`"
                      aspect-ratio="1"
                      class="grey lighten-2"
                      >
                        <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-layout>
                      </v-img>
                    </div>
                    <div class="hover__detaillist">
                      <div @click="takeMeToWatch(categorySeries)">
                        <div class="bob-overview-wrapper"> 
                          <div class="title mx-2 mt-2">{{categorySeries.series_name}}</div>
                          <p class="caption dec mx-2">{{categorySeries.series_description}}</p>
                        </div>
                      </div>
                      <div class="click_detail" v-on:click="getMeSeries(categorySeries.series_id,'category')">
                        <v-icon dark>expand_more</v-icon>
                      </div>
                    </div>
                    <span :ref="`category${categorySeries.series_id}Arrow`"></span>
                  </div>
                </div>
              </div>
              <div class="swiper-slider-prev">
                <v-icon>chevron_left</v-icon>
              </div>
              <div class="swiper-slider-next">
                <v-icon>chevron_right</v-icon>
              </div>
            </div>
            <seriesDetails v-show="false" :ref="'category'" :sData="{'type':'category'}" :closeSeriesDetails="closeSeriesDetails" :withCloseBtn="true"/>
          </div> 
        </section>
        <section v-if="noVidFound" class="container">
          <v-card pa-5>
            <v-card-title v-if="sCat.category_name" class="headline">{{sCat.category_name}}</v-card-title>
            <v-card-title v-else class="headline">Unknown</v-card-title>
            <v-card-text>
              <p class="subheading">No videos found against this category</p>
            </v-card-text>
          </v-card>
        </section>
      </div>
    </div>
    <template v-if='dataLoading'>
      <circleLoader/>
    </template>
  </v-content>
</template>
<script>
import axios from 'axios';  
import seriesDetails from '~/components/default/base/seriesDetails'
import seriesCategories from '~/components/default/category/seriesCategories'
import circleLoader from '~/components/default/circleLoader'
export default {
  name:'moviesByCategory',
  middleware:['auth','subscription_needed'],
  components: {
    seriesDetails,
    seriesCategories,
    circleLoader
  },
  data(){
    return{
      page: 1,
      swiperTrending: {
        simulateTouch:false,
        slidesPerView: 6,
        spaceBetween: 10,
        slidesPerGroup: 3,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1400: {
            slidesPerView: 5,
            spaceBetween: 15
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 0
          },
          375: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        },
        navigation: {
          nextEl: '.swiper-slider-next',
          prevEl: '.swiper-slider-prev'
        }
      },
      seriesByCategories:[],
      sCat:'',
      dataLoading:true,
      noVidFound:false,
    }
  },
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  methods:{
    hoverIn(e){
      this.$mouseEnter(e)
    },
    hoverOut(e){
      this.$mouseLeave(e)
    },
    takeMeToWatch(seriesObj){
      let seasons = seriesObj.seasons
      let firstSeason = seasons.filter((season) => season.sequence == 1)
      firstSeason = firstSeason[0]
      let minMaxOfEpisodes = this.$minMaxOfArrayOfObjects(firstSeason.episodes,'videoid')
      let episode_id = minMaxOfEpisodes.min
      if(!minMaxOfEpisodes)
        this.$store.commit('snackIt', "No episodes added in this series's seasons")
      else
        this.$router.push(`/watch/${episode_id}?type=series&series_id=${seriesObj.series_id}&season_id=${firstSeason.season_id}`)
    },
    getMeSeries(series_id,identifier){
      this.markNewThumb(series_id,identifier)
      this.closePrevSeriesDetails(identifier)
      this.rowIdentifier = identifier
      this.$root.$emit('getSeriesData',{'series_id':series_id,'identifier':identifier})
      var el = this.$refs[identifier][0]===undefined ? this.$refs[identifier].$el : this.$refs[identifier][0].$el
      el.removeAttribute('style')
    },
    markNewThumb(series_id,identifier){
      this.unmarkPrevThumb(series_id)
      let id = identifier+series_id
      let elArrowId = id+'Arrow'
      this.$refs[id][0].classList.add("border_selected")
      this.$refs[elArrowId][0].classList.add("arroow")
    },
    unmarkPrevThumb(series_id=null){
      if(!this.prevSeries){
        this.prevSeries = series_id
      }else{
        let prevSeriesTempId = this.prevIdentifier+this.prevSeries
        let elem =  this.$refs[prevSeriesTempId][0]
        elem.classList.remove("border_selected")
        this.prevSeries = series_id
      }
    },
    closeSeriesDetails(){
      let identifier = this.rowIdentifier
      var el = this.$refs[identifier][0]===undefined ? this.$refs[identifier].$el : this.$refs[identifier][0].$el
      el.style.display = 'none'
      this.unmarkPrevThumb()
    },
    closePrevSeriesDetails(identifier){
      if(!this.prevIdentifier || this.prevIdentifier!=identifier){
        if(this.prevIdentifier){
          let prevDetailsTempId = this.prevIdentifier
          var el = this.$refs[prevDetailsTempId][0]===undefined ? this.$refs[prevDetailsTempId].$el : this.$refs[prevDetailsTempId][0].$el
          el.style.display = 'none'
        }
        this.prevIdentifier = identifier
      }
    },
    getCategoryDetails(){
      try {
        this.$axios.get(`/series/categories/${this.$route.params.id}`).then((response) => {
          this.sCat = response.data.categories
        }, (err) => {
          if (!err.response) {
            this.$store.commit('snackIt', "Server isn't responding series category can't be fetched")
          } else {
            console.log(err.response.status)
            if(err.response.status==404){
              this.$store.commit('snackIt', "Category does not exist")
            }else{
              let errorMsg = err.response.data.errors.error
              console.log(errorMsg)
              this.$store.commit('snackIt', errorMsg[0])
            }
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    setPageData(){
      try{
        this.getCategoryDetails()
        this.$axios.get(`/series/list/?categories=${this.$route.params.id}&maturity_level=${this.$store.getters.currentProfile.maturity_level}`).then((response) => {
          this.dataLoading = false
          let id = this.$route.params.id
          this.seriesByCategories = response.data.series.category_series[id]
        },(err)=>{
          this.dataLoading = false
          if (!err.response) {
            this.$store.commit('snackIt', "Server isn't responding series categories can't be fetched")
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
    switchLayout(flag){
      // this.defaultLayout=flag
      console.log('Good to know')
    },
  },
  beforeMount(){
    this.setPageData()
  },
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 2000)
    });
  },
}
</script>