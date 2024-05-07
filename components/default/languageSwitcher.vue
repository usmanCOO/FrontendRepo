<!-- The language switcher for VODlix -->
<template>
		<v-flex>
			<v-select
			  :items="activeLanguages"
			  item-text="language_name"
			  item-value="language_code"
			  menu-props="auto"
			  hide-details
			  :label="$t('switch_language')"
			  single-line
			  v-on:change="updateLang"
			></v-select>
		</v-flex>	
</template>
<script>
import { mapGetters } from 'vuex'
export default{
	name:'languageSwitcher',
	data(){
		return{
		}
	},
	computed:{
		...mapGetters(['activeLanguages'])
	},
	methods:{
		updateLang(lang){
			if (process.browser) {
			  window.localStorage.setItem('vodlix_lang', lang);
			}
			location.reload();
		}
	},
	mounted(){
		
	}
}
</script>