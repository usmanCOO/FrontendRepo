<template>
	<v-content>
		<div class="Vidlix_active_layout">
			<div class="rowContainer_layout active">
				<v-flex xs10 class="pt-3 pl-3">
			  	<div pl-2 class="title">{{$t("my_list")}} movies</div>
				</v-flex>
				<template v-if="myList">
					<template v-for="(listVids, index) in myList">
						<template v-if="listVids && listVids.length > 0">
							<div v-if="myList && myList.length > 0" class="rowContainer_title_card"  id="row-1">
								<v-layout row wrap my-2 mx-0 py-3>
									<v-flex v-for="listVid in listVids" :key="listVid.videoid" lg2 md4 sm4 xs6 class="item_thumb">
										<v-hover>
											<v-card slot-scope="{ hover }" dark class="block-holder mx-1 my-1" :ref="`conventional`+index+listVid.videoid">
												<router-link class="sliderimg" to="">
													<v-img
													:src="hover ? listVid.gif != null ? listVid.gif : listVid.thumbs['416x260'] : listVid.thumbs['original']"
													:lazy-src="`${listVid.thumbs['168x105']}`"
													aspect-ratio="1"
													class="grey lighten-2"
													>
														<v-layout slot="placeholder" fill-height align-center justify-center ma-0>
													  		<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
														</v-layout>
													</v-img>
												</router-link>
												<div class="hover__detaillist">
													<router-link :to="`/watch/${listVid.videoid}`">
														<div class="bob-overview-wrapper"> 
															<div class="title mx-2 mt-2">{{listVid.title}}</div>
															<time class="caption time mx-2">{{listVid.duration}}</time>
															<p class="caption dec mx-2">{{listVid.description}}</p>
														</div>
													</router-link>
													<div class="btn__show align-center column  justify-start fill-height">
														<v-btn fab small @click="likeVideo(listVid)">
															<v-icon dark>favorite</v-icon>
														</v-btn>
														<v-btn fab small @click="removeFromMyList(listVid)">
															<v-icon dark>block</v-icon>
														</v-btn>
													</div>
													<div class="click_detail" v-on:click="getMeVideo(listVid.videoid,`conventional`+index)">
														<v-icon dark>expand_more</v-icon>
													</div>
												</div>
												<span :ref="`conventional`+index+listVid.videoid+'Arrow'"></span>
											</v-card>
										</v-hover>
									</v-flex>
								</v-layout>
								<videoDetails v-show="false" :ref="`conventional`+index" :vData="{'type':`conventional`+index}" :closeVideoDetails="closeVideoDetails"/>
							</div>
						</template>
					</template>
				</template>
				<template v-if="isEmptyList">
					<v-flex mt-4 ml-3 mr-3 xs12>
					  <v-card>
							<v-card-text>
								<p>No movies in your list right now.</p>
							</v-card-text>
						</v-card>
					</v-flex>
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
			isEmptyList: false,
			myList: [],
			prevVid: '',
			prevIdentifier: '',
			rowIdentifier: '',
			dataLoading: true,
			// For conventional layout
			currentPage: '',
			lastPage: '',
			// Data array
			dataArray :  [],
			busy: false,
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
		setPageData(){
			try{
				this.busy = true
				this.dataLoading = true
				this.$axios.get(`/videos/myList?page=${this.page}&paginate=1`).then((response) => {
					this.dataLoading = false
					let baseObj = response.data.data.my_list
					let dataArray = baseObj.data
					this.currentPage = baseObj.current_page
  				this.lastPage = baseObj.last_page

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
					if(finalArray.length == 0)
						this.isEmptyList = true
					this.myList = finalArray
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