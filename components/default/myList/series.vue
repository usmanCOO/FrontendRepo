<template>
	<div class="Vidlix_active_layout">
		<div class="rowContainer_layout active">
			<template v-if="myList">
				<v-flex xs10 class="pt-3 pl-3">
			  	<div pl-2 class="title">{{$t("my_list")}} series</div>
				</v-flex>
				<template v-for="(listItems, index) in myList">
					<template v-if="listItems && listItems.length > 0">
						<div v-if="myList && myList.length > 0" class="rowContainer_title_card"  id="row-1">
							<v-layout row wrap my-2 mx-0 py-3>
								<v-flex v-for="listItem in listItems" :key="listItem.series_id" lg2 md4 sm4 xs6 class="item_thumb">
									<v-card dark class="block-holder mx-1 my-1" :ref="`conventional`+index+listItem.series_id">
										<router-link class="sliderimg" to="">
											<v-img
											:src="`${listItem.thumb}`"
											:lazy-src="`${listItem.thumb}`"
											aspect-ratio="1"
											class="grey lighten-2"
											>
												<v-layout slot="placeholder" fill-height align-center justify-center ma-0>
											  		<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
												</v-layout>
											</v-img>
										</router-link>
										<div class="hover__detaillist">
											<!-- 
											<div @click="takeMeToWatch(listItem)">
												<div class="bob-overview-wrapper"> 
													<div class="title mx-2 mt-2">{{listItem.series_name}}</div>
													<p class="caption dec mx-2">{{listItem.series_description}}</p>
												</div>
											</div>
											 -->
											<div>
												<div class="bob-overview-wrapper"> 
													<div class="title mx-2 mt-2">{{listItem.series_name}}</div>
													<p class="caption dec mx-2">{{listItem.series_description}}</p>
												</div>
											</div>
											<div class="btn__show align-center column  justify-start fill-height">
												<v-btn fab small @click="removeFromMyList(listItem)">
													<v-icon dark>block</v-icon>
												</v-btn>
											</div>
											<div class="click_detail" v-on:click="getMeSeries(listItem.series_id,`conventional`+index)">
												<v-icon dark>expand_more</v-icon>
											</div>
										</div>
										<span :ref="`conventional`+index+listItem.series_id+'Arrow'"></span>
									</v-card>
								</v-flex>
							</v-layout>
							<seriesDetails v-show="false" :ref="`conventional`+index" :sData="{'type':`conventional`+index}" :closeSeriesDetails="closeSeriesDetails" :withCloseBtn="true"/>
						</div>
					</template>
				</template>
			</template>
			<template v-if="isEmptyList">
				<v-flex mt-4 ml-3 mr-3 xs12>
				  <v-card>
						<v-card-text>
							<p>No series in your list right now.</p>
						</v-card-text>
					</v-card>
				</v-flex>
			</template>
		</div>
		<template v-if='dataLoading'>
			<circleLoader/>
		</template>
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div>
	</div>
</template>
<script>
import seriesDetails from '~/components/default/base/seriesDetails'
import circleLoader from '~/components/default/circleLoader'
export default {
	name:'movies',
	middleware:['auth','subscription_needed'],
	components: {
		seriesDetails,
		circleLoader
	},
	data(){
		return{
			isEmptyList:false,
			myList:[],
			page: 1,
			prevSeries:'',
			prevIdentifier:'',
			rowIdentifier:'',
			dataLoading:true,
			currentPage:'',
			lastPage:'',
			dataArray : [],
			busy:false,
		}
	},
	methods:{
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
			var el = this.$refs[id][0].$el===undefined ? this.$refs[id].$el : this.$refs[id][0].$el
			var elArrow = this.$refs[elArrowId][0]===undefined ? this.$refs[elArrowId] : this.$refs[elArrowId][0]
			el.classList.add("border_selected")
			elArrow.classList.add("arroow")
		},
		unmarkPrevThumb(series_id=null){
			if(!this.prevSeries){
				this.prevSeries = series_id
			}else{
				let prevSeriesTempId = this.prevIdentifier+this.prevSeries
				var elem = this.$refs[prevSeriesTempId][0].$el===undefined ? this.$refs[prevSeriesTempId].$el : this.$refs[prevSeriesTempId][0].$el
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
		removeFromMyList(series){
			try{
				var seriesObj = {
					'series_id' : series.series_id,
				}
				this.$axios.post('/series/removeFavourite', seriesObj).then((response)=>{
					this.$store.commit('snackIt',`${series.series_name} removed from your list`);
				}).catch((err)=>{
					if(!err.response){
						this.$store.commit('snackIt',`Server isn't responding ${series.series_name} cannot be removed from your list`)
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
				this.$axios.get(`/series/myList?page=${this.page}&paginate=1`).then((response) => {
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
					var itemsPerRow = 6
					let iteration = Math.ceil(count/itemsPerRow)
					let lower = 0
					let upper = itemsPerRow
					for(let i=0;i<iteration;i++){
						finalArray.push(this.dataArray.slice(lower, upper));
						upper = upper+itemsPerRow
						lower = lower + itemsPerRow
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