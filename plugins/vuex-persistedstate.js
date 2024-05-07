//  ~/plugins/vuex-persistedstate.js
import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
    createPersistedState({
        // other options...
        storage: window.localStorage
  })(store)
}