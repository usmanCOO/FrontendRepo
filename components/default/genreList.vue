 <template>
  <section v-if="Alldata" class="col">
    <br />
    <div class="web-view">
      <div class="row">
        <div class="col-md-12">
          <div class="row ">
            <div
              class="col pad-5 category-pt"
              v-for="(category, index) in Alldata"
              :key="index"
            >
              <div class>
                <div class="h-300">
                                        <div v-if="category.is_free" class="free-tag">Free</div>

                  <v-img v-if="category.series_id==0"
                  :src="category.files_thumbs_path?category.files_thumbs_path:category.thumbs.original" 
                                        @click="takeMeToWatchcategory(category.videoid,category.series_id,category.season_id,category.title,category)"

                  class="img-contain img-video" >
                    <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-layout>
                     <div class="category-card">
                    <div
                      class="col play-parent"
                      @click="takeMeToWatchcategory(category.videoid,category.series_id,category.season_id,category.title,category)"
                    >
                      <button
                        class="btn btn-daikho-hollow"
                        style="display:flex;justify-content:center;align-items:center"
                        @click="takeMeToWatch(catVid)"
                      >
                        <v-icon style="color:#ffc511">play_arrow</v-icon>&nbsp;
                        <span
                          style="margin-top:2.5px;display: grid;
    align-content: center;"
                        >Play Now</span>
                      </button>
                    </div>
                  </div>
                  </v-img>
                               <v-img v-else
                  :src="category.thumb"                       @click="takeMeToDetail(category)"

                                                aspect-ratio="1"

                  class="img-contain img-series" >
                    <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-layout>
                     <div class="category-card">
                    <div
                      class="col play-parent"
                      @click="takeMeToDetail(category)"
                    >
                      <!-- <button
                        class="btn btn-daikho-hollow"
                        style="display:flex;justify-content:center"
                        @click="takeMeToWatch(category)"
                      >
                        <v-icon style="color:#ffc511">play_arrow</v-icon>&nbsp;
                        <span
                          style="margin-top:2.5px;display: grid;
    align-content: center;"
                        >Play Now</span>
                      </button> -->
                       <button class="btn btn-daikho-hollow">
                                  <router-link
                                    :to="`/tvCollections/details/${category.series_id}`"
                                    @click="logData('video_details',category)"
                                    style="display:inherit;height:auto !important"
                                  >Details</router-link>
                                </button>
                    </div>
                  </div>
                  </v-img>  
                </div>
                <div class="pt-5-cus" v-if="category.series_id==0">
                  <p
                    style="margin-top: 5px;text-transform: capitalize;margin-bottom: 5px;"
                    v-if="category.title"
                  >{{category.title.toLowerCase().trim().split('.mp4')[0]}}</p>
                  <!-- <small
                    style="text-transform: capitalize;margin-bottom: 5px;"
                    v-if="category.title"
                  >{{category.description}}</small> -->
                </div>
   <div class="pt-5-cus" v-else>
                  <p
                    style="margin-top: 5px;text-transform: capitalize;margin-bottom: 5px;"
                    v-if="category.series_name"
                  >{{category.series_name.toLowerCase().trim().split('.mp4')[0]}}</p>
                  <!-- <small
                    style="text-transform: capitalize;margin-bottom: 5px;"
                    v-if="category.series_name"
                  >{{category.series_description}}</small> -->
                </div>
                <!-- <div class="pt-5-cus ">
                    
                      <p
                        style="text-transform:capitalize"
                        v-if="category.title"
                      >{{category.title.toLowerCase().trim().split('.mp4')[0]}}</p>
                </div>-->
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <!-- <div v-if="seeall" style="display:flex;justify-content:center;width:100%;margin:15px">
          <button v-if="!allLoaded" class="btn btn-daikho" @click="getMovies(1000)">
 <template v-if="moviesloading">
                        <div class="spinner-border" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </template>
                      <template v-else> See all</template>          </button>
        </div> -->
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
        v-if="Alldata==null"
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

  Alldata() {
    return {
      dataLoading: true,
      Alldata: null,
      allData: null,
      seeall: true
    };
  },
  props: ["Alldata","getMovies","moviesloading","allLoaded","logData","takeMeToWatch"],
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
      this.Alldata = this.allData;
    },
    takeMeToDetail(obj){
        this.$router.push(
          `/tvCollections/details/${obj.series_id}`
        );
    },
    takeMeToWatchcategory(videoid, series_id, season_id, title, obj) {
              this.$fb.track("ViewContent",{
        msisdn: this.$store.getters.currentUser
          ? this.$store.getters.currentUser.msisdn
          : "N/A",
        video_title: title,
        videoid:videoid,
        series_id:series_id
      });	

      this.$fireAnalyticsObj().logEvent("video_play", {
        msisdn: this.$store.getters.currentUser
          ? this.$store.getters.currentUser.msisdn
          : "N/A",
        video_title: title
      });
                    this.$fb.track("ViewContent",{
              msisdn: this.$store.getters.currentUser
          ? this.$store.getters.currentUser.msisdn
          : "N/A",
        video_title: title,
        series_id:series_id,
        videoid:videoid
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
        window.location.href = `http://www.deikho.com/watch_video.html?episode_id=${videoid}&type=video&series_id=${series_id}&season_id=${season_id}&source=${obj.is_free}`;
      } else {
        console.log("watch ");
        this.$router.push(
          `/watch/${videoid}?type=video&series_id=${series_id}&season_id=${season_id}&source=${obj.is_free}`
        );
      }
    },
   
  },
  computed: {
    ...mapGetters(["configs", "currentUser"])
  },
  beforeMount: function() {
  },
  mounted() {},
  beforeDestroy() {}
};
</script>
<style scoped>
.category-pt {
  padding: 5px;
  min-width: 15vw;
  width: 16vmax;
  max-width: 16vmax;
}

.category-card {
  position: absolute;
  width: 100%;
  padding: 5px;
  display: none;
  z-index: 10;
  bottom: 10px;
}
.category-pt :hover .category-card{
  display: block;
  cursor: pointer;
}
.category-pt :hover {
  cursor: pointer;
}

.btn-daikho-hollow {
  padding: 0 30px;
  color: #ffc511;
  height: 50px;
    border: 1px solid #8a867b66 !important;
    border-radius: 5px;
    background: #6d66669e;
  width: 100%;
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
  width: 100%;

}
.play-parent {
  display: flex;
  justify-content: center;
}
.justification{
  justify-content: space-between;
}
.img-series{
  height: 22vw;
}

.free-tag {
  position: absolute;
  z-index: 1;
  right: 5px;
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
@media only screen and (max-width: 767px) {
   .free-tag {
    position: absolute;
    z-index: 1;
    right: 5px;
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
.img-series{
  height: 60vw;
}
.img-video{
  height: 60vw;
}

.category-pt{
    padding: 5px;
    min-width: 43vw;
    width: 45vw;
    max-width: 45vw;
}
.pt-5-cus small{
  display: none;
}
.btn-daikho-hollow{display: none !important;}
}

</style>