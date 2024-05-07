<template>
  <v-container mt-5 grid-list-xl text-xs-center align-center justify-center row fill-height>
    <div class="planform">
      <template v-if="packageExists">
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step step="1">STEP 1 OF 2</v-stepper-step>
            <v-stepper-step class="textinnerpayment" step="2">STEP 2 OF 2</v-stepper-step>
            <v-stepper-step class="textpaymentdetials" step="3">STEP 3 OF 3</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content class="my-0 py-0" step="1">
              <div class="choseplan">
                <div class="headline">Choose a plan that's right for you.</div>
                <div class="body-2">Downgrade or upgrade at any time.</div>
                <div class="Formplan-table mt-2">
                  <div class="selectedplan">
                    <v-layout row wrap>
                      <!-- <v-spacer ></v-spacer> -->
                      <v-flex class="selborder">
                        <div justify-center>
                          <div
                            class="row d-flex justify-content-center"
                            style="
								padding: 0 7.50vmin;
							"
                          >
                            <div class="col-md-12" style=" ">
                              <div class="row d-flex justify-content-center">
                                <div
                                  class="col-md-3 text-center border-line pointer sub-box"
                                  style="width:30%;margin:0 5px"
                                  v-for="(item) in payment_Plans"
                                  :key="item.id"
                                  large
                                  color="primary"
                                  @click="switchActive(item.id, $event)"
                                  :id="'pkg_id'+item.id"
                                  :ref="'pkg'+item.id"
                                >
                                  <p>{{item.name}}</p>
                                  <h4 class="bm-0">Rs {{item.amount}}</h4>
                                  <small class="fs-10">
                                    inclusive of tax
                                    <!-- <span class="red-clr">*</span> -->
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- <v-btn v-for="(item, index) in payment_Plans" :key="item.id" large color="primary" @click="switchActive(item.id, $event)" class="ml-1 selected plan__btn align-center justify-center " :ref="'pkg'+item.id">
														<p>{{item.slug}}</p>
														<small>
														{{item.name}}

														</small>
														<span class="arrow"></span>
                          </v-btn>-->
                        </div>
                      </v-flex>
                    </v-layout>
                  </div>

                  <div
                    class="caption my-3"
                  >
                  HD and ultra HD availability subject to your internet quality and device capabilities. Not all content is available in HD or ultra HD.</div>
                </div>
              </div>

              <!-- Continue-btn -->
              <v-btn class="Continue" color="primary" @click="verifySelectedPkg">
                Continue
                <span class="icon-chevron-right"></span>
              </v-btn>

              <!-- <v-btn flat>Cancel</v-btn> -->
            </v-stepper-content>

            <v-stepper-content step="2">
              <div class="paymentStepLogo">
                <div class="selborder">
                  <v-layout my-4 align-center justify-center>
                    <v-flex lg4 class="paymenttext">
                      <h2>Confirm your package.</h2>
                      <!-- <span>
												Cancel before 
												<strong>12/7/18 to not be charged.</strong>
                      </span>-->
                      <span>
                         												<strong>
You will be unsubscribed from your previous package.</strong>
                      </span>
                      <span>
                        Your selected package is 
                        <strong v-if="selectedPkg">
                          {{selectedPkg.name}} .<span>For  Rs. {{selectedPkg.amount}} inclusive of taxes.</span>
                          <v-btn @click="step = 1">Change</v-btn>
                        </strong>
                      </span>
                      <!-- <h4>
												No commitments.
												Cancel online at anytime.
                      </h4>-->
                    </v-flex>
                  </v-layout>
                </div>
              </div>
              <template v-if="selectedPkg">
                <v-btn
                  class="paymentbtn"
                  color="primary"
                  @click="payNow"
                  :disabled="processing"
                  :loading="processing"
                >
                  Pay Now
                  <span class="icon-chevron-right pl-2"></span>

                </v-btn>
                 <template v-if="processing">
      <p>Your payment is processing....</p>
    </template>
                <!-- <v-btn v-if="paidConfigs.use_stripe == 'yes'"  class="paymentbtn" color="primary" @click="step=3" :disabled="processing" :loading="processing"> 
									Process with Stripe <span class="icon-chevron-right pl-2"></span>
                </v-btn>-->
              </template>
            </v-stepper-content>

            <v-stepper-content step="3">
              <div class="paymentdetials my-4 mx-4">
                <v-layout align-center justify-center>
                  <v-flex lg6 class="paymentform">
                    <h2>Set up your credit or debit card.</h2>
                    <img class="px-2" src="~/static/images/cover/payment.png" />
                    <v-flex class="debit_card">
                      <v-form>
                        <v-text-field v-model="name" :counter="10" label="First Name"></v-text-field>
                        <!--first-name -->
                        <v-text-field v-model="lastname" :counter="10" label="last Name"></v-text-field>
                        <!--last-name -->
                        <v-text-field v-model="creditCardNumber" :counter="16" label="Card Number"></v-text-field>
                        <v-text-field v-model="ExpirationDate" label="Expiration Date (MM/YYYY)"></v-text-field>
                        <v-text-field v-model="securitycode" label="Security Code (CVV)"></v-text-field>
                      </v-form>
                    </v-flex>
                    <v-layout text-sm-left align-center justify-center yourplan>
                      <v-flex class="textleft">
                        <div class="subheading">YOUR PACKAGE</div>
                        <div class="body-1" v-if="selectedPkg">
                          <strong>{{selectedPkg.pkg_title}}</strong>
                          {{selectedPkg.pkg_desc}}
                        </div>
                      </v-flex>
                      <v-flex text-lg-center>
                        <v-btn @click="step = 1">Change</v-btn>
                      </v-flex>
                    </v-layout>
                    <v-layout text-sm-left align-center justify-center>
                          </v-layout>
                    <v-checkbox v-model="checkbox">
                      <div slot="label">I agree.</div>
                    </v-checkbox>
                  </v-flex>
                </v-layout>
              </div>
              <v-layout align-center justify-center>
                <v-flex lg6 class="paymentform">
                  <!-- <v-btn block class="membership" color="primary" @click="stripeExecute">
                    START MEMBERSHIP
                    <span class="icon-chevron-right mx-2"></span>
                  </v-btn> -->
                </v-flex>
              </v-layout>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </template>
      <template v-else>
        <v-card>
          <v-card-title class="headline">No Package exists for now!</v-card-title>
          <v-card-text>
            <p>No Package exists for now please ask admin to create one.</p>
          </v-card-text>
        </v-card>
      </template>
    </div>
   
  </v-container>
</template>

<script>
import loader from "~/components/default/loader";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  middleware: ["auth"],
  data() {
    return {
      step: 0,
      selectedPkg: null,
      name: "",
      lastname: "",
      creditCardNumber: "",
      ExpirationDate: "",
      securitycode: "",
      payment_Plans: {},
      checkbox: "",
      cross: "icon-cross",
      checkmark: "icon-checkmark",
      packages: "",
      paidConfigs: "",
      processing: false,
      gateway: "",
      alreadySubscribed: false
    };
  },
  asyncData({ app, store }) {
    return app.$axios.get(`/paid/packages`).then(
      response => {
        //console.log(userSubscription);
        return {
          packages: response.data.data,
          paidConfigs: response.data.paid_configs
          //gateway : response.data.gateway
        };
      },
      error => {
        store.commit("snackIt", error.response);
      }
    );
  },
  components: {
    loader
  },
  computed: {
    ...mapGetters([
      "currentUser",
      "isAuthenticated",
      "currentProfile",
      "userSubscription"
    ]),

    packageExists() {
      return this.packages.length > 0;
    }
  },
  methods: {
    // async paypalExecute() {
    // 	this.processing = true;
    // 	for(var key in this.selectedPkg.gateway){
    // 		if (this.selectedPkg.gateway[key]['res_gate_type'] == 'paypal')
    // 			var res_plan_id = this.selectedPkg.gateway[key]['res_plan_id'];
    // 	}
    // 	var obj = {
    // 		'plan_id' : res_plan_id,
    // 		'package_id' : this.selectedPkg.package_id,
    // 		'plan_name':this.selectedPkg.pkg_title,
    // 		'plan_description':this.selectedPkg.plan_description,
    // 	}
    // 	await this.$axios.post('/paid/createAgreement', obj).then((response)=>{
    // 		var statusCode = response.status;
    // 		if(statusCode == '200'){
    // 			let approvalUrl = response.data.data;
    // 			if(process.browser)
    // 				window.location.replace(approvalUrl);
    // 		}else{
    // 			this.$store.commit('snackIt','Something went wrong please contact admin');
    // 		}
    // 	}).catch((err)=>{
    // 		if(!err.response){
    // 			this.$store.commit('snackIt',"Server isn't responding please check if server is up or not")
    // 		}else{
    // 			let statusCode = err.response.data.status;
    // 			if(statusCode >= '400' && statusCode <= '510')
    // 				if(err.response.data.errors.error){
    // 					this.$store.commit('snackIt',err.response.data.errors.error[0]);
    // 					this.processing = false;
    // 				}else{
    // 					this.$store.commit('snackIt','Bad Request');
    // 					this.processing = false;
    // 				}
    // 			}
    // 		})
    // // this.processing = false;
    // },
    // async stripeExecute(){
    // 	this.processing = true;
    // 	for(var key in this.selectedPkg.gateway){
    // 			if (this.selectedPkg.gateway[key]['res_gate_type'] == 'stripe')
    // 				var res_plan_id = this.selectedPkg.gateway[key]['res_plan_id'];
    // 		}
    // 		var obj = {
    // 			'name':this.name,
    // 			'lastname':this.lastname,
    // 			'creditCardNumber': this.creditCardNumber ,
    // 			'ExpirationDate': this.ExpirationDate,
    // 			'securitycode': this.securitycode,
    // 			'plan_id' : res_plan_id,
    // 			'package_id' : this.selectedPkg.package_id,
    // 			'plan_name':this.selectedPkg.plan_name,
    // 			'plan_description':this.selectedPkg.plan_description,
    // 			'agree':this.checkbox
    // 		}
    // 		if(this.checkbox == true){
    // 			await this.$axios.post('/paid/createStripeAgreement', obj).then((response)=>{
    // 				var statusCode = response.status;
    // 				if(statusCode == '200'){
    // 					let approvalUrl = response.data.data;
    // 					if(process.browser)
    // 						this.$router.push(approvalUrl);
    // 						//this.processing1 = false;
    // 				}else{
    // 					this.$store.commit('snackIt','Something went wrong please contact admin');
    // 				}
    // 			}).catch((err)=>{
    // 				if(!err.response){
    // 					this.$store.commit('snackIt',"Server isn't responding please check if server is up or not")
    // 				}else{
    // 					let statusCode = err.response.data.status;
    // 					if(statusCode >= '400' && statusCode <= '510')
    // 						if(err.response.data.errors.error){
    // 							this.$store.commit('snackIt',err.response.data.errors.error[0]);
    // 							this.processing = false;
    // 						}else{
    // 							this.$store.commit('snackIt','Bad Request');
    // 							this.processing = false;
    // 						}
    // 					}
    // 			})
    // 		}else{
    // 			this.$store.commit('snackIt','You don`t agree with terms' );
    // 			this.processing = false;
    // 		}
    // },
    async payNow() {
      this.processing = true;
let planName=["Daily","Weekly","Monthly"];
	  let _self = this;
	  let obj={
	"msisdn":this.$store.getters.currentUser.msisdn,
	"plan_id":this.selectedPkg.id,
	"amount":this.selectedPkg.amount,
	"plan_cycle":this.selectedPkg.charging_cycle
}
      axios
        .post("https://api.deikho.com/api/updatePackage", obj)
        .then(response => {

      _self.processing = false;
      console.log("saa",response);
		  if(response.status==200){
        if(response.data.status){
                            this.$fireAnalyticsObj().logEvent("user_package_update", {
	"msisdn":this.$store.getters.currentUser.msisdn,
	"plan_id":this.selectedPkg.id,
	"amount":this.selectedPkg.amount,
  "plan_cycle":this.selectedPkg.charging_cycle,
                              "status":response.data.msg
        
      });
			  console.log(this.selectedPkg.id);
			  this.$store.getters.currentUser.plan_id=this.selectedPkg.id;
			  console.log(this.$store.getters.currentUser);
                this.$store.commit("snackIt", planName[obj.plan_id-1]+" package successfully subscribed.");
                // setTimeout(function(){},1500)
        this.$router.back();
        }else{
                          this.$store.commit("snackIt","Unable to subscribe "+ planName[obj.plan_id-1]+" package due to "+response.data.msg.toLowerCase()+".  Please, recharge your mobile number and try again.");

        }
		  }else{
                          this.$fireAnalyticsObj().logEvent("user_package_update", {
                            "status":response.data.msg,
	"msisdn":this.$store.getters.currentUser.msisdn,
	"plan_id":this.selectedPkg.id,
	"amount":this.selectedPkg.amount,
	"plan_cycle":this.selectedPkg.charging_cycle        
      });
			         this.$store.commit("snackIt", response.data.msg+", Unable to process your payment. Please, recharge your mobile number and try again.");
 
		  }
        })
        .catch(err => {
          console.log(err);
          return err;
        });
    },
    verifySelectedPkg() {
      if (this.selectedPkg === null) {
        this.$store.commit("snackIt", "Please select a package first");
      } else {
        this.step = 2;
      }
    },
    switchActive(pkg, e) {
      console.log("selected", pkg);
      var refsObj = this.$refs;
      console.log("refsObj", refsObj);
      Object.keys(refsObj).forEach(key => {
        let elem = refsObj[key][0];
        console.log(elem);
        if (elem.id == "pkg_id" + pkg) {
          elem.classList.add("selected");
        } else {
          elem.classList.remove("selected");
        }
      });

      this.selectedPkg = this.payment_Plans[pkg];
      console.log("Selected pacakage", this.selectedPkg);
    },
    getPlans() {
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
  mounted() {
    this.getPlans();
    if (this.userSubscription) {
      this.switchActive(this.userSubscription.package_id);
      this.alreadySubscribed = true;
    }
  }
};
</script>
<style scoped>
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

.pointer {
  cursor: pointer;
}
</style>