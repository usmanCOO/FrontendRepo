<!-- the custome made circular loader -->
<template>
	<section v-if="featuredVideos && featuredVideos.length > 0" class="innerfeachers__Video"> 
		<v-container>
			<div class="swiper-container">
				<div v-swiper="swiperOptionh" :instanceName="'swipperFeat'">
					<div class="swiper-wrapper">
						<div v-for="featuredVideo in featuredVideos" class="swiper-slide">
							<div class="v-thumb">
								<div class="Hthumb">
									<v-img
									:src="`${featuredVideo.thumbs.original}`"
									:lazy-src="`${featuredVideo.thumbs.original}`"
									aspect-ratio="1"
									class="grey lighten-2"
									>
										<v-layout slot="placeholder" fill-height align-center justify-center ma-0>
									  		<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
										</v-layout>
									</v-img>
								</div>
						<div class="hover_detail_list py-2">
							<div class="textinner">
								<div class="subheading">{{featuredVideo.title}}</div>
								<span class="caption time">{{featuredVideo.duration}}</span>
								<p class="caption dec">
									{{featuredVideo.description}}
									<a href="#">{{$t("see_more")}}</a>
								</p>
								<v-layout class="btn-hover">
									<v-btn small :to="`/watch/${featuredVideo.videoid}`">{{$t("play_now")}}</v-btn>
									<v-btn small>{{$t("details")}}</v-btn>
								</v-layout>
							</div>
							<div class="textinner">
								<div class="bottm-dec">
									<p class="caption"> {{$t("director")}} : David Yates </p>
									<p class="caption"> {{$t("writers")}}: J.K. Rowling </p>
									<p class="caption"> {{$t("reviews")}} : 75 user</p>
								</div>
							</div>
						</div>
							</div>
						</div>
					</div>
					<div class="feucher_prev">
						<span class="icon-chevron-left"></span>
					</div>
					<div class="feucher_next">
						<span class="icon-chevron-right"></span>
					</div>
				</div>
			</div> 
		</v-container>
	</section>
</template>
<script>
export default {
  name:'featuredVideos',
  props:['featuredVideos',"swiperOptionh","addToMyList"],
  data(){
  	return{
  		
  	}
  },
}
</script>
<style scoped>

</style>