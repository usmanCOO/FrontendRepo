export default function ({$axios, app, redirect, store}) {
  $axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const code = parseInt(error.response && error.response.status);
      if ([401, 403].includes(code)) {
        app.$universalCookie.removeAll()
        app.$auth.logout()
        redirect('/login')
        store.commit('snackIt','We are sorry you request is unauthorized')

      }
      return Promise.reject(error);
    }
  );
}
