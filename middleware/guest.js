// middleware to restrict unauthenticated users
export default function ({ store, redirect }) {
  if (store.state.auth.loggedIn) {
    return redirect('/')
  }
}