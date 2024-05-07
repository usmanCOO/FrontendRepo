<!-- Main Component(Controls the whole app) -->
<template>
  <v-app dark>
    <Snackbar />
    <appHeader v-if="currentRouteName !== 'watch-id' && currentRouteName !== 'profiles' && currentRouteName !== 'subscribe_'" />
    <nuxt />
    <appFooter v-if="currentRouteName !== 'watch-id' && currentRouteName !== 'profiles'" />
  </v-app>
</template>

<script>
import appHeader from "~/components/default/appHeader";
import appFooter from "~/components/default/appFooter";
import Snackbar from "~/components/default/snackbar";
import { mapGetters } from "vuex";
export default {
  name: "default",
  head() {
    return {
      title: this.configs.site_title
    };
  },
  data() {
    return {};
  },
  components: {
    appHeader,
    appFooter,
    Snackbar
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    ...mapGetters(["configs"])
  },
  methods: {
    handleScroll: function(event) {
      let scrollPos, winHeight, docHeight, perc, el;
      scrollPos = window.scrollY;
      winHeight = window.innerHeight;
      docHeight = document.documentElement.scrollHeight;
      perc = parseInt((100 * scrollPos) / (docHeight - winHeight));
      el = document.getElementsByClassName("application--wrap")[0];
      // if(perc > 5)
      //   el.classList.remove("opsnav")
      // if(perc < 5)
      //   el.classList.add("opsnav")
    },
    setInitHeader() {
      if (process.browser) {
        let el = document.getElementsByClassName("application--wrap")[0];
        // el.classList.add("opsnav");
      }
    }
  },
  created: function() {
    if (process.browser) {
      window.addEventListener("scroll", this.handleScroll);
      window.addEventListener("load", this.setInitHeader);
    }
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("load", this.setInitHeader);
  },
  beforeMount() {
    // Setting up default language comming from api
    try {
      let activeLanguages = this.configs.active_languages;
      var defaultLanguage = activeLanguages.filter(obj => {
        return obj.language_default === "yes";
      });
      var currLang = localStorage.getItem("vodlix_lang");
      if (!currLang) {
        if (process.browser) {
          window.localStorage.setItem(
            "vodlix_lang",
            defaultLanguage[0].language_code
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
};
</script>
