// Language switcher plugin
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store, error }) => {
	if(process.browser)
		var currLang = localStorage.getItem('vodlix_lang');
	if(!currLang)
		currLang='en'
	
	try {
    	var langCodes = JSON.parse(require(`raw-loader!../../includes/langs/${currLang}.lang`));
	}catch(err) {
		store.commit('snackIt',`Cannot find module ./${currLang}.lang`)
	    console.log(err)
	}

  app.i18n = new VueI18n({
    locale: currLang,
    messages: {
      [currLang]: langCodes,
    },
    silentTranslationWarn: true
  })
}
