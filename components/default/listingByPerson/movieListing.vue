<template>
	<div class="Vidlix_active_layout">
		<div class="rowContainer_layout active">
			<template v-if="personVideos">
				<v-flex xs10 class="pt-3 pl-3">
				  <div pl-2 class="title">{{person.name}}</div>
				</v-flex>
				<template v-for="(personVids, index) in personVideos">
					<template v-if="personVids && personVids.length > 0">
						<div v-if="personVideos && personVideos.length > 0" class="rowContainer_title_card"  id="row-1">
							<v-layout row wrap my-2 mx-0 py-3>
								<v-flex v-for="personVid in personVids" :key="personVid.videoid" lg2 md4 sm4 xs6 class="item_thumb">
									<v-card dark class="block-holder mx-1 my-1" :ref="`conventional`+index+personVid.videoid">
										<router-link class="sliderimg" to="">
											<v-img
											:src="`${personVid.thumbs['416x260']}`"
											:lazy-src="`${personVid.thumbs['168x105']}`"
											aspect-ratio="1"
											class="grey lighten-2"
											>
												<v-layout slot="placeholder" fill-height align-center justify-center ma-0>
											  		<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
												</v-layout>
											</v-img>
										</router-link>
										<div class="hover__detaillist">
											<router-link :to="`/watch/${personVid.videoid}`">
												<div class="bob-overview-wrapper"> 
													<div class="title mx-2 mt-2">{{personVid.title}}</div>
													<time class="caption time mx-2">{{personVid.duration}}</time>
													<p class="caption dec mx-2">{{personVid.description}}</p>
												</div>
											</router-link>
											<div class="btn__show align-center column  justify-start fill-height">
												<v-btn fab small @click="likeVideo(personVid)">
													<v-icon dark>favorite</v-icon>
												</v-btn>
												<v-btn fab small @click="addToMyList(personVid)">
													<v-icon dark>add</v-icon>
												</v-btn>
											</div>
											<div class="click_detail" v-on:click="getMeVideo(personVid.videoid,`conventional`+index)">
												<v-icon dark>expand_more</v-icon>
											</div>
										</div>
										<span :ref="`conventional`+index+personVid.videoid+'Arrow'"></span>
									</v-card>
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
							<p>No movies found.</p>
						</v-card-text>
					</v-card>
				</v-flex>
			</template>
		</div>
		<template v-if='dataLoading'>
			<circleLoader/>
		</template>
		<!-- Load more loader -->
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div>
	</div>
</template>
<script>
import videoDetails from '~/components/default/base/videoDetails'
import circleLoader from '~/components/default/circleLoader'
export default {
	name:'personMovieListing',
	middleware:['auth','subscription_needed'],
	props:['personId','person','personType'],
	components: {
		videoDetails,
		circleLoader
	},
	head(){
    return {
      titleTemplate: this.person.name+' - '+this.$t('movies')+' - %s',
      meta:[
        {
          name:'description',
          content:'Movies by '+this.person.name
        }
      ]
    }
  },
	data(){
		return{
			page: 1,
			prevVid:'',
			prevIdentifier:'',
			rowIdentifier:'',
			isEmptyList:false,
			dataLoading:true,
			currentPage:'',
			lastPage:'',
			personVideos:[],
			dataArray : [],
			busy:false,
		}
	},
	validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
	methods:{
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
		closeVideoDetails(){
			let identifier = this.rowIdentifier
			var el = this.$refs[identifier][0]===undefined ? this.$refs[identifier].$el : this.$refs[identifier][0].$el
			el.style.display = 'none'
			this.unmarkPrevThumb()
		},
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
		setMoviesByPerson(){
			try{
				let urlKey
				let videoType

				// Setting up person type for movies
				if(this.personType == 'cast'){
					urlKey = 'cast_id'
					videoType = 'cast_videos'
				}else if(this.personType == 'directors'){
					urlKey = 'director_id'
					videoType = 'director_videos'
				}
				else{
					this.$store.commit('snackIt','Unknown person type')
					this.dataLoading = false
					return
				}
				
				this.busy = true
				this.dataLoading = true
				this.$axios.get(`/videos/list/?${urlKey}=${this.personId}&page=${this.page}&paginate=1`).then((response) => {
					this.dataLoading = false
					let baseObj = response.data.videos
					let dataArray = baseObj[videoType].data
					this.currentPage = baseObj[videoType].current_page
  				this.lastPage = baseObj[videoType].last_page
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
					this.personVideos = finalArray
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
				this.setMoviesByPerson()
			}
		}
	},
	beforeMount(){
		this.setMoviesByPerson()
	},
	mounted () {

  },
}
</script>