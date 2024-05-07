<template>
  <div>
    <div class="row bg-grey main-section" center>
      <div class="col-lg-6 p-30">
        <h1 class="white-color">Customer Service</h1>
        <p class="white-color">
     	Any comments or suggestions? We’d love to hear from you. Drop your message to us.
        </p>
      </div>

      <div class="col-lg-6 lrp-30 d-flex justify-content-center">
        <div class="card">
          <div class="card-body contactus">
            <h5 class="card-title" style="color:black">For feedback or complains. </h5>
            <p style="color:black">Submit your message here.</p>
            <div>
              <!-- <small
                class="card-text"
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut vulputate odio. Nulla facilisi</small>-->
            </div>
            <br />
        <form novalidate @submit.prevent="submit">
              
 <v-flex xs12 sm12 md12>
                <v-text-field 
                
                  :label="'Enter name here'"
                  v-model="fullName"
                  :error-messages="fullNameErrors"
                  @input="$v.fullName.$touch()"
                  @blur="$v.fullName.$touch()"
                ></v-text-field>
              </v-flex>            
                <br />
         
 <v-flex xs12 sm12 md12>
                <v-text-field 
                
                  :label="'Enter mobile number here'"
                  v-model="phone"
                  :error-messages="phoneErrors"
                  @input="$v.phone.$touch()"
                  @blur="$v.phone.$touch()"
                ></v-text-field>
              </v-flex>                      <br />
              
              <v-flex xs12 sm12 md12>
                <v-text-field 
                
                  :label="'Enter email here'"
                  v-model="userEmail"
                  :error-messages="emailErrors"
                  @input="$v.userEmail.$touch()"
                  @blur="$v.userEmail.$touch()"
                ></v-text-field>
              </v-flex>
                     <br />
                     
                        <v-flex xs12 sm12 md12>
                <v-textarea 
                
                  :label="'Write your message here'"
                  v-model="userQuery"
               
                ></v-textarea>
              </v-flex>

              <!-- <textarea class="form-control" placeholder="Message" rows="5" id="query" required></textarea> -->
              <br />
              
              <br />
              <div class="d-flex justify-content-center">
                <b-button v-b-modal.modal-1 class="btn-daikho"            id="btn-1"         type="submit"
>
                  <b>Send</b>
                </b-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="section-box">
      <!-- <div class="row section-box-body">
        <div class="col-md-8 trending-info">
          <h1>Trending Now</h1>
          <h3>To Be Honest</h3>
          <p>If your matter requires customer service, please refer to help.deikho.com for appropriate contact information. We do not respond to customer service issues through this site.</p>
        </div>

        <div class="col-md-4">
          <img
            src="https://deikho.com/files/web/tbh.jpg"
            class="trending-img thumbnail"
            height="400"
          />
        </div>
      </div>-->
    </div>
  </div>
</template>
<script>
import {
  required,
  minLength,
  maxLength,
  alphaNum,
  email,
  numeric
} from "vuelidate/lib/validators";
import loader from "~/components/default/loader";
import axios from "axios";
export default {
  name: "ContactUs",
  head() {
    return {
      // titleTemplate: this.$t("signup") + " - %s",
      meta: [
        // {
        //   name: "description",
        //   content:
        //     "Signup and stream through the world of your favourite movies and TV shows"
        // }
      ]
    };
  },
  data() {
    return {
      // dom
      intervalTimer: 0,
      showPassword: false,
      loading: false,
      userEmail:"",
      userQuery:"",
      processing: false,
      showconfirmPassowrd: false,
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
   
    fullNameErrors() {
      const errors = [];
      if (!this.$v.fullName.$dirty) return errors;
      !this.$v.fullName.required && errors.push("Fullname is required");
      !this.$v.fullName.minLength &&
        errors.push("Fullname must contain atleast 4 characters");

      return errors;
    },
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
    emailErrors() {
      const errors = [];
      if (!this.$v.userEmail.$dirty) return errors;
      !this.$v.userEmail.required && errors.push(this.$t("usr_email_err2"));
      !this.$v.userEmail.email && errors.push(this.$t("usr_email_err2"));
      return errors;
    },
   
   
  },
  validations: {
    username: { required, minLength: minLength(4), alphaNum },
        userEmail: { required, email },
        userQuery: { required },

    phone: {
      required,
      minLength: minLength(11),
      maxLength: maxLength(11),
      numeric
    },
    Password: { required, minLength: minLength(5), maxLength: maxLength(60) },
    c_Password: { required, minLength: minLength(5), maxLength: maxLength(60) },
    fullName: { required, minLength: minLength(2), maxLength: maxLength(60) },
    fullName: { required, minLength: minLength(2), maxLength: maxLength(60) },
    otp1: { required, minLength: minLength(1), maxLength: maxLength(1) },
    otp2: { required, minLength: minLength(1), maxLength: maxLength(1) },
    otp3: { required, minLength: minLength(1), maxLength: maxLength(1) },
    otp4: { required, minLength: minLength(1), maxLength: maxLength(1) }
  },
  methods: {
    submit() {
       if (this.$v.fullName.$error || this.$v.fullName.$model == "") {
        this.$store.commit("snackIt", `Full name is required`);
      }
      else if (this.$v.phone.$error || this.$v.phone.$model == "") {
              this.$store.commit("snackIt", `Mobile number is required`);

      }
       else if (this.$v.userEmail.$error || this.$v.userEmail.$model == "") {
              this.$store.commit("snackIt", `Email is required`);

      } else if(this.$v.userQuery.$model==""){
              this.$store.commit("snackIt", `Message body is required`);

      }
      else{
       document.getElementById('btn-1').disabled = true;
      let obj = {
        name: this.fullName+"Regards: "+this.phone,
        userEmail: this.userEmail,
        to: "deikho19@gmail.com",
        mailBody: this.userQuery,
        mailSub: "Contact-Us"
      };
      // console.log("Email obj",obj);
      axios
        .post("https://api.deikho.com/api/sendMail", obj)
        // .post("http://localhost:4000/api/sendMail", obj)

        .then(response => {

          // //console.log("response daat appheader", response);
      this.fullName="";
      this.phone="";
      this.userEmail="";
      this.userQuery="";
    
          this.$store.commit("snackIt", "Your message has been sent. We will reply you back on your entered email.");
        })
        .catch(err => {
          console.log(err);
          return err;
       document.getElementById('btn-1').disabled = false;

        });
      }
    }
  },
  beforeMount() {},
  mounted() {}
};
</script>

<style >
.white-color {
  color: white;
}
.p-30 {
  padding: 50px;
}
.card-body {
  padding: 4vmin 7vmin;
}

.thumbnail {
  box-shadow: 7px 11px 5px 3px #0101011c;
}
.contactus .theme--dark.v-input:not(.v-input--is-disabled) input, .theme--dark.v-input:not(.v-input--is-disabled) textarea{color:black !important;}
.trending-info {
}
.contactus input{
  color:black;}
  .contactus .v-label {
    color: grey;
  }
  .contactus .theme--dark.v-text-field > .v-input__control > .v-input__slot:before {
    border-color: rgba(187, 187, 187, 0.7);
}
.bg-grey {
  background: grey;
}
.section-box-body {
  display: inline-flex;
  align-items: center;
}
.main-section {
  height: auto;
  padding: 5vmin 1vmin;
  background: url("https://deikho.com/files/web/contact_texture.png");
  display: inline-flex;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  align-items: center;
}
@media only screen and (min-width: 767px)
{
.main-section 
{
  padding: 20vmin 10vmin;

} 
}
.section-box {
  padding: 5vmin 15vmin;
}
.lrp-30 {
  padding-left: 30px;
  padding-right: 30px;
}
.btn-daikho {
  border-radius: 25px;
  /* width: 200px; */
  padding: 15px 8em;
  font-size: 12px;
  min-width: auto;
  background: #fec40f;
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.2);
  border: none;
  color: white;
}
.btn-daikho:hover {
  border-radius: 25px;
  /* width: 200px; */
  padding: 15px 8em;
  font-size: 12px;
  min-width: auto;
  background: #fec40f;
  border: none;
  color: white;
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.2);
  transition: all 300ms;
}
.row {
  margin-left: 0px;
  margin-right: 0px;
}
input,
textarea {
  border-left: 0 !important;
  border-right: 0 !important;
  border-top: 0 !important;
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}
.card {
  max-width: 550px;
}
</style>