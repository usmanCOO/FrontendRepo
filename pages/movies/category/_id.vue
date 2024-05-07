<template>
	<v-content>
		<div class="Vidlix_active_layout mt-5 pt-2">
			<div class="rowContainer_layout active">
				<v-flex xs1 class="pt-3 pl-3">
			  	<div pl-2 class="title">{{vCat.category_name}}</div>
				</v-flex>
				<template v-if="categoryVideos">
					<template v-for="(catVids, index) in categoryVideos">
						<template v-if="catVids && catVids.length > 0">
							<div v-if="categoryVideos && categoryVideos.length > 0" class="rowContainer_title_card"  id="row-1">
								<v-layout row wrap my-2 mx-0 py-3>
									<v-flex v-for="catVid in catVids" :key="catVid.videoid" lg2 md4 sm4 xs6 class="item_thumb">
										<v-hover>
											<v-card slot-scope="{ hover }" dark class="block-holder mx-1 my-1" :ref="`conventional`+index+catVid.videoid">
												<router-link class="sliderimg" to="">
													<v-img
													:src="hover ? catVid.gif != null ? catVid.gif : catVid.thumbs.original : catVid.thumbs.original"
													:lazy-src="`${catVid.thumbs.original}`"
													aspect-ratio="1"
													class="grey lighten-2"
													>
														<v-layout slot="placeholder" fill-height align-center justify-center ma-0>
													  		<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
														</v-layout>
													</v-img>
												</router-link>
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
													<div class="click_detail" v-on:click="getMeVideo(catVid.videoid,`conventional`+index)">
														<v-icon dark>expand_more</v-icon>
													</div>
												</div>
												<span :ref="`conventional`+index+catVid.videoid+'Arrow'"></span>
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
import circleLoader from '~/components/default/circleLoader'
export default {
	name:'movies',
	middleware:['auth','subscription_needed'],
	components: {
		videoDetails,
		circleLoader
	},
	data(){
		return{
			value: '',	
			page: 1,
			swiperTrending: {
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
						slidesPerView: 1,
						spaceBetween: 4
					}
				},
				navigation: {
					nextEl: '.swiper-slider-next',
					prevEl: '.swiper-slider-prev'
				}
			},
			categoryVideos:[],
			prevVid:'',
			prevIdentifier:'',
			rowIdentifier:'',
			dataLoading:true,
			vCat:'',
			// For conventional layout
			currentPage:'',
			lastPage:'',

			// Data array
			dataArray : [],
			busy:false,
		}
	},
	methods:{
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
			
			var el = this.$refs[id][0].$el===undefined ? this.$refs[id].$el : this.$refs[id][0].$el
			var elArrow = this.$refs[elArrowId][0]===undefined ? this.$refs[elArrowId] : this.$refs[elArrowId][0]
			
			el.classList.add("border_selected")
			elArrow.classList.add("arroow")
		},
		unmarkPrevThumb(videoid=null){
			if(!this.prevVid){
				this.prevVid = videoid
			}else{
				let prevVideoTempId = this.prevIdentifier+this.prevVid
				var elem = this.$refs[prevVideoTempId][0].$el===undefined ? this.$refs[prevVideoTempId].$el : this.$refs[prevVideoTempId][0].$el
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
		getCategoryDetails(){
			try {
        this.$axios.get(`/videos/categories/${this.$route.params.id}`).then((response) => {
          this.vCat = response.data.categories
        }, (err) => {
          if (!err.response) {
            this.$store.commit('snackIt', "Server isn't responding video category can't be fetched")
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
		async setPageData(){
			try{
				await this.getCategoryDetails()
				this.busy = true
				this.dataLoading = true
				this.$axios.get(`/videos/list/?categories=${this.$route.params.id}&maturity_level=${this.$store.getters.currentProfile.maturity_level}&page=${this.page}&paginate=1`).then((response) => {
					this.dataLoading = false
					let baseObj = response.data.videos
					console.log(baseObj)
					let dataArray = baseObj.category_videos[this.vCat.category_id].data
					this.currentPage = baseObj.category_videos[this.vCat.category_id].current_page
  				this.lastPage = baseObj.category_videos[this.vCat.category_id].last_page

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
					this.categoryVideos = finalArray
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
		loadMore(){
			if(this.page < this.lastPage){
				this.page++
				this.setPageData()
			}
		}
	},
	beforeMount(){
		this.setPageData()
	},
	mounted () {

  },
}
</script>