<template>
	<v-content>
		<!-- feachers__collection -->
		<!-- <v-layout v-if="trendingSeries && trendingSeries.length > 0" py-2 class="feachers__collection">
			<div class="swiper-container">
				<div v-swiper:mySwipperFH="swiperOptionh">
					<div class="swiper-wrapper">
						<div v-for="trendingSeriesItem in trendingSeries" class="swiper-slide">
							<div class="v-thumb">
								<router-link class="Hthumb" to="">
									<v-img
									:src="`${trendingSeriesItem.thumb}`"
									:lazy-src="`${trendingSeriesItem.thumb}`"
									aspect-ratio="1"
									class="grey lighten-2"
									>
										<v-layout slot="placeholder" fill-height align-center justify-center ma-0>
									  		<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
										</v-layout>
									</v-img>
								</router-link>
								<div class="hover_detail_list py-2">
									<div class="textinner">
										<div class="subheading">{{trendingSeriesItem.series_name}}</div>
										<p class="caption dec">
											{{trendingSeriesItem.series_description}}
											<a href="#">{{$t("see_more")}}</a>
										</p>
										<div class="btn-hover_bottom text-xs-center">
											<v-flex xs12>
												<v-btn round class="watch" @click="takeMeToWatch(trendingSeriesItem)">
													<v-icon>play_arrow</v-icon>
													{{$t("watch_now")}}
												</v-btn>
											</v-flex>
											<v-flex xs12>
												<v-btn :to="`/tvCollections/seasons/${trendingSeriesItem.series_id}`" round class="view">
													<v-icon>video_library</v-icon>
													{{$t("view_seasons")}}
												</v-btn>
											</v-flex>
											<v-flex xs12>
												<v-btn :to="`/tvCollections/details/${trendingSeriesItem.series_id}`" round class="view">
													<v-icon>video_library</v-icon>
													{{$t("view details")}}
												</v-btn>
											</v-flex>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="swiper-prev">
						<v-icon>chevron_left</v-icon>
					</div>
					<div class="swiper-next">
						<v-icon>chevron_right</v-icon>
					</div>
				</div>
			</div> 
		</v-layout> -->
			<editorPicks :addToMyList="addToMyList" 
			 :swiperOption="swiperOption" 
			 :editorPicks="trendingSeries" />

		<!-- Collection_allCategory -->
		<seriesCategories :switchLayout="switchLayout"/>
		<div class="Vidlix_active_layout">
			<div v-if="defaultLayout" class="rowContainer_collectionlayout active">
				<v-layout v-if="recentSeries && recentSeries.length > 0" row wrap my-2 mx-3 py-3 class="rowContainer_title_card ">
					<v-flex v-for="recentSeriesItem in recentSeries" :key="recentSeriesItem.series_id" lg2 md3 sm3 xs12 px-2 my-3 class="item_collectionthumb">
						<v-card dark class="block-holder mx-1 my-1">
								<router-link class="Hthumb" to="">
									<v-img
									:src="`${recentSeriesItem.thumb}`"
									:lazy-src="`${recentSeriesItem.thumb}`"
									aspect-ratio="1"
									class="grey lighten-2"
									>
										<v-layout slot="placeholder" fill-height align-center justify-center ma-0>
									  		<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
										</v-layout>
									</v-img>
								</router-link>
								<div class="hover_detail_list py-2">
									<div class="textinner">
										<div class="subheading">{{recentSeriesItem.series_name}}</div>
										<!-- <span class="caption time">2h 14min</span> -->
										<p class="caption dec">
											{{recentSeriesItem.series_description}}<a href="#">See More</a>
										</p>
										<div class="btn-hover_bottom text-xs-center">
											<v-flex xs12>
												<v-btn round class="watch" @click="takeMeToWatch(recentSeriesItem)">
													<v-icon>play_arrow</v-icon>
													{{$t("watch now")}}
												</v-btn>
											</v-flex>
											<!-- <v-flex xs12>
												<v-btn :to="`/tvCollections/seasons/${recentSeriesItem.series_id}`" round class="view">
													<v-icon>video_library</v-icon>
													{{$t("view seasons")}}
												</v-btn>
											</v-flex> -->
											<v-flex xs12>
												<v-btn :to="`/tvCollections/details/${recentSeriesItem.series_id}`" round class="view">
													<v-icon>video_library</v-icon>
													{{$t("view details")}}
												</v-btn>
											</v-flex>
										</div>
									</div>
								</div>
						</v-card>
						<div class="inner_details mx-1">
							<div class="title my-2">{{recentSeriesItem.series_name}}</div>
						</div>
					</v-flex>
				</v-layout>
			</div>
			<div v-else class="collectionlayout__Categorylist active"> 
				<template v-if="seriesByCategories">
					<template v-for="(catSeries, index) in seriesByCategories">
						<template v-if="catSeries && catSeries.length > 0">
							<section class="innerCategory__Video"> 
								<div class="swiper-container slider">
									<div class="title">
										{{index}}
									</div>
									<div v-swiper="swiperTrending" :instanceName="index">
										<div class="swiper-wrapper slider-v">
											<div  v-for="catSeriesItem in catSeries" class="swiper-slide innerthumbs__v" @mouseenter="hoverIn" @mouseleave="hoverOut">
												<div class="v-thumb" :ref="index+catSeriesItem.series_id">
													<div class="sliderimg">
														<v-img
														:src="`${catSeriesItem.thumb}`"
														:lazy-src="`${catSeriesItem.thumb}`"
														aspect-ratio="1"
														class="grey lighten-2"
														>
															<v-layout slot="placeholder" fill-height align-center justify-center ma-0>
																<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
															</v-layout>
														</v-img>
													</div>
													<div class="hover__detaillist">
														<div @click="takeMeToWatch(catSeriesItem)">
															<div class="bob-overview-wrapper"> 
																<div class="title mx-2 mt-2">{{catSeriesItem.series_name}}</div>
																<p class="caption dec mx-2">{{catSeriesItem.series_description}}</p>
															</div>
														</div>
														<div class="btn__show align-center column  justify-start fill-height">
															<v-btn fab small @click="addToMyList(catSeriesItem)">
																<v-icon dark>add</v-icon>
															</v-btn>
														</div>
														<div class="click_detail" v-on:click="getMeSeries(catSeriesItem.series_id,index)">
															<v-icon dark>expand_more</v-icon>
														</div>
													</div>
													<span :ref="index+catSeriesItem.series_id+'Arrow'"></span>
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
									<!-- Series details component to written -->
									<seriesDetails v-show="false" :ref="index" :sData="{'type':index}" :closeSeriesDetails="closeSeriesDetails" :withCloseBtn="true"/>
								</div>
							</section>
						</template> 
					</template>
				</template>
			</div>
		</div>
		<template v-if='dataLoading'>
			<circleLoader/>
		</template>
	</v-content>
</template>
<script>
import seriesDetails from '~/components/default/base/seriesDetails'
import seriesCategories from '~/components/default/category/seriesCategories'
import editorPicks from '~/components/default/home/editorPicks'
import circleLoader from '~/components/default/circleLoader'
export default {
	name:'Collectiontv',
	middleware:['auth','subscription_needed'],
	components: {
		seriesDetails,
		seriesCategories,
		circleLoader
	},
	head(){
		return {
			titleTemplate: this.$t('series')+' - %s',
			meta:[
				{
					name:'description',
					content:'Recent movies'
				}
			]
		}
	},
	data () {
		return {
			value: '',
			swiperOptionh: {
				slidesPerView:7,
				spaceBetween:15,
				loop: false,
				navigation: {
					nextEl: '.swiper-next',
					prevEl: '.swiper-prev',
				},
				breakpoints: {
					1400: {
						slidesPerView: 6,
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
						slidesPerView: 2,
						spaceBetween: 10
					}
				}
			},
				swiperOption: {
// 				autoplay: {
//     delay: 2000,
//   },
  loop:true,
  spaceBetween:100,
  nav:false,
				pagination: {
					el: '.swiper-pagination',
				},
				navigation: {
					nextEl: '.editer_next',
					prevEl: '.editer_prev',
				},
				effect: 'slide',
    // Distance between slides in px.
    spaceBetween: 0,
    //
    slidesPerView: 1.4,
    //
    centeredSlides: true,
    //
    slidesOffsetBefore: 0,

			},
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
			  series:'',
			  defaultLayout:true,
			  trendingSeries:'',
			  recentSeries:'',
			  seriesByCategories:'',
				rowIdentifier:'',
		  	prevIdentifier:'',
		  	prevSeries:'',
		  	dataLoading:true,
			}
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
		// this method will be fired when close button will be clicked
		closeSeriesDetails(){
			let identifier = this.rowIdentifier
			var el = this.$refs[identifier][0]===undefined ? this.$refs[identifier].$el : this.$refs[identifier][0].$el
			el.style.display = 'none'
			this.unmarkPrevThumb()
		},
		// this method will be fired when new video will be open for details
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
		setTrendingSeries(){
			try{
				this.$axios.get(`/series/list/?trending=1&maturity_level=${this.$store.getters.currentProfile.maturity_level}`).then((response) => {
					this.trendingSeries = response.data.series.trending
					console.log(this.trendingSeries);
				},(err)=>{
					if (!err.response) {
						this.$store.commit('snackIt', "Server isn't responding your list can't be fetched")
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
		setRecentSeries(){
			try{
				this.$axios.get(`/series/list/?recent=1&maturity_level=${this.$store.getters.currentProfile.maturity_level}`).then((response) => {
					this.dataLoading = false
					this.recentSeries = response.data.series.recent
				},(err)=>{
					this.dataLoading = false
					if (!err.response) {
						this.$store.commit('snackIt', "Server isn't responding your list can't be fetched")
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
		addToMyList(series){
			try{
				var seriesObj = {
					'series_id' : series.series_id,
				}
				this.$axios.post('/series/addToFavourites', seriesObj).then((response)=>{
					this.$store.commit('snackIt',series.series_name+' added to your list');
				}).catch((err)=>{
					if(!err.response){
						this.$store.commit('snackIt',`Server isn't responding ${series.series_name} cannot be added to your list`)
					}else{
						let errorMsg = err.response.data.errors.error;
						console.log(errorMsg)
						this.$store.commit('snackIt',errorMsg[0]);
					}
				});
			}catch(err){
				console.log(err)
			}	
		},
		setSeriesByCategories(){
			try{
				this.dataLoading = true
				this.$axios.get(`/series/list/?getSeriesByCategories=1&maturity_level=${this.$store.getters.currentProfile.maturity_level}`).then((response) => {
					this.dataLoading = false
					this.seriesByCategories = response.data.series.series_by_categories
				},(err)=>{
					this.dataLoading = false
					if (!err.response) {
						this.$store.commit('snackIt', "Server isn't responding your list can't be fetched")
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
			if(flag == true)
				this.setRecentSeries()
			else
				this.setSeriesByCategories()
			this.defaultLayout=flag
		},
	},
	beforeMount(){
		this.setTrendingSeries();
		this.setRecentSeries()
		this.switchLayout(true)
	},
	mounted () {
		
	}
}
</script>