/*
import Vue from 'vue'
const state = () => ({
    user:null,
    isAuthenticated:false,
    token:null,
});

const getters = {
    currentUser:state=> state.user,
    isAuthenticated:state => state.isAuthenticated,
    token:state => state.token,
};

const mutations = {
    logout(state) {
        state.user=null;
        state.isAuthenticated=false;
        state.token=null;
        Vue.cookie.delete('vodlix_user');
        Vue.cookie.delete('vodlix_sess_id');
        this.$router.push("/");
    },
    setCurrentUser(state,payload){
        state.user = payload;
    },
    isAuthenticated(state,payload){
        state.isAuthenticated = payload;
    },
    setJwt(state,payload){
        state.token = payload;
    },
};

const actions = {

};

export default {
    state,
    getters,
    mutations,
    actions,
};
*/