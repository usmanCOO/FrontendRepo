<template>
  <div>
    <v-layout v-if="viDetails" id="vdthumb_id" class="Trending__tails__thumbs active">
      <!-- Checkmate -->
      <!-- Thumb and cross -->
      <v-flex lg12 md12 sm12 xs12 class="rightthumb">
        <v-btn class="close" fab small @click="closeVideoDetailsNative">
          <v-icon dark>close</v-icon>
        </v-btn>
        <router-link class="sliderimg" to>
          <!-- 
					<v-img
					:src="`${viDetails.thumbs['768x432']}`"
					          :lazy-src="`${viDetails.thumbs['768x432']}`"
					aspect-ratio="1"
					class="grey lighten-2"
					>
						<v-layout slot="placeholder" fill-height align-center justify-center ma-0>
							<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
						</v-layout>
					</v-img>
          -->
          <v-img
            :src="viDetails.gif != null ? viDetails.gif : viDetails.thumbs['768x432']"
            :lazy-src="`${viDetails.thumbs['768x432']}`"
            aspect-ratio="1"
            class="grey lighten-2"
          >
            <!-- 
						<v-layout slot="placeholder" fill-height align-center justify-center ma-0>
							<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
						</v-layout>
            -->
          </v-img>
          <span class="hoverbg"></span>
        </router-link>
      </v-flex>
      <v-flex lg12 class="tabs_FadeInPlace">
        <div class="coverarea moreshowdetails">
          <!-- details grand parent container -->
          <div class="tabs-container-div">
            <v-btn
              small
              class="btn btn-grey circle-play center-play-button"
              :to="`/watch/${viDetails.videoid}`"
            >
              <v-icon>play_arrow</v-icon>
            </v-btn>

            <div class="header-all-text">
              <small
                v-for="(cat, index) in viDetails.categories"
                :key="index"
                style="padding-bottom:15px;color:#FFC511;"
              >
                <i key v-if="index ==0">{{cat.category_name}}</i>
                <i v-else>, {{cat.category_name}}</i>
              </small>
              &nbsp;&nbsp;|&nbsp;
              <small>{{viDetails.duration}}</small>
              <h1 class>{{viDetails.title}}</h1>
              <br />
              <p style="max-width:40vw">{{viDetails.description}}</p>
            </div>

            <!-- <div class="tab__inneroverview hidden-sm-and-down">
              <v-tab ref="tab1_btn" @click="shiftTab('tab1')" class="active">Overview</v-tab>
              <v-tab ref="tab2_btn" @click="shiftTab('tab1')" >More Like This</v-tab>
              <v-tab ref="tab3_btn" @click="shiftTab('tab3')">Details</v-tab>
            </div>-->
          </div>
        </div>
      </v-flex>

      <!-- Checkmate -->
    </v-layout>
    <v-layout py-5 v-else id="vdthumb_id" class="Trending__tails__thumbs active">
      <v-flex lg12 md12 my-5 px-3 py-2 class="rightthumb">
        <v-btn class="close" fab small @click="closeVideoDetailsNative">
          <v-icon dark>close</v-icon>
        </v-btn>
        <v-progress-circular
          v-if="videoProcessing"
          my-5
          class="text-md-center"
          :size="70"
          :width="4"
          color="#E00000"
          indeterminate
        ></v-progress-circular>
        <section v-else class="container">
          <v-card pa-5>
            <v-card-title class="headline">An error occured fetching video details</v-card-title>
            <v-card-text>
              <p>An error occured fetching video details please try again or contact admin for assistance</p>
            </v-card-text>
          </v-card>
        </section>
      </v-flex>
    </v-layout>
    <div class="ml-5 tabinner_trendingnow">
      <span class="v-hovertabs active_hover"></span>
      <section
        v-if="relatedVideos && relatedVideos.length > 0"
        class="slider_v_trendingnow tabset_area"
      >
        <div class="swiper-container slider">
          <div v-swiper="swiperEpresode" :instanceName="'swiperTr'+viDetails.videoid">
            <div class="swiper-wrapper slider-v">
              <div v-for="relatedVid in relatedVideos" class="swiper-slide v_epresod">
                <v-hover>
                  <div slot-scope="{ hover }" class="v-thumb">
                    <div class="sliderimg">
                      <v-img
                        :src="hover ? relatedVid.gif != null ? relatedVid.gif : relatedVid.thumbs['768x432'] : relatedVid.thumbs['original']"
                        :lazy-src="`${relatedVid.thumbs['768x432']}`"
                        aspect-ratio="1"
                        class="grey lighten-2"
                      >
                        <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-layout>
                      </v-img>
                      <span class="hover">
                        <v-icon>play_arrow</v-icon>
                      </span>
                    </div>
                  </div>
                </v-hover>
                <div class="moreinfo_ep mt-2 active">
                  <div class="episodeTitle">
                    <span class="title_small body-2">{{relatedVid.title}}</span>
                    <p class="time justify-end">{{relatedVid.duration}}</p>
                  </div>
                  <p class="body-2 hidden-md-and-down">{{relatedVid.description}}</p>
                </div>
              </div>
            </div>
            <div class="swiper-slider-prev">
              <v-icon>chevron_left</v-icon>
            </div>
            <div class="swiper-slider-next">
              <v-icon>chevron_right</v-icon>
            </div>
          </div>
        </div>
      </section>
      <!-- <section v-else>
									<v-flex lg12 md12 my-5 px-3 py-2 class="rightthumb">
										<v-btn class="close" fab small @click="closeVideoDetailsNative">
												<v-icon dark>close</v-icon>
										</v-btn>
										<v-progress-circular
										 	v-if="videoProcessing"
										 	my-5
										  class="text-md-center"
								      :size="70"
								      :width="4"
								      color="#E00000"
								      indeterminate
								    ></v-progress-circular>
								    <section v-else class="container">
											<v-card pa-5>
												<v-card-title class="headline">No related videos found</v-card-title>
												<v-card-text>
													<p>No related videos found please try again or contact admin for assistance</p>
												</v-card-text>
											</v-card>
										</section>
									</v-flex>	
      </section>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "videoDetails",
  props: ["vData", "closeVideoDetails"],
  data() {
    return {
      model: "tab-2",
      viDetails: "",
      cast: [],
      directors: [],
      categories: [],
      videoProcessing: false,
      msg: "",
      maturityLevel: "",
      // Related thing
      relatedVideos: [],
      // Jazib changes
      swiperEpresode: {
        slidesPerView: 6,
        spaceBetween: 4,
        slidesPerGroup: 3,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        breakpoints: {
          1900: {
            slidesPerView: 5,
            spaceBetween: 30
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 30
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          375: {
            slidesPerView: 2,
            spaceBetween: 10
          }
        },
        navigation: {
          nextEl: ".swiper-slider-next",
          prevEl: ".swiper-slider-prev"
        }
      }
      // Jazib changes
    };
  },
  methods: {
    getVideoData(v) {
      try {
        this.viDetails = "";
        if (v.videoid && this.vData.type == v.identifier) {
          this.videoProcessing = true;
          this.$axios.get(`/videos/list/${v.videoid}`).then(
            response => {
              let coreObj = response.data.videos;
              this.viDetails = coreObj.video_by_id[0];
              this.cast = coreObj.video_by_id[0].cast;
              this.directors = coreObj.video_by_id[0].director;
              this.categories = coreObj.video_by_id[0].categories;
              this.maturityLevel = this.$getMaturityRightWay(
                coreObj.video_by_id[0].maturity_level
              );
              this.videoProcessing = false;
            },
            err => {
              if (!err.response) {
                this.videoProcessing = false;
                this.$store.commit(
                  "snackIt",
                  "Server isn't responding video details can't be fetched"
                );
              } else {
                this.videoProcessing = false;
                let errorMsg = err.response.data.errors.error;
                console.log(errorMsg);
                this.$store.commit("snackIt", errorMsg[0]);
              }
            }
          );
        }
      } catch (err) {
        console.log(err);
      }
    },
    likeVideo(video) {
      try {
        var videoObj = {
          videoid: video.videoid
        };
        this.$axios
          .post("/videos/like", videoObj)
          .then(response => {
            this.$store.commit("snackIt", `Thanks for rating ${video.title}`);
          })
          .catch(err => {
            if (!err.response) {
              this.$store.commit(
                "snackIt",
                `Server isn't responding ${video.title} cannot be rated`
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    addToMyList(video) {
      try {
        var videoObj = {
          videoid: video.videoid
        };
        this.$axios
          .post("/videos/addToFavourites", videoObj)
          .then(response => {
            this.$store.commit("snackIt", video.title + " added to your list");
          })
          .catch(err => {
            if (!err.response) {
              this.$store.commit(
                "snackIt",
                `Server isn't responding ${video.title} cannot be added to your list`
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    removeFromMyList(video) {
      try {
        var videoObj = {
          videoid: video.videoid
        };
        this.$axios
          .post("/videos/removeFavourite", videoObj)
          .then(response => {
            this.$store.commit(
              "snackIt",
              video.title + " removed from your list"
            );
          })
          .catch(err => {
            if (!err.response) {
              this.$store.commit(
                "snackIt",
                `Server isn't responding ${video.title} cannot be removed from your list`
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    closeVideoDetailsNative() {
      this.viDetails = "";
      this.closeVideoDetails();
    },
    shiftTab(tabId, getRelatedVideos) {
      let tabs = ["tab1", "tab3"];
      for (let i = 0; i < tabs.length; i++) {
        let tabItem = tabs[i];
        this.$refs[tabItem].classList.remove("tab-active");
        this.$refs[tabItem + "_btn"].$el.classList.remove("active");
      }
      let containerElem = this.$refs[tabId];
      let tabBtn = tabId + "_btn";
      let btnElem = this.$refs[tabBtn].$el;
      containerElem.classList.add("tab-active");
      btnElem.classList.add("active");
      if (getRelatedVideos) {
        this.videoProcessing = true;
        this.getRelatedVideos();
      }
    },
    getRelatedVideos() {
      if(this.$store.getters.currentProfile && this.viDetails.categories){
      this.$axios
        .get(
          `/videos/list/?related=1&related_query=${this.viDetails.title}&maturity_level=${this.$store.getters.currentProfile.maturity_level}&exclude_video=${this.viDetails.videoid}`
        )
        .then(
          response => {
            this.relatedVideos = response.data.videos.related_videos;
            if (this.relatedVideos.length == 0) {
              //searching for same video catefories
              let videoCategories = this.viDetails.categories[0].category_id;
              this.$axios
                .get(
                  `/videos/list/?categories=${videoCategories}&maturity_level=${this.$store.getters.currentProfile.maturity_level}&exclude_video=${this.viDetails.videoid}`
                )
                .then(
                  response => {
                    this.relatedVideos =
                      response.data.videos.category_videos[videoCategories];
                    this.videoProcessing = false;
                  },
                  err => {
                    if (!err.response) {
                      this.videoProcessing = false;
                      this.$store.commit(
                        "snackIt",
                        "Server isn't responding related series can't be fetched"
                      );
                    } else {
                      this.videoProcessing = false;
                      let errorMsg = err.response.data.errors.error;
                      console.log(errorMsg);
                      this.$store.commit("snackIt", errorMsg[0]);
                    }
                  }
                );
            } else {
              this.videoProcessing = false;
            }
          },
          err => {
            if (!err.response) {
              this.videoProcessing = false;
              this.$store.commit(
                "snackIt",
                "Server isn't responding related series can't be fetched"
              );
            } else {
              this.videoProcessing = false;
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          }
        );
    }
    }
  },
  created() {
    this.$root.$on("getVideoData", this.getVideoData);
  },
  mounted() {
    this.videoProcessing = true;
    this.getRelatedVideos();
  }
};
</script>
<style scoped>
.col-flex-box {
  position: absolute;
  left: 40%;
}
.play-parent {
  display: grid;
  align-items: center;
  justify-content: center;
}

.btn-daikho {
  padding: 0 30px;
  color: white;
  height: 50px;
  background: #ffc511 !important;
  border-radius: 5px;
}
.circle-play {
  background: #ffc511 !important;
  min-width: 50px !important;
  margin: 0 !important;
}
.center-play-button {
  position: absolute;
  left: 50%;
  top: 45%;
  height: 70px;
  width: 70px;
  border-radius: 70px;
  font-size: 20px;
}
.header-all-text {
  position: absolute;
  bottom: 5vw;
  left: 5vw;
  width: 400px;
}
</style>