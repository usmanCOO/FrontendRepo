<template>
	<v-container>
		<v-layout row wrap mt-5 pt-5>
			<v-flex class="xs6">
				<div class="display-1 d-inline-block text-xs-left xs6">
					<span>My Access Log</span>
				</div>
			</v-flex>
			<v-flex class="xs6 text-xs-right">
				<div class="d-inline-block xs6 text-xs-right">
					<v-btn class="watch" @click="$router.go(-1)">
						<v-icon>arrow_back</v-icon>
						Go back
					</v-btn>
				</div>
			</v-flex>
			<v-flex class="tablehistory d-block xs12">
				<div class="v-table__overflow table my-3">
					<table class="v-datatable table-history v-table theme--dark">
						<tbody>
							<tr>
								<th>Date logged</th>
								<th>IP</th>
								<th>Type</th>
								<th>Action success</th>
								<th>Device</th>
								<th>Country</th>
								<th>State</th>
								<th>User agent</th>
							</tr>
							<template v-if="userLog && userLog.length > 0">
								<tr v-for="logItem in userLog">
									<td>
										<data class="date">{{logItem.date_added}}</data>
									</td>
									<td>{{logItem.action_ip}}</td>
									<td>{{logItem.action_type}}</td>
									<td>{{logItem.action_success}}</td>
									<td>{{logItem.device}}</td>
									<td>{{logItem.country}}</td>
									<td>{{logItem.state}}</td>
									<td>{{logItem.user_agent}}</td>
								</tr>
							</template>
							<tr v-if="noHistoryFound">
								<td>
									<data class="date">No log found</data>
								</td>
							</tr>
						</tbody>
					</table>
					<div v-if="currentPage" class="text-xs-center">
				    <v-pagination
				      v-model="currentPage"
				      :length="lastPage"
				      :total-visible="7"
				      @input="getMyLog"
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
      titleTemplate:this.$t('acess_log')+' - %s',
      meta:[
        {
          name:'description',
          content:'Access log'
        }
      ]
    }
  },
	data(){
		return{
			userLog:'',
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
		getMyLog(page){
			let currUser = this.currentProfile
  		try{
  			this.uxPage = page
  			this.dataLoading = true
  			this.$axios.get(`/users/getMyLog/${currUser.userid}?page=${page}`).then((response)=>{
  				this.dataLoading = false
  				this.userLog = response.data.data.data
  				this.currentPage = response.data.data.current_page
  				this.lastPage = response.data.data.last_page
  				if(this.userLog)
						if(this.userLog.length <= 0)
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
  },
	beforeMount(){
		this.getMyLog()
	},
	mounted(){
		// console.log(navigator.userAgent)
	}
}
</script>
