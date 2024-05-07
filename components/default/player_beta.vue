<template>
 
  <div class="Player vidlixPlayer">
     <modal name="hello-world" 
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
  <a href="http://www.deikho.com/sign_up.html">
  <button 
                                    class="btn btn-daikho btn-round"
>
Subscribe Now  </button></a>
  <div style="color:#FFC511;margin-top:15px;">
 <a href="https://play.google.com/store/apps/details?id=com.jazz.pakistani.drama.videos.deikho&hl=en"> <p style="cursor:pointer" >
    Download App
  </p>
</a>
</div>
  </div>

</div>
</modal>
    <video
      v-if="videoDetails.poster"
      preload="none"
      class="video-js vjs-default-skin vidlixPlayer_skin my-custom-class"
      autoplay
      controls
      :poster="videoDetails.poster"
    >
      <source v-if="isFree!='1'" :src="chargingFileURL" :type="videoDetails.playbackFormat" />
      <source v-if="isFree=='1'" :src="chargingFileURL" :type="this.playbackFormat" />

      <track
        v-if="videoDetails.captions"
        v-for="crtTrack in videoDetails.captions"
        :kind="crtTrack.kind"
        :label="crtTrack.label"
        :src="crtTrack.src"
        :srcLang="crtTrack.srcLang"
        :default="crtTrack.default"
      />
    </video>
    <img
      src="~/assets/images/white_logo_non.png"
      class
      width="128"
      style="z-index: 1;position: absolute;top: 10px;right: 1%;opacity: 0.35;"
    />
    <img src="~/assets/images/white_logo_non.png" class width="128" />

    <template v-if="dataLoading">
      <circleLoader />
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import circleLoader from "~/components/default/circleLoader";
import axios from "axios";

export default {
  name: "player",
  data() {
    return {
      dataLoading: true,
      hasTrailer: false,
      alternatFile: {
        1201: "https://ncdn.deikho.com/files/videos/2020/02/12/1581497545456e0jl0o71i7o9/1581497545456e0jl0o71i7o9.m3u8",
        1315: "https://ncdn.deikho.com/files/videos/2020/02/12/1581497779860sw5pbbr33va8/1581497779860sw5pbbr33va8.m3u8",
        1234: "https://ncdn.deikho.com/files/videos/2020/02/12/1581450705649eh4wzhorea99/1581450705649eh4wzhorea99.m3u8",
        1320: "https://ncdn.deikho.com/files/videos/2020/02/12/15814517844660lwirzewl9p97/15814517844660lwirzewl9p97.m3u8",
        1207: "https://ncdn.deikho.com/files/videos/2020/02/12/1581465765934onkoz9ir22l2/1581465765934onkoz9ir22l2.m3u8",
        1208: "https://ncdn.deikho.com/files/videos/2020/02/12/1581450659539ppto8o9oeqj1/1581450659539ppto8o9oeqj1.m3u8",
        1223: "https://ncdn.deikho.com/files/videos/2020/02/12/1581490171805lw9nn0a3u1c3/1581490171805lw9nn0a3u1c3.m3u8",
        1225: "https://ncdn.deikho.com/files/videos/2020/02/12/1581495183922bqef0jw2p5k1/1581495183922bqef0jw2p5k1.m3u8",
        1224: "https://ncdn.deikho.com/files/videos/2020/02/12/1581495402660c35h5cy43vm5/1581495402660c35h5cy43vm5.m3u8",
        1228: "https://ncdn.deikho.com/files/videos/2020/02/12/1581460357452yav78ni9pjm3/1581460357452yav78ni9pjm3.m3u8",
        1316: "https://ncdn.deikho.com/files/videos/2019/12/28/1577528309614g4mm44b7oyi2/1577528309614g4mm44b7oyi2.m3u8",
        1043: "https://ncdn.deikho.com/files/videos/2019/10/29/1572298928686ia0hr1m1zi9/1572298928686ia0hr1m1zi9.m3u8",
        1044: "https://ncdn.deikho.com/files/videos/2019/10/29/1572296681570metisq7h8w8/1572296681570metisq7h8w8.m3u8",
        1045: "https://ncdn.deikho.com/files/videos/2019/10/29/1572302015021mzxespt9xxm2/1572302015021mzxespt9xxm2.m3u8",
        1046: "https://ncdn.deikho.com/files/videos/2019/10/29/1572302017994aqx1lkmf7v8/1572302017994aqx1lkmf7v8.m3u8",
        1024: "https://ncdn.deikho.com/files/videos/2019/10/26/1572113076559ex34ioxeki710/1572113076559ex34ioxeki710.m3u8",
        1025: "https://ncdn.deikho.com/files/videos/2019/10/26/1572113076561pztesjpvwji8/1572113076561pztesjpvwji8.m3u8",
        1026: "https://ncdn.deikho.com/files/videos/2019/10/27/1572113076563smgmhrdcfb10/1572113076563smgmhrdcfb10.m3u8",
        1027: "https://ncdn.deikho.com/files/videos/2019/10/27/15721130765610c9y893g1snj9/15721130765610c9y893g1snj9.m3u8",
        1028: "https://ncdn.deikho.com/files/videos/2019/10/27/15721130765643a3w2qdbn4710/15721130765643a3w2qdbn4710.m3u8",
        1029: "https://ncdn.deikho.com/files/videos/2019/10/27/157211307656222l87ytgvwl10/157211307656222l87ytgvwl10.m3u8",
        1030: "https://ncdn.deikho.com/files/videos/2019/10/27/1572113076565uq1g29vl1e85/1572113076565uq1g29vl1e85.m3u8",
        1096: "https://ncdn.deikho.com/files/videos/2019/12/18/15766625240304wdccvekm255/15766625240304wdccvekm255.m3u8",
        1099: "https://ncdn.deikho.com/files/videos/2019/12/18/157666252403146u2nd620rj10/157666252403146u2nd620rj10.m3u8",
        1100: "https://ncdn.deikho.com/files/videos/2019/12/18/1576662524032zem9zeh9zr6/1576662524032zem9zeh9zr6.m3u8",
        1101: "https://ncdn.deikho.com/files/videos/2019/12/18/15766625240329vjlf8i0ho8/15766625240329vjlf8i0ho8.m3u8",
        1103: "https://ncdn.deikho.com/files/videos/2019/12/18/1576662524033xt8elxo1yd87/1576662524033xt8elxo1yd87.m3u8",
        1104: "https://ncdn.deikho.com/files/videos/2019/12/18/1576662524033rjuv13zfq63/1576662524033rjuv13zfq63.m3u8",
        1105: "https://ncdn.deikho.com/files/videos/2019/12/18/1576662524035p0ej37e9jjh9/1576662524035p0ej37e9jjh9.m3u8",
        1106: "https://ncdn.deikho.com/files/videos/2019/12/18/1576662524035p0ej37e9jjh9/1576662524035p0ej37e9jjh9.m3u8",
        1109: "https://ncdn.deikho.com/files/videos/2019/12/18/1576662524035ooqw9cqwbmb9/1576662524035ooqw9cqwbmb9.m3u8",
        1112: "https://ncdn.deikho.com/files/videos/2019/12/18/157666254006336g51chu8yg1/157666254006336g51chu8yg1.m3u8",
        1115: "https://ncdn.deikho.com/files/videos/2019/12/18/1576662540064z0woeono8fe5/1576662540064z0woeono8fe5.m3u8",
        1116: "https://ncdn.deikho.com/files/videos/2019/12/18/1576662540066vqfgaq38s6e4/1576662540066vqfgaq38s6e4.m3u8",
        1117: "https://ncdn.deikho.com/files/videos/2019/12/18/1576662540065de50ukscrh89/1576662540065de50ukscrh89.m3u8",
        1119: "https://ncdn.deikho.com/files/videos/2019/12/18/15766625400666rx2mn13o88/15766625400666rx2mn13o88.m3u8",
        1252: "https://ncdn.deikho.com/files/videos/2019/12/18/1576649226342cwpei9inxfm5/1576649226342cwpei9inxfm5.m3u8",
        1253: "https://ncdn.deikho.com/files/videos/2019/12/18/1576649226343klwac3nf98r7/1576649226343klwac3nf98r7.m3u8",
        1254: "https://ncdn.deikho.com/files/videos/2019/12/18/1576649226344pa8cuf0kx56/1576649226344pa8cuf0kx56.m3u8",
        1255: "https://ncdn.deikho.com/files/videos/2019/12/18/1576649226345p309kznh2bb2/1576649226345p309kznh2bb2.m3u8",
        1256: "https://ncdn.deikho.com/files/videos/2020/01/19/1579383124913xzaxjup1wcn2/1579383124913xzaxjup1wcn2.m3u8",
        1257: "https://ncdn.deikho.com/files/videos/2019/12/18/1576649226347co1wu1azunv3/1576649226347co1wu1azunv3.m3u8",
        1258: "https://ncdn.deikho.com/files/videos/2019/12/18/1576649226347ykblba43w6r10/1576649226347ykblba43w6r10.m3u8",
        1073: "https://ncdn.deikho.com/files/videos/2019/12/16/1576506620815tvgilg2d7r8/1576506620815tvgilg2d7r8.m3u8",
        1074: "https://ncdn.deikho.com/files/videos/2019/12/16/1576506620816g9qm50higj82/1576506620816g9qm50higj82.m3u8",
        1075: "https://ncdn.deikho.com/files/videos/2019/12/16/1576506620817l0nxz3jiij3/1576506620817l0nxz3jiij3.m3u8",
        1077: "https://ncdn.deikho.com/files/videos/2019/12/16/157650662081817rjcimsbxx5/157650662081817rjcimsbxx5.m3u8",
        1080: "https://ncdn.deikho.com/files/videos/2019/12/16/15765066208211pz7mjz59497/15765066208211pz7mjz59497.m3u8",
        1083: "https://ncdn.deikho.com/files/videos/2019/12/16/1576506620821wgkje0reltm7/1576506620821wgkje0reltm7.m3u8",
        1082: "https://ncdn.deikho.com/files/videos/2019/12/16/1576506620822fcjtvxh8pet6/1576506620822fcjtvxh8pet6.m3u8",
        1084: "https://ncdn.deikho.com/files/videos/2019/12/16/15765066208226ttza8agd7s10/15765066208226ttza8agd7s10.m3u8",
        1242: "https://ncdn.deikho.com/files/videos/2020/01/19/1579382787392z8ary2d71cm5/1579382787392z8ary2d71cm5.m3u8",
        1243: "https://ncdn.deikho.com/files/videos/2019/12/16/1576481239135y60n8gvmqx10/1576481239135y60n8gvmqx10.m3u8",
        1244: "https://ncdn.deikho.com/files/videos/2019/12/16/15764834735080h797eqvd93u5/15764834735080h797eqvd93u5.m3u8",
        1245: "https://ncdn.deikho.com/files/videos/2019/12/16/1576483473511j2hm2fzy3rf6/1576483473511j2hm2fzy3rf6.m3u8",
        1246: "https://ncdn.deikho.com/files/videos/2019/12/16/15764834735129hvad34l9y810/15764834735129hvad34l9y810.m3u8",
        1247: "https://ncdn.deikho.com/files/videos/2019/12/16/1576484574651w2rj4c2un6r5/1576484574651w2rj4c2un6r5.m3u8",
        1248: "https://ncdn.deikho.com/files/videos/2019/12/16/1576484574653k1tbrifk5le3/1576484574653k1tbrifk5le3.m3u8",
        1249: "https://ncdn.deikho.com/files/videos/2019/12/16/1576484574655b205nz8pv3n8/1576484574655b205nz8pv3n8.m3u8",
        1250: "https://ncdn.deikho.com/files/videos/2019/12/16/1576484574657jq2h1iw0a4/1576484574657jq2h1iw0a4.m3u8",
        1251: "https://ncdn.deikho.com/files/videos/2019/12/16/1576484574658bu0z1woc1q4/1576484574658bu0z1woc1q4.m3u8",
        1226: "https://ncdn.deikho.com/files/videos/2020/01/07/15783814713161hkml9zglzb2/15783814713161hkml9zglzb2.m3u8",
        1235: "https://ncdn.deikho.com/files/videos/2020/01/07/157838147131857hk1s05quu9/157838147131857hk1s05quu9.m3u8",
        1236: "https://ncdn.deikho.com/files/videos/2020/01/07/15783814713209k27ev19fcr1/15783814713209k27ev19fcr1.m3u8",
        1237: "https://ncdn.deikho.com/files/videos/2020/01/07/15783814713214faz4fxeqk61/15783814713214faz4fxeqk61.m3u8",
        1238: "https://ncdn.deikho.com/files/videos/2020/01/07/1578381471323oej4dhifv5n7/1578381471323oej4dhifv5n7.m3u8",
        1239: "https://ncdn.deikho.com/files/videos/2020/01/07/1578381471325404hto4udxe5/1578381471325404hto4udxe5.m3u8",
        1240: "https://ncdn.deikho.com/files/videos/2020/01/07/1578381471326sw8a9eml73p5/1578381471326sw8a9eml73p5.m3u8",
        1227: "https://ncdn.deikho.com/files/videos/2019/12/30/1577686464934jgyswebmtl10/1577686464934jgyswebmtl10.m3u8",
        1229: "https://ncdn.deikho.com/files/videos/2019/12/30/1577686464935628c69mbag73/1577686464935628c69mbag73.m3u8",
        1239: "https://ncdn.deikho.com/files/videos/2019/12/29/1577644320731yvvd8ziti9h2/1577644320731yvvd8ziti9h2.m3u8"
      },
      timer: 0,
      isFree: 1,
      showFlag: true,
      intervalObj: "",
      chargingFileURL:"https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/23/1582497869975rgop6x1oio8/1582497869975rgop6x1oio8.m3u8?Expires=1587913790&Signature=ZLzKiAwKQKnDRJZvcoXCNn7NdWubwwAOJSpiadysnMkFUwiMZIpTK2jBv93EaU6V~028sWHZFhMNPcdjwvHsraDq9c61Mc0BLpBajSeuXogYKDIsTeE21K4HS1uNgB5--mcpOPa-y-VATiCOW1JnTxBte4jeI5kd~SoOjLCNqSj-M6hnuD9AJsBVNiNBjwCnD6aSzNMXYrxWWp-2a6W9ssxf4suv3jrwP0HZa5f-gIis9HbTq11GUjT30~imqy71sU9jVBHZuxwJ25PY4UsNsPA3BjTCTb4CGToIF-gMp7ZRMnvuoT2Va5AADuZ63U9Q33eLSs00x-xSGyg40movDQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
               vidUrl: null,
      playerData: {
        season_number: false,
        episode_number: false
      },
      playbackFormat: "application/x-mpegurl",
      videoDetails: {
        vidUrl: "",
        playbackFormat: "",
        poster: null,
        captions: []
      },
      seriesDetails: null
    };
  },
  props: ["getMeVideoData"],
  head() {
    //this.$router.push('/tvCollections');
    if (process.browser) {
      return {
        script: [{ src: require("~/player/dist/hola_player.dev.js") }]
      };
    }
  },
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
          if (series.seasons.length > 0) {
            for (let i = 0; i < series.seasons.length; i++) {
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
                for (let i = 0; i < season.episodes.length; i++) {
                  let episode = season.episodes[i]; //temporary episode

                  {
                    //checking if url has no episode id, considering it episode one
                    if (typeof this.$route.params.id == "undefined" && i == 0) {
                      episode.selected = true;
                      //checking if url episode id is equal to iteration episode to get selected true
                    } else if (this.$route.params.id == episode.videoid) {
                      episode.selected = true;

                      var episode_number = i;
                      if (!this.hasTrailer) {
                        episode_number = i + 1;
                      }
                      // episode_number=episode_number+1;

                      if (episode.is_trailer) {
                        this.playerData.episode_number = "";
                      } else {
                        this.playerData.episode_number =
                          "E" + episode_number + ":";
                      }

                      //everything else is false sd
                    } else {
                      episode.selected = false;
                    }

                    //formatting some attributes for player
                    episode.thumb = episode.thumbs.original;
                    episode.id = episode.videoid;
                    episode.link =
                      "/watch/" +
                      episode.videoid +
                      "?type=series&series_id=" +
                      series.series_id +
                      "&season_id=" +
                      season.season_id;

                    //now picking up the next video for player
                    if (episode.selected == true) {
                      //updating video details
                      if (episode.file_type == 0) {
                        this.videoDetails.playbackFormat = "video/mp4";
                      } else if (episode.file_type == 1) {
                        this.videoDetails.playbackFormat = "";
                      } else if (episode.file_type == 2) {
                        this.videoDetails.playbackFormat =
                          "application/x-mpegurl";
                      }
                      this.$fireAnalyticsObj().logEvent("videos_playing", {
                        video_title: series.series_name,
                        episode_title: episode.title
                      });
   this.$fireAnalyticsObj().logEvent("user_engagement", {
                        video_title: series.series_name,
                        episode_title: episode.title
                      });

                      // assign videourl to player
                      this.videoDetails.vidUrl = episode.files[0];
                      this.playerData.episode_name = episode.title
                        .trim()
                        .split(".mp4")["0"];
                      this.videoDetails.poster = episode.thumbs.original;
                      this.videoDetails.sprite_count = episode.sprite_count;
                      this.videoDetails.interval = episode.interval;
                      this.videoDetails.sprite = episode.sprite;
                      //console.log(this.playerData);
                      this.processSprites();
                      this.getMeVideoData(episode);

                      let nextEpisodeIteration = i + 1;
                      if (
                        typeof season.episodes[nextEpisodeIteration] !==
                        "undefined"
                      ) {
                        var nextEpisode = season.episodes[nextEpisodeIteration];
                      } else if (
                        typeof series.seasons[nextEpisodeIteration] !==
                        "undefined"
                      ) {
                        var nextEpisode =
                          series.seasons[nextEpisodeIteration].episodes[0];
                      }
                      //assign next video data to player
                      if (typeof nextEpisode !== "undefined") {
                        this.playerData.next = {
                          name: nextEpisode.title.trim().split(".mp4")["0"],
                          link:
                            "/watch/" +
                            nextEpisode.videoid +
                            "?type=series&series_id=" +
                            series.series_id +
                            "&season_id=" +
                            season.season_id,
                          image: nextEpisode.thumbs.original,
                          title: nextEpisode.title.trim().split(".mp4")["0"],
                          description: nextEpisode.description
                            .trim()
                            .split(".mp4")["0"]
                        };
                      }
                    }
                    //finally appending episodes into seasons one by one
                    episode.title = episode.title.trim().split(".mp4")["0"];
                    episode.description = episode.description
                      .trim()
                      .split(".mp4")["0"];
                    newEpisodes.push(episode);
                  }
                }
                season.episodes = newEpisodes;
              } else {
                throw new Error("No episodes found for the seasons");
              }
              //finally appending season into series one by one
              newSeasons.push(season);
            }
            //overwriting season over series after processing
            series.seasons = newSeasons;
            //console.log(series);
            this.playerData.series = {
              name: "Series",
              seasons: series.seasons
            };
          } else {
            throw new Error("No seasons found for the series");
          }
        } else {
          throw new Error("No series Object found");
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
    getVideoDetails() {
      try {
        let videoId = this.$route.params.id;
        //sending api call to get video details of given id
        return this.$axios.get("/videos/list/" + videoId).then(
          response => {
            console.log("video detial sfetched");
            this.videoDetails = response.data.videos.video_by_id[0];
            let videoDetails = this.videoDetails;
            this.getMeVideoData(videoDetails);

            //if video details are success, update component attributes for player
            if (videoDetails) {
              this.videoDetails.title = videoDetails.title.trim().split(".mp4")[
                "0"
              ];
              //checking for video file type and update component according to it
              if (videoDetails.file_type == 0) {
                this.videoDetails.playbackFormat = "video/mp4";
              } else if (videoDetails.file_type == 1) {
                this.videoDetails.playbackFormat = "";
              } else if (videoDetails.file_type == 2) {
                this.videoDetails.playbackFormat = "application/x-mpegurl";
              }
              //assign video url to player
              if (
                this.videoDetails.live !== null &&
                this.videoDetails.live !== ""
              ) {
                this.videoDetails.vidUrl = videoDetails.live;
              } else {
                this.videoDetails.vidUrl = videoDetails.files[0];
              }
              //this.videoDetails.vidUrl = videoDetails.files[0];
              this.videoDetails.poster = videoDetails.thumbs.original;
              this.videoDetails.captions = videoDetails.captions;
              //assigning player data for player instance
              this.playerData = {
                title: this.videoDetails.title.trim().split(".mp4")["0"]
              };
              this.processSprites();
            } else {
              throw new Error("Video Details not Found");
            }
          },
          err => {
            this.$store.commit("snackIt", err.toString());
          }
        );
      } catch (err) {
        this.$store.commit("snackIt", err.toString());
      }
    },
    setDisplay(episodes) {
      //console.log("aser ase");
      let epi = [];
      let offset_ = new Date().getTime();
      //console.log("offset", offset_);
      episodes.map((ep, index) => {
        ep["is_trailer"] = false;

        if (
          ep.title
            .toLowerCase()
            .trim()
            .split(".mp4")["0"] == "trailer"
        ) {
          ep["is_trailer"] = true;
          this.hasTrailer = true;
        }
        //console.log("ep", ep);
        let start_date = new Date(ep.start_published_date).getTime();

        //console.log("start_date", start_date);

        if (
          start_date > offset_ ||
          ep.start_published_date == "0000-00-00 00:00:00"
        ) {
        } else {
          epi.push(ep);
        }

        // ep["can_play"] = true;
      });
      return epi;
    },
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
      try {
        let seriesId = this.$route.query.series_id;

        return this.$axios
          .get("/series/list/" + seriesId)
          .then(
            response => {
              if (
                response.data.series.series_by_id == null ||
                typeof response.data.series.series_by_id == "undefined"
              ) {
                throw new Error("Series Details not found");
              }
              let seriesDetails = response.data.series.series_by_id[0];

              //if video/series details are success, update component attributes for player
              if (seriesDetails) {
                // processing series data, and assigning player data for player instance
                // will do all the stuff annd append all the data to player
                // console.log("series detail", seriesDetails.seasons[0].episodes);
                seriesDetails.seasons[0].episodes = this.setDisplay(
                  seriesDetails.seasons[0].episodes
                );
                //console.log("series detail", seriesDetails.seasons[0].episodes);

                this.processSeries(seriesDetails);
              } else {
                throw new Error("Series Details not Found");
              }
            },
            err => {
              this.$store.commit("snackIt", err.toString());
            }
          )
          .catch(err => {
            this.$store.commit("snackIt", err.toString());
          });
      } catch (err) {
        this.$store.commit("snackIt", err.toString());
      }
    },

    /**
     *
     * @method  : processSprites() this method is used process sprites for video js thumbnails plugin
     * @params  : Null
     * @author  : <fahad.dev@iu.com.pk> <Fahad Abbas>
     * @since   : 14th jan/2019
     * @returns : Null
     * @throws  : Exception if any error come
     */
    processSprites() {
      try {
        if (
          typeof this.videoDetails.sprite != "undefined" &&
          this.videoDetails.sprite != null
        ) {
          let sprite_count = this.videoDetails.sprite_count;
          let durationRound = Math.round(this.videoDetails.interval);
          let interval = durationRound / sprite_count;
          let finalInterval = Math.round(interval);

          var index = 0;
          var height = 105;
          var width = 168;
          var position = [];
          var spriteJson = [];
          let tempJsonData = {};
          tempJsonData.sprites = {};
          tempJsonData.src = this.videoDetails.sprite;
          tempJsonData.sprites.width = width;
          tempJsonData.sprites.height = height;
          for (var i = 0; i < sprite_count; i++) {
            position.push(index);
            index = index + finalInterval;
          }

          tempJsonData.sprites.position = position;
          spriteJson.push(tempJsonData);
          this.playerData.thumbnails = spriteJson;
        }
      } catch (err) {
        this.$store.commit("snackIt", err.toString());
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
      let backBrowse = "";
      setTimeout(e => {
        backBrowse = this.$el.querySelector(".vjs-video-title");
        if (backBrowse !== null) {
          backBrowse.addEventListener("click", e => {
            this.$router.push({
              path: `/tvCollections/details/${this.$route.query.series_id}`
            });
            // this.$router.back()
          });
        }
      }, 1000);

      // binding click events on episode select events
      let EpisodeLists = "";
      setTimeout(e => {
        EpisodeLists = this.$el.getElementsByClassName("vjs-series-video");
        //console.log("EpisodeLists", EpisodeLists);
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
      if (this.$route.query.type == "series") {
        await this.getSeriesDetails();
        this.dataLoading = false;
      } else {
        await this.getVideoDetails();
        this.dataLoading = false;
      }
      //initilizing player
      this.playerData.custom = {
        episode_name: this.playerData.episode_name,
        season_number: this.playerData.season_number,
        episode_number: this.playerData.episode_number
      };
      this.playerData.hotkeys = {
        volumeStep: 0.1,
        seekStep: 5,
        enableMute: true,
        enableFullscreen: true,
        enableNumbers: false,
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
          clearInterval(this.intervalObj);
                          this.$modal.show('hello-world');

          console.log("ened");
        });
      }
      //console.log("Video Details", this.videoDetails);
      this.computePlayerControls();
    },
    logData() {
      let self = this;
      // console.log("this.currentUser.msisdn", this.currentUser.msisdn);
      let obj1 = {
        msisdn: this.currentUser.msisdn
      };
      // console.log("obj1", obj1);
      axios
        .post("https://api.deikho.com/user/getStatus", obj1)
        .then(response => {
          // console.log("response", response.data.data[0].watched);

          if (response.data.data[0].watched <= 179) {
            self.currentUser.watched = response.data.data[0].watched;
            // console.log("self current", self.currentUser);
            let obj = {
              msisdn: this.$store.getters.currentUser.msisdn,
              time: this.timer + parseInt(response.data.data[0].watched)
            };
            self.currentUser.watched =
              this.timer + parseInt(response.data.data[0].watched);

            self.timer = 0;
            // console.log("obj", obj);
            axios
              .post("https://api.deikho.com/api/logTime", obj)
              .then(response => {})
              .catch(err => {
                console.log(err);
                return err;
              });
          } else {
            if (self.showFlag && self.currentUser.watched >= 179) {
              alert(
                "You have consumed your free 3 Hours daily streaming.Now you will be charged as per your package plan"
              );
              self.showFlag = false;
              // self.currentUser.watched = 250;
              // console.log(
              //   "this.currentUser.watched show",
              //   self.currentUser.watched
              // );
            }
          }
        })
        .catch(err => {
          console.log(err);
          return err;
        });
    },
        show () {
    this.$modal.show('hello-world');
  },
  hide () {
    this.$modal.hide('hello-world');
  }
  },
  computed: {
    ...mapGetters(["configs", "currentUser"])
  },
  beforeMount: function() {
    // localStorage.setItem("isData", true);
    // console.log("isData", localStorage.getItem("isData"));
    // console.log("msisdn", localStorage.getItem("msisdn"));
    // let header_number = localStorage.getItem("msisdn");
    // let subscriber_number = this.currentUser.msisdn;
    // console.log("header_number", header_number);
    // console.log("subscriber_number", subscriber_number);
    // // console.log("this.$route.params",this.$route.params);
    // // console.log("this.currentUser.watched", this.$store.getters.currentUser.watched);
    // if (this.currentUser.watched >= 179 || header_number != subscriber_number) {
    //   // this.chargingFileURL=this.alternatFile[this.$route.params.id];
    //   // console.log("this.chargingFileURL",this.chargingFileURL);
    //   this.isFree = "0";
    //   console.log("Paid data ");

    //   this.showFlag = false;
    // } else if (this.alternatFile[this.$route.params.id]) {
    //   console.log("Free data ");
    //   this.chargingFileURL = this.alternatFile[this.$route.params.id];
    // } else {
    //   console.log("Paid data ");

      this.isFree = "0";
    // }
    // console.log("getting storage object",this.currentUser.watched);
    // console.log(localStorage.getItem("isFree"));
    // if (
    //   localStorage.getItem("isFree") == false ||
    //   localStorage.getItem("isFree") == "false"
    // ) {
    //   console.log("THIS IS FREE");
    //   this.isFree = "0";
    // } else {
    //   this.isFree = "1";
    // }
    if (process.browser) {
      this.initPlayer();
    }
  },
  mounted() {
                // this.$modal.show('hello-world');

        this.$fireAnalyticsObj().logEvent("videos_playing", {
                        msisdn: this.$route.query.msisdn,
                        video_title: "Saat Mulaqatain",
                        episode_title: "Episode 1"
                      });
let self=this;
                      {
        console.log("interval");
        let timer=0;
        this.intervalObj = setInterval(function() {
                  console.log("interval",timer);

          timer = timer + 1;
          
          if (timer>=10){
                self.$modal.show('hello-world');

clearInterval(self.intervalObj);
          }

        }, 58000);
      }
    // console.log("usad susear",this.$store);

    // try {
    //   // console.log("Mounted", this.currentUser);
    //   let self = this;

    //   let header_number = localStorage.getItem("msisdn");
    //   let subscriber_number = this.currentUser?this.currentUser.msisdn:'';
    //   if (
    //     this.currentUser.watched < 179 ||
    //     (this.currentUser.watched == undefined &&
    //       header_number == subscriber_number)
    //   ) {
    //     console.log("interval");
    //     this.intervalObj = setInterval(function() {
    //       self.timer = self.timer + 1;
    //       // console.log("time elapsed .", self.timer);
    //       // console.log("usad", self.currentUser);
    //     //  self.logData();
    //     }, 58000);
    //   }
    // } catch (err) {}
    // console.log(localStorage.getItem("isFree"));
    // if (this.isFree == "1") {
    //   setTimeout(function() {
    //     alert("TIME OVER CHARGING NOW");
    //     if (typeof Storage !== "undefined") {
    //       // Code for localStorage/sessionStorage.
    //       localStorage.setItem("isFree", false);
    //       // location.reload();
    //       // vm.$forceUpdate();
    //       self.$router.go();
    //     } else {
    //       // Sorry! No Web Storage support..
    //     }
    //   }, 30000);
    // }
  },
  beforeDestroy() {
    clearInterval(this.intervalObj);
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
.vjs-seasons-menu {
  right: 10% !important;
}
@media only screen and (max-width: 767px) {
.vjs-episodes-submenu ul.vjs-menu-content li.vjs-menu-item.vjs-menuitem-selected .Series_dtl {
  height: 0px !important;
}
}
.modal-body-bg {
  background: url("https://deikho.com/files/web/bg_1010.png");
   height:500px;
   background-size:cover;
    width:350px;
    display: grid;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 5% 0;
}

.text-section{
  color: white;
  padding: 0 15%;
  font-weight: 900;
}
.btn-round{border-radius: 30px;
height:35px;}
.image-section{

    background: url(https://deikho.com/files/web/mobs.png);
    height: 175px;
    object-fit: contain;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right;
}
.btn-daikho {
  padding: 0 30px;
  color: white;
  height: 50px;
  background: #ffc511 !important;
  border-radius: 5px;
}
</style>