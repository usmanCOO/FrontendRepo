<template>
<v-container grid-list-xl text-xs-center align-center justify-center row fill-height>
	<div class="planform">
		<h1>Verifying please wait...</h1>
	</div>
	<template v-if='processing'>
		<circleLoader/>
	</template>
</v-container>
</template>

<script>
import circleLoader from '~/components/default/circleLoader'	
export default {
	name:'paymentProcessing',
	middleware:['auth'],
	data () {
		return {
			// dom
			processing:true,
			package_id:'',
			agreement_token:'',
		}
	},
	components:{
		circleLoader
	},
	methods:{
		getPackage(){
			if(process.browser){
				let url_string = window.location.href;
				let url = new URL(url_string);
				this.package_id = url.searchParams.get('package_id');
				this.agreement_token = url.searchParams.get('token');
			}
		},
		async executeAgreement(){
			if(this.package_id && this.agreement_token){
				var obj = {
		        	'package_id' : this.package_id,
		        	'agreement_token':this.agreement_token,
		        }
		    }else{
		    	this.$store.commit('snackIt','Package id or token is missing')
		    }
			await this.$axios.post('/paid/executeAgreement', obj).then((response)=>{
		        let statusCode = response.status;
		        if(statusCode == '200'){
		        	if(process.browser)
		        		if(response.data.data){
		        			this.$store.commit('activateClientSubscription');
		        			this.$router.push('/payment/success');
		        		}
	        	}else{
					this.$store.commit('snackIt','Something went wrong please contact admin');
					this.$router.push('/payment/failed');
				}
		    }).catch((err)=>{
		        if(!err.response){
		        	this.$store.commit('snackIt',"Server isn't responding please check if server is up or not")
					this.$router.push('/payment/failed');
		        }else{
		        	console.log(err.response.data);
		        	let statusCode = err.response.data.status;
		        	if(statusCode >= '400' && statusCode <= '510'){
		        		if(err.response.data.errors.error){
		        			this.$store.commit('snackIt',err.response.data.errors.error[0]);
			        	}else{
		        			this.$store.commit('snackIt','Bad Request');
						}
						this.$router.push('/payment/failed');
					}	
		        }
		    })
		    this.processing = false;
		}
	},
	created(){
		this.getPackage();
	},
	beforeMount(){
		this.executeAgreement();
	}
}
</script>
