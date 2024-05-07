// context.app is not Vue instance, so it doesn't have $initApi property. You may use inject to solve the problem.
// helper which will be accessible in asyncdata
export default ({ app }, inject) => {
  inject('ssrAuthHeader', () => {
  		var tokenCookie = app.$cookies.get('auth._token.local');
		if(tokenCookie){
			return { 
	        	'Authorization': tokenCookie 
	        }
		}
		else{
			return {};
		}
  })
}