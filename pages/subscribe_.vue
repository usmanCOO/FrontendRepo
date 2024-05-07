<template >
  <v-content class="sub_bg">
    <template>
      <v-container
        mt-5
        grid-list-xl
        text-xs-center
        align-center
        justify-center
        row
        class="loginform"
        style="max-width:650px !important;"
      >
        <v-layout row white mt-4 mx-1 elevation-6>
          <!-- <v-flex py-5 px-5 pb-0 loginform> -->
          <v-flex>
            <!-- <v-toolbar-title>SIGN IN TO THE SITE</v-toolbar-title> -->
            <form novalidate @submit.prevent="validateUser">
              <div style=" padding-bottom:15px;">
                <div class="text-center">
                  <div class="row justify-content-center" style="padding:15px">
                    <div class="lrp-10">
                      <img
                        src="~/assets/images/logo_black.png"
                        class
                        width="256"
                        style="margin-top:-10px"
                      />
                    </div>
                    <div class="text-center lrp-10">
                      <!-- <p class="bm-0 text-black">Originality. Entertainment. Convenience. -->

                      <!-- </p> -->
                    </div>
                  </div>
                </div>
                <div class="col-md-12" style="padding:2em ;padding-top:1em;">
                  <div
                    class="row d-flex justify-content-center"
                    style="
            padding: 0 7.50vmin;
             "
                  >
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
                          style="padding:0 3em; height:50px !important;
    font-size: 16px;
    font-weight: bolder;
    color: black;"
                        >
                          <template v-if="loading">
                            <div class="spinner-border" role="status">
                              <span class="sr-only">Loading...</span>
                            </div>
                          </template>
                          <template v-else>Subscribe</template>
                        </v-btn>
                      </div>
                      <small
                        class="text-grey"
                      >On subscription you will be charged Rs 6.00 daily inclusive of taxes.</small>
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
                <!-- <p>
              Don't have an account.
              <a href="http://www.deikho.com/sign_up">Click here to sign up.</a>
                </p>-->
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
      </v-container>
    </template>
  </v-content>
</template>

</v-content>
</template>
<script>
import {
  required,
  minLength,
  maxLength,
  alphaNum,
  numeric
} from "vuelidate/lib/validators";
import loader from "~/components/default/loader";
import axios from "axios";
export default {
  name: "Subscribe",
  auth: false,
  middleware: ["guest"],
  head() {
    return {
      titleTemplate: "Subscribe",
      meta: [
        {
          name: "Subscribe",
          content:
            "Subscribe and stream through the world of your favourite movies and TV shows"
        }
      ]
    };
  },
  data() {
    return {
      // dom
      intervalTimer: 0,
      showPassword: false,
      loading: false,
      processing: false,
      showconfirmPassowrd: false,
      otpDisabled: false,
      showWeb: false,
      showMobile: true,
      showOTP: false,
      showSubscribe: false,
      showLogin: false,
      insertId: "",
      // models
      payment_Plans: {},
      selectedPlan: 0,
      timeLeft: "00:00",
      isExpired: false,
      endTime: "0",
      fullName: "",
      Password: "",
      c_Password: "",
      otp_server: "",
      phone: "",
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",

      rememberMe: false
    };
  },
  components: {
    loader
  },
  computed: {},
  validations: {},
  methods: {
    log_User(activity, userAgent, remarks, isCharged) {
      console.log("Logging users", this.$route.query.tx_id);
      try {
        console.log("calling affiliate Logging ");
        let obj = {};
        if (isCharged) {
          obj = {
            msisdn: this.phone,
            remarks: remarks,
            id: this.insertId,
            tx_id: this.$route.query.tx_id,
            callback_id: this.$route.query.mid,

            isCharged: isCharged
          };
        } else {
          obj = {
            msisdn: this.phone,
            tx_id: this.$route.query.tx_id,
            activity: activity,
            callback_id: this.$route.query.mid,

            userAgent: ""
          };
        }

        axios
          .post("https://api.deikho.com/api/affiliateLogs", obj)
          // .post("http://localhost:4000/api/affiliateLogs", obj)
          .then(response => {
            console.log("response recorded", response);
            if (!isCharged) {
              this.insertId = response.data.data.insertId;
            }
          })
          .catch(err => {
            return err;
          });
      } catch (err) {}
    },
    async validateUser() {
      this.is_valid();
           self.$fireAnalyticsObj().logEvent(
                  "affiliate_subscribe_click",
                  {
                    tx_id: self.$route.query.tx_id,
                    msisdn: self.phone
                  }
                );
    },
    is_valid() {
      this.loading = true;

      let data = { msisdn: this.phone };
      if (this.phone == "" || this.phone == null || this.phone == undefined) {
        window.location.href = `https://deikho.com`;
      }
      let self = this;
      return new Promise(function(resolve, reject) {
        try {
          axios
            // .post("http://localhost:4000/api/isAllowed", data)
            .post("https://api.deikho.com/api/isAllowed", data)
            .then(response => {
              var statusCode = response.status;
              console.log("response", response);
              if (response.data.status) {
                console.log("charge user");
                self.$fireAnalyticsObj().logEvent(
                  "affiliate_marketing_success",
                  {
                    tx_id: self.$route.query.tx_id,
                    msisdn: self.phone
                  }
                );
                self.saveUser();
              } else {
                   self.$fireAnalyticsObj().logEvent(
                  "affiliate_marketing_exist",
                  {
                    tx_id: self.$route.query.tx_id,
                    msisdn: self.phone
                  }
                );
                window.location.href = `https://deikho.com/login?no=${self.phone}`;
                console.log("user exsist");
                self.log_User(
                  "User Subscribed ",
                  "N/A",
                  "Already Exist",
                  false
                );
              }
              if (statusCode == "200") {
                resolve(response.data);
              } else {
                resolve(false);

                // this.$store.commit(
                //   "snackIt",
                //   "Something went wrong please billing contact admin"
                // );
              }
            })
            .catch(err => {
              console.log("error", err);
              return reject(err);

              // if (!err.response) {
              //   this.$store.commit(
              //     "snackIt",
              //     "Server isn't responding please check if server is up or not"
              //   );
              // } else {
              //   let errorMsg = err.response.data.errors.error;
              //   console.log(err.response);
              //   this.$store.commit("snackIt", errorMsg[0]);
              // }
            });
        } catch (err) {
          return reject(err);
        }
      });
    },
    saveUser() {
      console.log("save user");
      this.processing = true;
      this.password = Math.floor(Math.random() * 90000) + 10000;
      this.add_to_renewal();
      var userObj = {
        //username: this.fullName.split(" ")[0],
        username: this.phone,
        //email:"",
        email: this.phone + "@test.com",
        phone: this.phone,
        password: this.password,
        c_password: this.password,
        country: "Pakistan",
        birthday: "1990-1-1",
        category: 4,
        sex: "-"
      };
      console.log("sign up", userObj);
      try {
        this.$axios
          .post("/users/signup", userObj)
          .then(response => {
            var statusCode = response.status;
            console.log("save user response dekho", response);
            if (statusCode == "200") {
              //  this.add_to_renewal(userObj);
              // this.$store.commit(
              //   "snackIt",
              //   `${this.fullName}'s signup was a success you may login now`
              // );
              ///this.clearForm();
              //  this.$router.push("/login");

              console.log("sign up", response);
              this.login();
            } else {
              this.$store.commit(
                "snackIt",
                "Something went wrong please contact admin"
              );
            }
          })
          .catch(err => {
            console.log(err);
            if (!err.response) {
              this.$store.commit(
                "snackIt",
                "Server isn't responding please check if server is up or not"
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(err.response);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          });
      } catch (err) {
        console.log(err);
      }
      this.processing = false;
    },
    async add_to_renewal() {
      let obj = {
        msisdn: this.phone,
        plan_id: 1,
        plan_cycle: 1,
        amount: 6,
        id: this.insertId,
        tx_id: this.$route.query.tx_id,
        callback_id: this.$route.query.mid,
        password: this.password
      };
      console.log("billing ", obj);
      axios
        .post("https://api.deikho.com/user/add_sub", obj)
        // .post("http://localhost:4000/user/add_sub", obj)

        .then(response => {
          var statusCode = response.status;
          console.log("billing status ", response);
          if (response.data.status) {
            // this.log_User(
            //   "User Landed on header",
            //   "N/A",
            //   "Added to renewal"
            // );

            console.log("dayay save");
            // store.getters.currentUser.is_subscribed=user_obj.status=="A"?true:false;
            //   this.$store.getters.currentUser["plan_id"]=user_obj.plan_id;
            // this.saveUser();
          } else {
            this.$store.commit(
              "snackIt",
              "Something went wrong please contact billing admin"
            );
          }
        })
        .catch(err => {
          console.log(err);
          // if (!err.response) {
          //   this.$store.commit(
          //     "snackIt",
          //     "Server isn't responding please check if server is up or not"
          //   );
          // } else {
          //   let errorMsg = err.response.data.errors.error;
          //   console.log(err.response);
          //   this.$store.commit("snackIt", errorMsg[0]);
          // }
        });
    },
    async login() {
      // this.processing = true;
      console.log({
        username: this.phone,
        password: this.password
      });
      this.loading = true;
      try {
        await this.$auth.loginWith("local", {
          data: {
            username: this.phone,
            password: this.password
          }
        });
        var loggedInUser = this.$store.state.auth.user;
        this.$store.getters.currentUser["msisdn"] = this.phone;
        console.log("msisdn signup", this.$store.getters.currentUser.msisdn);
        this.$store.getters.currentUser["plan_id"] = this.selectedPlan;

        console.log(loggedInUser);
        // this.updateUser();
        localStorage.setItem("network_changed", true);

        await this.setUserDefaultProfile(loggedInUser);
        //this.recordMyLog(loggedInUser.userid);
        /*
		    if(loggedInUser.is_subscribed != 'yes')
					this.$router.push('/subscription/plans');
				*/
        if (loggedInUser.level == 1) {
          await this.$store.commit("setAdminAuthorized");
        }
        await this.$router.push("/");
        // window.location.href = `https://deikho.com`;

        // await this.$router.push("/profiles");
        // await this.$store.commit(
        //   "snackIt",
        //   `Success, welcome ${this.username}`
        // );
      } catch (err) {
        this.$console("Found it!", "d");
        console.log(err);
        if (!err.response) {
          this.$store.commit(
            "snackIt",
            "Server isn't responding please check if server is up or not"
          );
        } else {
          var status = err.response.status;
          if (status == "401") {
            this.$store.commit("snackIt", "Username or password is invalid");
          } else if (status == "400") {
            this.$store.commit(
              "snackIt",
              "Either username or password is missing"
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
      this.$axios.get(`/users/list/${loggedInUser.userid}`).then(
        response => {
          let profiles = response.data.users.profile;
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
    }
  },
  beforeMount() {
    // this.get_header();
  },
  mounted() {
    this.phone = this.$route.query.no;
    console.log("phone", this.phone);
    this.log_User("User Landed header", "N/A", "User landed", false);
    this.$fireAnalyticsObj().logEvent("affiliate_marketing", {
      tx_id: this.$route.query.tx_id
    });
  }
};
</script>

<style>
.sub_bg {
  background: url("https://deikho.com/files/web/deikho-H.E-bg.jpg");

  display: grid;
  align-items: center;
  place-content: center;
  background-size: cover;
  background-position: center;
}
.loginform form button,
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