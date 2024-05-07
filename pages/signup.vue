<template>
  <v-container mt-5 grid-list-xl text-xs-center align-center justify-center row>
    <v-layout row white mt-4 mx-1 elevation-6>
      <!-- <v-flex py-5 px-5 pb-0 loginform> -->

      <!-- Confirm password -->
      <v-flex loginform v-if="showconfirmPassowrd">
        <!-- <v-toolbar-title>SIGN IN TO THE SITE</v-toolbar-title> -->
        <form novalidate @submit.prevent="subscribeNow">
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
                  <p class="bm-0 text-black">Originality. Entertainment. Convenience.</p>
                </div>
              </div>
              <div class="text-center lrp-10">
                <!-- <h3 class="text-grey">Login</h3> -->
              </div>
              <br />
              <span class="text-grey">Enter Name and Password and click submit to proceed.</span>
            </div>
            <small>Password must be atleast 5 characters long.</small>
          </div>
          <div class="col-md-12" style="padding:2em ">
            <div
              class="row d-flex justify-content-center"
              style="
            padding: 0 7.50vmin;
             "
            >
              <div class="col-md-12" style="margin-top:8px;">
                <v-layout>
                  <v-text-field
                    v-model="fullName"
                    type="text"
                    name="full name"
                    placeholder="Full Name"
                    :error-messages="fullNameErrors"
                    @input="$v.fullName.$touch()"
                    @blur="$v.fullName.$touch()"
                  ></v-text-field>
                </v-layout>
              </div>
              <div class="col-md-12" style="margin-top:8px;">
                <v-layout>
                  <v-text-field
                    v-model="Password"
                    :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                    :type="showPassword ? 'text' : 'password'"
                    name="password"
                    placeholder="Password"
                    hint="At least 4 characters"
                    counter
                    :error-messages="passwordErrors"
                    @click:append="showPassword = !showPassword"
                    @input="$v.Password.$touch()"
                    @blur="$v.Password.$touch()"
                  ></v-text-field>
                </v-layout>
              </div>
              <div class="col-md-12" style="margin-top:8px;">
                <v-layout>
                  <v-text-field
                    v-model="c_Password"
                    :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                    :type="showPassword ? 'text' : 'password'"
                    name="confirm password"
                    placeholder="Confirm Password"
                    hint="At least 4 characters"
                    :error-messages="passwordErrorsC"
                    counter
                    @click:append="showPassword = !showPassword"
                    @input="$v.c_Password.$touch()"
                    @blur="$v.c_Password.$touch()"
                  ></v-text-field>
                </v-layout>
              </div>

              <br />

              <div class="col-md-12 lrp-0">
                <!-- <div class="iconre">
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
                    <template v-else>Submit</template>
                  </v-btn>

                  <p class="wrong-number" @click="gotoLogin()">
                    <span>Already have an account ?</span> Login here
                  </p>
                </div>
                <!-- <div class="col-md-6 ">
              <v-btn to="/signup" class = "float-left" round color="primary ">{{$t("create_account")}}</v-btn>
                </div>-->
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center stick-to-bottom">
            <small>
              * By registering you confirm that you accept the
              <a
                target="_blank"
                href="terms"
              >Terms and Conditions</a> and
              <span class>
                <a target="_blank" href="privacypolicy">Privacy Policy</a>
              </span>
            </small>
          </div>

          <!-- 
        <router-link class="forgot" to="/feed">{{$t("user_user_forgot_msg")}} -</router-link>
          <router-link class="forgot" to="/feed">{{$t("user_forgot_message")}}</router-link>-->

          <!-- mob_creataccounts -->
          <!-- <div class="text-xs-center my-4 hidden-md-and-up">
          <v-btn round color="primary v-bt" dark type="submit">{{$t("create_account")}}</v-btn>
          </div>-->
          <!-- mob_creataccounts-close -->
        </form>
      </v-flex>
      <!-- Mobile number enter -->

      <v-flex loginform v-if="showMobile">
        <!-- <v-toolbar-title>SIGN IN TO THE SITE</v-toolbar-title> -->
        <form novalidate @submit.prevent="sendOTP">
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
                  <p class="bm-0 text-black">Originality. Entertainment. Convenience.</p>
                </div>
              </div>
              <div class="text-center lrp-10">
                <!-- <h3 class="text-grey">Login</h3> -->
              </div>
              <br />
              <span class="text-grey">Enter your 11 digit mobile number below.</span>
            </div>

            <div class="col-md-12" style="padding:2em ">
              <div class="row d-flex justify-content-center" style="
    padding: 0 7.50vmin;
">
                <div class="col-md-12 d-flex justify-content-center">
                  <v-layout>
                    <v-text-field
                      v-model="phone"
                      ref="phone"
                      placeholder="03xxxxxxxxx"
                      name="mobile number"
                      :error-messages="phoneErrors"
                      @input="()=>{$v.phone.$touch()}"
                      @change="this.enableOTP"
                      @blur="$v.phone.$touch()"
                    ></v-text-field>
                  </v-layout>
                  <br />
                </div>

                <br />
                <div class="row d-flex justify-content-center">
                  <div class="col-md-12">
                    <br />

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
                      <template v-else>Continue</template>
                    </v-btn>

                    <p class="wrong-number" @click="gotoLogin()">
                      <span>Already have an account ?</span> Login here
                    </p>
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
            <small>
              * By registering you confirm that you accept the
              <a
                target="_blank"
                href="terms"
              >Terms and Conditions</a> and
              <span class>
                <a target="_blank" href="privacypolicy">Privacy Policy</a>
              </span>
            </small>
          </div>

          <!-- 
        <router-link class="forgot" to="/feed">{{$t("user_user_forgot_msg")}} -</router-link>
          <router-link class="forgot" to="/feed">{{$t("user_forgot_message")}}</router-link>-->

          <!-- mob_creataccounts -->
          <!-- <div class="text-xs-center my-4 hidden-md-and-up">
          <v-btn round color="primary v-bt" dark type="submit">{{$t("create_account")}}</v-btn>
          </div>-->
          <!-- mob_creataccounts-close -->
        </form>
      </v-flex>

      <!-- OTP -->
      <v-flex loginform v-if="showOTP">
        <!-- <v-toolbar-title>SIGN IN TO THE SITE</v-toolbar-title> -->
        <form novalidate @submit.prevent="setPassword">
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
                  <p class="bm-0 text-black">Originality. Entertainment. Convenience.</p>
                </div>
              </div>
              <div class="text-center lrp-10">
                <!-- <h3 class="text-grey">Login</h3> -->
              </div>
              <br />

              <span
                class="text-grey"
              >A 4-digit OTP from 1203 has been sent at your mobile number, Please enter and validate to proceed.</span>
            </div>

            <div class="col-md-12" style="padding:2em ">
              <div class="row d-flex justify-content-center" style="
    padding: 0 7.50vmin;
">
                <div class="col-md-12 d-flex justify-content-center">
                  <v-layout>
                    <v-text-field
                      class="otp"
                      id="code1"
                      :ref="'code1'"
                      v-model="otp1"
                      :error-messages="otpErrors1"
                      name="otp code 1"
                      maxlength="1"
                      @input="()=>{$v.otp1.$touch();
                      focusHandler('code2')}"
                      @blur="$v.otp1.$touch()"
                    ></v-text-field>

                    <v-text-field
                      class="otp"
                      :ref="'code2'"
                      v-model="otp2"
                      id="code2"
                      name="otp code 2"
                      maxlength="1"
                      :error-messages="otpErrors2"
                      @input="()=>{$v.otp2.$touch();
                      focusHandler('code3')}"
                      @blur="$v.otp2.$touch()"
                    ></v-text-field>

                    <v-text-field
                      class="otp"
                      v-model="otp3"
                      id="code3"
                      :ref="'code3'"
                      name="otp code 3"
                      :error-messages="otpErrors3"
                      @input="()=>{$v.otp3.$touch();
                      focusHandler('code4')}"
                      @blur="$v.otp3.$touch()"
                      maxlength="1"
                    ></v-text-field>

                    <v-text-field
                      class="otp"
                      v-model="otp4"
                      :ref="'code4'"
                      name="otp code 4"
                      id="code4"
                      :error-messages="otpErrors4"
                      @input="$v.otp4.$touch()"
                      @blur="$v.otp4.$touch()"
                      maxlength="1"
                    ></v-text-field>
                  </v-layout>
                  <br />
                </div>

                <br />
                <div class="row d-flex justify-content-center">
                  <div class="col-md-12">
                    <p>
                      <span class="timer">{{ timeLeft }}</span>
                      &nbsp;&nbsp;&nbsp;
                      <span
                        class="resend-code"
                        v-if="timeLeft=='00:00'"
                        @click="sendOTP"
                      >Resend Code</span>
                    </p>

                    <v-btn
                      round
                      color="primary v-bt"
                      class="btn-daikho text-center"
                      dark
                      type="submit"
                    >
                      <!-- @click="setPassword()" -->
                      <template v-if="loading">
                        <div class="spinner-border" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </template>
                      <template v-else>Validate</template>
                    </v-btn>
                    <p class="wrong-number" @click="Home()">
                      <span>Entered wrong number ?</span>
                    </p>
                    <p class="wrong-number" @click="gotoLogin()">
                      <span>Already have an account ?</span> Login here
                    </p>
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
            <small>
              * By registering you confirm that you accept the
              <a
                target="_blank"
                href="terms"
              >Terms and Conditions</a> and
              <span class>
                <a target="_blank" href="privacypolicy">Privacy Policy</a>
              </span>
            </small>
          </div>

          <!-- 
        <router-link class="forgot" to="/feed">{{$t("user_user_forgot_msg")}} -</router-link>
          <router-link class="forgot" to="/feed">{{$t("user_forgot_message")}}</router-link>-->

          <!-- mob_creataccounts -->
          <!-- <div class="text-xs-center my-4 hidden-md-and-up">
          <v-btn round color="primary v-bt" dark type="submit">{{$t("create_account")}}</v-btn>
          </div>-->
          <!-- mob_creataccounts-close -->
        </form>
      </v-flex>

      <!-- Subscribe -->
      <v-flex loginform v-if="showSubscribe">
        <!-- <v-toolbar-title>SIGN IN TO THE SITE</v-toolbar-title> -->

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
                <p class="bm-0 text-black">Originality. Entertainment. Convenience.</p>
              </div>
            </div>
            <div class="text-center lrp-10">
              <!-- <h3 class="text-grey">Subscribe</h3> -->
            </div>
            <br />

            <span class="text-grey">Select a pricing plan and click Subscribe to proceed.</span>

            <!-- <small
            class="text-grey"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut vulputate odio. Nulla facilisi.</small>-->
          </div>
          <div class="d-flex justify-content-center stick-to-bottom">
            <!-- <p><b>3 Active devices.</b>
          </p>
            -->
          </div>
          <div class="col-md-12" style="padding:2em ">
            <div class="row d-flex justify-content-center" style="
    padding: 0 7.50vmin;
">
              <div class="col-md-12" style=" ">
                <div class="row">
                  <div
                    :class="{'col-md-4 text-center border-line pointer sub-box selected':selectedPlan==1,'col-md-4 text-center border-line pointer sub-box':selectedPlan!=1}"
                    @click="subType1()"
                  >
                    <p>Daily</p>
                    <h4 class="bm-0">Rs. 6</h4>
                    <small class="fs-10">
                      inclusive of tax
                      <!-- <span class="red-clr">*</span> -->
                    </small>
                  </div>

                  <div
                    :class="{'col-md-4 text-center border-line pointer sub-box selected':selectedPlan==2,'col-md-4 text-center border-line pointer sub-box':selectedPlan!=2}"
                    @click="subType2()"
                  >
                    <p>Weekly</p>
                    <h4 class="bm-0">Rs. 30</h4>
                    <small class="fs-10">
                      inclusive of tax
                      <!-- <span class="red-clr">*</span> -->
                    </small>
                  </div>
                  <div
                    :class="{'col-md-4 text-center  pointer sub-box selected':selectedPlan==3,'col-md-4 text-center  pointer sub-box':selectedPlan!=3}"
                    @click="subType3()"
                  >
                    <p>Monthly</p>
                    <h4 class="bm-0">Rs. 90</h4>
                    <small class="fs-10">
                      inclusive of tax
                      <!-- <span class="red-clr">*</span> -->
                    </small>
                  </div>
                </div>
                <div class="row d-flex justify-content-center">
                  <small style="margin-top:5px">
                    Upon successful subscription, you will be able to watch 3 hours of
                    <b
                      style="color:##FFC511"
                    >FREE</b>
                    streaming daily on Deikho.
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-center" style="padding:15px 0">
            <!-- <b-button v-b-modal.modal-1 class="btn-daikho">
            <b>SUBSCRIBE NOW</b>
            </b-button>-->
            <div class="col-md-6">
              <v-btn
                round
                color="primary v-bt"
                class="btn-daikho text-center"
                dark
                @click="submitNow()"
              >
                <template v-if="loading">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </template>
                <template v-else>Subscribe</template>
              </v-btn>

              <p class="wrong-number" @click="gotoLogin()">
                <span>Already have an account ?</span> Login here
              </p>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <p>
              <!-- ? -->
              <!-- <span class="red-clr">See Details</span> -->
            </p>
          </div>
        </div>

        <div class="d-flex justify-content-center stick-to-bottom">
          <small>
            * By registering you confirm that you accept the
            <a
              target="_blank"
              href="terms"
            >Terms and Conditions</a> and
            <span class>
              <a target="_blank" href="privacypolicy">Privacy Policy</a>
            </span>
          </small>
        </div>

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
  alphaNum,
  numeric
} from "vuelidate/lib/validators";
import loader from "~/components/default/loader";
import axios from "axios";
export default {
  name: "signup",
  auth: false,
  middleware: ["guest"],
  head() {
    return {
      titleTemplate: this.$t("signup") + " - %s",
      meta: [
        {
          name: "description",
          content:
            "Signup and stream through the world of your favourite movies and TV shows"
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
      // models
      payment_Plans: {},
      selectedPlan: 1,
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
  computed: {
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.required && errors.push("Mobile number is required");
      !this.$v.phone.minLength &&
        errors.push("Mobile number must contain atleast 11 characters");
      !this.$v.phone.numeric &&
        errors.push("Mobile number must contain digits only");

      return errors;
    },
    otpErrors1() {
      const errors = [];
      if (!this.$v.otp1.$dirty) return errors;
      !this.$v.otp1.required && errors.push("Missing digit");

      return errors;
    },
    otpErrors2() {
      const errors = [];
      if (!this.$v.otp2.$dirty) return errors;
      !this.$v.otp2.required && errors.push("Missing digit");

      return errors;
    },
    otpErrors3() {
      const errors = [];
      if (!this.$v.otp3.$dirty) return errors;
      !this.$v.otp3.required && errors.push("Missing digit");

      return errors;
    },
    otpErrors4() {
      const errors = [];
      if (!this.$v.otp4.$dirty) return errors;
      !this.$v.otp4.required && errors.push("Missing digit");

      return errors;
    },
    //   otpErrors() {
    //   const errors = [];
    //   if (!this.$v.otp1.$dirty||this.$v.otp2.$dirty||this.$v.otp3.$dirty||this.$v.otp4.$dirty) return errors;
    //   (!this.$v.otp1.required||!this.$v.otp2.required||!this.$v.otp3.required||!this.$v.otp4.required) && errors.push("4 Digit code is required");
    //   (!this.$v.otp1.minLength||!this.$v.otp2.minLength||!this.$v.otp3.minLength||!this.$v.otp4.minLength) &&
    //     errors.push("4 digit code is required");
    //   (!this.$v.otp1.alphaNum ||!this.$v.otp2.alphaNum ||!this.$v.otp3.alphaNum ||!this.$v.otp4.alphaNum )&&
    //     errors.push("Only numbers allowed");
    //   return errors;
    // },
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Username is required");
      !this.$v.username.minLength &&
        errors.push("Username must contain atleast 4 characters");
      !this.$v.username.alphaNum &&
        errors.push("Username must be alphanumeric");
      return errors;
    },

    fullNameErrors() {
      const errors = [];
      if (!this.$v.fullName.$dirty) return errors;
      !this.$v.fullName.required && errors.push("Fullname is required");
      !this.$v.fullName.minLength &&
        errors.push("Fullname must contain atleast 4 characters");

      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.Password.$dirty) return errors;
      !this.$v.Password.required && errors.push("Password is required");
      !this.$v.Password.minLength &&
        errors.push("Minimum 5 characters required");
      !this.$v.Password.maxLength &&
        errors.push("Password must be 60 characters maximum");
      return errors;
    },
    passwordErrorsC() {
      const errors = [];
      if (!this.$v.c_Password.$dirty) return errors;
      !this.$v.c_Password.required && errors.push("Password is required");
      !this.$v.c_Password.minLength &&
        errors.push("Minimum 5 characters required");
      !this.$v.c_Password.maxLength &&
        errors.push("Password must be 60 characters maximum");
      !(
        this.$v.Password.$model == this.$v.c_Password.$model &&
        (this.$v.Password.$model != "" || this.$v.c_Password.$model != "")
      ) && errors.push("Password does not match.");
      return errors;
    }
  },
  validations: {
    username: { required, minLength: minLength(4), alphaNum },
    phone: {
      required,
      minLength: minLength(11),
      maxLength: maxLength(11),
      numeric
    },
    Password: { required, minLength: minLength(5), maxLength: maxLength(60) },
    c_Password: { required, minLength: minLength(5), maxLength: maxLength(60) },
    fullName: { required, minLength: minLength(2), maxLength: maxLength(60) },
    otp1: { required, minLength: minLength(1), maxLength: maxLength(1) },
    otp2: { required, minLength: minLength(1), maxLength: maxLength(1) },
    otp3: { required, minLength: minLength(1), maxLength: maxLength(1) },
    otp4: { required, minLength: minLength(1), maxLength: maxLength(1) }
  },
  methods: {
    setTime(seconds) {
      clearInterval(this.intervalTimer);
      this.timer(seconds);
    },
    timer(seconds) {
      const now = Date.now();
      const end = now + seconds * 1000;
      this.displayTimeLeft(seconds);

      this.selectedTime = seconds;
      // this.initialTime = seconds;
      this.displayEndTime(end);
      this.countdown(end);
      var _self = this;
      this.isExpired = false;
      setTimeout(function() {
        this.otp_server = "";
        _self.isExpired = true;
      }, 60000);
    },
    countdown(end) {
      // this.initialTime = this.selectedTime;
      this.intervalTimer = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) / 1000);

        if (secondsLeft === 0) {
          this.endTime = 0;
        }

        if (secondsLeft < 0) {
          clearInterval(this.intervalTimer);
          return;
        }
        this.displayTimeLeft(secondsLeft);
      }, 1000);
    },
    displayTimeLeft(secondsLeft) {
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      this.timeLeft = `${this.zeroPadded(minutes)}:${this.zeroPadded(seconds)}`;
    },
    displayEndTime(timestamp) {
      const end = new Date(timestamp);
      const hour = end.getHours();
      const minutes = end.getMinutes();

      this.endTime = `${this.hourConvert(hour)}:${this.zeroPadded(minutes)}`;
    },
    zeroPadded(num) {
      // 4 --> 04
      return num < 10 ? `0${num}` : num;
    },
    hourConvert(hour) {
      // 15 --> 3
      return hour % 12 || 12;
    },
    enableOTP() {
      this.otpDisabled = false;
    },
    hideAll() {
      clearInterval(this.intervalTimer);

      this.showconfirmPassowrd = false;
      this.showWeb = false;
      this.showMobile = false;
      this.showOTP = false;
      this.showSubscribe = false;
      this.showLogin = false;
    },
    focusHandler(id) {
      this.$refs[id].focus();
    },
    sendOTP() {
      // this.get_status();
      //      console.log("errors", this.errors);
      //     this.$v.$touch();

      // console.log(this);
      // console.log(this.$v.phone);
      if (this.otpDisabled) {
        
          this.is_valid().then(data => {
            console.log("is valid data", data);
            if (data.status) {
        this.hideAll();
        this.showconfirmPassowrd = true;
        this.$refs.code1.focus();}else {
              this.$store.commit("snackIt", data.msg);
            }
          });
      } else {
        this.otp1 = "";
        this.otp2 = "";
        this.otp3 = "";
        this.otp4 = "";
        if (this.$v.phone.$error) {
          this.$store.commit("snackIt", `Invalid Number`);
        } else {
          this.is_valid().then(data => {
            console.log("is valid data", data);
            if (data.status) {
              this.otp1 = "";
              this.otp2 = "";
              this.otp3 = "";
              this.otp4 = "";
              this.generate_otp();
              this.hideAll();
              this.timer(60);

              this.showOTP = true;
              this.$refs.code1.focus();
            } else {
              this.$store.commit("snackIt", data.msg);
            }
          });
        }
      }
    },
    subscribeNow() {
      console.log(this.$v);
      if (this.$v.fullName.$error || this.$v.fullName.$model == "") {
        this.$store.commit("snackIt", `Full name is required`);
      } else if (this.$v.Password.$error || this.$v.Password.$model == "") {
        this.$store.commit("snackIt", `Password is required`);
      } else if (this.$v.c_Password.$error || this.$v.c_Password.$model == "") {
        this.$store.commit("snackIt", `Password confirmation is required`);
      } else if (this.$v.c_Password.$model !== this.$v.Password.$model) {
        this.$store.commit("snackIt", `Password does not match`);
      } else {
        this.hideAll();
        this.showSubscribe = true;
      }
    },
    setPassword() {
      console.log("otp_server", this.otp_server);
      let my_otp =
        this.$v.otp1.$model +
        this.$v.otp2.$model +
        this.$v.otp3.$model +
        this.$v.otp4.$model;
      console.log("otp user", my_otp);
      console.log("this.isExpired", this.isExpired);
      if (this.isExpired) {
        this.$store.commit("snackIt", `Verification code expired`);
        return;
      }
      if (my_otp.length == 0) {
        this.$store.commit(
          "snackIt",
          `Enter your One Time Password to proceed.`
        );
        return;
      }
      if (parseInt(my_otp) == parseInt(this.otp_server)) {
        this.hideAll();
        this.showconfirmPassowrd = true;
      } else {
        this.$store.commit("snackIt", `Invalid Verification Code`);
      }
    },
    submitNow() {
      // this.hideAll();
      this.add_to_renewal();
    },
    gotoLogin() {
      this.$router.push("login");
    },
    Home() {
      this.hideAll();
      this.showMobile = true;
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
        this.$v.$touch();
        //if (!this.$v.$invalid) {
        //const token = await this.$recaptcha.getResponse()
        this.login();
        // console.log(token)
        //}
      } catch (error) {
        this.$store.commit("snackIt", `Please verify recaptcha first`);
        // console.log(error)
      }
    },
    setPreSignUpData: function() {
      try {
        this.$axios.get("/base/preSignupData").then(
          response => {
            var data = response.data.data;
            this.userCategories = data["user_categories"];
          },
          error => {
            console.log(error.response);
          }
        );
      } catch (err) {
        console.log(err);
      }
    },
    updateUser(userId) {
      var userObj = {
        userid: userId,
        first_name: this.fullName.split(" ")[0],
        last_name: this.fullName.split(" ")[1]
      };
      console.log("obj", userObj);
      try {
        this.$axios
          .post("/users/update", userObj)
          .then(response => {
            var statusCode = response.status;
            if (statusCode == "200") {
              // this.$store.commit(
              //   "snackIt",
              //   `${this.fullName}'s Update was a success you may login now`
              // );
              ///this.clearForm();
              //  this.$router.push("/login");
            } else {
              this.$store.commit(
                "snackIt",
                "Something went wrong please contact admin"
              );
            }
          })
          .catch(err => {
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
    },
    saveUser() {
      console.log("save user");
      this.processing = true;
      let self=this;
      var userObj = {
        //username: this.fullName.split(" ")[0],
        username: this.phone,
        //email:"",
        email: this.phone + "@test.com",
        phone: this.phone,
        password: this.Password,
        c_password: this.c_Password,
        country: "Pakistan",
        birthday: "1990-1-1",
        category: 4,
        sex: "-"
      };
      //testing
      try {
        this.$axios
          .post("/users/signup", userObj)
          .then(response => {
            var statusCode = response.status;
            console.log("save user response dekho", response);
            if (statusCode == "200") {
              this.$fireAnalyticsObj().logEvent("user_signup", {
                msisdn: self.phone,
                status: "successfull"
              });

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
              this.$fireAnalyticsObj().logEvent("user_signup", {
                msisdn: self.phone,
                status: "un-successfull"
              });

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

    async login() {
      // this.processing = true;
      this.$fb.track("User Login",{msisdn:this.phone});	

      console.log({
        username: this.phone,
        password: this.Password
      });
      this.loading = true;
      try {
        await this.$auth.loginWith("local", {
          data: {
            username: this.phone,
            password: this.Password
          }
        });
        this.$fireAnalyticsObj().logEvent("user_login", {
          msisdn: this.phone,
          status: "successfull"
        });

    let curr_ver = "1.0.12";
          localStorage.setItem("ver", curr_ver);
        var loggedInUser = this.$store.state.auth.user;
        this.$store.getters.currentUser["msisdn"] = this.phone;
        console.log("msisdn signup", this.$store.getters.currentUser.msisdn);
        this.$store.getters.currentUser["plan_id"] = this.selectedPlan;

        console.log(loggedInUser);
        this.updateUser();
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
          this.$fireAnalyticsObj().logEvent("user_login", {
            msisdn: this.phone,
            status: "un-successfull"
          });

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
    },
    async add_to_renewal() {
      let obj = {
        msisdn: this.phone,
        plan_id: this.selectedPlan,
        plan_cycle: 1,
        amount: this.payment_Plans[this.selectedPlan].amount,
        password: this.Password,
        source_id:"web"
      };
      let self=this;
      axios
        .post("https://api.deikho.com/user/add_auto", obj)
        .then(response => {
          var statusCode = response.status;
          console.log("status code", response);
          console.log("status code status", response.data.status);
          if (response.data.status) {
            this.$fireAnalyticsObj().logEvent("user_added_renewal", {
              msisdn: self.phone,
              status: "successfull",
              selected_plan: self.selectedPlan
            });

            console.log("dayay save");
            // store.getters.currentUser.is_subscribed=user_obj.status=="A"?true:false;
            //   this.$store.getters.currentUser["plan_id"]=user_obj.plan_id;
            // this.saveUser();
              this.$fb.track("User Signup",{msisdn:self.phone,plan:self.selectedPlan});	

              this.login();

               this.$fireAnalyticsObj().logEvent("user_signup", {
                msisdn: self.phone,
                status: "successfull"
              });
          } else {
            this.$fireAnalyticsObj().logEvent("user_added_renewal", {
              msisdn: self.phone,
              status: "un-successfull",
              selected_plan: self.selectedPlan
            });
  this.$fireAnalyticsObj().logEvent("user_signup", {
                msisdn: self.phone,
              status: "un-successfull",
              });
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
    is_valid() {
      let data = { msisdn: this.phone };

      return new Promise(function(resolve, reject) {
        try {
          axios
            .post("https://api.deikho.com/api/isAllowed", data)
            .then(response => {
              var statusCode = response.status;
              if (statusCode == "200") {
                resolve(response.data);
              }

              // else {
              //   resolve(false) ;

              //   this.$store.commit(
              //     "snackIt",
              //     "Something went wrong please billing contact admin"
              //   );
              // }
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
    generate_otp() {
      let _self = this;
      let obj = {
        msisdn: this.phone
      };
      // console.log("generate otp");
      axios
        .post("https://api.deikho.com/api/sendOtp", obj)
        .then(response => {
          var statusCode = response.data.data.status;
          // console.log("otp", response);
          if (statusCode) {
            // console.log("setting dataotp ", response.data);
            _self.otp_server = response.data.data.otp;
            // this.otp_server=response.data.data.otp;
          }
        })
        .catch(err => {
          return err;
        });
    },
    get_status() {
      let _self = this;
      let obj = {
        msisdn: this.phone
      };
      //console.log("get status", obj);
      axios
        .post("https://api.deikho.com/user/getStatus", obj)
        .then(response => {
          // //console.log("setting status ", response);
          //console.log("store", _self.$store);
          this.$store.getters.profileImage = response.data.data[0].image;
          if (typeof Storage !== "undefined") {
            // Code for localStorage/sessionStorage.
            localStorage.setItem("img", response.data.data[0].image);
            console.log("Setting local storage");
          } else {
            console.log("Sorry! No Web Storage suppor");

            // Sorry! No Web Storage support..
          }
          var statusCode = response.data.data.status;
          if (statusCode) {
            //console.log("setting status ", response.data);
            // this.$store.commit("setCurrentProfile", profile);
            //console.log(this.$store);
            // this.otp_server=response.data.data.otp;
          }
        })
        .catch(err => {
          return err;
        });
    },
    get_header() {
      {
        //   let status = true;

        // if (status) {
        //     console.log("status",status);
        //     this.hideAll();
        //     this.showconfirmPassowrd = true;
        //   }
        try {
          console.log(this.$route.query.no); // outputs 'yay'
          let msisdn = this.$route.query.no;
          if (msisdn) {
            this.phone = msisdn;

            this.hideAll();
            // this.otpDisabled = true;
            this.showMobile = true;
          }
          // this.showconfirmPassowrd = true;
          //   console.log("calling Enrichment ");

          //   axios
          //     .post("http://54.164.85.196/api/header_data", {})
          //     .then(response => {
          //       console.log("Enrichment ", response);
          //       let status = response.data.status;
          //       // let status = true;
          //       if (status) {
          //         console.log("status", status);
          //         console.log(
          //           "response.data.value",
          //           response.data.value.substr(2, response.data.value.length)
          //         );

          //         this.phone =
          //           "0" +
          //           response.data.value.substr(2, response.data.value.length);

          //         this.hideAll();
          //         this.otpDisabled=true;
          //         this.showconfirmPassowrd = true;
          //       }
          //     })
          //     .catch(err => {
          //       return err;
          //     });
        } catch (err) {}
      }
    },
    get_Plans() {
      console.log("Get Plans");
      let _self = this;
      axios
        .get("https://api.deikho.com/paymentPlan", {})
        .then(response => {
          //console.log("payment plans", response);
          let obj = {};
          response.data.data.map(item => {
            obj[item.id] = item;
          });
          //console.log("payment plans", obj);
          _self.payment_Plans = obj;
        })
        .catch(err => {
          console.log(err);
          return err;
        });
    }
  },
  beforeMount() {
    this.get_header();
    this.get_Plans();
  },
  mounted() {
    localStorage.clear();
    this.$universalCookie.getAll();
    this.$auth.logout();
    try {
      if (this.$refs.phone) this.$refs.phone.focus();
    } catch (err) {
      console.log(err);
    }
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
  border: 1px solid white;
  padding: 15px;
}
.sub-box:hover {
  color: white !important;
  background: #fec40f;
  transition: 0.3s easein;
  border: 1px solid #fec40f;
}
.selected {
  border: 1px solid #fec40f;
}
.otp {
  padding: 0 5px;
  width: 100px;
  text-align: center;
}
.otp input {
  text-align: center;
}
.timer {
  color: black;
}

.resend-code {
  cursor: pointer;
  color: #fec40f;
}
.resend-code:hover {
  color: red;
  text-decoration: underline;
}
.wrong-number {
  margin-top: 5px;
  cursor: pointer;
}
.wrong-number:hover {
  color: #fec40f !important;
  text-decoration: underline;
}
</style>