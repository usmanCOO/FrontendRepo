<template>
<v-container grid-list-xl text-xs-center align-center justify-center row fill-height>
	<div class="planform">
		<h1>Payment has successfully done.Your subscription has been added.</h1>
	</div>
</v-container>
</template>

<script>
export default {
	name:'success',
	middleware:['auth','subscription_needed'],
	data () {
		return {
			// dom
		}
	},
	components:{
	},
	methods:{
		
	},
	created(){
		this.$store.commit('snackIt','Payment successfully done');
	},
	beforeMount(){
		
	}
}
</script>
