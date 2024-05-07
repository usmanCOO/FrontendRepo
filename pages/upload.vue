<template>
<v-layout mt-5>
	<v-content class="mt-5">
		<client-only>
			<v-tabs align-with-title>
				<v-tab><v-btn @click="component = 'movie-upload'">Upload File</v-btn></v-tab>
				<v-tab><v-btn @click="component = 'series-upload'">Tv Show Upload</v-btn></v-tab>
			</v-tabs>
			<!-- <keep-alive> -->
				<component v-bind:is="component"></component>
			<!-- </keep-alive> -->
		</client-only>
	</v-content>
</v-layout>
</template>
<script>
	import movieUpload from '~/components/default/upload/movieUpload'
	import seriesUpload from '~/components/default/upload/seriesUpload'
	export default {
		name:'upload',
		middleware:['auth','subscription_needed'],
		components: {
			'movie-upload' : movieUpload,
			'series-upload' : seriesUpload
		},
		head(){
			return {
				titleTemplate: this.$t('upload')+' - %s',
				meta:[
					{
						name:'description',
						content:'Upload content'
					}
				]
			}
		},
		data () {
			return {
				component: 'movie-upload',
			}
		}
	}
</script>
<style scoped>

</style>  