<!-- the custome made circular loader -->
<template>
  <section class="home_editerpicker">
    <div
      class="innerblock_editer"
      v-swiper="swiperOption"
      :instanceName="'swiperTop'"
      @someSwiperEvent="slideChange()"
    >
      <div v-if="seriesDetails">
        <teaserPlayer
          :seriesDetails="seriesDetails"
          :isMuted="isMuted"
          :key="activeIndex"
          :isPlay="isPlay"
        />
        <div class="header-all-text">
          <h1 style="text-transform:capitalize">{{seriesDetails.series_name.toLowerCase().trim()}}</h1>
          <small>{{seriesDetails.duration}}</small>&nbsp;|&nbsp;
          <small
            v-for="(cat, index) in seriesDetails.categories"
            :key="index"
            style="padding-bottom:15px;"
          >
            <i key v-if="index ==0">{{cat.category_name}}</i>
            <i v-else>, {{cat.category_name}}</i>
          </small>

          <div class="pad-15">
            <p>{{seriesDetails.series_description}}</p>
          </div>
          <div class="row col button-group">
            <v-btn class="btn btn-grey btn-daikho" @click="takeMeToWatch(seriesDetails)">
              <v-icon>play_arrow</v-icon>&nbsp;Watch Now
            </v-btn>&nbsp;
            &nbsp;
            <v-btn
              class="btn btn-hollow btn-hollow-white"
              @click="logData('featured_slider_detail',seriesDetails)"
              :to="`/tvCollections/details/${seriesDetails.series_id}`"
            >Details</v-btn>&nbsp;
            &nbsp;
            <div
              @click="play()"
              style="font-size: 26px;cursor: pointer;display: grid;align-items: center;margin-right:5px;opacity:0.6"
            >
              <div v-if="!isPlay">
          <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" enable-background="new 0 0 499.999 499.999" height="26px" viewBox="0 0 499.999 499.999" width="26px"><g><path d="m171.875 372.237c-2.701 0-5.402-.702-7.812-2.09-4.837-2.792-7.812-7.95-7.812-13.535v-215.987c0-5.585 2.975-10.727 7.797-13.519 4.837-2.792 10.788-2.838 15.625-.015l187.5 107.94c4.837 2.777 7.828 7.95 7.828 13.535s-2.975 10.742-7.828 13.535l-187.5 108.047c-2.412 1.388-5.113 2.089-7.798 2.089zm15.625-204.589v161.926l140.564-81.009c-.001 0-140.564-80.917-140.564-80.917z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/><path d="m250 499.999c-137.848 0-250-112.152-250-250s112.152-249.999 250-249.999 250 112.152 250 250-112.153 249.999-250 249.999zm0-468.749c-120.62 0-218.75 98.129-218.75 218.75s98.129 218.75 218.75 218.75 218.749-98.13 218.749-218.75-98.129-218.75-218.749-218.75z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/></g> </svg>


              </div>
              <div v-if="isPlay">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Layer_1"
                  enable-background="new 0 0 511.448 511.448"
                  height="26px"
                  viewBox="0 0 511.448 511.448"
                  width="26px"
                >
                  <g>
                    <path
                      d="m436.508 74.94c-99.913-99.913-261.64-99.928-361.567 0-99.913 99.913-99.928 261.64 0 361.567 99.913 99.913 261.64 99.928 361.567 0 99.912-99.912 99.927-261.639 0-361.567zm-180.784 394.45c-117.816 0-213.667-95.851-213.667-213.667s95.851-213.666 213.667-213.666 213.666 95.851 213.666 213.667-95.85 213.666-213.666 213.666z"
                      data-original="#000000"
                      class="active-path"
                      data-old_color="#000000"
                      fill="#FFFFFF"
                    />
                    <path
                      d="m298.39 160.057c-11.598 0-21 9.402-21 21v149.333c0 11.598 9.402 21 21 21s21-9.402 21-21v-149.333c0-11.598-9.401-21-21-21z"
                      data-original="#000000"
                      class="active-path"
                      data-old_color="#000000"
                      fill="#FFFFFF"
                    />
                    <path
                      d="m213.057 160.057c-11.598 0-21 9.402-21 21v149.333c0 11.598 9.402 21 21 21s21-9.402 21-21v-149.333c0-11.598-9.401-21-21-21z"
                      data-original="#000000"
                      class="active-path"
                      data-old_color="#000000"
                      fill="#FFFFFF"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div
              class
              @click="mute()"
              style="font-size: 26px;cursor: pointer;display: grid;align-items: center; opacity:0.6"
            >
              <div v-if="isMuted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  style="enable-background:new 0 0 512 512;"
                  xml:space="preserve"
                  width="26px"
                  height="26px"
                  class
                >
                  <g>
                    <g>
                      <g>
                        <path
                          d="M256,0C116.513,0,0,116.141,0,256c0,139.481,116.134,256,256,256c139.411,0,256-116.387,256-256    C512,116.518,395.866,0,256,0z M256,482c-59.455,0-115.957-23.759-159.099-66.901C11.255,329.453,7.845,197.225,86.639,107.852    L159.787,181H151c-24.813,0-45,20.187-45,45v60c0,24.813,20.187,45,45,45h55l116,87c9.871,7.404,24,0.338,24-12v-38.787    l58.15,58.15C362.608,461.985,310.552,482,256,482z M189.787,211l6.213,6.213V301h-45c-8.271,0-15-6.729-15-15v-60    c0-8.271,6.729-15,15-15H189.787z M316,337.213V376l-90-67.5v-61.287L316,337.213z M226,204.787V203.5l90-67.5v158.787    L226,204.787z M425.362,404.148l-75.541-75.541C382.096,320.235,406,290.858,406,256c0-36.219-25.808-66.522-60-73.491V106    c0-12.351-14.142-19.395-24-12l-116,87h-3.787l-94.362-94.362C149.392,50.015,201.449,30,256,30    c59.455,0,115.957,23.759,159.1,66.901C500.745,182.547,504.155,314.775,425.362,404.148z M346,298.42v-84.84    c17.459,6.192,30,22.865,30,42.42S363.459,292.228,346,298.42z"
                          data-original="#000000"
                          class="active-path"
                          data-old_color="#000000"
                          fill="#FFFFFF"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <div v-if="!isMuted">
               <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" enable-background="new 0 0 511.449 511.449" height="26px" viewBox="0 0 511.449 511.449"
                width="26px" class=""><g><path d="m436.508 74.941c-99.913-99.913-261.639-99.928-361.566 0-99.914 99.912-99.93 261.64 0 361.567 99.913 99.913 261.639 99.928 361.566 0 99.913-99.912 99.929-261.64 0-361.567zm-180.784 394.45c-117.816 0-213.667-95.851-213.667-213.667s95.851-213.666 213.667-213.666 213.667 95.851 213.667 213.667-95.85 213.666-213.667 213.666z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/><path d="m232.851 131.97-69.189 49.421h-35.938c-11.598 0-21 9.402-21 21v106.667c0 11.598 9.402 21 21 21h35.938l69.189 49.421c13.872 9.908 33.206-.027 33.206-17.088v-213.333c0-17.046-19.322-27.006-33.206-17.088zm-8.794 189.614-41.46-29.614c-7.085-5.061-11.719-3.912-33.873-3.912v-64.667c21.664 0 26.743 1.181 33.873-3.912l41.46-29.614z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/><path d="m365.502 135.281c-8.201-8.201-21.498-8.201-29.699 0-8.2 8.201-8.2 21.498 0 29.698 50.037 50.038 50.037 131.454 0 181.491-8.2 8.201-8.2 21.498 0 29.698 8.201 8.201 21.498 8.201 29.699 0 66.413-66.413 66.413-174.474 0-240.887z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/><path d="m320.247 180.535c-8.201-8.201-21.498-8.201-29.699 0s-8.2 21.498.001 29.699c25.142 25.143 25.144 65.836 0 90.98-13.27 13.27-3.691 35.85 14.849 35.85 5.374 0 10.749-2.051 14.85-6.151 41.554-41.553 41.56-108.817-.001-150.378z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/></g> </svg>

              </div>
            </div>
          </div>
        </div>
        <div class="mob-play">
            <div
              @click="play()"
              style="font-size: 26px;cursor: pointer;display: grid;align-items: center;margin-right:5px;opacity:0.6"
            >
              <div v-if="!isPlay">
                <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" enable-background="new 0 0 499.999 499.999" height="26px" viewBox="0 0 499.999 499.999" width="26px"><g><path d="m171.875 372.237c-2.701 0-5.402-.702-7.812-2.09-4.837-2.792-7.812-7.95-7.812-13.535v-215.987c0-5.585 2.975-10.727 7.797-13.519 4.837-2.792 10.788-2.838 15.625-.015l187.5 107.94c4.837 2.777 7.828 7.95 7.828 13.535s-2.975 10.742-7.828 13.535l-187.5 108.047c-2.412 1.388-5.113 2.089-7.798 2.089zm15.625-204.589v161.926l140.564-81.009c-.001 0-140.564-80.917-140.564-80.917z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/><path d="m250 499.999c-137.848 0-250-112.152-250-250s112.152-249.999 250-249.999 250 112.152 250 250-112.153 249.999-250 249.999zm0-468.749c-120.62 0-218.75 98.129-218.75 218.75s98.129 218.75 218.75 218.75 218.749-98.13 218.749-218.75-98.129-218.75-218.749-218.75z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/></g> </svg>

              </div>
              <div v-if="isPlay">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Layer_1"
                  enable-background="new 0 0 511.448 511.448"
                  height="26px"
                  viewBox="0 0 511.448 511.448"
                  width="26px"
                >
                  <g>
                    <path
                      d="m436.508 74.94c-99.913-99.913-261.64-99.928-361.567 0-99.913 99.913-99.928 261.64 0 361.567 99.913 99.913 261.64 99.928 361.567 0 99.912-99.912 99.927-261.639 0-361.567zm-180.784 394.45c-117.816 0-213.667-95.851-213.667-213.667s95.851-213.666 213.667-213.666 213.666 95.851 213.666 213.667-95.85 213.666-213.666 213.666z"
                      data-original="#000000"
                      class="active-path"
                      data-old_color="#000000"
                      fill="#FFFFFF"
                    />
                    <path
                      d="m298.39 160.057c-11.598 0-21 9.402-21 21v149.333c0 11.598 9.402 21 21 21s21-9.402 21-21v-149.333c0-11.598-9.401-21-21-21z"
                      data-original="#000000"
                      class="active-path"
                      data-old_color="#000000"
                      fill="#FFFFFF"
                    />
                    <path
                      d="m213.057 160.057c-11.598 0-21 9.402-21 21v149.333c0 11.598 9.402 21 21 21s21-9.402 21-21v-149.333c0-11.598-9.401-21-21-21z"
                      data-original="#000000"
                      class="active-path"
                      data-old_color="#000000"
                      fill="#FFFFFF"
                    />
                  </g>
                </svg>
              </div>
            </div>
        </div>
        <div class="mob-mute">
          <div
            class
            @click="mute()"
            style="font-size: 26px;cursor: pointer;display: grid;align-items: center;opacity:0.6"
          >
            <div v-if="isMuted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  style="enable-background:new 0 0 512 512;"
                  xml:space="preserve"
                  width="26px"
                  height="26px"
                  class
                >
                  <g>
                    <g>
                      <g>
                        <path
                          d="M256,0C116.513,0,0,116.141,0,256c0,139.481,116.134,256,256,256c139.411,0,256-116.387,256-256    C512,116.518,395.866,0,256,0z M256,482c-59.455,0-115.957-23.759-159.099-66.901C11.255,329.453,7.845,197.225,86.639,107.852    L159.787,181H151c-24.813,0-45,20.187-45,45v60c0,24.813,20.187,45,45,45h55l116,87c9.871,7.404,24,0.338,24-12v-38.787    l58.15,58.15C362.608,461.985,310.552,482,256,482z M189.787,211l6.213,6.213V301h-45c-8.271,0-15-6.729-15-15v-60    c0-8.271,6.729-15,15-15H189.787z M316,337.213V376l-90-67.5v-61.287L316,337.213z M226,204.787V203.5l90-67.5v158.787    L226,204.787z M425.362,404.148l-75.541-75.541C382.096,320.235,406,290.858,406,256c0-36.219-25.808-66.522-60-73.491V106    c0-12.351-14.142-19.395-24-12l-116,87h-3.787l-94.362-94.362C149.392,50.015,201.449,30,256,30    c59.455,0,115.957,23.759,159.1,66.901C500.745,182.547,504.155,314.775,425.362,404.148z M346,298.42v-84.84    c17.459,6.192,30,22.865,30,42.42S363.459,292.228,346,298.42z"
                          data-original="#000000"
                          class="active-path"
                          data-old_color="#000000"
                          fill="#FFFFFF"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
            </div>
            <div v-if="!isMuted">
                 <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" enable-background="new 0 0 511.449 511.449" height="26px" viewBox="0 0 511.449 511.449"
                width="26px" class=""><g><path d="m436.508 74.941c-99.913-99.913-261.639-99.928-361.566 0-99.914 99.912-99.93 261.64 0 361.567 99.913 99.913 261.639 99.928 361.566 0 99.913-99.912 99.929-261.64 0-361.567zm-180.784 394.45c-117.816 0-213.667-95.851-213.667-213.667s95.851-213.666 213.667-213.666 213.667 95.851 213.667 213.667-95.85 213.666-213.667 213.666z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/><path d="m232.851 131.97-69.189 49.421h-35.938c-11.598 0-21 9.402-21 21v106.667c0 11.598 9.402 21 21 21h35.938l69.189 49.421c13.872 9.908 33.206-.027 33.206-17.088v-213.333c0-17.046-19.322-27.006-33.206-17.088zm-8.794 189.614-41.46-29.614c-7.085-5.061-11.719-3.912-33.873-3.912v-64.667c21.664 0 26.743 1.181 33.873-3.912l41.46-29.614z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/><path d="m365.502 135.281c-8.201-8.201-21.498-8.201-29.699 0-8.2 8.201-8.2 21.498 0 29.698 50.037 50.038 50.037 131.454 0 181.491-8.2 8.201-8.2 21.498 0 29.698 8.201 8.201 21.498 8.201 29.699 0 66.413-66.413 66.413-174.474 0-240.887z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/><path d="m320.247 180.535c-8.201-8.201-21.498-8.201-29.699 0s-8.2 21.498.001 29.699c25.142 25.143 25.144 65.836 0 90.98-13.27 13.27-3.691 35.85 14.849 35.85 5.374 0 10.749-2.051 14.85-6.151 41.554-41.553 41.56-108.817-.001-150.378z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/></g> </svg>

            </div>
          </div>
        </div>
      </div>
      <div class="swiper-wrapper" @mouseover="showBody">
        <div v-for="(editorPick,index) in categoryPicks" class="swiper-slide tuhumbinner">
          <img
            :class="`imageSection grey lighten-2 imageSection_${index}`"
            :src="editorPick.seasons[0].episodes[0].thumbs['original']"
            aspect-ratio="1"
            :id="`imageSection_${index}`"
            :key="`imageSection_${index}`"
          />

          <!-- </v-img> -->
          <v-flex
            lg6
            align-start
            justify-start
            row
            edtirpick__details
            :id="`videoSection_${index}`"
            :class="`videoSection  videoSection_${index}`"
            style="display:none"
          >
            <v-flex class="detail_list">
              <!-- <h2 class="mx-2 my-3">{{editorPick.title}}</h2> -->
              <!-- <h2 v-if="editorPick.logo == null" class="mx-2 my-3">{{editorPick.title}}</h2> -->
              <!-- <div  class="logo mt-3 ml-2">
              <v-img
                :src="editorPick.logo"
                :lazy-src="editorPick.logo"
                aspect-ratio="1"
                class
                style="width:500px;height:100px;"
              >
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-layout>
              </v-img>
              </div>-->

              <!-- <div class="header-all-text">
              <h1>{{editorPick.series_name}}</h1>
              <small>{{editorPick.duration}}</small>&nbsp;|&nbsp;
              <small
                v-for="(cat, index) in editorPick.categories"
                :key="index"
                style="padding-bottom:15px;"
              >
                <i key v-if="index ==0">{{cat.category_name}}</i>
                <i v-else>, {{cat.category_name}}</i>
              </small>

              <div class="pad-15">
                <p>{{editorPick.series_description}}</p>
              </div>
              <div class="row col button-group">
                <v-btn class="btn btn-grey btn-daikho" @click="takeMeToWatch(editorPick)">
                  <v-icon>play_arrow</v-icon>&nbsp;Watch Now
                </v-btn>
                <v-btn
                  class="btn btn-hollow btn-hollow-white"
                  :to="`/tvCollections/details/${editorPick.series_id}`"
                >Details</v-btn>
              </div>
              </div>-->
            </v-flex>
          </v-flex>
        </div>
      </div>
      <div class="editer_prev">
        <span class="icon-chevron-left"></span>
      </div>
      <div class="editer_next">
        <span class="icon-chevron-right"></span>
      </div>
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
    </div>
  </section>
</template>
<script>
import Vue from "vue";
import teaserPlayer from "~/components/default/teaserPlayer";
import JQuery from "jquery";

export default {
  name: "categoryPicks",
  props: ["categoryPicks", "swiperOption"],
  data() {
    return {
      seriesDetails: null,
      activeIndex: 0,
      isPlay: true,
      isMuted: true,
      ismouseOver: false,
      ismouseOut: false,
      optionsSwiper: {
        init: true,
        loop: true,
        speed: 800,
        slidesPerView: 1.55, // or 'auto'
        // spaceBetween: 10,
        centeredSlides: true,
        effect: "coverflow", // 'cube', 'fade', 'coverflow',
        coverflowEffect: {
          rotate: 50, // Slide rotate in degrees
          stretch: 0, // Stretch space between slides (in px)
          depth: 100, // Depth offset in px (slides translate in Z axis)
          modifier: 1, // Effect multipler
          slideShadows: true // Enables slides shadows
        },
        grabCursor: true,
        parallax: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        breakpoints: {
          1023: {
            slidesPerView: 1,
            spaceBetween: 0
          }
        },
        // Events
        on: {
          imagesReady: function() {
            this.el.classList.remove("loading");
          }
        }
      }
    };
  },
  head() {
    //this.$router.push('/tvCollections');
    if (process.browser) {
      return {
        script: [{ src: require("~/player/dist/hola_player.dev.js") }]
      };
    }
  },
  components: {
    teaserPlayer
  },
  methods: {
    mute() {
      console.log("mute slider");
      this.isMuted = !this.isMuted;
    },
    play() {
      this.isPlay = !this.isPlay;
    },
    logData(event_name, seriesObj) {
      this.$fireAnalyticsObj().logEvent(event_name, {
        msisdn: this.phone,
        video_title: seriesObj.series_name
      });
    },
    takeMeToWatch(seriesObj) {
      this.$fireAnalyticsObj().logEvent("featured_slider_play", {
        msisdn: this.phone,
        video_title: seriesObj.series_name
      });
                        this.$fb.track("ViewContent",{
              msisdn:this.phone?this.phone:"N/A",

        video_title: seriesObj.seasons[0].episodes[0].title,
        series_id:seriesObj.series_id,
        videoid:seriesObj.seasons[0].episodes[0].videoid
      });	
      // console.log(seriesObj.seasons[0]);
      {
        console.log("network changed", localStorage.getItem("network_changed"));
        if (
          localStorage.getItem("network_changed") == true ||
          localStorage.getItem("network_changed") == "true"
        ) {
          console.log("header video ");
          window.location.href = `http://www.deikho.com/watch_video.html?episode_id=${seriesObj.seasons[0].episodes[0].videoid}&type=series&series_id=${seriesObj.series_id}&season_id=${seriesObj.seasons[0].season_id}`;
        } else {
          this.$router.push(
            `/watch/${seriesObj.seasons[0].episodes[0].videoid}?type=series&series_id=${seriesObj.series_id}&season_id=${seriesObj.seasons[0].season_id}`
          );
        }

        //
      }
    },
    slideChange() {},
    showBody() {
      let $ = JQuery;

      $(".videoSection_" + this.activeIndex).show("fast");
      // console.log("show mouse over");
      setTimeout(function() {
        $(".videoSection_" + this.activeIndex).fadeOut("fast");
      }, 2500);
    }
  },
  mounted() {
    let $ = JQuery;
    //  this.swiperTop.slideTo(2);
    function pauseAll() {
      // console.log("pauseall");
      var total_count = document.getElementsByClassName("videoSection").length;
      // console.log("total video Section", total_count);
      for (var i = 0; i < total_count; i++) {
        if (document.getElementsByClassName("videoSection")) {
          document.getElementsByClassName("videoSection")[i].style.display =
            "none";
        }
      }
    }
    function showImages() {
      // var total_count=document.getElementsByClassName("imageSection").length;
      // console.log("image section length",total_count);
      // for(var i=0;i< total_count;i++){
      // // if(document.getElementsByClassName("imageSection"))
      // {
      //   document.getElementsByClassName("imageSection")[i].style.display = "block";
      // }
      // }
    }

    function hideImages(index) {
      // var total_count=document.getElementsByClassName("imageSection_"+index).length;
      // for(var i=0;i< total_count;i++){
      // // if(document.getElementsByClassName("imageSection_"+index))
      // {
      // document.getElementsByClassName("imageSection_"+index)[i].style.display = "none";
      // }
      // }
    }
    try {
      this.seriesDetails = this.categoryPicks[0];
      
      // console.log("this.seriesDetails", this.seriesDetails);
      document.getElementById("videoSection_0").style.display = "block";
    } catch (err) {
      console.log(err);
    }

    setTimeout(function() {
      $(".videoSection").fadeOut("fast");
    }, 2500);
    // console.log("section div");
    hideImages(0);

    var self = this;
    try {
      this.swiperTop.on("slideNextTransitionStart", function() {
         self.isMuted = true;
        self.isPlay = true;

        setTimeout(function() {
          self.isMuted =  false;
          console.log("isMuted", self.isMuted);
        }, 700);
        let active_index = this.realIndex;

        self.seriesDetails = null;
        pauseAll();
        var current_id_sec = "videoSection_" + active_index;

        var total_count = document.getElementsByClassName(current_id_sec)
          .length;
        var i = 1;
        if (this.realIndex == 1) {
          i = 1;
        }

        if (total_count == 1) {
          i = 0;
        }
        // console.log("active_index------->", active_index);
        // console.log(this);
        // console.log("total count------>", total_count);
        // console.log("i--->", i);
        showImages();
        hideImages(active_index);

        document.getElementsByClassName(current_id_sec)[i].style.display =
          "block";
        // document.getElementsByClassName(current_id_sec)[1].style.display= "block";
        self.activeIndex = active_index;
        self.seriesDetails = self.categoryPicks[active_index];
        self.logData("slider_next", self.categoryPicks[active_index]);
        setTimeout(function() {
          $(".videoSection").fadeOut("fast");
        }, 2500);
      });
    } catch (err) {}
    try {
      this.swiperTop.on("slidePrevTransitionStart", function() {
           self.isMuted = true;
        self.isPlay = true;

        setTimeout(function() {
          self.isMuted =  false;
          console.log("isMuted", self.isMuted);
        }, 700);
        // console.log(this);
        let active_index = this.realIndex;
        // console.log(active_index);
        // console.log(total_count);
        self.seriesDetails = null;

        var current_id_sec = "videoSection_" + active_index;
        pauseAll();

        var total_count = document.getElementsByClassName(current_id_sec)
          .length;
        // console.log(document.getElementsByClassName(current_id_sec));
        var i = 0;

        if (total_count == 3) {
          i = 1;
        }

        // console.log("active_index------->", active_index);
        // console.log(this);
        // console.log("total count------>", total_count);
        // console.log("i--->", i);

        document.getElementsByClassName(current_id_sec)[i].style.display =
          "block";
        // document.getElementsByClassName(current_id_sec)[1].style.display= "block";
        self.activeIndex = active_index;
        self.seriesDetails = self.categoryPicks[active_index];
        self.logData("slider_prev", self.categoryPicks[active_index]);

        showImages();
        hideImages(active_index);
        setTimeout(function() {
          $(".videoSection").fadeOut("fast");
        }, 2500);
      });
    } catch (err) {}
  }
};
</script>
<style scoped>
.swiper-container,
.home_editerpicker {
  width: 100%;
  height: 81vh;
  border-bottom: 3px solid #ffc511;
}
.mob-mute {
  display: none;
}
.mob-play {
  display: none;
}
.btn-daikho {
  padding: 0 30px;
  color: white;
  height: 50px;
  background: #ffc511 !important;
  border-radius: 5px;
}

.btn-hollow-white {
  padding: 0 30px;
  color: white;
  height: 50px;
  background: none !important;
  border: 1px solid white;
  border-radius: 5px;
}
.pad-15 {
  padding: 15px 0;
}
.home_editerpicker .innerblock_editer .swiper-wrapper .tuhumbinner .bghover {
  background-image: linear-gradient(
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0.5)
  ) !important;
}
.swiper-wrapper {
  z-index: -1;
}
.swiper-slide {
  transform: scale(0.98);
}
.swiper-slide-active {
  transform: scale(1);
}
.header-all-text {
  position: absolute;
  bottom: 8%;
  left: 15%;
}
.header-all-text p {
  width: 50%;
}
.header-all-text .button-group {
  margin-left: -20px;
}
@media only screen and (max-width: 767px) {
  .mob-mute {
    display: block;

    position: absolute;
    bottom: 35px;
    width: 45px;
    right: 15px;
    /* border: 1px solid #ffffff80; */
    border-radius: 40px;
    height: 45px;
    text-align: center;
  }

.mob-play{
    display: block;

    position: absolute;
    bottom: 35px;
    width: 45px;
    right: 45px;
    /* border: 1px solid #ffffff80; */
    border-radius: 40px;
    height: 45px;
    text-align: center;
  }
  .btn-daikho {
    padding: 3.5px 8px !important;
    height: fit-content !important;
  }
  .btn-hollow-white {
    padding: 5px 10px !important;
    height: fit-content !important;
  }
  h1 {
    font-size: 1em;
  }
  .header-all-text {
    display: none;
  }
  .header-all-text {
    margin-left: 11vmin;
    margin-bottom: 3.5vmin;
  }
  video {
    height: 43.7vh !important;
  }
  .home_editerpicker {
    height: 40vh !important;
  }
  .innerblock_editer {
    height: 40vh !important;
  }
}
@media only screen and (min-width: 767px) and (max-width: 1024px) {
  .header-all-text {
    display: none;
  }
  video {
    height: 53vh !important;
  }
}
@media screen and (min-width: 1200px) and (max-width: 1600px) {
  .button-group {
    margin-bottom: 10px;
  }
  h1 {
    font-size: 2em;
  }
}
.home_editerpicker .innerblock_editer .swiper-wrapper .tuhumbinner {
  height: 95% !important;
}

.swiper-slide-active > .imageSection {
  display: none;
}
.swiper-slide > img {
  height: 80vh;
  height: -webkit-fill-available;
  margin-top: 50px;
  margin-left: -7px;
}
</style>