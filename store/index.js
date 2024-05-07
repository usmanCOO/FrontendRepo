// VODlix's store lies here
import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./auth";
import axios from "axios";

const store = () => {
  return new Vuex.Store({
    state: () => ({
      configs:null,
      activeLanguages:null,
      countries:null,
      snack:'',
      uploadedFileToEdit:null,
      configsTimer:null,
      currentRoute:null,
      currentProfile:null,
      userSubscription:null,
    }),
    mutations: {
      setAppConfigs(state,payload){
        state.configs = payload;
      },
      setActiveLanguages(state,payload){
        state.activeLanguages = payload;
      },
      setCountries(state,payload){
        state.countries = payload;
      },
      snackIt(state, payload) {
        state.snack = payload;
      },
      activateClientSubscription(state, payload) {
        state.auth.user.is_subscribed = 'yes';
      },
      editUploadedFile(state, payload) {
        state.uploadedFileToEdit = payload;
      },
      updateUserData(state, payload) {
        state.auth.user = payload
      },
      setConfigsTimer(state){
        state.configsTimer = new Date().getTime()
      },
      updateCurrentRoute(state, payload) {
        state.currentRoute = payload
      },
      setCurrentProfile(state, payload){
        state.currentProfile = payload
      },
      setAdminAuthorized(state, payload){
        state.auth.user.is_subscribed = 'yes'
      },
      setUserSubscription(state,payload){
        state.userSubscription = payload;
      }
    },
    getters:{
      configs:state=> state.configs,
      activeLanguages:state => state.activeLanguages,
      countries:state => state.countries,
      currentUser:state=> state.auth.user,
      isAuthenticated:state => state.auth.loggedIn,
      token:state => state.auth.token,
      uploadedFileToEdit:state => state.uploadedFileToEdit,
      configsTimer:state => state.configsTimer,
      currentRoute:state => state.currentRoute,
      currentProfile:state => state.currentProfile,
      userSubscription:state=> state.userSubscription
    },
    actions:{
      // nuxtClientInit for client intialization
      // Initializing the app with initial data
      async nuxtServerInit({commit},{error}){
        try{
          await axios.get("https://deikho.com/testapi/base/configs").then((response)=>{
              let appConfs = response.data.configs
              commit('setAppConfigs', appConfs)
              commit('setActiveLanguages', appConfs.active_languages)
              commit('setCountries', appConfs.countries)
              commit('setConfigsTimer')
            },(err)=>{
              if(!err.response){
                error("Can't make connection with server please check if api server is up and running!")
              }else{
                console.log(err.response)
                error("Something went wrong!")
              }
            }
          );
        }catch(err){
          console.log(err)
        }  
      }
    }
  })
}

export default store