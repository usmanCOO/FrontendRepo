<template>
  <v-content>
    <!-- <modal name="hello-world" 
    style="  backdrop-filter: blur(5px)"
    height="500"
    width="350"
    styles=''>
<div class="modal-body-bg">
<div class="text-section">
  <h4>
    Watch Exclusive Pakistani Content on your Mobile Phone
    </h4>
</div>
<div class="image-section">
</div>

<div class="bottom-images">
  <a href="https://play.google.com/store/apps/details?id=com.jazz.pakistani.drama.videos.deikho&hl=en">
  <button 
                                    class="btn btn-daikho btn-round"
>
Download App
  </button></a>
  <div style="color:#FFC511;margin-top:15px;">
  <p style="cursor:pointer" @click="hidePopup()">
    Never show this again.  </p>

</div>
  </div>

</div>
    </modal>-->
    <!-- Editor picks -->
    <!-- <div
      v-if="featured_loaded&& featuredSeries && featuredSeries!=undefined && featuredSeries.length > 0"
    >
      <categoryPicks
        :categoryPicks="featuredSeries"
        :swiperOption="swiperOption"
        :takeMeToWatch="takeMeToWatch"
      />
    </div>-->
 
    <template v-if="seriesItem5">
      <div class="bg-class" v-if="seriesItem5.series_id==0">
        <img :src="seriesItem5.poster_thumb" class="image-header-all" />

        <div class="col-md-12 d-flex justify-content-center header-all">
          <!-- <div class="col play-parent" @click="takeMeToWatch(seriesItem5)">
            <i
              data-v-166faf4c
              aria-hidden="true"
              class="v-icon material-icons circle-play"
            >play_arrow</i>
          </div>-->
          <div class="header-all-text">
            <h1>{{seriesItem5.title}}</h1>
            <small
              v-for="(cat, index) in seriesItem5.categories"
              :key="index"
              style="padding-bottom:15px;"
            >
              <i key v-if="index ==0">{{cat.category_name}}</i>
              <i v-else>, {{cat.category_name}}</i>
            </small>
            <br />
            <p style="width:37%">{{seriesItem5.description}}</p>

            <div class="row button-group" style="margin-left:0px;margin-right:0px;">
              <v-btn class="btn btn-grey btn-daikho" @click="takeMeToWatchVideo(seriesItem5)">
                <v-icon>play_arrow</v-icon>Watch Now
              </v-btn>&nbsp;
                    </div>
          </div>
        </div>
      </div>
       <div class="bg-class" v-else>
        <img :src="seriesItem5.poster?seriesItem5.poster:seriesItem5.thumb" class="image-header-all" />

        <div class="col-md-12 d-flex justify-content-center header-all">
          <!-- <div class="col play-parent" @click="takeMeToWatch(seriesItem5)">
            <i
              data-v-166faf4c
              aria-hidden="true"
              class="v-icon material-icons circle-play"
            >play_arrow</i>
          </div>-->
          <div class="header-all-text">
            <h1>{{seriesItem5.series_name}}</h1>
            <small
              v-for="(cat, index) in seriesItem5.categories"
              :key="index"
              style="padding-bottom:15px;"
            >
              <i key v-if="index ==0">{{cat.category_name}}</i>
              <i v-else>, {{cat.category_name}}</i>
            </small>
            <br />
            <p>{{seriesItem5.series_description}}</p>

            <div class="row button-group" style="margin-left:0px;margin-right:0px;">
              <v-btn class="btn btn-grey btn-daikho" @click="takeMeToWatch(seriesItem5)">
                <v-icon>play_arrow</v-icon>Watch Now
              </v-btn>&nbsp;
              &nbsp;
              &nbsp;
              <v-btn
                class="btn btn-hollow btn-hollow-white"
                @click="logData('featured_all_video_details',seriesItem5)"
                :to="`/tvCollections/details/${seriesItem5.series_id}`"
              >See Details</v-btn>
            </div>
          </div>
        </div>
      </div>
    </template>
     <template v-else>
     <div class="bg-class" >
        <!-- <img src="https://deikho.com/images/test.png" class="image-header-all" /> -->
   </div>      </template>
    <!-- Featured videos  -->
    <!-- <featuredVideos :swiperOptionh="swiperOptionh" :featuredVideos="featuredVideos" /> -->
    <!-- Trending videos -->

    <!-- <template v-if="seriesByCategories">
      <template v-for="(catVids, index) in seriesByCategories">
        <template v-if="catVids && catVids!=undefined && catVids.length > 0">
          <section class="innerCategory__Video">
            <div class="swiper-container slider">
              <br />

              <h2 class>{{index}}</h2>
              <div v-swiper="swiperTrending" :instanceName="index">
                <div class="swiper-wrapper slider-v main-slide-box">
                  <div
                    v-for="catVid in catVids"
                    class="swiper-slide innerthumbs__v"
                    @mouseenter="hoverIn"
                    @mouseleave="hoverOut"
                  >
                    <template v-if="catVid ">
                      <v-hover>
                        <div class="v-thumb main-load" :ref="index+catVid.series_id">
                          <div class="sliderimg main-home-custom" style="cursor:pointer"
                                              @click="takeMeToDetail(catVid.series_id)"
><div v-if="catVid.is_free" class='free-tag'>
  Free
</div>  
                            <v-img
                              :src="catVid.thumb"
                              :lazy-src="`${catVid.thumb}`"
                              aspect-ratio="1"
                              class="grey lighten-2"
                            >
                              <v-layout
                                slot="placeholder"
                                fill-height
                                align-center
                                justify-center
                                ma-0
                              >
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                              </v-layout>
                            </v-img>
                          </div>
                          <div class="hover__detaillist custom-hover">
                            <div class="bob-overview-wrapper">
                              <div
                                class="title mx-2 mt-2"
                                v-if="catVid.series_name"
                              >{{catVid.series_name.toLowerCase().trim()}}</div>
                              <time
                                class="caption time mx-2"
                                v-if="catVid.seasons!=undefined"
                              >{{catVid.seasons.length}}</time>
                              <p
                                class="caption dec mx-2"
                                v-if="catVid.series_description"
                              >{{catVid.series_description.toLowerCase().trim()}}</p>
                              <div class="row col button-group">
                                <button
                                  class="btn btn-daikho-hollow"
                                  style="display:flex;justify-content:center"
                                  @click="takeMeToWatch(catVid)"
                                >
                                  <v-icon style="color:#ffc511">play_arrow</v-icon>&nbsp;
                                  <span
                                    style="margin-top:2.5px;display: grid;
    align-content: center;"
                                  >Play Now</span>
                                </button>

                                <button class="btn btn-hollow btn-hollow-white">
                                  <router-link
                                    :to="`/tvCollections/details/${catVid.series_id}`"
                                    @click="logData('video_details',catVid)"
                                    style="display:inherit;height:auto !important"
                                  >Details</router-link>
                                </button>
                              </div>
                            </div>

                      
                          </div>
                          <span :ref="index+catVid.series_id+'Arrow'"></span>
                        </div>
                      </v-hover>
                    </template>
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
        </template>
      </template>
    </template>-->
    <section class="innerCategory__Video">
      <div class="col" v-if="ComedyData">
        <br />
        <h2>Drama </h2>

        <genreList
          :Alldata="ComedyData"
          :getMovies="getMovies"
          :moviesloading="moviesloading"
          :allLoaded="allLoaded"
          :logData="logData"
          :takeMeToWatch="takeMeToWatch"
        />
      </div>
      <!-- <div v-else>
  <div class="spinner-border" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
      </div>-->
    </section>
    <!-- <section class="innerCategory__Video">
<div class="col" v-if="seriesData">
          <h2>seriesData </h2>
      <br />
      <br />

<genreList :data="seriesData" />
</div>
    </section>-->

    <template v-if="!ComedyData">
      <circleLoader />
    </template>
  </v-content>
</template>
<script>
import categoryPicks from "~/components/default/home/categoryPicks";
import genreList from "~/components/default/genreList";
import featuredVideos from "~/components/default/home/featuredVideos";
import videoDetails from "~/components/default/base/videoDetails";
import circleLoader from "~/components/default/circleLoader";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "home",
  // middleware: ["auth"],
  head() {
    return {
      titleTemplate: "%s - " + this.configs.site_slogan,
      meta: [
        {
          name: "description",
          content: "Welcome to the world of your favourite movies and tv shows"
        }
      ]
    };
  },

  data() {
    return {
      seriesItem1: [],
      seriesItem2: [],
      seriesItem3: [],
      seriesItem4: [],
      seriesItem5: null,
      // Slider Options
      swiperOption: {
        // 				autoplay: {
        //     delay: 2000,
        //   },

        loop: true,
        // direction: "horizontal",
        nav: true,
        // pagination: {
        //   el: ".swiper-pagination"
        // },
        navigation: {
          nextEl: ".editer_next",
          prevEl: ".editer_prev"
        },
        effect: "slide",
        // Distance between slides in px.
        // spaceBetween: 30,
        //
        slidesPerView: 1.4,
        //
        // initialSlide:1,
        centeredSlides: true,
        //
        loop: true,
        slidesPerView: 3,
        breakpoints: {
          1400: {
            slidesPerView: 1.4,
            spaceBetween: 0
          },
          1024: {
            slidesPerView: 1.4,
            spaceBetween: 0
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 0
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 0
          },
          375: {
            slidesPerView: 1,
            spaceBetween: 0
          }
        }
      },
      swiperOptionh: {
        slidesPerView: 5,
        spaceBetween: 10,
        loop: false,
        breakpoints: {
          1400: {
            slidesPerView: 5,
            spaceBetween: 2
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 6
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 5
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 5
          },
          375: {
            slidesPerView: 1,
            spaceBetween: 5
          }
        },
        navigation: {
          nextEl: ".feucher_next",
          prevEl: ".feucher_prev"
        }
      },
      swiperTrending: {
        simulateTouch: true,
        slidesPerView: 4.2,
        spaceBetween: 4,
        slidesPerGroup: 3,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        breakpoints: {
          1400: {
            slidesPerView: 3.2,
            spaceBetween: 2
          },
          1024: {
            slidesPerView: 3.2,
            spaceBetween: 6
          },
          768: {
            slidesPerView: 2.2,
            spaceBetween: 2,
            slidesPerGroup: 2
          },
          640: {
            slidesPerView: 2.2,
            spaceBetween: 2,
            slidesPerGroup: 2
          },
          375: {
            slidesPerView: 2.2,
            spaceBetween: 2,
            slidesPerGroup: 2
          }
        },
        navigation: {
          nextEl: ".swiper-slider-next",
          prevEl: ".swiper-slider-prev"
        }
      },
      // Slider Options
      categoryPicks: [],
      moviesData: null,
      seriesData: null,
      allLoaded: false,
      ComedyData: null,
      recentVideos: [],
      trendingVideos: [],
      featuredVideos: [],
      moviesloading: false,
      featuredSeries: [],
      featuredMovies: [],
      pranksData: null,
      myList: [],
      seriesByCategories: "",
      categoryVideos: [],
      videoCategories: [],
      rowIdentifier: "",
      prevIdentifier: "",
      prevVid: "",
      epIsHere: false,
      featuredLoading: true,
      featured_loaded: false,
      categoriesLoading: true,
      trendingLoading: true,
      dataLoading: true
    };
  },
  computed: {
    ...mapGetters(["configs"])
  },
  components: {
    categoryPicks,
    featuredVideos,
    videoDetails,
    circleLoader,
    genreList
  },
  methods: {
    hidePopup() {
      this.hide();
      localStorage.setItem("show_popup", "false");
    },
    show() {
      this.$modal.show("hello-world");
    },
    hide() {
      this.$modal.hide("hello-world");
    },
    setPageData() {
      try {
        this.$axios.get(`/base/homePage`).then(
          response => {
            let homeData = response.data.data;
            this.categoryPicks = homeData.editor_picks;
            if (this.categoryPicks)
              if (this.categoryPicks.length > 0) this.epIsHere = true;
            this.myList = homeData.my_list;
            // console.log(homeData.featured_series);
            this.featuredSeries = homeData.featured_series;

            this.dataLoading = false;
          },
          err => {
            this.dataLoading = false;
            if (!err.response) {
              this.$store.commit(
                "snackIt",
                "Server isn't responding video categories can't be fetched"
              );
            } else if (err.response.status == 401) {
              this.$store.commit(
                "snackIt",
                "You are not authorized to access this route"
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    },

    setFeaturedSeries() {
      try {
        this.$axios.get(`/series/list/?featured=1`).then(
          response => {
            let total_featured = 0;
            let loaded_featured = 0;
            let featuredSeries_Obj = [];
            let series = response.data.series.featured;
            series.map(item => {
              total_featured++;
              axios
                .get("https://deikho.com/api/series/list/" + item.series_id)
                .then(response => {
                  if (response.data.status) {
                    // let seasons = response.data.series.series_by_id[0].seasons;
                    // featuredSeries_Obj["seasons"]=seasons;
                    featuredSeries_Obj.push(
                      response.data.series.series_by_id[0]
                    );
                    loaded_featured++;
                    if (loaded_featured == total_featured) {
                      this.featuredSeries = featuredSeries_Obj;
                      // console.log(
                      //   "sete featured series",
                      //   JSON.stringify(this.featuredSeries)
                      // );

                      this.featured_loaded = true;

                      // console.log("asd",JSON.stringify(featuredSeries_Obj));
                    }
                  }
                })
                .catch(err => {
                  console.log(err);
                  return err;
                });
            });
          },
          err => {
            if (!err.response) {
              this.$store.commit(
                "snackIt",
                "Server isn't responding video categories can't be fetched"
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    },
    setVideoCategories() {
      try {
        this.$axios.get(`/videos/categories/`).then(
          response => {
            this.videoCategories = response.data.categories;
          },
          err => {
            if (!err.response) {
              this.$store.commit(
                "snackIt",
                "Server isn't responding video categories can't be fetched"
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    },
    hoverIn(e) {
      this.$mouseEnter(e);
    },
    hoverOut(e) {
      this.$mouseLeave(e);
    },
    getCategoryName(category_id) {
      let obj = this.$findObjectByKey(
        this.videoCategories,
        "category_id",
        category_id
      );
      return obj.category_name;
    },

    takeMeToDetail(series_id) {
      this.$router.push(`/tvCollections/details/${series_id}`);
    },
       takeMeToWatchVideo(obj) {
                    this.$fb.track("ViewContent",{
           msisdn: this.$store.getters.currentUser
          ? this.$store.getters.currentUser.msisdn
          : "N/A",
          videoid:obj.videoid,
        video_title: obj.title,
        series_id: obj.series_id
      });	
         if (
        localStorage.getItem("network_changed") == true ||
        localStorage.getItem("network_changed") == "true"
      ) {
        console.log("header video ");
        window.location.href = `http://www.deikho.com/watch_video.html?episode_id=${obj.videoid}&type=video&series_id=${obj.series_id}&season_id=${obj.season_id}&source=${obj.is_free}`;
      } else {
        console.log("watch ");
        this.$router.push(
          `/watch/${obj.videoid}?type=video&series_id=${obj.series_id}&season_id=${obj.season_id}&source=${obj.is_free}`
        );
      }
    },
    takeMeToWatch(seriesObj) {
      console.log("to watch", seriesObj);
      axios
        .get("https://deikho.com/api/series/list/" + seriesObj.series_id)
        .then(response => {
          // console.log("Seasons data", response);
          if (response.data.status) {
            let seasons = response.data.series.series_by_id[0].seasons;
            //  let seasons = seriesObj.seasons;
            let firstSeason = seasons.filter(season => season.sequence == 1);
            firstSeason = firstSeason[0];
            let minMaxOfEpisodes = this.$minMaxOfArrayOfObjects(
              firstSeason.episodes,
              "videoid"
            );
            let episode_id = minMaxOfEpisodes.min;
                  this.logData("video_play", seriesObj,episode_id);

            if (!minMaxOfEpisodes)
              this.$store.commit(
                "snackIt",
                "No episodes added in this series's seasons"
              );
            else {
              console.log(
                "network changed",
                localStorage.getItem("network_changed")
              );
              if (
                localStorage.getItem("network_changed") == true ||
                localStorage.getItem("network_changed") == "true"
              ) {
                console.log("header video ");
                window.location.href = `http://www.deikho.com/watch_video.html?episode_id=${episode_id}&type=series&series_id=${seriesObj.series_id}&season_id=${firstSeason.season_id}&source=${seriesObj.is_free}`;
              } else {
                console.log("watch ");
                this.$router.push(
                  `/watch/${episode_id}?type=series&series_id=${seriesObj.series_id}&season_id=${firstSeason.season_id}&source=${seriesObj.is_free}`
                );
              }

              //
            }
          }
        })
        .catch(err => {
          console.log(err);
          return err;
        });
    },
    getMovies(seriesLimit) {
      try {
        this.moviesloading = true;

        this.$axios
          .get(`/videos/list/?categories=19&limit=${seriesLimit}`)
          .then(
            response => {
              console.log("response 12 cat", response);
              // let tempdata =
              //   response.data.series.series_by_id["0"]["seasons"]["0"][
              //     "episodes"
              //   ];
              let tempdata = response.data.videos.category_videos["19"];
              let data = response.data.videos.category_videos["19"];
              console.log("this.limit", data);
              var self = this;
              self.featuredMovies = [];
              if(data){
             data.map(item => {
                console.log("video loop",item);
                if (item.featured == "yes") {
this.seriesItem5 = item;
                  return;
                  // if(
                  //   item.featuredOrder
                  // ){
                  // self.featuredSeries[item.featuredOrder]=item;}
                  // else
                  {
                    self.featuredMovies.push(item);
                  }
                }
              });
              }
              console.log("Featured", this.featuredMovies);
              // for (var i = 0; i < 10; i++) {
              //   data.push(tempdata[i]);
              // }
              this.moviesData = data;
              this.allData = tempdata;
              if (seriesLimit > 10) {
                this.allLoaded = true;
              }

                this.ComedyData = this.moviesData;
              this.moviesloading = false;
            },
            err => {
              if (!err.response) {
                this.$store.commit(
                  "snackIt",
                  "Server isn't responding your list can't be fetched"
                );
                this.moviesloading = false;
              } else {
                let errorMsg = err.response.data.errors.error;
                console.log(errorMsg);
                this.$store.commit("snackIt", errorMsg[0]);
                this.moviesloading = false;
              }
            }
          );
      } catch (err) {
        console.log(err);
        this.moviesloading = false;
      }
    },

    getSeries(seriesLimit) {
      try {
        this.$axios.get(`/series/list/?categories=6&limit=${seriesLimit}`).then(
          response => {
            console.log("response 12 cat", response);
            // let tempdata =
            //   response.data.series.series_by_id["0"]["seasons"]["0"][
            //     "episodes"
            //   ];
            let tempdata = response.data.series.category_series["6"];
            let data = response.data.series.category_series["6"];
            console.log("this.limit", data);
            // for (var i = 0; i < 10; i++) {
            //   data.push(tempdata[i]);
            // }
            this.seriesData = data;

            if (this.moviesData) {
              const combined1 = [].concat(this.seriesData, this.moviesData);
              this.ComedyData = combined1;
              this.seriesData.map(item => {
                if (item.cat_featured == "yes") {
                  console.log("item series featured", item);

                  this.seriesItem5 = item;
                  return;
                }
              });
              if (this.seriesItem5 == null) {
                this.seriesItem5 = item;
              }
              console.log("seriesItem5 data", this.seriesItem5);
            }
            this.allData = tempdata;

            // console.log("Category data", this.moviesData);
          },
          err => {
            if (!err.response) {
              this.$store.commit(
                "snackIt",
                "Server isn't responding your list can't be fetched"
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    },

    closeVideoDetails() {},
    setTrendingSeries() {
      try {
        this.$axios.get(`/series/list/?trending=1`).then(
          response => {
            // this.trendingSeries = response.data.series.trending;
            // this.seriesItem1 = this.trendingSeries[0]
            //   ? this.trendingSeries[0]
            //   : null;
            // this.seriesItem2 = this.trendingSeries[1]
            //   ? this.trendingSeries[1]
            //   : null;
            // this.seriesItem3 = this.trendingSeries[2]
            //   ? this.trendingSeries[2]
            //   : null;
            // this.seriesItem4 = this.trendingSeries[3]
            //   ? this.trendingSeries[3]
            //   : null;
            // this.seriesItem5 = this.trendingSeries[4]
            //   ? this.trendingSeries[4]
            //   : null;
          },
          err => {
            if (!err.response) {
              this.$store.commit(
                "snackIt",
                "Server isn't responding your list can't be fetched"
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    },

    getUserData() {
      let obj = {
        msisdn: this.$store.getters.currentUser.msisdn
      };
      axios
        .post("https://api.deikho.com/user/getStatus", obj)
        .then(response => {
          //console.log("response daat", response);
          if (response.data.status) {
            let user_obj = response.data.data[0];
            this.$store.getters.profileImage = response.data.data[0].image;
            if (typeof Storage !== "undefined") {
              // Code for localStorage/sessionStorage.
              localStorage.setItem("img", response.data.data[0].image);
              console.log("Setting local storage");
            } else {
              console.log("Sorry! No Web Storage suppor");

              // Sorry! No Web Storage support..
            }
            console.log("user_obj", user_obj);

            this.$store.getters.currentUser.is_subscribed =
              user_obj.status == "A" ? true : false;
            this.$store.getters.subscription_status =
              user_obj.status == "A" ? true : false;
            this.$store.getters.currentUser["plan_id"] = user_obj.plan_id;

            this.$store.getters["profileImage"] = user_obj.image;
            this.user_status =
              user_obj.status == "A"
                ? "Active"
                : status == "S"
                ? "Suspended"
                : status == "IA"
                ? "Inactive"
                : "In Active";
          }
        })
        .catch(err => {
          console.log(err);
          return err;
        });
    },
    logData(event_name, seriesObj,videoid) {
      this.$fireAnalyticsObj().logEvent(event_name, {
        msisdn: this.$store.getters.currentUser
          ? this.$store.getters.currentUser.msisdn
          : "N/A",
        video_title: seriesObj.series_name
      });
                  this.$fb.track("ViewContent",{
           msisdn: this.$store.getters.currentUser
          ? this.$store.getters.currentUser.msisdn
          : "N/A",
          videoid:videoid,
        video_title: seriesObj.series_name
      });	
    }
  },

  created() {
    // this.$router.push('/login')
    // this.setFeaturedSeries();
    // this.setPageData();
    // this.setTrendingSeries();
  },
  beforeMount() {
    // this.setVideoCategories()
    this.getMovies(1000);
    // this.getSeries(1000);
  },
  mounted() {}
};
</script>
<style scoped>
.bg-class{height: 80vh;}
.mobile-pop {
}
.featured-content-custom-mobile {
  display: none;
}
.featured-content-custom-mobile .pad-5 {
  width: 45vw;
  height: 44vw;
}

.featured-content-custom-mobile .image-custom-vertical {
  min-height: 35vw;
  height: 35vw;
}
.featured-content-custom {
  padding: 5vmin 20vmin;
}
.innerCategory__Video {
  padding: 0 20vmin;
  border-bottom: 0px !important;
}

.p10-v {
  padding: 10vmin;
}
.btn-grey {
  padding: 10px;
  width: 150px;
  border-radius: 5px;
  text-align: center;
  margin: 10px 0;

  background: #282828;
  color: white;
}
.btn-hollow {
  text-align: center;
  width: 150px;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #282828;
  color: white;
}
.main-load > .sliderimg > .v-image {
  height: 400px;
}
.p-20 {
  padding: 20px;
}
.btn-daikho {
  padding: 0 30px;
  color: white;
  height: 50px;
  background: #ffc511 !important;
  border-radius: 5px;
}
.lrp-0 {
  padding-left: 0px;
  padding-right: 0px;
}
.btn-daikho-hollow {
  padding: 0 30px;
  color: #ffc511;
  height: 50px;
  border: 1px solid #ffc511 !important;
  border-radius: 5px;
  background: none !important;
}
.btn-grey {
  padding: 0 30px;
  color: white;
  height: 50px;
  background: #b4b3b1 !important;
  border-radius: 5px;
}
.btn-grey:hover {
  padding: 0 30px;
  color: white;
  height: 50px;
  background: #ffc511 !important;
  border-radius: 5px;
}

.btn-hollow-white {
  padding: 0 30px;
  color: white;
  height: 50px;
  background: none !important;
  border: 1px solid white;
  border-radius: 5px;
}
.innerTrending__Video .slider .slider-v .innerthumbs__v .v-thumb:hover,
.innerDramas__Video .slider .slider-v .innerthumbs__v .v-thumb:hover,
.innerlist__Video .slider .slider-v .innerthumbs__v .v-thumb:hover,
.innerCategory__Video .slider .slider-v .innerthumbs__v .v-thumb:hover {
  z-index: 2;
  -webkit-transition: all 200ms ease-in;
  -webkit-transform: scale(1.8);
  -ms-transition: all 200ms ease-in;
  -ms-transform: scale(1.8);
  -moz-transition: all 200ms ease-in;
  -moz-transform: scale(1.8);
  transition: all 200ms ease-in;
  transform: scale(1);
}
.main-slide-box > .sliderbeforeitems,
.main-slide-box > .sliderAfteritmes,
.main-slide-box > .thumb-beforeitems {
  transform: translate3d(0px, 0px, 0px) !important;
  transform: none !important;
}
.image-sec {
  padding: 50px 0px;
  /* height: 50vmin; */
}
.image-sec > img {
  width: inherit;
  height: inherit;
  /* height: 50vmin; */
}
.main-load {
  margin: 0px 10px !important;
}
.main-load > .hover__detaillist {
  margin-right: -10px !important;
}
.swiper-slider-prev,
.swiper-slider-next {
  position: absolute;
  background: rgba(0, 0, 0, 0);
  top: 105px;
  height: 58%;
  width: 50px;
  /* display: flex; */
  z-index: 1;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  flex-wrap: wrap;
  cursor: pointer;
  visibility: hidden;
}
.searchinner.active .searchbar {
  display: block;
  border-radius: 15px;
  background: #ffffff4d;
  border: 1px solid #3f3f3f;
  -webkit-animation: scale-up-hor-right 0.2s cubic-bezier(0.39, 0.575, 0.565, 1)
    both;
  animation: scale-up-hor-right 0.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@media screen and (max-width: 1024px) {
  .main-load {
    margin: 0;
  }
  .innerCategory__Video {
    padding: 0 1vmin;
  }
  .bob-overview-wrapper .title {
    display: none;
  }
  .bob-overview-wrapper .caption {
    display: none;
  }
  .hover__detaillist .button-group button {
    height: 25px !important;
  }
  .btn-daikho {
    padding: 0 0px;
    color: white;
    height: 50px;
    background: #ffc511 !important;
    border-radius: 5px;
  }
  .lrp-0 {
    padding-left: 0px;
    padding-right: 0px;
  }
  .hover__detaillist .button-group {
    padding: 0px 22px !important;
  }
  .btn-daikho-hollow {
    padding: 0 0px;
    color: #ffc511;
    height: 50px;
    border: 1px solid #ffc511 !important;
    border-radius: 5px;
    background: none !important;
  }
  .main-load > .hover__detaillist {
    margin-right: 0px;
  }
  .swiper-slider-prev,
  .swiper-slider-next {
    display: none;
  }
  .p10-v {
    padding: 0vmin;
  }
  .featured-content-custom {
    padding: 5vmin;
  }
  .image-sec {
    padding: 10vmin;
  }
  .image-sec > img {
    width: 70vw;
  }
  .d-flex {
    display: block !important;
  }
}
.innerTrending__Video .slider .slider-v,
.innerDramas__Video .slider .slider-v,
.innerlist__Video .slider .slider-v,
.innerCategory__Video .slider .slider-v {
  padding: 0 !important;
}
.hover__detaillist .button-group a {
  text-decoration: none;

  height: 35px;

  -webkit-box-align: center;
  align-items: center;
  border-radius: inherit;
  color: inherit;
  display: -webkit-box;
  display: flex;
  -webkit-box-flex: 1;
  -webkit-box-pack: center;
  justify-content: center;
  margin: 0 auto;
  position: relative;
  -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  white-space: nowrap;
  width: inherit;
  display: inherit;
  height: auto !important;
}
.hover__detaillist .button-group a i {
  color: #ffc511;
}
.hover__detaillist .button-group a :hover {
  color: #ffc511;
}
.main-home-custom .v-responsive__content {
  background: #0000004a;
  height: 100%;
  width: 100%;
  position: absolute;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0.5)
  ) !important;
  color: black;
}
.hover__detaillist .button-group {
  padding: 0px 30px;
}
.hover__detaillist .button-group button {
  width: 100%;

  height: 35px;
}
.bob-overview-wrapper {
  width: 90% !important;
}

@media screen and (max-width: 1024px) {
  .main-load {
    margin: 0;
  }
  .play-parent {
    display: flex;
    top: 40%;
  }
  .main-load > .hover__detaillist {
    margin-right: 0px;
  }
  .swiper-slider-prev,
  .swiper-slider-next {
    display: none;
  }
  .featured-content-custom {
    padding: 20vmin 10vmin;
    padding-top: 5vmin;
    padding-bottom: 5vmin;
  }
  .image-sec {
    padding: 10vmin 0vmin;
  }
  .image-sec > img {
    width: 80vw;
  }
  .d-flex {
    display: block !important;
  }
}
.view-cards {
  height: 15vw;
  min-height: 200px;

  width: 100%;
}
.view-cards-big {
  height: 33vw;
  min-height: 200px;
  width: 100%;
}
.view-cards-vertical {
  height: 400px;
  width: 100%;
}

.pad-5 {
  padding: 15px;
}
.bg-class {
  background: url("https://deikho.com/files/thumbs/2019/10/21/img-mid.jpg");
}
.see-More {
  height: 1px;
  border-top: 1px solid #454545;
  display: flex;
  justify-content: center;
}
.btn-white {
  color: black;
  background: white;
  width: 140px;
  height: 50px;
}
.grid {
  display: grid;
  margin-top: -25px;
}
.pt-5-cus {
  padding-top: 5px;
}

.heading-line {
  width: 50px;
}
.section-heading {
  /* padding: 35px 0; */
}
.section-heading-parent {
  display: grid;
  align-items: center;
}

.image-custom {
  height: 13vw;
  min-height: 160px;
  width: 100%;
  object-fit: cover;
}
.image-custom-featured {
  min-height: 160px;
  height: 29.5vw;
  width: 100%;
  object-fit: cover;
}
.view-cards-vertical-big {
  min-height: 200px;
  height: 20vw;
  width: 100%;
}
.image-custom-ver-big {
  min-height: 160px;
  object-position: bottom;
  height: 21vw;
  width: 100%;
  object-fit: cover;
}

.view-cards-vertical {
  height: 22vw;
  min-height: 200px;
}
.play-parent {
  display: grid;
  align-items: center;
  justify-content: center;
}
.image-header-all {
  position: absolute;
  width: 100%;
  height: 80vh;
  object-fit: cover;
}
.v-btn__content {
  color: white !important;
}
.image-footer-all {
  position: absolute;
  width: 100%;
  height: 50vh;
  object-fit: cover;
}
.image-custom-vertical {
  min-height: 160px;
  height: 21vw;
  width: 100%;
  object-fit: cover;
}
.header-all {
  height: 80vh;
  margin-bottom: 3vmin;
}

.btn-daikho {
  padding: 0 30px;
  color: white;
  height: 50px;
  background: #ffc511 !important;
  border-radius: 5px;
}

.btn-hollow-white {
  padding: 0 30px;
  color: white;
  height: 50px;
  background: none !important;
  border: 1px solid white;
  border-radius: 5px;
}
.header-all-text {
  position: absolute;
  bottom: 5vw;
  left: 5vw;
}
@media screen and (min-width: 1200px) and (max-width: 1600px) {
  .button-group {
    margin-bottom: 10px;
  }
  h1 {
    font-size: 2em;
  }
}
@media only screen and (max-width: 767px) {
.image-header-all{
  height: 30vh;
  margin-top: 50px;
}
.header-all-text h1{
  display: none;
}

.header-all-text small{
  display: none;
}
.header-all-text br{
  display: none;
}.header-all-text p{
  display: none;
}
.btn-daikho-hollow{
    display: none;
}
.header-all,.bg-class{
  height: 38vh;

}
.btn-hollow{
  display: none;
}
.button-group{
  margin: 0px;
}
.btn-daikho:hover{
  
    width: 125px;
    height: 30px;
    font-size:10px;
}
.btn-daikho{
  
    width: 125px;
    height: 30px;
    font-size:10px;
}
h1{font-size:1.5rem}
h2{font-size:1.35rem}  .free-tag {
    position: absolute;
    z-index: 1;
    right: 0;
    padding: 2px 7px !important;
    background: #ffad01;
    text-transform: uppercase;
    top: 15px;
    color: white;
    border-radius: 5px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    font-size: 12px !important;
    font-weight: bolder;
  }
  .featured-content-custom-mobile {
    display: block;
  }
  .featured-content-custom {
    display: none;
  }
  .main-load > .sliderimg > .v-image {
    height: 40vw;
  }
  .image-header-bottom {
    height: 80vh;
  }
  .view-cards,
  .view-cards-big,
  .view-cards-vertical-big,
  .view-cards-vertical {
    min-height: 360px;
  }
  .image-custom,
  .image-custom-featured,
  .image-custom-ver-big,
  .image-custom-vertical {
    min-height: 325px;
  }
}
.genreList .pad-5 {
  width: 48.5vw;
  height: 44vw;
}

.genreList .pad-5 .rcbd {
  width: 90% !important;
}

.genreList .pad-5 .h-300 {
  margin-bottom: 0px !important;
}
.genreList .pt-5-cus {
  padding-top: 3px;
  padding-bottom: 5px;
}

.genreList .row {
  place-content: center;
}
.vjs-top-bar #video-title-text {
  display: none !important;
}
.text-section {
  color: white;
  padding: 0 15%;
  font-weight: 900;
}
.btn-round {
  border-radius: 30px;
  height: 35px;
}
.image-section {
  background: url(https://deikho.com/files/web/mobs.png);
  height: 175px;
  object-fit: contain;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;
}
.modal-body-bg {
  background: url("https://deikho.com/files/web/bg_1010.png");
  height: 500px;
  background-size: cover;
  width: 350px;
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 5% 0;
}

.col-md-3
  .pad-5
  .prank-card
  > div
  > p
  > div
  > div.v-image__image.v-image__image--cover {
  background-size: contain !important;
}

.innerTrending__Video
  .slider
  .slider-v
  .innerthumbs__v
  .v-thumb
  .hover__detaillist,
.innerDramas__Video
  .slider
  .slider-v
  .innerthumbs__v
  .v-thumb
  .hover__detaillist,
.innerlist__Video .slider .slider-v .innerthumbs__v .v-thumb .hover__detaillist,
.innerCategory__Video
  .slider
  .slider-v
  .innerthumbs__v
  .v-thumb
  .hover__detaillist {
  height: 50%;
  top: auto;
  bottom: 0;
}
.main-home-custom {
  cursor: pointer;
}
.free-tag {
  position: absolute;
  z-index: 1;
  right: 0;
  padding: 2px 12px;
  background: #ffad01;
  text-transform: uppercase;
  top: 15px;
  color: white;
  border-radius: 5px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  font-size: 18px;
  font-weight: bolder;
}
</style>  
