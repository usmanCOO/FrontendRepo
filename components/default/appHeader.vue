<!-- Header of the application -->
<template>
  <client-only>
    <v-toolbar class="headerbg">
      <v-toolbar-side-icon
        dark
        @click.stop="drawer = !drawer"
        class="hidden-lg-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title class="logo">
        <router-link to="/">
          <v-img
            :src="`${configs.app_logo}`"
            :lazy-src="`${configs.app_logo}`"
            height="32"
            width="120"
          >
            <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-layout>
          </v-img>
        </router-link>
      </v-toolbar-title>
      <v-spacer>
        <client-only>
          <template>
            <template>
              <!-- <template v-if="currentUser.is_subscribed === 'yes'"> -->
              <template>
                <v-tab class="hidden-md-and-down" to="/">{{$t("home")}}</v-tab>
                <v-tab class="hidden-md-and-down" to="/webseries">Web Series</v-tab>
                <v-tab class="hidden-md-and-down" to="/comedy">Comedy</v-tab>
                <v-tab class="hidden-md-and-down" to="/shows">Shows</v-tab>
                <v-tab class="hidden-md-and-down" to="/action">Action</v-tab>
                <v-tab class="hidden-md-and-down" to="/drama">Drama</v-tab>
                <v-tab class="hidden-md-and-down" to="/starzplay">Starzplay</v-tab>
                <!-- <v-tab class="hidden-md-and-down" to="/International">International</v-tab> -->
                <v-tab class="hidden-md-and-down" to="/tvCollections/details/51">Pranks<small class='pulse' > Free</small></v-tab>
                <!-- <v-tab class="hidden-md-and-down" to="/all?id=upcoming#5">Upcoming</v-tab> -->
                <!-- <v-tab class="hidden-md-and-down" to="/movies">{{$t("movies")}}</v-tab>
              <v-tab class="hidden-md-and-down" to="/recent">{{$t("recently_added")}}</v-tab>
                <v-tab class="hidden-md-and-down" to="/myList">{{$t("my_list")}}</v-tab>-->
              </template>
            </template>
          </template>
        </client-only>
      </v-spacer>
      <v-toolbar-items class>
        <template>
          <template>
            <div class="searchinner text-md-right my-2" ref="search_bar">
              <v-btn icon class="btnsearch px-1" @click="activateSearch">
                <v-icon>search</v-icon>
              </v-btn>

              <div class="searchbar px-2">
                <!-- <div class="sercdrop">
                <v-menu class="serdp">
                  <v-btn slot="activator" color="primary">
                    {{searchType}}
                    <v-icon>expand_more</v-icon>
                  </v-btn>
                  <v-list class="srchles">
                    <v-list-tile @click="setSearchType('movies')">
                      <v-list-tile-title active-class="highlighted">Movies</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="setSearchType('series')">
                      <v-list-tile-title active-class="highlighted">Tv Shows</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                </div>-->
                <v-text-field
                  class="inputsrch"
                  flat
                  v-model="searchQuery"
                  clearable
                  hide-no-data
                  solo-inverted
                  style="color:#fff"
                  @keyup="getMeSearch"
                ></v-text-field>
              </div>
            </div>
          </template>
              <template v-if="!isAuthenticated">
            <div class="login-link">
              <router-link
                    :to="`/login`"
                  >Login</router-link>
                  </div>
        </template>
        </template>
        <client-only>
          <div class="text-md-center header__right__side">
            <!-- <template v-if="!isAuthenticated">
            <v-btn
              to="/signup"
              round
              color="primary v-btn py-2 px-3 my-3 mx-2 hidden-sm-and-down"
              dark
            >{{$t("create_account")}}</v-btn>
            <v-btn to="/login" round color="primary v-btn py-2 px-3 my-3 mx-2" dark>{{$t("login")}}</v-btn>
            </template>-->
            <template v-if="currentProfile">
              <template v-if="isAuthenticated">
                <!-- <template v-if="currentUser.is_subscribed === 'yes'">
                <v-btn
                  round
                  color="hidden-md-and-down primary py-2 px-3 my-3"
                  class="mr-4"
                  dark
                  to="/upload"
                >{{$t("upload")}}</v-btn>
                </template>-->
                <v-menu offset-y userlogin lazy transition="slide-y-transition">
                  <v-avatar slot="activator">
                    <img v-if="profileImage!==''" :src="profileImage" :ref="'profileImage'" />
                    <v-icon
                      v-if="profileImage==''"
                      size="35"
                      :color="currentProfile.color"
                    >account_circle</v-icon>
                  </v-avatar>
                  <v-list class="mt-1 vodlixmenu">
                    <v-list-tile v-if="currentProfile">
                      <v-list-tile-title>
                        <!-- <img :src="profileImage" /> -->
                        {{currentProfile.first_name.toUpperCase()}}
                      </v-list-tile-title>
                    </v-list-tile>
                    <!-- <template v-if="currentUser.is_subscribed === 'yes'">
                    <v-list-tile
                      v-if="currentUser.level === 1"
                      :href="configs.baseurl+'/admin_area'"
                    >
                      <v-list-tile-title>{{$t("admin_area")}}</v-list-tile-title>
                    </v-list-tile>
                   
                    <v-list-tile to="/profiles">
                      <v-list-tile-title>{{$t("switch_profile")}}</v-list-tile-title>
                    </v-list-tile>
                  </template>
                  <template v-else>
                    <v-list-tile to="/subscription/plans">
                      <v-list-tile-title>{{$t("select_plan")}}</v-list-tile-title>
                    </v-list-tile>
                    </template>-->
                    <v-list-tile to="/accountSettings">
                      <v-list-tile-title>{{$t("account_settings")}}</v-list-tile-title>
                    </v-list-tile>
                    <!-- <v-list-tile @click="logout">
                      <v-list-tile-title>{{$t("logout")}}</v-list-tile-title>
                    </v-list-tile> -->
                  </v-list>
                </v-menu>
              </template>
            </template>
          </div>
        </client-only>
      </v-toolbar-items>
      <!-- mobile_inner-start-->
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="mini"
        absolute
        dark
        temporary
        class="mobvod_sidebar"
      >
        <v-list class="pa-1">
          <v-list-tile v-if="mini" @click.stop="mini = !mini">
            <v-list-tile-action>
              <!-- <v-icon>chevron_right</v-icon> -->
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile avatar tag="div">
            <template v-if="currentProfile">
              <v-list-tile-avatar>
                <img v-if="profileImage!==''" :src="profileImage" :ref="'profileImage'" />
                <v-icon
                  v-if="profileImage==''"
                  size="35"
                  :color="currentProfile.color"
                >account_circle</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{currentProfile.first_name.toUpperCase()}}</v-list-tile-title>
              </v-list-tile-content>
            </template>
            <!-- <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
            </v-list-tile-action>-->
          </v-list-tile>
        </v-list>
        <client-only>
          <template >
            <template >
              <!-- <template v-if="currentUser.is_subscribed === 'yes'"> -->
              <template>
                <v-list class="pt-0 innerlistvodlix" dense>
                  <v-divider light></v-divider>
                  <v-list-tile to="/">
                    <v-list-tile-action>
                      <!-- <v-icon>home</v-icon> -->
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{$t("home")}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile to="/webseries">
                    <v-list-tile-action>
                      <!-- <v-icon>slideshow</v-icon> -->
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Web Series</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile to="/comedy">
                    <v-list-tile-action>
                      <!-- <v-icon>list_alt</v-icon> -->
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Comedy</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile to="/shows">
                    <v-list-tile-action>
                      <!-- <v-icon>av_timer</v-icon> -->
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{$t("tv_shows")}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile> 
                  <v-list-tile to="/action">
                    <v-list-tile-action>
                      <!-- <v-icon>av_timer</v-icon> -->
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Action</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile> 
                  <v-list-tile to="/drama">
                    <v-list-tile-action>
                      <!-- <v-icon>av_timer</v-icon> -->
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Drama</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                   <!-- <v-list-tile to="/international">
                    <v-list-tile-action>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>International</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile> -->
                  <!-- <v-list-tile to="/all?id=upcoming#4">
                    <v-list-tile-action>
                      <v-icon>list_alt</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Upcoming</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile> -->
                 
       
           <v-list-tile to="/starzplay">
                    <v-list-tile-action>
                      <!-- <v-icon>list_alt</v-icon> -->
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Starzplay</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  
                          
                  <v-list-tile to="/tvCollections/details/51">
                    <v-list-tile-action>
                      <!-- <v-icon>list_alt</v-icon> -->
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Pranks<small style="color:#FFC511;position: absolute;top: -5px;"> &nbsp;Free</small></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </template>
            </template>
          </template>
        </client-only>
      </v-navigation-drawer>
      <!-- mobile_inner-close-->
    </v-toolbar>
  </client-only>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "appHeader",
  data() {
    return {
      drawer: null,
      mini: false,
      profileImage: "",
      searchQuery: "",
      searchType: "series"
    };
  },
  computed: {
    // mapping store's getters into component
    ...mapGetters([
      "currentUser",
      "isAuthenticated",
      "configs",
      "currentRoute",
      "currentProfile"
    ])
  },
  methods: {
    // the Nuxt-auth logout
    async logout() {
       this.$fb.track("User Logout",{msisdn:this.currentUser.msisdn?this.currentUser.msisdn:"N/A"});

      await this.$auth.logout();

      await localStorage.clear();
      this.$store.commit("setCurrentProfile", false);
      // console.log("this.$universalCookie",this.$universalCookie);
      this.$universalCookie.removeAll();
      await this.$universalCookie.remove("currUserProfile");
      await this.$universalCookie.remove("profileTimer");
      await this.$router.push("/");
    },
    activateSearch() {
      let searchBar = this.$refs.search_bar;
      searchBar.classList.add("active");
    },
    setSearchType(searchType) {
      this.searchType = searchType;
      this.getMeSearch();
    },
    getMeSearch(e) {
              this.$fb.track("Search",{msisdn:this.currentUser.msisdn?this.currentUser.msisdn:"N/A",search:this.searchQuery});

      let query = this.searchQuery.trim();
      if (query.length >= 2)
        this.$router.push(
          `/search?q=${this.searchQuery}&type=${this.searchType}`
        );
    },
    documentClick(e) {
      console.log(e);
      let searchBar = this.$refs.search_bar;
      let target = e.target;
      if (searchBar !== target && !searchBar.contains(target)) {
        searchBar.classList.remove("active");
      }
    },
    getUserData() {
      if (this.$store.getters.currentUser) {
        let obj = {
          msisdn: this.$store.getters.currentUser.msisdn
        };
        axios
          .post("https://api.deikho.com/user/getStatus", obj)
          .then(response => {
            //  //console.log("response daat appheader", response);
            if (response.data.status) {
              let user_obj = response.data.data[0];
              this.$store.getters["profileImage"] = response.data.data[0].image;
              this.profileImage = response.data.data[0].image;
              if (typeof Storage !== "undefined") {
                // Code for localStorage/sessionStorage.
                localStorage.setItem("img", response.data.url);
                console.log("Setting local storage");
              } else {
                console.log("Sorry! No Web Storage suppor");

                // Sorry! No Web Storage support..
              }
              //  console.log("user_obj", user_obj);

              this.$store.getters.currentUser.is_subscribed =
                user_obj.status == "A" ? true : false;
              this.$store.getters.subscription_status =
                user_obj.status == "A" ? true : false;
              this.$store.getters.currentUser["plan_id"] = user_obj.plan_id;
              if (typeof Storage !== "undefined") {
                // Code for localStorage/sessionStorage.
                localStorage.setItem("img", user_obj.image);
                console.log("Setting local storage");
              } else {
                console.log("Sorry! No Web Storage suppor");

                // Sorry! No Web Storage support..
              }
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
      }
    },
    getIP() {
      console.log("getting ip");
      axios
        .get("https://api.deikho.com/api/getIP")
        .then(response => {
          console.log("get IP", response);
          let ip = response.data.IP;
          let currentIP = localStorage.getItem("IP");
          console.log("currentIP", currentIP);
          console.log("ip", ip);
          if (currentIP != ip) {
            console.log("network changed. request header");
            localStorage.setItem("network_changed", true);
          } else {
            console.log("same network. no request header");
                        localStorage.setItem("network_changed", false);

          }
          localStorage.setItem("IP", ip);
        })
        .catch(err => {
          console.log("error", err);
          return reject(err);
        });
    }
  },
  beforeMount() {
    var self = this;
    this.getUserData();
    try {
      var connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
      var type = connection.effectiveType;

      function updateConnectionStatus() {
        console.log("connection", connection);
        console.log("navigator", navigator);
        if (!self.profileImage) {
          self.getUserData();
        }
        console.log(
          "Connection type changed from " +
            type +
            " to " +
            connection.effectiveType
        );
                  self.getIP();

        // setTimeout(function() {
        //   self.getIP();
        // }, 2000);
        type = connection.effectiveType;
      }

      connection.addEventListener("change", updateConnectionStatus);
      updateConnectionStatus();
    } catch (err) {
      console.log("connection err");
      console.log(err);
    }
  },
  mounted() {
    document.addEventListener("click", this.documentClick);
    //console.log("this app header",this.$store);
    this.getUserData();
  },
  destroyed() {
    // important to clean up!!
    document.removeEventListener("click", this.documentClick);
  }
};
</script>
<style>

.login-link{
  display: grid;
  align-items: center;
}
.searchinner .searchbar .inputsrch {
  width: 88% !important;
}
.logo .v-image__image--cover {
  background-size: contain !important;
}
.searchbar {
  border-radius: 10px !important;
}
.v-input__slot {
  padding-left: 0;
  padding-right: 0;
}

@media only screen and (max-width: 767px) {
  .headerbg {
    width: 100vw;
  }
  .searchinner .searchbar .inputsrch {
    width: 85% !important;
  }
}
.searchinner .searchbar .inputsrch {
  /* margin-top:-42px; */
}
.searchinner .searchbar .inputsrch {
  /* margin-top:-42px; */
}
a:hover{
  text-decoration: none !important;  
}
.pulse {
  display: block;
  padding: 2px 3px;
  margin-left:4px;
  color:white;
  margin-top:-5px; 
  border-radius: 5px;
  background: #ffc511;
  cursor: pointer;
  animation: pulse 2s infinite;
}
.pulse:hover {
  animation: none;
}

@-webkit-keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(255,197,17, 0.4);
  }
  70% {
      -webkit-box-shadow: 0 0 0 10px rgba(255,197,17, 0);
  }
  100% {
      -webkit-box-shadow: 0 0 0 0 rgba(255,197,17, 0);
  }
}
@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(255,197,17, 0.4);
    box-shadow: 0 0 0 0 rgba(255,197,17, 0.4);
  }
  70% {
      -moz-box-shadow: 0 0 0 10px rgba(255,197,17, 0);
      box-shadow: 0 0 0 10px rgba(255,197,17, 0);
  }
  100% {
      -moz-box-shadow: 0 0 0 0 rgba(255,197,17, 0);
      box-shadow: 0 0 0 0 rgba(255,197,17, 0);
  }
}
</style>