// Helpers which will be accessible all over components
import Vue from 'vue'
import CryptoJS from 'crypto-js'

Vue.prototype.$encrypt = (str)=>{
	if(str){
		var encryptSecret = '%JXbfaEWNBE_&#f2QPqdrr^q4kKW$8v8jpm*pHZd9TzpryesG^';
		var cryptobject = CryptoJS.AES.encrypt(str,encryptSecret);
		return cryptobject+"";
	}
	else{
		return false;
	}	
}

Vue.prototype.$decrypt = (encryptedStr)=>{
	var decryptSecret = '%JXbfaEWNBE_&#f2QPqdrr^q4kKW$8v8jpm*pHZd9TzpryesG^';
	if(encryptedStr){
		var temp = CryptoJS.AES.decrypt(encryptedStr, decryptSecret); 
		var decrytedStr = temp.toString(CryptoJS.enc.Latin1);
		return decrytedStr;
	}
	else{
		return false;
	}
}

Vue.prototype.$authHeader = ()=>{
	var tokenCookie = Vue.cookie.get('auth._token.local');
	if(tokenCookie){
		return { 
        	'Authorization': tokenCookie 
        }
	}
	else{
		return {};
	}
}

Vue.prototype.$authToken = ()=>{
	var token = Vue.cookie.get('auth._token.local');
	if(token){
		return token; 
    }
	else{
		return false;
	}
}

Vue.prototype.$isEmptyObj = (obj)=>{
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
// seasons array,season_id,58
Vue.prototype.$findObjectByKey = (objArray,objKey,val)=>{
	let obj = objArray.find((obj) => obj[objKey] == val);
	return obj;
}

Vue.prototype.$console = (msg,type)=>{
	var fontSize = '20px';
	switch(type){
		case 's':
			console.log('%c '+msg+'', 'background: #00C04F; color: #fff; font-size:'+fontSize+';');
		break;
		case 'w':
			console.log('%c '+msg+'', 'background: #FBD100; color: #fff; font-size:'+fontSize+';');
		break;
		case 'p':
			console.log('%c '+msg+'', 'background: #4E71F8; color: #fff; font-size:'+fontSize+';');
		break;
		case 'i':
			console.log('%c '+msg+'', 'background: #37ADE7; color: #fff; font-size:'+fontSize+';');
		break;
		case 'd':
			console.log('%c '+msg+'', 'background: #222; color: red; font-size:'+fontSize+';');
		break;
		default:
			console.log('%c '+msg+'', 'background: #000; color: #fff; font-size:'+fontSize+';');
		break;
	}
}

Vue.prototype.$rand = ()=>{
	let randNum = Math.floor(Math.random() * 100000) + 1;
	return ""+Date.now() + Math.random().toString(36).replace('0.', '') + randNum;
}

Vue.prototype.$sleep = (milliseconds)=>{
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}

Vue.prototype.$removeIndexByValue = (array,value)=>{
	if(array.length > 0){
		var index = array.indexOf(value)
		if(index!=-1){
			array.splice(index, 1)
			return true
		}
		return false
	}else{
		return false
	}
}

Vue.prototype.$removeIndexByObjectId = (array,id,idIndexName)=>{
	var removeIndex = array.map(function(item) { return item[idIndexName] }).indexOf(id);
	if(removeIndex!=-1){
		array.splice(removeIndex, 1);
		return true
	}
	return false
}

Vue.prototype.$minMaxOfArrayOfObjects = function(arr,sortBy){
	if(!arr || arr.length==0){
		return false
	}else{
		let min = arr[0][sortBy], max = arr[0][sortBy];
		for (let i = 1, len=arr.length; i < len; i++) {
	    let v = arr[i][sortBy];
	    min = (v < min) ? v : min;
	    max = (v > max) ? v : max;
		}
		return {'min': min, 'max':max};
	}
}

Vue.prototype.$getMaturityRightWay = function(rawMaturityLevel){
	switch (rawMaturityLevel) {
		case '7_plus':
			return '7+'
			break
		case '13_plus':
			return '13+'
			break
		case '16_plus':
			return '16+'
			break
		case '18_plus':
			return '18+'
			break
		case 'all':
			return 'All'
			break
		default:
			return false
			break
	}
}
Vue.prototype.$getPosition = function(el) {
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}

Vue.prototype.$mouseEnter = function(e){
	let currElem = e.target
	let currElemPosition = currElem.getBoundingClientRect()
	let leftPos =  Math.ceil(currElemPosition.left)
	var rightPos = (currElem.offsetLeft/ window.innerWidth) * 100;
	let child = (currElem.firstElementChild || currElem.firstChild)
	/*
		this.$console('Mouse Enter')
		console.log(currElem)
		console.log(currElemPosition)
		console.log(leftPos)
		
		console.log('currElem.offsetLeft')
		console.log(currElem.offsetLeft)
		console.log('rightPos')
		console.log(rightPos)
		console.log(child)
	*/
	if(!child.classList.contains('border_selected')){	
		if(leftPos <= 40 ){
			currElem.classList.add('sliderAfteritmes')
			var elem1 = currElem.nextSibling;
			if(elem1){
				elem1.classList.add('thumb-Afteritems')
				var elem2 = elem1.nextSibling;
			}
			if(elem2){
				elem2.classList.add('thumb-Afteritems')
				var elem3 = elem2.nextSibling;
			}
			if(elem3){
				elem3.classList.add('thumb-Afteritems')
				var elem4 = elem3.nextSibling;
			}
			if(elem4){
				elem4.classList.add('thumb-Afteritems')
				var elem5 = elem4.nextSibling;
			}
			if(elem5){
				elem5.classList.add('thumb-Afteritems')
			}
		} else if(rightPos > 70){
			currElem.classList.add('sliderbeforeitems')
			var elem1 = currElem.previousSibling;
			if(elem1){
				elem1.classList.add('thumb-beforeitems')
				var elem2 = elem1.previousSibling;
			}
			if(elem2){
				elem2.classList.add('thumb-beforeitems')
				var elem3 = elem2.previousSibling;
			}
			if(elem3){
				elem3.classList.add('thumb-beforeitems')
				var elem4 = elem3.previousSibling;
			}
			if(elem4){
				elem4.classList.add('thumb-beforeitems')
				var elem5 = elem4.previousSibling;
			}
			if(elem5){
				elem5.classList.add('thumb-beforeitems')
			}
		} else {
			currElem.classList.add('slideronhoveritmes')
			var nextElem1 = currElem.nextSibling;
			if(nextElem1){
				nextElem1.classList.add('sliderAfteritmes')
				var nextElem2 = nextElem1.nextSibling;
			}
			if(nextElem2){
				nextElem2.classList.add('sliderAfteritmes')
				var nextElem3 = nextElem2.nextSibling;
			}
			if(nextElem3){
				nextElem3.classList.add('sliderAfteritmes')
				var nextElem4 = nextElem3.nextSibling;
			}
			if(nextElem4){
				nextElem4.classList.add('sliderAfteritmes')
				var nextElem5 = nextElem4.nextSibling;
			}
			if(nextElem5){
				nextElem5.classList.add('sliderAfteritmes')
				var nextElem6 = nextElem5.nextSibling;
			}
			if(nextElem6){
				nextElem6.classList.add('sliderAfteritmes')
			}
			var nextElem1 = currElem.previousSibling;
			if(nextElem1){
				nextElem1.classList.add('sliderbeforeitems')
				var nextElem2 = nextElem1.previousSibling;
			}
			if(nextElem2){
				nextElem2.classList.add('sliderbeforeitems')
				var nextElem3 = nextElem2.previousSibling;
			}
			if(nextElem3){
				nextElem3.classList.add('sliderbeforeitems')
				var nextElem4 = nextElem3.previousSibling;
			}
			if(nextElem4){
				nextElem4.classList.add('sliderbeforeitems')
				var nextElem5 = nextElem4.previousSibling;
			}
			if(nextElem5){
				nextElem5.classList.add('sliderbeforeitems')
				var nextElem6 = nextElem5.nextSibling;
			}
			if(nextElem6){
				nextElem6.classList.add('sliderbeforeitems')
			}
		}
	}
},
Vue.prototype.$mouseLeave = function(e){
	let currElem = e.target
	let currElemPosition = currElem.getBoundingClientRect()
	let leftPos =  Math.ceil(currElemPosition.left)
	var rightPos = (currElem.offsetLeft / window.innerWidth) * 100;
	let child = (currElem.firstElementChild || currElem.firstChild)
	/*
		console.log(currElem)
		this.$console('Mouse Leave')
		console.log(currElemPosition)
		console.log(leftPos)
		
		console.log('currElem.offsetLeft')
		console.log(currElem.offsetLeft)
		console.log('rightPos')
		console.log(rightPos)
		console.log(child)
	*/
	if(leftPos <= 160 ){
		currElem.classList.remove('sliderAfteritmes')
		var elem1 = currElem.nextSibling;
		if(elem1){
			elem1.classList.remove('thumb-Afteritems')
			var elem2 = elem1.nextSibling;
		}
		if(elem2){
			elem2.classList.remove('thumb-Afteritems')
			var elem3 = elem2.nextSibling;
		}
		if(elem3){
			elem3.classList.remove('thumb-Afteritems')
			var elem4 = elem3.nextSibling;
		}
		if(elem4){
			elem4.classList.remove('thumb-Afteritems')
			var elem5 = elem4.nextSibling;
		}
		if(elem5){
			elem5.classList.remove('thumb-Afteritems')
		}
	} else if(rightPos > 70){
		currElem.classList.remove('sliderbeforeitems')
		var elem1 = currElem.previousSibling;
		if(elem1){
			elem1.classList.remove('thumb-beforeitems')
			var elem2 = elem1.previousSibling;
		}
		if(elem2){
			elem2.classList.remove('thumb-beforeitems')
			var elem3 = elem2.previousSibling;
		}
		if(elem3){
			elem3.classList.remove('thumb-beforeitems')
			var elem4 = elem3.previousSibling;
		}
		if(elem4){
			elem4.classList.remove('thumb-beforeitems')
			var elem5 = elem4.previousSibling;
		}
		if(elem5){
			elem5.classList.remove('thumb-beforeitems')
		}
	} else {
		currElem.classList.remove('slideronhoveritmes')
		var nextElem1 = currElem.nextSibling;
		if(nextElem1){
			nextElem1.classList.remove('sliderAfteritmes')
			var nextElem2 = nextElem1.nextSibling;
		}
		if(nextElem2){
			nextElem2.classList.remove('sliderAfteritmes')
			var nextElem3 = nextElem2.nextSibling;
		}
		if(nextElem3){
			nextElem3.classList.remove('sliderAfteritmes')
			var nextElem4 = nextElem3.nextSibling;
		}
		if(nextElem4){
			nextElem4.classList.remove('sliderAfteritmes')
			var nextElem5 = nextElem4.nextSibling;
		}
		if(nextElem5){
			nextElem5.classList.remove('sliderAfteritmes')
			var nextElem6 = nextElem5.nextSibling;
		}
		if(nextElem6){
			nextElem6.classList.remove('sliderAfteritmes')
		}
		var nextElem1 = currElem.previousSibling;
		if(nextElem1){
			nextElem1.classList.remove('sliderbeforeitems')
			var nextElem2 = nextElem1.previousSibling;
		}
		if(nextElem2){
			nextElem2.classList.remove('sliderbeforeitems')
			var nextElem3 = nextElem2.previousSibling;
		}
		if(nextElem3){
			nextElem3.classList.remove('sliderbeforeitems')
			var nextElem4 = nextElem3.previousSibling;
		}
		if(nextElem4){
			nextElem4.classList.remove('sliderbeforeitems')
			var nextElem5 = nextElem4.previousSibling;
		}
		if(nextElem5){
			nextElem5.classList.remove('sliderbeforeitems')
			var nextElem6 = nextElem5.nextSibling;
		}
		if(nextElem6){
			nextElem6.classList.remove('sliderbeforeitems')
		}
	}
}
