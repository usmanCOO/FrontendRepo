<template>
  <v-container mt-5 grid-list-xl text-xs-center align-center justify-center row>
<template>

      <loader :msg="$t('please_stand_by')" />
</template>
   
       </v-container >
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
      otpDisabled:false,
      showWeb: false,
      showMobile: true,
      showOTP: false,
      showSubscribe: false,
      showLogin: false,
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
   
    get_header() {
      {
        //   let status = true;

        // if (status) {
        //     console.log("status",status);
        //     this.hideAll();
        //     this.showconfirmPassowrd = true;
        //   }
        try {
          console.log("calling Enrichment ");

          axios
            .post("http://www.deikho.com/api/header_data", {})
            .then(response => {
              console.log("Enrichment ", response);
              let status = response.data.status;
              // let status = true;
              if (status) {
                console.log("status", status);
                console.log(
                  "response.data.value",
                  response.data.value.substr(2, response.data.value.length)
                );

                this.phone =
                  "0" +
                  response.data.value.substr(2, response.data.value.length);

              }
      // redirect(`https://deikho.com/signup?no=${this.phone}`);
                       window.location.href = `https://deikho.com/signup?no=${this.phone}`


            })
            .catch(err => {
              return err;
            });
        } catch (err) {}
      }
    },

  },
  beforeMount() {
  },
  mounted() {
console.log("logout");
 this.$auth.logout();

       localStorage.clear();
      this.$store.commit("setCurrentProfile", false);
      // console.log("this.$universalCookie",this.$universalCookie);
      this.$universalCookie.removeAll();
       this.$universalCookie.remove("currUserProfile");
       this.$universalCookie.remove("profileTimer");
       this.$router.push("/");
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