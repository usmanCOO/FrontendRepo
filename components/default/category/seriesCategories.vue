<template>
		<v-layout row wrap mt-5> 
			<v-flex lg9 md9 sm12 xs12 mt-4>
				<!-- series categories -->
				<div class="vd__catlist d-block ml-4 mt-3">
					<div class="font-weight-black text-capitalize ml-3 headline d-inline">
						 {{$t('tv_collections')}}
					</div>
					<template v-if="seriesCategories && seriesCategories.length > 0"> 
						<v-menu offset-y  class="ml-3">
							<v-btn slot="activator" color="primary">
								Genres 
								<v-icon>expand_more</v-icon>
							</v-btn>
							<v-list class="vdcategory">
								<v-list-tile :to="'/tvCollections'">
									<v-list-tile-title> 
										{{$t('all')}}
									</v-list-tile-title>
								</v-list-tile>
								<v-list-tile v-for="sCat in seriesCategories" :to="'/tvCollections/category/'+sCat.category_id" :key="sCat.category_id">
									<v-list-tile-title> 
										{{sCat.category_name}}
									</v-list-tile-title>
								</v-list-tile>
							</v-list> 
						</v-menu>
					</template>
				</div>
				<!-- series categories -->
			</v-flex>
			<v-flex lg3 md3 sm12 xs12 mt-4 class="ratingdiv">
				<div class="mx-2 my-0 ratingsystm text-md-right">
					<div class="innerdiv">
						<!-- <div class="starin"><v-icon dark>star</v-icon></div>
						<v-slider v-model="value" step="10" ticks></v-slider>
						<div class="number"><span>5.0</span></div> -->
					</div>
				</div>
				<div class="change_layout_btn">
					<v-btn small ref="defaultLayoutBtn" class="active" @click="switchLayoutNative(true)">
						<v-icon>clear_all</v-icon>
					</v-btn>
					<v-btn small ref="conventionalLayoutBtn" @click="switchLayoutNative(false)">
						<v-icon>view_module</v-icon>
					</v-btn>
				</div>
			</v-flex>
		</v-layout>
</template>
<script>
	export default{
		name:'seriesCategories',
		data(){
			return {
				value: '',
				seriesCategories:[],
			}
		},
		props:['switchLayout'],
		methods:{
			setSeriesCategories(){
				try {
	        this.$axios.get(`/series/categories/`).then((response) => {
	        	this.seriesCategories = response.data.categories
	        }, (err) => {
	          if (!err.response) {
	            this.$store.commit('snackIt', "Server isn't responding video categories can't be fetched")
	          } else {
	            let errorMsg = err.response.data.errors.error
	            console.log(errorMsg)
	            this.$store.commit('snackIt', errorMsg[0])
	          }
	        })
	      } catch (err) {
	        console.log(err)
	      }
			},
			switchLayoutNative(flag){
				let defaultBtn = this.$refs['defaultLayoutBtn'].$el
				let conventionalBtn =this.$refs['conventionalLayoutBtn'].$el
				
				if(flag == true){
					defaultBtn.classList.add("active");
					conventionalBtn.classList.remove("active");
				}
				if(flag == false){
					conventionalBtn.classList.add("active");
					defaultBtn.classList.remove("active");
				}
				this.switchLayout(flag)
			}
		},
		beforeMount(){
			this.setSeriesCategories()
		},
	}
</script>