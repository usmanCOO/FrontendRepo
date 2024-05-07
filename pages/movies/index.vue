<template>
	<v-content>
		<movieCategories :switchLayout="switchLayout"/>
		<div class="Vidlix_active_layout">
			<div class="Movies__Categorylist active" v-if='defaultLayout'> 
				<!-- trending -->
				<section v-if="trendingVideos && trendingVideos.length > 0" class="innerTrending__Video"> 
					<div class="swiper-container slider">
						<div class="title">{{$t("trending")}}</div>
						<div v-swiper="swiperTrending" :instanceName="'swipperTr'">
							<div class="swiper-wrapper slider-v">
								<div v-for="trendingVideo in trendingVideos" class="swiper-slide innerthumbs__v" @mouseenter="hoverIn" @mouseleave="hoverOut">
									<v-hover>
										<div slot-scope="{ hover }" class="v-thumb" :ref="`trending${trendingVideo.videoid}`">
											<div class="sliderimg">
												<span v-if="trendingVideo.live != ''" class="liveicon">live</span>
												<v-img
												:src="hover ? trendingVideo.gif != null ? trendingVideo.gif : trendingVideo.thumbs['416x260'] : trendingVideo.thumbs['original']"
												:lazy-src="`${trendingVideo.thumbs['168x105']}`"
												aspect-ratio="1"
												class="grey lighten-2"
												>
													<v-layout slot="placeholder" fill-height align-center justify-center ma-0>
												  		<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
													</v-layout>
												</v-img>
											</div>
											<div class="hover__detaillist">
												<router-link :to="`/watch/${trendingVideo.videoid}`">
													<div class="bob-overview-wrapper"> 
														<div class="title mx-2 mt-2">{{trendingVideo.title}}</div>
														<time class="caption time mx-2">{{trendingVideo.duration}}</time>
														<p class="caption dec mx-2">{{trendingVideo.description}}
														</p>
													</div>
												</router-link>
												<div class="btn__show align-center column  justify-start fill-height">
													<v-btn fab small @click="likeVideo(trendingVideo)">
														<v-icon dark>favorite</v-icon>
													</v-btn>
													<v-btn fab small @click="addToMyList(trendingVideo)">
														<v-icon dark>add</v-icon>
													</v-btn>
												</div>
												<div class="click_detail" v-on:click="getMeVideo(trendingVideo.videoid,'trending')">
													<v-icon dark>expand_more</v-icon>
												</div>
											</div>
											<span :ref="`trending${trendingVideo.videoid}Arrow`"></span>
										</div>
									</v-hover>
								</div>
							</div>
							<div class="swiper-slider-prev">
								<v-icon>chevron_left</v-icon>
							</div>
							<div class="swiper-slider-next">
								<v-icon>chevron_right</v-icon>
							</div>
						</div>
						<videoDetails v-show="false" :ref="'trending'" :vData="{'type':'trending'}" :closeVideoDetails="closeVideoDetails"/>
					</div> 
				</section>
				<!-- recent -->
				<section  v-if="recentVideos && recentVideos.length > 0" class="innerTrending__Video"> 
					<div class="swiper-container slider">
						<div class="title">{{$t("recent")}}</div>
						<div v-swiper="swiperTrending" :instanceName="'swipperRecent'">
							<div class="swiper-wrapper slider-v">
								<div v-for="recentVideo in recentVideos" class="swiper-slide innerthumbs__v" @mouseenter="hoverIn" @mouseleave="hoverOut">
									<v-hover>
									<div slot-scope="{ hover }" class="v-thumb" :ref="`recent${recentVideo.videoid}`">
										<div class="sliderimg">
											<span v-if="recentVideo.live != ''" class="liveicon">live</span>
											<v-img
											:src="hover ? recentVideo.gif != null ? recentVideo.gif : recentVideo.thumbs['416x260'] : recentVideo.thumbs['original']"
											:lazy-src="`${recentVideo.thumbs['168x105']}`"
											aspect-ratio="1"
											class="grey lighten-2"
											>
												<v-layout slot="placeholder" fill-height align-center justify-center ma-0>
													<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
												</v-layout>
											</v-img>
										</div>
										<div class="hover__detaillist">
											<router-link :to="`/watch/${recentVideo.videoid}`">
												<div class="bob-overview-wrapper"> 
													<div class="title mx-2 mt-2">{{recentVideo.title}}</div>
													<time class="caption time mx-2">{{recentVideo.duration}}</time>
													<p class="caption dec mx-2">{{recentVideo.description}}
													</p>
												</div>
											</router-link>
											<div class="btn__show align-center column  justify-start fill-height">
												<v-btn fab small @click="likeVideo(recentVideo)">
													<v-icon dark>favorite</v-icon>
												</v-btn>
												<v-btn fab small @click="addToMyList(recentVideo)">
													<v-icon dark>add</v-icon>
												</v-btn>
											</div>
											<div class="click_detail" v-on:click="getMeVideo(recentVideo.videoid,'recent')">
												<v-icon dark>expand_more</v-icon>
											</div>
										</div>
										<span :ref="`recent${recentVideo.videoid}Arrow`"></span>
									</div>
									</v-hover>
								</div>
							</div>
							<div class="swiper-slider-prev">
								<v-icon>chevron_left</v-icon>
							</div>
							<div class="swiper-slider-next">
								<v-icon>chevron_right</v-icon>
							</div>
						</div>
						<videoDetails v-show="false" :ref="'recent'" :vData="{'type':'recent'}" :closeVideoDetails="closeVideoDetails"/>
					</div> 
				</section>
				<!-- cat videos -->
				<template v-if="categoryVideos">
					<template v-for="(catVids, index) in categoryVideos">
						<template v-if="catVids && catVids.length > 0">
							<section class="innerCategory__Video"> 
								<div class="swiper-container slider">
									<div class="title">
										{{getCategoryName(index)}} <v-btn flat small ml-5 :to="`/movies/category/${index}`">Explore all</v-btn> 
									</div>
									<br>
									<div v-swiper="swiperTrending" :instanceName="index">
										<div class="swiper-wrapper slider-v">

											<div  v-for="catVid in catVids" class="swiper-slide innerthumbs__v" @mouseenter="hoverIn" @mouseleave="hoverOut">

												<v-hover>
													<div slot-scope="{ hover }" class="v-thumb" :ref="index+catVid.videoid">

														<div class="sliderimg">
															<span v-if="catVid.live != ''" class="liveicon">live</span>
															<v-img
															:src="hover ? catVid.gif != null ? catVid.gif : catVid.thumbs['416x260'] : catVid.thumbs['original']"
															:lazy-src="`${catVid.thumbs['168x105']}`"
															aspect-ratio="1"
															class="grey lighten-2"
															>
																<v-layout slot="placeholder" fill-height align-center justify-center ma-0>
																	<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
																</v-layout>
															</v-img>
														</div>
														<div class="hover__detaillist">
															<router-link :to="`/watch/${catVid.videoid}`">
																<div class="bob-overview-wrapper"> 
																	<div class="title mx-2 mt-2">{{catVid.title}}</div>
																	<time class="caption time mx-2">{{catVid.duration}}</time>
																	<p class="caption dec mx-2">{{catVid.description}}</p>
																</div>
															</router-link>
															<div class="btn__show align-center column  justify-start fill-height">
																<v-btn fab small @click="likeVideo(catVid)">
																	<v-icon dark>favorite</v-icon>
																</v-btn>
																<v-btn fab small @click="addToMyList(catVid)">
																	<v-icon dark>add</v-icon>
																</v-btn>
															</div>
															<div class="click_detail" v-on:click="getMeVideo(catVid.videoid,index)">
																<v-icon dark>expand_more</v-icon>
															</div>
														</div>
														<span :ref="index+catVid.videoid+'Arrow'"></span>
													</div>
												</v-hover>
											</div>
										</div>
										<div class="swiper-slider-prev">
											<v-icon>chevron_left</v-icon>
										</div>
										<div class="swiper-slider-next">
											<v-icon>chevron_right</v-icon>
										</div>
									</div>
									<videoDetails v-show="false" :ref="index" :vData="{'type':index}" :closeVideoDetails="closeVideoDetails"/>
								</div>
							</section>
						</template> 
					</template>
				</template>
			</div>
			<div class="rowContainer_layout active" v-else>
				<v-flex xs1 class="pt-3 pl-3">
			  	<div pl-2 class="title">{{$t("trending")}}</div>
				</v-flex>
				<template v-if="trendingAll">
					<template v-for="(trendingVids, index) in trendingAll">
						<template v-if="trendingVids && trendingVids.length > 0">
							<div v-if="trendingAll && trendingAll.length > 0" class="rowContainer_title_card"  id="row-1">
								<v-layout row wrap my-2 mx-0 py-3>
									<v-flex v-for="trendingVid in trendingVids" :key="trendingVid.videoid" lg2 md4 sm4 xs6 class="item_thumb" @mouseenter="hoverIn" @mouseleave="hoverOut">

										<v-hover>
											<v-card slot-scope="{ hover }" dark class="block-holder mx-1 my-1" :ref="`conventional`+index+trendingVid.videoid">
												<router-link class="sliderimg" to="">
													<v-img
													:src="hover ? trendingVid.gif != null ? trendingVid.gif : trendingVid.thumbs['416x260'] : trendingVid.thumbs['original']"
													:lazy-src="`${trendingVid.thumbs['168x105']}`"
													aspect-ratio="1"
													class="grey lighten-2"
													>
														<v-layout slot="placeholder" fill-height align-center justify-center ma-0>
													  		<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
														</v-layout>
													</v-img>
												</router-link>
												<div class="hover__detaillist">
													<router-link :to="`/watch/${trendingVid.videoid}`">
														<div class="bob-overview-wrapper"> 
															<div class="title mx-2 mt-2">{{trendingVid.title}}</div>
															<time class="caption time mx-2">{{trendingVid.duration}}</time>
															<p class="caption dec mx-2">{{trendingVid.description}}</p>
														</div>
													</router-link>
													<div class="btn__show align-center column  justify-start fill-height">
														<v-btn fab small @click="likeVideo(trendingVid)">
															<v-icon dark>favorite</v-icon>
														</v-btn>
														<v-btn fab small @click="addToMyList(trendingVid)">
															<v-icon dark>add</v-icon>
														</v-btn>
													</div>
													<div class="click_detail" v-on:click="getMeVideo(trendingVid.videoid,`conventional`+index)">
														<v-icon dark>expand_more</v-icon>
													</div>
												</div>
												<span :ref="`conventional`+index+trendingVid.videoid+'Arrow'"></span>
											</v-card>
										</v-hover>
									</v-flex>
								</v-layout>
								<videoDetails v-show="false" :ref="`conventional`+index" :vData="{'type':`conventional`+index}" :closeVideoDetails="closeVideoDetails"/>
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
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div>
	</v-content>
</template>
<script>
import videoDetails from '~/components/default/base/videoDetails'
import movieCategories from '~/components/default/category/movieCategories'
import circleLoader from '~/components/default/circleLoader'
export default {
	name:'movies',
	middleware:['auth','subscription_needed'],
	components: {
		videoDetails,
		movieCategories,
		circleLoader
	},
	head(){
		return {
			titleTemplate: this.$t('movies')+' - %s',
			meta:[
				{
					name:'description',
					content:'Movies'
				}
			]
		}
	},
	data(){
		return{
			value: '',	
			page: 1,
			swiperTrending: {
				simulateTouch:false,
				slidesPerView: 6,
				spaceBetween: 4,
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
						spaceBetween: 4
					},
					1024: {
						slidesPerView: 4,
						spaceBetween: 4
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 4
					},
					640: {
						slidesPerView: 2,
						spaceBetween: 4
					},
					375: {
						slidesPerView: 2,
						spaceBetween: 4
					}
				},
				navigation: {
					nextEl: '.swiper-slider-next',
					prevEl: '.swiper-slider-prev'
				}
			},
			defaultLayout:true,
			trendingVideos:[],
			categoryVideos:[],
			videoCategories:[],
			recentVideos:[],
			trendingAll:[],
			prevVid:'',
			prevIdentifier:'',
			rowIdentifier:'',
			dataLoading:true,
			// For conventional layout
			currentPage:'',
			lastPage:'',

			// Data array
			dataArray : [],
			busy:false,
		}
	},
	methods:{
		hoverIn(e){
			this.$mouseEnter(e)
		},
		hoverOut(e){
			this.$mouseLeave(e)
		},
		// this method will be fired when show details button will be clicked
		getMeVideo(videoid,identifier){
			this.markNewThumb(videoid,identifier)
			this.closePrevVideoDetails(identifier)
			this.rowIdentifier = identifier
			this.$root.$emit('getVideoData',{'videoid':videoid,'identifier':identifier})
			var el = this.$refs[identifier][0]===undefined ? this.$refs[identifier].$el : this.$refs[identifier][0].$el
			el.removeAttribute('style')
		},
		markNewThumb(videoid,identifier){
			this.unmarkPrevThumb(videoid)
			let id = identifier+videoid
			let elArrowId = id+'Arrow'
			
			if( this.defaultLayout === true ){
				var el = this.$refs[id][0]===undefined ? this.$refs[id] : this.$refs[id][0]
				var elArrow = this.$refs[elArrowId][0]===undefined ? this.$refs[elArrowId] : this.$refs[elArrowId][0]
			}else{
				var el = this.$refs[id][0].$el===undefined ? this.$refs[id].$el : this.$refs[id][0].$el
				var elArrow = this.$refs[elArrowId][0]===undefined ? this.$refs[elArrowId] : this.$refs[elArrowId][0]
			}
			el.classList.add("border_selected")
			elArrow.classList.add("arroow")
		},
		unmarkPrevThumb(videoid=null){
			if(!this.prevVid){
				this.prevVid = videoid
			}else{
				let prevVideoTempId = this.prevIdentifier+this.prevVid
				if( this.defaultLayout === true ){
					var elem = this.$refs[prevVideoTempId][0]===undefined ? this.$refs[prevVideoTempId] : this.$refs[prevVideoTempId][0]
				}else{
					var elem = this.$refs[prevVideoTempId][0].$el===undefined ? this.$refs[prevVideoTempId].$el : this.$refs[prevVideoTempId][0].$el
				}
				elem.classList.remove("border_selected")
				this.prevVid = videoid
			}
		},
		// this method will be fired when close button will be clicked
		closeVideoDetails(){
			let identifier = this.rowIdentifier
			var el = this.$refs[identifier][0]===undefined ? this.$refs[identifier].$el : this.$refs[identifier][0].$el
			el.style.display = 'none'
			this.unmarkPrevThumb()
		},
		// this method will be fired when new video will be open for details
		closePrevVideoDetails(identifier){
			if(!this.prevIdentifier || this.prevIdentifier!=identifier){
				if(this.prevIdentifier){
					let prevDetailsTempId = this.prevIdentifier
					var el = this.$refs[prevDetailsTempId][0]===undefined ? this.$refs[prevDetailsTempId].$el : this.$refs[prevDetailsTempId][0].$el
					el.style.display = 'none'
				}
				this.prevIdentifier = identifier
			}
		},
		likeVideo(video){
			try{
				var videoObj = {
					'videoid' : video.videoid,
				}
				this.$axios.post('/videos/like', videoObj).then((response)=>{
					this.$store.commit('snackIt',`Thanks for rating ${video.title}`);
				}).catch((err)=>{
					if(!err.response){
						this.$store.commit('snackIt',`Server isn't responding ${video.title} cannot be rated`)
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
		addToMyList(video){
			try{
				var videoObj = {
					'videoid' : video.videoid,
				}
				this.$axios.post('/videos/addToFavourites', videoObj).then((response)=>{
					this.$store.commit('snackIt',video.title+' added to your list');
				}).catch((err)=>{
					if(!err.response){
						this.$store.commit('snackIt',`Server isn't responding ${video.title} cannot be added to your list`)
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
		removeFromMyList(video){
			try{
				var videoObj = {
					'videoid' : video.videoid,
				}
				this.$axios.post('/videos/removeFavourite', videoObj).then((response)=>{
					this.$store.commit('snackIt',video.title+' removed from your list');
				}).catch((err)=>{
					if(!err.response){
						this.$store.commit('snackIt',`Server isn't responding ${video.title} cannot be removed from your list`)
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
		setDefaultLayoutData(){
			try{
				this.$axios.get(`/videos/list/?trending=1&recent=1&getVideosByCategories=1&maturity_level=${this.$store.getters.currentProfile.maturity_level}`).then((response) => {
					this.dataLoading = false
					let baseObj = response.data.videos
					this.recentVideos = baseObj.recent
					this.trendingVideos = baseObj.trending
					this.videoCategories = baseObj.videos_by_categories.video_categories
					delete baseObj.videos_by_categories.video_categories
					this.categoryVideos = baseObj.videos_by_categories
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
		setConventionalLayoutData(){
			try{
				this.busy = true
				this.dataLoading = true
				this.$axios.get(`/videos/list/?trending=1&page=${this.page}&paginate=1&maturity_level=${this.$store.getters.currentProfile.maturity_level}`).then((response) => {
					this.dataLoading = false
					let baseObj = response.data.videos
					let dataArray = baseObj.trending.data
					this.currentPage = baseObj.trending.current_page
  				this.lastPage = baseObj.trending.last_page

					if(this.dataArray.length == 0)
						this.dataArray = dataArray
					else{
						for(let i = 0;i < dataArray.length;i++){
							this.dataArray.push(dataArray[i])
						}
					}
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
					this.trendingAll = finalArray
					this.busy = false
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
		switchLayout(flag){
			this.prevVid = ''
			this.prevIdentifier = ''
			this.rowIdentifier = ''
			if(flag == true){
				// Setting page again back to page 1 and data array to empty array for conventional layout
				this.page = 1
				this.dataArray = []
				this.setDefaultLayoutData()
			} else {
				if(this.defaultLayout != false)
					this.setConventionalLayoutData()
			}
			this.defaultLayout=flag
		},
		loadMore(){
			if(this.defaultLayout == false){
				if(this.page < this.lastPage){
					this.page++
					this.setConventionalLayoutData()
				}
			}
		},
		getCategoryName(category_id){
			let obj = this.$findObjectByKey(this.videoCategories,'category_id',category_id)
			return obj.category_name
		}
	},
	beforeMount(){
		this.switchLayout(true)
	},
	mounted () {

  },
}
</script>