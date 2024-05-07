// middleware to restrict subscribed users from non valid routes 
import axios from "axios";

export default function (context) {
	let {app, store, error, redirect, route } = context
	// Updating configs after 5 min interval
	let nowTimeStamp = new Date().getTime()
	let storeTimeStamp = store.getters.configsTimer
	let difference = (nowTimeStamp - storeTimeStamp)
	let resultInMinutes = Math.round(difference / 60000);
	if(resultInMinutes > 5){
		app.$axios.get('/base/configs').then((response)=>{
			let appConfs = response.data.configs;
			store.commit('setAppConfigs', appConfs);
			store.commit('setActiveLanguages', appConfs.active_languages);
			store.commit('setConfigsTimer');
        },(err)=>{
          if(!err.response){
            error("Can't make connection with server please check if api server is up and running!");
          }else{
            console.log(err.response);
            error("Something went wrong!");
          }
        }
      );
	}
	
	// Nuxt auth redirect object works like shit so had to implement own routing
	let routeName = route.name
	let isLoggedIn = store.state.auth.loggedIn
	let profile = app.$universalCookie.get('currUserProfile')

	/*
	console.log(route)
	console.log(isLoggedIn)
	console.log(app.$universalCookie.get('auth._token.local'))
	*/
	if (typeof profile != "undefined") {
		console.log("route name handler 1, undefined profile",route.name);

	    /*
		    console.log(app.$universalCookie.get('profileTimer'))
			console.log(profile.user_profile_id)
		*/
		if (profile.user_profile_id && profile.user_profile_id != "undefined"){
			let profileTimeStamp = app.$universalCookie.get('profileTimer')
		    let difference = (nowTimeStamp - profileTimeStamp)
		    let resultInMinutes = Math.round(difference / 60000)	
			if(!profile || resultInMinutes > 360){
		      if(routeName != 'profiles')
				  {// redirect('/login')
				  console.log("route name routeName != 'profiles",route.name);

			}
		    }else{
				console.log("route name setCurrentProfile",route.name);

				store.commit('setCurrentProfile',profile)
				
		    }
		}
	}else{
		if (route.name == "watch-id") {
			console.log("source", route.query.source);
			if (route.query.source==1) {
				console.log("checking free");
			  axios
				.get(
				  `https://deikho.com/api/series/isFree/?Id=${route.query.series_id}`
				)
	  
				.then(response => {
				  if (response.data.series) {
					return;
				  } else {
					redirect(`/login?callback=${route.fullPath}`);
				  }
				})
				.catch(err => {
				  console.log(err);
				  redirect(`/login?callback=${route.fullPath}`);
				  return err;
				});
			} else {
			  redirect(`/login?callback=${route.fullPath}`);
			}
		  }
		else if(route.name=='marketing_logs'||route.name=='all'||route.name=='tvCollections-details-id'||route.name=='index'||route.name == 'subscription' || route.name == 'subscribe_'||route.name == 'faq'||route.name == 'watch_video'||route.name == 'login' || route.name == 'forgotpassword'|| route.name == 'signup'|| route.name == 'video_'|| route.name == 'sign_up'||route.name == 'terms' || route.name == 'privacypolicy'||route.name == 'aboutus'|| route.name == 'contactUs'){
			// Good to go
			console.log("good to go",route.name);
			
		}else{
			// if(!isLoggedIn){
			// 	app.$universalCookie.removeAll()
        	// 	app.$auth.logout()
		  	// 	redirect('/login')
			// }else{
			// 	redirect('/login')
				
			// }
		}
	}
}
// 1440