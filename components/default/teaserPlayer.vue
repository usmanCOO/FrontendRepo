<template>
  <div class="Player vidlixPlayer">
    <video
      preload="none"
      id="slider-player"
      class="video-js vjs-default-skin vidlixPlayer_skin my-custom-class slider-video"
      autoplay
      :muted="isMuted"
      
    >
      <source :src="videoDetails.vidUrl" :type="videoDetails.playbackFormat" />
     
    </video>
    <template v-if="dataLoading">
      <circleLoader />
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import circleLoader from "~/components/default/circleLoader";
export default {
  name: "player",
    props: ["seriesDetails","isMuted","isPlay"],
watch: {
    isPlay(newValue) {
        console.log('yolo',newValue);
        console.log("as", document.getElementById('slider-player_html5_api'));
        if(newValue){
          document.getElementById('slider-player_html5_api').play();
        }else{
          document.getElementById('slider-player_html5_api').pause();

        }
    }},
  data() {
    return {
      dataLoading: true,
      vidUrl: null,
      playerData: {
        season_number: false,
        episode_number: false
      },
      playbackFormat: "application/x-mpegurl",
      videoDetails: {
       vidUrl:  this.seriesDetails.series_id!=0? this.seriesDetails.seasons[0].episodes[0].files[0]:this.seriesDetails.files[0],
              playbackFormat: "application/x-mpegurl",
        
        // vidUrl:  "https://deikho.com/files/videos/2019/12/18/1576649226342cwpei9inxfm5/1576649226342cwpei9inxfm5.m3u8",
        // playbackFormat: "application/x-mpegurl",
        poster: null,
        captions: []
      },
    // seriesDetails: this.seriesDetails
     };
  },
  // props: ["getMeVideoData"],

  components: {
    circleLoader
  },
  methods: {
    /**
     *
     * @method  : processSeries(series) this method is used to process series data for player
     * @params  : series [] Array
     * @author  : <fahad.dev@iu.com.pk> <Fahad Abbas>
     * @since   : 14th jan/2019
     * @returns : series [] formatted array for player
     * @throws  : Exception None
     */
    processSeries(series) {
      //console.log(series);
      let newSeasons = []; //temporary seasons array
      try {
        if (typeof series !== "undefined") {
          //processing seasons inside series
          this.playerData.title = series.series_name;
          if (series.seasons&& series.seasons.length > 0) {
            // for (let i = 0; i < series.seasons.length; i++) 
            {let i=0;
              //temporary season
              const season = series.seasons[i];
              let newEpisodes = []; //temporary episodes array
              //checking if url has no season id, considering it seasone one
              if (typeof this.$route.query.season_id == "undefined" && i == 0) {
                season.selected = true;
                //checking if url season id is equal to iteration season to get selected true
              } else if (this.$route.query.season_id == season.season_id) {
                season.selected = true;
                var season_number = i + 1;
                this.playerData.season_number = "S" + season_number;
                //everything else is false
              } else {
                season.selected = false;
              }
              //processing episodes inside every season
              if (season.episodes.length > 0) {
                // for (let i = 0; i < season.episodes.length; i++)
                 {
                   let i=0;
                  let episode = season.episodes[i]; //temporary episode
                  //checking if url has no episode id, considering it episode one
                  if (typeof this.$route.params.id == "undefined" && i == 0) {
                    episode.selected = true;
                    //checking if url episode id is equal to iteration episode to get selected true
                  } else if (this.$route.params.id == episode.videoid) {
                    episode.selected = true;
                    var episode_number = i + 1;
                    this.playerData.episode_number = "E" + episode_number;
                    //everything else is false sd
                  } else {
                    episode.selected = false;
                  }

                  // //formatting some attributes for player
                  // episode.thumb = episode.thumbs.original;
                  // episode.id = episode.videoid;
                  // episode.link =
                  //   "/watch/" +
                  //   episode.videoid +
                  //   "?type=series&series_id=" +
                  //   series.series_id +
                  //   "&season_id=" +
                  //   season.season_id;

                  //now picking up the next video for player
                  if (episode.selected == true) {
                    //updating video details
                    // if (episode.file_type == 0) {
                    //   this.videoDetails.playbackFormat = "video/mp4";
                    // } else if (episode.file_type == 1) {
                    //   this.videoDetails.playbackFormat = "";
                    // } else if (episode.file_type == 2) {
                    //   this.videoDetails.playbackFormat =
                    //     "application/x-mpegurl";
                    // }

                    // assign videourl to player
                    // this.videoDetails.vidUrl = episode.files[0];
                    this.playerData.episode_name = episode.title;
                    this.videoDetails.poster = episode.thumbs.original;
                    this.videoDetails.sprite_count = episode.sprite_count;
                    this.videoDetails.interval = episode.interval;
                    this.videoDetails.sprite = episode.sprite;
                    //console.log(this.playerData);
                    // this.processSprites();

                    // let nextEpisodeIteration = i + 1;
                    // if (
                    //   typeof season.episodes[nextEpisodeIteration] !==
                    //   "undefined"
                    // ) {
                    //   var nextEpisode = season.episodes[nextEpisodeIteration];
                    // } else if (
                    //   typeof series.seasons[nextEpisodeIteration] !==
                    //   "undefined"
                    // ) {
                    //   var nextEpisode =
                    //     series.seasons[nextEpisodeIteration].episodes[0];
                    // }
                    // //assign next video data to player
                    // if (typeof nextEpisode !== "undefined") {
                    //   this.playerData.next = {
                    //     name: nextEpisode.title,
                    //     link:
                    //       "/watch/" +
                    //       nextEpisode.videoid +
                    //       "?type=series&series_id=" +
                    //       series.series_id +
                    //       "&season_id=" +
                    //       season.season_id,
                    //     image: nextEpisode.thumbs.original,
                    //     title: nextEpisode.title,
                    //     description: nextEpisode.description
                    //   };
                    // }
                  }
                  //finally appending episodes into seasons one by one
                  // newEpisodes.push(episode);
                }
                // season.episodes = newEpisodes;
              } else {
                throw new Error("No episodes found for the seasons");
              }
              //finally appending season into series one by one
              // newSeasons.push(season);
            }
            //overwriting season over series after processing
            // series.seasons = newSeasons;
            // console.log(series);
            // this.playerData.series = {
            //   name: "Series",
            //   seasons: series.seasons
            // };
          } else {
            // throw new Error("No seasons found for the series");
          }
        } else {
          // throw new Error("No series Object found");
        }
      } catch (err) {
        this.$store.commit("snackIt", err.toString());
      }
    },
    /**
     *
     * @method  : getVideoDetails(series) this method is used get video details for player
     * @params  : video [] Array
     * @author  : <fahad.dev@iu.com.pk> <Fahad Abbas>
     * @since   : 14th jan/2019
     * @returns : video [] video data for player
     * @throws  : Exception if video details not found
     */
  
    /**
     *
     * @method  : getSeriesDetails() this method is used get series details for player from api
     * @params  : Null
     * @author  : <fahad.dev@iu.com.pk> <Fahad Abbas>
     * @since   : 14th jan/2019
     * @returns : Null
     * @throws  : Exception if series details not found
     */
    getSeriesDetails() {
        if (this.seriesDetails) {
                // processing series data, and assigning player data for player instance
                // will do all the stuff annd append all the data to player
               return( this.processSeries(this.seriesDetails));
              } else {
                throw new Error("Series Details not Found");
              }
   
    },

    
    /**
     *
     * @method  : computePlayerControls() this method is used to attach vue events to player controls
     * @params  : Null
     * @author  : <fahad.dev@iu.com.pk> <Fahad Abbas>
     * @since   : 14th jan/2019
     * @returns : Null
     * @throws  : Nulll
     */
    computePlayerControls() {
      // next video Event attach to next button
      let nextWindow = "";
      setTimeout(e => {
        nextWindow = this.$el.querySelector(".vjs-next-menu, .vjs-next-button");
        if (nextWindow !== null) {
          nextWindow.addEventListener("click", e => {
            //console.log(this.playerData.next.link);
            if (typeof this.playerData.next.link !== "undefined") {
              this.$router.push(this.playerData.next.link);
            }
          });
        }
      }, 1000);

      // next video Event attach to next button
   if(this.$el.querySelector(".vjs-video-title")){
     
        backBrowse = this.$el.querySelector(".vjs-video-title");
        backBrowse.remove();}
      let backBrowse = "";
      setTimeout(e => {
        backBrowse = this.$el.querySelector(".vjs-video-title");
        backBrowse.remove();
        
this.$el.querySelector(".vjs-button-icon").remove();
        if (backBrowse !== null) {
          backBrowse.addEventListener("click", e => {
            this.$router.push({ path: "/" });
          });
        }
      }, 1000);

      // binding click events on episode select events
      let EpisodeLists = "";
      setTimeout(e => {
        EpisodeLists = this.$el.getElementsByClassName("vjs-series-video");
        // console.log(EpisodeLists);
        if (typeof EpisodeLists !== "undefined" && EpisodeLists.length > 0) {
          for (let i = 0; i < EpisodeLists.length; i++) {
            const element = EpisodeLists[i];
            if (typeof element !== "undefined") {
              if (element.getAttribute("data-id") !== 1) {
                if (typeof element.getAttribute("data-link") != "object") {
                  var clickElement =
                    element.children[1].children[0].children[0];
                  clickElement.addEventListener("click", e => {
                    this.$router.push(element.getAttribute("data-link"));
                  });
                }
              }
            }
          }
        }
      }, 1000);
    },
    /**
     *
     * @method  : initPlayer() this method is used to initialize hola player
     * @params  : Null
     * @author  : <fahad.dev@iu.com.pk> <Fahad Abbas>
     * @since   : 14th jan/2019
     * @returns : Null
     * @throws  : Nulll
     */
    async initPlayer() {
      //checking for series details
      // if (this.$route.query.type == "series")
       {
        await this.getSeriesDetails();
        this.dataLoading = false;
      } 
      //initilizing player
      this.playerData.custom = {
        episode_name: "",
        season_number: "",
        episode_number: ""
      };
      this.playerData.hotkeys = {
        volumeStep: 0.1,
        seekStep: 5,
        enableSeek:true,
        enableMute: true,
        enableFullscreen: true,
        enableNumbers: true,
        enableVolumeScroll: true,
        alwaysCaptureHotkeys: true
      };

      var player = window.hola_player(this.playerData);
      // This after math player code is written just to write functionality of player under vue scope

      // setting global variable Vue so it can be accessible if the context is changed
      var Vue = this;
      if (
        typeof this.playerData.next != "undefined" &&
        typeof this.playerData.next != null
      ) {
        player.vjs.on("ended", function() {
          Vue.$router.push(Vue.playerData.next.link);
          console.log("ended, play next");
          
        });
      }

      this.computePlayerControls();
    }
  },
  computed: {
    ...mapGetters(["configs"])
  },
  beforeMount: function() {
     if (process.browser) 
    {
      this.initPlayer();
    }
  },
  mounted(){
   // console.log("data rec",this.seriesDetails)
  }
};
</script>
<style scoped>
.vjs5-hola-skin .hola-circle-icon {
  display: block;
  width: 1em;
  height: 1em;
  box-sizing: border-box;
  border-radius: 50%;
  border-style: solid;
  border-width: 0.3em;
  border-color: #fff;
  background: #ffc511 !important;
}

.vjs5-hola-skin .vjs-big-play-button:hover .vjs-button-icon {
  fill: none !important;
  background: #facd47 !important;
}

.vjs5-hola-skin .vjs-progress-control .vjs-play-progress:before,
.vjs5-hola-skin .vjs-progress-control .vjs-mouse-display:before {
  content: none;
  display: block;
  width: 1em;
  height: 1em;
  box-sizing: border-box;
  border-radius: 50%;
  border-style: solid;
  border-width: 0.3em;
  border-color: #fff;
  background: #facb3c !important;
  font-size: 1.6em;
}

.vjs5-hola-skin .vjs-progress-control .vjs-play-progress {
  background: #ffc511 !important;
}

.vjs5-hola-skin .vjs-volume-bar.vjs-slider-horizontal .vjs-volume-level:before,
.vjs5-hola-skin .vjs-volume-bar .vjs-volume-display:before {
  display: block;
  width: 1em;
  height: 1em;
  box-sizing: border-box;
  border-radius: 50%;
  border-style: solid;
  border-width: 0.3em;
  border-color: #fff;
  background: #ffc511 !important;
  background-color: #fff;
  top: -0.4em;
  font-size: 1.2em;
  z-index: 2;
}
.video-js .vjs-load-progress {
  background: #cacaca !important;
}

.vidlixPlayer
  > .my-custom-class
  > video
  .vjs-tech
  > div.vjs-control-bar
  > div.vjs-progress-control.vjs-control
  > div.vjs-progress-holder.vjs-slider.vjs-slider-horizontal
  > div.vjs-play-progress.vjs-slider-bar {
  content: none;
  display: block;
  width: 1em;
  height: 1em;
  box-sizing: border-box;
  border-radius: 50%;
  border-style: solid;
  border-width: 0.3em;
  border-color: #fff;
  background: #facb3c !important;
  font-size: 1.6em;
}
.vjs-menu-item .vjs-seasons-listing-1 .vjs-submenu-title {
  display: inline-flex !important;
  align-items: center;
}
.vjs-menu-content {
  display: none !important;
}
.video-title-text {
  opacity: 1 !important;
}
.back-browse {
  display: none !important;
}
#hola_player_3549_3 > div.vjs-menu.vjs-rightclick-popup > ul,
.vjs-menu .vjs-rightclick-popup {
  left: -40vw !important;
  display: none !important;
}
.vjs-seasons-menu{
  right:10% !important;
}
.vjs-top-bar, .vjs-backward-button .vjs-control .vjs-button ,.vjs-forward-button .vjs-control .vjs-button  , .vjs-settings-button {
  display:none!important;
}
div[aria-label="video player"]{  
    width: 78vw !important;
    height: 80.5vh !important;
    height:-webkit-fill-available !important;
    position:absolute ;
}
.Player .vidlixPlayer  .slider-video{
  display:flex;
  justify-content:center;
}
.vidlixPlayer  {
  display:flex;
  justify-content:center;
}
.vjs-button-icon{
  display:none;
}
.vjs-play-control .vjs-control .vjs-button .vjs-paused .vjs-play-control-replay,.vjs-progress-control .vjs-control,.vjs-backward-button , .vjs-forward-button ,.vjs-fullscreen-icon{
  display: none !important;
}

@media only screen and (max-width: 767px) {
  div[aria-label="video player"]{  
    width: 100vw !important;
    /* height: 87vh !important; */
    height:-webkit-fill-available !important;
    position:absolute ;
}
}

</style>