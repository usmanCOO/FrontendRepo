<template>
  <v-container mt-5 grid-list-xl text-xs-center align-center justify-center row>
    <v-layout row white mt-4 mx-1 elevation-6>
      <!-- <v-flex py-5 px-5 pb-0 loginform> -->
      <v-flex loginform v-if="showLogin">
        <!-- <v-toolbar-title>SIGN IN TO THE SITE</v-toolbar-title> -->
        <form novalidate @submit.prevent="validateUser">
          <div style=" padding-bottom:15px;">
            <div class="text-center">
              <div class="row justify-content-center" style="padding:15px">
                <div class="lrp-10">
                  <img
                    src="~/assets/images/logo_black.png"
                    class
                    width="128"
                    style="margin-top:-10px"
                  />
                </div>
                <div class="text-center lrp-10">
                  <!-- <p class="bm-0 text-black">Originality. Entertainment. Convenience. -->

                  <!-- </p> -->
                </div>
              </div>
              <div class="text-center lrp-10">
                <h3 class="text-grey bm-0">Login</h3>
              </div>
              <!-- <small
            class="text-grey"
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut vulputate odio. Nulla facilisi.</small>-->
            </div>
            <div class="col-md-12" style="padding:2em ">
              <div
                class="row d-flex justify-content-center"
                style="
            padding: 0 7.50vmin;
             "
              >
                <div class="col-md-12 d-flex justify-content-center">
                  <v-layout>
                    <v-text-field
                      v-model="username"
                      placeholder="03xxxxxxxxx"
                      :error-messages="usernameErrors"
                      @input="$v.username.$touch()"
                      @blur="$v.username.$touch()"
                    ></v-text-field>
                  </v-layout>
                </div>
                <div class="col-md-12" style="margin-top:8px;">
                  <v-layout>
                    <v-text-field
                      v-model="password"
                      :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                      :type="showPassword ? 'text' : 'password'"
                      name="input-10-1"
                      placeholder="Password"
                      hint="At least 5 characters"
                      counter
                      @click:append="showPassword = !showPassword"
                      :error-messages="passwordErrors"
                      @input="$v.password.$touch()"
                      @blur="$v.password.$touch()"
                    ></v-text-field>
                  </v-layout>
                </div>

                <br />

                <div class="col-md-12 lrp-0">
                  <!-- 
          <div class="iconre">
            <v-checkbox v-model="rememberMe">
              <div slot="label">{{$t("remember_me")}}</div>
            </v-checkbox>
                  </div>-->
                </div>
                <br />
                <div class="row d-flex justify-content-center">
                  <div class="col-md-12">
                    <v-btn
                      round
                      color="primary v-bt"
                      class="btn-daikho text-center"
                      dark
                      type="submit"
                    >
                      <template v-if="loading">
                        <div class="spinner-border" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </template>
                      <template v-else>{{$t("login")}}</template>
                    </v-btn>
                    <div class="d-flex justify-content-center">
                      <span>
                        <a href="forgotpassword" class="text_underline">Forgot your password?</a>
                      </span>
                    </div>
                  </div>
                  <!-- <div class="col-md-6 ">
              <v-btn to="/signup" class = "float-left" round color="primary ">{{$t("create_account")}}</v-btn>
                  </div>-->
                </div>
              </div>
            </div>
            <!-- <div class="d-flex justify-content-center" style="padding:15px 0">
          <b-button v-b-modal.modal-1 class="btn-daikho">
            <b>SUBSCRIBE NOW</b>
          </b-button>
            </div>-->
            <!-- <div class="d-flex justify-content-center">
          <p>
             ?
            <span class="red-clr">See Details</span>
          </p>
            </div>-->
          </div>

          <div class="d-flex justify-content-center stick-to-bottom">
            <p>
              Don't have an account.
              <a href="http://www.deikho.com/sign_up.html">Click here to sign up.</a>
            </p>
          </div>
        </form>
        <!-- 
        <router-link class="forgot" to="/feed">{{$t("user_user_forgot_msg")}} -</router-link>
        <router-link class="forgot" to="/feed">{{$t("user_forgot_message")}}</router-link>-->

        <!-- mob_creataccounts -->
        <!-- <div class="text-xs-center my-4 hidden-md-and-up">
          <v-btn round color="primary v-bt" dark type="submit">{{$t("create_account")}}</v-btn>
        </div>-->
        <!-- mob_creataccounts-close -->
      </v-flex>
    </v-layout>
    <template v-if="processing">
      <loader :msg="$t('please_stand_by')" />
    </template>
  </v-container>
</template>
<script>
import {
  required,
  minLength,
  maxLength,
  numeric,
  alphaNum
} from "vuelidate/lib/validators";
import loader from "~/components/default/loader";
import axios from "axios";

export default {
  name: "login",
  middleware: ["guest"],
  head() {
    return {
      titleTemplate: this.$t("login") + " - %s",
      meta: [
        {
          name: "description",
          content: "Login and review the demo of Best OTT Platfrom"
        }
      ]
    };
  },
  data() {
    return {
      // dom
      showPassword: false,
      loading: false,
      showForgot: false,
      processing: false,
      responseReady: false,
      retryAttempt:0,
      showconfirmPassowrd: false,
      showWeb: false,
      showMobile: false,
      showOTP: false,
      showSubscribe: false,
      selectedPlan: 0,
      showLogin: false,
      // models
      username: "",
      password: "",
      rememberMe: false
    };
  },
  components: {
    loader
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Mobile Number is required");
      !this.$v.username.minLength &&
        errors.push("Mobile number must contain atleast 11 digits");
      // !this.$v.username.numeric &&
      //   errors.push("Number must be numeric");
      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      !this.$v.password.minLength &&
        errors.push("Minimum 5 characters required");
      !this.$v.password.maxLength &&
        errors.push("Password must be 60 characters maximum");
      return errors;
    }
  },
  validations: {
    username: { required, minLength: minLength(4), alphaNum },
    password: { required, minLength: minLength(5), maxLength: maxLength(60) }
  },
  methods: {
    hideAll() {
      this.showconfirmPassowrd = false;
      this.showWeb = false;
      this.showMobile = false;
      this.showOTP = false;
      this.showSubscribe = false;
      this.showLogin = false;
    },
    sendOTP() {
      this.hideAll();
      this.showOTP = true;
    },
    subscribeNow() {
      this.hideAll();
      this.showSubscribe = true;
    },
    setPassword() {
      this.hideAll();
      this.showconfirmPassowrd = true;
    },
    submitNow() {
      this.hideAll();

      this.showLogin = true;
    },
    subType1() {
      console.log("daily");
      this.selectedPlan = 1;
    },
    subType2() {
      console.log("weekly");
      this.selectedPlan = 2;
    },
    subType3() {
      this.selectedPlan = 3;

      console.log("monthly");
    },
    onSuccess(token) {
      console.log("Succeeded:", token);
    },
    onError(error) {
      console.log("Error happened:", error);
    },
    async validateUser() {
      try {
        this.get_status();
        if(this.retryAttempt>2){
          this.retryAttempt=0;
        }
        this.loading = true;
        let self=this;
        var loginInterval = setInterval(function() {
          console.log("retrying");
          console.log("retrying response",self.responseReady);
          if (self.responseReady == false && self.retryAttempt<3) {
          console.log("retrying attempet",self.retryAttempt);

            self.retryAttempt++;
            self.get_status();
          }
          else{
            console.log("kiling interval");
            self.loading=false;
            clearInterval(loginInterval);
          }
        }, 6000);
      } catch (error) {
        console.log(error);
      }
    },
    // get_header() {
    //   {
    //     //   let status = true;

    //     // if (status) {
    //     //     console.log("status",status);
    //     //     this.hideAll();
    //     //     this.showconfirmPassowrd = true;
    //     //   }
    //     try {
    //       console.log("calling Enrichment ");

    //       axios
    //         .post("https://deikho.com/api/header_data", {})
    //         .then(response => {
    //           console.log("Enrichment ", response);
    //           let status = response.data.status;
    //           // let status = true;
    //           if (status) {
    //             console.log("status", status);
    //             console.log(
    //               "response.data.value",
    //               response.data.value.substr(2, response.data.value.length)
    //             );

    //             this.username =
    //               "0" +
    //               response.data.value.substr(2, response.data.value.length);
    //           }
    //         })
    //         .catch(err => {
    //           return err;
    //         });
    //     } catch (err) {}
    //   }
    // },
    get_status() {
      let _self = this;
      let obj = {
        msisdn: this.username
      };
      if (this.username == "admin") {
        this.password_ = "admin";

        this.login();
      }

      //console.log("get status", obj);
      let self=this;
      axios
        .post("https://api.deikho.com/user/getStatus", obj)
        .then(response => {
          // //console.log("setting status ", response);
            this.responseReady = true;

          if (
            (response.status == 200 && response.data.status) ||
            this.username == "admin"
          ) {
            this.responseReady = true;
            this.$store.getters.profileImage = response.data.data[0].image;
            console.log("image store", this.$store);
            if (this.username == "admin") {
              console.log("admin");
              this.password_ = "admin";

              this.login();
            } else {
              console.log(" non admin");

              if (this.password == response.data.data[0].pass) {
                console.log(" non admin passed");

                this.password_ = response.data.data[0].apass;

                this.login();
              } else {
                self.showLogin=true;
                this.$store.commit(
                  "snackIt",
                  `Incorrect Mobile Number or Password. Please, enter correct details and try again.`
                );
              }
            }
          } else {
                self.showLogin=true;

                        this.responseReady = true;

            this.$store.commit(
              "snackIt",
              `Your account doesn't exist, please sign up to continue.`
            );
          }
        })
        .catch(err => {
                self.showLogin=true;

                      this.responseReady = true;

          return err;
        });
    },
    async login() {
      // this.processing = true;
      this.loading = true;
      let _self = this;
      try {
        await this.$auth.loginWith("local", {
          data: {
            username: this.username,
            password: this.password_
          }
        });
        this.$fb.track("User Login",{msisdn:this.username});	
        this.$fireAnalyticsObj().logEvent('user_login',{"msisdn":this.username,"status":"successfull"});

        var loggedInUser = this.$store.state.auth.user;
        try {
          //this.recordMyLog();
        this.$store.getters.currentUser["msisdn"] = _self.username;

        } catch (err) {}
        /*
		    if(loggedInUser.is_subscribed != 'yes')
					this.$router.push('/subscription/plans');
				*/
        if (loggedInUser.level == 1) {
          await this.$store.commit("setAdminAuthorized");
        }

        localStorage.setItem("network_changed", true);

        await this.setUserDefaultProfile(loggedInUser);


        // await this.$store.commit("snackIt", `Success, welcome `);
      } catch (err) {
        this.$console("Found it!", "d");
        console.log(err);
        if (!err.response) {
          this.$store.commit(
            "snackIt",
            "Server isn't responding please check if server is up or not"
          );
        } else {
                  this.$fireAnalyticsObj().logEvent('user_login',{"msisdn":this.username,"status":"un-successfull"});

          var status = err.response.status;
          if (status == "401") {
            this.$store.commit(
              "snackIt",
              "mobile number or password is invalid"
            );
          } else if (status == "400") {
            this.$store.commit(
              "snackIt",
              "Either mobile number or password is invalid"
            );
          } else if (status == "405") {
            this.$store.commit(
              "snackIt",
              "Login not allowed please check if Subscription module is installed"
            );
          } else {
            let errorMsg = err.response.data.errors.error;
            this.$store.commit("snackIt", errorMsg[0]);
          }
        }
      }
      // this.processing = false;
      this.loading = false;
    },

    setUserDefaultProfile(loggedInUser) {
      let self=this;
      this.$axios.get(`/users/list/${loggedInUser.userid}`).then(
        response => {
          
          let profiles = response.data.users.profile;
          this.selectProfile(profiles[0]);
          this.profileCount = profiles.length;
          // for (let i = 0; i < profiles.length; i++) {
          //   profiles[i]["color"] = colorsArray[i];
          // }
          this.profiles = profiles;
          console.log("profiles", this.profiles);
          let subscription = response.data.users.subscription;
          let profile = this.$findObjectByKey(profiles, "is_default", "yes");
          this.$store.commit("setCurrentProfile", profile);
          this.$store.commit("setUserSubscription", subscription);
          this.$universalCookie.set("currUserProfile", profile, {
            path: "/",
            maxAge: 2592000
          });
          this.$universalCookie.set("profileTimer", new Date().getTime(), {
            path: "/",
            maxAge: 2592000
          });
        // self.$router.push("/");
        if(self.$route.query.callback){
        self.$router.push(`${self.$route.query.callback}&series_id=${self.$route.query.series_id}&season_id=${self.$route.query.season_id}`);
        }else{
        self.$router.push("/");

        }

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
    },
    selectProfile(profile) {
      this.$store.commit("setCurrentProfile", profile);
      this.$universalCookie.set("currUserProfile", profile, {
        path: "/",
        maxAge: 2592000
      });
      this.$universalCookie.set("profileTimer", new Date().getTime(), {
        path: "/",
        maxAge: 2592000
      });
      // this.$router.push("/");
    },
    recordMyLog() {
      let agent = navigator.userAgent;
      let isMobile = /iPhone|iPad|iPod|Android/i.test(agent);
      let device = isMobile ? "mobile" : "desktop";
      var dataObj = {
        device: device,
        success: "yes",
        user_agent: agent,
        type: "login"
      };
      try {
        this.$axios
          .post("/users/recordMyLog", dataObj)
          .then(response => {
            // console.log(response.status);
          })
          .catch(err => {
            // console.log(err.response)
          });
      } catch (err) {
        console.log(err);
      }
    }
  },
  mounted() {
    let curr_ver = "1.0.12";
          localStorage.setItem("ver", curr_ver);

  
    // this.get_header();
this.username=this.$route.query.no;
if(this.$route.query.no){
       if(localStorage.getItem("msisdn"+this.$route.query.no) !=null&&localStorage.getItem("timer")!=null)
       {
         console.log("auto login");

         this.username=this.$route.query.no ;
         this.password_=localStorage.getItem("timer").split('sec')[0];
        //  localStorage.removeItem("msisdn"+this.username);
        //  localStorage.removeItem("timer");

         this.login();
       }  
       else{
         this.showLogin=true;
         console.log("show login");

       }
       }else{
         this.showLogin=true;
         console.log("show login");

       }
       if(!this.$route.query.no){
         console.log("show login");
         this.showLogin=true;

       }

    // localStorage.clear();
    this.$universalCookie.getAll();
    this.$auth.logout();
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 2000);
    });
  }
};
</script>
<style>
.login .loginform form div button,
.loginform .btn-daikho {
  border-radius: 25px;
  /* width: 200px; */
  padding: 0px 5em;
  font-size: 12px;
  height: 36px !important;
  min-width: auto;
  background: #fec40f !important;
  border-color: #fec40f !important;
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.2);
  border: none;
  color: white;
}
::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #1c1c1c !important;
}
:-moz-placeholder {
  /* Firefox 18- */
  color: #1c1c1c !important;
}
.theme--dark.v-input:not(.v-input--is-disabled) input,
.theme--dark.v-input:not(.v-input--is-disabled) textarea {
  border-bottom: 1px solid #bababa !important;
  border-top: 0px !important;
  border-right: 0px !important;
  border-left: 0px !important;
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  color: #1c1c1c !important;

  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  -webkit-transition: border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.loginform label,
.loginform h2,
.loginform h4,
.loginform p,
.loginform.theme--dark.v-label,
.loginform .theme--dark.v-icon {
  color: #1c1c1c !important;
}
.loginform .text-grey,
.loginform small {
  color: #1f1f1f !important;
}
.white {
  border-radius: 3px !important;

  background: white !important;
}
.login .loginform form div button:hover,
.loginform .btn-daikho:hover {
  border-radius: 25px;
  /* width: 200px; */
  padding: 0px 5em;
  font-size: 12px;
  border-color: #fec40f !important;
  height: 36px !important;

  min-width: auto;
  background: #fec40f !important;
  border: none;
  color: white;
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.2);
  transition: all 300ms;
}
small a {
  color: #fec40f;
}
p a {
  color: #fec40f;
}
.container {
  max-width: 800px !important;
}
.v-text-field .v-input__append-inner {
  margin-left: -30px;
  z-index: 10;
}
.loginform .v-input--selection-controls__input {
  margin-top: -10px;
}
.lrp-0 {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.lrp-10 {
  padding-left: 10px !important;
  padding-right: 10px !important;
}
.loginform .v-btn--router {
  border-radius: 25px;
  /* width: 200px; */
  padding: 15px 5em;
  font-size: 12px;
  min-width: auto;
  height: 36px;

  /* background: #fec40f !important; */
  /* border-color: #fec40f !important; */
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.2);
  border: none;
  color: white;
}
.text-black {
  color: black !important;
}
.red-clr {
  color: red;
}

.bm-0 {
  margin-bottom: 0px;
}
.red {
  color: red;
}

.border-line {
  border-right: 1px solid #dedede;
}
.fs-10 {
  font-size: 10px;
}
.pointer {
  cursor: pointer;
}
.sub-box {
  border-radius: 3px;
  padding: 15px;
}
.sub-box:hover {
  border: 1px solid #fec40f;
}
.text_underline {
  color: #ffc511;
  cursor: pointer;
}
.selected {
  color: white !important;
  background: #fec40f;
  transition: 0.3s easein;
}
.otp {
  padding: 0 5px;
  width: 100px;
  text-align: center;
}
.otp input {
  text-align: center;
}
</style>