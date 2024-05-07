<!-- This page will be displayed when some error will occur/also for 404 -->
<template>
  <div class="container">
    <template v-if="error.statusCode === 404">
    	<v-flex mt-5>
	    	<v-card>
	        <v-card-title class="headline">404 {{error.message}}</v-card-title>
	        <v-card-text>
	         	<hr class="my-3">
	          	Go back to <nuxt-link to="/">Home page</nuxt-link></h2>
	        </v-card-text>
	        <v-card-actions>
	          <v-spacer/>
	        </v-card-actions>
	      </v-card>
    	</v-flex>
    </template>
    <template v-else>
    	<v-flex mt-5>
	    	<v-card>
	        <v-card-title class="headline">{{error.message}}</v-card-title>
	        <v-card-text>
	          <p>Please check console for error details</p>
	          <hr class="my-3">
	          <a
	            href="https://nuxtjs.org/"
	            target="_blank">Nuxt Documentation</a>
	        </v-card-text>
	        <v-card-actions>
	          <v-spacer/>
	        </v-card-actions>
	      </v-card>
    	</v-flex>
    </template>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error',
  mounted(){
  	this.$store.commit('snackIt',this.error.message);
  }
}
</script>