<template>
  <v-container mt-5 grid-list-xl text-xs-center align-center justify-center row >
    <v-layout row white mt-4 mx-1 elevation-6>
      <!-- <v-flex py-5 px-5 pb-0 subForm> -->
      <v-flex subForm>

        <!-- <v-toolbar-title>SIGN IN TO THE SITE</v-toolbar-title> -->
        <!-- <form novalidate @submit.prevent="validateUser"> -->
          <form>
     
      <div style="padding:2em;padding-bottom:15px;">
        <div class="text-center">
          <div class="row  justify-content-center" style="padding:15px">
            <div class="lrp-10 ">
            <img src="~/assets/images/logo_black.png" class="" width="100" style="margin-top:-10px" />
          </div>
            <div class="text-center lrp-10">
         
            <p class="bm-0 text-black">Movies, Online Seasons, Music</p>
            
          </div>
          </div>
            <div class="text-center lrp-10">

<h3 class="text-grey">Login</h3>
          </div>
          <!-- <small
            class="text-grey"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut vulputate odio. Nulla facilisi.</small> -->
        </div>
        <div class="col-md-12" style="padding:2em ">
          <div class="row d-flex justify-content-center" style="
    padding: 0 5vmin;
">
            <div class="col-md-12 d-flex justify-content-center" >

  <v-layout>

            <v-text-field
              v-model="username"
              placeholder="Username"
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
              :append-icon="showPassword ? 'visibility_off' : 'visibility'"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              placeholder="Password"
              hint="At least 4 characters"
              counter
              @click:append="showPassword = !showPassword"
              :error-messages="passwordErrors"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            ></v-text-field>
          </v-layout>
          </div>

          <br />
         
            <div class="col-md-12 lrp-0" >

          <div class="iconre">
            <v-checkbox v-model="rememberMe">
              <div slot="label">{{$t("remember_me")}}</div>
            </v-checkbox>
          </div>
          </div>
          <br/>
          <div class="row d-flex justify-content-center">

          <div class="col-md-12 ">
            <v-btn round color="primary v-bt" class="btn-daikho text-center" dark type="submit">
                        <template v-if="loading">
            <div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>
            </template>
                        <template v-else>
            
{{$t("login")}}
            </template>
              
            </v-btn>
          </div>
          <!-- <div class="col-md-6 ">
              <v-btn to="/signup" class = "float-left" round color="primary ">{{$t("create_account")}}</v-btn>
            </div> -->
            </div>
        </div>
        </div>
        <!-- <div class="d-flex justify-content-center" style="padding:15px 0">
          <b-button v-b-modal.modal-1 class="btn-daikho">
            <b>SUBSCRIBE NOW</b>
          </b-button>
        </div> -->
        <!-- <div class="d-flex justify-content-center">
          <p>
            
            <span class="red">See Details</span>
          </p>
        </div> -->
      </div>
      <div class="d-flex justify-content-center stick-to-bottom">
        <!-- <small>
          * Exclusive content available with unlimited browsing.
          <span class>fair usage policy</span> applies.
        </small> -->
      </div>
 
        
        </form>
<!-- 
        <router-link class="forgot" to="/feed">{{$t("user_user_forgot_msg")}} -</router-link>
        <router-link class="forgot" to="/feed">{{$t("user_forgot_message")}}</router-link> -->

        <!-- mob_creataccounts -->
        <!-- <div class="text-xs-center my-4 hidden-md-and-up">
          <v-btn round color="primary v-bt" dark type="submit">{{$t("create_account")}}</v-btn>
        </div> -->
        <!-- mob_creataccounts-close -->
      </v-flex>
      <!-- <div class="loginimg hidden-sm-and-down">
        <span class="backgroundcover"></span>
        <img src="~/static/images/coversin.gif" />
        <v-layout align-center justify-center reverse>
          <v-flex lg8 class="detls__Create_account">
            <div class="display-1 font-weight-black my-4">{{$t("create_account")}}</div>
            <div
              class="subheading"
            >Join to Start Sharing Video.It only takes a couple of minites to create your free account.</div>
           
          </v-flex>
        </v-layout>
      </div> -->
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
  alphaNum
} from "vuelidate/lib/validators";
import loader from "~/components/default/loader";
export default {
  name: "login",
  // middleware: ["guest"],
  // head() {
  //   return {
  //     titleTemplate: this.$t("login") + " - %s",
  //     meta: [
  //       {
  //         name: "description",
  //         content: "Login and review the demo of Best OTT Platfrom"
  //       }
  //     ]
  //   };
  // },
  data() {
    return {
      // dom
      showPassword: false,
      loading:false,
      processing: false,
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

  },
  validations: {
    username: { required, minLength: minLength(4), alphaNum },
    password: { required, minLength: minLength(4), maxLength: maxLength(60) }
  },
  methods: {
    onSuccess(token) {
      console.log("Succeeded:", token);
    },
    onError(error) {
      console.log("Error happened:", error);
    }
   
  },
  mounted() {
  }
  
};
</script>
<style>
.login .subForm form div button,.subForm .btn-daikho {
  border-radius: 25px;
  /* width: 200px; */
  padding: 0px 5em;
  font-size: 12px;
  height:36px !important;
  min-width: auto;
  background: #fec40f !important;
  border-color: #fec40f !important;
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.2);
  border: none;
  color: white;
}
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #1C1C1C !important;
}
:-moz-placeholder { /* Firefox 18- */
  color: #1C1C1C !important;
}
.theme--dark.v-input:not(.v-input--is-disabled) input, .theme--dark.v-input:not(.v-input--is-disabled) textarea {
  border-bottom:1px solid #bababa !important;
  border-top:0px !important;
  border-right:0px !important;
  border-left:0px !important;
  border-bottom-left-radius:0px !important;
  border-bottom-right-radius:0px !important;
  color:#1C1C1C !important;
  
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
    -webkit-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.subForm label,.subForm h2, .subForm p,.subForm.theme--dark.v-label,.subForm .theme--dark.v-icon{
  color:#1C1C1C !important;
}
.subForm .text-grey, .subForm small{
  color:#1F1F1F !important;
}
.white{
    border-radius:3px !important;

  background:white !important;
}
.login .subForm form div button:hover,.subForm .btn-daikho:hover {
  border-radius: 25px;
  /* width: 200px; */
  padding: 0px 5em;
  font-size: 12px;  border-color: #fec40f !important;
  height:36px !important;

  min-width: auto;
  background: #fec40f !important;
  border: none;
  color: white;
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.2);
  transition: all 300ms;
}
.container {
  max-width:800px !important;
}
.v-text-field .v-input__append-inner{
  margin-left:-30px;
  z-index:10; 
}
.subForm .v-input--selection-controls__input{
  margin-top:-10px;  
}
.lrp-0{
  padding-left:0px  !important;;
  padding-right:0px !important;
}
.lrp-10{
  padding-left:10px  !important;;
  padding-right:10px !important;
}
.subForm .v-btn--router {
   border-radius: 25px;
  /* width: 200px; */
  padding: 15px 5em;
  font-size: 12px;
  min-width: auto;
  height:36px ;

  /* background: #fec40f !important; */
  /* border-color: #fec40f !important; */
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.2);
  border: none;
  color: white;
}
.text-black{
  color:black !important;
}
</style>