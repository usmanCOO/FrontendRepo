<template>
  <v-layout align-center>
    <v-flex lg12>
      <v-card class="vidlix__Player__container">
        <v-card-text class="vidlix__Playerpinning-header">
          <Player :getMeVideoData="getMeVideoData" />
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapGetters } from "vuex";
import Player from "~/components/default/player";
import socket from "~/plugins/socket.io.js";
export default {
  name: "watch",
  middleware: ["auth", "subscription_needed"],
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["currentProfile"])
  },
  components: {
    Player
  },
  methods: {
    getMeVideoData(vData) {
      console.log("get me video",vData);
      let currUser = this.currentProfile;
      if (vData && currUser) {
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        let device = isMobile ? "mobile" : "desktop";
        var historyObj = {
          userid: currUser.userid,
          user_profile_id: currUser.user_profile_id,
          videoid: vData.videoid,
          video_title: vData.title,
          video_url: this.$route.fullPath,
          device: device
        };
        this.sendHistoryRequest(historyObj);
      } else {
        this.$console(
          "History can't be maintained either video data or user profile date is missing"
        );
      }
    },
    sendHistoryRequest(historyObj) {
      try {
        this.$axios
          .post("/users/recordMyWatch", historyObj)
          .then(response => {
            // Hitory recorded
            console.log("history recorded");
          })
          .catch(err => {
            if (!err.response) {
              this.$console(
                "Server isn't responding please check if server is up or not",
                "d"
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(err.response);
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {},
  mounted() {
    socket.connect();
    if(this.currentProfile){
    socket.emit("userLandedOnWatchVideo", this.currentProfile.userid);}
    socket.on("screenLimitExceeded", function(data) {
      console.log("Screen limit exceeded");
    });
    if (process.browser) {
      window.onbeforeunload = () => {
            if(this.currentProfile){
socket.emit("userLeftWatchVideo", this.currentProfile.userid);
            }      };
    }
  },
  beforeDestroy() {
            if(this.currentProfile){
    
    socket.emit("userLeftWatchVideo", this.currentProfile.userid);
  }}
};
</script>
<style scoped>
.video-title-text {
  opacity: 1 !important;
}
#hola_player_3549_3 > div.vjs-menu.vjs-rightclick-popup > ul,
.back-browse {
  display: none !important;
}
</style>