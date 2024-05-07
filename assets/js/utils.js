import Vue from 'vue'
import CryptoJS from 'crypto-js'
export const utils = {
	encrypt(str){
		if(str){
			var encryptSecret = '%JXbfaEWNBE_&#f2QPqdrr^q4kKW$8v8jpm*pHZd9TzpryesG^';
			var cryptobject = CryptoJS.AES.encrypt(str,encryptSecret);
			return cryptobject+"";
		}
		else{
			return false;
		}	
	},
	decrypt(encryptedStr){
		var decryptSecret = '%JXbfaEWNBE_&#f2QPqdrr^q4kKW$8v8jpm*pHZd9TzpryesG^';
		if(encryptedStr){
			var temp = CryptoJS.AES.decrypt(encryptedStr, decryptSecret); 
			var decrytedStr = temp.toString(CryptoJS.enc.Latin1);
			return decrytedStr;
		}
		else{
			return false;
		}
	},
	authHeader() {
    	let token = store.state.token;
    	token = this.decrypt(token);
	    if (token) 
	        return {'authorization': 'bearer ' + token};
	    else
	    	return {};
	}
}
