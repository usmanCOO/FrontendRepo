<template>
	    <component v-bind:is="component" :searchQuery="searchQuery"></component>
</template>
<script>
import movies from '~/components/default/search/movies'
import series from '~/components/default/search/series'
export default {
  name:'person',
  middleware:['auth'],
  components: {
    'movies' : movies,
    'series' : series
  },
  /* 
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  */
  head(){
    return {
      titleTemplate:this.$t('search')+' - '+this.searchQuery+' - %s',
      meta:[
        {
          name:'description',
          content:`Pakistan's biggest original video content platform`
        }
      ]
    }
  },
  data () {
    return {
      component: 'movies',
      searchQuery:'',
    }
  },
  watch: {
		'$route': function (to,from) {
			this.searchQuery = this.$route.query.q
	    let searchType = this.$route.query.type
	    if(searchType == 'series')
	    	this.component = 'series'
	    else
	    	this.component = 'movies'
		},
	},
  beforeMount(){
    this.searchQuery = this.$route.query.q
    let searchType = this.$route.query.type
    if(searchType == 'series')
    	this.component = 'series'
    else
    	this.component = 'movies'
  }
}
</script>
<style >

@media (min-width: 1264px) and (max-width:1400px){
.item_thumb {
    flex-basis: 20.666666666666664% !important;
    -webkit-box-flex: 0;
    flex-grow: 0;
    max-width: 20.666666666666664% !important;
}}
</style> 