<template>
  <v-content>
    <div class="Vidlix_active_layout mt-5 pt-2">
      <div class="rowContainer_layout active">
        <v-flex xs10 class="pt-3 pl-3">
          <div pl-2 class="title">Series results for : {{searchQuery}}</div>
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
                    :key="item.series_id"
                    lg2
                    md4
                    sm4
                    xs6
                    class="item_thumb"
                  >
                    <v-card
                      dark
                      class="block-holder mx-1 my-1 main-load"
                      :ref="`conventional`+index+item.series_id"
                    >
                      <router-link class="sliderimg main-home-custom" to>
                        <v-img
                          :src="`${item.thumb}`"
                          :lazy-src="`${item.thumb}`"
                          aspect-ratio="1"
                          class="grey lighten-2"
                        >
                          <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                          </v-layout>
                        </v-img>
                      </router-link>
                     <div class="hover__detaillist custom-hover">
                          <div class="bob-overview-wrapper">
                            <div class="title mx-2 mt-2">{{item.series_name}}</div>
                            <time class="caption time mx-2" v-if ="item.seasons!=undefined">{{item.seasons.length}}</time>
                            <p class="caption dec mx-2">{{item.series_description}}</p>
                            <div class="row col button-group">
                              <button
                                class="btn btn-daikho-hollow"
                                @click="takeMeToWatch(item)"
                              >
                                <router-link
                                  :to="`/watch/${item.series_id}`"
                                  style="display:inherit;height:auto !important;"
                                >
                                  <v-icon>play_arrow</v-icon>&nbsp;Play Now
                                </router-link>
                              </button>
                              <button class="btn btn-hollow btn-hollow-white">
                                <router-link
                                  :to="`/tvCollections/details/${item.series_id}`"
                                  style="display:inherit;height:auto !important"
                                >Details</router-link>
                              </button>
                            </div>
                          </div>

                          <!-- <div class="click_detail" v-on:click="getMeVideo(item.series_id,index)">
                            <v-icon dark>expand_more</v-icon>
                          </div> -->
                        </div>
                      <span :ref="`conventional`+index+item.series_id+'Arrow'"></span>
                    </v-card>
                  </v-flex>
                </v-layout>
                <seriesDetails
                  v-show="false"
                  :ref="`conventional`+index"
                  :sData="{'type':`conventional`+index}"
                  :closeSeriesDetails="closeSeriesDetails"
                  :withCloseBtn="true"
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
import seriesDetails from "~/components/default/base/seriesDetails";
import circleLoader from "~/components/default/circleLoader";
export default {
  name: "movies",
  middleware: ["auth", "subscription_needed"],
  props: ["searchQuery"],
  components: {
    seriesDetails,
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
    takeMeToWatch(seriesObj) {
      let seasons = seriesObj.seasons;
      let firstSeason = seasons.filter(season => season.sequence == 1);
      firstSeason = firstSeason[0];
      let minMaxOfEpisodes = this.$minMaxOfArrayOfObjects(
        firstSeason.episodes,
        "videoid"
      );
      let episode_id = minMaxOfEpisodes.min;
      if (!minMaxOfEpisodes)
        this.$store.commit(
          "snackIt",
          "No episodes added in this series's seasons"
        );
      else
        this.$router.push(
          `/watch/${episode_id}?type=series&series_id=${seriesObj.series_id}&season_id=${firstSeason.season_id}`
        );
    },
    getMeSeries(series_id, identifier) {
      this.markNewThumb(series_id, identifier);
      this.closePrevSeriesDetails(identifier);
      this.rowIdentifier = identifier;
      this.$root.$emit("getSeriesData", {
        series_id: series_id,
        identifier: identifier
      });
      var el =
        this.$refs[identifier][0] === undefined
          ? this.$refs[identifier].$el
          : this.$refs[identifier][0].$el;
      el.removeAttribute("style");
    },
    markNewThumb(series_id, identifier) {
      this.unmarkPrevThumb(series_id);
      let id = identifier + series_id;
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
    unmarkPrevThumb(series_id = null) {
      if (!this.prevSeries) {
        this.prevSeries = series_id;
      } else {
        let prevSeriesTempId = this.prevIdentifier + this.prevSeries;
        var elem =
          this.$refs[prevSeriesTempId][0].$el === undefined
            ? this.$refs[prevSeriesTempId].$el
            : this.$refs[prevSeriesTempId][0].$el;
        elem.classList.remove("border_selected");
        this.prevSeries = series_id;
      }
    },
    closeSeriesDetails() {
      let identifier = this.rowIdentifier;
      var el =
        this.$refs[identifier][0] === undefined
          ? this.$refs[identifier].$el
          : this.$refs[identifier][0].$el;
      el.style.display = "none";
      this.unmarkPrevThumb();
    },
    closePrevSeriesDetails(identifier) {
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
    addToMyList(series) {
      // console.log(series);
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
      }
    },
    async setPageData() {
      try {
        this.dataLoading = true;
        this.$axios
          .get(
            `/series/list/?related=true&related_query=${this.searchQuery}&limit=30`
          )
          .then(
            response => {
              this.dataLoading = false;
              let baseObj = response.data.series;
              let dataArray = baseObj.related_series;
              this.dataArray = dataArray;
              let finalArray = [];
              let count = this.dataArray.length;
              var itemsPerRow = 6;
              let iteration = Math.ceil(count / itemsPerRow);
              let lower = 0;
              let upper = itemsPerRow;
              for (let i = 0; i < iteration; i++) {
                finalArray.push(this.dataArray.slice(lower, upper));
                upper = upper + itemsPerRow;
                lower = lower + itemsPerRow;
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

.btn-daikho {
  padding: 0 30px;
  color: white;
  height: 50px;
  background: #ffc511 !important;
  border-radius: 5px;
}
.lrp-0{
  padding-left:0px;
  padding-right:0px;
}
.bob-overview-wrapper,.button-group button{
  width:100% !important;
}
.hover__detaillist .button-group {
    padding: 0px 30px;
    margin:0px;
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
.featured-content-custom {
  padding: 5vmin 20vmin;
}
.innerCategory__Video {
  padding: 0 20vmin;
  border-bottom: 0px !important;
}

.p10-v{
  padding:10vmin
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
.btn-hollow-white {
  padding: 0 30px;
  color: white;
  height: 50px;
  background: none !important;
  border: 1px solid white;
  border-radius: 5px;
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