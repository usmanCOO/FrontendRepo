// middleware to restrict not subscribed users from non valid routes 
import axios from "axios";
export default function ({ store, redirect,route }) {
	// console.log("getting status",store.getters.currentUser.msisdn);
	if (route.query.source==1) {
		console.log("checking free");
	  axios
		.get(
		  `https://deikho.com/api/series/isFree/?Id=${route.query.series_id}`
		)

		.then(response => {
		  console.log(response);
		  if (response.data.series) {
			return;
		  } else {
			return redirect('/subscriptions/plans')
		  }
		})
		.catch(err => {
		  console.log(err);
		  return redirect('/subscriptions/plans')
		});
	}
	else if(store.getters.currentUser){
	let obj={
		msisdn:store.getters.currentUser.msisdn
	}

	 axios
	.post("https://api.deikho.com/user/getStatus",obj)
	// .post("http://localhost:4000/user/getStatus",obj)
	
	.then(response => {
		// console.log("needed",response);
		if(response.status){

		if(response.data.status){
			let user_obj=response.data.data[0];
			store.getters["profileImage"]=response.data.data[0].image;
			store.getters.currentUser["watched"]=response.data.data[0].watched;

			if (typeof(Storage) !== "undefined") {
				// Code for localStorage/sessionStorage.
				localStorage.setItem("img", response.data.data[0].image);
			  console.log("Setting local storage");
			  } else {
			  console.log("Sorry! No Web Storage suppor");
			  
				// Sorry! No Web Storage support..
			  }
		  store.getters.currentUser.is_subscribed=user_obj.status=="A"?true:false;
		  store.getters.currentUser["plan_id"]=user_obj.plan_id;
		//   store.getters.currentUser["watched"]=200;
		//   this.$store.getters.currentUser["plan_id"]=user_obj.plan_id;

		}else{
			store.getters.currentUser.is_subscribed=false;

			return redirect('/subscriptions/plans')
		}

	  if(!store.getters.currentUser.is_subscribed){
		store.getters.currentUser.is_subscribed=false;
  
		return redirect('/subscriptions/plans')

	  }
	}
	  else{

		store.getters.currentUser.is_subscribed=false;

		return redirect('/signup')
 
	  }
	})
	.catch(err => {
	 console.log(err);
		return err;
	 
	});
}

//   if (store.getters.currentUser.is_subscribed!== 'yes') 
// 	  if(store.getters.currentUser.level !== 1)
// 	  {
//     	 return redirect('/subscription/plans')

// 	  }
}