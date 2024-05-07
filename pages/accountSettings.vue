<template>
  <v-container class="acc">
    <v-layout v-if="user" row wrap class="settingmy" mt-5 pt-4>
      <v-flex class="display-1">{{$t("my_account")}}</v-flex>
      <div class="bdr"></div>
      <v-flex d-flex xs12 my-3 mob-layout>
        <v-flex lg3 xs12>
          <div class="title text-capitalize">{{$t("my_profile")}}</div>
        </v-flex>
        <v-flex lg8 xs8 mob-right>
          <v-layout row wrap>
            <v-flex lg9 xs12>
              <v-avatar slot="activator">
                <template>
                  <div style="height:100px;width:100px;border-radius:50%;">
                    <img
                      id="blah"
                      :src="profileImage"
                      style="border-radius:inherit !important; cursor:pointer;object-fit:cover;"
                      :ref="'profileImage'"
                      @click="uploadImage"
                    />
                    <input
                      type="file"
                      id="img"
                      name="img"
                      accept="image/*"
                      style="display:none"
                      :ref="'uploadInput'"
                      @change="fileSelected"
                    />
                  </div>
                  
                </template>
                
                &nbsp;
                &nbsp;
                <div class="body-1 text-capitalize mx-2">{{firstName }}</div>
              </v-avatar>
              
              <br />
                 <v-btn
              style="margin-left:-5px"
                slot="activator"  
                color="primary"
                dark
                                      @click="uploadImage"

              >Change Picture</v-btn>

              <br />
              <v-list-tile style="margin-left:10px;">
                <v-flex>
                  Free Streaming Usage on Mobile Data:&nbsp;&nbsp;
                                  </v-flex>

                                  <v-flex  lg8 > 

       <v-progress-circular
        :indeterminate="indeterminate"
        :rotate="270"
              color="#ffc511"

        :size="96"
        :value="watchedPer"
        :width="4"
      >{{ watched }}/180</v-progress-circular> &nbsp;&nbsp;<span>Minutes</span>
                  <!-- <span>{{watched}} / 180 (minutes) </span> -->
                </v-flex>
              </v-list-tile>
              <br />
              <v-list-tile style="margin-left:10px;">
                <v-flex>
                  <div class="body-1 text-uppercase ">{{phone }}</div>
                  <div class="body-2 hid">{{$t("password")}} : ********</div>
                </v-flex>
              </v-list-tile>

              <!-- <v-list-tile to="/subscription/plans">
								<v-list-tile-title>Playback settings</v-list-tile-title>
              </v-list-tile>-->
              <!-- <v-list-tile>
                <v-dialog v-if="user" v-model="editPlaybackSettings" persistent max-width="600px">
                  <v-btn slot="activator" color="primary"   dark>
										<span style="padding:0 15px">
										{{$t("playback_settings")}}
										</span>
                  </v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{$t("playback_settings")}}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap></v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        flat
                        @click="editPlaybackSettings = false"
                      >{{$t("close")}}</v-btn>
                      <v-btn
                        color="blue darken-1"
                        flat
                        @click="editPlaybackSettings = false"
                      >{{$t("save")}}</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list-tile>-->
              <!-- <v-list-tile to="/subscription/plans">
								<v-list-tile-title>Subtitle appearance</v-list-tile-title>
              </v-list-tile>-->
              <!-- <v-list-tile>
                <v-dialog v-if="user" v-model="editSubtitleAppearance" persistent max-width="600px">
                  <v-btn slot="activator" color="primary"   dark>
																				<span style="padding:0 15px">
{{$t("subtitle_appearance")}}
                  </span></v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{$t("subtitle_appearance")}}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap></v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        flat
                        @click="editSubtitleAppearance = false"
                      >{{$t("close")}}</v-btn>
                      <v-btn
                        color="blue darken-1"
                        flat
                        @click="editSubtitleAppearance = false"
                      >{{$t("save")}}</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list-tile>-->
            </v-flex>
            <v-flex lg3 xs12 rightside>
              <!-- <v-btn to="/profiles" slot="activator"   color="primary" dark>{{$t("manage_profiles")}}</v-btn> -->
              <v-btn
                to="/watchHistory"
                slot="activator"
                color="primary"
                dark
              >{{$t("watch_history")}}</v-btn>

              <v-flex>
                <v-dialog v-if="user" v-model="editProfile" persistent max-width="600px" class="editPassword">
                  <v-btn class slot="activator" color="primary">{{$t("edit_profile_details")}}</v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{$t("user_profile")}}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6 md6>
                            <v-text-field
                              :label="$t('first_name')"
                              :hint="$t('first_name')"
                              v-model="firstName"
                              :error-messages="firstNameErrors"
                              @input="$v.firstName.$touch()"
                              @blur="$v.firstName.$touch()"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-text-field
                              :label="$t('last_name')"
                              :hint="$t('last_name')"
                              v-model="lastName"
                              :error-messages="lastNameErrors"
                              @input="$v.lastName.$touch()"
                              @blur="$v.lastName.$touch()"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm12 md12>
                            <v-text-field
                              :label="$t('email')"
                              v-model="userEmail"
                              :error-messages="emailErrors"
                              @input="$v.userEmail.$touch()"
                              @blur="$v.userEmail.$touch()"
                            ></v-text-field>
                          </v-flex>
                          <!-- 
              <v-flex xs12 sm12 md12>
                <v-text-field
                  :label="$t('twitter_link')"
                  :hint="$t('your_twitter_profile_url')"
                  required
                  v-model="userTwitter"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  :label="$t('instagram_link')"
                  :hint="$t('your_instagram_profile_url')"
                  required
                  v-model="userInsta"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  :label="$t('facebook_link')"
                  :hint="$t('your_facebook_profile_url')"
                  required
                  v-model="userFacebook"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  :label="$t('website_link')"
                  :hint="$t('your_website_url')"
                  required
                  v-model="userWebsite"
                ></v-text-field>
                          </v-flex>-->
                          <v-flex xs12 sm12 md12>
                            <v-menu
                              ref="menu"
                              :close-on-content-click="false"
                              v-model="menu"
                              :nudge-right="40"
                              :return-value.sync="userDOB"
                              lazy
                              transition="scale-transition"
                              offset-y
                              full-width
                              min-width="290px"
                            >
                              <v-text-field
                                slot="activator"
                                v-model="userDOB"
                                label="Date of birth"
                                prepend-icon="event"
                                readonly
                              ></v-text-field>
                              <v-date-picker v-model="userDOB" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="menu = false">{{$t('cancel')}}</v-btn>
                                <v-btn
                                  flat
                                  color="primary"
                                  @click="$refs.menu.save(userDOB)"
                                >{{$t('ok')}}</v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-flex>
                          <v-flex xs12 sm12 md12>
                            <v-select
                              v-model="userGender"
                              :items="gender"
                              item-text="name"
                              item-value="value"
                              :label="$t('gender')"
                            ></v-select>
                          </v-flex>
                          <!-- <v-flex xs12 sm12 md12>
								<v-select 
								v-model = "userCountry" 
								:items="countries" 
								item-text="name_en"
								item-value="iso2" 
								:menu-props="{ maxHeight: '400' }" 
								:label="$t('country')" 
								:hint="$t('pick_your_country')" 
								persistent-hint
								></v-select>
                          </v-flex>-->
                        </v-layout>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="editProfile = false">{{$t("close")}}</v-btn>
                      <v-btn color="blue darken-1" flat @click="validateUserData">{{$t("save")}}</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
              <br />
              <br />
              <v-flex>
                <v-list-tile>
                  <v-dialog v-if="user" v-model="editPassword" persistent max-width="600px">
                    <v-btn slot="activator" color="primary" class="mx-2">{{$t("update_password")}}</v-btn>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{$t("update_password")}}</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container grid-list-md>
                          <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                              <v-text-field
                                :label="$t('old_password')"
                                :hint="$t('old_password')"
                                v-model="oldPassword"
                                @click:append="showOldPassword = !showOldPassword"
                                :append-icon="showOldPassword ? 'visibility_off' : 'visibility'"
                                :type="showOldPassword ? 'text' : 'password'"
                                :error-messages="oldPasswordErrors"
                                @input="$v.oldPassword.$touch()"
                                @blur="$v.oldPassword.$touch()"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                              <v-text-field
                                :label="$t('new_password')"
                                :hint="$t('new_password')"
                                v-model="newPassword"
                                @click:append="showNewPassword = !showNewPassword"
                                :append-icon="showNewPassword ? 'visibility_off' : 'visibility'"
                                :type="showNewPassword ? 'text' : 'password'"
                                :error-messages="newPasswordErrors"
                                @input="$v.newPassword.$touch()"
                                @blur="$v.newPassword.$touch()"
                              ></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm12 md12>
                          <v-text-field
                            label="Confirm Password"
                            hint="Confirm Password"
                            v-model="confPassword"
                            @click:append="showConfPassword = !showConfPassword"
                            :append-icon="showConfPassword ? 'visibility_off' : 'visibility'"
                            :type="showConfPassword ? 'text' : 'password'"
                            :error-messages="confPasswordErrors"
                            @input="$v.confPassword.$touch()"
                            @blur="$v.confPassword.$touch()"
                          ></v-text-field>
                        </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          flat
                          @click="editPassword = false"
                        >{{$t("close")}}</v-btn>
                        <v-btn
                          color="blue darken-1"
                          flat
                          @click="validateUserPassword"
                        >{{$t("save")}}</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-list-tile>
              </v-flex>
                    <v-btn slot="activator" color="primary" class="mx-2" @click="logout()">Logout</v-btn>
              <!-- <v-list-tile>
								<v-dialog v-if="user" v-model="ratingsCheck" persistent max-width="500px">
									<v-btn slot="activator" color="primary" dark>{{$t("ratings")}}</v-btn>
									<v-card>
										<v-card-title>
											<span class="headline">{{$t("ratings")}}</span>
										</v-card-title>
										<v-card-text>
											<v-container grid-list-md>
												<v-layout wrap>
												</v-layout>
											</v-container>
										</v-card-text>
										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn color="blue darken-1" flat @click="ratingsCheck = false">{{$t("close")}}</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
              </v-list-tile>-->
            </v-flex>
          </v-layout>
        </v-flex>
      </v-flex>

      <v-flex mob-layout d-flex xs12 my-3>
        <v-flex mob-right lg9 xs12>
          <v-toolbar class="itmestyle">
            <v-toolbar class="white--text"></v-toolbar>
            <!-- <v-list-tile>
              <v-dialog v-if="user" v-model="editPassword" persistent max-width="600px">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{$t("update_password")}}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm12 md12>
                          <v-text-field
                            :label="$t('old_password')"
                            :hint="$t('old_password')"
                            v-model="oldPassword"
                            @click:append="showOldPassword = !showOldPassword"
                            :append-icon="showOldPassword ? 'visibility_off' : 'visibility'"
                            :type="showOldPassword ? 'text' : 'password'"
                            :error-messages="oldPasswordErrors"
                            @input="$v.oldPassword.$touch()"
                            @blur="$v.oldPassword.$touch()"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                          <v-text-field
                            :label="$t('new_password')"
                            :hint="$t('new_password')"
                            v-model="newPassword"
                            @click:append="showNewPassword = !showNewPassword"
                            :append-icon="showNewPassword ? 'visibility_off' : 'visibility'"
                            :type="showNewPassword ? 'text' : 'password'"
                            :error-messages="newPasswordErrors"
                            @input="$v.newPassword.$touch()"
                            @blur="$v.newPassword.$touch()"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                          <v-text-field
                            label="Confirm Password"
                            hint="Confirm Password"
                            v-model="confPassword"
                            @click:append="showConfPassword = !showConfPassword"
                            :append-icon="showConfPassword ? 'visibility_off' : 'visibility'"
                            :type="showConfPassword ? 'text' : 'password'"
                            :error-messages="confPasswordErrors"
                            @input="$v.confPassword.$touch()"
                            @blur="$v.confPassword.$touch()"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="editPassword = false">{{$t("close")}}</v-btn>
                    <v-btn color="blue darken-1" flat @click="validateUserPassword">{{$t("save")}}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-tile>-->
            <v-spacer></v-spacer>
            <!-- <v-list-tile to="/">
							<v-list-tile-title>
								Change password
							</v-list-tile-title>
            </v-list-tile>-->
          </v-toolbar>

          <!-- <v-toolbar class="itmestyle">
						<v-toolbar class="white--text">
							<div class="body-2 hid"> 
								Redeem gift card or promo code
							</div>
						</v-toolbar>
						<v-spacer></v-spacer>
						<v-list-tile class="payment" to="/">
							<v-list-tile-title>Where to buy gift cards</v-list-tile-title>
						</v-list-tile>
					</v-toolbar>
					<v-toolbar class="itmestyle">
						<v-toolbar class="white--text">
							<div> 
								<v-flex xs12>
								<v-text-field
								label="Enter Code or pin"
								hint="www.example.com/page"
								persistent-hint
								outline
								></v-text-field>
								</v-flex>
								<v-btn depressed>Redeem</v-btn>
							</div>
						</v-toolbar>
						<v-spacer></v-spacer>
          </v-toolbar>-->
        </v-flex>
      </v-flex>
      <div class="bdr"></div>
      <div class="title my-3" style="text-transform:none !important">
        <v-flex class="">Plans and Subscriptions</v-flex>
      </div>

      <v-flex d-flex xs12 my-3>
        <v-flex lg3 xs12>
          <div class="title text-capitalize">{{$t("plan_details")}}</div>
        </v-flex>
        <v-flex lg8 xs12>
          <v-toolbar class="itmestyle">
            <v-toolbar class="white--text">
              <div class="body-2 text-uppercase rd" style="text-align:center">
                <p>
                  {{selected_Plan}}
                  <v-icon v-if="selected_Plan">hd</v-icon>
                </p>
                <small style="color:white">{{selected_plan_name}}</small>
              </div>
            </v-toolbar>
            <v-spacer></v-spacer>
            <v-flex mob-left lg3 xs12>
              <v-btn to="subscriptions/plans" depressed class="primary my-4">Update Plan</v-btn>
            </v-flex>
          </v-toolbar>
        </v-flex>
      </v-flex>
      <v-flex d-flex xs12 my-3 style="
    align-items: baseline;
">
        <v-flex lg3 xs12>
          <div class="title text-capitalize">Status</div>
        </v-flex>
        <v-flex lg8 xs12>
          <v-toolbar class="itmestyle">
            <v-toolbar class="white--text">
              <div class="body-2 text-uppercase rd" style="text-align:center">
                <p>{{user_status}}</p>
              </div>&nbsp;
              &nbsp;
              <div v-if="user_sub_status">
                <v-btn
                  style="margin-top:-10px"
                  class="paymentbtn"
                  color="primary"
                  @click="cancelNow"
                  :disabled="processing"
                  :loading="processing"
                >UnSubscribe</v-btn>
              </div>
              <div v-if="!user_sub_status">
                <v-btn
                  style="margin-top:-10px"
                  class="paymentbtn"
                  color="primary"
                  @click="resubscribeNow"
                  :disabled="processing"
                  :loading="processing"
                >Subscribe</v-btn>
              </div>
              <div v-if="user_chrg_status=='S'">
                <v-btn
                  style="margin-top:-10px"
                  class="paymentbtn"
                  color="primary"
                  @click="payNow"
                  :disabled="processing"
                  :loading="processing"
                >Reactivate Now</v-btn>
              </div>
            </v-toolbar>
          </v-toolbar>
          <div class="row d-flex justify-content center" style="margin-left:45px">
            <p>
              Subscription ending on
              <span>{{nextCharge}}</span>
            </p>
          </div>
        </v-flex>
      </v-flex>
      <div class="bdr"></div>
      <!-- <v-flex d-flex xs12 class="settings my-3">
				<v-flex lg3 xs4>
					<div class="title text-capitalize">{{$t("settings")}}</div>
				</v-flex>
				<v-flex lg8 xs8>
						<v-layout column>
							<v-list-tile to="/">
								<v-list-tile-title>{{$t("parental_controls")}}</v-list-tile-title>
							</v-list-tile>
						</v-layout>
						<v-layout column>
							<v-list-tile to="/">
								<v-list-tile-title>Manage download devices</v-list-tile-title>
							</v-list-tile>
						</v-layout>
						<v-layout column>
							<v-list-tile to="/">
								<v-list-tile-title>Activate a device</v-list-tile-title>
							</v-list-tile>
						</v-layout>
						<v-layout column>
							<v-list-tile to="/">
								<v-list-tile-title>Recent device streaming activity</v-list-tile-title>
							</v-list-tile>
						</v-layout>
						<v-layout column>
							<v-list-tile to="/">
								<v-list-tile-title>Sign out of all devices</v-list-tile-title>
							</v-list-tile>
						</v-layout>
						<v-spacer></v-spacer>
				</v-flex>
      </v-flex>-->
      <div class="bdr"></div>
    </v-layout>

    <template v-if="dataLoading">
      <circleLoader />
    </template>
    <template v-if="processing">
      <!-- <loader :msg="$t('please_stand_by')" /> -->
      <circleLoader />
    </template>
  </v-container>
</template>
<script>
import languageSwitcher from "~/components/default/languageSwitcher";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import loader from "~/components/default/loader";
import circleLoader from "~/components/default/circleLoader";
import axios from "axios";

export default {
  name: "accountSettings",
  middleware: ["auth"],
  // middleware: ["auth", "subscription_needed"],
  components: {
    loader,
    languageSwitcher,
    circleLoader
  },
  head() {
    return {
      titleTemplate: this.$t("account_settings") + " - %s",
      meta: [
        {
          name: "description",
          content: "Account settings"
        }
      ]
    };
  },
  data() {
    return {
      showOldPassword: false,
      showNewPassword: false,
      showConfPassword: false,
      payment_Plans: {},
      processing: false,
      nextCharge: "",
      editProfile: false,
      watched: 0,
      watchedPer:0,
      editPassword: false,
      selected_Plan: "",
      selected_plan_name: "",
      // plan_icon:"fhd",
      updateLanguage: false,
      editSubtitleAppearance: false,
      editPlaybackSettings: false,
      manageProfiles: false,
      viewingActivity: false,
      ratingsCheck: false,
      subscription_status: false,
      user: "",
      profile: "",
 indeterminate: false,
      rotate: 0,
      size: 128,
      value: 0,
      width: 4,
      // Editable data
      firstName: "",
      lastName: "",
      userEmail: "",
      phone: "",
      userDOB: "",
      userGender: "",
      userCountry: "",
      userTwitter: "",
      userInsta: "",
      user_sub_status: "",
      user_chrg_status: "",
      userFacebook: "",
      userWebsite: "",
      oldPassword: "",
      newPassword: "",
      confPassword: "",

      // Datepicker menu
      menu: false,
      gender: [
        { name: "Male", value: "male" },
        { name: "Female", value: "female" }
      ],
      dataLoading: true
    };
  },
  computed: {
    ...mapGetters([
      "currentUser",
      "isAuthenticated",
      "countries",
      "currentProfile"
    ]),
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.minLength &&
        errors.push("First name must contain atleast 3 characters");
      !this.$v.firstName.maxLength &&
        errors.push("Max length is 30 characters");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.minLength &&
        errors.push("Last name must contain atleast 3 characters");
      !this.$v.lastName.maxLength && errors.push("Max length is 30 characters");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.userEmail.$dirty) return errors;
      !this.$v.userEmail.required && errors.push(this.$t("usr_email_err2"));
      !this.$v.userEmail.email && errors.push(this.$t("usr_email_err2"));
      return errors;
    },
    oldPasswordErrors() {
      const errors = [];
      if (!this.$v.oldPassword.$dirty) return errors;
      !this.$v.oldPassword.minLength &&
        errors.push("Minimum 5 characters required");
      !this.$v.oldPassword.maxLength &&
        errors.push("Password must be 60 characters maximum");
      !this.$v.oldPassword.required && errors.push("Old Password is required");
      return errors;
    },
    newPasswordErrors() {
      const errors = [];
      if (!this.$v.newPassword.$dirty) return errors;
      !this.$v.newPassword.minLength &&
        errors.push("Minimum 5 characters required");
      !this.$v.newPassword.maxLength &&
        errors.push("Password must be 60 characters maximum");
      !this.$v.newPassword.required && errors.push("New password is required");
      return errors;
    },
    confPasswordErrors() {
      const errors = [];
      if (!this.$v.confPassword.$dirty) return errors;
      !this.$v.confPassword.minLength &&
        errors.push("Minimum 5 characters required");
      !this.$v.confPassword.maxLength &&
        errors.push("Password must be 60 characters maximum");
      !this.$v.confPassword.required && errors.push("New password is required");
      !(
        this.$v.newPassword.$model == this.$v.confPassword.$model &&
        (this.$v.newPassword.$model != "" || this.$v.confPassword.$model != "")
      ) && errors.push("Password do not match.");
      return errors;
    }
  },
  validations: {
    firstName: { minLength: minLength(3), maxLength: maxLength(30) },
    lastName: { minLength: minLength(3), maxLength: maxLength(30) },
    userEmail: { required, email },
    oldPassword: {
      minLength: minLength(5),
      maxLength: maxLength(60),
      required
    },
    newPassword: {
      minLength: minLength(5),
      maxLength: maxLength(60),
      required
    },
    confPassword: {
      minLength: minLength(5),
      maxLength: maxLength(60),
      required
    }
  },
  methods: {
    // Userdetails form
    validateUserData() {
      console.log("validating edit data");
      this.$v.firstName.$touch();
      this.$v.lastName.$touch();
      // this.$v.userEmail.$touch();
      if (!this.$v.firstName.$invalid)
        if (!this.$v.lastName.$invalid)
          if (!this.$v.userEmail.$invalid || this.userEmail == "") {
            this.updateUserDetails();
          } else {
            console.log("Email error");
          }
    },
    uploadImage() {
      console.log("uploadImage");
      this.$refs.uploadInput.click();
    },
    fileSelected(event) {
      console.log("fileSelected", event);
      // console.log(event.target.files);
      let fileObj = event.target.files[0];
      var formData = new FormData();
      formData.append("files", fileObj);
      formData.append("msisdn", this.phone);
      //   console.log(formData);
      var self = this;
      {
        var reader = new FileReader();

        reader.onload = function(e) {
          // console.log("asdasd", self.$refs);
          self.$refs.profileImage.src = e.target.result;
        };

        reader.readAsDataURL(fileObj);
      }
      // this.processing = true;
      axios
        .post("https://api.deikho.com/user/upload", formData)
        .then(response => {
          var statusCode = response.status;
          // console.log("status code", response);
          //console.log("status code status", response.data.status);

          //console.log("Image uploaded", response);
          if (response.data.status) {
            this.profileImage = response.data.url;

            if (typeof Storage !== "undefined") {
              // Code for localStorage/sessionStorage.
              localStorage.setItem("img", response.data.url);
              console.log("Setting local storage");
            } else {
              console.log("Sorry! No Web Storage suppor");

              // Sorry! No Web Storage support..
            }
            this.processing = false;
            this.$router.go();
          } else {
            this.$store.commit("snackIt", "Unable to update profile image.");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateUserDetails() {
      this.processing = true;
      var userDataObj = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.userEmail,
        twitter_url: this.userTwitter,
        insta_url: this.userInsta,
        fb_url: this.userFacebook,
        web_url: this.userWebsite,
        dob: this.userDOB,
        sex: this.userGender,
        country: this.userCountry
      };
      try {
        this.$axios
          .post("/users/update", userDataObj)
          .then(response => {
            //  console.log("Update user data", response);
            var statusCode = response.status;
            this.$store.commit(
              "snackIt",
              `${this.firstName}'s details has been updated`
            );
            this.clearUserDetailsForm();
            this.setPageData();
            // this.$store.commit('updateUserData',this.user)
            this.processing = false;
          })
          .catch(err => {
            this.processing = false;
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
    clearUserDetailsForm() {
      (this.firstName = ""),
        (this.lastName = ""),
        (this.userEmail = ""),
        (this.userTwitter = ""),
        (this.userInsta = ""),
        (this.userFacebook = ""),
        (this.userWebsite = ""),
        (this.userDOB = ""),
        (this.userGender = ""),
        (this.userCountry = ""),
        (this.editProfile = false);
    },
    // Password form
    validateUserPassword() {
      this.$v.oldPassword.$touch();
      this.$v.newPassword.$touch();
      this.$v.confPassword.$touch();
      if (!this.$v.oldPassword.$invalid)
        if (!this.$v.newPassword.$invalid)
          if (!this.$v.confPassword.$invalid) {
            // console.log(this.$v.newPassword);

            this.updateUserPassword();
          }
    },
    updateUserPassword() {
      this.processing = true;
      var userPasswordObj = {
        old_password: this.oldPassword,
        new_password: this.newPassword
      };
      // console.log("userPasswordObj", userPasswordObj);
      axios
        .post("https://api.deikho.com/user/getStatus", { msisdn: this.phone })
        .then(response => {
          //console.log("response daat appheader", response);
          if (response.data.status) {
            let user = response.data.data[0];
            console.log("user", user);
            let obj = { msisdn: this.phone, new_password: this.newPassword };
            if (this.oldPassword == user.pass) {
              axios
                .post("https://api.deikho.com/user/forgotPassword", obj)
                .then(response => {
                  var statusCode = response.status;
                  // console.log("status code", response);
                  // console.log("status code status", response.data.status);
                  if (response.data.status) {
                    //   console.log("dayay save");
                    // store.getters.currentUser.is_subscribed=user_obj.status=="A"?true:false;
                    //   this.$store.getters.currentUser["plan_id"]=user_obj.plan_id;
                    // this.gotoLogin();
                    this.editPassword = false;
                    this.processing = false;
                                        this.$store.commit("snackIt", "Password successfully updated.");

                  } else {
                    this.$store.commit("snackIt", "Unable to update password.");
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              this.processing = false;
              this.$store.commit("snackIt", "Wrong old password.");
              console.log("Wrong old password");
            }
          }
        })
        .catch(err => {
          console.log(err);
          return err;
        });
    },
    clearUserPasswordForm() {
      (this.oldPassword = ""),
        (this.newPassword = ""),
        (this.editPassword = false);
    },
    // Setting page data
    setPageData() {
      try {
        this.$axios.get(`/users/list/${this.currentUser.userid}`).then(
          response => {
            //     console.log("user data", this.currentUser);
            this.dataLoading = false;
            let user = response.data.users;
            let profile = response.data.users.profile[0];
            // setting user/user profile data
            this.user = user;
            this.profile = profile;
            this.phone = this.currentUser.msisdn;
            this.selected_Plan = this.payment_Plans[
              this.currentUser.plan_id
            ].slug;
            this.selected_plan_name = this.payment_Plans[
              this.currentUser.plan_id
            ].name;

            this.firstName = profile.first_name;
            this.lastName = profile.last_name;
            this.userEmail =
              user.email.indexOf("@test.com") > -1 ? "" : user.email;
            this.userTwitter = profile.twitter_url;
            this.userInsta = profile.insta_url;
            this.userFacebook = profile.fb_url;
            this.userWebsite = profile.web_url;
            this.userDOB = user.dob;
            this.userGender = user.sex;
            this.userCountry = "Pakistan";
          },
          err => {
            this.dataLoading = false;
            if (!err.response) {
              this.$store.commit(
                "snackIt",
                "Server isn't responding video categories can't be fetched"
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    },
    async cancelNow() {
      this.processing = true;
              this.$fb.track("User Unsubscribe",{msisdn:this.$store.getters.currentUser.msisdn?this.$store.getters.currentUser.msisdn:"N/A"});	

      let _self = this;
      let obj = {
        msisdn: this.$store.getters.currentUser.msisdn,
        status: "US"
      };
      //  console.log("obj", obj);
      axios
        .post("https://api.deikho.com/user/unsub", obj)
        .then(response => {
          _self.processing = false;
          this.processing = false;
          //  console.log(response);
          if (response.data.status) {
               this.$fireAnalyticsObj().logEvent("user_unsubscribed", {
        msisdn: this.$store.getters.currentUser.msisdn,
        
      });
            this.user_sub_status = response.data.status.is_subscribed;
            // this.user_status = "UnSubscribed";
            this.user_sub_status = false;

            this.user_chrg_status = "US";
            this.currentUser.is_subscribed = false;
            this.subscription_status = false;
            this.$store.commit(
              "snackIt",
              "You have now unsubscribed to Deikho."
            );
          } else {
            this.$store.commit("snackIt", " Unable to process your request.");
          }
        })
        .catch(err => {
          console.log(err);
          return err;
        });
    },
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
    async resubscribeNow() {
      this.processing = true;
      if(this.currentUser){
        let amount=0;
if(this.currentUser.plan_id==1){
amount='6.00';
}else if(this.currentUser.plan_id==2){
amount='30.00';

}else if(this.currentUser.plan_id==3){
amount='90.00';

}
            this.$fb.track("Subscribe",{msisdn:this.$store.getters.currentUser.msisdn?this.$store.getters.currentUser.msisdn:"N/A",
                    value: amount, currency: 'PKR'});	
      }else{

            this.$fb.track("Subscribe",{msisdn:this.$store.getters.currentUser.msisdn?this.$store.getters.currentUser.msisdn:"N/A"});	
      }
let planName=["Daily","Weekly","Monthly"];

      let _self = this;
      let obj = {
        msisdn: this.$store.getters.currentUser.msisdn,
        status: "A"
      };
      // console.log("obj", obj);
      axios
        .post("https://api.deikho.com/user/subscribe", obj)
        .then(response => {
          _self.processing = false;
          this.processing = false;
          //  console.log(response);
          if (response.data.status) {
                    this.$fireAnalyticsObj().logEvent("user_subscribed", {
        msisdn: this.$store.getters.currentUser.msisdn,
        
      });
          //  this.user_sub_status = response.data.status.is_subscribed;
            // this.user_status = "Active";
            this.user_sub_status = true;
            this.user_chrg_status = "A";

            this.currentUser.is_subscribed = true;
            this.subscription_status = true;
            this.$store.commit(
              "snackIt",
              "You have now successfully subscribed to Deikho with access to amazing exclusive content!"
            );
          } else {
                          this.$store.commit("snackIt","Unable to subscribe "+ planName[this.$store.getters.currentUser.plan_id-1]+" package due to "+response.data.data.msg.toLowerCase()+".  Please, recharge your mobile number and try again.");
          }
        })
        .catch(err => {
          console.log(err);
          return err;
        });
    },
    async payNow() {
      this.processing = true;

      let _self = this;
      let obj = {
        msisdn: this.$store.getters.currentUser.msisdn,
        plan_id: this.payment_Plans[this.currentUser["plan_id"]].id,
        amount: this.payment_Plans[this.currentUser["plan_id"]].amount,
        plan_cycle: this.payment_Plans[this.currentUser["plan_id"]]
          .charging_cycle
      };
      //  console.log("obj", obj);
      axios
        .post("https://api.deikho.com/api/updatePackage", obj)
        .then(response => {
          _self.processing = false;
          this.processing = false;
          // console.log(response);
          if (response.data.status) {
            // console.log(this.selectedPkg.id);
            this.$store.getters.currentUser.plan_id = this.selectedPkg.id;
            //console.log(this.$store.getters.currentUser);
            this.$router.back();
          } else {
            this.$store.commit(
              "snackIt",
              response.data.msg + ", Unable to process your payment."
            );
          }
        })
        .catch(err => {
          console.log(err);
          return err;
        });
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
    },
    getUserData() {
      //  console.log("currentUser get data", this.currentUser);
      let obj = {
        msisdn: this.currentUser.msisdn
      };
      axios
        .post("https://api.deikho.com/user/getStatus", obj)
        .then(response => {
          //console.log("response daat", response);
          if (response) {
            let user_obj = response.data.data[0];
            // this.$store.getters.profileImage = response.data.data[0].image;
            this.$store.getters["profileImage"] = response.data.data[0]
              ? response.data.data[0].image
              : "";
            this.nextCharge = new Date(user_obj.next_charge).toDateString();
            // console.log("user_obj", user_obj);
            this.profileImage = user_obj.image;
            this.watched = user_obj.watched > 180 ? 180 : user_obj.watched;
            // this.watched =120;

            this.watchedPer=((this.watched/180)*100).toFixed(0);
            this.currentUser.is_subscribed =
              user_obj.status == "A" ? true : false;
            this.subscription_status = user_obj.status == "A" ? true : false;
            this.user_sub_status = user_obj.is_subscribed;
            // console.log("user_sub_status", this.user_sub_status);
            this.currentUser["plan_id"] = user_obj.plan_id;
            this.user_status =
              user_obj.status == "A"
                ? "Active"
                : user_obj.status == "S"
                ? "Inactive"
                : user_obj.status == "IA"
                ? "Inactive"
                : (user_obj.status = "US" ? "UnSubscribed" : "");
          } else {
            this.currentUser.is_subscribed = false;
            this.subscription_status = false;
            this.user_sub_status = false;
            this.user_chrg_status = "US";

            //    console.log("user_sub_status", this.user_sub_status);
            this.user_status = "UnSubscribed";
          }
          this.setPageData();
        })
        .catch(err => {
          console.log(err);
          return err;
        });
    }
  },
  beforeMount() {
    this.get_Plans();
    this.getUserData();
  },
  mounted() {}
};
</script>
<style>
.settingmy .itmestyle .v-toolbar__content .rd .v-icon {
  color: #ffc511;
}
.settingmy .itmestyle .v-toolbar__content .rd {
  color: #ffc511;
}

.acc .v-btn__content {
  color: #e2be51;
}
.blue--text.text--darken-1{
  color: #e2be51 !important;

}
.text-capitalize{
  text-transform: capitalize !important;
}
.acc .v-btn__content:hover {
  color: #ffc511;
}
.theme--dark.v-sheet {
  /* color:darkgray; 
background: white !important; */
}
.editPassword .mob-right .layout .flex div .v-list__tile div .v-btn, .mob-right .layout .flex div .v-list__tile div .theme--dark{
  background-color: #00000070!important;
}
</style>