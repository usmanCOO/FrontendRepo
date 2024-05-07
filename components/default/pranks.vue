 <template>
  <section v-if="pranksData">
    <br />
    <div class="web-view">
  
      <div class="row ">
        <div class="col-md-12">
          <div class="row">
            <div class="col pad-5 prank-pt" v-for="(prank, index) in pranksData" :key="index">
              <div class="prank-card">
                <div
                  class
                  style="position: absolute;z-index: 1;width: 100%;height: 100%;display: grid;justify-content: center;align-items: center;top:-1vw"
                >
                  <div
                    class="col play-parent"
                    @click="takeMeToWatchPrank(prank.videoid,prank.series_id,prank.season_id,prank.title,prank)"
                    style="cursor:pointer"
                  >
                    <i
                      data-v-166faf4c
                      aria-hidden="true"
                     
                      class="v-icon material-icons circle-play1"
                    >play_arrow</i>
                  </div>
                </div>
                <p class="h-300">
                  <v-img
                    :src="prank.thumbs.original"
                    :lazy-src="`${prank.thumbs.original}`"
                    class="img-contain"
                  >
                    <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-layout>
                  </v-img>
                </p>
                <div class="pt-5-cus">
                  <p
                    style="text-transform:capitalize"
                    v-if="prank.title"
                  >{{prank.title.toLowerCase().trim().split('.mp4')[0]}}</p>
                </div>

                <!-- <div class="pt-5-cus ">
                    
                      <p
                        style="text-transform:capitalize"
                        v-if="prank.title"
                      >{{prank.title.toLowerCase().trim().split('.mp4')[0]}}</p>
                </div>-->
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div style="padding-top:5px;width:100%;text-align:center;margin-top:10px" v-if="seeall">
          <button class="btn btn-daikho" >                <router-link                 
            :to="`/tvCollections/details/51`"
>
View All                </router-link>
</button>
        </div>
        <br />
        <br />
      </div>
    </div>
    <div class="mobile-view">
     
      <div class="row ">
        <div class="col-md-12">
          <div class="row">
            <div class="col pad-5" v-for="(prank, index) in pranksData" :key="index">
              <div class="prank-card">
                <div
                  class
                  style="position: absolute;z-index: 1;width: 100%;height: 100%;display: grid;justify-content: center;align-items: center;top:-1vw"
                                 @click="takeMeToWatchPrank(prank.videoid,prank.series_id,prank.season_id,prank.title,prank)"
   >
         
                </div>
                <p class="h-300">
                  <v-img
                    :src="prank.thumbs.original"
                    :lazy-src="`${prank.thumbs.original}`"
                    class="img-contain"
                  >
                    <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-layout>
                  </v-img>
                </p>
                <div class="pt-5-cus"                     @click="takeMeToWatchPrank(prank.videoid,prank.series_id,prank.season_id,prank.title,prank)"
>
                  <p
                    style="text-transform:capitalize"
                    v-if="prank.title"
                  >{{prank.title.toLowerCase().trim().split('.mp4')[0]}}</p>
                </div>

                <!-- <div class="pt-5-cus ">
                    
                      <p
                        style="text-transform:capitalize"
                        v-if="prank.title"
                      >{{prank.title.toLowerCase().trim().split('.mp4')[0]}}</p>
                </div>-->
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div style="padding-top:5px;width:100%;text-align:center" v-if="seeall">
<button class="btn btn-daikho" >                <router-link                 
            :to="`/tvCollections/details/51`"
>
View All                </router-link>
</button>        </div>
        <br />
        <br />
      </div>
    </div>
    <br />
    <br />
  </section>
         <section v-else>
        <v-flex lg12 md12 my-5 px-3 py-2 class="rightthumb">
          <v-progress-circular
            v-if="pranksData==null"
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
      pranksData: null,
      allData: null,
      seeall: true
    };
  },
  // props: ["limit"],
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
    showAll() {
      this.seeall = false;
      this.pranksData = this.allData;
    },
    takeMeToWatchPrank(videoid, series_id, season_id, title, obj) {
                 this.$fb.track("ViewContent",{
        msisdn: this.$store.getters.currentUser
          ? this.$store.getters.currentUser.msisdn
          : "N/A",
        video_title: title,
        series_id:series_id,
        videoid:videoid
      });	
      this.$fireAnalyticsObj().logEvent("video_play", {
        msisdn: this.$store.getters.currentUser
          ? this.$store.getters.currentUser.msisdn
          : "N/A",
          videoid:videoid,

        video_title: title
      });
                        this.$fb.track("ViewContent",{
             msisdn: this.$store.getters.currentUser
          ? this.$store.getters.currentUser.msisdn
          : "N/A",
          videoid:videoid,

        video_title: title,
        series_id:series_id
      });	
      
      console.log("is_free", obj.is_free);
      // if(obj.is_free){
      //   // alert("free");
      //           this.$store.getters.fcm=obj.videokey;
      //           this.$store.getters.fcms=series_id;
      //           console.log("fcm store",this.$store.getters.fcm)
      //           console.log("fcms store",this.$store.getters.fcms)
      //         this.$router.push(
      //           `/watch/${videoid}?type=series&series_id=${series_id}&season_id=${season_id}&type=${obj.is_free}`
      //         );

      // }
      console.log("to watch", videoid, series_id, season_id, title);
      console.log("network changed", localStorage.getItem("network_changed"));
      if (
        localStorage.getItem("network_changed") == true ||
        localStorage.getItem("network_changed") == "true"
      ) {
        console.log("header video ");
        window.location.href = `http://www.deikho.com/watch_video.html?episode_id=${videoid}&type=series&series_id=${series_id}&season_id=${season_id}&source=${obj.is_free}`;
      } else {
        console.log("watch ");
        this.$router.push(
          `/watch/${videoid}?type=series&series_id=${series_id}&season_id=${season_id}&source=${obj.is_free}`
        );
      }
    },
    getPranks() {
      try {
        this.$axios.get(`/videos/listLegacy/?series_id=51&page=4`).then(
          response => {
            console.log("response pranks",response);
            // let tempdata =
            //   response.data.series.series_by_id["0"]["seasons"]["0"][
            //     "episodes"
            //   ];
               let tempdata =
              response.data.videos.data;
            let data =              response.data.videos.data;
            console.log("this.limit", data);
            // for (var i = 0; i < 10; i++) {
            //   data.push(tempdata[i]);
            // }
            this.pranksData = data;
            this.allData = tempdata;

            // console.log("pranks data", this.pranksData);
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
    }
  },
  computed: {
    ...mapGetters(["configs", "currentUser"])
  },
  beforeMount: function() {
    this.getPranks();
  },
  mounted() {},
  beforeDestroy() {}
};
</script>
<style scoped>
.prank-card:hover>div>.play-parent{display: block;
}
.prank-card:hover{cursor: pointer;}
.play-parent{
  display: none;
}
.circle-play1 {
    height: 50px;

    color: rgba(239, 239, 239, 0.82);
    font-size: 25px;
    width: 30px !important;
    background: #ffc511a1;
    height: 30px !important;
    min-width: 30px !important;
    border-radius: 50px;
    padding: 22px;
}
.overflow-items::-webkit-scrollbar {
  width: 4px;
}

.overflow-items::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.overflow-items::-webkit-scrollbar-thumb {
  background-color: #ffc511;
  outline: 1px solid #ffc511;
}
.overflow-items {
  height: 94vh;
  overflow-x: hidden;
  overflow-y: auto;
}
.prank-pt{
  
    width: 300px;
    height: 210px;
    max-width: 300px;
}
.btn-daikho {
  padding: 0 30px;
  color: white;
  height: 50px;
  background: #ffc511 !important;
  border-radius: 5px;
}
.prank-card {
  /* min-width: 250px; */
  width: 270px;
    height: 220px;
}
.pranks .pad-5 {
  width: 48.5vw;
  height: 44vw;
}

.pranks .pad-5 .rcbd {
  width: 90% !important;
}

.pranks .pad-5 .h-300 {
  margin-bottom: 0px !important;
}
.pranks .pt-5-cus {
  padding-top: 3px;
  padding-bottom: 5px;
}
a:hover {
  color:white !important;
}
.pranks .row {
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
.mobile-view {
  display: none;
}
@media only screen and (max-width: 767px) {
  .mobile-view {
    display: block;
  }.web-view{
    display: none;
  }
  .prank-card{
    min-width: 30vw;
    width:auto;
    height: auto;
  }
  }

@media only screen and (min-width:1300px )and (max-width: 1800px)
  {.prank-pt {
    width: 15vw;
    height: auto;
    max-width: 16.5vw;
  }
  .prank-card{width: 14.5vw;}

}
@media only screen and (min-width:768px )and (max-width: 1300px)
{
  .prank-pt {
    width: 15vw;
    height: auto;
    max-width: 16.5vw;
  }
  .prank-card{width: 14.5vw;}

}
</style>