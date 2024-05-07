<template>
  <div>
    <v-layout v-if="seDetails" id="vdthumb_id" class="Trending__tails__thumbs active">
      <!-- Checkmate -->
      <v-flex lg3 md4 sm3 xs0 mt-3 px-3 py-2 class="moreshowdetails"></v-flex>
      <!-- Thumb and cross -->
      <v-flex lg9 md8 sm9 xs12 class="rightthumb">
        <v-btn v-if="withCloseBtn" class="close" fab small @click="closeSeriesDetailsNative">
          <v-icon dark>close</v-icon>
        </v-btn>
        <router-link class="sliderimg" to>
          <v-img
            :src="`${seDetails.poster?seDetails.poster:seDetails.thumb}`"
            :lazy-src="`${seDetails.poster?seDetails.poster:seDetails.thumb}`"
            aspect-ratio="1"
            class="grey lighten-2"
          >
            <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-layout>
          </v-img>
          <span class="hoverbg"></span>
        </router-link>
      </v-flex>
      <v-flex lg12 class="tabs_FadeInPlace">
        <div class="coverarea moreshowdetails">
          <!-- details grand parent container -->
          <div class="tabs-container-div">
            <!-- <div class="center-play-button">
              <v-btn
                small
                class="btn btn-grey circle-play custom-circle"
                @click="takeMeToWatch(seDetails)"
              >
                <v-icon class="v-icon-lg">play_arrow</v-icon>
              </v-btn>
            </div>-->

            <div class="header-all-text">
              <small
                v-for="(cat, index) in seDetails.categories"
                :key="index"
                style="padding-bottom:15px;color:#FFC511;"
              >
                <i key v-if="index ==0">{{cat.category_name}}</i>
                <i v-else>, {{cat.category_name}}</i>
              </small>
              <!-- <small :key="index" style="padding-bottom:15px;color:#FFC511;">
                <i style="text-transform:capitalize">{{seDetails.series_tags.toLowerCase().trim()}}</i>
              </small>-->
              &nbsp;&nbsp;|&nbsp;
              <small>{{seDetails.duration}}</small>
              <h1
                class
                style="text-transform:capitalize"
              >{{seDetails.series_name.toLowerCase().trim()}}</h1>
               <div class="dropsea d-block mt-3">
										<v-menu v-if="seasons && seasons.length > 0" offset-y>
											<v-btn slot="activator" color="primary">
												Season {{selectedSeasonSequence}} 
												<v-icon>expand_more</v-icon>
											</v-btn>
											<v-list class="listseason">
												<v-list-tile v-for="season in seasons" :key="season.season_id" @click="updateSeason(season.season_id)" >
													<v-list-tile-title active-class="highlighted"> 
														Season {{season.sequence}}
													</v-list-tile-title>
												</v-list-tile>
											</v-list>
										</v-menu>
      </div>
              <br />
              <p style="max-width:40vw">{{seDetails.series_description}}</p>
              <li v-if="directors && directors.length > 0">
                {{$t("Director")}} :
                <p v-for="(director, index) in directors">
                  <router-link
                    :to="`/person/${director.director_id}?type=directors`"
                  >{{director.name}}</router-link>
                  <template v-if="index < directors.length - 1">,&nbsp;</template>
                </p>
              </li>
              <li v-if="cast && cast.length > 0">
                {{$t("Cast")}} :
                <p v-for="(castItem, index) in cast">
                  <router-link :to="`/person/${castItem.cast_id}?type=cast`">{{castItem.name}}</router-link>
                  <template v-if="index < cast.length - 1">,&nbsp;</template>
                </p>
              </li>
            </div>

            <!-- tab buttons -->
          </div>
        </div>
      </v-flex>
      <!-- Checkmate -->
    </v-layout>

    <v-layout py-5 v-else id="vdthumb_id" class="Trending__tails__thumbs active">
      <v-flex lg12 md12 my-5 px-3 py-2 class="rightthumb">
        <v-progress-circular
          v-if="seriesProcessing"
          my-5
          class="text-md-center"
          :size="70"
          :width="4"
          color="#ffc511"
          indeterminate
        ></v-progress-circular>
        <section v-if="error" class="container">
          <v-card pa-5>
            <v-card-title class="headline">An error occured fetching series details</v-card-title>
            <v-card-text>
              <p>An error occured fetching series details please try again or contact admin for assistance</p>
            </v-card-text>
          </v-card>
        </section>
      </v-flex>
    </v-layout>
    <div class="tabinner_episodes tabset_area tab-active">
      <span class="v-hovertabs active_hover"></span>
      <!-- catagory_season -->
      <!-- <div class="dropsea d-block mt-3">
										<v-menu v-if="seasons && seasons.length > 0" offset-y>
											<v-btn slot="activator" color="primary">
												Season {{selectedSeasonSequence}} 
												<v-icon>expand_more</v-icon>
											</v-btn>
											<v-list class="listseason">
												<v-list-tile v-for="season in seasons" :key="season.season_id" @click="updateSeason(season.season_id)" >
													<v-list-tile-title active-class="highlighted"> 
														Season {{season.sequence}}
													</v-list-tile-title>
												</v-list-tile>
											</v-list>
										</v-menu>
      </div>-->
      <!--close_catagory_season -->
      <v-layout v-if="seDetails">
        <p style class="mobile-desc">{{seDetails.series_description}}</p>
      </v-layout>

      <section class="slider_v_epresod">
        <div
          v-if="seasons && seasons.length > 0"
          class="swiper-container slider main-haeder"
          style="
  
"
        >
          <div
            v-if="selectedSeasonEpisodes && selectedSeasonEpisodes.length > 0"
            v-swiper="swiperEpresode"
            :instanceName="'swiperEp'"
          >
            <div class="swiper-wrapper slider-v">
              <div v-for="seasonEp in selectedSeasonEpisodes" class="swiper-slide v_epresod">
                <template v-if="seasonEp.can_play">
                  <div style="max-height:200px" @click="takeMeToWatch1(seDetails,seasonEp)">
                    <v-hover>
                      <div slot-scope="{ hover }" class="v-thumb">
                        <div class="sliderimg">
                          <v-img
                            v-if="seasonEp.thumbs.original"
                            style="max-height:200px"
                            :src="hover ? seasonEp.gif != null ? seasonEp.gif : seasonEp.thumbs.original : seasonEp.thumbs.original"
                            :lazy-src="`${seasonEp.thumbs.original}`"
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

                          <span class="hover">
                            <v-icon>play_arrow</v-icon>
                          </span>
                        </div>
                      </div>
                    </v-hover>
                  </div>
                  <!-- <router-link
                  v-if="isFreeCheck==true"
                    :to="`/watch_video.html?episode_id=${seasonEp.videoid}&type=series&series_id=${seDetails.series_id}&season_id=${selectedSeasonId}`"
                  >
                    <v-hover>
                      <div slot-scope="{ hover }" class="v-thumb">
                        <div class="sliderimg">
                          <v-img
                            :src="hover ? seasonEp.gif != null ? seasonEp.gif : seasonEp.thumbs.original : seasonEp.thumbs.original"
                            :lazy-src="`${seasonEp.thumbs.original}`"
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
                          <span class="hover">
                            <v-icon>play_arrow</v-icon>
                          </span>
                        </div>
                      </div>
                    </v-hover>
                  </router-link>-->

                  <div class="moreinfo_ep mt-2 active">
                    <div class="episodeTitle">
                      <span
                        class="title_small body-2"
                      >{{seasonEp.title.toLowerCase().trim().split(".mp4")["0"]}}&nbsp;&nbsp;{{seasonEp.episode_number}}</span>
                      <p class="time justify-end">{{seasonEp.duration}}</p>
                    </div>
                    <p class="body-2 hidden-md-and-down">{{seasonEp.description.split(".mp4")["0"]}}</p>
                  </div>
                </template>

                <template v-if="seasonEp.is_next">
                  <template>
                    <v-hover>
                      <div slot-scope="{ hover }" class="v-thumb">
                        <div class="sliderimg">
                          <v-img
                            v-if="seasonEp.thumbs.original"
                            style="max-height:200px"
                            :src="hover ? seasonEp.gif != null ? seasonEp.gif : seasonEp.thumbs.original : seasonEp.thumbs.original"
                            :lazy-src="`${seasonEp.thumbs.original}`"
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
                          <v-img
                            v-else
                            style="max-height:200px"
                            :src="`${seDetails.thumb}`"
                            :lazy-src="`${seDetails.thumb}`"
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
                          <span
                            class="hover"
                            style="
   display: grid;align-items: center;background: #00000070;
"
                          >Coming Soon</span>
                        </div>
                      </div>
                    </v-hover>
                  </template>

                  <div class="moreinfo_ep mt-2 active">
                    <div class="episodeTitle">
                      <span class="title_small body-2">{{seasonEp.episode_number}}</span>
                      <!-- <span
                        class="title_small body-2"
                      >{{seasonEp.title.toLowerCase().trim().split(".mp4")["0"]}}</span>-->
                      <!-- <p class="time justify-end">{{seasonEp.duration}}</p> -->
                    </div>
                    <!-- <p class="body-2 hidden-md-and-down">{{seasonEp.description.split(".mp4")["0"]}}</p> -->
                  </div>
                </template>
              </div>
            </div>
            <div class="swiper-slider-prev season-prev">
              <v-icon>chevron_left</v-icon>
            </div>
            <div class="swiper-slider-next season-next" style="margin-right:-50px">
              <v-icon>chevron_right</v-icon>
            </div>
          </div>
          <div v-else>
            <v-card v-if="!seriesProcessing">
              <v-card-title class="headline">No episodes found</v-card-title>
              <v-card-text>
                <p>No episodes found against this season</p>
              </v-card-text>
            </v-card>
          </div>
        </div>
        <div v-else>
          <v-card v-if="!seriesProcessing">
            <v-card-title class="headline">No seasons found</v-card-title>
            <v-card-text>
              <p>No seasons found against this series</p>
            </v-card-text>
          </v-card>
        </div>
      </section>
    </div>

    <div class="tabinner_trendingnow p-20v" style>
      <div class="see-More">
        <h2
          style="margin-top: -20px;background: #1c1c1c;height: 45px;padding: 0px 15px;"
        >Recommended Content</h2>
      </div>

      <!-- <div class="" style="
    float: right;
    position: absolute;
    right: 20vmin;
    margin-top: -35px;
">
      <span class="lpt-5">Home</span>&nbsp;
            <span class="lpt-5">Home</span>&nbsp;
      <span class="lpt-5">Home</span>&nbsp;

    </div>
 
      -->
      <span class="v-hovertabs active_hover"></span>
      <section
        v-if="relatedSeries && relatedSeries.length > 0"
        class="slider_v_trendingnow tabset_area"
      >
        <div class="swiper-container slider">
          <div v-swiper="swiperEpresode" :instanceName="'swiperTr'">
            <div class="swiper-wrapper slider-v">
              <div v-for="relatedSeriesItem in relatedSeries" class="swiper-slide v_epresod">
                <div class="v-thumb" @click="takeMeToWatch(relatedSeriesItem)">
                  <div class="sliderimg">
                    <v-img
                      style="max-height:200px"
                      :src="`${relatedSeriesItem.thumb}`"
                      :lazy-src="`${relatedSeriesItem.thumb}`"
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
                <div class="moreinfo_ep mt-2 active">
                  <div class="episodeTitle">
                    <span class="title_small body-2">{{relatedSeriesItem.series_name}}</span>
                  </div>
                  <p class="body-2 hidden-md-and-down">{{relatedSeriesItem.series_description}}</p>
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
      <section v-else>
        <v-flex lg12 md12 my-5 px-3 py-2 class="rightthumb">
          <v-progress-circular
            v-if="seriesProcessing"
            my-5
            class="text-md-center"
            :size="70"
            :width="4"
            color="#ffc511"
            indeterminate
          ></v-progress-circular>
          <section v-else class="container">
            <v-card pa-5 v-if="!seriesProcessing">
              <v-card-title class="headline">No related series found</v-card-title>
              <v-card-text>
                <p>No related series found please try again or contact admin for assistance</p>
              </v-card-text>
            </v-card>
          </section>
        </v-flex>
      </section>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "seriesDetails",
  props: ["sData", "closeSeriesDetails", "withCloseBtn"],
  data() {
    return {
      model: "tab-2",
      seDetails: "",
      cast: [],
      isFreeCheck: false,
      dateOffset: new Date(),
      directors: [],
      categories: [],
      seasons: [],
      selectedSeasonEpisodes: [],
      seriesProcessing: false,
      error: false,
      
      msg: "",
      maturityLevel: "",
      selectedSeasonSequence: 1,
      selectedSeasonId: "",
      // Related thing
      relatedSeries: [],
      // Jazib changes
      swiperEpresode: {
        slidesPerView: 6,
        spaceBetween: 4,
        slidesPerGroup: 1,
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
    logData(event_name, seriesObj) {
      this.$fireAnalyticsObj().logEvent(event_name, {
        msisdn: this.$store.getters.currentUser?this.$store.getters.currentUser.msisdn:"N/A",
        video_title: seriesObj.series_name
      });
      

    },
    takeMeToWatch(seriesObj) {
      this.logData("detail_page_play", seriesObj);

      console.log();
      axios
        .get("https://deikho.com/api/series/list/" + seriesObj.series_id)
        .then(response => {
          // console.log("Seasons data", response);
          if (response.data.status) {
            let seasons = response.data.series.series_by_id[0].seasons;
            //   let seasons = seriesObj.seasons
            //   if(seasons){}
            let firstSeason = seasons.filter(season => season.sequence == 1);
            firstSeason = firstSeason[0];
            let minMaxOfEpisodes = this.$minMaxOfArrayOfObjects(
              firstSeason.episodes,
              "videoid"
            );
            let episode_id = minMaxOfEpisodes.min;
                       this.$fb.track("ViewContent",{
              msisdn: this.$store.getters.currentUser?this.$store.getters.currentUser.msisdn:"N/A",

        video_title: seriesObj.series_name,
        series_id:seriesObj.series_id,
        videoid:episode_id
      });	
            if (!minMaxOfEpisodes)
              this.$store.commit(
                "snackIt",
                "No episodes added in this series's seasons"
              );
            else {
              console.log(
                "network_changed",
                localStorage.getItem("network_changed")
              );
              if (
                localStorage.getItem("network_changed") == true ||
                localStorage.getItem("network_changed") == "true"
              ) {
                console.log("header video ");
                window.location.href = `http://www.deikho.com/watch_video.html?episode_id=${episode_id}&type=series&series_id=${seriesObj.series_id}&season_id=${firstSeason.season_id}&source=${seriesObj.is_free}`;
              } else {
                this.$router.push(
                  `/watch/${episode_id}?type=series&series_id=${seriesObj.series_id}&season_id=${firstSeason.season_id}&source=${seriesObj.is_free}`
                );
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
          this.error=true;
          return err;
        });
    },
    takeMeToWatch1(seriesObj, seasonEp) {
                        this.$fb.track("ViewContent",{
              msisdn: this.$store.getters.currentUser?this.$store.getters.currentUser.msisdn:"N/A",

        video_title: seasonEp.title,
        series_id:seasonEp.series_id,
        videoid:seasonEp.videoid
      });	
      console.log(seasonEp);
        console.log(
                "network_changed",
                localStorage.getItem("network_changed")
              );
         if (
                localStorage.getItem("network_changed") == true ||
                localStorage.getItem("network_changed") == "true"
              ) {
                console.log("header video ");
                window.location.href = `http://www.deikho.com/watch_video.html?episode_id=${seasonEp.videoid}&type=series&series_id=${seriesObj.series_id}&season_id=${seasonEp.season_id}&source=${seriesObj.is_free}`;
              } else {
                this.$router.push(
                  `/watch/${seasonEp.videoid}?type=series&series_id=${seriesObj.series_id}&season_id=${seasonEp.season_id}&source=${seriesObj.is_free}`
                );
              }
//       axios
//         .get("https://deikho.com/api/series/list/" + seriesObj.series_id)
//         .then(response => {
//           // console.log("Seasons data", response);
//           if (response.data.status) {
//             let seasons = response.data.series.series_by_id[0].seasons;
//             //   let seasons = seriesObj.seasons
//             //   if(seasons){}
//             let firstSeason = seasons.filter(season => season.sequence == 1);
//             firstSeason = firstSeason[0];
//             let minMaxOfEpisodes = this.$minMaxOfArrayOfObjects(
//               firstSeason.episodes,
//               "videoid"
//             );
//             let episode_id = minMaxOfEpisodes.min;
// //             if(seasonEp.free_url){
// //   // alert("free");
// //   				localStorage.setItem("fcm", seasonEp.videokey);

// // }
//             if (!minMaxOfEpisodes)
//               this.$store.commit(
//                 "snackIt",
//                 "No episodes added in this series's seasons"
//               );
//             else {
//               console.log(
//                 "network_changed",
//                 localStorage.getItem("network_changed")
//               );
//               if (
//                 localStorage.getItem("network_changed") == true ||
//                 localStorage.getItem("network_changed") == "true"
//               ) {
//                 console.log("header video ");
//                 window.location.href = `http://www.deikho.com/watch_video.html?episode_id=${seasonEp.videoid}&type=series&series_id=${seriesObj.series_id}&season_id=${firstSeason.season_id}&source=${seriesObj.is_free}`;
//               } else {
//                 this.$router.push(
//                   `/watch/${seasonEp.videoid}?type=series&series_id=${seriesObj.series_id}&season_id=${firstSeason.season_id}&source=${seriesObj.is_free}`
//                 );
//               }
//             }
//           }
//         })
//         .catch(err => {
//           console.log(err);
//           this.error=true;

//           return err;
//         });
    },
    setDisplay(episodes) {
      // console.log("aser ase");
      let offset_ = new Date().getTime();
      // console.log("offset", offset_);
      let offset = 1;

      episodes.map((ep, index) => {
        // console.log("ep", ep);
        let start_date = new Date(ep.start_published_date).getTime();

        // console.log("start_date", start_date);
        if (
          index == 0 &&
          ep.title
            .toLowerCase()
            .trim()
            .split(".mp4")["0"] == "trailer"
        ) {
          offset = 0;
        }

        if (
          start_date > offset_ ||
          ep.start_published_date == "0000-00-00 00:00:00"
        ) {
          // console.log("Video cannot be published yet", ep.title);
          ep["is_next"] = true;
          ep["can_play"] = false;
          if (
            ep.title
              .toLowerCase()
              .trim()
              .split(".mp4")["0"] != "trailer"
          ) {
            // console.log("offset",offset);
            ep["episode_number"] = "Episode " + (index + offset);
          }
        }

        // else if (index == 0) {
        //   console.log("trailer can be published ", ep.title);

        //   ep["can_play"] = true;
        //   ep["is_next"] = false;
        // }
        else {
          // console.log("Video can be published ", ep.title);
          ep["can_play"] = true;
          ep["is_next"] = false;
          if (
            ep.title
              .toLowerCase()
              .trim()
              .split(".mp4")["0"] != "trailer"
          ) {
            // console.log("offset",offset);
            ep["episode_number"] = "| Episode " + (index + offset);
          }
        }

        // ep["can_play"] = true;
      });
      return episodes;
    },
    getSeriesData(s) {
      let self=this;
      try {
        this.seDetails = "";
        if (s.series_id && this.sData.type == s.identifier) {
          this.seriesProcessing = true;
          this.$axios.get(`/series/list/?series_id=${s.series_id}`).then(
            response => {
              let coreObj = response.data.series;
              this.seDetails = coreObj.series_by_id[0];
                    self.logData("detail_page",  coreObj.series_by_id[0]);

              this.cast = coreObj.series_by_id[0].cast;
              this.directors = coreObj.series_by_id[0].director;
              this.categories = coreObj.series_by_id[0].categories;
              this.seasons = coreObj.series_by_id[0].seasons;
              if(this.seasons[0].episodes[1].videoid=='1315'){
                this.seasons[0].episodes[1]['thumbs']['original']="https://deikho.com/images/cover/afridi.jpg";
                this.seasons[0].episodes[0]['thumbs']['original']="https://deikho.com/images/cover/mcg.jpg"

              }
else{

              }
              this.selectedSeasonEpisodes = this.setDisplay(
                coreObj.series_by_id[0].seasons[0].episodes
              );
              // console.log(
              //   "selectedSeasonEpisodes",
              //   this.selectedSeasonEpisodes
              // );
              this.selectedSeasonId =
                coreObj.series_by_id[0].seasons[0].season_id;
              this.maturityLevel = this.$getMaturityRightWay(
                coreObj.series_by_id[0].maturity_level
              );
              this.seriesProcessing = false;
              this.getRelatedSeries();
            },
            err => {
              if (!err.response) {
                this.seriesProcessing = false;
                this.$store.commit(
                  "snackIt",
                  "Server isn't responding series details can't be fetched"
                );
              } else {
                this.seriesProcessing = false;
                let errorMsg = err.response.data.errors.error;
                console.log(errorMsg);
                this.$store.commit("snackIt", errorMsg[0]);
              }
            }
          );
        }
      } catch (err) {
        console.log(err);
          this.error=true;

      }
    },
    addToMyList(series) {
      try {
        var seriesObj = {
          series_id: series.series_id
        };
        this.$axios
          .post("/series/addToFavourites", seriesObj)
          .then(response => {
            this.$store.commit(
              "snackIt",
              series.series_name + " added to your list"
            );
          })
          .catch(err => {
            if (!err.response) {
          this.error=true;

              this.$store.commit(
                "snackIt",
                `Server isn't responding ${series.series_name} cannot be added to your list`
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
          this.error=true;

              this.$store.commit("snackIt", errorMsg[0]);
            }
          });
      } catch (err) {
        console.log(err);
          this.error=true;

      }
    },
    removeFromMyList(series) {
      try {
        var seriesObj = {
          series_id: series.series_id
        };
        this.$axios
          .post("/series/removeFavourite", seriesObj)
          .then(response => {
            this.$store.commit(
              "snackIt",
              series.title + " removed from your list"
            );
          })
          .catch(err => {
          this.error=true;

            if (!err.response) {
              this.$store.commit(
                "snackIt",
                `Server isn't responding ${series.title} cannot be removed from your list`
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          });
      } catch (err) {
        console.log(err);
          this.error=true;

      }
    },
    closeSeriesDetailsNative() {
      this.seDetails = "";
      this.closeSeriesDetails();
    },
    shiftTab(tabId, getRelatedSeries) {
      let tabs = ["tab1", "tab4"];

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
      if (getRelatedSeries) this.getRelatedSeries();
    },
    updateSeason(seasonId) {
      let season = this.$findObjectByKey(this.seasons, "season_id", seasonId);
      this.selectedSeasonEpisodes = season.episodes;
      this.selectedSeasonSequence = season.sequence;
      this.selectedSeasonId = season.season_id;
         this.selectedSeasonEpisodes = this.setDisplay(
                this.seDetails.seasons[this.selectedSeasonSequence-1].episodes
              );
    },
    getRelatedSeries() {
      this.seriesProcessing = true;
      this.$axios
        .get(
          `/series/list/?related=1&related_query=${this.seDetails.series_name}&exclude_series=${this.seDetails.series_id}`
        )
        .then(
          response => {
            this.relatedSeries = response.data.series.related_series;

            if (this.relatedSeries.length == 0) {
              //searching for same video catefories
              let seriesCategories = this.seDetails.categories[0].category_id;
              this.$axios
                .get(
                  `/series/list/?categories=${seriesCategories}&exclude_series=${this.seDetails.series_id}`
                )
                .then(
                  response => {
                    this.relatedSeries =
                      response.data.series.category_series[seriesCategories];
                    this.seriesProcessing = false;
                  },
                  err => {
                    if (!err.response) {
                      this.seriesProcessing = false;
                      this.$store.commit(
                        "snackIt",
                        "Server isn't responding related series can't be fetched"
                      );
                    } else {
                      this.seriesProcessing = false;
                      let errorMsg = err.response.data.errors.error;
                      console.log(errorMsg);
                      this.$store.commit("snackIt", errorMsg[0]);
                    }
                  }
                );
            } else {
              this.seriesProcessing = false;
            }
          },
          err => {
            if (!err.response) {
              this.seriesProcessing = false;
              this.$store.commit(
                "snackIt",
                "Server isn't responding related series can't be fetched"
              );
            } else {
              this.seriesProcessing = false;
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          }
        );
    },
    addToMyList(series) {
      try {
        var seriesObj = {
          series_id: series.series_id
        };
        this.$axios
          .post("/series/addToFavourites", seriesObj)
          .then(response => {
            this.$store.commit(
              "snackIt",
              series.series_name + " added to your list"
            );
          })
          .catch(err => {
          this.error=true;

            console.log(err);
            if (!err.response) {
              this.$store.commit(
                "snackIt",
                `Server isn't responding ${series.series_name} cannot be added to your list`
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          });
      } catch (err) {
        console.log(err);
          this.error=true;

      }
    }
  },
  created() {
    this.$root.$on("getSeriesData", this.getSeriesData);
  },
  mounted() {
    // console.log(this.vData)
   let ver = localStorage.getItem("ver");
    console.log("version",ver);
    let curr_ver = '1.0.12';
    if (!ver || ver == undefined || ver != curr_ver) {
      localStorage.clear();
     
      this.$auth.logout();
      localStorage.setItem("ver", curr_ver);
     this.$universalCookie.removeAll();


      // this.$store.commit("setCurrentProfile", false);
      // // console.log("this.$universalCookie",this.$universalCookie);
      // this.$universalCookie.removeAll();
      // this.$universalCookie.remove("currUserProfile");
      // this.$universalCookie.remove("profileTimer");
      console.log("version update");
    }
    console.log(
      "localStorage.getItem(network_changed)",
      localStorage.getItem("network_changed")
    );
    if (
      localStorage.getItem("network_changed") == true ||
      localStorage.getItem("network_changed") == "true"
    ) {
      this.isFreeCheck = true;
    } else {
      this.isFreeCheck = false;
    }
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
  min-width: 40px !important;
  margin: 0 !important;
  padding: 0 !important;
}
.collectionlayout__Categorylist > .innerCategory__Video {
  padding: 0 !important;
}
.center-play-button {
  position: absolute;
  left: 50%;
  top: 45%;
}
.custom-circle {
  height: 70px;
  width: 70px;
  border-radius: 70px;
  font-size: 20px;
}
.title_small {
  text-transform: capitalize !important;
}

.header-all-text {
  position: absolute;
  bottom: 5vw;
  left: 5vw;
  width: 400px;
}
.see-More {
  height: 1px;
  border-top: 1px solid #454545;
  display: flex;
  margin: auto;
  display: flex;
  justify-content: flex-start;
  padding: auto;
}
.mobile-desc {
  display: none;
}
.main-haeder {
  padding: 5vmin 2vmin;
  margin-top: -22vmin;
}
@media screen and (max-width: 1024px) {
  .tabinner_episodes
    .slider_v_epresod
    .slider
    .swiper-container-horizontal
    .slider-v
    .v_epresod
    .v-thumb
    .sliderimg
    .hover
    .v-icon,
  .tabinner_episodes
    .slider_v_trendingnow
    .slider
    .swiper-container-horizontal
    .slider-v
    .v_epresod
    .v-thumb
    .sliderimg
    .hover
    .v-icon,
  .tabinner_trendingnow
    .slider_v_epresod
    .slider
    .swiper-container-horizontal
    .slider-v
    .v_epresod
    .v-thumb
    .sliderimg
    .hover
    .v-icon,
  .tabinner_trendingnow
    .slider_v_trendingnow
    .slider
    .swiper-container-horizontal
    .slider-v
    .v_epresod
    .v-thumb
    .sliderimg
    .hover
    .v-icon {
    font-size: 20px;
  }
  .custom-circle {
    height: 40px;
    width: 40px;
    border-radius: 70px;
    font-size: 20px;
  }
  .main-haeder {
    padding: 15px !important;
    margin-top: 0px;
  }
  .p-20v {
    padding: 15px !important;
  }
  .header-all-text {
    /* bottom:5px; */
  }
  .header-all-text h1 {
    font-size: 1.5rem;
  }

  #app > div.application--wrap > main > div > div > div > div > section {
    margin-top: 75px !important;
  }
}
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
  .tabinner_episodes
    .slider_v_epresod
    .slider
    .swiper-container-horizontal
    .slider-v
    .v_epresod
    .v-thumb
    .sliderimg
    .hover
    .v-icon,
  .tabinner_episodes
    .slider_v_trendingnow
    .slider
    .swiper-container-horizontal
    .slider-v
    .v_epresod
    .v-thumb
    .sliderimg
    .hover
    .v-icon,
  .tabinner_trendingnow
    .slider_v_epresod
    .slider
    .swiper-container-horizontal
    .slider-v
    .v_epresod
    .v-thumb
    .sliderimg
    .hover
    .v-icon,
  .tabinner_trendingnow
    .slider_v_trendingnow
    .slider
    .swiper-container-horizontal
    .slider-v
    .v_epresod
    .v-thumb
    .sliderimg
    .hover
    .v-icon {
    font-size: 45px;
  }
}
.lpt-5 {
  padding: 0 5px;
}

.tabinner_episodes
  .slider_v_epresod
  .slider
  .swiper-container-horizontal
  .slider-v
  .v_epresod
  .v-thumb
  .sliderimg
  .hover
  .v-icon:hover,
.tabinner_episodes
  .slider_v_trendingnow
  .slider
  .swiper-container-horizontal
  .slider-v
  .v_epresod
  .v-thumb
  .sliderimg
  .hover
  .v-icon:hover,
.tabinner_trendingnow
  .slider_v_epresod
  .slider
  .swiper-container-horizontal
  .slider-v
  .v_epresod
  .v-thumb
  .sliderimg
  .hover
  .v-icon:hover,
.tabinner_trendingnow
  .slider_v_trendingnow
  .slider
  .swiper-container-horizontal
  .slider-v
  .v_epresod
  .v-thumb
  .sliderimg
  .hover
  .v-icon:hover {
  color: #facb3c !important;
}
.swiper-slide {
  padding: 0px 5px;
}
.season-next,
.season-prev {
  margin-top: -20px !important;
}
.p-20v {
  padding: 0 20vmin;
}
.vjs-menu-item .vjs-seasons-listing-1 .vjs-submenu-title {
  display: flex;
  align-items: center;
}
@media only screen and (max-width: 767px) {
  .v-hovertabs .active_hover{
    widows: 95%;
  }
  .header-all-text > p {
    display: none;
  }
  .center-play-button {
    left: 45%;
    top: 40%;
  }
  .mobile-desc {
    display: block;
    max-width: 100vw;
    padding: 5vmin;
  }
  .header-all-text {
    bottom: -10px;
  }
  h1 {
    font-size: 1.5em;
  }
  #app > div.application--wrap > main > div > div > div > div > section {
    margin-top: 75px !important;
  }
  .innerCategory__Video {
    margin-top: 75px !important;
  }
}
</style>