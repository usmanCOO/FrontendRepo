<template>
	<v-container>
		<v-layout row wrap mt-5 pt-4>
			<v-flex class="xs6">
				<div class="display-1 d-inline-block text-xs-left xs6">
					<span>My Watch Activity</span>
				</div>
			</v-flex>
			<v-flex class="xs6 text-xs-right">
				<div class="d-inline-block xs6 text-xs-right">
					<v-btn class="watch" @click="$router.go(-1)">
						<v-icon>arrow_back</v-icon>
						Go back
					</v-btn>
					<!-- <v-btn class="rating">
						<v-icon>thumb_up</v-icon>
						Rating
					</v-btn> -->
				</div>
			</v-flex>
			<v-flex class="tablehistory d-block xs12">
				<div class="v-table__overflow table my-3">
					<table class="v-datatable table-history v-table theme--dark">
						<tbody>
							<template v-if="userHistory && userHistory.length > 0">
								<tr v-for="historyItem in userHistory">
									<td>
										<data class="date">{{historyItem.date_added}}</data> -
										<router-link :to="historyItem.video_url">
											{{historyItem.video_title}}
										</router-link>
									</td>
									
									<td class="text-xs-right">
										<!-- 
										<span class="d-inline-block">
											<router-link to="/">Report a problem</router-link>
										</span> 
										 -->
										<span class="d-inline-block">
											<v-btn @click="removeMyWatch(historyItem.watch_id)" class="blockbtn">
												<v-icon>block</v-icon>
											</v-btn>
										</span>
									</td>
										
								</tr>
							</template>
							<tr v-if="noHistoryFound">
								<td>
									<data class="date">You haven't watched anything yet</data>
								</td>
							</tr>
						</tbody>
					</table>
					<div v-if="currentPage" class="text-xs-center">
				    <v-pagination
				      v-model="currentPage"
				      :length="lastPage"
				      :total-visible="7"
				      @input="getMyWatch"
				    ></v-pagination>
				  </div>
				</div>
			</v-flex>
		</v-layout>
		<template v-if='dataLoading'>
			<circleLoader/>
		</template>
	</v-container>
</template>
<script>
import { mapGetters } from "vuex"
import circleLoader from '~/components/default/circleLoader'
export default{
	name:'watchHistory',
	middleware:['auth','subscription_needed'],
	components:{
		circleLoader
	},
	head(){
		return {
			titleTemplate: this.$t('watch_history')+' - %s',
			meta:[
				{
					name:'description',
					content:'You watch history'
				}
			]
		}
	},
	data(){
		return{
			userHistory:'',
			dataLoading:true,
			noHistoryFound:false,
			currentPage:'',
			lastPage:'',
			uxPage:'',
		}
	},
	computed: {
  	...mapGetters(["currentProfile"]),
	},
	methods:{
		getMyWatch(page){
			let currUser = this.currentProfile
  		try{
  			this.uxPage = page
  			this.dataLoading = true
  			this.$axios.get(`/users/getMyWatch/${currUser.userid}?user_profile_id=${currUser.user_profile_id}&page=${page}`).then((response)=>{
  				this.dataLoading = false
  				this.userHistory = response.data.data.data
  				this.currentPage = response.data.data.current_page
  				this.lastPage = response.data.data.last_page
  				if(this.userHistory)
						if(this.userHistory.length <= 0)
							this.noHistoryFound = true
				}).catch((err)=>{
  				this.dataLoading = false
  				if(!err.response){
  					this.$store.commit('snackIt',"Server isn't responding please check if server is up or not")
  				}else{
  					let errorMsg = err.response.data.errors.error;
  					console.log(err.response)
  					this.$store.commit('snackIt',errorMsg[0]);
  				}
  			})
  		}catch(err){
  			console.log(err)
  		}
  	},
  	removeMyWatch(watchId){
  		var ask = confirm("Are you sure you want to delete this history item?");
			if (!ask) {
			  return;
			}
  		let currUser = this.currentProfile
  		this.dataLoading = true
  		this.$axios.delete(`/users/removeMyWatch/${watchId}?user_profile_id=${currUser.user_profile_id}`).then((response)=>{
				this.getMyWatch(this.uxPage)
			}).catch((err)=>{
				this.dataLoading = false
				if(!err.response){
					this.$store.commit('snackIt',"Server isn't responding please check if server is up or not")
				}else{
					let errorMsg = err.response.data.errors.error;
					console.log(err.response)
					this.$store.commit('snackIt',errorMsg[0]);
				}
  		})
  	}
	},
	beforeMount(){
		this.getMyWatch()
	}
}
</script>
