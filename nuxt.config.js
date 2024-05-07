const pkg = require("./package");

module.exports = {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Montserrat:400,600,700 |Material+Icons"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#E00000",
    height: "4px",
    failedColor: "#4e71f8"
  },

  // adding up router middleware
  router: {
    middleware: ["routeHandler"]
  },

  // Setting up the proxy
  // serverMiddleware: ["~/vodProxy.js"],
  

  /*
   ** Global CSS
   */
  css: [
    "@/assets/style/app.styl",
    // CSS file in the project
    "@/assets/style/css/main.css",
    // SCSS file in the project
    "@/assets/style/scss/main.scss",
    // // swiper slider css added
    // "swiper/dist/css/swiper.css",
    "node_modules/swiper/css/swiper.css"
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/vuetify",
    "@/plugins/vuelidate",
    { src: "~/plugins/vuex-persistedstate.js", ssr: false },
    { src: "~plugins/vue-cookie", ssr: false, injectAs: "cookie" },
    { src: "~/plugins/i18n.js" },
    "~/plugins/nativeHelpers.js",
    "~/plugins/ssrAuthHeader.js",
    { src: "~/plugins/nuxt-swiper.js", ssr: false },
    // { src: "~/plugins/vue-infinite-scroll", ssr: false },
    { src: "~/plugins/simple-uploader.js", ssr: false },
    { src: "~/plugins/modal.js", ssr: false },
    { src: "~/plugins/gtm.js" },
    // { src: "plugins/owl.js", ssr: false } // Only works on client side
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    '@nuxtjs/dotenv',

    "bootstrap-vue/nuxt",
    // 'nuxt-vuex-localstorage',
    ['nuxt-facebook-pixel-module', {
      /* module options */
      pixelId: '1009070486220214',
      disabled: false
    }]
,
    // module added to make cookis accessible in server end too its also accesible on client site too and be accessible using 'context.app' or 'this' both
    ["cookie-universal-nuxt", { alias: "universalCookie" }],
    // ['nuxt-memwatch', { averages: false }],

    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: "AIzaSyC9_ez60x1AFJ-2UB3YOuTnjztPS-UcRkU",
          authDomain: "deikhofirebase.firebaseapp.com",
          databaseURL: "https://deikhofirebase.firebaseio.com",
          projectId: "deikhofirebase",
          storageBucket: "deikhofirebase.appspot.com",
          messagingSenderId: "988481884173",
          appId: "1:988481884173:web:0b8057c0de88050f4b0544",
          measurementId: "G-7R7RYLSTFE"
        },
        services: {
          analytics: true,
        }
      }
    ],
    ['@nuxtjs/gtm'],

  ],

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL:
      // process.env.NODE_ENV != "production"
      //   ? "http://35.226.113.116:8888/api"
      //   : `http://35.226.113.116:8888/api`,
      //   ? "http://18.208.163.178/api"
    //   //   : `http://18.208.163.178/api`,
    process.env.NODE_ENV != "production"
    ? "https://deikho.com/api"
    : `https://deikho.com/api`,
    timeout: 10000
  },

  auth: {
    // not in use
    // plugins:['~/plugins/auth.js'],
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "users/signin",
            method: "post",
            propertyName: "user.token"
          },
          user: { url: "users/me", method: "get", propertyName: "data" },
          logout: false
        },
        tokenRequired: true,
        tokenType: "Bearer"
      }
    },
    redirect: false
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
