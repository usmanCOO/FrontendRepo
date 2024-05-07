<template>
  <v-content>
    <client-only>
        <circleLoader />

      <!-- <v-layout row wrap align-center justify-center fill-height>
        <v-flex xs12 text-md-center>
          <div class="display-2 text-uppercase profiletitle">Who's watching?</div>
        </v-flex>
        <template v-if="profiles && profiles.length > 0">
          <v-flex
            v-for="profile in profiles"
            :key="profile.user_profile_id"
            xs2
            text-md-center
            class="profile-icon mx-3"
          >
            <v-btn
              class="profile-btn"
              @click="selectProfile(profile)"
              :color="profile.color+' darken-1'"
            >
              <v-icon>tag_faces</v-icon>
            </v-btn>
            <p class="text-md-center">{{profile.first_name}}</p>
            <v-btn
              v-if="manageProfile"
              round
              small
              flat
              fab
              color="primary v-bt"
              @click="editProfile(profile)"
              dark
            >
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn
              v-if="manageProfile && profile.is_default !== 'yes'"
              round
              small
              flat
              fab
              color="primary v-bt"
              @click="deleteProfile(profile)"
              dark
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-flex>
        </template>
      </v-layout> -->
      <!-- <template v-if="dataLoading">
        <circleLoader />
      </template> -->
      <template v-if="processing">
        <loader msg="Please stand by" />
      </template>
    </client-only>
  </v-content>
</template>
<script>
import { mapGetters } from "vuex";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import circleLoader from "~/components/default/circleLoader";
import loader from "~/components/default/loader";
export default {
  name: "profiles",
  middleware: ["auth"],
  components: {
    circleLoader,
    loader
  },
  head() {
    return {
      titleTemplate: this.$t("profiles") + " - %s",
      meta: [
        {
          name: "description",
          content: "Select a profile to proceed with"
        }
      ]
    };
  },
  data() {
    return {
      profiles: "",
      manageProfile: false,
      editProfileDialog: false,
      profileToEdit: "",
      profileToEditName: "",
      updateProfileProcessing: false,
      profileCount: "",

      addProfileDialog: false,
      profileToAddName: "",
      addProfileProcessing: false,
      dataLoading: false,
      processing: false,
      // maturity level
      selectedMaturityLevel: { name: "All", value: "all" },

      maturityLevels: [
        { name: "All", value: "all" },
        { name: "7+", value: "7_plus" },
        { name: "13+", value: "13_plus" },
        { name: "16+", value: "16_plus" },
        { name: "18+", value: "18_plus" }
      ]
    };
  },
  computed: {
    // mapping store's getters into component
    ...mapGetters([
      "currentUser",
      "isAuthenticated",
      "configs",
      "currentRoute"
    ]),
    editProfileNameErrors() {
      const errors = [];
      if (!this.$v.profileToEditName.$dirty) return errors;
      !this.$v.profileToEditName.minLength &&
        errors.push("Profile name must contain atleast 3 characters");
      !this.$v.profileToEditName.maxLength &&
        errors.push("Max length is 30 characters");
      !this.$v.profileToEditName.required &&
        errors.push("Profile name is required");
      return errors;
    },
    addProfileNameErrors() {
      const errors = [];
      if (!this.$v.profileToAddName.$dirty) return errors;
      !this.$v.profileToAddName.minLength &&
        errors.push("Profile name must contain atleast 3 characters");
      !this.$v.profileToAddName.maxLength &&
        errors.push("Max length is 30 characters");
      !this.$v.profileToAddName.required &&
        errors.push("Profile name is required");
      return errors;
    }
  },
  validations: {
    profileToEditName: {
      minLength: minLength(3),
      maxLength: maxLength(30),
      required
    },
    profileToAddName: {
      minLength: minLength(3),
      maxLength: maxLength(30),
      required
    }
  },
  methods: {
    addNewProfileDialog() {
      this.resetForm();
      this.addProfileDialog = true;
    },
    editProfile(profile) {
      this.profileToEdit = profile;
      this.editProfileDialog = true;
      this.profileToEditName = profile.first_name;
      this.selectedMaturityLevel = profile.maturity_level;
    },
    deleteProfile(profile) {
      console.log(profile);
      var ask = confirm("Are you sure you want to delete this profile?");
      if (!ask) return;
      this.processing = true;
      let id = profile.user_profile_id;
      console.log(id);
      this.$axios
        .delete(`/users/deleteSubProfile/${id}`)
        .then(response => {
          this.processing = false;
          this.setPageData();
          this.$store.commit("snackIt", `Profile deleted`);
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
    },
    validateEditedProfile() {
      this.$v.profileToEditName.$touch();
      if (!this.$v.profileToEditName.$invalid) this.updateProfile();
    },
    validateAddedProfile() {
      this.$v.profileToAddName.$touch();
      if (!this.$v.profileToAddName.$invalid) this.addNewProfile();
    },
    resetForm() {
      this.profileToAddName = "";
      this.selectedMaturityLevel = { name: "All", value: "all" };
    },
    updateProfile() {
      this.processing = true;
      var userObj = {
        user_profile_id: this.profileToEdit.user_profile_id,
        first_name: this.profileToEditName,
        maturity_level: this.selectedMaturityLevel
      };
      try {
        this.$axios
          .post("/users/updateSubProfile", userObj)
          .then(response => {
            this.processing = false;
            this.setPageData();
            this.editProfileDialog = false;
            this.$store.commit(
              "snackIt",
              `Profile ${this.profileToEditName} updated`
            );
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
    addNewProfile() {
      this.processing = true;
      var userObj = {
        first_name: this.profileToAddName,
        maturity_level: this.selectedMaturityLevel.value
      };
      try {
        this.$axios
          .post("/users/addSubProfile", userObj)
          .then(response => {
            this.processing = false;
            this.addProfileDialog = false;
            this.setPageData();
            this.$store.commit("snackIt", `New profile added`);
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
      this.$router.push("/");
    },
    async setPageData() {
      try {
        this.dataLoading = true;
        let colorsArray = ["light-blue", "red", "indigo", "teal"];
        let currentUser = this.currentUser.userid;
        await this.$axios.get(`/users/list/${currentUser}`).then(
          response => {
            this.dataLoading = false;
            let profiles = response.data.users.profile;
            this.selectProfile(profiles[0]);
            this.profileCount = profiles.length;
            for (let i = 0; i < profiles.length; i++) {
              profiles[i]["color"] = colorsArray[i];
            }
            this.profiles = profiles;
            console.log("profiles",this.profiles);
          },
          err => {
            this.dataLoading = false;
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
      } catch (err) {
        console.log(err);
      }
    }
  },
  beforeMount() {
    console.log(this.currentUser);
    this.setPageData();
  },
  mounted() {}
};
</script>