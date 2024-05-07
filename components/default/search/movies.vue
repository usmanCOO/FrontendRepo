<template>
  <v-content>
    <div class="Vidlix_active_layout mt-5 pt-2">
      <div class="rowContainer_layout active">
        <v-flex xs10 class="pt-3 pl-3">
          <div pl-2 class="title">Movies results for : {{searchQuery}}</div>
        </v-flex>
        <template v-if="searchItems">
          <template v-for="(items, index) in searchItems">
            <template v-if="items && items.length > 0">
              <div
                v-if="searchItems && searchItems.length > 0"
                class="rowContainer_title_card"
                id="row-1"
              >
                <v-layout row wrap my-2 mx-0 py-3 class="main-slide-box">
                  <v-flex
                    v-for="item in items"
                    :key="item.videoid"
                    lg2
                    md4
                    sm4
                    xs6
                    class="item_thumb"
                  >
                    <v-hover>
                      <v-card
                        slot-scope="{ hover }"
                        dark
                        class="block-holder mx-1 my-1 main-load"
                        :ref="`conventional`+index+item.videoid"
                      >
                        <router-link class="sliderimg" to>
                          <v-img
                            :src="hover ? item.gif != null ? item.gif : item.thumbs.original : item.thumbs.original"
                            :lazy-src="`${item.thumbs.original}`"
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
                        </router-link>
                        <div class="hover__detaillist">
                          <router-link :to="`/watch/${item.videoid}`">
                            <div class="bob-overview-wrapper">
                              <div class="title mx-2 mt-2">{{item.title}}</div>
                              <time class="caption time mx-2">{{item.duration}}</time>
                              <p class="caption dec mx-2">{{item.description}}</p>
                            </div>
                          </router-link>
                          <!-- <div class="btn__show align-center column justify-start fill-height">
                            <v-btn fab small @click="likeVideo(item)">
                              <v-icon dark>favorite</v-icon>
                            </v-btn>
                            <v-btn fab small @click="addToMyList(item)">
                              <v-icon dark>add</v-icon>
                            </v-btn>
                          </div>-->
                          <div
                            class="click_detail"
                            v-on:click="getMeVideo(item.videoid,`conventional`+index)"
                          >
                            <v-icon dark>expand_more</v-icon>
                          </div>
                        </div>
                        <span :ref="`conventional`+index+item.videoid+'Arrow'"></span>
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-layout>
                <videoDetails
                  v-show="false"
                  :ref="`conventional`+index"
                  :vData="{'type':`conventional`+index}"
                  :closeVideoDetails="closeVideoDetails"
                />
              </div>
            </template>
          </template>
        </template>
      </div>
    </div>
  </v-content>
</template>
<script>
import videoDetails from "~/components/default/base/videoDetails";
import circleLoader from "~/components/default/circleLoader";
export default {
  name: "movies",
  middleware: ["auth", "subscription_needed"],
  props: ["searchQuery"],
  components: {
    videoDetails,
    circleLoader
  },
  data() {
    return {
      searchItems: [],
      prevVid: "",
      prevIdentifier: "",
      rowIdentifier: "",
      dataLoading: true,
      dataArray: []
    };
  },
  methods: {
    // this method will be fired when show details button will be clicked
    getMeVideo(videoid, identifier) {
      this.markNewThumb(videoid, identifier);
      this.closePrevVideoDetails(identifier);
      this.rowIdentifier = identifier;
      this.$root.$emit("getVideoData", {
        videoid: videoid,
        identifier: identifier
      });
      var el =
        this.$refs[identifier][0] === undefined
          ? this.$refs[identifier].$el
          : this.$refs[identifier][0].$el;
      el.removeAttribute("style");
    },
    markNewThumb(videoid, identifier) {
      this.unmarkPrevThumb(videoid);
      let id = identifier + videoid;
      let elArrowId = id + "Arrow";

      var el =
        this.$refs[id][0].$el === undefined
          ? this.$refs[id].$el
          : this.$refs[id][0].$el;
      var elArrow =
        this.$refs[elArrowId][0] === undefined
          ? this.$refs[elArrowId]
          : this.$refs[elArrowId][0];

      el.classList.add("border_selected");
      elArrow.classList.add("arroow");
    },
    unmarkPrevThumb(videoid = null) {
      if (!this.prevVid) {
        this.prevVid = videoid;
      } else {
        let prevVideoTempId = this.prevIdentifier + this.prevVid;
        var elem =
          this.$refs[prevVideoTempId][0].$el === undefined
            ? this.$refs[prevVideoTempId].$el
            : this.$refs[prevVideoTempId][0].$el;
        elem.classList.remove("border_selected");
        this.prevVid = videoid;
      }
    },
    // this method will be fired when close button will be clicked
    closeVideoDetails() {
      let identifier = this.rowIdentifier;
      var el =
        this.$refs[identifier][0] === undefined
          ? this.$refs[identifier].$el
          : this.$refs[identifier][0].$el;
      el.style.display = "none";
      this.unmarkPrevThumb();
    },
    // this method will be fired when new video will be open for details
    closePrevVideoDetails(identifier) {
      if (!this.prevIdentifier || this.prevIdentifier != identifier) {
        if (this.prevIdentifier) {
          let prevDetailsTempId = this.prevIdentifier;
          var el =
            this.$refs[prevDetailsTempId][0] === undefined
              ? this.$refs[prevDetailsTempId].$el
              : this.$refs[prevDetailsTempId][0].$el;
          el.style.display = "none";
        }
        this.prevIdentifier = identifier;
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
    async setPageData() {
      try {
        this.dataLoading = true;
        this.$axios
          .get(
            `/videos/list/?related=true&related_query=${this.searchQuery}&maturity_level=${this.$store.getters.currentProfile.maturity_level}&limit=30`
          )
          .then(
            response => {
              this.dataLoading = false;
              let baseObj = response.data.videos;
              let dataArray = baseObj.related_videos;
              this.dataArray = dataArray;
              let finalArray = [];
              let count = this.dataArray.length;
              var videosPerRow = 6;
              let iteration = Math.ceil(count / videosPerRow);
              let lower = 0;
              let upper = videosPerRow;
              for (let i = 0; i < iteration; i++) {
                finalArray.push(this.dataArray.slice(lower, upper));
                upper = upper + videosPerRow;
                lower = lower + videosPerRow;
              }
              this.searchItems = finalArray;
            },
            err => {
              this.dataLoading = false;
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
    }
  },
  watch: {
    searchQuery: function(next, old) {
      this.setPageData();
    }
  },
  beforeMount() {
    this.setPageData();
  },
  mounted() {}
};
</script>
<style scoped>
.featured-content-custom {
  padding: 5vmin 20vmin;
}
.innerCategory__Video {
  padding: 5vmin 15vmin;
  border-bottom: 3px solid #ffc511;
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
.rowContainer_layout .rowContainer_title_card .item_thumb .block-holder:hover,
.rowContainer_layout .rowContainer_title_card .item_thumb:first-child:hover {
  transform: translate3d(0px, 0px, 0px) !important;
  transform: none !important;
}
.image-sec {
  padding: 50px 0px;
}
.image-sec > img {
  width: 40vw;
  height: auto;
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

@media screen and (max-width: 1024px) {
  .main-load {
    padding: 0;
  }
  .main-load > .hover__detaillist {
    margin-right: 0px;
  }
  .swiper-slider-prev,
  .swiper-slider-next {
    display: none;
  }
}
</style>