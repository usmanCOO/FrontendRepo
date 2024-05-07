<template>
<v-container grid-list-xl text-xs-center align-center justify-center row fill-height>
	<div class="planform">
		<h1>Payment has failed.Your subscription has not been added.</h1>
	</div>
</v-container>
</template>

<script>
export default {
	name:'failed',
	middleware:['auth'],
	data () {
		return {
			
		}
	},
	asyncData({params}) {
	},
	methods:{
		getPackage(){
			if(process.browser){
				let url_string = window.location.href;
				let url = new URL(url_string);
				this.package_id = url.searchParams.get('package_id');
				this.agreement_token = url.searchParams.get('token');
			}
		}
	},
	mounted(){
		this.getPackage()
	}
}
</script>
