// middleware to restrict subscribed users from non valid routes 
export default function ({ store, redirect }) {
  console.log("loaded");
  if (store.getters.currentUser.is_subscribed === 'yes' || store.getters.currentUser.level == 1)

  	return redirect('/')
}