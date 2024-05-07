<template>
  <v-content>
    <!-- <modal name="hello-world" 
    style="  backdrop-filter: blur(5px)"
    height="500"
    width="350"
    styles=''>
<div class="modal-body-bg">
<div class="text-section">
  <h4>
    Watch Exclusive Pakistani Content on your Mobile Phone
    </h4>
</div>
<div class="image-section">
</div>

<div class="bottom-images">
  <a href="https://play.google.com/store/apps/details?id=com.jazz.pakistani.drama.videos.deikho&hl=en">
  <button 
                                    class="btn btn-daikho btn-round"
>
Download App
  </button></a>
  <div style="color:#FFC511;margin-top:15px;">
  <p style="cursor:pointer" @click="hidePopup()">
    Never show this again.  </p>

</div>
  </div>

</div>
    </modal>-->
    <!-- Editor picks -->
    <div
      v-if="featured_loaded&& featuredSeries && featuredSeries!=undefined && featuredSeries.length > 0"
    >
      <editorPicks
        :editorPicks="featuredSeries"
        :swiperOption="swiperOption"
        :takeMeToWatch="takeMeToWatch"
      />
    </div>
    <!-- Featured videos  -->
       <br />
            <br />

    <!-- Featured videos  -->
   <section v-if="latestRelease">
      <template v-if="latestRelease.length > 0">
        <section class="innerCategory__Video">
          <div class="swiper-container slider">
            <br />
   <div class="row ">

            <div class="col">
            <h2>Latest Releases</h2>
            </div>
            <div class="col see-all-col">

            </div>
            </div>
            <!-- <br /> -->
            <div v-swiper="swiperTrending" instanceName="latestRelease-swiper">
              <div class="swiper-wrapper slider-v main-slide-box">
                <div
                  v-for="catVid in latestRelease"
                  class="swiper-slide innerthumbs__v"
                  @mouseenter="hoverIn"
                  @mouseleave="hoverOut"
                >
                  <template v-if="catVid ">
                    <v-hover>
                      <div class="v-thumb main-load" :ref="catVid.videoid">
                        <div
                          class="sliderimg main-home-custom"
                          style="cursor:pointer"
                          @click="takeMeToWatchVideo(catVid)"
                        >
                          <div v-if="catVid.is_free" class="free-tag">Free</div>
                          <!-- <span v-if="catVid.live != ''" class="liveicon">live</span> -->
                          <v-img
                             :src="catVid.files_thumbs_path?catVid.files_thumbs_path:catVid.thumbs.original"
                            :lazy-src="catVid.files_thumbs_path?catVid.files_thumbs_path:catVid.thumbs.original"

                             aspect-ratio="1"
                            class="grey lighten-2"
                          >
                            <v-layout
                              slot="placeholder"
                              fill-height
                              align-center
                              justify-center
                              ma-0
                            >
                              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-layout>
                          </v-img>
                        </div>
                        <div class="hover__detaillist custom-hover">
                          <div class="bob-overview-wrapper">
                            <div
                              class="title mx-2 mt-2"
                              v-if="catVid.title"
                            >{{catVid.title.toLowerCase().trim()}}</div>
                            <!-- <time
                                class="caption time mx-2"
                                v-if="catVid.seasons!=undefined"
                            >{{catVid.seasons.length}}</time>-->
                            <p
                              class="caption dec mx-2"
                              v-if="catVid.description"
                            >  </p>
                            <div class="row col button-group">
                              <button
                                class="btn btn-daikho-hollow"
                                  style="display:flex;justify-content:center;align-items: center"
                                @click="takeMeToWatchVideo(catVid)"
                              >
                                <v-icon style="color:#ffc511">play_arrow</v-icon>&nbsp;
                                <span
                                  style="margin-top:2.5px;display: grid;
    align-content: center;"
                                >Play Now</span>
                              </button>
<br/>
                              <!-- <button class="btn btn-hollow btn-hollow-white">
                                  <router-link
                                    :to="`/tvCollections/details/${catVid.series_id}`"
                                    @click="logData('video_details',catVid)"
                                    style="display:inherit;height:auto !important"
                                  >Details</router-link>
                              </button>-->
                            </div>
                          </div>

                          <!-- <div class="click_detail" v-on:click="getMeVideo(catVid.series_id,index)">
                            <v-icon dark>expand_more</v-icon>
                          </div>-->
                        </div>
                      </div>
                    </v-hover>
                  </template>
                </div>
              </div>
              <div class="swiper-slider-prev">
                <v-icon>chevron_left</v-icon>
              </div>
              <div class="swiper-slider-next">
                <v-icon>chevron_right</v-icon>
              </div>
            </div>
            
          </div>
        </section>
      </template>
  
    </section>
       <!-- Trending videos -->
 <!-- New Trending Videos -->

 <template v-if="trendingSeries && fused">
      <template >
        <template v-if="trendingSeries && trendingSeries!=undefined && trendingSeries.length > 0">
          <section class="innerCategory__Video">
            <div class="swiper-container slider">
              <br />

   <div class="row ">

            <div class="col">
            <h2>Most Watched</h2>
            </div>
      
            </div>              <!-- <br /> -->
              <div v-swiper="swiperTrending" instanceName="trendingSeries-ad">
                <div class="swiper-wrapper slider-v main-slide-box">
                  <div
                    v-for="catVid in trendingSeries"
                    class="swiper-slide innerthumbs__v"
                    @mouseenter="hoverIn"
                    @mouseleave="hoverOut"
                  >
                    <template v-if="catVid &&catVid.series_id!=0">
                      <v-hover>
                        <div class="v-thumb main-load" :ref="index+catVid.series_id">
                          <div
                            class="sliderimg main-home-custom"
                            style="cursor:pointer"
                            @click="takeMeToDetail(catVid.series_id)"
                          >
                            <div v-if="catVid.is_free" class="free-tag">Free</div>
                            <!-- <span v-if="catVid.live != ''" class="liveicon">live</span> -->
                            <v-img
                              :src="  catVid.thumb"
                              :lazy-src="`${catVid.thumb}`"
                              aspect-ratio="1"
                              class="grey lighten-2"
                            >
                              <v-layout
                                slot="placeholder"
                                fill-height
                                align-center
                                justify-center
                                ma-0
                              >
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                              </v-layout>
                            </v-img>
                          </div>
                          <div class="hover__detaillist custom-hover">
                            <div class="bob-overview-wrapper">
                              <div
                                class="title mx-2 mt-2"
                                v-if="catVid.series_name"
                              >{{catVid.series_name.toLowerCase().trim()}}</div>
                              <time
                                class="caption time mx-2"
                                v-if="catVid.seasons!=undefined"
                              >{{catVid.seasons.length}}</time>
                              <p
                                class="caption dec mx-2"
                                v-if="catVid.series_description"
                              >{{catVid.series_description.toLowerCase().trim()}}</p>
                              <div class="row col button-group">
                                <button
                                  class="btn btn-daikho-hollow"
                                  style="display:flex;justify-content:center;align-items: center"
                                  @click="takeMeToWatch(catVid)"
                                >
                                  <v-icon style="color:#ffc511">play_arrow</v-icon>&nbsp;
                                  <span
                                    style="margin-top:2.5px;display: grid;
                                            align-content: center;"
                                  >Play Now</span>
                                </button>

                                <button class="btn btn-hollow btn-hollow-white">
                                  <router-link
                                    :to="`/tvCollections/details/${catVid.series_id}`"
                                    @click="logData('video_details',catVid)"
                                    style="display:inherit;height:auto !important"
                                  >Details</router-link>
                                </button>
                              </div>
                            </div>

                            <!-- <div class="click_detail" v-on:click="getMeVideo(catVid.series_id,index)">
                            <v-icon dark>expand_more</v-icon>
                            </div>-->
                          </div>
                          <span :ref="index+catVid.series_id+'Arrow'"></span>
                        </div>
                      </v-hover>
                    </template>
                     <template v-if="catVid &&catVid.series_id==0">
                      <v-hover>
                        <div class="v-thumb main-load" >
                          <div
                            class="sliderimg main-home-custom"
                            style="cursor:pointer"
                            @click="takeMeToWatchVideo(catVid)"
                          >
                            <div v-if="catVid.is_free" class="free-tag">Free</div>
                            <!-- <span v-if="catVid.live != ''" class="liveicon">live</span> -->
                            <v-img
                             :src="catVid.files_thumbs_path?catVid.files_thumbs_path:catVid.thumbs.original"
                              :lazy-src="`${catVid.files_thumbs_path?catVid.files_thumbs_path:catVid.thumbs.original}`"
                           
                              aspect-ratio="1"
                              class="grey lighten-2"
                            >
                              <v-layout
                                slot="placeholder"
                                fill-height
                                align-center
                                justify-center
                                ma-0
                              >
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                              </v-layout>
                            </v-img>
                          </div>
                          <div class="hover__detaillist custom-hover">
                            <div class="bob-overview-wrapper">
                              <div
                                class="title mx-2 mt-2"
                                v-if="catVid.title"
                              >{{catVid.title.toLowerCase().trim()}}</div>
                              <time
                                class="caption time mx-2"
                                v-if="catVid.seasons!=undefined"
                              >{{catVid.seasons.length}}</time>
                              <p
                                class="caption dec mx-2"
                                v-if="catVid.description"
                              >    </p>
                              <div class="row col button-group">
                                <button
                                  class="btn btn-daikho-hollow"
                                  style="display:flex;justify-content:center;align-items: center"
                                  @click="takeMeToWatchVideo(catVid)"
                                >
                                  <v-icon style="color:#ffc511">play_arrow</v-icon>&nbsp;
                                  <span
                                    style="margin-top:2.5px;display: grid;
    align-content: center;"
                                  >Play Now</span>
                                </button>
<br/>
                                <!-- <button class="btn btn-hollow btn-hollow-white">
                                  <router-link
                                    :to="`/tvCollections/details/${catVid.series_id}`"
                                    @click="logData('video_details',catVid)"
                                    style="display:inherit;height:auto !important"
                                  >Details</router-link>
                                </button> -->
                              </div>
                            </div>

                            <!-- <div class="click_detail" v-on:click="getMeVideo(catVid.series_id,index)">
                            <v-icon dark>expand_more</v-icon>
                            </div>-->
                          </div>
                        </div>
                      </v-hover>
                    </template>
                  </div>
                </div>
                <div class="swiper-slider-prev">
                  <v-icon>chevron_left</v-icon>
                </div>
                <div class="swiper-slider-next">
                  <v-icon>chevron_right</v-icon>
                </div>
              </div>
              <videoDetails
                v-show="false"
                :ref="index"
                :vData="{'type':index}"
                :closeVideoDetails="closeVideoDetails"
              />
            </div>
          </section>
        </template>
      </template>
    </template>

    <template v-if="seriesByCategories && fused">
      <template v-for="(catVids, index) in seriesByCategories">
        <template v-if="catVids && catVids!=undefined && catVids.length > 0">
          <section class="innerCategory__Video">
            <div class="swiper-container slider">
              <br />

   <div class="row ">

            <div class="col">
            <h2>{{index}}</h2>
            </div>
            <div class="col see-all-col">

   <router-link
   class="float-right see-all"
                  target="_blank"
                  :to="`/${index.toLowerCase().replace(' ','')}`"
                >See all</router-link>
            </div>
            </div>              <!-- <br /> -->
              <div v-swiper="swiperTrending" :instanceName="index">
                <div class="swiper-wrapper slider-v main-slide-box">
                  <div
                    v-for="catVid in catVids"
                    class="swiper-slide innerthumbs__v"
                    @mouseenter="hoverIn"
                    @mouseleave="hoverOut"
                  >
                    <template v-if="catVid &&catVid.series_id!=0">
                      <v-hover>
                        <div class="v-thumb main-load" :ref="index+catVid.series_id">
                          <div
                            class="sliderimg main-home-custom"
                            style="cursor:pointer"
                            @click="takeMeToDetail(catVid.series_id)"
                          >
                            <div v-if="catVid.is_free" class="free-tag">Free</div>
                            <!-- <span v-if="catVid.live != ''" class="liveicon">live</span> -->
                            <v-img
                              :src="catVid.thumb"
                              :lazy-src="`${catVid.thumb}`"
                              aspect-ratio="1"
                              class="grey lighten-2"
                            >
                              <v-layout
                                slot="placeholder"
                                fill-height
                                align-center
                                justify-center
                                ma-0
                              >
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                              </v-layout>
                            </v-img>
                          </div>
                          <div class="hover__detaillist custom-hover">
                            <div class="bob-overview-wrapper">
                              <div
                                class="title mx-2 mt-2"
                                v-if="catVid.series_name"
                              >{{catVid.series_name.toLowerCase().trim()}}</div>
                              <time
                                class="caption time mx-2"
                                v-if="catVid.seasons!=undefined"
                              >{{catVid.seasons.length}}</time>
                              <p
                                class="caption dec mx-2"
                                v-if="catVid.series_description"
                              >{{catVid.series_description.toLowerCase().trim()}}</p>
                              <div class="row col button-group">
                                <button
                                  class="btn btn-daikho-hollow"
                                  style="display:flex;justify-content:center;align-items: center"
                                  @click="takeMeToWatch(catVid)"
                                >
                                  <v-icon style="color:#ffc511">play_arrow</v-icon>&nbsp;
                                  <span
                                    style="margin-top:2.5px;display: grid;
                                            align-content: center;"
                                  >Play Now</span>
                                </button>

                                <button class="btn btn-hollow btn-hollow-white">
                                  <router-link
                                    :to="`/tvCollections/details/${catVid.series_id}`"
                                    @click="logData('video_details',catVid)"
                                    style="display:inherit;height:auto !important"
                                  >Details</router-link>
                                </button>
                              </div>
                            </div>

                            <!-- <div class="click_detail" v-on:click="getMeVideo(catVid.series_id,index)">
                            <v-icon dark>expand_more</v-icon>
                            </div>-->
                          </div>
                          <span :ref="index+catVid.series_id+'Arrow'"></span>
                        </div>
                      </v-hover>
                    </template>
                     <template v-if="catVid &&catVid.series_id==0">
                      <v-hover>
                        <div class="v-thumb main-load" >
                          <div
                            class="sliderimg main-home-custom"
                            style="cursor:pointer"
                            @click="takeMeToWatchVideo(catVid)"
                          >
                            <div v-if="catVid.is_free" class="free-tag">Free</div>
                            <!-- <span v-if="catVid.live != ''" class="liveicon">live</span> -->
                            <v-img
                             :src="catVid.files_thumbs_path?catVid.files_thumbs_path:catVid.thumbs.original"
                              :lazy-src="`${catVid.files_thumbs_path?catVid.files_thumbs_path:catVid.thumbs.original}`"
                           
                              aspect-ratio="1"
                              class="grey lighten-2"
                            >
                              <v-layout
                                slot="placeholder"
                                fill-height
                                align-center
                                justify-center
                                ma-0
                              >
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                              </v-layout>
                            </v-img>
                          </div>
                          <div class="hover__detaillist custom-hover">
                            <div class="bob-overview-wrapper">
                              <div
                                class="title mx-2 mt-2"
                                v-if="catVid.title"
                              >{{catVid.title.toLowerCase().trim()}}</div>
                              <time
                                class="caption time mx-2"
                                v-if="catVid.seasons!=undefined"
                              >{{catVid.seasons.length}}</time>
                              <p
                                class="caption dec mx-2"
                                v-if="catVid.description"
                              >       </p>
                              <div class="row col button-group">
                                <button
                                  class="btn btn-daikho-hollow"
                                  style="display:flex;justify-content:center;align-items: center"
                                  @click="takeMeToWatchVideo(catVid)"
                                >
                                  <v-icon style="color:#ffc511">play_arrow</v-icon>&nbsp;
                                  <span
                                    style="margin-top:2.5px;display: grid;
    align-content: center;"
                                  >Play Now</span>
                                </button>
<br/>
                                <!-- <button class="btn btn-hollow btn-hollow-white">
                                  <router-link
                                    :to="`/tvCollections/details/${catVid.series_id}`"
                                    @click="logData('video_details',catVid)"
                                    style="display:inherit;height:auto !important"
                                  >Details</router-link>
                                </button> -->
                              </div>
                            </div>

                            <!-- <div class="click_detail" v-on:click="getMeVideo(catVid.series_id,index)">
                            <v-icon dark>expand_more</v-icon>
                            </div>-->
                          </div>
                        </div>
                      </v-hover>
                    </template>
                  </div>
                </div>
                <div class="swiper-slider-prev">
                  <v-icon>chevron_left</v-icon>
                </div>
                <div class="swiper-slider-next">
                  <v-icon>chevron_right</v-icon>
                </div>
              </div>
              <videoDetails
                v-show="false"
                :ref="index"
                :vData="{'type':index}"
                :closeVideoDetails="closeVideoDetails"
              />
            </div>
          </section>
        </template>
      </template>
    </template>
    <section v-if="ComedyData">
      <template v-if="ComedyData.length > 0">
        <section class="innerCategory__Video">
          <div class="swiper-container slider">
            <br />
   <div class="row ">

            <div class="col">
            <h2>Action Thriller</h2>
            </div>
            <div class="col see-all-col">

   <router-link
   class="float-right see-all"
                  target="_blank"
                  :to="`/action`"
                >See all</router-link>
            </div>
            </div>
            <!-- <br /> -->
            <div v-swiper="swiperTrending" instanceName="Action">
              <div class="swiper-wrapper slider-v main-slide-box">
                <div
                  v-for="catVid in ComedyData"
                  class="swiper-slide innerthumbs__v"
                  @mouseenter="hoverIn"
                  @mouseleave="hoverOut"
                >
                  <template v-if="catVid ">
                    <v-hover>
                      <div class="v-thumb main-load" :ref="catVid.videoid">
                        <div
                          class="sliderimg main-home-custom"
                          style="cursor:pointer"
                          @click="takeMeToWatchVideo(catVid)"
                        >
                          <div v-if="catVid.is_free" class="free-tag">Free</div>
                          <!-- <span v-if="catVid.live != ''" class="liveicon">live</span> -->
                          <v-img
                            :src="catVid.files_thumbs_path?catVid.files_thumbs_path:catVid.thumbs.original"
                              :lazy-src="`${catVid.files_thumbs_path?catVid.files_thumbs_path:catVid.thumbs.original}`"
                             aspect-ratio="1"
                            class="grey lighten-2"
                          >
                            <v-layout
                              slot="placeholder"
                              fill-height
                              align-center
                              justify-center
                              ma-0
                            >
                              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-layout>
                          </v-img>
                        </div>
                        <div class="hover__detaillist custom-hover">
                          <div class="bob-overview-wrapper">
                            <div
                              class="title mx-2 mt-2"
                              v-if="catVid.title"
                            >{{catVid.title.toLowerCase().trim()}}</div>
                            <!-- <time
                                class="caption time mx-2"
                                v-if="catVid.seasons!=undefined"
                            >{{catVid.seasons.length}}</time>-->
                            <p
                              class="caption dec mx-2"
                              v-if="catVid.description"
                            >     </p>
                            <div class="row col button-group">
                              <button
                                class="btn btn-daikho-hollow"
                                  style="display:flex;justify-content:center;align-items: center"
                                @click="takeMeToWatchVideo(catVid)"
                              >
                                <v-icon style="color:#ffc511">play_arrow</v-icon>&nbsp;
                                <span
                                  style="margin-top:2.5px;display: grid;
    align-content: center;"
                                >Play Now</span>
                              </button>
<br/>
                              <!-- <button class="btn btn-hollow btn-hollow-white">
                                  <router-link
                                    :to="`/tvCollections/details/${catVid.series_id}`"
                                    @click="logData('video_details',catVid)"
                                    style="display:inherit;height:auto !important"
                                  >Details</router-link>
                              </button>-->
                            </div>
                          </div>

                          <!-- <div class="click_detail" v-on:click="getMeVideo(catVid.series_id,index)">
                            <v-icon dark>expand_more</v-icon>
                          </div>-->
                        </div>
                      </div>
                    </v-hover>
                  </template>
                </div>
              </div>
              <div class="swiper-slider-prev">
                <v-icon>chevron_left</v-icon>
              </div>
              <div class="swiper-slider-next">
                <v-icon>chevron_right</v-icon>
              </div>
            </div>
            
          </div>
        </section>
      </template>
  
    </section>
   
   
    <section v-if="DramaData">
      <template v-if="DramaData.length > 0">
        <section class="innerCategory__Video">
          <div class="swiper-container slider">
            <br />
            <div class="row ">

            <div class="col">
            <h2>Drama</h2>
            </div>
            <div class="col see-all-col">

   <router-link
   class="float-right see-all"
                  target="_blank"
                  :to="`/drama`"
                >See all</router-link>
            </div>
            </div>
            <!-- <br /> -->
            <div v-swiper="swiperTrending" :instanceName="index">
              <div class="swiper-wrapper slider-v main-slide-box">
                <div
                  v-for="catVid in DramaData"
                  class="swiper-slide innerthumbs__v"
                  @mouseenter="hoverIn"
                  @mouseleave="hoverOut"
                >
                  <template v-if="catVid ">
                    <v-hover>
                      <div class="v-thumb main-load" :ref="catVid.videoid">
                        <div
                          class="sliderimg main-home-custom"
                          style="cursor:pointer"
                          @click="takeMeToWatchVideo(catVid)"
                        >
                          <div v-if="catVid.is_free" class="free-tag">Free</div>
                          <!-- <span v-if="catVid.live != ''" class="liveicon">live</span> -->
                          <v-img
                            :src="catVid.files_thumbs_path?catVid.files_thumbs_path:catVid.thumbs.original"
                            :lazy-src="catVid.files_thumbs_path?catVid.files_thumbs_path:catVid.thumbs.original"

                            aspect-ratio="1"
                            class="grey lighten-2"
                          >
                            <v-layout
                              slot="placeholder"
                              fill-height
                              align-center
                              justify-center
                              ma-0
                            >
                              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-layout>
                          </v-img>
                        </div>
                        <div class="hover__detaillist custom-hover">
                          <div class="bob-overview-wrapper">
                            <div
                              class="title mx-2 mt-2"
                              v-if="catVid.title"
                            >{{catVid.title.toLowerCase().trim()}}</div>
                            <!-- <time
                                class="caption time mx-2"
                                v-if="catVid.seasons!=undefined"
                            >{{catVid.seasons.length}}</time>-->
                            <p
                              class="caption dec mx-2"
                              v-if="catVid.description"
                            >     </p>
                            <div class="row col button-group">
                              <button
                                class="btn btn-daikho-hollow"
                                  style="display:flex;justify-content:center;align-items: center"
                                @click="takeMeToWatchVideo(catVid)"
                              >
                                <v-icon style="color:#ffc511">play_arrow</v-icon>&nbsp;
                                <span
                                  style="margin-top:2.5px;display: grid;
    align-content: center;"
                                >Play Now</span>
                              </button>
<br/>
                              <!-- <button class="btn btn-hollow btn-hollow-white">
                                  <router-link
                                    :to="`/tvCollections/details/${catVid.series_id}`"
                                    @click="logData('video_details',catVid)"
                                    style="display:inherit;height:auto !important"
                                  >Details</router-link>
                              </button>-->
                            </div>
                          </div>

                          <!-- <div class="click_detail" v-on:click="getMeVideo(catVid.series_id,index)">
                            <v-icon dark>expand_more</v-icon>
                          </div>-->
                        </div>
                      </div>
                    </v-hover>
                  </template>
                </div>
              </div>
              <div class="swiper-slider-prev">
                <v-icon>chevron_left</v-icon>
              </div>
              <div class="swiper-slider-next">
                <v-icon>chevron_right</v-icon>
              </div>
            </div>
            
          </div>
        </section>
      </template>
  
    </section>
   
    <section class="innerCategory__Video">
      <div class="col">
        <h2>
          Pranks
          <small
            style="font-size:14px;margin-top: 4px;color:#FFC511;
          position: absolute;margin-left: 5px;"
          >Free</small>
        </h2>
        <br />
        <br />

        <pranks />
      </div>
    </section>

    <!-- <template v-if="!dataLoading">
      <div class="featured-content-custom" v-if="seriesItem5">
        <div class="col title lrp-0">
          <h2>Featured Content</h2>
        </div>
        <div class="col-md-12 d-flex justify-content-center lrp-0">
          <div class="col-md-7 image-sec">
            <img :src="seriesItem5.thumb" height />
          </div>
          <div class="col-md-5 p10-v">
            <h1
              style="text-transform:capitalize"
              v-if="seriesItem5.series_name"
            >{{seriesItem5.series_name.toLowerCase().trim()}}</h1>
            <br />
            <p>{{seriesItem5.series_description}}</p>
            <div class="row col button-group">
              <v-btn class="btn btn-grey btn-grey" @click="takeMeToWatch(seriesItem5)">
                <v-icon>play_arrow</v-icon>Watch Now
              </v-btn>&nbsp;
              &nbsp;
              &nbsp;
              <v-btn
                class="btn btn-hollow btn-hollow-white"
                :to="`/tvCollections/details/${seriesItem5.series_id}`"
              >See Details</v-btn>
            </div>
          </div>
        </div>
      </div>
    </template> -->
    <template v-if="!featured_loaded">
      <circleLoader />
    </template>
  </v-content>
</template>
<script>
import editorPicks from "~/components/default/home/editorPicks";
import pranks from "~/components/default/pranks";
import genreList from "~/components/default/genreList";
import featuredVideos from "~/components/default/home/featuredVideos";
import videoDetails from "~/components/default/base/videoDetails";
import circleLoader from "~/components/default/circleLoader";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "home",
  // middleware: ["auth"],
  head() {
    return {
      titleTemplate: "%s - " + this.configs.site_slogan,
      meta: [
        {
          name: "description",
          content: "Welcome to the world of your favourite movies and tv shows"
        }
      ]
    };
  },

  data() {
    return {
      seriesItem1: [],
      seriesItem2: [],
      trendingSeries:[],
      seriesItem3: [],
      DramaData:null,
      seriesItem4: [],      latestRelease:[],

      seriesItem5: [],
      // Slider Options
      swiperOption: {
        // 				autoplay: {
        //     delay: 2000,
        //   },

        loop: true,
        // direction: "horizontal",
        nav: true,
        // pagination: {
        //   el: ".swiper-pagination"
        // },
        navigation: {
          nextEl: ".editer_next",
          prevEl: ".editer_prev"
        },
        effect: "slide",
        // Distance between slides in px.
        // spaceBetween: 30,
        //
        slidesPerView: 1.4,
        //
        // initialSlide:1,
        centeredSlides: true,
        //
        loop: true,
        slidesPerView: 3,
        breakpoints: {
          1400: {
            slidesPerView: 1.4,
            spaceBetween: 0
          },
          1024: {
            slidesPerView: 1.4,
            spaceBetween: 0
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 0
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 0
          },
          375: {
            slidesPerView: 1,
            spaceBetween: 0
          }
        }
      },
      swiperOptionh: {
        slidesPerView: 5,
        spaceBetween: 10,
        loop: false,
        breakpoints: {
          1400: {
            slidesPerView: 5,
            spaceBetween: 2
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 6
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 5
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 5
          },
          375: {
            slidesPerView: 1,
            spaceBetween: 5
          }
        },
        navigation: {
          nextEl: ".feucher_next",
          prevEl: ".feucher_prev"
        }
      },
      swiperTrending: {
        simulateTouch: true,
        slidesPerView: 4.8,
        spaceBetween: 4,
        slidesPerGroup: 3,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        breakpoints: {
       
          1400: {
            slidesPerView: 4.0,
            spaceBetween: 2
          },
          
          1024: {
            slidesPerView: 3.8,
            spaceBetween: 4
          },
          768: {
            slidesPerView: 2.7,
            spaceBetween: 2,
            slidesPerGroup: 2
          },
          640: {
            slidesPerView: 2.7,
            spaceBetween: 2,
            slidesPerGroup: 2
          }, 
          375: {
            slidesPerView: 2.5,
            spaceBetween: 2,
            slidesPerGroup: 2
          }
        },
        navigation: {
          nextEl: ".swiper-slider-next",
          prevEl: ".swiper-slider-prev"
        }
      },
      // Slider Options
      editorPicks: [],
      recentVideos: [],
      trendingVideos: [],
      featuredVideos: [],
      featuredSeries: [],
      fused: false,

      movies_comedy: null,
      ComedyData: null,
      moviesloading: false,
      pranksData: null,
      myList: [],
      seriesByCategories: "",
      categoryVideos: [],
      videoCategories: [],
      rowIdentifier: "",
      prevIdentifier: "",
      prevVid: "",
      epIsHere: false,
      featuredLoading: true,
      featured_loaded: false,
      categoriesLoading: true,
      trendingLoading: true,
      dataLoading: true
    };
  },
  computed: {
    ...mapGetters(["configs"])
  },
  components: {
    editorPicks,
    featuredVideos,
    videoDetails,
    circleLoader,
    genreList,
    pranks
  },
  methods: {
    hidePopup() {
      this.hide();
      localStorage.setItem("show_popup", "false");
    },
    show() {
      this.$modal.show("hello-world");
    },
    hide() {
      this.$modal.hide("hello-world");
    },
    setPageData() {
      try {
        this.$axios.get(`/base/homePage`).then(
          response => {
            let homeData = response.data.data;
            this.editorPicks = homeData.editor_picks;
            if (this.editorPicks)
              if (this.editorPicks.length > 0) this.epIsHere = true;
            this.myList = homeData.my_list;
            // console.log(homeData.featured_series);
            this.featuredSeries = homeData.featured_series;

            this.dataLoading = false;
          },
          err => {
            this.dataLoading = false;
            if (!err.response) {
              this.$store.commit(
                "snackIt",
                "Server isn't responding video categories can't be fetched"
              );
            } else if (err.response.status == 401) {
              this.$store.commit(
                "snackIt",
                "You are not authorized to access this route"
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    },

    setFeaturedSeries() {
      try {
        this.$axios.get(`/series/list/?featured=1`).then(
          response => {
            let total_featured = 0;
            let loaded_featured = 0;
            let featuredSeries_Obj = [];
            let series = response.data.series.featured;
            series.map(item => {
              total_featured++;
              axios
                .get("https://deikho.com/api/series/list/" + item.series_id)
                .then(response => {
                  if (response.data.status) {
                    // let seasons = response.data.series.series_by_id[0].seasons;
                    // featuredSeries_Obj["seasons"]=seasons;
                    featuredSeries_Obj.push(
                      response.data.series.series_by_id[0]
                    );
                    loaded_featured++;
                    if (loaded_featured == total_featured) {
                      this.featuredSeries = featuredSeries_Obj;
                      // console.log(
                      //   "sete featured series",
                      //   JSON.stringify(this.featuredSeries)
                      // );

                      this.featured_loaded = true;

                      // console.log("asd",JSON.stringify(featuredSeries_Obj));
                    }
                  }
                })
                .catch(err => {
                  console.log(err);
                  return err;
                });
            });
          },
          err => {
            if (!err.response) {
              this.$store.commit(
                "snackIt",
                "Server isn't responding video categories can't be fetched"
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    },
    setVideoCategories() {
      try {
        this.$axios.get(`/videos/categories/`).then(
          response => {
            this.videoCategories = response.data.categories;
          },
          err => {
            if (!err.response) {
              this.$store.commit(
                "snackIt",
                "Server isn't responding video categories can't be fetched"
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    },
    hoverIn(e) {
      this.$mouseEnter(e);
    },
    hoverOut(e) {
      this.$mouseLeave(e);
    },
    getCategoryName(category_id) {
      let obj = this.$findObjectByKey(
        this.videoCategories,
        "category_id",
        category_id
      );
      return obj.category_name;
    },

    takeMeToDetail(series_id) {
      this.$router.push(`/tvCollections/details/${series_id}`);
    },
    takeMeToWatch(seriesObj) {
      
      axios
        .get("https://deikho.com/api/series/list/" + seriesObj.series_id)
        .then(response => {
          // console.log("Seasons data", response);
          if (response.data.status) {
            let seasons = response.data.series.series_by_id[0].seasons;
            //  let seasons = seriesObj.seasons;
            let firstSeason = seasons.filter(season => season.sequence == 1);
            firstSeason = firstSeason[0];
            let minMaxOfEpisodes = this.$minMaxOfArrayOfObjects(
              firstSeason.episodes,
              "videoid"
            );
            let episode_id = minMaxOfEpisodes.min;
      this.logData("video_play", seriesObj,episode_id);

            if (!minMaxOfEpisodes)
              this.$store.commit(
                "snackIt",
                "No episodes added in this series's seasons"
              );
            else {
              console.log(
                "network changed",
                localStorage.getItem("network_changed")
              );
              if (
                localStorage.getItem("network_changed") == true ||
                localStorage.getItem("network_changed") == "true"
              ) {
                console.log("header video ");
                window.location.href = `http://www.deikho.com/watch_video.html?episode_id=${episode_id}&type=series&series_id=${seriesObj.series_id}&season_id=${firstSeason.season_id}&source=${seriesObj.is_free}`;
              } else {
                console.log("watch ");
                this.$router.push(
                  `/watch/${episode_id}?type=series&series_id=${seriesObj.series_id}&season_id=${firstSeason.season_id}&source=${seriesObj.is_free}`
                );
              }

              //
            }
          }
        })
        .catch(err => {
          console.log(err);
          return err;
        });
    },
     takeMeToWatchVideo(videoObj) {
                          this.$fb.track("ViewContent",{
         msisdn: this.$store.getters.currentUser
          ? this.$store.getters.currentUser.msisdn
          : "N/A",
          videoid:videoObj.videoid,
        video_title: videoObj.title
      });	
           if (
        localStorage.getItem("network_changed") == true ||
        localStorage.getItem("network_changed") == "true"
      ) {
        console.log("header video ");
        window.location.href = `http://www.deikho.com/watch_video.html?episode_id=${videoObj.videoid}&type=video&series_id=${videoObj.series_id}&season_id=${videoObj.season_id}&source=${videoObj.is_free}`;
      } else {
        console.log("watch ");
        this.$router.push(
          `/watch/${videoObj.videoid}?type=video&series_id=${videoObj.series_id}&season_id=${videoObj.season_id}&source=${videoObj.is_free}`
        );
      }
    },
    takeMeToWatchPrank(videoid, series_id, season_id, title, obj) {
                      this.$fb.track("ViewContent",{
         msisdn: this.$store.getters.currentUser
          ? this.$store.getters.currentUser.msisdn
          : "N/A",
          videoid:videoid,
        video_title: title
      });	
      this.$fireAnalyticsObj().logEvent("video_play", {
        msisdn: this.$store.getters.currentUser
          ? this.$store.getters.currentUser.msisdn
          : "N/A",
        video_title: title
      });
   
      if (
        localStorage.getItem("network_changed") == true ||
        localStorage.getItem("network_changed") == "true"
      ) {
        console.log("header video ");
        window.location.href = `http://www.deikho.com/watch_video.html?episode_id=${videoid}&type=series&series_id=${series_id}&season_id=${season_id}&source=${obj.is_free}`;
      } else {
        console.log("watch ");
        this.$router.push(
          `/watch/${videoid}?type=series&series_id=${series_id}&season_id=${season_id}&source=${obj.is_free}`
        );
      }
    },
    setSeriesByCategories() {
      // `/series/list/?getSeriesByCategories=1&maturity_level=${this.$store.getters.currentProfile.maturity_level}`

      try {
        this.dataLoading = true;
        this.$axios.get(`/series/listing/?getSeriesByCategories=1`).then(
          response => {
            // console.log("show_popup", localStorage.getItem("show_popup"));
            // if (
            //   localStorage.getItem("show_popup") == true ||
            //   localStorage.getItem("show_popup") == null
            // ) {
            //   this.$modal.show("hello-world", { foo: "bar" });
            // }
            this.seriesByCategories = response.data.series.series_by_categories;

            if (this.movies_comedy) {
              const combined1 = [].concat(
                this.seriesByCategories["Comedy"],
                this.movies_comedy
              );
              this.seriesByCategories["Comedy"] = combined1;
              this.fused = true;
            }
            // this.sliderData = this.seriesByCategories["Web Series"];
          
            this.featuredSeries = [
               {
            "videoid": 1963,
            "videokey": "1M2G412HODON",
            "video_password": "",
            "video_users": " ",
            "username": "",
            "userid": 204,
            "maturity_level": "all",
            "title": "Anjaam",
            "is_free": 0,
            "free_url": null,
            "file_name": "160581712609661xs9991r9b3",
            "file_type": 2,
            "description": "An unfortunate love story of a girl that fell prey to hideous crime of her own lover",
            "tags": "film.mp4",
            "category": "#12# #16# #19# ",
            "category_parents": "",
            "broadcast": "public",
            "location": "",
            "datecreated": "1970-01-01 00:00:00",
            "country": "0",
            "blocked_countries": "",
            "sprite_count": 0,
            "season_id": 0,
            "series_id": 0,
            "sequence": 0,
            "allow_embedding": "yes",
            "rating": 0,
            "rated_by": "0",
            "voter_ids": "",
            "featured": "yes",
            "featured_order": null,
            "featured_date": "0000-00-00 00:00:00",
            "featured_description": "",
            "allow_rating": "yes",
            "active": "yes",
            "favourite_count": "0",
            "playlist_count": "0",
            "views": 0,
            "last_viewed": "0000-00-00 00:00:00",
            "date_added": "2020",
            "flagged": "no",
            "duration": " 11m",
            "status": "Successful",
            "failed_reason": "none",
            "default_thumb": 6,
            "aspect_ratio": "",
            "embed_code": "",
            "refer_url": "",
            "downloads": 0,
            "uploader_ip": "127.0.0.1",
            "mass_embed_status": "no",
            "unique_embed_code": "",
            "remote_play_url": "",
            "video_files": "[1080,720,480,360,240]",
            "server_ip": "",
            "file_server_path": "",
            "file_directory": "2020/11/19",
            "files_thumbs_path": "",
            "file_thumbs_count": "",
            "has_hq": "no",
            "filegrp_size": "",
            "process_status": 0,
            "video_version": "2.7",
            "extras": "",
            "subscription_email": "sent",
            "thumbs_version": "2.8",
            "re_conv_status": "",
            "conv_progress": "",
            "is_premium": "no",
            "credits_required": 0,
            "premium_cid": 0,
            "in_editor_pick": "no",
            "has_subs": "no",
            "total_subs": 0,
            "last_sub_num": 0,
            "live": "",
            "start_published_date": "2020-11-20 00:00:00",
            "end_published_date": "2022-11-20 00:00:00",
            "has_sprite": "no",
            "version": 1,
            "has_resulotion": "no",
            "aws_service_id": 2,
            "aws_cdn": "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/11/19/160581712609661xs9991r9b3/160581712609661xs9991r9b3.m3u8",
            "aws_thumb_path": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/11/19/160581712609661xs9991r9b3/",
            "aws_migrate": "no",
            "aws_thumbs_count": 7,
            "poster_thumb": "https://deikho.com/images/video_thumbs_poster/2020/11/19/1963.jpg",
            "files": [
          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/11/26/1606389103609r90vau13eq4/1606389103609r90vau13eq4.m3u8?Expires=1606687397&Signature=TKkziO2xMeFqnSJvWV7-coKAX-Qb0i8N7PSEL06n9l9CP91bM5iUvEOlFIMXeINgaQgO3r2jLRaOS-b75uyDtPzA-xekB79kEBV5~Ha9TSQFmIk-qpVx7Qml6VgQ8ohAfWzg0Z5k44d6opunXV8oGwCeIkQ-GyuXeUKXzd7c22YES6FfCnslNOD2OhixAYxPmI66-9vKKvmBRypTs36HMEbtjDlcKr2bs1W7WlO3lw2cfZnlsQatbwY~r9JUg-siOQHAWm853W-3H1sTF1vHRzlRCVnkU5gX1arOV-4D2Tm71cbEA5ccmdzQxvk6ym0qt4T2f3f5BuMmbohqVqq6Dw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"  ],
            "thumbs": {
                "original": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/11/19/160581712609661xs9991r9b3/160581712609661xs9991r9b3-original.0000006.jpeg?Expires=1606687397&Signature=LhquVpSBWrFWEEXMC-292QpBuyqLondVg4q-vAu0-KC4JiCey7I13E2x5-f01UxkEu556VNSA8HZx2ZW-jBspzRYof62EAWIA3X7RnUg5mtQRmUercdMC7DKr9iEK3RmRvbiLD3A0cH7~vQCbN8wbPdZugX7vBCKif2zIWQzhwnps4FGFpIRpzoormxYe54IbAzS79TVI4L92O7GfENsClt7boXB~CsdL5sIOXCmYCVJqv4OmLCjxb5D8Fgj6LjVQMnJ58Av-y3T-HW1AHEFpIosLOezDedNFSOGzZICBNBr8mm9QZbbx9FKut~xNBgh2cEc2yS1HIrX60~UDlpqIw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                "168x105": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/11/19/160581712609661xs9991r9b3/160581712609661xs9991r9b3-168x105.0000006.jpeg?Expires=1606687398&Signature=UHOQtktuQyHI4uW6967b7V-PnkAi1oAYeMlfGe~jd1u~75qw-7lRm4jRJ0JrzWmiK0GZbGs~Uq8PPQwPc1YkefK3P~PC7DIshOCags9xpYl2D9hCsdSHGo2q8FnJPmEQfqPLGNAlSNdPwwMIgry5rToLh0BsCJs5cxu7C-KYMM~GSL7DkBcVHgq-0U8QT2FEkkRl0TEfeTl1dtFMz0n~2tLk7HkwAn5YJBig8Wv8yzpGU4hkBWHizFDDDaJjuM~UptgjMDk9wwX8qfqJZ~PWpRXg7KTV58A1bkRVk3lucRNFTGKMiJgkdu~v~xVO8i4nvDuOxXv11DH2NErsmWruiA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                "416x260": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/11/19/160581712609661xs9991r9b3/160581712609661xs9991r9b3-416x260.0000006.jpeg?Expires=1606687398&Signature=f9XSM3UvPL5knV8wT4~cK~eq8Cg0bZjTJivHJC89HjX~vuyM4R2yy7MrKDt05IDudhzQhp9o94I~aePVFxnP~PATS0sREwqUPuBKFH1Gq02bl~Sys~uEzROq7V718jyaPGzx4whnXJXYdEkwbhGUO0aZcz3xZMt6wN07U4NXjc5wx-lt5ZfpioTtxIsR1FOO0M1S648aA30vghl52rOdrTmfE6WRF~98jROJHWrKfWDjLaWKzSr39yGiq0LW6-LUtXqhJR~AOxAaTdXvnp1Rm85mPn9teN5LIfafUw2epqnY-YO-e-a-SN0IxGVURU~31DSqif9YojgOCzXHozUe0A__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                "632x395": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/11/19/160581712609661xs9991r9b3/160581712609661xs9991r9b3-632x395.0000006.jpeg?Expires=1606687398&Signature=G40Mm1-tfuOlrPwAlXNPnQadgOVnQuF6oqotRMvdDaunthPmMo8dtkvXNhLbyFz4aorSKZGrcRBHk2Bm7tamsZ3ZcGBAQy13sCW833pbfvTfTDMMgYsGWQvQjAm4DfTTFmopzt-SBZAZc8aLaqhlxmoLHm1nFBhuooNhGFAb-Rf-QLsHEl5Xw94~hsWMux8qQGMTXuZx2sx982xeLbnkbVcdrSk1YMfATHOfsaIqTvaT-0OLPOijHlKa-67LZTURhHwRSTMPtnK05jGmQJ2ijSWXZbUWVl97TKFThxe6mzjuK8T~KCmasa2GfZ-1eusFdRkhqvZIpAynY~zJJs5nDw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                "768x432": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/11/19/160581712609661xs9991r9b3/160581712609661xs9991r9b3-768x432.0000006.jpeg?Expires=1606687398&Signature=ajFVqXzhO~QY-Ci3kodXltR~cEZxncQiPyAeOdO708TTRGvaoIHVMqOd9jndUvmuhigJg36pSQ0zC0LDr65xhnNyOiliagYkkdzfoYsdGyZiN4jTcNqBFQJFUD2~oe~6kwal858MkL18ZdzxFl1UNoc4MKseBRIbC2plesrSPqMMAFVgKvJtFi4Mq6xmNls6RYVcNpX70BkEmD6iNgkAlM6jM52OEigLDc5gKe~mvaDIr4-gS43xY2WN-RCzFFPbzlygeDyTlIR9dJX4T8FBf6pn3V75lkEszlVcxXIJRMAXoyh0lj3xIdiz-CQGIWt3uti7t4ffT3WmGhe36msq3A__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                "200x288": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/11/19/160581712609661xs9991r9b3/160581712609661xs9991r9b3-200x288.0000006.jpeg?Expires=1606687398&Signature=S7cvqIsSF8m6PzUs5nTP2QOOEC9b5QAIu1vASGqdVDtbp-9f0xNbRL9bxH5HJSOiZCoWEd7Oj0SiwzeR~1h1b-s1C2O~FgsVPwDiIBIg9hiHRj5Ef5hJDy7HstjSmVocipr~jsW8eS6sAheemxuOJz7H2AcznALg3YYe3zmKD01gte1s8~5Psmwp1BtIg2tXxXnpwzomRQR96a0Ys2eR9XVd7v41j-vm~-CWEM8XnjKl14QQDUTb5HLwrVCsjKkhI8R-FFtpIQ5S90T~-BwHpkbyClrg8sWZnfdkxgrqx9XEWcUJNjp4K-nw4Iq4M9J9HVOzaes68BuQItIJ2AqwKQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
            },
            "gif": null,
            "logo": null,
            "sprite": null,
            "categories": [
                {
                    "category_id": 12,
                    "parent_id": 0,
                    "category_name": "Action",
                    "category_order": 1,
                    "category_desc": "Action",
                    "date_added": "2019-07-23 09:31:59",
                    "category_thumb": "https://deikho.com/images/category_thumbs/video/12.png",
                    "featured": "yes",
                    "isdefault": "no",
                    "navbar": "no",
                    "series_category": "9"
                },
                {
                    "category_id": 16,
                    "parent_id": 0,
                    "category_name": "Thriller",
                    "category_order": 1,
                    "category_desc": "Thriller",
                    "date_added": "2019-07-23 09:50:48",
                    "category_thumb": "https://deikho.com/images/category_thumbs/video/16.png",
                    "featured": "no",
                    "isdefault": "no",
                    "navbar": "no",
                    "series_category": null
                },
                {
                    "category_id": 19,
                    "parent_id": 0,
                    "category_name": "Drama",
                    "category_order": 1,
                    "category_desc": "Drama",
                    "date_added": "2019-07-23 09:51:09",
                    "category_thumb": "https://deikho.com/images/category_thumbs/video/19.png",
                    "featured": "yes",
                    "isdefault": "no",
                    "navbar": "no",
                    "series_category": null
                }
            ],
            "interval": "660",
            "captions": []
        },
                   {
                "series_id": 56,
                "series_name": "Mein aur Woh",
                "series_description": "Mein aur Woh, a light hearted series revolving around daily life issues of a couple. The series promises to bring a high dose of laughter, emotion and quirkiness for their audience.",
                "series_tags": "Comedy",
                "maturity_level": "all",
                "category": "#5# ",
                "userid": 204,
                "views": 0,
                "date_added": "2020-08-18 18:10:41",
                "featured": "yes",
                "broadcast": "public",
                "allow_comments": "",
                "allow_rating": "yes",
                "total_comments": 0,
                "last_commented": "0000-00-00 00:00:00",
                "total_objects": 0,
                "rating": 0,
                "rated_by": 0,
                "voters": "",
                "active": "yes",
                "public_upload": "",
                "type": "",
                "file_directory": "2020/08/18",
                "file_server_path": "",
                "file_thumbs_path": "",
                "aws_service_id": 2,
                "aws_cdn": "https://d2o1c9j7e49z0u.cloudfront.net",
                "ext_thumb": "jpg",
                "aws_migrate": "no",
                "is_free": 0,
                "poster": "https://deikho.com/images/series_posters/2020/08/18/56.jpg",
                "portrait": null,
                "cat_featured": null,
                "in_editor_pick": null,
                "datecreated": "2020-08-18 18:10:41",
                "start_published_date": "2020-08-18 00:00:00",
                "end_published_date": "2020-08-18 00:00:00",
                "thumb": "https://d2o1c9j7e49z0u.cloudfront.net/file/series_thumb/2020/08/18/56.jpg?Expires=1600063515&Signature=G-ZYtFuxYYVCndo-sAAcR02fhjbiTNkY4LLQb0W~TCDHMWSv-DV1xpQ8ORdWb6g8shFZFVDfe9kAVkCEuRjD9kEiBuCQbHyZLenW8JLxSiNc5T3jBljZqCM8FjI4q0tArYCTQqU6XfxNNgnqpuoFjGQbjX8Y0sDylSBPnnMGWWppalhqnz1a3e4cS30ZIQkDa7n76m2KmMJ13lKkQKyKYIn9p75a7WWys6Xd8TKxWDVb36AqSPWdflr-nqTLQRdXcIWzPV2ZFbt01saqEOPqz8ohbGrB0kh4h8jSvHsNImMpi5xXiwXJbSoxsP3XKzST858X~eBxUDd8mnKYgCimRA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                "categories": [
                    {
                        "category_id": 5,
                        "parent_id": 1,
                        "category_name": "Web Series",
                        "category_order": 1,
                        "category_desc": "&lt;p&gt;&lt;br&gt;&lt;/p&gt;",
                        "date_added": "2019-10-24 05:10:14",
                        "category_thumb": 0,
                        "featured": "no",
                        "isdefault": ""
                    }
                ],
                "seasons": [
                    {
                        "season_id": 70,
                        "series_id": 56,
                        "sequence": 1,
                        "episodes_count": 0,
                        "date_added": "2020-08-18 18:10:41",
                        "episodes": [
                            {
                                "videoid": 1752,
                                "videokey": "N5S3D77X6N6A",
                                "video_password": "",
                                "video_users": " ",
                                "username": "",
                                "userid": 204,
                                "maturity_level": "all",
                                "title": "Trailer",
                                "is_free": 0,
                                "free_url": null,
                                "file_name": "15979167908968aon6ikurc4",
                                "file_type": 2,
                                "description": "        ",
                                "tags": "final,trailer,mein,aur,woh.mp4",
                                "category": "#29# ",
                                "category_parents": "",
                                "broadcast": "public",
                                "location": "",
                                "datecreated": "1970-01-01 00:00:00",
                                "country": "0",
                                "blocked_countries": "#0# ",
                                "sprite_count": 0,
                                "season_id": 70,
                                "series_id": 56,
                                "sequence": 0,
                                "allow_embedding": "yes",
                                "rating": 0,
                                "rated_by": "0",
                                "voter_ids": "",
                                "featured": "no",
                                "featured_order": null,
                                "featured_date": "0000-00-00 00:00:00",
                                "featured_description": "",
                                "allow_rating": "yes",
                                "active": "yes",
                                "favourite_count": "0",
                                "playlist_count": "0",
                                "views": 0,
                                "last_viewed": "0000-00-00 00:00:00",
                                "date_added": "2020",
                                "flagged": "no",
                                "duration": " 1m 59s",
                                "status": "Successful",
                                "failed_reason": "none",
                                "default_thumb": 1,
                                "aspect_ratio": "",
                                "embed_code": "",
                                "refer_url": "",
                                "downloads": 0,
                                "uploader_ip": "127.0.0.1",
                                "mass_embed_status": "no",
                                "unique_embed_code": "",
                                "remote_play_url": "",
                                "video_files": "[1080,720,480,360,240]",
                                "server_ip": "",
                                "file_server_path": "",
                                "file_directory": "2020/08/20",
                                "files_thumbs_path": "",
                                "file_thumbs_count": "",
                                "has_hq": "no",
                                "filegrp_size": "",
                                "process_status": 0,
                                "video_version": "2.7",
                                "extras": "",
                                "subscription_email": "sent",
                                "thumbs_version": "2.8",
                                "re_conv_status": "",
                                "conv_progress": "",
                                "is_premium": "no",
                                "credits_required": 0,
                                "premium_cid": 0,
                                "in_editor_pick": "no",
                                "has_subs": "no",
                                "total_subs": 0,
                                "last_sub_num": 0,
                                "live": "",
                                "start_published_date": "2020-08-20 00:00:00",
                                "end_published_date": "2022-08-20 00:00:00",
                                "has_sprite": "no",
                                "version": 1,
                                "has_resulotion": "no",
                                "aws_service_id": 2,
                                "aws_cdn": "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/08/20/15979167908968aon6ikurc4/15979167908968aon6ikurc4.m3u8",
                                "aws_thumb_path": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/08/20/15979167908968aon6ikurc4/",
                                "aws_migrate": "no",
                                "aws_thumbs_count": 5,
                                "poster_thumb": null,
                                "files": [
                                    "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/08/20/15979167908968aon6ikurc4/15979167908968aon6ikurc4.m3u8?Expires=1600063515&Signature=fYdu-112u3u4q29Q3e5BfCPOPxosD0Az0C4HPl-61Nga7jQ2z4GwpxZviE-61qHYLLruO2ivkMw1vNzHLqlEF84rG3fwDmWUi0BOJd8ITaAHpZ7oks-dEvZeTYZkUR1RinGHk62y-TEaWskreFqjlO9LUQfXCeg5t5bg80EGW6ml6TTqdVHfOL2B7UMe47DyvuAFaFEGfhaETlokrBDner7277AQcKmlvUxReXzWhvGAo58A6atAg3YkjZBQd2LdIISjsz26EIhdWUvLkTpN9vk32VLzGdOpBQeA6s9rnKZU~cISUB8KNqL~-JnBdw5SBHIi6aaH7rU4T~K01zAgkA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                                ],
                                "thumbs": {
                                    "original": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/08/20/15979167908968aon6ikurc4/15979167908968aon6ikurc4-original.0000001.jpeg?Expires=1600063515&Signature=EcGnFViOuQVUMSyAugGYi1R~JFug~uDPwK7Q7HBXuY8BFyJraPAbMRdmckc-vLk4TgdnRqTVpqAYFI4~r-342NXYgz7v7VYMEUtnKPoxI6b5ODA0~k2BQXFraro9bwwHXGJVUAP7Mgz95k899mD9CUlH9vcuu4AqeonpY~SceybGnnGMHc4sNqza2lBMr-CoWQ3zJ~1WQM73qPkGE9F1kEIws1oTVUrnaaNVriawrWVdhclMXmmO2DzX5BkSSm2d43pSxKK5uBsTrGnRTFk58-56a~5O3bZbi44nlOomLDP8AqhE1u5UiPR2Wz4LcPHuDFYnvwOS82iU7AZuIw2t2Q__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "168x105": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/08/20/15979167908968aon6ikurc4/15979167908968aon6ikurc4-168x105.0000001.jpeg?Expires=1600063515&Signature=cnpI607NMTJVnynsatiJO3-QAzgcoDdgr-VHTWGhkJm~NDPr9yq6dVBRGv-l1FscYFLLVCH1-QJr0750MRL4NJVe3o50yPAM6rKjNDeGFF~D4MxyLTEcB4Ypv633YFiT6QE4TFpLcEoQU23wIm2T2tJgbEqilKQhnAG0~eCm6AgPFlQcrnCnfJ9nb4GoXO4g5L2~FfKcUmr4Ei9dVvOe7kpsiePYyntKhGmpaQTtiOfFQysWgqkHg9KWVGkTuFHQ~D-YKckSQOj3kcLr3ftNFleSK3Rqg-Z1s-RiQuAfBc5lVMxNMNOygVUSMAT6b80LC~~WPUxyjj34XjJeQXS~9g__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "416x260": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/08/20/15979167908968aon6ikurc4/15979167908968aon6ikurc4-416x260.0000001.jpeg?Expires=1600063515&Signature=BD~YBuUhw9A3R2PgLBMRpPqbFHzBU595pPLmlnJS5nvnIRZ2QtEDziq9L2RYtjl0PxjDcKNCteeCqz8dDPaGxgrF~XSVGmY8Kl-IGu5vLep1AkHk05JzF6gnjmZLvGHBn5vfGewjHPkCbNK~CZpAtODXF9f73YmlXlqDXyE6wCOy9DXRLl3recrcMA7w8~ToXTAzd9bPRwQ5pMGkG-~NgiUAGd0As~LedmSa4suoZOuSlntsU4Bqh4v9f2lbVI3hzuNuY4HrKyabEbd6ChpbnR6aWOj9W5GY5MqdHBqeFW~ni5zgYXFot0DmkxyHFzOVikT72vqWiXwKy7jTTRYZMw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "632x395": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/08/20/15979167908968aon6ikurc4/15979167908968aon6ikurc4-632x395.0000001.jpeg?Expires=1600063515&Signature=Li7q8X8hC-tX2PmMHliahBB7dAD~vQDttqfePS7cH~SoAEu6aYxpIdMAeRe2y6usj1xvzASF17bSgEAIx39kjypyOncFCA0h-b-LzLzynoWhxwr82DNcoMzE9lhPk-l9H3kbeRm9m-7UcW1bAjt4qBtbw~aYEaex5vYyekugI9fndVU5KraXz-uISvkfaKS9v6hkBTjBFVTxGRFOSJWrz0UzvRvrtT8bVITw3g4hewCIkqm3BHL~LUU7DycfC8GllfFwjRQ2pKSOSdjO63lKO4OR3i~1w4GgxcgJot2ETmLfEmqu2qrWunEWgeOmrQAx23jxobXxvdr0tTJ7zk6HuA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "768x432": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/08/20/15979167908968aon6ikurc4/15979167908968aon6ikurc4-768x432.0000001.jpeg?Expires=1600063515&Signature=ZD02W8f22g~zBhq0Lrq7sE01BmUqDrGKADGeakWxEoIqFTPgHkKNWvRiqbLAWD8JWQZNd8V7ozBz0D97D~gfQJwhCKY2i2QB3NaplnxdcWF8C8ENmWvG-~ySgd87NNQ5sVWk6UKVEgJEhCnqFoJ7-jdOhotcQS7soP9ePrYJ3Jpc~knHvQ0bP9~PcDOVoIbkEmHRgm14mc-YiiDckVNH5aShnJQkWZ6LBnb5bb54n61tuO1T-xDXaBcy~BuXKM3gButMrwggqO0soF2TP6uEffty6ybJyNSkomHSed7zBaX0zdgay~6e0OrE8yK~OjFOAxCV1Er88kdKCdLip7nUsw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "200x288": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/08/20/15979167908968aon6ikurc4/15979167908968aon6ikurc4-200x288.0000001.jpeg?Expires=1600063515&Signature=XQDwW7maPZxCx2KelcyKAkGd7e5pTL8ITG4qOzUtpiD6Tj3~8orBKQA-TrORNyPrDBwooNTp22ptqEVA9e8yTp2GpiBwKyZYCCg8uXxTw4yidgw0EN9tm8AZlsAr38ctq-owbpUtm28IC0NfC6Ax7H1~JECulnr-w2cS4GWK02bayV2yTh1hk7tbdWfrN7cIVbtUSGHN98CpESeIL8vJvjr6NKUPjUTNa6s6~C74ORtCf83FPBdGufnqmHLsoNY6GrWEKb3ITzZCOISJRmvT5HbjtynOaVygmPXMldGYKOgAST27WOOantrD8QukUoCaKZXigbApSuf68Y0oLb3~5Q__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                                },
                                "gif": null,
                                "logo": null,
                                "sprite": null,
                                "categories": [
                                    {
                                        "category_id": 29,
                                        "parent_id": 0,
                                        "category_name": "International",
                                        "category_order": 1,
                                        "category_desc": "International",
                                        "date_added": "2020-05-05 00:25:04",
                                        "category_thumb": "https://deikho.com/images/category_thumbs/video/29.png",
                                        "featured": "yes",
                                        "isdefault": "yes",
                                        "navbar": "no",
                                        "series_category": null
                                    }
                                ],
                                "interval": "119",
                                "captions": []
                            },
                            {
                                "videoid": 1746,
                                "videokey": "SW6U76BMXR93",
                                "video_password": "",
                                "video_users": " ",
                                "username": "",
                                "userid": 204,
                                "maturity_level": "all",
                                "title": "Mein aur Woh",
                                "is_free": 0,
                                "free_url": null,
                                "file_name": "1597774289849ggop1r7ai9b8",
                                "file_type": 2,
                                "description": "Khizer accidentally breaks Mehru favorite tea cup now Mehru wants to make him realize about his mistake by pointing out his past misadventures in the kitchen.",
                                "tags": "epiosde,1.mp4",
                                "category": "#29# ",
                                "category_parents": "",
                                "broadcast": "public",
                                "location": "",
                                "datecreated": "1970-01-01 00:00:00",
                                "country": "0",
                                "blocked_countries": "",
                                "sprite_count": 0,
                                "season_id": 70,
                                "series_id": 56,
                                "sequence": 1,
                                "allow_embedding": "yes",
                                "rating": 0,
                                "rated_by": "0",
                                "voter_ids": "",
                                "featured": "no",
                                "featured_order": null,
                                "featured_date": "0000-00-00 00:00:00",
                                "featured_description": "",
                                "allow_rating": "yes",
                                "active": "yes",
                                "favourite_count": "0",
                                "playlist_count": "0",
                                "views": 0,
                                "last_viewed": "0000-00-00 00:00:00",
                                "date_added": "2020",
                                "flagged": "no",
                                "duration": " 11m 34s",
                                "status": "Successful",
                                "failed_reason": "none",
                                "default_thumb": 4,
                                "aspect_ratio": "",
                                "embed_code": "",
                                "refer_url": "",
                                "downloads": 0,
                                "uploader_ip": "127.0.0.1",
                                "mass_embed_status": "no",
                                "unique_embed_code": "",
                                "remote_play_url": "",
                                "video_files": "[1080,720,480,360,240]",
                                "server_ip": "",
                                "file_server_path": "",
                                "file_directory": "2020/08/18",
                                "files_thumbs_path": "",
                                "file_thumbs_count": "",
                                "has_hq": "no",
                                "filegrp_size": "",
                                "process_status": 0,
                                "video_version": "2.7",
                                "extras": "",
                                "subscription_email": "sent",
                                "thumbs_version": "2.8",
                                "re_conv_status": "",
                                "conv_progress": "",
                                "is_premium": "no",
                                "credits_required": 0,
                                "premium_cid": 0,
                                "in_editor_pick": "no",
                                "has_subs": "no",
                                "total_subs": 0,
                                "last_sub_num": 0,
                                "live": "",
                                "start_published_date": "2020-08-18 00:00:00",
                                "end_published_date": "2022-08-18 00:00:00",
                                "has_sprite": "no",
                                "version": 1,
                                "has_resulotion": "no",
                                "aws_service_id": 2,
                                "aws_cdn": "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/08/18/1597774289849ggop1r7ai9b8/1597774289849ggop1r7ai9b8.m3u8",
                                "aws_thumb_path": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/08/18/1597774289849ggop1r7ai9b8/",
                                "aws_migrate": "no",
                                "aws_thumbs_count": 5,
                                "poster_thumb": null,
                                "files": [
                                    "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/08/18/1597774289849ggop1r7ai9b8/1597774289849ggop1r7ai9b8.m3u8?Expires=1600063515&Signature=JAGlhTxAbTL-G1OemVZ6-1aV0Yuye~d31PUPk-lQN4h2IwmPn1NyVBrJVQXJorGDSnJm0WmTZjzcaybaj38JegVYoRigOtKMHJm7oRwe8WkKGUtFetrEjqqZ8b0C9XnR46fjRg~fq~HFgrauSetUgqk4Q~fG7SmjQMVZJ-6tgZLIBrFg4tB9o88nD-Tp7dKDaKvjBXO945XdVMNnNgkpCBhVCK78IIVSG9O9LV4NBvrjR2JZj6W4ASPvW6ebX3QAs414seFJG3qwG28yD4ZLZ2QixjZLugjOaqBNOR1DyGDFq7xO2dKxakkrPvwFqQPDmnBg9gpUUj6kh0jzCDes~g__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                                ],
                                "thumbs": {
                                    "original": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/08/18/1597774289849ggop1r7ai9b8/1597774289849ggop1r7ai9b8-original.0000004.jpeg?Expires=1600063515&Signature=RA95sJMrh7qGwcxThU0abFyPDrKncf53unAlZKRA10DyG3p30aT8YnUuerOy2sms4ql9NxozzW9noSROPbuMEVmNttQdbdntjsYXUDndv2zXQSnzTjlcQpFwdRGhAvYFFei~UOB--vLum~cXaoVy6N0~-bJCRkqqT9ljAiTH9pHbMtfgyNK0C6l0Vo6-OznkNyNOKHQwLRazBNwaL13mnAUAB47a4U~Yc3UbniZdLntpOmoJZp3dWpNHx5mFnHgogXLnE9ebC2zock2Q4hhQBPqPbDKeKghZISDKKbmIYj~JY~qnpMQmWO4OyvbPoQR9oaYcFgPtBw5s2htSgDns8A__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "168x105": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/08/18/1597774289849ggop1r7ai9b8/1597774289849ggop1r7ai9b8-168x105.0000004.jpeg?Expires=1600063515&Signature=YyAPrlyDuRlPpEbQH3nkPUHyJ3HPOQPI-bm3cE5JkngP720OzUxbUOXlx8Tmy9H45M-RdFDImSRIiGmcb0YcVRtn~URohY3StrVvSfTIriprB6-H-hXfY0h39s66g-ONda19vyOEVX1ZWWVMDHfZajMxNMIJv6KygQDDbIFiB~333oiBQyFiR0oCahLr9MDVoYOeVKWnE63NJRzsS7NDK3cQ1646q4fCXmqcCAG7oQcnHs09tcB07MUDSt5Hzr-cnbHai64kZGGHS06Ik2lAIVJ0zT7JmEEOTPbRgKezfXa9ZKEzxTtcgjuacv1SjNeV-lTcldkGElbn46qSIl15BA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "416x260": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/08/18/1597774289849ggop1r7ai9b8/1597774289849ggop1r7ai9b8-416x260.0000004.jpeg?Expires=1600063515&Signature=ZOE8rRVt6xrZQyMv8soBd12qWjcsmvRkhGU0mog~HUUp7A9-zX4ztItQDDENQcmt5iJEM7i8-XMdW3PLtmz0QONDHZq992b1q6hiVcNpZ24kY9WT16KhCas2FBNecYJvLo20zc75TLhitTW2CHpVklUUmzkI9vW3Pz2OHCBFcYrF2pkyFigd9NdvHckbnmemiJA7MezhrEfWqeW209WjIUjZqImUwBfXaXxXtboHwk~UljnL6cakPRS2cN26~T8DbJFt-RtwFV0pD5XE~UdQzSWGn6IzGXlrFhzRmtsycWLb7OTO0cLyZBdc0M3gp0E1YpNxdccdjVc3ABufOQdXYA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "632x395": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/08/18/1597774289849ggop1r7ai9b8/1597774289849ggop1r7ai9b8-632x395.0000004.jpeg?Expires=1600063515&Signature=abiYSD59ozOp8ZBkJm7YwfBFel4TpXsilKV8IUTYNeUq8x2pnKBU~SlvOu5cnn29vGgV1yKGH~aM1Sjpzs7y4CefGipKRWw-KeHKjJFnXJJyILahG5FtL96Tij3cPv~fmek4ZB4Z1sm60TcmSaAikk6Y9oL70vUIFETk6Nh41kHHMbcxDdceTokWyL4AsqcnPlb5cEUK1Zs97AAGTyfX4VZawMj7NrxJZ~u5PyuBbWz~tzZnWZ9BUxReLVKHB5h0nRgZd~GGaayQ24we7I~9RjETmguEryAEAtXGhbX1cgFR55NnmNtWPQXlA~HRXXWNSTiQt5WBDAtCVGK4Ty1ksg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "768x432": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/08/18/1597774289849ggop1r7ai9b8/1597774289849ggop1r7ai9b8-768x432.0000004.jpeg?Expires=1600063515&Signature=BjcLHZv9zx85sWyz6rTJRNE7SGM0GAU~aNEIV572wXbRTi57q4FJ5o7MeCXPIEarQvnEVczA2Om6ZcfUfWIfMOYx6kPt6mpmbTMZX9KhOlMqs4-GM~0O6v2sLKUZiQll2hAJix9V5WZxakrSqB2j3b9eSIINi6x14iZk~CJTO~SdBpX-yutv~mxD4hjU4gSQAJcCmsol-ndySiyMskS3BMW-5DZJ6uLMMRPYYSWiRvzUbewyPL4BX0iAoDVw6VWenygwTaBdbl2hxtYpUGHYwg3h1f7ZrgAgTp6UBVqSLKCOtZtsO15oCPF4fEXQg-8T10w0YTK-155fQHqeJJ05Tg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "200x288": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/08/18/1597774289849ggop1r7ai9b8/1597774289849ggop1r7ai9b8-200x288.0000004.jpeg?Expires=1600063515&Signature=G4he5tHqLx7jBCZihEq-LM6q6aktXCxwmK3xjSc7sG41dKa7235Tg~EM7DuzwvyZ4tK3P7s-UEpbfpXn4ZpnbFPL9NhTkyIvxskAhcCSQNtUtsRtTnGVOW9GQSSB5e6GZuyhWuE6LtEHw47j6J69aqUS6~dez8yq1GaYH~Ujvi3HiNGs2PAJX1EKspODl5m03lXNQtKXyvH~N9x7uBFNTkAu5RoZmSvBslkDXmixBQkqkAfCcDB3sP79DQQbwHTxpW61BFqdmCOyPsnykcQeND3MWRTAdYFAG08gQaTzMN2vtDbtYXtFrFGIj2~ERAuX9OEts9XdVZbe9alASU9Ruw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                                },
                                "gif": null,
                                "logo": null,
                                "sprite": null,
                                "categories": [
                                    {
                                        "category_id": 29,
                                        "parent_id": 0,
                                        "category_name": "International",
                                        "category_order": 1,
                                        "category_desc": "International",
                                        "date_added": "2020-05-05 00:25:04",
                                        "category_thumb": "https://deikho.com/images/category_thumbs/video/29.png",
                                        "featured": "yes",
                                        "isdefault": "yes",
                                        "navbar": "no",
                                        "series_category": null
                                    }
                                ],
                                "interval": "694",
                                "captions": []
                            },
                            {
                                "videoid": 1762,
                                "videokey": "SM41GOHA2BNO",
                                "video_password": "",
                                "video_users": " ",
                                "username": "",
                                "userid": 204,
                                "maturity_level": "all",
                                "title": "Mein aur Woh",
                                "is_free": 0,
                                "free_url": null,
                                "file_name": "15988616392628nz0nauc8xs6",
                                "file_type": 2,
                                "description": "Khizer is on a mission to find his favorite kurta but Mehru tries to distract him. He decides to map out the sequence of events he could remember before loosing the kurta eventually finding out about the real culprit. Who is that.",
                                "tags": "episode,released.mp4",
                                "category": "#29# ",
                                "category_parents": "",
                                "broadcast": "public",
                                "location": "",
                                "datecreated": "1970-01-01 00:00:00",
                                "country": "0",
                                "blocked_countries": "#0# ",
                                "sprite_count": 0,
                                "season_id": 70,
                                "series_id": 56,
                                "sequence": 2,
                                "allow_embedding": "yes",
                                "rating": 0,
                                "rated_by": "0",
                                "voter_ids": "",
                                "featured": "no",
                                "featured_order": null,
                                "featured_date": "0000-00-00 00:00:00",
                                "featured_description": "",
                                "allow_rating": "yes",
                                "active": "yes",
                                "favourite_count": "0",
                                "playlist_count": "0",
                                "views": 0,
                                "last_viewed": "0000-00-00 00:00:00",
                                "date_added": "2020",
                                "flagged": "no",
                                "duration": " 8m 28s",
                                "status": "Successful",
                                "failed_reason": "none",
                                "default_thumb": 2,
                                "aspect_ratio": "",
                                "embed_code": "",
                                "refer_url": "",
                                "downloads": 0,
                                "uploader_ip": "127.0.0.1",
                                "mass_embed_status": "no",
                                "unique_embed_code": "",
                                "remote_play_url": "",
                                "video_files": "[1080,720,480,360,240]",
                                "server_ip": "",
                                "file_server_path": "",
                                "file_directory": "2020/08/31",
                                "files_thumbs_path": "",
                                "file_thumbs_count": "",
                                "has_hq": "no",
                                "filegrp_size": "",
                                "process_status": 0,
                                "video_version": "2.7",
                                "extras": "",
                                "subscription_email": "sent",
                                "thumbs_version": "2.8",
                                "re_conv_status": "",
                                "conv_progress": "",
                                "is_premium": "no",
                                "credits_required": 0,
                                "premium_cid": 0,
                                "in_editor_pick": "no",
                                "has_subs": "no",
                                "total_subs": 0,
                                "last_sub_num": 0,
                                "live": "",
                                "start_published_date": "2020-08-31 00:00:00",
                                "end_published_date": "2022-08-31 00:00:00",
                                "has_sprite": "no",
                                "version": 1,
                                "has_resulotion": "no",
                                "aws_service_id": 2,
                                "aws_cdn": "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/08/31/15988616392628nz0nauc8xs6/15988616392628nz0nauc8xs6.m3u8",
                                "aws_thumb_path": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/08/31/15988616392628nz0nauc8xs6/",
                                "aws_migrate": "no",
                                "aws_thumbs_count": 5,
                                "poster_thumb": null,
                                "files": [
                                    "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/08/31/15988616392628nz0nauc8xs6/15988616392628nz0nauc8xs6.m3u8?Expires=1600063515&Signature=cYIeF0QyI4hmjv3dLt0poExZ~msmc3lZVOfNtYw15nElLEURTHYDKh9i02dOtigoPg2KJyaAeVaoEcTr-gFP-Gl7bbawF9WKzQ1SA3tX7Vx2MSX4oa6ENzF2K4y7wA8rLfaisw4Z5bGi~bWzlOEv3hb~MeQF-7nzoMsZmxewQxRGmQYeVhXC~iOPDZf4TpTtUvDSOw~pCctxrjC1HA6lEWYLeGmvIPY~SXBE2SiFjMipVXOjwmBcmHMTylW6a6PRLiPT~xFvwxK-8ftDxu01HV1PzBKjUuJo0VFpSvc9cxrkAxtmdQen914kd58L9nW2q8~Kmm4i6pzk8hn740lysQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                                ],
                                "thumbs": {
                                    "original": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/08/31/15988616392628nz0nauc8xs6/15988616392628nz0nauc8xs6-original.0000002.jpeg?Expires=1600063515&Signature=ZZx~~brSMtvRRJVFcTh1Z7j6fyY1fP-FsW8C8dGd7uPhRZ0fkOy2YijkHsy3JYSRy2kQWvL6VQkqJcIPRd0xAq3TRhzRQxK47DcyI4DbhQL8bEv2gCu7uLYfzdSkD8uku-VmmR0pw8~fF2U9JIiA0F1OQ~r5nkfuHENpHm7nDVWrXFO42PsuiWU8f8o9z3AkAhOfOPO9NUuVkcMEGp5Wb3L7B5Xo5qo0kIGKCIcmya2Uh1Frtylgg-5KxAQOw2QMNtnqUMPVgeTsU46HFKcEfB0~ESlAllSjKpbQtfzHjjCCHSLp3O60vUJgKpwB44~e0QEqwyL6lbFfbhyH~V~yUg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "168x105": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/08/31/15988616392628nz0nauc8xs6/15988616392628nz0nauc8xs6-168x105.0000002.jpeg?Expires=1600063515&Signature=ChGw~OmOMpe18F8VEbogH6OWORYi3zJ6ebONDxKRsqjZ5MLx9~cn5uFxnyiJ~7gEdMUqGOI~PfucNxjXah9elS5soyvprxH4DFRHgyap5z6P0XCf5u0DyL0HIKAxF418tl~kue~h2PQodM-tePpnBWUMMtUBZm0Q7IkgV38xyWkRMfg34Mh5bN5W0X-kpiml4E4C2KhKdzahEjFSKox7RRNiN~5NLu65ycrASaMP6wG0JV2qY19n7yvqKFf5uHsrK9NYBERaBbAwrCraFZH9UcDeX-tjUGYex4aTChqmOzxhgS92qt6VyeBt7coYFylIuHqkdwToGAWYrhg6cCHwYw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "416x260": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/08/31/15988616392628nz0nauc8xs6/15988616392628nz0nauc8xs6-416x260.0000002.jpeg?Expires=1600063515&Signature=PzzNVpzqZVIhVmmA80bDoomYQH5UWwJcAGoEqI9~xr9Od855-B62ghIlwgqTu3r-XTSKMAjizR-I~MLHp91KVCFF0aVQ5W1cxU9u1Y38Hyyd-vch0sfM3tp11BPEOsx6t4ZSC0rRM1zxw-gLztknCH12IDMRwFgQF4RHL4YJVnRz8eDLrgWmEiWbGIEFY3OvsakXIokIEGFb4TvHV9XwobVig5u6i5XnO4Og4b0jm4hmH6q33oVSaScjWg2sS4pcDmShrkMtibASPnPLRq9pFa507DwNYocqZI~s4Pf50S6ziB~NuwaIl3AlZ1CAlRVoKFQNC70Zn2ewK3gpR82zmA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "632x395": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/08/31/15988616392628nz0nauc8xs6/15988616392628nz0nauc8xs6-632x395.0000002.jpeg?Expires=1600063515&Signature=Q3oGqiNz73gev3cQr5pPjkEyq8iPVw7njNyOv76a4cPbL1VFWNINHvwb5sOMgSOqJfrVQdrGq87e0-2jhFILNsGG52XyuEb-8L80FvSaGDxCbnss-MIZMpKjnZ95rYbBooC-GvHxh~ruATG1Klv4cUPA0wlezg22acylXqX~me0ZgGIQKPvqyjiMtzk74nkn9UnUC1i~Ppu9KrfIStwAmVKxdZEWf45w7JYgPN6bvMJXKdRZZrzYcbbmaXJDaNf1wSWal9DCqg-8mnGkUIDLapXk7d9zQMJx2LUKEgzEIBINOmLSiECjmKLKq6r3eafZW4~QpjjQhIC7w5EUgcWHmw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "768x432": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/08/31/15988616392628nz0nauc8xs6/15988616392628nz0nauc8xs6-768x432.0000002.jpeg?Expires=1600063515&Signature=Lm1s67YFewra~EOkmIqJkLjXRe4ukZ-SBoKOvgCykYuftnVzJ5jM8exX2rJNrWhJ6EzcfA-d2XfvJEV1uAxjqGPE~Codw7C7P6oQPRTE-81tzm8ZFet7nlW~yyjw~~b0Iv0Y4JOfcA8SAnTMu3WOivVuGHkf4M7uL5DdRhJmmRHBCk0RgaUQbi1amtMC-5LqacNZ~8MznGs~ODGF2UUcQXTi86HudBCm1Th~LV1Seeb3MuBTboNs78vwDR9PxlPlXm4QtH2jaifaSbJ8OuJ4Mbn59CbTRdcas874Q8pqSz0pZiD5ZotKKAQUHUGmLNiaBZyjoScSIgy0VC0tgJY5tQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "200x288": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/08/31/15988616392628nz0nauc8xs6/15988616392628nz0nauc8xs6-200x288.0000002.jpeg?Expires=1600063515&Signature=ISSIRyuSLjXVGsxhLeQlhVXM5WucDxWTvExL2s6hkz18JpgQK9XmDLecWlsee4mB3NIdwemyPfqookC0lNmOEfS9RPbsj3m~5Rg9zZ6BBnbMzrKN3KqnUcB-~rskgl-rlGPIB7j-OHSAa1ZRWWIdph5Rz0APTnVJoFAdWvR-PmB7gWPAr-dFl8MPqcSllar~DsEcCca2taveZlW7siEIy7vGndjKxdOXS0x8mFwQShtcCEvtPNmu7C26UmbC86HVbBabj-QbalWe0m~iEK~gxA5C4LVtLUwbxvvVwS0MmUN-w5W9SUDys6VdCkM3eastbDoFFXkI7fRbHYbX4wp7mQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                                },
                                "gif": null,
                                "logo": null,
                                "sprite": null,
                                "categories": [
                                    {
                                        "category_id": 29,
                                        "parent_id": 0,
                                        "category_name": "International",
                                        "category_order": 1,
                                        "category_desc": "International",
                                        "date_added": "2020-05-05 00:25:04",
                                        "category_thumb": "https://deikho.com/images/category_thumbs/video/29.png",
                                        "featured": "yes",
                                        "isdefault": "yes",
                                        "navbar": "no",
                                        "series_category": null
                                    }
                                ],
                                "interval": "508",
                                "captions": []
                            },
                            {
                                "videoid": 1785,
                                "videokey": "RHS43U48SGK3",
                                "video_password": "",
                                "video_users": " ",
                                "username": "",
                                "userid": 204,
                                "maturity_level": "all",
                                "title": "Mein aur Woh",
                                "is_free": 0,
                                "free_url": null,
                                "file_name": "1599643400339fkkhgek6zjd3",
                                "file_type": 2,
                                "description": "Khizers obsession for Pubg is making Mehru insecure as he repeatedly ignores her. She finally decides to teach Khizer a lesson. \r\nWatch the episode to find out what Mehru plans to do with Khizer",
                                "tags": "pubg,mein.mp4",
                                "category": "#17# #27# ",
                                "category_parents": "",
                                "broadcast": "public",
                                "location": "",
                                "datecreated": "1970-01-01 00:00:00",
                                "country": "0",
                                "blocked_countries": "#0# ",
                                "sprite_count": 0,
                                "season_id": 70,
                                "series_id": 56,
                                "sequence": 3,
                                "allow_embedding": "yes",
                                "rating": 0,
                                "rated_by": "0",
                                "voter_ids": "",
                                "featured": "no",
                                "featured_order": null,
                                "featured_date": "0000-00-00 00:00:00",
                                "featured_description": "",
                                "allow_rating": "yes",
                                "active": "yes",
                                "favourite_count": "0",
                                "playlist_count": "0",
                                "views": 0,
                                "last_viewed": "0000-00-00 00:00:00",
                                "date_added": "2020",
                                "flagged": "no",
                                "duration": " 8m 39s",
                                "status": "Successful",
                                "failed_reason": "none",
                                "default_thumb": 5,
                                "aspect_ratio": "",
                                "embed_code": "",
                                "refer_url": "",
                                "downloads": 0,
                                "uploader_ip": "127.0.0.1",
                                "mass_embed_status": "no",
                                "unique_embed_code": "",
                                "remote_play_url": "",
                                "video_files": "[1080,720,480,360,240]",
                                "server_ip": "",
                                "file_server_path": "",
                                "file_directory": "2020/09/09",
                                "files_thumbs_path": "",
                                "file_thumbs_count": "",
                                "has_hq": "no",
                                "filegrp_size": "",
                                "process_status": 0,
                                "video_version": "2.7",
                                "extras": "",
                                "subscription_email": "sent",
                                "thumbs_version": "2.8",
                                "re_conv_status": "",
                                "conv_progress": "",
                                "is_premium": "no",
                                "credits_required": 0,
                                "premium_cid": 0,
                                "in_editor_pick": "no",
                                "has_subs": "no",
                                "total_subs": 0,
                                "last_sub_num": 0,
                                "live": "",
                                "start_published_date": "2020-09-09 00:00:00",
                                "end_published_date": "2022-09-09 00:00:00",
                                "has_sprite": "no",
                                "version": 1,
                                "has_resulotion": "no",
                                "aws_service_id": 2,
                                "aws_cdn": "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/09/09/1599643400339fkkhgek6zjd3/1599643400339fkkhgek6zjd3.m3u8",
                                "aws_thumb_path": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/09/1599643400339fkkhgek6zjd3/",
                                "aws_migrate": "no",
                                "aws_thumbs_count": 7,
                                "poster_thumb": null,
                                "files": [
                                    "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/09/09/1599643400339fkkhgek6zjd3/1599643400339fkkhgek6zjd3.m3u8?Expires=1600063515&Signature=Lju9BSgJBb7Z6ibaDPDcIxFrohWPJT57dTzli76RHntGRTAfu-Re4esPp44Ep6P-5O1Lkjk9cZHyZQkk~OzhL-iuJtqC2wfHvlODOLqP0-aVMtG99ba90VB00uJ-BqtdnoeShLxXagk8RN9e7pFMka1Hqe6gCKyxQe~SV7XGMirfDzrMOfyDJs4gaPk4iVE0mWJitbnxLWWmq12HsD818H90lLts~zPsVASespjPooijAQzxX4CFfzNNo0lz0qn4izemYR~qi7wYZQx6WLZoNc8Rib6g-Ct4lv~mkZDgsVOVe2zWudjRYrWx8JFzxYgizCMlPP81nYgQsjOyrzSO2w__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                                ],
                                "thumbs": {
                                    "original": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/09/1599643400339fkkhgek6zjd3/1599643400339fkkhgek6zjd3-original.0000005.jpeg?Expires=1600063515&Signature=SxHC2likLGTp6E1llFKJtvl0sGsMyHOGh1xkWH0eyBbRXkSekD~lvLxeP43ARKmY4-SivNmlSOVDBMMwjDyaiw6mtt1msQ8ZuK3ksW4QinlwZy~B6NWssMVftS08mzMP~CZCYH3OdBq0RMT6TuxT3QUg3k9I1d7xq4jKiSmInmdhCt7123w~z7HYQWrl~mAVqK4qeasdsdL-gJmUzt0xe9Ue20gV8PEUim8T~5Kw~QVAm8DjWXHxfG8QHZ39VOw7sQkMo3YBrRWeZKpuLCnh6PKU6EzjdKEnh2R14lN0SEkA3ljPgkfBQHIwkLd~wQDN~DWUZg5Ugu~zG-mbsgT7vQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "168x105": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/09/1599643400339fkkhgek6zjd3/1599643400339fkkhgek6zjd3-168x105.0000005.jpeg?Expires=1600063515&Signature=Vnx~-cngTK85~2jKgfWOM9rwYF4xCeuQlSUxTXoolIysjN0x54n9xmqTdWFySUpHfHvkg49IoueKBSIxnynqkktTBfmhBn4~mdFlFAL-lsTHXE1rOhmGL5FCvsp~56uq70szlDvrzuy-DJxqSSqC2d73uPUZ28Q5f-ohTYos5j7vEiYCvpMEFUhDw1qffQGAoJXCMZC10deMQOPA3wRhW91k-kTCnG2ldi~qkUvxISupijQY8MItkiu~Vc78G6fkRpw-PEHrffRuCaH-rIvzhj-wGVvtfpPNv6Argig3FcR42TnBtZD7Q7yDeLDrjS6BQgEV0oRPQOOqO8wyO4Zzwg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "416x260": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/09/1599643400339fkkhgek6zjd3/1599643400339fkkhgek6zjd3-416x260.0000005.jpeg?Expires=1600063515&Signature=TPOHnJSLLD8bqLoQNkfEYIHO0M3hNUtp89RYogP1DFxgzsfkr~MyRa83~aVNbJ1eJpNKkak0Tu8mvLGSJknzHsnmS1THj4zoBXPv3xsDP4CnanUuSctk3cKvvCWa6f6nhkMsgeMthKAt9q~q-nxuLp~QP09BRprghmpE1LKEiCzy6RnVihyiuEBHnOIr~o8R9RQnI8hsGlxV0CSv8ZZjMMIuvvNRv9PsfDPvVm6kgxcLKNMSHUxjMRLDO0bVhXoPHuC5oBlN-vP4PmjpepcffTzqAfwVT3Vj-Zx6LWvUPfnpL8E8AyhJ7~UyRR2ZnBYm5p4Os-Ge0yYiaFrjjbz1lA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "632x395": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/09/1599643400339fkkhgek6zjd3/1599643400339fkkhgek6zjd3-632x395.0000005.jpeg?Expires=1600063515&Signature=OpzqxKJKKLdOja4UeKo3JAjk2ho-zllUFjBvTZIfhLfKYDrJrGG3NyCXWYyFsDMVSul7OqcvzXzr1lvCtysOgILk70eOaY3FwzJJu70PVL1uFSEedsh1fvAzWuhrLYbHfy0540~DaurqxMS88yZrktIpkE75XVa2X~ehuyEZmMscmac-rSe7XkYpuxLgWmPwDLCp6MCe8gGWsa6NyP2Z6pwcycwxuhlcObPS27BVlLtn94b0exe3WAAKxklKl~Vc06kQ2oZGvoJ6Bgix1TfIUYaCs~iCuy3k~xtS3Clhi7szlQOaLVvj26~rng9DO9kVkRhLU4pFLOxryAM2Ah~xrw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "768x432": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/09/1599643400339fkkhgek6zjd3/1599643400339fkkhgek6zjd3-768x432.0000005.jpeg?Expires=1600063515&Signature=Vei0mABwbDMIUwK-GMvMY~fSIyZ3-rWLwtcY2OCEQk8XgQ1Fp41~VHTURrk1rGDp0Ra6IJW9XPygXaP7QTn6KVMExQef-vqzuAI2AAcW4y7HHpx92zJxIzgHZlBbFzAuZq4993qEvIGJWwe7jdvo9Dg3x-ZPC~pw2KPACQLPPUBI3ZFwI2~5m1WoKheQD77oW9xKgb1P4p98nhH4CGirfci8pjJNucRIDQKlqzwiarhLBrcNXAs02UUQmG7XHMGCjEupa93uXmrlepd2L39c~NUkT~TMOoLNVTyNdAWVsKFGhLoDQByNeoZbKSj04WZdMX1x050IOTdFJQF1U11u-Q__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "200x288": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/09/1599643400339fkkhgek6zjd3/1599643400339fkkhgek6zjd3-200x288.0000005.jpeg?Expires=1600063515&Signature=EzXVFzpMrFtkHxna9gjvUUhg1jKUd31DWQwYDJ-1qhpZrMgDBDk-eMgUxY-MI3bmoitRuAQswE1HqrCk0-xa1yWiT1p7bP-zSwCPFXW5~uzcrttGO4wCQeMXVGGmd01E8ndx9d12~uNH6jW4z1umEMXy1zciiYkFdnS7UrMZzEmWsUSS74UaTCSMNPzNzMYeiRyX5RFr5xTMPrA2Km3D3UQueNlVGOhJ0YzdVhU0Sv9duSQf7Enk5BKwvHzMknNqpl69kPeBRp5xBAJ2NodImOZZjGXiEXkz7f6tKhq6NbLWZk7ok4TBqb91-5fTrEwq7NsN0bmo08R2oHA12-NPyA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                                },
                                "gif": null,
                                "logo": null,
                                "sprite": null,
                                "categories": [
                                    {
                                        "category_id": 17,
                                        "parent_id": 0,
                                        "category_name": "Comedy",
                                        "category_order": 1,
                                        "category_desc": "Comedy",
                                        "date_added": "2019-07-23 09:50:55",
                                        "category_thumb": "https://deikho.com/images/category_thumbs/video/17.png",
                                        "featured": "yes",
                                        "isdefault": "no",
                                        "navbar": "no",
                                        "series_category": "4"
                                    },
                                    {
                                        "category_id": 27,
                                        "parent_id": 0,
                                        "category_name": "Web Series",
                                        "category_order": 1,
                                        "category_desc": "Web Series",
                                        "date_added": "2019-10-24 04:46:54",
                                        "category_thumb": "https://deikho.com/images/category_thumbs/video/27.png",
                                        "featured": "yes",
                                        "isdefault": "no",
                                        "navbar": "no",
                                        "series_category": "5"
                                    }
                                ],
                                "interval": "519",
                                "captions": []
                            },
                            {
                                "videoid": 1786,
                                "videokey": "Y16R25XR6D8S",
                                "video_password": "",
                                "video_users": " ",
                                "username": "",
                                "userid": 204,
                                "maturity_level": "all",
                                "title": "5 Second Black Screen (Video)_2.mp4",
                                "is_free": 0,
                                "free_url": null,
                                "file_name": "1599717027404334vz00xsbv9",
                                "file_type": 2,
                                "description": "5 Second Black Screen (Video)_2.mp4",
                                "tags": "second,black,screen,(video)_2.mp4",
                                "category": "#29# ",
                                "category_parents": "",
                                "broadcast": "public",
                                "location": "",
                                "datecreated": "1970-01-01 00:00:00",
                                "country": "0",
                                "blocked_countries": "#0# ",
                                "sprite_count": 0,
                                "season_id": 70,
                                "series_id": 56,
                                "sequence": 4,
                                "allow_embedding": "yes",
                                "rating": 0,
                                "rated_by": "0",
                                "voter_ids": "",
                                "featured": "no",
                                "featured_order": null,
                                "featured_date": "0000-00-00 00:00:00",
                                "featured_description": "",
                                "allow_rating": "yes",
                                "active": "no",
                                "favourite_count": "0",
                                "playlist_count": "0",
                                "views": 0,
                                "last_viewed": "0000-00-00 00:00:00",
                                "date_added": "2020",
                                "flagged": "no",
                                "duration": " 4s",
                                "status": "Successful",
                                "failed_reason": "none",
                                "default_thumb": 5,
                                "aspect_ratio": "",
                                "embed_code": "",
                                "refer_url": "",
                                "downloads": 0,
                                "uploader_ip": "127.0.0.1",
                                "mass_embed_status": "no",
                                "unique_embed_code": "",
                                "remote_play_url": "",
                                "video_files": "[360,240]",
                                "server_ip": "",
                                "file_server_path": "",
                                "file_directory": "2020/09/10",
                                "files_thumbs_path": "",
                                "file_thumbs_count": "",
                                "has_hq": "no",
                                "filegrp_size": "",
                                "process_status": 0,
                                "video_version": "2.7",
                                "extras": "",
                                "subscription_email": "pending",
                                "thumbs_version": "2.8",
                                "re_conv_status": "",
                                "conv_progress": "",
                                "is_premium": "no",
                                "credits_required": 0,
                                "premium_cid": 0,
                                "in_editor_pick": "no",
                                "has_subs": "no",
                                "total_subs": 0,
                                "last_sub_num": 0,
                                "live": "",
                                "start_published_date": "2022-09-10 00:00:00",
                                "end_published_date": "2022-09-10 00:00:00",
                                "has_sprite": "no",
                                "version": 1,
                                "has_resulotion": "no",
                                "aws_service_id": 2,
                                "aws_cdn": "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/09/10/1599717027404334vz00xsbv9/1599717027404334vz00xsbv9.m3u8",
                                "aws_thumb_path": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/10/1599717027404334vz00xsbv9/",
                                "aws_migrate": "no",
                                "aws_thumbs_count": 6,
                                "poster_thumb": null,
                                "files": [
                                    "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/09/10/1599717027404334vz00xsbv9/1599717027404334vz00xsbv9.m3u8?Expires=1600063515&Signature=BEv1ABBZoU5gaLnfJd21ojxnSO8tmtyk8XQw2Who3rzUeZFpUIWQWFmODGeA5L5Kfx8ncCxPRxnKaNsUSHM3X~qAW~MN6Zxmb1FEUIG1AjqKPDV70mBf~9Y6O2IvgNRQlrAUfhfH5xJ3882hLYBxaXr6PeyjCcQdHySzv2x86WoxbPaUirTVezUNDiBoD4MKp~wepQ-klcNipvygkUfkvXAXBC9U7-MmBWNlZA2-KvmpYTzHFafo8nuGaNNIxnO5qWKSLyuceM7bw8k~xRU0D8XuvwAYdUuVlcOYXkY5S~c2VE3ODejI1ZvuiLy6krhNf54mlaPB5cXZPdct6kD6kg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                                ],
                                "thumbs": {
                                    "original": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/10/1599717027404334vz00xsbv9/1599717027404334vz00xsbv9-original.0000005.jpeg?Expires=1600063515&Signature=L2zsr-sW7nTsQWnSDYqux784qBmMeN0qvOCPQcZyD7hWt4K~OaSmJVHq2100EUPMcNV49sWuZAjApCJDcQQX~TcKqNOEl2aaPIE1~UgHJ6iNOda5mqFHHfsCpj7TXsWRaPODR9YjG1SdX1FYeDdAQeynSuCIo6sHh7NEhfJu0RBo9yWFGrTGUe5nD4LxTbxoDU4nl-ut7wysPlZ4ad22g4RQgBYR8VrRCmn~zFJh7Hh206rm-ow8unHCW2X~q42MPGywyttAgzvHAffLLxH36jyVsBgl~fpMccCn1IdLN9DaqpoqRexREIyY4-XSfgok5gVBcowFNlF31mLgZxKLFw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "168x105": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/10/1599717027404334vz00xsbv9/1599717027404334vz00xsbv9-168x105.0000005.jpeg?Expires=1600063515&Signature=VENI94~fCtwMM2qIAel~Jw--LbJPzoULX1JB19Ne6~zng0EHA4dDkj2sTHbCqS3ZA-SfE97rHqHY8G7vMcmMwsz2yuhuboMufhtr-AInV-2Zz05JWO7gvgvlKebK~F6pvI7B3VwkqRDQdt5xZPKgir8o8IKydkuG6tj5lVWBKCC5iRyC9tCiUiI3FVPLF7yuvPKWiC~c4vEMpfamTJh76RXmmCszZLC-E9snSpNY40aYcicIWrzwu79VTJ4AOovCbidHRPpkg9SS04Etuz8iajNujcfL1YyPT0Uhp8mAY8RKWLvsxXDvQP4c8FEl3lLekc94qJxrb9gTj3fyLaA5zw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "416x260": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/10/1599717027404334vz00xsbv9/1599717027404334vz00xsbv9-416x260.0000005.jpeg?Expires=1600063515&Signature=ctLg0hf335O3T7voq--U~mYXqZkMhSWW7AgNJYvMy9RrDC8tsn5u1cRJBsx0VP4hBFE71G1MYCJXxglS6~TqPEbvs-xoBWiJd0G9mtwEIw2weNHnInaSdoDP6ybNx2uT~f5NjKrnP1~aw~vm6od6K6lAEQAF29zGOL1iZW5O686W2y9tq-CE4nQHh~2LpNEN4mIGRWivJJk5jvBl797-vEfVDdKM82TU3uM4s7Ntl9c7zKnpXoNDJxBi29ZA3gRIg-exLo1s1vqvNrwZRcUtn3isWhonAv8ip9VquDYfXJDo1o5ilFcqL4WjWx7Xy4i0at1QuCf8vWlUduCZfeUH6Q__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "632x395": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/10/1599717027404334vz00xsbv9/1599717027404334vz00xsbv9-632x395.0000005.jpeg?Expires=1600063515&Signature=KRTlftAioV~zYn7QjngEGBu6WTBNCPEm7cNaDnt6Kr77AQ1zO~UDsqLgxecE21k6~GvjFCNu2Mx8DoxVscvBixGmjpbrT55F~xKC962xX~C4VKvDkJ14SAS2cVPKTb~nKf0d7gJDOISM22XaPnpNUdhypyLhayIaRgpC8jgPvPj~7A56Plocq~Cf44beunF6yQga9voLf22b4sX76gUAUBtmx1XVDLeB2Fjw9Jkd1Uj25RaC0A5ww3SpQkismJLP8DecdDlWZgWKMYXJubDyTIa0lNO2MDIaJJ-jbSgRVK9Gr8IaaNYYvPBPjos8-cBUTCkLJbm1YjHQ9E2-hhvK7Q__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "768x432": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/10/1599717027404334vz00xsbv9/1599717027404334vz00xsbv9-768x432.0000005.jpeg?Expires=1600063515&Signature=WSq9sq1ZeXJXFW54pfppAP9dYXJA11UR-N5OCRxs6ZKK1HQCeDfx21Su72ZgIrimymmREFtvVlMlHkJ5KC6kiZ-HShGq0Ed-stzpfpTMVU0tp31AdYr9DlN6RYAbr1xoH3M7gFdN3lm8W63o2nwJ23ZseR9l5U3ZC93ppyBdo4atrP1NaTdRR5b5ETlOS7J-5oXXud1IfDSzHRwNOTTlVegibT3aEshF~RczAa8iHTtunIATXuvj0G37OGnh0Z1yFOEjyq2BzJDlIdaMEb2y5IhzMgrkLG2BL1I6MiiT8GJ2opXqWiTXK2IHEpM2zqX4sbkkxbvH-p8NwGNOvbujgg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "200x288": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/10/1599717027404334vz00xsbv9/1599717027404334vz00xsbv9-200x288.0000005.jpeg?Expires=1600063515&Signature=Fw2a-GJYj74LGSZ~Nl6EGJLupDIcsfk0MliwUCP9Fd9heXwdCmLXs0QrRNUavnn4o05epGyTNo3p~fT7YI2Gc3BaV66vhn1sCmi8alZpeTDkEyLkD-MTVRUijIAA0j3bE3SE6ogNb2glEPYK7aor9gGgaV3~syg62fqLamH3p6acSse2CWfbDb346O8rKYUo7iEDB54VBF6OhhcD4dxwYZQl8V3oeMOS6s6kwV5mBLkjdAz4~wRUoro5dXiuo7iOQu2Ng7RCHE7~eddsXHAQBYoa2T8cF2-oIwO1Rh-Vv1doXEeLzL0m6GSAZwFxum06tJN9goG2eX~8CyzWNbBkKA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                                },
                                "gif": null,
                                "logo": null,
                                "sprite": null,
                                "categories": [
                                    {
                                        "category_id": 29,
                                        "parent_id": 0,
                                        "category_name": "International",
                                        "category_order": 1,
                                        "category_desc": "International",
                                        "date_added": "2020-05-05 00:25:04",
                                        "category_thumb": "https://deikho.com/images/category_thumbs/video/29.png",
                                        "featured": "yes",
                                        "isdefault": "yes",
                                        "navbar": "no",
                                        "series_category": null
                                    }
                                ],
                                "interval": "4",
                                "captions": []
                            },
                            {
                                "videoid": 1787,
                                "videokey": "DN79N7UR86K5",
                                "video_password": "",
                                "video_users": " ",
                                "username": "",
                                "userid": 204,
                                "maturity_level": "all",
                                "title": "5 Second Black Screen (Video)_2.mp4",
                                "is_free": 0,
                                "free_url": null,
                                "file_name": "1599717046605n6it680j6q1",
                                "file_type": 2,
                                "description": "5 Second Black Screen (Video)_2.mp4",
                                "tags": "second,black,screen,(video)_2.mp4",
                                "category": "#29# ",
                                "category_parents": "",
                                "broadcast": "public",
                                "location": "",
                                "datecreated": "1970-01-01 00:00:00",
                                "country": "0",
                                "blocked_countries": "#0# ",
                                "sprite_count": 0,
                                "season_id": 70,
                                "series_id": 56,
                                "sequence": 5,
                                "allow_embedding": "yes",
                                "rating": 0,
                                "rated_by": "0",
                                "voter_ids": "",
                                "featured": "no",
                                "featured_order": null,
                                "featured_date": "0000-00-00 00:00:00",
                                "featured_description": "",
                                "allow_rating": "yes",
                                "active": "no",
                                "favourite_count": "0",
                                "playlist_count": "0",
                                "views": 0,
                                "last_viewed": "0000-00-00 00:00:00",
                                "date_added": "2020",
                                "flagged": "no",
                                "duration": " 4s",
                                "status": "Successful",
                                "failed_reason": "none",
                                "default_thumb": 1,
                                "aspect_ratio": "",
                                "embed_code": "",
                                "refer_url": "",
                                "downloads": 0,
                                "uploader_ip": "127.0.0.1",
                                "mass_embed_status": "no",
                                "unique_embed_code": "",
                                "remote_play_url": "",
                                "video_files": "[360,240]",
                                "server_ip": "",
                                "file_server_path": "",
                                "file_directory": "2020/09/10",
                                "files_thumbs_path": "",
                                "file_thumbs_count": "",
                                "has_hq": "no",
                                "filegrp_size": "",
                                "process_status": 0,
                                "video_version": "2.7",
                                "extras": "",
                                "subscription_email": "pending",
                                "thumbs_version": "2.8",
                                "re_conv_status": "",
                                "conv_progress": "",
                                "is_premium": "no",
                                "credits_required": 0,
                                "premium_cid": 0,
                                "in_editor_pick": "no",
                                "has_subs": "no",
                                "total_subs": 0,
                                "last_sub_num": 0,
                                "live": "",
                                "start_published_date": "2022-09-10 00:00:00",
                                "end_published_date": "2022-09-10 00:00:00",
                                "has_sprite": "no",
                                "version": 1,
                                "has_resulotion": "no",
                                "aws_service_id": 2,
                                "aws_cdn": "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/09/10/1599717046605n6it680j6q1/1599717046605n6it680j6q1.m3u8",
                                "aws_thumb_path": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/10/1599717046605n6it680j6q1/",
                                "aws_migrate": "no",
                                "aws_thumbs_count": 5,
                                "poster_thumb": null,
                                "files": [
                                    "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/09/10/1599717046605n6it680j6q1/1599717046605n6it680j6q1.m3u8?Expires=1600063515&Signature=PZ~UCx~kBDn6vYhic54MW2W9ULsVX-Nt9TYbAioczDPlYUXUOmoSnuYnLn3xct6J7c2me1hSaOCJ5y2239voSAdlhB~EztlbELVw291evlurAq-E8iTjHQm1udqT48BBO7aE2XIVZQ-h3fN2DkhbH~xFd2gM1o3SIiDl7VZAmWnia29JwmZYB86wb0ssT9-DjNFASQFnT132sr2pxWfy~Q~XM6AAd3Apa7eULmzAob2MUNVHaS6H5i2onNSP-AIUKwH4BkzmVopU94Hgk8ySh~JU98NvElCEFywMi7-dDrR3Pjb~VT6ep95d-Ja0~SNX4RfhOS-KFkM2iCh5zXUeLA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                                ],
                                "thumbs": {
                                    "original": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/10/1599717046605n6it680j6q1/1599717046605n6it680j6q1-original.0000001.jpeg?Expires=1600063515&Signature=fddZ~PwwHkGZHjITOpgZ8aHceQYXDCP4NbDKFuAKC3QRmzMVN1wDA6fKNuETtpFHPhRJ32X0Hxm6ytEwmqt0kutYYkJhnZaAx7iKgUGC17Z~IglcuJ9yLLHw6IUX0oXKzh1vnLnmoAEIJpR-nuzlO7RP~vV5-EThvU5hbBlq2RjllSN5e-VPjaU5OVgDduR8aqCWCCYdBxu9~x0J2eAT3PoGvXF-9h1xMOA~yB1xpbG~BisGz1tmhZMo9VnWH7619RlYGEoZ3v1JQ09-q8noRX7BJ~SsZ6JjD8ZBR8sa1ELMhV-cIc8~CdQrVC0byUFcN3xUQnsnhc~RLyVsG8uFBA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "168x105": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/10/1599717046605n6it680j6q1/1599717046605n6it680j6q1-168x105.0000001.jpeg?Expires=1600063515&Signature=HnPYIILCSUWt3e6FVEDBT3UbpYBbZrYBoP-hE3BhKejhaA-BTrbogrrOnhPpdvhKZRReYFOPrlQmm5YxttDyw-houPi5TMI~DUEo4vB46PJrbtgP4rU2htISsQhO~OpxkJHr~ztDCRC9S0-KlqqoslyuMIszIYtlaKRzAJb67ME4Ebylh5onvYhT0yMLeRq8i9Q-pNuMwHfpUJyigFsDBAOQBnG6gvODEpgfQGzdLHeLywHgptk56QgiVRITS-n-iNnk5l4zbxjAV5FCz4ZbnbmNBCokP~~TtbjwZIaOFBHMt3ztNRp2b050c2hOJ4pA1nU63dq~RNVI9UxxM3Uy8A__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "416x260": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/10/1599717046605n6it680j6q1/1599717046605n6it680j6q1-416x260.0000001.jpeg?Expires=1600063515&Signature=Q~leTWsUBrXT6prKaBBampmR9OLe5-JbuIPXZCnT4dgmxnzAK9TjhoDptFL3zSFhL3abP2XqpNtC6t8YGeU1lT3N-3zyw9MrSR~z-1HhJJ8lR65Sw9TqlQAcOxJ7vneAZMEVIar38fSBZ~he3u7rvfodXxlKH4UByZeArKqtGL13LnttFmqIM3HKrl9EtbQMD9yZSxYgJ3tghk-3fsjjoDpjLNsk21l79H~O0FSdCI-bis8gUxdP42lTHIlbDwYaQrCAUt1IDPFCaYwJ2fABYP1M2FPqDoEp8mLlMXZoE-zOE23XHAz-PdJZiz3ssj2Psg-0on6Yj4dnExEA5nx2Mg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "632x395": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/10/1599717046605n6it680j6q1/1599717046605n6it680j6q1-632x395.0000001.jpeg?Expires=1600063515&Signature=JaVzbOJFKF3EQgtCFDxoAvTuNC~rP4hhSrgFfQeasUDLDBeJqQ7M2s2A99apROb-BPTpkMojt~EFX60KZXpiQHzgC4Sps3XwBmy6czpfQvXPkt8P6iM9LhnxUHF-jxV2i6ZRaq0l2io0d2w~LVJiZfkTtJ6~6fcxut59NI0Hi0JsB2OIiQ9KEX0e3PKz9bq-zTfIQJdn0wbBGoi8GxRXfhsJ0PTyxy~IYPsy2CkFWaPPmsvUkyZKiK7aW8s8WL39k0DvDPO2Jvinj5OM04z4Zzsj-1FfeNXBavRvfh3e5fraqTwLmrVmycXYrRzUcJm9S9Mm1JpacavRjll00W1FXg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "768x432": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/10/1599717046605n6it680j6q1/1599717046605n6it680j6q1-768x432.0000001.jpeg?Expires=1600063515&Signature=WCm4GFr4itWt1VCww52-0SFEa47yTUB6CtnEE90jJ2~7m4e8Bu7I4Xvg2GFL3KkEeD94Y1gRpA6RpJfi5xT0bPGPb90lopIyk86gXLUl~FR7JkFkg5w9wOYOYL-y4yFjz2XZ1llXBkXR0yJMYHYXMmKmjrX00l55vE-0OiOxYuVqpQNFhkUZkGcuuF4Jmo7PfaLld~HY9LpgaG5c0Zx0UGbMYCgVbJISvaNggZkObvpDFbx3FTcvWa9oaLrUnyOsAy22WZY-Bt1vpsIrqdOqBqnp2hiKcW8wNmyBVqGzANisGgfOQrn5FHlxdwM7jlFGHLoks6QixNABzI4MbqnH4Q__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "200x288": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/10/1599717046605n6it680j6q1/1599717046605n6it680j6q1-200x288.0000001.jpeg?Expires=1600063515&Signature=AQ8vN~bIeVkp9kaZBDb7ZhlBEYq0T67GMuLfFEejFz8m1sI1E3fs-hBJl5s01oCG9LyECWZWG0ERKkZd7EoC0~AptBQ0TgxLLIDcFJllYV~uIBCV3FF8sCnpz8UaNyDltrk1tcKw5izd4rpWRMa8dWWyeX4iHoEpRuUHtluUe1y2aOo21tk-XFP5omuwPIT7q-IWT4gtdbCwmVvy5YnQa4B~nopcw0BOJQzwjDmbppjbyGQgHpQCywqXtjb-StC77OrbV6s0STnYgt9CxpLZtoEFB2jglFC1w-HWsnX~KtKt-seIf~7S-VMcRQcHWnuf9ceT6EQCpsl61kQBB2p-4Q__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                                },
                                "gif": null,
                                "logo": null,
                                "sprite": null,
                                "categories": [
                                    {
                                        "category_id": 29,
                                        "parent_id": 0,
                                        "category_name": "International",
                                        "category_order": 1,
                                        "category_desc": "International",
                                        "date_added": "2020-05-05 00:25:04",
                                        "category_thumb": "https://deikho.com/images/category_thumbs/video/29.png",
                                        "featured": "yes",
                                        "isdefault": "yes",
                                        "navbar": "no",
                                        "series_category": null
                                    }
                                ],
                                "interval": "4",
                                "captions": []
                            },
                            {
                                "videoid": 1788,
                                "videokey": "3BR9R7968668",
                                "video_password": "",
                                "video_users": " ",
                                "username": "",
                                "userid": 204,
                                "maturity_level": "all",
                                "title": "5 Second Black Screen (Video)_2.mp4",
                                "is_free": 0,
                                "free_url": null,
                                "file_name": "1599717064269ybvi87t5kan8",
                                "file_type": 2,
                                "description": "5 Second Black Screen (Video)_2.mp4",
                                "tags": "second,black,screen,(video)_2.mp4",
                                "category": "#29# ",
                                "category_parents": "",
                                "broadcast": "public",
                                "location": "",
                                "datecreated": "1970-01-01 00:00:00",
                                "country": "0",
                                "blocked_countries": "#0# ",
                                "sprite_count": 0,
                                "season_id": 70,
                                "series_id": 56,
                                "sequence": 6,
                                "allow_embedding": "yes",
                                "rating": 0,
                                "rated_by": "0",
                                "voter_ids": "",
                                "featured": "no",
                                "featured_order": null,
                                "featured_date": "0000-00-00 00:00:00",
                                "featured_description": "",
                                "allow_rating": "yes",
                                "active": "no",
                                "favourite_count": "0",
                                "playlist_count": "0",
                                "views": 0,
                                "last_viewed": "0000-00-00 00:00:00",
                                "date_added": "2020",
                                "flagged": "no",
                                "duration": " 4s",
                                "status": "Successful",
                                "failed_reason": "none",
                                "default_thumb": 1,
                                "aspect_ratio": "",
                                "embed_code": "",
                                "refer_url": "",
                                "downloads": 0,
                                "uploader_ip": "127.0.0.1",
                                "mass_embed_status": "no",
                                "unique_embed_code": "",
                                "remote_play_url": "",
                                "video_files": "[360,240]",
                                "server_ip": "",
                                "file_server_path": "",
                                "file_directory": "2020/09/10",
                                "files_thumbs_path": "",
                                "file_thumbs_count": "",
                                "has_hq": "no",
                                "filegrp_size": "",
                                "process_status": 0,
                                "video_version": "2.7",
                                "extras": "",
                                "subscription_email": "pending",
                                "thumbs_version": "2.8",
                                "re_conv_status": "",
                                "conv_progress": "",
                                "is_premium": "no",
                                "credits_required": 0,
                                "premium_cid": 0,
                                "in_editor_pick": "no",
                                "has_subs": "no",
                                "total_subs": 0,
                                "last_sub_num": 0,
                                "live": "",
                                "start_published_date": "2022-09-10 00:00:00",
                                "end_published_date": "2022-09-10 00:00:00",
                                "has_sprite": "no",
                                "version": 1,
                                "has_resulotion": "no",
                                "aws_service_id": 2,
                                "aws_cdn": "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/09/10/1599717064269ybvi87t5kan8/1599717064269ybvi87t5kan8.m3u8",
                                "aws_thumb_path": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/10/1599717064269ybvi87t5kan8/",
                                "aws_migrate": "no",
                                "aws_thumbs_count": 5,
                                "poster_thumb": null,
                                "files": [
                                    "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/09/10/1599717064269ybvi87t5kan8/1599717064269ybvi87t5kan8.m3u8?Expires=1600063515&Signature=WWDC9k2h0NyM3imY-9ddag36Rg6fBiVQyhHRLmwKwCtRfakOsP4sgv2tbk301GFimmZCVcb0MTiR6u-v7jr5Y4kuWVUqVxzUw1bwx9wNP45t7RVr-7Y2-krq8IyH3R9vmNvNMWKaXozU3U4xUAaLkba5hkHqOEfcrwq8S9qUzd8KpgL-HxZ4zAm4rQ5mgEXJLwOYlV8Ump2EDDKCvmnOCmgLb59DiddYVQhtxo0zQvKFAZkNvXlup1Lc~uINSMr6XE7MfSCZX7b9U-PTT0xVxvUvuxQ~fBFneU0nMAovVYeJ7Kt8WLjdMARM0Gtr8PT-L5i4YVVG3-GJhCV1SpapTg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                                ],
                                "thumbs": {
                                    "original": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/10/1599717064269ybvi87t5kan8/1599717064269ybvi87t5kan8-original.0000001.jpeg?Expires=1600063515&Signature=eoOnVdgvJKUbz6Hiwr7LeCO9amNnyP3s5ceKEI~PxD0ftNMtMHsNbzcsrVaMKpaybh5KbArPlenf1MwBFAyBaXMLI0u4QukN5vhZ3tMbDv9FLfsY7zA2rodsB-B3sg8tFxb~lvhGdFb9RrPtSq~~T5sL~jn30ftCUZOGaIY1Xsjp5W5IaVYWjWM~b1f3OJqmuXVxZTqz2E7lbNFsEpMuh~zTSpx9U1yrHVHRuM4iGPV8oJxD7p~B36g~OjdJAuxbYT1a~JvQyfJiMSe~mARcKJjXAZAZFJeAf8c1JrvSL8yBpaaQZUplYofdIZJQ~4hGapd0IMwcdAQ2AXt~ZJRCVw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "168x105": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/10/1599717064269ybvi87t5kan8/1599717064269ybvi87t5kan8-168x105.0000001.jpeg?Expires=1600063515&Signature=PdkgvLcfcLYKtAWZuf0ac5HRcUJWCNl1aqrmx4BxmTr5i62wORv13NRnQQK2mjSfWYhqjh5dSzkaBhjmwsaQ4xY6y6f5~3ETo8WgQ22Qtx-UhCSMhfgExaiUIDuT5m22Rmc-~iyDS5vHip3SCTtruTGYkSRmorfmY8tEpR1DlFXz3RmVbroLJsL2xHQ1wYV0-HIrGnJirHlYpoOoVSMNip7X1xp5tUgGsmDoY17UhPyccoDOye-gConw2IrCFcie0~-Qb1RPwc24QCsW552O65PmxGFVxbtb2yV2FOv8S5CEtz4UupWhgndJIsTQH6yByJrATZsBuUFcUu3uIEACCg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "416x260": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/10/1599717064269ybvi87t5kan8/1599717064269ybvi87t5kan8-416x260.0000001.jpeg?Expires=1600063515&Signature=RqDPN2npkKlA2dmpbrKDurklFUNiOpy7bhz0ynfdOIQayLuzfP6iw~jCG~TcDC55QJTfsE3R~x3y924CGtSu0KvPZ5CCHG5vD1X1lwvCwJm19MyZI3OBSM7R0xADi8hVYcx0~b5OYm0NcAwF6Aw-UIxelaJWmRGd7JYs5h6sD0W~~XTebcC4seQcxkdNROGzxUlRa8IadghD6syD3rCFLuNvI7~La27-HCqzX5YQDOPA-EFIGbmUJe0bj9PNCyR2ECu6LhtnHF7Q8sNdIkaqIyUG5m4oT9pCWbV3EH48XLoWGK0Vb1LABg~cBm0d8S5zIg02YZCHJriKjUzIHqkJ6Q__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "632x395": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/10/1599717064269ybvi87t5kan8/1599717064269ybvi87t5kan8-632x395.0000001.jpeg?Expires=1600063515&Signature=LokYqGY0ri0LiUlnixq5HjJw3x7L3M7pVGNh0QMjKur-z1MNHZuWDbDm2kbh6hdWia1Nk5ty24tr2d3n-ZeaZx~ZxoCHBI6cFiwYdnr~0EQVu9IeRbjo-wkN~7N5Mj50LDXfB0TB4L7thj~ptY-jQyjYw1seNzocHBaXQMIaZ8CftKj7oL05UgqJkKk3yDj4Un6~IV0Rt5lxbSJXrLcNsGmAkh~y6Cx3psdGWT9DFNNsbisdoyyXJS-dxBrnfBP4QvE6WWZZP-U0me4IdzxTo~HUilt5QoPmz~EwnWesFEAPcnA7gNSjY1Wz~yv2WOXsK6P3wc~vZtp-tpKiGObZKQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "768x432": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/10/1599717064269ybvi87t5kan8/1599717064269ybvi87t5kan8-768x432.0000001.jpeg?Expires=1600063515&Signature=eQ5Pjf-RSVH7ilwhCK0RKMWrEEIH9Lgh4pjawWggVxh0KIaGYK-Ze145dBH1Th5KWYyv9Uq~F7kEd9nErhV099ZMJffSMzZorB9F7nXwnAGpLy44upp5mW~aWxRbzVSgX90fXIptcS1eOtqk-0WQFPQlGUv8MBduPZ3Yqp61xIhqCSJa-U5NnDOar7Jj4qK0kHJ-fwd6a2wonqdpgfZpuzq2WAulkqURIcjpO831rT9Mo9jKDhYgfupHa5LAhpo35~vxGaSaFSR2B8mywfZPQEr8LOnGDwlFSFmgwgKO7DxJ3bsJUhQ5Dz6yKhir2jg4o9kZU1y4BiQuVGtn5dtVHQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "200x288": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/09/10/1599717064269ybvi87t5kan8/1599717064269ybvi87t5kan8-200x288.0000001.jpeg?Expires=1600063515&Signature=fSHyssxsBFlDLXIfJ7m5aDW6RZrqocfPU7YjHNzcJu3efwLABPoFwo57lMGnPsGtDtqyG-4ELvy88bVAT7hGtgVlNp8g4yQs-fPQDmmYisXQUUHGidjCEDOKnxGGB8U3IBowmBwzwsCSetNefnq9YeCnQ3cT9s7~tSLnapjECmBirJM21hM7frBZk3XTrsZzAVa5MIg-eW-hkJ8WX3b9zxGCCqTe9Xs5eAs5hilYbo8wCjSneCxxKeQbiEPEQA2psz1tfHgq6ml2176s2BbEmarwg8yh2q2TrePl2eHSLLIUBsSet9Whx8AqPJ3resGCinOzrvVDV6bANCr9Atp6VA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                                },
                                "gif": null,
                                "logo": null,
                                "sprite": null,
                                "categories": [
                                    {
                                        "category_id": 29,
                                        "parent_id": 0,
                                        "category_name": "International",
                                        "category_order": 1,
                                        "category_desc": "International",
                                        "date_added": "2020-05-05 00:25:04",
                                        "category_thumb": "https://deikho.com/images/category_thumbs/video/29.png",
                                        "featured": "yes",
                                        "isdefault": "yes",
                                        "navbar": "no",
                                        "series_category": null
                                    }
                                ],
                                "interval": "4",
                                "captions": []
                            }
                        ]
                    }
                ],
                "cast": [],
                "director": []
            },
                {

                "series_id": 54,
                "series_name": "The Dark Roads",
                "series_description": "Pictured in the outskirts of Karachi, The Dark Roads depicts the journey of brilliant young man to become the  notorious right hand of crime lord of the city.",
                "series_tags": "Action",
                "maturity_level": "all",
                "category": "#5# ",
                "userid": 1,
                "views": 0,
                "date_added": "2020-07-16 05:40:17",
                "featured": "yes",
                "broadcast": "public",
                "allow_comments": "",
                "allow_rating": "yes",
                "total_comments": 0,
                "last_commented": "0000-00-00 00:00:00",
                "total_objects": 0,
                "rating": 0,
                "rated_by": 0,
                "voters": "",
                "active": "yes",
                "public_upload": "",
                "type": "",
                "file_directory": "2020/07/16",
                "file_server_path": "",
                "file_thumbs_path": "",
                "aws_service_id": 2,
                "aws_cdn": "https://d2o1c9j7e49z0u.cloudfront.net",
                "ext_thumb": "jpg",
                "aws_migrate": "no",
                "is_free": 0,
                "poster": null,
                "portrait": null,
                "cat_featured": null,
                "in_editor_pick": null,
                "datecreated": "2020-07-16 05:40:17",
                "start_published_date": "2020-07-17 00:00:00",
                "end_published_date": "2020-07-17 00:00:00",
                "thumb": "https://d2o1c9j7e49z0u.cloudfront.net/file/series_thumb/2020/07/16/54.jpg?Expires=1596025616&Signature=eQI7UmB6945yzgeMfLRxXr7zrTD22EcYfxwSVkLsvtzq25xsCXFiM8CbDft4-~hZY7LmaQLZeAGEArdKGiAFsCxnhTTKOHx75nCriema2T9ANYm4wDydDuy8HNVtuDEfTFKH6Cu~ECdxWwpzdcBrzatcbWpsHH8fJbP4hH2wt4fWA-4PvX6wA3pbIzjFnY5XQzKsYFjIQdtny2ymGltC-4pHv8ikK0DsernrCpbah8hBEcqXq9TsDlchKZQwaKNvaOufchd-WZ6aCGs8vr8SQO8hue4TwLElvNqYLqAKnJJfZGc9EfQTcrPos9R3KqJKsH-YOFOaWOqUQpyn2vYJbA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                "categories": [
                    {
                        "category_id": 5,
                        "parent_id": 1,
                        "category_name": "Web Series",
                        "category_order": 1,
                        "category_desc": "&lt;p&gt;&lt;br&gt;&lt;/p&gt;",
                        "date_added": "2019-10-24 05:10:14",
                        "category_thumb": 0,
                        "featured": "no",
                        "isdefault": ""
                    }
                ],
                "seasons": [
                    {
                        "season_id": 68,
                        "series_id": 54,
                        "sequence": 1,
                        "episodes_count": 0,
                        "date_added": "2020-07-16 05:40:17",
                        "episodes": [
                            {
                                "videoid": 1720,
                                "videokey": "R47NAYSABU57",
                                "video_password": "",
                                "video_users": "",
                                "username": "",
                                "userid": 1,
                                "maturity_level": "all",
                                "title": "DARK ROAD WEB Trailer",
                                "is_free": 0,
                                "free_url": null,
                                "file_name": "15960170104408ru4d6hznxh9",
                                "file_type": 2,
                                "description": "DARK ROAD WEB .mp4",
                                "tags": "DARK,ROAD,WEB,.mp4",
                                "category": "#29# ",
                                "category_parents": "",
                                "broadcast": "public",
                                "location": null,
                                "datecreated": "1970-01-01 00:00:00",
                                "country": null,
                                "blocked_countries": "",
                                "sprite_count": 0,
                                "season_id": 68,
                                "series_id": 54,
                                "sequence": 0,
                                "allow_embedding": "",
                                "rating": 0,
                                "rated_by": "0",
                                "voter_ids": "",
                                "featured": "no",
                                "featured_order": null,
                                "featured_date": "0000-00-00 00:00:00",
                                "featured_description": "",
                                "allow_rating": "yes",
                                "active": "no",
                                "favourite_count": "0",
                                "playlist_count": "0",
                                "views": 0,
                                "last_viewed": "0000-00-00 00:00:00",
                                "date_added": "2020",
                                "flagged": "no",
                                "duration": " 1m 21s",
                                "status": "Successful",
                                "failed_reason": "none",
                                "default_thumb": 1,
                                "aspect_ratio": "",
                                "embed_code": "",
                                "refer_url": "",
                                "downloads": 0,
                                "uploader_ip": "127.0.0.1",
                                "mass_embed_status": "no",
                                "unique_embed_code": "",
                                "remote_play_url": "",
                                "video_files": "[1080,720,480,360,240]",
                                "server_ip": "",
                                "file_server_path": "",
                                "file_directory": "2020/07/29",
                                "files_thumbs_path": "",
                                "file_thumbs_count": "",
                                "has_hq": "no",
                                "filegrp_size": "",
                                "process_status": 0,
                                "video_version": "2.7",
                                "extras": "",
                                "subscription_email": "pending",
                                "thumbs_version": "2.8",
                                "re_conv_status": "",
                                "conv_progress": "",
                                "is_premium": "no",
                                "credits_required": 0,
                                "premium_cid": 0,
                                "in_editor_pick": "no",
                                "has_subs": "no",
                                "total_subs": 0,
                                "last_sub_num": 0,
                                "live": "",
                                "start_published_date": null,
                                "end_published_date": null,
                                "has_sprite": "no",
                                "version": 1,
                                "has_resulotion": "no",
                                "aws_service_id": 2,
                                "aws_cdn": "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/07/29/15960170104408ru4d6hznxh9/15960170104408ru4d6hznxh9.m3u8",
                                "aws_thumb_path": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/07/29/15960170104408ru4d6hznxh9/",
                                "aws_migrate": "no",
                                "aws_thumbs_count": 5,
                                "poster_thumb": null,
                                "files": [
                                    "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/07/29/15960170104408ru4d6hznxh9/15960170104408ru4d6hznxh9.m3u8?Expires=1596025616&Signature=EimpcPJicBY-87d2iWRGu02BQFsWZfBm0VKYlvevsmvFczsAYzPdUHBKdxRV2DNsG5m24P-RGyt9Kp8xGh22zWs20gNv0gyceKAuygdUhrnMZ58pAQk9Soymi48Tw7cdNYwuE0cTiSWTIrDzCYYkdrln8zKze5ftrzuOskPFxVv5QH68sAnxL5LBCWj64D20yg1GfWtykTOeq4Yll03Di7hvAQZ9gnbp468kVT7K5Rr1mKtayqFLp0lDbuHm2hflg8hfsUpfChDB15ApIaa0qSQzQxA1sZyCqx30YnJGZdhmwwiONRBP0JLpwq8tCgyud05xWWCOXapqim2GFSEk6w__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                                ],
                                "thumbs": {
                                    "original": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/07/29/15960170104408ru4d6hznxh9/15960170104408ru4d6hznxh9-original.0000001.jpeg?Expires=1596025616&Signature=Dg1bg~~pCGDU4hbT7Xp1Q9GD6iOOBtCQ6QYuvXKG0KTDpY8KDd~mlv85OW4WBzTAPiyVj4xEXpsh5ycFGAxubXoGLmhqbkMDZ67RcUqrnye6EAkQcswEP5yxlkrHbnWEU972Up~LVtg~Ny7kWB9HQGdEwImB7Qu6aCjAykQwIRSmHrGpyzOP8GKeO7xWZBBTg~pEWvy88cSO4q~CiihcZBT4PKDIBMO8CegjDu-Woyv3rZgZ2CkNF5nCB5ySe6GdJKAWrxXB-UNgYjJvCflitgH1Cjqzo32JD25uaFAIUAHK4fgv08fa~jl9klys7kPEKdOUyq2HWGEhv2cXDFkpLA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "168x105": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/07/29/15960170104408ru4d6hznxh9/15960170104408ru4d6hznxh9-168x105.0000001.jpeg?Expires=1596025616&Signature=ciJXALuMc8XKGDOlbfzbxqY9t~2KU9XILxLL5u7NTukUPMOT5jMY6B0WMqZie2nxOrUSZSEG9TlyBekLG6LFvJN70dp4z67EXFVlsGaViKgP-5DGXCyDSpWaEZov1bgu2H0tUZXb7Pn98GscbdYGOI-eVQNhGHX9yQFHDV0mdK7-NQmQ5-RqLeCEvXiPL72sHeOrYk7RrSpDryjjusJGdLFOMVs489MtJ39qFFvYfgO2NT5Oc4HOUPDVJ11rSvFzs7guI85gFPeB7Cje5ufynoW7Hymr-uzeXWcOdaXS0qinBqnXZNf6xIUM7VV0MF2Zl-qtfXSETLQBqRMhdnSxDg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "416x260": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/07/29/15960170104408ru4d6hznxh9/15960170104408ru4d6hznxh9-416x260.0000001.jpeg?Expires=1596025616&Signature=EQ9aP2vsSDYcYVJDQF27PZPr0Iowml67AJirC~PMbfpkvS3b~y-HICXQ5MENEDQVX6HT1L1SfQFu1LvKA1eQ4usM3gAFOTaQJbGUayfp0WJdbYHyfHe44NnQzYTju6L75iM6vuG68MPivnZIap10y~sVFKrO5Ovd7yWEo9Y-4kZBP~OMA-sVOdEcJTTbTeMr2dulcEeR3C8jAF~e8-YL4~om-lmQjy3T~AGICiAYiTR78F~lGFdCa2PYnKt99aQmWlMuNShGjf-wbl1ZHbyY7nQ2zPjWR732ryxpTbf-FX6VV8krr2rdYUQHw-zj~1rgLyxmFOHrO2ZKC7P4I7y-zA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "632x395": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/07/29/15960170104408ru4d6hznxh9/15960170104408ru4d6hznxh9-632x395.0000001.jpeg?Expires=1596025616&Signature=BsAWt75PszIdvA5MEvqjEv7WAFl6oDfWPgtjo~HHaZGwVQBg2lPz1oWcchvsba~W2k1Myw1pC~hoSHZQV7iKhF~FgYz~UbVOxZA6BufEjbhJewKS4eEJNUlNYnlgi80qqjGjhyw4O3ddpas1ZDuZ1PWmoUbY~FcDKUoHrCWeZrsBQvZtk8Vypdc4X9yK9mQCenyPSL2dM5g39uZJ296vCKMl7H0wVDkAc4I5ulB4FyX5TN-SlbQ1GL9Gjfq3JLsyxf9wAZkQ6O9YfnMJmNfvKq-1ErD9Pq2556933bmbfuyqGwQWEBme7~kkpLLr7RR6CEJTjeo9alc2FPYvqOlQ2g__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "768x432": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/07/29/15960170104408ru4d6hznxh9/15960170104408ru4d6hznxh9-768x432.0000001.jpeg?Expires=1596025616&Signature=B5DDZiYAa8YvPuXsf~cXzI45h7ywDbx5COkNhi1VWTPvYG4BTXLopzoTP9BenMzpMdnzAoc8Csrm1tjH38BjZCzQ2sSA8xiauvG0ZeN8PXIFd8r23DuYW4w5gR~KBaZYaiuHnfJT63lNRt7GMh-6dcPVDB-nE5XvFS0oVfhEYpHG57PL1vXT-MhU~vvKNvVmk7dv4fT-dRrCao9EUBqZlzb7wE-uzMqcYs2q93~DJ~hbbM9~itfM0dBwTP-9PlnaP2u-5NyykzERbthDXiiZsghUy5vAGIaNhpS2iZ9L9Rv~B0x6WKOqbTfu8Sy52uv9GLnCwd~X1UqEnZfFnJy6Kw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                                    "200x288": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/07/29/15960170104408ru4d6hznxh9/15960170104408ru4d6hznxh9-200x288.0000001.jpeg?Expires=1596025616&Signature=EKnhWCmV~Kmv1CR4vxllseppnT3FnsoBQR0LHwR7QPfOJS3tuvGXuCdy2mq3Nti4ILaT8e~cFb36i3sjt~7exNC5yD~xZAHmAoSQFMAcD3PpeF-Dr7X3GGbX2skwsyak2fua23fZF4GkFzcPP8W~qFCWbModPvy7MFgQixKoDYArV6f4EoxelS-rpEOKDW-hwf57QvSHdUYPKtqlLnqznbsfic7ZCAXCobqEyH7xD2aiWwpYJFrmIk3o6K4tR1-l778o5AJyZ9kNqq2GXJGq~bpyjNW5ecwXoROhec~XSYs3L7dY7Wgr5bZNQedFpkTnpAe3ILXi2oY-jaJ1KZIkww__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                                },
                                "gif": null,
                                "logo": null,
                                "sprite": null,
                                "categories": [
                                    {
                                        "category_id": 29,
                                        "parent_id": 0,
                                        "category_name": "International",
                                        "category_order": 1,
                                        "category_desc": "International",
                                        "date_added": "2020-05-05 00:25:04",
                                        "category_thumb": "https://deikho.com/images/category_thumbs/video/29.png",
                                        "featured": "yes",
                                        "isdefault": "yes",
                                        "navbar": "no",
                                        "series_category": null
                                    }
                                ],
                                "interval": "81",
                                "captions": []
                            }
                            
                    
                        
                        ]
                    }
                ],
                "cast": [],
                "director": []
            },
              {
              series_id:0,
              videoid:1670,
              title:"14 Days",
              description:"A workaholic CEO of a firm  isolates himself for 14 days when he gets positively tested for Covid 19. Loosing his passion project, fighting for his life, laying off his most committed employees, he realizes the importance of his relationships that he had forgotten all this time.",
              files: [
                    "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/06/23/159290890582890l3c2zwr54/159290890582890l3c2zwr54.m3u8?Expires=1592912612&Signature=QzrzIpDNWinY2lwzy0Xd-Vud2JW~blwqq6mFl-kElrPrEKkjjAeBuVNk1xTiXqI~LB-SrYdVar-ZSPWkStEGdRyQaCQrnItzriiSat983Ip8AZx49WdWbTp9iZZxcFZevlRRN9ZZ~zGJP5NK8cH82vkJjOedHWFgVkrD37wrGQUGkewOL2BlBTM4MPVWde99MHSfPu1U4roHt5sQvx4~dhP8MRbJpDr1G~TlZPzmIdREGWP-kjpqH8QGfN2NvsvSsDV1XjzZ2mZbuf0UQnp~5dwsaIRpMYfrO-jTvtZXlWDyqXkaCtLjjn8zfmF~E7AvpNodI~0qkXkybOtQg8aRmQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                ],
                 thumbs: {
                    "original": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/06/23/159290890582890l3c2zwr54/159290890582890l3c2zwr54-original.0000001.jpeg?Expires=1592912612&Signature=f34zkiKCZPbx8OGOtimNNIzZhH2ZbmAAOFBTlXGU1kqetfphUnMBX9jCVNglPX3r8M~V~IS3DcCgJ4MSw~NTVu9HK8bbvIaoIvPzaZA-UQQxbaLF0P-98M4t-69pjvfYSFsflXhITbaZukDbC-kRNb8pFScOlS8xRrO72YqhRwmL6zWc9-1~hnmTwCWb1ifGVZBXdLL-qnWuIF1k2Zy9cfFkPrP05NKU~~OAkoU30gkqVco9UQ-EpJ2nqs2lxfuFDZkKffhS1zp9v~ty3n9waJ99pD1q3Tpob8Pu9HYlGYtbfbFEW9KOkSQSrLwozhTVgpwMLFZ1KPW9VOv~YbV1Kg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                    "168x105": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/06/23/159290890582890l3c2zwr54/159290890582890l3c2zwr54-168x105.0000001.jpeg?Expires=1592912612&Signature=f2wWZvQEn82~1ZysMQl9UDKs-vPRpgy4hRK5pLQuMXaGQpqh8O~In4d6u3Oe9P5Ysw8t36vCguqQJI6tXbNS7z59DUbN2Kcz8hcd-yFqdylVOVAblHp7j1PkmSO6wqGWEiYY1s4HdW1fc5R~pcgI1vimPXlj52p0TS4WonuUL4lVc0ARn9onpUpcIGgKooBNAjso6Kwyiy4MoaaDakSCOpZOhrgrLzB9Tnm-czqoci9UtfDndmSNSBht694laBv44V1Hs96mdlqChk1~QHCCdIXwaDrUCQwqC3z8RGmz3CwYPTv-WgYkfh50JFi7VekSBu3k5jtJtA-cYGH4RyctvA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                    "416x260": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/06/23/159290890582890l3c2zwr54/159290890582890l3c2zwr54-416x260.0000001.jpeg?Expires=1592912612&Signature=JMgKFqvEraStHeY-1pEHRXN-~AZKI6p8eOEUmOcRQNSFyATygfaV5yzJttwzlzOR1CDPC1r6Ucc5MTAm8sPwTd83EIOG-nUwN-N4lO9U-uIo9lhnwJQK7dZ-A1yxcywBgGCHEj-87aEd3WXBc79k62~L~MVg5mVJ33qWIMnVclfLyAXv79-q8hEiTN-o5ShPi-L5uHta3BU6wOa154GH~gVXLWjWJGWbGPO-ylUpjBBhvlmQaa~uKNZEScgRNidKYbz53jSW~5uSYsNilEi7TF0fXVygtEJRnsgn7O814aDGObV9Rbmd~CCKduiUD~phbruSCNKLSZKFNxAI1COtOQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                    "632x395": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/06/23/159290890582890l3c2zwr54/159290890582890l3c2zwr54-632x395.0000001.jpeg?Expires=1592912612&Signature=ThNC~iyuO-gXG8mGaUA~LSmh9AQ-W0ccwK8nPCiUfdjrj3zaxaYVPDEh5irnH7wNO1qpvdXcY-~hSY1MU~6JaRUMlwQMnnC52QNyvWtg-IUFtEA1tv9MTx6BXDss5jMQhOGecgAVE~bL-74sed~512h86a-N0HihXT7hgM8um00ZEsBi1hUXznxVcS6Ap1gdvqsw86EBe8jnuNLEzWsC7bBYPgB8b5-WR-ze7pygu2th633jgUwAXnE9SEESERk7kgfChrW9A9h~ZLeG~wYXGPy51s3VDlUYJNwajDr9Wj8M2r-OIR3K3cZ5-XhqaWOj7gnqhUo267M~NzCTvfSniw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                    "768x432": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/06/23/159290890582890l3c2zwr54/159290890582890l3c2zwr54-768x432.0000001.jpeg?Expires=1592912612&Signature=ERifeQNVtdBtamBJ2lv6javAE5duMnQpQHJxcMzuJ6pzCOjeOnupVmfj7Z6WoQYyqKWgFcqH9jcEsK-EhPv~Yf7kNIj3ama~8sqwIn6E58ZKZJf3M-ASU7zhDIxH2BGLmluK0lO82kU14yrjVNnCuyZrf48GfJNl5ha0zvjkJ9335seOs2dIcSvcqF2Pa9kpIBA5Ux9qS6Jfyjvh0O~eo7OoLGqIN7Po6Co6N32OcOrykrKkp46VSWeyuyRZrReCYaScrFw7b-xTibuwBKAsmlNhAC-aRfLMdBFkSDmGxZ0eaUzbASUVxECOvIhQYE73Ar~ArU0p08CjfDrmf-xz6Q__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                    "200x288": "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/06/23/159290890582890l3c2zwr54/159290890582890l3c2zwr54-200x288.0000001.jpeg?Expires=1592912612&Signature=EMgl8FvWcnqiXg7PwSRADTaF7h5tbBlohKZYbW0SFBFR~cRNoMtZZmox1vT0Jhs7UykmNQoRoXOFmz-ShcerG4X0z4rYgv1GIluRMXkgrhYhZPOK8yX4NBcWEWpzgOTehT9ZduWNVMhsdBtiUdW3h3tE0vKO0MIKeSq0uxO3mghmsMfI532yq1bpuK~vtDCyjn-tJ4bmA50fC2kKgc9OX9shssahQzu83qWerdlYbduRtMtrsN5cUYrbLH2WFetWtRumzTaAJ7FdY-Kax0PJQQdwQZ8gVnG5ukGzcuCkdbuwNSdKJgYaj-x2KLWkRVbXl3IpNkoJ7DMLQNsDyfvZng__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                },
                     categories: [
                    {
                        "category_id": 19,
                        "parent_id": 0,
                        "category_name": "Drama",
                        "category_order": 1,
                        "category_desc": "Drama",
                        "date_added": "2019-07-23 09:51:09",
                        "category_thumb": "https://deikho.com/images/category_thumbs/video/19.png",
                        "featured": "yes",
                        "isdefault": "no",
                        "navbar": "no",
                        "series_category": null
                    }
                ]
            },
              {
                series_id: 52,
                series_name: "Dastak Na Do",
                series_description:
                  "A web series with awareness message on Covid-19 in a lighthearted and amusing way. Watch how Pakistanis are not taking it serious risking their own as well as others lives",
                series_tags: "WebSeries, Comedy",
                maturity_level: "all",
                category: "#5# ",
                userid: 1,
                views: 0,
                date_added: "2020-05-07 01:46:19",
                featured: "yes",
                broadcast: "public",
                allow_comments: "",
                allow_rating: "yes",
                total_comments: 0,
                last_commented: "0000-00-00 00:00:00",
                total_objects: 0,
                rating: 0,
                rated_by: 0,
                voters: "",
                active: "yes",
                public_upload: "",
                type: "",
                file_directory: "2020/05/07",
                file_server_path: "",
                file_thumbs_path: "https://deikho.com/images/series_thumbs",
                aws_service_id: 2,
                aws_cdn: "",
                ext_thumb: "jpg",
                aws_migrate: "no",
                is_free: 1,
                thumb:
                  "https://deikho.com/images/series_thumbs/2020/05/07/52.jpg",
                categories: [
                  {
                    category_id: 5,
                    parent_id: 1,
                    category_name: "Web Series",
                    category_order: 1,
                    category_desc: "&lt;p&gt;&lt;br&gt;&lt;/p&gt;",
                    date_added: "2019-10-24 05:10:14",
                    category_thumb: 0,
                    featured: "no",
                    isdefault: ""
                  }
                ],
                seasons: [
                  {
                    season_id: 67,
                    series_id: 52,
                    sequence: 1,
                    episodes_count: 0,
                    date_added: "-0001-11-30 00:00:00",
                    episodes: [
                      {
                        videoid: 1446,
                        videokey: "NX1WXS3AYG7D",
                        video_password: "",
                        video_users: " ",
                        username: "",
                        userid: 1,
                        maturity_level: "all",
                        title: "Trailer",
                        is_free: 1,
                        free_url: null,
                        file_name: "1588835447365fm5m95k7rnf2",
                        file_type: 2,
                        description:
                          "A web series with awareness message on Covid-19 in a lighthearted and amusing way. ",
                        tags: "dastak_na_do-trailer-draft-2.mp4",
                        category: "#17# ",
                        category_parents: "",
                        broadcast: "public",
                        location: "",
                        datecreated: "1970-01-01",
                        country: "0",
                        blocked_countries: "",
                        sprite_count: 0,
                        season_id: 67,
                        series_id: 52,
                        sequence: 0,
                        allow_embedding: "yes",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 1m",
                        status: "Successful",
                        failed_reason: "none",
                        default_thumb: 2,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "127.0.0.1",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "[720,480,360,240]",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/05/07",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "sent",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "2020-05-07 00:00:00",
                        end_published_date: "2022-05-07 00:00:00",
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/05/07/1588835447365fm5m95k7rnf2/1588835447365fm5m95k7rnf2.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/05/07/1588835447365fm5m95k7rnf2/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/05/07/1588835447365fm5m95k7rnf2/1588835447365fm5m95k7rnf2.m3u8?Expires=1588839615&Signature=e4D9hYb66PvWTKT3sd8it4O~TPS3xDDDb1Dj3dUJuiQG5oF~BAJYqjK6EWueAetgwgzWcrcEaVnbj2lhtuqZjC6DfWZAISeC9Jrjy0X7RqN9r1C~Mn1YtAJeofNWtoQ9~QF~qttD6ZXyVATLYyhNWXHNOyhZz8ejbn3CFrsmhtZhueHM9FqJWYs7rBbhqyX0wNwO~nMZBQeY2mzy7jfiMsQz32qo1cNtKqp423CS~tI19D3-Zp1F3ywCryVUDzMX~GTOemmt~QXaq6Vj0d1Jnrx4Jaq6MG3-WnMnfHtmrtxad6Z6gutNY0U7CaEiJZJIDwtyQwGRDjCwuhLgUxh0~g__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/05/07/1588835447365fm5m95k7rnf2/1588835447365fm5m95k7rnf2-original.0000002.jpeg?Expires=1588839615&Signature=ZMa1EyKDAwYWlBoX3szFVpIPoEcvw1FVIxFZ4Zko4KZOjf24FzKHXJn9EvJ8SKgi~Jg2bhLTyAas0bDlf2NbU7AIWxz577z-Jj48-bzN4qmhkCpUB9FqljD~b4-kJJp10wIHtEBeJRpI2kLv8sHndeWci-gM~0uPmQtaceqctfj7wPvyHoePvr9RBEwG-hV8NcFLXQAqOoeqNS7vPeApc-Rjznz0HtTqOoDeS9f6jgbxn~ocAZtJvqZYCkaG60C7nHimL0d1PO8ovIYl0Xc3i~7P0op-4KmztsLRT~Z-RamRDWei0bYGiAkQFgQdW5y7V0kmwZzkMrbDiQfqLdEoLQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/05/07/1588835447365fm5m95k7rnf2/1588835447365fm5m95k7rnf2-168x105.0000002.jpeg?Expires=1588839615&Signature=UmY1UIrZIzKBAwXqIOhm1Xs~0UIOQeD42ILqK7NumhCmMu1QqW3KPn98DP8cDh6roGb1nvsq3CPmGoNgw2Cxt-8jqLsDsQ8MM17838rbymEybpkoQLck77iFvFu5awBnMLxUdiyqjaTXQ2FMxnLJRYXQEWpwFmtJFfqdTunOIu6qDE6wVVGjf0F9sXVsi-YFd1NLDdtEhcKV37oGptVCtYlG51vxiZ9-FPb1TjjPLl5~Q4u1QiFZlWZgGZXnPFoeqPOWU65~VPwp9DtGSxNRJNuC9tvOow5B6T6juIrAqDn29ZHL9vgYbSF4Uwxx4-MlcrIhAD0XOPEGZfl0x-iWLA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/05/07/1588835447365fm5m95k7rnf2/1588835447365fm5m95k7rnf2-416x260.0000002.jpeg?Expires=1588839615&Signature=K-pDxojSai2TmojPCdC82yFeJL8GKvTSbbeLllTWCQMSTjY-NeTrnOQFxJhJlahvH-GD1aveCGitj3iST-cnmM~J5DzI1ovLxe1urnN3CQ-BfeT0P2rIvgwsUDI6xKjAhV8OkzlEZDKimKym71vaSu8VLyTsjSau~AzYn6c6bC-OvFB0QcqqM6nfDBxlEqwUmL5-9Zk0IbwDeZhfJ31oDRtyCK7u4dmUvROHUlDHmNrb8ERQzWrGTE46TLOXXI4TEAw5hI6nqFxyCoKrdLwcQKIc18gB7tWOTGdpjnsy6G2jt7JqtM27LeaaICuJFQW2FNcmP~sgdG8GJIyab5MTTA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/05/07/1588835447365fm5m95k7rnf2/1588835447365fm5m95k7rnf2-632x395.0000002.jpeg?Expires=1588839615&Signature=A~pptMB434w6zgq0DOixYwAJ2hgmFTsk254DJd98zLWUyxmtJahchJgKL5lzbi-fOyHRqn1RQRCfsKPmRgd-A50QStkrob-pKw8ERfl1nwx9frS2i85w1s98HMFfK8eaW9cUdEeG4K8yPAEyPFEBfjiQ4n-lKz~MGgfCrRX7~RuurRkN7p2XJz8Nqxe3i4COLsoysf6Eh9ER-lhvYtc3955~Vr1emhoBexzFstvfg031kZA7sKNj3wnArBkcgpZO-reAwUxy9mhyXEUlL6qvxhCPXqmOAow8F0CRzoLjdSi6wuuEFANjDEXt7CY4xncO4d~4gRJLycYNbLMHl~JhdA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/05/07/1588835447365fm5m95k7rnf2/1588835447365fm5m95k7rnf2-768x432.0000002.jpeg?Expires=1588839615&Signature=AOIOVHYvDltTS32i2SBB7Ov2aPI4G2~dFGdUnENr5i3eUroeMU~zqUEat~2KpKRT7u-~qzwjUnAQwKjfB~lrJdDX~YHZo7xVojehn3cOl2q1l1mi1apU5gUaqtvoGMl1c82vzgTFhhz800AKkcaB8fopYmaQ3urmcQbauoyH1JutCFVz5PA0z6jZ-Gz3XHtOAVOoylWjAnKS60Kq0XqBjsKsTw9NamLJkeuanxLITlkGrVJeJJL9wlS8K6Eefg6dAvYAehMM35CXV~x3k9YMC-jGYepXq2sohYu44-2YQ1HNP7HbQUE1IDKgYGjma3EawewmcM7AfhnTWzn4EeWcaQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/05/07/1588835447365fm5m95k7rnf2/1588835447365fm5m95k7rnf2-200x288.0000002.jpeg?Expires=1588839615&Signature=VqQlhBLFZx4HSw-ETXRdcGZkD5C4XP-uqc-Hnjj5yZYcAQbaJNXb3Iq3P0yjX1Fc~k7jAlZeLukzTP4UvbyVvimtVwx79a1UOr1qXwGKWMJj5e82rCo3ogkVry0eR6nxI3Dzt3teDEFu3pIjpmr3xWOcE37HLhGxTO3-YmqoKBQMvR7YLq6xbEg1lBRjZBIvD3~AFiBvuUP0eyceI25gKHHx6M90WBCXyIES8iOqVVx36n6nZm1SCPtgIezqHBhkdpk0-UY2fYCxK9dtvONpZrW~5J2RbL6HogorNiXznXcZo4MbfdTSyNd7JX5emzAk2z5224rwJKBn7oMXYS44OA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 17,
                            parent_id: 0,
                            category_name: "Comedy",
                            category_order: 1,
                            category_desc: "Comedy",
                            date_added: "2019-07-23 09:50:55",
                            category_thumb: "",
                            featured: "yes",
                            isdefault: "no",
                            navbar: "no"
                          }
                        ],
                        interval: "60",
                        captions: []
                      }
                    ]
                  }
                ]
              },
              {
                series_id: 33,
                series_name: "BATANA HI PAREGA",
                series_description:
                  "Exclusive interviews of well known cricketers , revealing the untold secrets of their career and personal lives!",
                series_tags: "cricket,shows",
                maturity_level: "all",
                category: "#6# ",
                userid: 1,
                views: 0,
                date_added: "2019-12-19 17:58:25",
                featured: "yes",
                broadcast: "public",
                allow_comments: "",
                allow_rating: "yes",
                total_comments: 0,
                last_commented: "0000-00-00 00:00:00",
                total_objects: 0,
                rating: 0,
                rated_by: 0,
                voters: "",
                active: "yes",
                public_upload: "",
                type: "",
                file_directory: "2019/12/19",
                file_server_path: "",
                file_thumbs_path: "http://37.221.164.177/images/series_thumbs",
                aws_service_id: 2,
                aws_cdn: "https://d2o1c9j7e49z0u.cloudfront.net",
                ext_thumb: "jpg",
                aws_migrate: "yes",
                thumb:
                  "http://37.221.164.177/images/series_thumbs/2019/12/19/33.jpg",
                categories: [
                  {
                    category_id: 6,
                    parent_id: 1,
                    category_name: "Shows",
                    category_order: 3,
                    category_desc: "&lt;p&gt;&lt;br&gt;&lt;/p&gt;",
                    date_added: "2019-10-25 20:22:14",
                    category_thumb: 0,
                    featured: "no",
                    isdefault: ""
                  }
                ],
                seasons: [
                  {
                    season_id: 49,
                    series_id: 33,
                    sequence: 1,
                    episodes_count: 0,
                    date_added: "2019-12-19 17:58:25",
                    episodes: [
                      {
                        videoid: 1201,
                        videokey: "H9SDM7U5G3O8",
                        video_password: "",
                        video_users: " ",
                        username: "",
                        userid: 0,
                        maturity_level: "all",
                        title: "Trailer",
                        file_name: "1581431981985vwxh82o77v3",
                        file_type: 2,
                        description: " ",
                        tags: "batana,padega,promo,final-002-1.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: "",
                        datecreated: "1970-01-01",
                        country: "0",
                        blocked_countries: "#0# ",
                        sprite_count: 0,
                        season_id: 49,
                        series_id: 33,
                        sequence: 0,
                        allow_embedding: "yes",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 2m 18s",
                        status: "Successful",
                        failed_reason: "none",
                        default_thumb: 1,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "39.50.85.152",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "[1080,720,480,360,240]",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/11",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "2020-01-01 00:00:00",
                        end_published_date: "0000-00-00 00:00:00",
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/11/1581431981985vwxh82o77v3/1581431981985vwxh82o77v3.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/11/1581431981985vwxh82o77v3/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/05/07/1588839010170p6t7h4u8t37/1588839010170p6t7h4u8t37.m3u8?Expires=1588840736&Signature=QL7R3pRSLzA4wOqtING2Cj5E-xpxVHPDstrk35v0ZFc~Ut65mp0oOUOuDhmBtQkmnbMX~pMAWNk0w6iY7mI~2zpzV56vE~vlFTFMbIiRsgFL9LkEfAjlXKSaWoI1Tc1SgQoA4NQtNzDOKnXC7ubolEHVSC10yvcsPgRXL6nAYQWCzKlLOiAXh9gzu-uK16Ofv5SvACc~nMYHhvzCuS-FUHUQd~gJogaWlcpfUqI5J~8zv2GQ-DxBelCLfeCNIPyi5Pwx0TswxPd--6VWCQbhmbCyXQ4Pbdes6W16JZst17QSf05yLrgOnK65vPMXqjHgtFFnFDxCvh0uk7I33aGgvg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://deikho.com/images/series_thumbs/2019/12/19/33.jpg",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/11/1581431981985vwxh82o77v3/1581431981985vwxh82o77v3-168x105.0000001.jpeg?Expires=1582531932&Signature=VdJa~fETCKwTO8~6zFOWckpWkDsN99bqFXhE0gDx3kxC-vYdVBuQ0ok5BbnPEeFw1iPOpOFwcf6WEFeCZfl35WzQmvhYJYNNP3sd98CR-7qVfG9o~H1k-DauGfesFM7U9RsByNa4SLNI8c3XFiHgFvAk~usSdoh2kFbksW1XJ8dbFJVaKUH~7THPHPH7u-blcHlyjGSthA-AQV6I-cwMi7Ee0JqQQcRm3p42vWucHwavql~6DzPJL985LaYs3cOj9sHpY8tXkwK3uN5nCvTFpiDgtgQU7pvfwMvNc3Et~7KxtBjVeMjQ5lwaJfdDLK4k5KMrCR2v67uZ~pqHkwyXVg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/11/1581431981985vwxh82o77v3/1581431981985vwxh82o77v3-416x260.0000001.jpeg?Expires=1582531932&Signature=CFmrDtVdCC4hnfDahfF-ZECwY3wFmriIxB7541zALBQ1sbwMnucNNU-0yHh3~WrdqB-NnUIAwE-8~h7KFdNVrFEqAJZLXhMFezWxEszy2QAWbtxpQXNqOVwgsjQrLcf9BSPhitmG4ZZUz-3KBYX2-RxsdBK2dljcsvV7UssuFGsiwEC43JZZxESgNl5JSLL-5eVoG5pnAUBcaxI8dm3v4gVZOtiDJcMSAELBV9C4lJy15x~4YSm2HDxc-yP-LsgADrpMfbDWvbP0srt8S1lH-QiCJ945OurDQaZ09Yya3GOGaBSTk7juJHCPoWg--DmqyE29LdOZ~6hoRE~b4ZJtTg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/11/1581431981985vwxh82o77v3/1581431981985vwxh82o77v3-632x395.0000001.jpeg?Expires=1582531932&Signature=R-4vlFvAxr6Jwimex8ho9Wd2XE-eA0QY~GVgEovQb-49MSkuBuNMwyNk4FPmAIRjYiybQIr7tr6~auKiQ6i00VFDOxgW2wE9Sg6fsilmU-5yQevWeVH-r6XyVdx~235Y7A61Ln5FjN2nvHSQJHeNlFW5EbguQfv-QD~TmXLsftk6A7z0OBTWan9L~0PgpBt9b~n96S~qi7ATbuPpNTGSY7mCwKo4pC4UhoQj0XbI81UtH1Tl03hQjFu6hX8lt5S1jZD4~m3LitkKsC-31ODD7y3ISqVX38uNd65JMRdm~MvygmXLW3sebNNogiOqhnV9Czmz-sgjS5fbaMB3pWoklw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/11/1581431981985vwxh82o77v3/1581431981985vwxh82o77v3-768x432.0000001.jpeg?Expires=1582531932&Signature=eeqg~bMdogud2E3UCH1nkbOuMyXYpY5bdZYGnEcjinHF4qnEN6wc9qzhU~ZjSQks3VYdQPRhRjBCCuNB7SbWDcxcQT8kOeqhHOlpr~VazeyfRBf-vm5ccAM5U91L1KArT~9TjKcUKXZxblCYdJgytCJmvKtDSghw0J17uDQQIhsAPlu3H4DculSx203XSCL6Bcw7x1FcyapxSOQ8fx1G2qjdcj7OjEuZua7jMKkpz0cT0x6DXY12bykvZkRSKXc-hkOyn1p0VfTsbpqnSBKkdEow5S1bONuzWifNX-kdYM2k0NIgrnsqUVXz63JEa69WkpHuWpozZf8RwHgvNnttOw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/11/1581431981985vwxh82o77v3/1581431981985vwxh82o77v3-200x288.0000001.jpeg?Expires=1582531932&Signature=XUebtXHxUWD1iaDIzj3YfMcxkpznG3xO36kKJWFok~2OX1Du7k3AcldpDARWIQrCuOOuhYTPkbEESiAuOXRtUbMBBKQ1k79Ksq61xWB4pfRtqFLiWcFURH2EMd101JCvPfq3YdyuZ6fbRm6DUV4dvDuAQvd~NP490NJIyst~LAOFtW6HN2LFupbux41JA-XxxeWC2svWfV42ynIXaQFUK3gaS3ZAnaegdcFQJUcuKE787bdi1ijbGQHXIUJcW8wJt1XBpIByy07DuWgEYNb8pym0UAwjg3Q060r0gEoWCROoQfiF2Gq5BXhPXi9BI6p4mCkamicQPk0UNJvoUCpclA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "138",
                        captions: []
                      }
                    ]
                  }
                ],
                cast: [],
                director: []
              },
              {
                series_id: 46,
                series_name: "Parinday",
                series_description:
                  "An action drama, Parinday, shows the lives of underworld drug mafia and target killers of Karachi. ",
                series_tags: "Crime",
                maturity_level: "all",
                category: "#5# ",
                userid: 39,
                views: 0,
                date_added: "2020-02-18 22:31:58",
                featured: "yes",
                broadcast: "public",
                allow_comments: "",
                allow_rating: "yes",
                total_comments: 0,
                last_commented: "0000-00-00 00:00:00",
                total_objects: 0,
                rating: 0,
                rated_by: 0,
                voters: "",
                active: "yes",
                public_upload: "",
                type: "",
                file_directory: "2020/02/18",
                file_server_path: "",
                file_thumbs_path: "",
                aws_service_id: null,
                aws_cdn: null,
                ext_thumb: "jpg",
                aws_migrate: "no",
                thumb:
                  "https://deikho.com/images/series_thumbs/2020/02/18/46.jpg",
                categories: [
                  {
                    category_id: 5,
                    parent_id: 1,
                    category_name: "Web Series",
                    category_order: 1,
                    category_desc: "&lt;p&gt;&lt;br&gt;&lt;/p&gt;",
                    date_added: "2019-10-24 05:10:14",
                    category_thumb: 0,
                    featured: "no",
                    isdefault: ""
                  }
                ],
                seasons: [
                  {
                    season_id: 62,
                    series_id: 46,
                    sequence: 1,
                    episodes_count: 0,
                    date_added: "2020-02-18 22:31:58",
                    episodes: [
                      {
                        videoid: 1234,
                        videokey: "2GOGNMSD4K62",
                        video_password: "",
                        video_users: " ",
                        username: "",
                        userid: 0,
                        maturity_level: "all",
                        title: "Trailer.mp4",
                        file_name: "15820653307557i1wuvs515",
                        file_type: 2,
                        description:
                          "An action drama, Parinday, shows the lives of underworld drug mafia and target killers of Karachi.  ",
                        tags: "trailer.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: "",
                        datecreated: "1970-01-01",
                        country: "0",
                        blocked_countries: "",
                        sprite_count: 0,
                        season_id: 62,
                        series_id: 46,
                        sequence: 0,
                        allow_embedding: "yes",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 2m 15s",
                        status: "Successful",
                        failed_reason: "none",
                        default_thumb: 2,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "127.0.0.1",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "[1080,720,480,360,240]",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/18",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "2020-01-01 00:00:00",
                        end_published_date: "0000-00-00 00:00:00",
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/18/15820653307557i1wuvs515/15820653307557i1wuvs515.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/15820653307557i1wuvs515/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/18/15820653307557i1wuvs515/15820653307557i1wuvs515.m3u8?Expires=1582531931&Signature=HoxchtUwm5UU9X6vhyQbR2LxDTdKEBh3CB4Z8MF3vI-0-w38-pADn9iymFuoxXe6-VIwQiTjvr~aeIF30BenTyZN2-VbGqQl-DDnEqMjn1EHk3euctQqL13lhLopU5UArOAQUGu2Esw1GU6dRRlGo~Kj30hBqXVuKO5ABZcHJyElRgaHRqzWc9CyUpWgbfDfd28IZ~KFKLvH-7mgq~0ixvrLkISrFblnSRRJa2Mz3HY1N6OJz2rSoSVyKaVsj~2F5bwYaYjZyqh8V2dWrVCSfnkc8O3z4M~11SLF6O~926jhODfJIwIuYD6unmezObXUo17vMz0QSkaOL7cWedqcMw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/15820653307557i1wuvs515/15820653307557i1wuvs515-original.0000002.jpeg?Expires=1582531932&Signature=SIdu~0TaqRvfnW27yA1Bm-RO38EEz8kqxEzEZIT5yt4dReJUM3EIWtTRWAh5DcnTgiL4Qobb2eKiYtTv0NzfpUEb1EeHXsXQszrWG2CAzgjbntwR2pv4YzoiBSs15-DgnpsdfMhwzYDbxoQ-FGoZ7BBVQcmVu62UmNzyh3KaK5QLLHUAEb6OJaCotrayqT69K2kaR8ZWGSbkqs7Yp7qY1YMTl2DoxR5T0pLKEBpjQUhRgFv62WrnJxY5yp~ZbzpAIm329NohudhWZm0K9-ObGZVNRsfvPntkWns7m6ESg5Eh~CSRTkRnw2VNDQuNwH0iddrVxOPB8D~yWyvvWI0ZRw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/15820653307557i1wuvs515/15820653307557i1wuvs515-168x105.0000002.jpeg?Expires=1582531932&Signature=U-SA9tcb4S8ugidBWOblcOa6-9iToV26N0p854bRjAeIwl-650bDVTDkWgWI-mmpwf~54NKMk52sPW1wa-AnzeyCLWi3eCSutLPB4psptoVT5qPSL~0M3KDFUnoegEjZoix1IfySRYzOKOQO3OmG~vF1m0NRabutio4vuBD22UaEk2Sbr7PJMNNpy5EVrPfcwbXThZ8GY3ycaAGaKRHDbFjLIcpOre6TapbLWajIWfGNHXLud8uW6ocS9VHq2gHbc~XxMzkLNiPInqFHQ3Pgiem4LEv8XSx1aC0wpPB04zVNs1pbnaZDIaW4IjN8T5H8u6-nkOZoEP-NHLt9kVQ9sA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/15820653307557i1wuvs515/15820653307557i1wuvs515-416x260.0000002.jpeg?Expires=1582531932&Signature=H3LRO9ySFVSHkbNRPId7g5-S0Md-mMz8KFhfiH0rhahguiyZpu49Bd4bxIAcSP9LIGwIv2HDnaxhr6fg7HG9VhNMNri5~b9wnbH3rcit8e0sY1nbHaKu~xD~qhrlzC3P9rtVOlQLk8Ja8NOIg16z7fhmgwFQcCKXuQ8xoGGUPMQnur14p9QLeahEmdSOqa2LjcxfkFHGwvJv9hmMTXl~pecIKbkD0F~mP9avZTdSjoXIjHdyrKCiHHK6PZfphTcxAQ345GzGDBFH-0B-HCYqLMa4mBPPGncwapFMYgET7X~vBv4l25k87g7dsS85~Q1HoQHjuE3aRNVB2UMqNt8Z9w__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/15820653307557i1wuvs515/15820653307557i1wuvs515-632x395.0000002.jpeg?Expires=1582531932&Signature=L9tbGnjKps-mHZbZtwOLrb4RvRSpmEV~WjuKI-sAUHA2Y2WdteGVqQyNYxa8o3nq6ux-uF42eMP8XBau669AzDmT-SBNO~8LC~gZRwKBK9UoXtDYc0xp9b7Q~PGg7zCn~r9v-g2hX7JTEb2OKx0ss6mfa24wiBvkbnqYI2CyRBpIyEZh~ldhuWiXdwlE6y5GZU7GcLxXqdlSdTfJXoQT9y~ldOq4ezNXGAJ1zTEGqftruqzrUG0PvEJmAbO8Ht3DjjYPy7EpF-vZP6pN3MdC77~JwMC1k1Q1oI0wHg0hZ8d~RbLmLHWQTGaU8kMiFtwyO0k4NQsH2JOLYoZV6BkLtg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/15820653307557i1wuvs515/15820653307557i1wuvs515-768x432.0000002.jpeg?Expires=1582531932&Signature=E7qOZifOK9ww-HMnKCxBP1DxYmm418zrxYkRyp1TVpAvl48kNKI-KJC1gyqpaKWSZNSUdPQo6uiZQQmgxo7DqboCIbWdHGwXjjxoe9MHynGwgq70S~uVOtucI0rlnZ4417rq1X2KvJ5re3Qp7aOmy94rFKzXllD1H~A5qfaTEtG3C39vbSgB29GvY5FRmejloowrO5XQYGs6XrKofYDgcB5jVcuU7wkrz3JrqqjmCU2v9lAY4sd-Y8oNkZ7-mCSryVPtu1FQMvsneOmMZOKKxy-8S9k5ARWhxzqmmKRu63e4w1Zax4EDU9UJDa061xQwBLQSSPYFa3e7iXNkFM3SRg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/15820653307557i1wuvs515/15820653307557i1wuvs515-200x288.0000002.jpeg?Expires=1582531932&Signature=BRG740n~se~NUQdC~DYckS0FZrLfjjthjfrWPfblJVF~00XDJJepxN3OJf9Pr3uR5BWiQDc9I6vzd2dMurxj1EPPlmUqo6hClCaMLlKy64MMA2FIv5U4-psch2rLKl4OesxGPbRIjtpAgfhIPYyGC7DEzbVrMnvKhwpMv67rUn2SUcpoFR4J9wePjoi0wonHge4MhbL6665txM2mq-p~wH4JZWvzwr5hLjVOUZww7s2aTCuZLrd7NF~i8ZXY3uHCwK961rN8WM~ZRGpwfetC7pk0~S0QHoz-MTE0LNELWBBUEkr8ZSqt2l8IUhHsnYA6~g0N3WM8JOzWBE-y3kzxpg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "135",
                        captions: []
                      },
                      {
                        videoid: 1320,
                        videokey: "12U5RW72B35S",
                        video_password: "",
                        video_users: "",
                        username: "",
                        userid: 81,
                        maturity_level: "all",
                        title: "In the memory of Marry",
                        file_name: "15825009416929xcyitl83ww5",
                        file_type: 2,
                        description: "Parinday.mp4",
                        tags: "Parinday.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: null,
                        datecreated: "1970-01-01",
                        country: null,
                        blocked_countries: "",
                        sprite_count: 0,
                        season_id: 62,
                        series_id: 46,
                        sequence: 1,
                        allow_embedding: "",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 11m 6s",
                        status: "Processing",
                        failed_reason: "none",
                        default_thumb: 1,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "127.0.0.1",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/23",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "2020-01-01 00:00:00",
                        end_published_date: null,
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/23/15825009416929xcyitl83ww5/15825009416929xcyitl83ww5.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/23/15825009416929xcyitl83ww5/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/23/15825009416929xcyitl83ww5/15825009416929xcyitl83ww5.m3u8?Expires=1582531932&Signature=GHtXR58mMrmkLwXEb-nFy7GTNzfii9quDygK6gVh22qKZnau5~SLS8Xo-W830vMNf2Dp8TFQMZtC1bc3wzmId~SnMhlTzrQsbP6jRx~kMV58TFKen1x6x0O9zjWOvLALEKhmitlyojhPSy7p~Uh3DhMvv7fkJAXAyGT9tDXXFPGm1B63VrYn2TfmxRDVNVF1uzGa4klvQm4FwWlauwCPInbuJowaDaQB4KlC630yKbbEJ~a6T9L43T5~AbAkDJGt4F1gbeeaLKEzjorWYvVR9x5IX8KLbNhAQUEAx8HFOiM92i2ZOKKGtHPLT~YwqsnsNGtr9Kqf03LQPO0unb0uWQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/23/15825009416929xcyitl83ww5/15825009416929xcyitl83ww5-original.0000001.jpeg?Expires=1582531932&Signature=FRcy~vYW-3XS6MIpWBQrDaH-xr-CCTNS~wBiD8TkvQhk~MImcVWHgJ451pDWQwI4QS7FdsCqh8ePZICjzqHgjcPeahk1AY38WT~IGVjb5W7M~d-mAkVfyPzJ6bqEHG59AoBAtp6crnqRymM8rduZ1fxwphtu1siy9dUDfiDVB3eep2UpH-ZOh6Xf3pKpoTjT8DqOudqH9rb2cZpQQ61ZUABsQCx6YBprCmXyCArs8Edd2JZZEWkh75GB6HawTF5sdCGX7SeS7SdpqyOnKLm392mzQvLIj-F06QSsXjgpMPAYG2v0QoYhoOWzshWRpdhWD~ERn~tZij2L7tNC8g2KAw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/23/15825009416929xcyitl83ww5/15825009416929xcyitl83ww5-168x105.0000001.jpeg?Expires=1582531932&Signature=NFASL7D89-Jn~vGaIyzSqLA~Gzfr~WY~GbnYQ5rqz7SLwQT8H2sLOduVMcjKFnSOaK-c-RQY7GIy1sBCBJqoMZFBhKe7y3q67xT1dky782evhli3xwJyuaHO1UZkkEplcsbYNujVYeZb99O1tVOIQatv-7bjv0NM9pllyNKKCFCQJ1rOf451z1G9~47BQZHJklPltM7~Pek~Z8CfPCTOSEwAsgC5psExAcQrSOGwpaoCcXLsnOUraMHnorDcLmiZdatQu24it63Y1rczFOEfvtreSR5M6kdoW14STO5ZCp7iI8yViyOBQ-MpAy2zDv2J~3PPrPgXwAvt1GcAUu~dlw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/23/15825009416929xcyitl83ww5/15825009416929xcyitl83ww5-416x260.0000001.jpeg?Expires=1582531932&Signature=C0SCzNVhN4acI0vOmBH03-ZfIBDrZJXRRGDWabdMefhMnsLAofBKSDIfXvOVuHpCMohPAQfOyGHaP1iXz9d36YILIu70oPugLpWSc7Yn7dLApoXeOZd3gckHaKWkozg4QBvlY2p9BPDu1ACHEfhvzQsdXD95fQnSD7XUo7zoaR-a2qi1u77pErTcqfRcU~ZfEm8IAC9hV7EDVpGnPPg-wDWR-cjhypUbsYkG8RlFZzTqXv5Y4pSnuad8teWJQG-3BYvj70BxRT7y2~HVcpvGJq6~tBLZz0I4jRHbVjYcO4mAVEcdMOyGyPP0snzjAsRVw5FZlFdlLjHVXzloslRFAg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/23/15825009416929xcyitl83ww5/15825009416929xcyitl83ww5-632x395.0000001.jpeg?Expires=1582531932&Signature=M0Ky-YDsH9KPGR79N3J9ihkupWXJoVq~ChxwYUTGSnb~N20G7qqrk98oG6UfhzA7S2Iu~oqxkQ-jVBiq1fAQ-eYnBYHDf-oi2LFWXoYAavQllopspcJjTm-ERe7rZ~SGIm9uYkmJqEDl-M-UxyMgKeOYiech1K-VgMlOVRXDMUE~YfcWEqTTPxinNb1TIiMJJD77ts9WFQM8pyot75wkT8I5kDSN4U6q66P~h0cRwBm4Im407Pup~pNNmuAVNHY8O-Wl1EhHkmcnXFajGjV7lAD45k9AxlXQnpZhfpqRAYYkgS8sZctORlzcIbGgfbBAGqxIGpjsOBTM-t3wSAEJFA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/23/15825009416929xcyitl83ww5/15825009416929xcyitl83ww5-768x432.0000001.jpeg?Expires=1582531932&Signature=KvweAvZCueIpD5XI3Zzy1d5TJKlJjitfsl7~WXYzFgzCGkS9zD-u9ic~UuZ3gS~Gv3zNWCS-NzRMdpAB7QOEVl5QubTfdzyC7YLZNO2qnCPHQtUVhIfXvOyNiv-GYOZ1mETPh8ad4hvtE~wINjFW43Om7ASPwat3zfoqUyhkzsYbsvrcJS~Y41C6FIQ4WMQQFs3gyAWGT9tmRSFSI36DJz3Z5CX1L-pfozzIzypSDzBA51xwbc9MZv9MtByajzcqqwsji~5eQwX3n~Pbd3SG3bu4klHQ9pHDVHB4cp3kJqb5o9KUu3S93q2U3YBhKCstcKQefWZwPIkxYYVZbe8Lmw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/23/15825009416929xcyitl83ww5/15825009416929xcyitl83ww5-200x288.0000001.jpeg?Expires=1582531932&Signature=THAFiMigqqMIJpoo8FK3yACQisdAC7PJMTOORs7QrdRD7E0fAyrD5JtKeor5hU2WHi0ojJ2LyLDjvwKe6KpsNypUjPjF7B4nh1dSo7CjpkSYquWJdBqhN4tw7Tazi5O7qJsOGSiR54huSB-BQVyNQZ0f-0TuqpIIzkPMC0SR64jQRPUiHT1byw6JeYTEf1NGGKIyewTUIikcJrVe4NJZ8C6IpUYh9vcNk8LfS4GPLLNm3Oma2dGWyFJP99bIVBJaDQ59tF1BcxbJDNrjJTs4yrMN2h2nKsDbu4fkdKf0aPO1bbhXtnhEGsobizbRCeNl~iTFYCw64cKJ9gNj4ZrmkQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "666",
                        captions: []
                      },
                      {
                        videoid: 1318,
                        videokey: "1O9B9NRS59YX",
                        video_password: "",
                        video_users: "",
                        username: "",
                        userid: 81,
                        maturity_level: "all",
                        title: "Ep-02 Revised.mp4",
                        file_name: "15825009416860kw16k6zhc2o8",
                        file_type: 2,
                        description: "Ep-02 Revised.mp4",
                        tags: "Ep-02,Revised.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: null,
                        datecreated: "1970-01-01",
                        country: null,
                        blocked_countries: "",
                        sprite_count: 0,
                        season_id: 62,
                        series_id: 46,
                        sequence: 2,
                        allow_embedding: "",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 7m 19s",
                        status: "Processing",
                        failed_reason: "none",
                        default_thumb: 1,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "127.0.0.1",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/23",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "2020-05-05 00:00:00",
                        end_published_date: null,
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/23/15825009416860kw16k6zhc2o8/15825009416860kw16k6zhc2o8.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/23/15825009416860kw16k6zhc2o8/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/23/15825009416860kw16k6zhc2o8/15825009416860kw16k6zhc2o8.m3u8?Expires=1582531932&Signature=IilCYe1kr3KMyZ-b4Ju2Ysrr0jMzz3-S9vkU4q3TBHtI4iAMV7BQcADIVDwZJnk8Zx7kE9QzQM~Qn99YsP9uqJeqHBvCOQo~t9QhbjhiEXhx7GMrd3HqLwB6X7TClo~hCurT8z1acrq2~0oe2F~1wW685xzF9a2KCi3F29vT6~YRgFT3JpwO91UQnNne5GTxtM1dCuUWV5~VtGqSpZ3b2sWfGUCTxZwZTEg5eLGYID2jw2ieHiaKhBe-hLrqFZcNL~g2XPMxt2y7OoITzM7tEzU0ktW54gvgzFH5hCaRyFeUDktj-9XN0hJTw6stwn40MYnoYyRJKr81ufpuKXBm3w__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/23/15825009416860kw16k6zhc2o8/15825009416860kw16k6zhc2o8-original.0000001.jpeg?Expires=1582531932&Signature=VwT5QJn4AYhyWC5nkBQTEBm1afyfhlMuGAZtiGE2ebcDe9JTN51Ps5WNLVlGxcoVcSFIwYShHUF5pujcWjdzORiO2pHU5p-TCMkePQmwlIj3iw-m6Fm0EGBBA6FkyazgofuFR~nQHJNVMUieK-4d9yf68jgY6wUWz7Bx-ykSPrP3LuNznW7FjQJ2N8qoL36NJ7FnbV0hlc5fiQqj5daC-Hwr-5ZHLvMnwRVBj~Mk14vIAV-v5HauU1Ky8XqPGe6EQvS3dWiAtBvullT~H5TxnBnVp3kzL3BSKkHSslTatKpTi0FyL9o01qZvcy3qLBpYJfgbcFUdL6pUEHV0KNQamA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/23/15825009416860kw16k6zhc2o8/15825009416860kw16k6zhc2o8-168x105.0000001.jpeg?Expires=1582531932&Signature=FErnBid3QnaW9A6ECyPdSDcagb3vqkZKmfE9HPd9OJdvYnCrPa0KRknBOa93QtCBzlGx-z0vTtKmHGYIPx69HlK5Zh8YBJFmpm7JWEq1Kn79L4Fsxl4qFcCConLSW3EyCISkKor~Oahb9opDQ158QcRPCKe0UJu5hi5pF3xKGREnR-drTBSHhIMoU6hPKeEKau7hh-aiQ2ssoC1SiPAxUwnAzUpSSVZ36udJ~TWjk7x5C9ZJG1lUjzQn5BSmpsDBeg379qpDAKvPm6boigJyhOd206XtRGI1Tq8bqriK-0oAvowGhIiMbmu2I3lbdhuPejUJY2p02UpPLTIcpGSDmA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/23/15825009416860kw16k6zhc2o8/15825009416860kw16k6zhc2o8-416x260.0000001.jpeg?Expires=1582531932&Signature=TG~F~Q0yjDdu5e85AqdSg16tqBgojShIkrRt4agOu0wZzf6pjSiuqqP81e5q20uxte97aazldJ~3xdqhFUG0UfBDA0UY2fnlzr~3QMnqxpSPp-Dyzlp5m5tFnxvFtrAA8DkPIWk9J-iBfud7QE2LLj5XL~I5v-NYP7wUWPHs5K3KpWh-aZ~Oe2S7Byombd-QEyLlZ9HSIOEsZlhMFJTjBO75kolGkUeBQeZXAwbgKUmq6cndhQl6EzkwNFhmbm1S4-Lz89vfN0q5dAGmBe7mtTb-6kFzJLavhD8mooBEIyHVdbJ4uB8Aads18V~johmzhgKZNEkwqqFJVWD28YP-tQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/23/15825009416860kw16k6zhc2o8/15825009416860kw16k6zhc2o8-632x395.0000001.jpeg?Expires=1582531932&Signature=WOsqrDtgmWn7c7gSPJnHrEZdrqcAbQ7YtV5oERgHwaXhAJ553e3WuXytLOzerQ7bW6XKxwbaegEmkQHJ0evnnMJWOhVh5QxEAuW4GrxQ1fyayIRM204MGmjAY2I~bRF12pEsXnYQKPcEay6raoERZ0rF9KfXprYU6~LmdC5ny0SGLMNhvsDD1tJo4mhQBPkvPg5am8vMUKKKrY-yT2QUbNh-p8qSMCghxFAA02pXrMst~ntv2rGfkKKzDn8045egpJs9V99tDMS3s9QppeLYsQx-WsoA91Z3hWlZRTA8ocJPwNg4Uysxiwt0dfRtX5OhnHNGIXeMyu~umSGDE2qKpQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/23/15825009416860kw16k6zhc2o8/15825009416860kw16k6zhc2o8-768x432.0000001.jpeg?Expires=1582531932&Signature=GWwH1IbuYRO7XCN3WtybLkMvieLJ3AD1x6H8m1O~vnO-PuSEZS1ZlN-DMGVjMRw07Aa2WYPFDgX2byBU5rQvIWWmVgMhqpJ398hfHE6I8bNZ5iZlbDnB0XMqJlN8rCjLLirM87fO0NHaIeMwpkIRduoDz3A5QCJblOrjNfzVX5JkWplKOV4quoE~oxI6jmSIF-9s~VAE6dAKDr7SL4kIAz8o27gflhGIefRCge0AurGvyzSZXTYZ9d~wzvM0ZmKGkJ33aT0AxzNNHUHOB2AWoiOv94mKWRKQrnX73KIG2EAvSXhlkPK-qDf4UmZ3OEayz32CqIo-ErYUm956SkkeeA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/23/15825009416860kw16k6zhc2o8/15825009416860kw16k6zhc2o8-200x288.0000001.jpeg?Expires=1582531932&Signature=Xqn-3WfOf1GEvUKa-5~TKzZlt3NyNLeEyve9n5PJtu6MUojxJPMtXt5YpgKeC72DUYtwhd4fEgzlpq5r3f7ZLKMf9wRVnlSA51VUqT8uuqPhY2VM1uqjelQAYN1ShzWxRdL9vKS6Mb5xihgzfKI-F0pfys9hEpkpgCfMc-~VQjFM9m~Khha7B0IXkTUYFEkZ~CnnLMLJiCRsazD7IU4M06O5wUf817awq5jaoxmqbRHXprhkC165EEdUzOXHhcJ786d416tvI~9Z~RtqQpjtBL3GVHkZgkM20AZdqx3pxVFZ6MIq99sBr7PhGMBu-YlTy3r-21Uoun92bkor7IzOEA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "439",
                        captions: []
                      },
                      {
                        videoid: 1319,
                        videokey: "US3DDXGX8KA5",
                        video_password: "",
                        video_users: "",
                        username: "",
                        userid: 81,
                        maturity_level: "all",
                        title: "Ep-03 Revised.mp4",
                        file_name: "1582500941689vupy42y0hlf5",
                        file_type: 2,
                        description: "Ep-03 Revised.mp4",
                        tags: "Ep-03,Revised.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: null,
                        datecreated: "1970-01-01",
                        country: null,
                        blocked_countries: "",
                        sprite_count: 0,
                        season_id: 62,
                        series_id: 46,
                        sequence: 3,
                        allow_embedding: "",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 8m 25s",
                        status: "Processing",
                        failed_reason: "none",
                        default_thumb: 1,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "127.0.0.1",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/23",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "2020-05-05 00:00:00",
                        end_published_date: null,
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/23/1582500941689vupy42y0hlf5/1582500941689vupy42y0hlf5.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/23/1582500941689vupy42y0hlf5/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/23/1582500941689vupy42y0hlf5/1582500941689vupy42y0hlf5.m3u8?Expires=1582531932&Signature=HQumHVNAhP6AcmOlD0jTW8i64mrJ0r98Asp9k5xOc-8hvWsg-RvhU1AZ4JEWlb0TONv606YSWoDgzFdPqBN2UtKaOPAhhr4tc4l6GDb6fstZot9LqEsUtNTgAcqq87oegTb1LX6mFHcavLzL1SdubiX5wnrWeM0Ozo8W63K-PGWKP2Q3pgfxDk-bvCAPoRd1TY4~a9OIYswW76MyMMRquJn8IR7MvrS6FRtcRahCtXldI8JZIaLz8FrDZ0~sI1pJNkPfZMsQU1hGsquWe7PU7ursT0DICunO1GCDAoFb70z1~765TNV4Y06nNqJIyOU~51Dp-pbZCh-iZcyASNVIkg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/23/1582500941689vupy42y0hlf5/1582500941689vupy42y0hlf5-original.0000001.jpeg?Expires=1582531932&Signature=EgZYEl4-mPyxdkn43~WEe5Gjx4Dce7njusY8AlyzWZdyrB8iNEiUEBn1E~Gb25zgpo85WN1Pmo-z-sYTyu9-goenM1xMWpyPLDXZr54p4Bm6SxHRSXQuJoys5JQA~gctYoVMdBeLH8frNouAYjX2LlS~4thEXb7L4PM3C07mtUlajuKqDV~fzyVv-NjiO1to-w-ueGNcN9JvS-XQ~2rWCh5TWkPOjJALjWBA2wxMOSK~e8QQd5kvXJmpGDGP25em7fTXjmhas3wgku~isXI5k04IojrAkg8AiVmc5wdwGv1uogDHwWaMDZkghgXRAeM87WJxxTlYZlAqk2UCUrkYtQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/23/1582500941689vupy42y0hlf5/1582500941689vupy42y0hlf5-168x105.0000001.jpeg?Expires=1582531932&Signature=G1nl8noiv2E823oyitX0BrlVK4H5xeEaMaWtt67yb6fr5Pzkkjajm3SZ6wa6Erxaem92lQZOhqwCydrMM-TmnVwvKeSGefEx0oaG9BtqfoyG8I6KAWl-7QMRcDW4tFUN2PKlzJJ~TreEXkOXELvDIA3GmBR6lTyaqq1bXv4Ary4VDoKZqyRNb5gB33GUr9hToUUoe6WGd~3LbKvbhRPqgIvR4t0H1qLuH7aT7~5n5GXqnxZmiDt2A6l1iGpCxOSc0qnSB-Mt-O4BoSrQDQew6q9xemFfoqBQ~BrPPF23ZvJLPEjDrQTJlPU0yfltUX9FEmxs6fLSTibIvmE4vxuT4w__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/23/1582500941689vupy42y0hlf5/1582500941689vupy42y0hlf5-416x260.0000001.jpeg?Expires=1582531932&Signature=XHzsCYaalrk8wJd~OE2ZJ-YvF-4zcT1h77DANdueIpBEEo9kq5wwBl0QH1XdUV2qYsj6MLGxhjUBfwo0FVb~j7Zx-onK37zQoGXDs6pkQLqFO~15u7irMGJOzwIhLcSK2VC0EJp0OzfKKxVKNDcQnWMGXkMFfdPJNUw7Z2AVIJdv8HHA03mr~qveRWG4UTh4TD9A3Fjznvh1GvatvnSVwsTteYaly4mPfskGkHGsXs1rKcHKEp0VUWnzElIEMe39SHHIaJcC9x--BEwBnHF4ZNPOoNJr5XpHK9zgicOayGbWsU0omXy4K~AVDYJlNzRmzffHCicMPi8zwZTmpmcWpA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/23/1582500941689vupy42y0hlf5/1582500941689vupy42y0hlf5-632x395.0000001.jpeg?Expires=1582531932&Signature=RysO4ezx4GinYqFjW0eWa5fkguHJFExi-Gwoti9-Je1HLWpBpJkEwr8oD9XWet2lB~l6BFLCuRFGtg4LFIeSwQQQDtJVIlBa5YeMuaQMeO9ahp5XgNOaDZSMHud99nFldkEIKHnGOwtv4mPIbZp30Nj3UqNxQda0fmn9C9gqTmEfh~IcTQBdB~hM76neMuguBjo10Tr8JpSAKAnC4UAm2OYdeHaA5LC2Fx~ljyd6z91ZS-Gbm17iSRpeMqmzvaMTi-o4zGVIqr1LGhLgtmYxo-odYV6yGggGVmJTYy1BJiNuTerEZwM5ARhXhsxMdSvZ5Cc1Cjx~avSwbYxMX5HSog__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/23/1582500941689vupy42y0hlf5/1582500941689vupy42y0hlf5-768x432.0000001.jpeg?Expires=1582531932&Signature=OqivKjtS5j~V2wb6PUFOUIIEyipPYX00ohy1eM8ZRyFkdneL2fl-xWvOaoC-O2WExMRaw0BRCTzPJIipsmEcijNiEz1xPETA86FiILCT~-hkK0yX2DzCiCEFm69nzDa1LcwrKS0SRWzYEPmPP83uRmAVhj4C4cDOs8MxWsXTwVI0WsrqgmB19GBEzfHj0RBLnbDSaN9lsEaGUAtOfIMcs1McDhbiGG7QFbwljK6CGm9Za~VS6x0xx-gnlny66Cf4qZef3mnM5TSr~wW0xN6VsuAC2Q3Qt-kLoJNfmK6Zs~cx14PMu6OZN42m0gjoUJ3~2lcJXGQOEQjSPgjvh9FfvQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/23/1582500941689vupy42y0hlf5/1582500941689vupy42y0hlf5-200x288.0000001.jpeg?Expires=1582531932&Signature=H7lWXU8JdBnr2va4T7I5YpffHlTY76CJDhB1z~TQh-RZFTuIp2hstqtI4MyDe0GyDv0tge~c4MndKOXXLW6Ot4O4CC0Ih~zQ-EMXnutXthU8mScqDQ967dTAfazlSkI7MAvCVAAcnv9SUhs7xzFdoJx8H4Dzx7Mnc99NGJfWTiPVB-IURKbP2NGIPUunSAzSDTyh-nfVFe4BQCn1FV-rMfHjOZmWpcyh8~e3PffR-rW92YaCxdiAcUvxKXYuwvnzVF9-HQJxJcBfnagqcweEhEx1Qv-uvK~bvdx0zdAZjnPGVFuWYXuNtJku9Y~bm4~Wtx~If5xLSF7RBb93xctk6g__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "505",
                        captions: []
                      }
                    ]
                  }
                ],
                cast: [],
                director: []
              },
              {
                series_id: 42,
                series_name: "Arpita",
                series_description:
                  "The horror web series, revolves around some kind of unseen dark forces. ",
                series_tags: "Horror",
                maturity_level: "all",
                category: "#5# ",
                userid: 39,
                views: 0,
                date_added: "2020-02-18 19:25:53",
                featured: "yes",
                broadcast: "public",
                allow_comments: "",
                allow_rating: "yes",
                total_comments: 0,
                last_commented: "0000-00-00 00:00:00",
                total_objects: 0,
                rating: 0,
                rated_by: 0,
                voters: "",
                active: "yes",
                public_upload: "",
                type: "",
                file_directory: "2020/02/18",
                file_server_path: "",
                file_thumbs_path: "",
                aws_service_id: null,
                aws_cdn: null,
                ext_thumb: "jpg",
                aws_migrate: "no",
                thumb:
                  "https://deikho.com/images/series_thumbs/2020/02/18/42.jpg",
                categories: [
                  {
                    category_id: 5,
                    parent_id: 1,
                    category_name: "Web Series",
                    category_order: 1,
                    category_desc: "&lt;p&gt;&lt;br&gt;&lt;/p&gt;",
                    date_added: "2019-10-24 05:10:14",
                    category_thumb: 0,
                    featured: "no",
                    isdefault: ""
                  }
                ],
                seasons: [
                  {
                    season_id: 58,
                    series_id: 42,
                    sequence: 1,
                    episodes_count: 0,
                    date_added: "2020-02-18 19:25:53",
                    episodes: [
                      {
                        videoid: 1223,
                        videokey: "8B1MD7GRAD4K",
                        video_password: "",
                        video_users: "",
                        username: "",
                        userid: 0,
                        maturity_level: "all",
                        title: "Trailer.mp4",
                        file_name: "1582054065444vw49m5luqlt6",
                        file_type: 2,
                        description:
                          "The horror web series, revolves around some kind of unseen dark forces.  ",
                        tags: "Trailer.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: null,
                        datecreated: "1970-01-01",
                        country: null,
                        blocked_countries: "",
                        sprite_count: 0,
                        season_id: 58,
                        series_id: 42,
                        sequence: 0,
                        allow_embedding: "",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 1m 20s",
                        status: "Successful",
                        failed_reason: "none",
                        default_thumb: 1,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "127.0.0.1",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "[1080,720,480,360,240]",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/18",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: null,
                        end_published_date: null,
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/18/1582054065444vw49m5luqlt6/1582054065444vw49m5luqlt6.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582054065444vw49m5luqlt6/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/18/1582054065444vw49m5luqlt6/1582054065444vw49m5luqlt6.m3u8?Expires=1582531932&Signature=Z-~a6hE-N71wpac9hH5sV39yTV7mewFdINSe2NbJwLvRRpTXItuFOPwrl7M-i5nD1JTXnQOJximlgwMK8qqFA~2TTux~28D~NP3eC98c3gFnREgiuyEfQTpXT6nu0oxuvgxGKfj0PfjMtdtg5Hl2zZh9nmQiTmDPhMXanbrcW5CG907QDAMmNLd~NstCUKB5ey5LsudaY6vN4JXAp9b7dlv0vg7VR4cQcO~Z6V~8U0-uTAM3~JbJrTnLMQTDDw6CVwfxJLJZhwHtxluRIkBqvrY7ry0ATuZc~HDlB3o4YX8-V72GOdAjeLAQXUBLpbPsQIwPG0PDZhCfteMlVkkCDQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582054065444vw49m5luqlt6/1582054065444vw49m5luqlt6-original.0000001.jpeg?Expires=1582531932&Signature=A8T51gyS3PypcHdMMCPDYBMX6HrMoqreITzFy3rvT33m8LlnSC8mKmdK53LJ~6u9Q-zztV66Qec~Vgyi-ywoTIAEHVmV0~CTs5NtIMsAXVqs9oCGl5sCJBa31bLWnLbnwqmg3Fj7cmy99QBYtYEbgDdFNYeruHOIFRacqdyGkqjxa4RSNv2YK~j3tCAxhkOpIq97lQWQLsP8PkGUdkqlBXVkqE2viCxd0RCI1hSuYp~fYi0kGskBw1F1OvLyPpsALn-4DXVuiC9dTK2gAYDEDOAm0MLX3cO3z7LtZz0jbnKM2dBpfEZAvtvwkl0vngf8UtkEgqiW02IaMVYhAditOA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582054065444vw49m5luqlt6/1582054065444vw49m5luqlt6-168x105.0000001.jpeg?Expires=1582531932&Signature=AA566HvACH2UyYV-LSyaPOIHrgv05UlzrfSBgjwJ9EeZ5K3V-RAyVUrt3UwUNcPYZbYEAxNtn~qfVaqjbZjGA-7~Ona9gwAWzr3h~H8xe5fG~l277AoWeC4ONUfgofYQr86V38MaI22pUvKZU0MzsxFHMqoQhrnTSAdRNAckrQVMKnpi24OAqBYFbbcSeEOS2TUkpWDnYZnuhmkQ3ydUvQDl60f38-p5lfCNPSpoBtrYs-J0sRm~FttTosS-J-GIQG8x48Jb2PdCCyMbXDTCG8ALzmpgEoEyxgbXyYN19kJdr8o8D~oFDsctR4kc-BL1O-2wlCO9lcQlFcT0LN21CQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582054065444vw49m5luqlt6/1582054065444vw49m5luqlt6-416x260.0000001.jpeg?Expires=1582531932&Signature=d36uVmuMrc8lRXRrZO9TC1WKRQGrE5EWXitYjRKnfsSg0eJS4KS3BfEKTIoEdmjVrlCONuTIzKnWIOaF5USXSomHRQ9Fdwt0vX5~eIeKkLm5~I2S9958rYiZxs8NQ-Xg9KTp5J1VkSKbbHWJvEqfxz4rrTFbhamqZ9Iuz35HlI34CdAiFyZP~aVT7YmnM9G28dsc53JJUrDNOHg7xOAnHeEioBCBrozce9hulwlH5uSX1qNRPoMrndH0EN~7-J7ySBWcDlAQaQKV8OqckJS0vziSqVlwaQ9sAtZskD9rvM4t4NeoVvoO1c8G5M7BYi52DWImWSwyQE~2LOywbRAdCQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582054065444vw49m5luqlt6/1582054065444vw49m5luqlt6-632x395.0000001.jpeg?Expires=1582531932&Signature=AehpI35y5FyotOtd4LczRQDugrAmr0dGWevzJgY2dtFzwGsNXpXEbSg5g1VJnygukKakv3p1aA5EIlDeGBNNVCc1k8jHC6U88-g5~ExPrVX0eqHxxlIq1kKu3LzIJIy6Ul6qqlSbn9rMcOvOWX0CMTE9ZlQiAi18AmCNNuAiqRB-HuIfEdLfnPv6rnkRHfxxEGR3hosXD~49LDXy0YfoSbL7o1-qTbLJ1z-2dFXCyalbVKrV-pwFMIr~76aSkwnlAyYs-SeNczEUcsLTcIYMAu7lbDIvMyd8IsmQj3ZBcL3f8b0qxwnd-n2xuKaxXM7FkEjc~80nj9Vpfs4ptGYPtw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582054065444vw49m5luqlt6/1582054065444vw49m5luqlt6-768x432.0000001.jpeg?Expires=1582531932&Signature=Nf7HM8vD2U3RDnerAVqktEQ56B2o8lWwATOD~JAl20o9pKaYBZsomoQYJpQq1cdtbQblcCljr1ZIiqriSXePD-JvQ9roxQyCLYe5WFk7ZI5bBxUrcTPIn0EWwe7~gVXuJkh5ShZwfKhbwRx-yvJDiUS2XN-y4asxW5cNrS6SJ5aCcs9h2B9nndf4mnHqFWipQ2o0LbJ1PTn35XNO-CaFy1izLWMxUMgU3Awjt7JZLju8ZSkWwl5Y-JmBpDVP-qaeiE9koSnIS6uqcnGKzmrJY9B~bKDpFIZOdRRQFlt7wPwFOea3e-~~QCErWm0JtLHhtgY4ecgWA5Gvcyv1pe8hzA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582054065444vw49m5luqlt6/1582054065444vw49m5luqlt6-200x288.0000001.jpeg?Expires=1582531932&Signature=YcqUlfGfNl9-t-EOk6ps324IBsX8R2y~HTtey5sfKTsSCCb1Vq315OKqQURg-XBHb-vbyTik9McLC0vApJ-FJNCHjUbUnoNHowIgWSGlMfVvv-yzrrpIkI7CaJsylsueJiBSLnsCfr4cX37y9EGq9WMUSoFKoDMyHBcbV-OiQPFiCNZYt5isr8hd4QjSQwT~ghuMy1~HrMOhW8kMuuC3PXstm-Vj3~M5ak1nxEc23Or4kZ2GGhKPU9xy11QEpm0CqmB63i0lvN2moUErFP0ObMj0bWZMEsrle4EZr0XqxzcMYOT3Jg6NxuE0ubNhdbL2BWJwbvrU8aeepDd2XF1DkA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "80",
                        captions: []
                      },
                      {
                        videoid: 1225,
                        videokey: "9GD3W2KB8137",
                        video_password: "",
                        video_users: "",
                        username: "",
                        userid: 0,
                        maturity_level: "all",
                        title: "Arpita Ep-01.mp4",
                        file_name: "1582054068486dg222ksmr3g3",
                        file_type: 2,
                        description:
                          "In first episode, there is one childless couple, some paranormal activities are going on in their home. The wife seems to be possessed by some spirit.  ",
                        tags: "Arpita,Ep-01.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: null,
                        datecreated: "1970-01-01",
                        country: null,
                        blocked_countries: "",
                        sprite_count: 0,
                        season_id: 58,
                        series_id: 42,
                        sequence: 0,
                        allow_embedding: "",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 10m 54s",
                        status: "Successful",
                        failed_reason: "none",
                        default_thumb: 1,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "127.0.0.1",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "[1080,720,480,360,240]",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/18",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: null,
                        end_published_date: null,
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/18/1582054068486dg222ksmr3g3/1582054068486dg222ksmr3g3.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582054068486dg222ksmr3g3/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/18/1582054068486dg222ksmr3g3/1582054068486dg222ksmr3g3.m3u8?Expires=1582531932&Signature=BHcyI2wv7Ty9KmAGJGmEEJlIb1S6Iu1RzQRb1qqv2SFFffdl7PjGvazp2a3v1jsoJfV7xuhb~fhs7GVe8yWVjF6Yp4QvI37G53nUKXWfApvkdBDQfcx1V~wLkzGppstS0lp3LCVsGet24L5uwBmt3Ym9fyh8zywVBe-vU8z8bChKnKcam99Yw-W3VF5LGFLuxrvPk3C4eROrV69PMgRQFVM3TJVnjzCiiCsaAJm3BLL-WLHr~qcnBemjzieDN~ZBuBHjifZAtNN8rb1Y4FjxUUpnKOnDIw1frKEN154XzuvROYqg0FRdoLekBH5pNs1Fqh3bBpcmpPoVaJyqV0kUaw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582054068486dg222ksmr3g3/1582054068486dg222ksmr3g3-original.0000001.jpeg?Expires=1582531932&Signature=XKP3lvRFYAaM~gUv6MWqcE2nRtpf~lCjaaqwRQuhZQdWntCHm170Lw-67u5UUqA97ttY7UTZtJ-g8aCqrLeIXdPf1QnDXRWxxWZbOZJnew1DKzlSzluj-kacV8cO~Ymb2WQMHhoHAUFcN0rADnBB6iifpZtgQTcPADMtAqnzps1Ngs~qqQtY6drtvPdKYZYJs3AhgGVgc7oAvkDyF~NwLTxdmCWaB2XuQvel89h4kVeZvbiPr6i87sdaexbAN-2vJPh8tvj1zoCS-uEYpSRxQm08bePga7vNaXED4nYCfwzMA8WSUFJmOG2hl96RO2rORamES16DmoT0aVBugsI7Rg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582054068486dg222ksmr3g3/1582054068486dg222ksmr3g3-168x105.0000001.jpeg?Expires=1582531932&Signature=eHBfyJOQ6QwFskI7jvA-vKn~6Ku7z71Ii01qmp4gnEtNtCT0rUuezsZdUQKTzrpF4q20DaAHo0Kow86z0GVjqXK5ZQcqet3FG2tfqI86y9IzACFXCUa1DjU8M1b6JqDj05ZwZlwaZysjaZom5K-YDuVR5eCNZ9GENgwgHBK9PpWIkBopVssBd-jyhQIoDcirOZlzNqNoClGC6mbhCAwvbLl7YKiA~hOQEJqEg7WR6XILIg6FuWd1qUeIWljgrhIExH0y2Is9yYLrkkKFqsxNAVWt3jlAYVO~k2x2SJxnZxfL759DsP0-hBmmr-W7QhSR9T5~qsrMwkd7O7txi9QjFg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582054068486dg222ksmr3g3/1582054068486dg222ksmr3g3-416x260.0000001.jpeg?Expires=1582531932&Signature=ZqJ6gjgWwclE9ZHwTA4B7QTxU56Vp0oaSpKBV2eR7zD8dx-KGUid-IQzbiMzuUxwReMe-MGlW03YAvytdzHWK27uT5eIcxUum4-jDQTEIEoixsmbGJGVC60sX5j5AH1BEmJXsfMFUWT1Z8prw4EYO9j0~vGvJCYcHSYyt53jQJGUrpYD6yyOVOXvnwAZG7jQfFGg3bcNxqb52tvJnesuHJV4JkD1Qzf3mQdq8Nc48PFvE1vYk4o7zWlD9QPTeMFjB8rwdEZSYgDCBT6x-499222aXw5oJa-L8kJTjiKTn-WNxaEBheecDKvUaDTlLjul5P1QSIpGUHnJGeVGpPvoRQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582054068486dg222ksmr3g3/1582054068486dg222ksmr3g3-632x395.0000001.jpeg?Expires=1582531932&Signature=JilRXg7VqsInWZopwLHa8ByMoLjShsTWQe3jGrEgcWZVtgZ8lBZ9NSLHnHXEzTkSktnvoSfmdWUTbTXxaCaRLysWlelgxfAr1StypiOF8b95x-OAB9YetwUdgrPX8iT1g-eeLakmMie8rC8s86dmGOvW4wZQsBF3obqirXj~VNXq-LbJl4HZ5h5ACraRW9nCfIROh0~KIkpxlALA8LHy0g2ig-NhZwnq7K5F2S5dNGVWKTR~Fb0Y8nvRfPzufz~0Vy~MOtdGtrUWZGiXEd60B7KZTabfTMYOgnOnIjxuaHWADslpGQkPPBz-nmkLhs0GP8K1fLNtEBAHMRYlfCZc2A__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582054068486dg222ksmr3g3/1582054068486dg222ksmr3g3-768x432.0000001.jpeg?Expires=1582531932&Signature=Nri-P86~sKfPHB2f5yyCc8gClJJW4~XtY~dc26YVbd28l5anPnIfpaZryNKAqQJprJu1Xf~XsKJTlmgslncWxApmtj6Lcnq22ZbNQOfP4NussAAXSIek4KZjpDO0nZyx5P6FRFjjllsCBtCDDOEHIkE-p89nc257M8Nq0XkHNMt3Be5UaufgoqOJMbnaC2MN09C8~hiZ~jBhgtNtop~dgH-M0LnE8dKpPnzxzZDRbUTcCCUWPERKiT1oQP~JHageEVXXJ4bwHGbuMmQfCnlOxXy0WJszDifci4zKsDI0LEPiap8WOE1hy~GKBK8QMAoI1DF7Wgkerrtc5uR3UejVdA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582054068486dg222ksmr3g3/1582054068486dg222ksmr3g3-200x288.0000001.jpeg?Expires=1582531932&Signature=doby2x7FcwomIa-KbgyN0TjREzAyEUjcphvl668z6iNIALOlR7cUDfbgvP3Iwm3DIvue2bcXuTBGsEAIzBTzNSfVJE74UBJXilWbVMx9x28WQEdW8QExXexGC7PFSQ2xViKHfeFVx5lp-Ei8LWPQ73B5aPLWpQ7UbzK4oRpq1JtuwNhPtWMi9Y6wsrMJZSULOBWEO3qFp4eVX66zq-o~R7UUhrW2yXvPa4ZNE22NIg2~GFdTe3GhPmSdq7FHa8qgEbhp0-hegj7Wl1h0hqBmq99zNIFIQgvCEN96SL4MPrxrZlyt9Nu5F4PGFLOFno7mWLpBfGK6ytFYmpcRBhQWyQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "654",
                        captions: []
                      }
                    ]
                  }
                ],
                cast: [],
                director: []
              },

              {
                series_id: 43,
                series_name: "Pillow Talk",
                series_description:
                  "This web series revolves around the relationship of husband and wife. The story narrates three different phases of married life involving three couples, a young couple, a middle age couple and an old couple. The separate life stories but almost the same concept in each episode.",
                series_tags: "Drama",
                maturity_level: "all",
                category: "#5# ",
                userid: 39,
                views: 0,
                date_added: "2020-02-18 19:33:36",
                featured: "yes",
                broadcast: "public",
                allow_comments: "",
                allow_rating: "yes",
                total_comments: 0,
                last_commented: "0000-00-00 00:00:00",
                total_objects: 0,
                rating: 0,
                rated_by: 0,
                voters: "",
                active: "yes",
                public_upload: "",
                type: "",
                file_directory: "2020/02/18",
                file_server_path: "",
                file_thumbs_path: "",
                aws_service_id: null,
                aws_cdn: null,
                ext_thumb: "jpg",
                aws_migrate: "no",
                thumb:
                  "https://deikho.com/images/series_thumbs/2020/02/18/43.jpg",
                categories: [
                  {
                    category_id: 5,
                    parent_id: 1,
                    category_name: "Web Series",
                    category_order: 1,
                    category_desc: "&lt;p&gt;&lt;br&gt;&lt;/p&gt;",
                    date_added: "2019-10-24 05:10:14",
                    category_thumb: 0,
                    featured: "no",
                    isdefault: ""
                  }
                ],
                seasons: [
                  {
                    season_id: 59,
                    series_id: 43,
                    sequence: 1,
                    episodes_count: 0,
                    date_added: "2020-02-18 19:33:36",
                    episodes: [
                      {
                        videoid: 1224,
                        videokey: "K2XNYR1RW3WK",
                        video_password: "",
                        video_users: "",
                        username: "",
                        userid: 0,
                        maturity_level: "all",
                        title: "Trailer.mp4",
                        file_name: "1582054517875q465913g451",
                        file_type: 2,
                        description:
                          "This web series revolves around the relationship of husband and wife. ",
                        tags: "Trailer.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: null,
                        datecreated: "1970-01-01",
                        country: null,
                        blocked_countries: "",
                        sprite_count: 0,
                        season_id: 59,
                        series_id: 43,
                        sequence: 0,
                        allow_embedding: "",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 1m 49s",
                        status: "Successful",
                        failed_reason: "none",
                        default_thumb: 1,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "127.0.0.1",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "[1080,720,480,360,240]",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/18",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "2020-01-01 00:00:00",
                        end_published_date: null,
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/18/1582054517875q465913g451/1582054517875q465913g451.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582054517875q465913g451/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/18/1582054517875q465913g451/1582054517875q465913g451.m3u8?Expires=1582531932&Signature=I~tHvN3Wo3L4O~JrqSEhR4zvvuYUTUGkuT44UL5UBRjkE3XJqKS~3fla1C4zc~Mx9eKClp8r7IlYfNeQEF0FMIi5j4Zq9oTnpM6ygNhYVSFk-EjN7Jw5X8Z2edGcvLvbZNreFH7e8VWlopdTx8XOxnB5z6sNmJJt6oU-OoKZFWWZ5r79VyKH~mLcPW8wHBH0iUE2yEMUXEgqrAHPW~6U1Ltaf8Se0yEEWI3gV1KlgCh0ZjbusVhSxcXMcy611qAA71j82xrH4paZgJSRHhYYkZGTJq~y9qWpPqh0CBc57Hm6D4BUxjZp~8sis0PAlq2w3hDNksKEl0879dlaikPH3w__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582054517875q465913g451/1582054517875q465913g451-original.0000001.jpeg?Expires=1582531932&Signature=EzGmVBio18iZ33o-5yco5pwpOHupW3SmmWA2tC~QUmZh21wBoazxqONrSx6pOvxCixGf0AHSbHqi~uT5TcFdL2GJPrM-uQB5-ZT0U7Vv1203f7AZ7czq8kIHpcZpyQKEqgxLSmrPL1SaJQOnjMU2FJcjVOutQhEgEHX48b9R0Gfrd4OhT-xCS18icZHHnAL6ujNiynmy-Olptd4NlmNSIk~tZcpbpbGpL7l-V73AZ01nbI7xc7soxB2auULKTEDASFMHj4Xgo9aRcVxXj-roX9ytHlYoLGIUU5dxqKVOovwRFvR1klPupQxE10T-AEa2hRGgMbIF5iIDzRtPwPSpeg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582054517875q465913g451/1582054517875q465913g451-168x105.0000001.jpeg?Expires=1582531932&Signature=AxKeDedPkSmflIGPm1n0TSrMN4yHCBXwsXtaIQqPDXCUw4r0yvrVUZyFClzQElHdJuok3N5FaOGhyMeDIWiNeLFagi4XCWnODl-gu1RVKgxKQV0Mro2SjYIwbNUYHv6aMwkYZIlsjb-uZ9JTl2psjsJg~dNTkA~cw3N8AfNyGHFWboMQN339zdXM-Qd~z~vMFlPJcqKzQH1G0xPDkers-Xur2fXKe-2bfW6p4um1obXQOTv3aJJbm2AC~c~E1Fl~j7x6GDKACEpUKbWBCnFo4grv7JJLYEX0-zRczDoOACq1~SopDiX-xfP0fQqu62kzVux99n3CZVLtC8vaPbh0xg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582054517875q465913g451/1582054517875q465913g451-416x260.0000001.jpeg?Expires=1582531932&Signature=CK4smHdPkQvgHyqYnef4GmnaAwtuU8HApL5MCNi~5G7maAdWXbFCKxQcYDyFmL~ihwcsQW~JQgUFwskYY78xTq9JcBabl2qksHeoNIvBJ9SWGC3EYQ250ATFgmawwcMIL-mzvnfBicgaylBsvrabInomeRsKhXMn3AJ8-ClcjngWZgoafArOh2fUzym3AZndCFy~XlZXc5A2a98HyKJbhrT4KSBfVa1MCx511wH~YQy8brETam4SwQzCUIihkaaeOujPccn~uMbHYsand4n9bLY2s9UV1h-yldJE3RYxdkN6sfqAPx2MwlvmUonqGhWqwpAb5tk2BgCmyNj1b78w6w__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582054517875q465913g451/1582054517875q465913g451-632x395.0000001.jpeg?Expires=1582531932&Signature=UwXefZG5HrudsGczow6LX2iuOwGqOqAHBk-7hGdkTLNgeWuFINAINUQr2wtEJ309oEfg4NTh8MGZtlMPr2GpkyAH9xHespcQGUDgpJldOr5Vlp3ccv0~q52dzVcDKYxBYfJ~50SnQGIU8-XeILKvuVjOeOitaR269JlT~NxFkF1v47YSwz-EIoDf3ybOciOPt1tAbU0syVTq-dLQtQgSfy~RPYuq1WXKSiRHuzpj3EMJfo1lFSJAcUCG6cmPRXnrzlYKhT3LgFGNMMKurQkDx9et1h~3XSR1e7ytjUeCb~PpUoTxu1InWAQ5QCVuQ0AyUIERl7502I9oPLeMKJ14yA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582054517875q465913g451/1582054517875q465913g451-768x432.0000001.jpeg?Expires=1582531932&Signature=QWTnLp1lMjG3eEpJiKwbBGHAqgRDq3WFSNK~iWQl14v2GIMyKsAuRfzXJntPsbIMHGf1qMk0DzyxJPwW2EZ4k3OSl4k9qd9mZnxtWXFXnrTEw3wE6PRkgulHDSiONDXgf5s8ZJF5HGXwMI~9C3gn5bpCBobenjpAf6PYk~tYsxk7QxA1U03FjTLWPm3CkIBBKxcTcBCrUGGySR5PpCoHFhtJWMf6Z36UhQV0K1Vn~VEN5XyvPoCtsciuic3cY7D3SRZKZVtTGYzyZpjFWT-2Y88mzN3kXHihgplPFPck9xlw0UncTUi-L1eO6MQekXVxfmiqScCyKmCiXvfnA7ZzXQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582054517875q465913g451/1582054517875q465913g451-200x288.0000001.jpeg?Expires=1582531932&Signature=NT0~cJZPJmQTnRJEw6uAnCogQ-lbHrBrA4P35L~bDNJ1aVSPFHov5zsuu5rFinKVk4AH4rsa2DwyGLeMvumFuEAS2wVvOGWCFO~2c8Zkkclfc4LV21~yuOsZP9daWFvjzzFYCwKqPg0LijcYwbe9qivrStUbSx9-XP3LqzkBg6dCGm7MvIGndupLPtKdcdZ04ctAOHeZFO-ddX8QEe1iFltP4Aoq63j8QC~GylqZGC9RK23MAnMAKso3MxRvDY0tI3N3xaY6m0GkEHPgps9Nd4ZVCxDWZST9iQZPSSdrCLxlIvRUHoinx3a8kncxtI3r4bBeaIEUmAvB9cf-RlvxhQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "109",
                        captions: []
                      },
                      {
                        videoid: 1228,
                        videokey: "ON2R25M54YYY",
                        video_password: "",
                        video_users: " ",
                        username: "",
                        userid: 0,
                        maturity_level: "all",
                        title: "Marriage",
                        file_name: "1582058801899c4c43w1qxfk10",
                        file_type: 2,
                        description:
                          "Enthusiasm of newlywed couple who promise to stay the same and passionate till they grow old.",
                        tags: "marriage,ep-01.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: "",
                        datecreated: "1970-01-01",
                        country: "0",
                        blocked_countries: "",
                        sprite_count: 0,
                        season_id: 59,
                        series_id: 43,
                        sequence: 0,
                        allow_embedding: "yes",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 14m 21s",
                        status: "Successful",
                        failed_reason: "none",
                        default_thumb: 2,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "127.0.0.1",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "[1080,720,480,360,240]",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/18",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "2020-01-01 00:00:00",
                        end_published_date: "0000-00-00 00:00:00",
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/18/1582058801899c4c43w1qxfk10/1582058801899c4c43w1qxfk10.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582058801899c4c43w1qxfk10/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/18/1582058801899c4c43w1qxfk10/1582058801899c4c43w1qxfk10.m3u8?Expires=1582531932&Signature=gQsmmTWrsZ-zSJUFlB5K6Qy1yw17NMoyPNJw1o3BiFC3u2UlnmDKLhsSEnNhQtlf9NE~gCjaenOCTGW1xV7zGRBqohhPVzSeYrhWIhJSEx3tkJYIF99mMwXYnByOla0047RlBXpdlM-X1WcuGsRkKcZlsU8weBC04LQ-Tzt5DqVexKO7de~Xnb5u5aeGu7B8fRdJJ2uaanexcyF9A4zSmkg8jsv2Uc7GpENXanaf1sb7yRpGrUN2oqKqzFFrP16HDZmLKpWmWZlehvoXaAWIOPsDQCb9JaROIrhlypA5g8fmY-Qdab2pvW3GsBiFGC3VIw97E4YUWoGL-ty-Gyy9DQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582058801899c4c43w1qxfk10/1582058801899c4c43w1qxfk10-original.0000002.jpeg?Expires=1582531932&Signature=ElBxGHEn-tLI0k9Dx9AqL2uIX-NhI~VFcYxAA8TQXL3UfLW-0eKw0rvoOSpmwXTqz9cNmsiqj3mHBoi0klyu-V97f7zDiKzafu2RS77zhoaAuCJUA9Z2fiEKs~-NVSnfpDM27-LDfWI8e8gqViY3mbC2y6hFyEkxl6rd~nuOOu1LhVvodRcZS9yhZF5e5ILnE~wbLV3E5Bmu7uWWyJwMilfNyHgsuGkde1JQR5yYZCza-bQU2ZbcPj5Ufa2qo7O7ocQsAoMYZ2bAlMIPCK3bjAHn0bQJetnBcXyWxqaH25AftBj5UL1JDPbbGrljHZLl1e0RLTv523Hkow~hiwMD~Q__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582058801899c4c43w1qxfk10/1582058801899c4c43w1qxfk10-168x105.0000002.jpeg?Expires=1582531932&Signature=Dd7HSP0L5CKhm1KxRMoht5hAojpAv5C6LEJo8Ld3~n8~LpslBTUnh8EnvKrtEDcluAHDrJztL-6bTjFldlDXjgG77yCCDEzandaHfRBBr4UZ02YeLMtbPBe0WrLxoYLc1fN9llF0veC-I5GheuoYb0trFrI6fqg5f3y2ti4Rnr4Gf00Woz4dM6nwzlKro8zl4yahkLBXZdabFEbO5FTFdkdIIjb3Fn7ojWVSpvYc5SEwHQtCu1XmrR3aDaP-aew6iotzvAPpk-pXO-xMEdhdgfbYCCAcALR6vrtpGVsP3qoaSnOtGvNIVqzom5qNOUfCaSrCKyMjnwwPLzK49ibj6A__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582058801899c4c43w1qxfk10/1582058801899c4c43w1qxfk10-416x260.0000002.jpeg?Expires=1582531932&Signature=SOEYF~zTl~SB-gX2m9IsV73yYebP8XphE4NM3kivR6lQzNx67V8Krg-XarT14rX7H9xGVICOsdXmdJkkTMkOyRHIKh63wiY7zJhDfjgzau3PWKDeWyojig1ydd6RSG60u78jkfnvD2xyJWhqi0jUm~KVYdv0zAYg-DBLsi8zW~wRgjOl0mSQkzqWr07hbCm13EvUerWUjXw-nRJgdMPi0PdZ3GnvsWRBwDpf9dItoSI088T~b5PaXWSmoZSk2U8K4DQyMQHhLg9q5Ybt0g9zbbEDtL~K35UkgE-N9Y3buWRtZ4c7SYTexo0hmbLotQzg8eKdqHU1pqbz-DyH3yQDQw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582058801899c4c43w1qxfk10/1582058801899c4c43w1qxfk10-632x395.0000002.jpeg?Expires=1582531932&Signature=VmfAMRQXjh4fhzPPVL6tmTyTpmlseQO9HLRJewTHONIzyo56PvsnSDOs62QM4b6Y98-SgSGnk7nuvJu4bVccrNqi2Amk-aBhj-aqcShb6hWY38RfIE8szsg0ykN0xQoAElcNqI-stGyqHE3wCPk34ZDPtc~61q9Yni5UDY2gfcTvFEdVooS-TgjI49GCIpoNxG9tqOXIIiezpgvpuUqtc5nAv~INV69Ne0mmXYPyrAlr3ToX7jnsB3VgGRJms7FinGhCtUmLgdMsvUmAjZJIunFXcIbZcUQuhnn1hbybrhhUp4d~~OcbYcCrsziNkpab4r1YDsEnj46KdWboBWDiJQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582058801899c4c43w1qxfk10/1582058801899c4c43w1qxfk10-768x432.0000002.jpeg?Expires=1582531932&Signature=BdSiSM1ERJT2sC0lB3NcFvkxiKf6kALGKDyhdnTyi5KrxaJApJG~pXk1oe~fHgkYo1WB5oD746TA43FNqie1~ZDYuIf8npi9~TyjHNFr23-md05KEhn1Mw2EO4shyuV2~75SdhyaJuTN-zgoherk3cgKWYBSyt4sr8WruNaMp1Q5qCQ8u-nnwbQRcJifCpMYCNM2YavkBbfHixayb59J6uAfUl13rPD8lPRtFW~-kCSbWgMz8nfxf36mLvA~Fl8wJTO8LcE~Qk8d5E84H~JY-Id-mwq8Dl3oXgEiUOUQ754tPtR6vktHhermjUgtksGeiETXQJvEUaBfrmo7InURwQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/18/1582058801899c4c43w1qxfk10/1582058801899c4c43w1qxfk10-200x288.0000002.jpeg?Expires=1582531932&Signature=UryRHHmdFE4aHo8j7RV~EIF8ElMJt1lKvpLHi7NdNo5RU8FOa7hIW4wrj3eyuzUMzO2erGww5KCalk11T3kOHW-vlsHLeUa0i76bF5Ufn-hRj9O2InoQoHsyI4DNhx8VvePkKP2pfFi3jOscNUooVfoWgtHbBYQD6p0Ow6nX08k~OkmGc-NFjuk6WzJ96IL1qbvmd1e30-b0EhK6Xcz~TcEZc6CldTiTtnEO-YaVsUPa-XGI5dIknvIgTPm1Zu28ohUHOIbJMxeiZ6jCPA8JwV~SYS9gk6~u9ofInHQoj2P3-IyiZcRgBJx~Hhukn4GkRAFAkRGa5BuZyANwVkNs5w__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "861",
                        captions: []
                      },
                      {
                        videoid: 1241,
                        videokey: "SNWUMNW44DG1",
                        video_password: "",
                        video_users: "",
                        username: "",
                        userid: 0,
                        maturity_level: "all",
                        title: "Cheating",
                        file_name: "1582071048566jkfmz4hz2jr7",
                        file_type: 2,
                        description:
                          "The newly wed husband is insecure about the male colleague of his wife who dropped her home late night but she assures him of her love and sincerity. ",
                        tags: "Cheating,Ep-02,.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: null,
                        datecreated: "1970-01-01",
                        country: null,
                        blocked_countries: "",
                        sprite_count: 0,
                        season_id: 59,
                        series_id: 43,
                        sequence: 0,
                        allow_embedding: "",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 12m 26s",
                        status: "Successful",
                        failed_reason: "none",
                        default_thumb: 1,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "127.0.0.1",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "[1080,720,480,360,240]",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/19",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "2020-05-05 00:00:00",
                        end_published_date: null,
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/1582071048566jkfmz4hz2jr7/1582071048566jkfmz4hz2jr7.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582071048566jkfmz4hz2jr7/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/1582071048566jkfmz4hz2jr7/1582071048566jkfmz4hz2jr7.m3u8?Expires=1582531932&Signature=fbkmY91ri3zbAq7QKFUakdkX1KbGlTxowc0VjASFPi4dfwpXVJ4HufoMRi~qG3RQ3cQVszGbM5tY8594OdnldvaXnf1D-MOhC4Rbb2e0HwidqRDFYFZMhE3SiGpl2FK00VhO7m5MgoK2z0omNF8eNQcu8r8fUa9YSJALh0ZBA5xWE2lcs4odcClndHBuqhrfpd5J4KSDDU4jftfGZ29K~h31JDKpXxgzG5cNh39xiDVWud2i7fMMg-gtigQIMlS~x7jX3YbE1~rwwqrOe8PJvgl08y-I929EBnJsV8bkQfQM1KnKr-muyurQ7NuP6re6~JDBRmni3opaGcyd2CRI9Q__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582071048566jkfmz4hz2jr7/1582071048566jkfmz4hz2jr7-original.0000001.jpeg?Expires=1582531932&Signature=FC0cdG-E45G-UmadxjnhmKBc1w8xZPU3yncWUqd7gserMXANdbW596q9xg9emEOGoSf1U5sXDQF4fpLF8Jt4umBDS~LMPQ~8pACtLoDG0sqpf5-JI8V-RfsT5UkQd3boUjsSKxFsQKgQ4xe0fRy0nnDcl8Qt5Su7nPjR0Z-6sKiRTDnfEoHFHnNBgSXJEWii9ry1clNY6Ql7s311c4kI3qf5p3BX2EAW4-Uupyr3SY9KHnoui7eOSOwdVtYXzYG6ffd4eU8OgJumnZDcvDtXgKEp4-tBbZzWl5DOD7lsut9gKgSPhV4BNtChHomugxRaZY7XigFovNsjhmA7UOwo9A__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582071048566jkfmz4hz2jr7/1582071048566jkfmz4hz2jr7-168x105.0000001.jpeg?Expires=1582531932&Signature=CtG1gHVlludKW9WuGzhwoYcy7402CFYJgzyver8Hpesj0ml98GuEuE~Unw5tjUp6rB88hmVplk3yPh5-rvRwqxyn86UvL884lz-IdiOFsaiKXOjtSugy9YfsBghTMSJDuRxDRTk8~CCmWRI238OKQr05iX4Z6ocVp2EW9EExS9ymHbGAdteLkzJSOm2ZyHxRrLX4jJhP~toyNjnWC2aQEc2mlhBbk7AfWFbC6hRX7BjrpNuDFpqM9yQLcP12kPpVXHwlQRln1xQDJjOy7T2oaHs-2fZYmi-LHzBbjYxGKTrkQymGcOUZEkv4l~ZT1JlDUYhQvuAsmkAC39v8OG-0kg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582071048566jkfmz4hz2jr7/1582071048566jkfmz4hz2jr7-416x260.0000001.jpeg?Expires=1582531932&Signature=Nl8p5MsLEIpmK0cjLi5VyQVaCzf3-i2ipqes3xMRxaYTY53lihHqR~aMajElPxxIS48gwtxHHMfioEd4f9BzCMpLSg~8pHXkrhRjOEpk4u2s8Bx97lcrd9B~u1s01PHA3oWEX4Ef8YUWYt59z3ENhUqiav9mjEPM20uq6rmTk3wkSIiWbe30txn3DKSc00r7gumjpFnzV2bbS8iSmjDYpJdZycXNbvydMB60QlW85k-OohdjxDZ9xpmYV8bV6lC3mZYGFbhFG4m8Zn~tYtFmDuWlFzj2IKuNBGT298bRDAxKt2AqxEjSY8XSGNOW7ZLNxFb5ilALHPFW9GDuEoegtA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582071048566jkfmz4hz2jr7/1582071048566jkfmz4hz2jr7-632x395.0000001.jpeg?Expires=1582531932&Signature=ScqPYgEOz0xX0knJ43P6csXPsd3nfD6~kyruN5UvmUfaMTVKZezdb3SK4Mqpm3wJjUGD6lgQhVpLtuozUCc096iC2K0-Gn1k0~aNy14ZFn3K8CiOKE0UW1EAp1Kib-DUbXNQFS7q3NjwG6Pfsqe9EFCP7Yn7-3jTk96mW4jx2qF7E4NndLXn-ch5W8Gk0NM5Cxfmn1KZseNkttJDmalZIGFUCH9W8fj6fFJJj42QHWUPr7BMeSgnYkvqCyuDkxsgLOCloA7FIgK3VQBJSMorh8~Nv-UZvgqsqwInG192UxIj1J2LYeknRg~mmA642N6u59CVqJDQWyqmLKaD394zEQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582071048566jkfmz4hz2jr7/1582071048566jkfmz4hz2jr7-768x432.0000001.jpeg?Expires=1582531932&Signature=Z3IU4t5NNmXhDflffu2ryNoSZ05O7ihNjSV3agtuNsnhtdFs6TKgDlpj0n~eR3NcoVEe2pM85sfHIhijS3igZdXqtHEd2b1i7dgRhDo1dpj1K8EWDwrm-lEB1aSfgg6fmpqMWGBSRZA-Kd7Xmv-uWRssRnqZjAGsDx3pT1AWPghpVGHvAwSh~FNaz0pESKXrgycxTF6ToBnUCzhFhg50UbAPCj70QOSkKAqJyMteIN7n~d0Bj5nNrrGLDOCNCkUJBlkdAPJgKC-SvfL94at4bO81FDS9vFjbBp7W1VaicyGDu0LDDeQ5~w8Lqd9b~XKqvh3gPqkzBPm2fA5YtU3nSA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582071048566jkfmz4hz2jr7/1582071048566jkfmz4hz2jr7-200x288.0000001.jpeg?Expires=1582531932&Signature=fZ6ZPxy~6i9tO7OwotPgXUoVaCcxot6bTSZG5SPKJslNmWrHrosEOnoYS~GJ~nKOKxsyXibFuVSecFknHIRUarQJFGzWhr-w5n6WXWu5f4N6HtOSZnYChtElvXAknCPiuN346E4QdiyVAJeZDywJ5E4SJJdQVEcAbV84h74yblhAOMbDUvQM3Ud-xZ5~~cKJ7mvKQ74WGi1wVAN34XdFBR-NHJ7yhpSDrDJxh7Vs7~DC3P2v6PqVpuP~GZh0pIRgSLWqfpP5ihcpF8XDwThFJHERVedfKi8iO5Cs8UxpJuoVtaA-6FOmUS4WQPMspiGrYpLb~HJkGy32R2NqiJUfQg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "746",
                        captions: []
                      }
                    ]
                  }
                ],
                cast: [],
                director: []
              },

              {
                series_id: 34,
                series_name: "Corporate Snakes",
                series_description:
                  "The corporate office where new entry is a girl whom Tony tries to impress by his fake gestures.Boss announces to disclose the team leader of the new upcoming project.",
                series_tags: "comedy",
                maturity_level: "all",
                category: "#5# #4#",
                userid: 1,
                views: 0,
                date_added: "2019-12-23 12:22:42",
                featured: "yes",
                broadcast: "public",
                allow_comments: "",
                allow_rating: "yes",
                total_comments: 0,
                last_commented: "0000-00-00 00:00:00",
                total_objects: 0,
                rating: 0,
                rated_by: 0,
                voters: "",
                active: "yes",
                public_upload: "",
                type: "",
                file_directory: "2019/12/23",
                file_server_path: "",
                file_thumbs_path: "http://37.221.164.177/images/series_thumbs",
                aws_service_id: 2,
                aws_cdn: "https://d2o1c9j7e49z0u.cloudfront.net",
                ext_thumb: "jpg",
                aws_migrate: "yes",
                thumb:
                  "http://37.221.164.177/images/series_thumbs/2019/12/23/34.jpg",
                categories: [
                  {
                    category_id: 5,
                    parent_id: 1,
                    category_name: "Web Series",
                    category_order: 1,
                    category_desc: "&lt;p&gt;&lt;br&gt;&lt;/p&gt;",
                    date_added: "2019-10-24 05:10:14",
                    category_thumb: 0,
                    featured: "no",
                    isdefault: ""
                  },
                  {
                    category_id: 4,
                    parent_id: 1,
                    category_name: "Comedy",
                    category_order: 2,
                    category_desc: "&lt;p&gt;&lt;br&gt;&lt;/p&gt;",
                    date_added: "2019-07-23 11:19:26",
                    category_thumb: 0,
                    featured: "no",
                    isdefault: ""
                  }
                ],
                seasons: [
                  {
                    season_id: 50,
                    series_id: 34,
                    sequence: 1,
                    episodes_count: 0,
                    date_added: "2019-12-23 12:22:42",
                    episodes: [
                      {
                        videoid: 1207,
                        videokey: "WDKSBYOAO2ON",
                        video_password: "",
                        video_users: " ",
                        username: "",
                        userid: 1,
                        maturity_level: "all",
                        title: "Trailer.mp4",
                        file_name: "15819309591026vj10wommoy10",
                        file_type: 2,
                        description:
                          "The series depicts the environment of a corporate office where different staff members have different personalities. ",
                        tags: "trailer.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: "",
                        datecreated: "1970-01-01",
                        country: "0",
                        blocked_countries: "#0# ",
                        sprite_count: 0,
                        season_id: 50,
                        series_id: 34,
                        sequence: 0,
                        allow_embedding: "yes",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 1m 52s",
                        status: "Successful",
                        failed_reason: "none",
                        default_thumb: 1,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "172.31.20.145",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "[1080,720,480,360,240]",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/17",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "2020-01-01 00:00:00",
                        end_published_date: "0000-00-00 00:00:00",
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/17/15819309591026vj10wommoy10/15819309591026vj10wommoy10.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/15819309591026vj10wommoy10/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/17/15819309591026vj10wommoy10/15819309591026vj10wommoy10.m3u8?Expires=1582531932&Signature=WFxCo-VIkNzGaQEqArEjID8r106KCDoEYZXjb0W4o7ZqI1UOL3SNPlhAjhTPL88GVn4Z0CK5N1rb3zo7Axq6~~w8Zx0EHemxW8W0rrlQ8cIf0Oq8W0d0C1v-NbFyg0HbOU0MH1xwxPurnbqf0fECmEshfbvGt5y3f6M6jj0PT-FJRk4BAqQ-L7r6LE5dEAnBaFmJY~DiqJisWA9nCA6BAUAtrBxWhMe9NU~od3yx6mfDpDX2E6gPz9jDlcos0gL9JDi1DQPsC8Tp3CJdCBStR8tDfReKXpQ3oXsdVv4MkITBVbEPYFKJ4HRlfQJekaiuQPXHYMSh9HhB3MrQOOM7bA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/15819309591026vj10wommoy10/15819309591026vj10wommoy10-original.0000001.jpeg?Expires=1582531932&Signature=cXG18RjhZDuLzhjNpoLqNJHCveELZLa0mdPxm1KLEk52VNG5MxQyXtoSH0LgaRDDTCpA9IDyfIJiv~Y17tqAJnRoqcijaGs3RqCOkzeqiA5hVY7f~HBjSgHOUW3kkCfyz-nn2DRcxtJQIESCuhZt2CuxMoZPxnHKiL-nlDiEuQ93CdCbC4bOp~rIP6JKx~9fwabcor3KA-7GFR-0AJQ4Qu5ckzHWbRMvo1j53A0zuXgAiy8wITQ3fRLCoH1SRB3LquTq47jDXVtRNLRlVual1MhfeG-VT4NWUOPN8oovXeZwgHgUY2nh9gp4svssjyXAVEHycbp-adqWTsvtVWG6TQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/15819309591026vj10wommoy10/15819309591026vj10wommoy10-168x105.0000001.jpeg?Expires=1582531932&Signature=dF25WVoyViqPXeK5oMFOdAPdS6WBpNBdHS4JJM35GSV-p9DuJsq9s8egUxt80ns5-OQ1CLZVX-VIgmDzuhoG0bviSDfP6Uz5EI46fwQNmLrLBgrf-Pq58OtRderzZ~3BY3J4UZ3H0XGoQBxHJ3-egHILGNrzKTaur6l2uJuIYpoXl3MxIdM0b8N5hxVPzAlmZmDE1kVOYp8pg6Hi-DYaeh7J9yBhT~eggqhdQsD4Ddz18LhSOlSGVpy8y5P5~Tert6Dz-2rkzU3yr9~MVUYxBIekY63opv6p9t-n9samKDBuDdPpmzBmMEEj~DaNgIzd~FqJAswVt0pmm2CcGHn5Pw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/15819309591026vj10wommoy10/15819309591026vj10wommoy10-416x260.0000001.jpeg?Expires=1582531932&Signature=AnrUa8UxZTEolAw8eIIxedrYXRiTjat7BBi0iNZMS~igNBoZBN0PlzXia7UiPz97uEbixpzHUfXR5DEVLRrjRZtVlKfTMNG~GTp0XR9m6E8x-XGkBDE0k63QxvgzZwX8bBTP-tnifucc2vL-AgNn0~jsWsPhDAtK0uLuKeQSikbwPAfNjYxBEi4Gd2bE9yGI7NcYahGSYjpJYlFJUNz6EMhnFwvNK4CJ9oWbGYnaHx6J0HkmAAeH~lVLRGsepnkLncU6Aze1NSe3NhwGK47UBCfPStXSAecV9~-HPqSYbNBuBM6AZJZ1LDxWK~oS6NRg5SqRTj~8HYbq6KhXxD6M6w__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/15819309591026vj10wommoy10/15819309591026vj10wommoy10-632x395.0000001.jpeg?Expires=1582531932&Signature=Kwv5AYERASkb2FTDfescUVyE-LGQwN65G-WOyeri9yJDlZLVNEHdBC1exxeIGE4UKiLz1PhKVO-y3seoCdN9T55s84ga-aH0tCU2RXA6DFANaz82ZDbY-QURVkTvEpSyO3SZRU9D6DhHdKSNEzKVjSuoBlNkBq-7L3ADcAZ7QwBXELgkSbX8pxZA~fDpqgEKt9dWaGRWaOfKVFQeoy2Ka7DT2CHZYha9IUILlte5xXtJB9cfxG4423NfaOxqhcIZQixlP7vfrcRUzR7zWY9-58jBGtT~PZvTWxZprlxPgESFTJaI9JLO9Hl~VOf50zSCHNpcP4IOBD-QPkRQBj19kA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/15819309591026vj10wommoy10/15819309591026vj10wommoy10-768x432.0000001.jpeg?Expires=1582531932&Signature=Y4jbE2UZDt5x0Xj5tbzlgXiSAwg2FgJ~sIb7qA9Z7NeaXrNaaG2aRZ4ulCr6wRQgrM8hsAUib3i-EjncFxbDyqb93J8bZCv4JQu1s1R1N5usutM6gMb6MeMm0NbaYOfZ3nIi9URMFeD-no4tbeT10MdAGzK2HtcAczKIoFFVXiO0qN~fyYMBtycLih62N4epcCu5Il1ojgYBpu9HSJQBifoKwPd344w-HnM1aLAcL-BwxLlZ1HeZDE7BQ6qQNzba2Sr4v3qr67IhGVC~8uEvyPEumm~lMnsFEHYBVcrYcMzimml-CZHDoMF-pxJb5qyj9ccxgsLTqLKHgEVRnVrlQg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/15819309591026vj10wommoy10/15819309591026vj10wommoy10-200x288.0000001.jpeg?Expires=1582531932&Signature=RK7MHoB~yhaKzBpQahP~5siI89m~TPcx3SvQSm2zRAKPhMprw~EJJnYxP5k45V53NyvFDX6NO~UtTGAqcM0hu9JpBHtccRsQUm-dWnkdkqoJjo7VF-K065Uhi~PuG5EJLFX1CJJKJHNerFgzRhN3WfiMQhgJfJ6pBbxTA2Qdjed~yFJjMwgLaxgyLS9TGaQFDT3SHfmMRkGcuMpnxoU6-0CAMtGr1Uq2uKvdZKWvlrkyOBZCaaSCD1IQLg~DQTDc7ojUWalijM4yK6uE4qI5J2QaEeKZWyfucJRX0jiRZAJ2yora1jANzr03DXXNeYhmL-x9qFpb9sDSyvzLqlHmGQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "112",
                        captions: []
                      },
                      {
                        videoid: 1208,
                        videokey: "DMMHBX6A962Y",
                        video_password: "",
                        video_users: " ",
                        username: "",
                        userid: 1,
                        maturity_level: "all",
                        title: "Corporate Snakes",
                        file_name: "15819315146113ptkrg3t90c1",
                        file_type: 2,
                        description:
                          " Boss announces that someone is going to be the team leader of the upcoming project and everyone is expecting for himself to be the one. ",
                        tags: "corporate,snakes,ep-01.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: "",
                        datecreated: "1970-01-01",
                        country: "0",
                        blocked_countries: "",
                        sprite_count: 0,
                        season_id: 50,
                        series_id: 34,
                        sequence: 0,
                        allow_embedding: "yes",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 8m 57s",
                        status: "Successful",
                        failed_reason: "none",
                        default_thumb: 3,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "172.31.20.145",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "[1080,720,480,360,240]",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/17",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "2020-01-01 00:00:00",
                        end_published_date: "0000-00-00 00:00:00",
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/17/15819315146113ptkrg3t90c1/15819315146113ptkrg3t90c1.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/15819315146113ptkrg3t90c1/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/17/15819315146113ptkrg3t90c1/15819315146113ptkrg3t90c1.m3u8?Expires=1582531932&Signature=Hr2z8XZ5nr6Fb4GKoFgsVdEFei48T9voXdHmAOy1theGZr0UfDzA38-N28iH~OAjhcch37~JCUqSj7HHuFy~2ACg0kZVDX~8BQMqVhq5m27sIibQnyXfDh0mWnfz1McrRoO9s6PVxRT22zava9W9rsvt~PataeHU9lujKDydHLZsQQHtQAlVybbkkTok3nbkA5GDiK7eC0PGQB7SVqOc60tgKnPNfxc~rjHT6hslLcqRA3t0ca0CI9vc4DYrT6j4nlMo2rXf26RvWiZsZVvJKri~iY1wb5JQ1LQ6i250uu-KMUbgrMwX4qtm5rfd5mTPHoKy5hzMOoMz4dVp-aAuDQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/15819315146113ptkrg3t90c1/15819315146113ptkrg3t90c1-original.0000003.jpeg?Expires=1582531932&Signature=E1SD736nbBLdAl6FwH6~5RKaSMNaK15Uh2J~UptUQamAigcJwWxFyNzIHQI1dfpQhR4m5uhUfklD-YxHGengg6sglp2VBS~zcgdmtZTdqHdXzH4gH~zelip6oyjDdSmWAM6XJY2VSD7pJ2h99sNXJY-LjlybtQGs05HTr8jCOc5YqT4YPOPebqPHNlICpox~Nm1YwSSqRAvwDTKhYgkvtt2FK0lrgbwVTkkHeVfIUeYOHxX6izTz0UPzVgoZeCdnDpOzjWqwReiKhYpjGSY9~fUmElB~nQyPRsXR4aGQ3lBcdMkk1MTVLASbbuWV2wEXKcVlhgeMjvl3TV2h7Zx8ZQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/15819315146113ptkrg3t90c1/15819315146113ptkrg3t90c1-168x105.0000003.jpeg?Expires=1582531932&Signature=QNTlKjn~WYS9VkN0ID7E0swxh04BX4rmtWdc1qNDK7Y-JMv2KJMGNK9d0kiBnkrwPpeU4kKNe1asNfz0yl2IV0TRWDcwNZhpPtFLhx0FZNOScCZFyycGGMrLQYQv~l5UMMKwuiD19zzS1OlrcoBtEigUSmjbVHnx5K1sRic0Nau5FVz03m6yf1hvR7mXTj6VTYhxby2l0kRQYdY1qGtBrfj9eIhnJfzYIAm4fuuwhYz-IGLLjCViA855QYvDEVtdNMzrDO5l8YbjoTlI8BmdAMj~bc-q3DkWOByZ6KO1tctoqpv1jw5Wljj~wwG22g4DJweoDCZBAkiUFwFU-eMdtQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/15819315146113ptkrg3t90c1/15819315146113ptkrg3t90c1-416x260.0000003.jpeg?Expires=1582531932&Signature=euXRzEGpr46ZUDG3WT2zOcxy3~6BnwJmiED4hcEe08Mbvnyy5LAqnbJW6fDVgXVNAYoJgRXRqVUIYHQdVOHT9kwQqw7Ya~MlG8UEzpdHXJ2odfy3b4ynvXi2C~gygLuB5aeghljVRIkY2muDRQURReEQKXmigfVSl57LQJuo4bQV7WkauYYExbUj7ZXZ-mEABVVBb3VI1eNRULE2pCIzNLfolHiV1~3U10qttkRKxBX95oouZ4NaOhloXwTR-yHOpbEMmaUoxI1e~tvMpvtzrlHOs40yqUA4yMRkaDRMkDAH2jwJgNP94jnWU2FLqX9e8IA~OBfbAJtURfIii6T0pg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/15819315146113ptkrg3t90c1/15819315146113ptkrg3t90c1-632x395.0000003.jpeg?Expires=1582531932&Signature=ed4g~bRvoLV~PVpD~E9wcY~falWSazjd04Ph629BvIihHCsh8ud1ghRYr0prTukGH8xlu19Ao5i7VrFU2lF9DEWYEkxBvE-WyGgbhKrvU6JohlcD7vE-cRpxJR1d0mZuyShvOsmcAv1uH9VS7Z6Yxhq6L3MBNPlf6pLXG9~B7Hy~G~xs0eIdRNxcoirv-p8AWrmlbEEnn8EUzEikN0J-bXAeP9RQ-4T-J7Iy874WGbt8CP8Bf8d-6tsUR~OGeJqBa0TlE-6ptYngYp8nTcLti3a9cnU8-FMTQnE9WUF8WFFDZRDmNNrZaSRXQ6wqmMYmfcGNZQlvH5RvFmE0fX3Rxg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/15819315146113ptkrg3t90c1/15819315146113ptkrg3t90c1-768x432.0000003.jpeg?Expires=1582531932&Signature=fYIVJZxGj2wfUF4X02jDaoOHiTZXiGOFErnlKE1K~cddVGT0WiSJDD4xopSsuWwl1h8S5hb4PPMb297l5lYoXlYqIeDtfGGrGyRxUrUxYZ16Shuz9um7O62fE6J5y7L-Y7ooqOY~gyVnSRGq7M7rE~n3kyZnbYNHPKClhXAapLdeW3BGqGPvXAyfbNbKLs3nHUI8phN6MYH0TKXnwEOteegLu-GLP3MqhquxHJRJ0c5p2zkD2wwxskOrW3fexYXTTocvamTbX3trfeiOG-PidlQ3PZ~e78HwnBfW9VHiy-7AJfJD8BIqx4oAbiCMV0Mv1H6b2oFbRjaGkWWaP0LhFw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/15819315146113ptkrg3t90c1/15819315146113ptkrg3t90c1-200x288.0000003.jpeg?Expires=1582531932&Signature=afZkvfrYE7JIctLGy1RV8CM5~BeulteJWIUBp635qKOG4cwvVPnXxZlKFlaEJqlZ3bqnAn0hdF5ULlA8AZDo-0H6AJGkP6ck9mhXp~QnD51uTqSZZIXluUPbD6jpxRw2Dq71-p1L1wJYKSwikrbV~y-QUxkhxITtP4bXtubo6J0~0~6bP2KYJqrkEBZ9g5QRmpODjXIFlWLQSYlTU6nqDybswnizHNQcXRHt3LUeaN7P5CbHPl2Zk-GL3tPz~B-BVkYKfM7aZw4no7fvjQCIGwbRrGxm9rcSfiStm18qF3hE26tSjovJ0qayRqtJz3GlUTThOWBk-N9Jst6B4qgqOg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "537",
                        captions: []
                      },
                      {
                        videoid: 1209,
                        videokey: "U3U8GBOW3NYD",
                        video_password: "",
                        video_users: " ",
                        username: "",
                        userid: 1,
                        maturity_level: "all",
                        title: "Corporate Snakes",
                        file_name: "1581931514614fnavsv7svxc5",
                        file_type: 2,
                        description:
                          "Boss discloses that Tabish is the Team leader and Tony and Ria would be assisting him. Tabish, who was not expecting this, gets very jealous. ",
                        tags: "corporate,snakes,ep-02.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: "",
                        datecreated: "1970-01-01",
                        country: "0",
                        blocked_countries: "",
                        sprite_count: 0,
                        season_id: 50,
                        series_id: 34,
                        sequence: 0,
                        allow_embedding: "yes",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 9m 42s",
                        status: "Successful",
                        failed_reason: "none",
                        default_thumb: 3,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "172.31.20.145",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "[1080,720,480,360,240]",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/17",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "0000-00-00 00:00:00",
                        end_published_date: "0000-00-00 00:00:00",
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/17/1581931514614fnavsv7svxc5/1581931514614fnavsv7svxc5.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/1581931514614fnavsv7svxc5/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/17/1581931514614fnavsv7svxc5/1581931514614fnavsv7svxc5.m3u8?Expires=1582531932&Signature=gFCWWywB1k0c2l8TPKGk2tmOUAXIfbO9KNWDsx~tN9Ex1yM1eyn-trEIOT4Q2hL4e37zzm7E2cSLIG798vC627OQIblRpX5vbAe6ncQ-uSz6EB4hWjIriXwXB08td9SAxddXZaYNQW4f1tp429I0w0HqFe~idMIa6j8n3ArLkX451tGY02srlNjx4o5Eua27RU4Ovj29EyYx37vz8JGyoYjMhDL~UrKlzzWM-gxdqZxR1qlXigvpiiFbuPc1Xp2QAzPAhEPaUy~9FTGr4ExkqdH5bzFDA3TGNPsi2yEoc1sHxEv1442fmS2devMzJUotJINAx-Tj1RPfeyFNtMN2RQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/1581931514614fnavsv7svxc5/1581931514614fnavsv7svxc5-original.0000003.jpeg?Expires=1582531932&Signature=K6oqLQ8LxletIXb7Tlj6-59oCEKKRXzIiTJCxwlfht1iHL5Na~DLkKd9F9-ghkjxwuwzJq3Exr0-lhF~NRYnr~wyuKNWU5TUiRaH6TuYFyXfpQBsfXtlQBQQH01-7B5BfDqj84hstMSkLjZU98uHkQqBmPexfmZn~AEqjal7DnBcK~Niq8Qh7vVBJR34X5VS~mKSyb1VfP-cXKx2uZAkvf8yhUFoLwmUUtXTwe1XE8IIgBUOkzOIGcePoDZbZTZnGzaXtKlVHftUTk1sErwTdMPQSYFHi4P34tyTaS797hwtSFlaeZpJmzmckVborRm1zk7f0A5DTNOtkc6DSSMcOQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/1581931514614fnavsv7svxc5/1581931514614fnavsv7svxc5-168x105.0000003.jpeg?Expires=1582531932&Signature=ZF~hzikL80gxL~bKCkvH65741NK2-CW6SKUmrD1B-G9sClQxehFNHC0cTu9cdfWHCApc7luVKBxylSt19qlDH6j9sTfByvOF~njgD3~GwN2d4096itmDL40fT1FIXDAp0xiU0uro22dTl1jALKQppKHKf8tTnNgTHfDNA0nNSLM4E~kEd2O8uFsn8JH~eAutRhKTsvJpy5XEh9qeU2uF25J9F~Oz8INiDcfZ5wCyoOisU-GLSMnpURMWrxC5ZFxBC9Cb7zu9pwgnNJ88-Nyaumirtd8s-n0WJt24gej8tvQ7qlCqFsuJ39rSJbuG8q6x1z3KN~j0eObTZwbSh496vQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/1581931514614fnavsv7svxc5/1581931514614fnavsv7svxc5-416x260.0000003.jpeg?Expires=1582531932&Signature=KIProB4MeVPVTE6kzZ08NHC6ernu9mDaRUa8Sn4AS6yN5xC830bCBvmKJwWN1OvfaRQuVDbFj9ogrFtbAaEWHr3M~074oD2n2tg~tQTuBIcgT0H9zo2Bv5Yc1N4w2kxhoXZ~gFLG1f0uZB3YKTqZJP8OfnC00HPrCV-5FLXbFbEoZzDlYbhUaY6k6Ik5gGrOln8SJ8~nQLznXC7HtIGqD7bnus8-cBzsv6vh8d690J8JV-nrA85Mm7TWPq0uxCXZQ~V8dJTV3DlNM9ypoSO-yTX4SQQEqe8oVvqaHZbJmORDlnk5iDbj64jx5e691WBRqP58dpTOtwfVVqnfOvLC-w__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/1581931514614fnavsv7svxc5/1581931514614fnavsv7svxc5-632x395.0000003.jpeg?Expires=1582531932&Signature=cVLlB9vGz0XsNvFNMaaEBHoK~vFRzsvtk9QUwbB8Z-wslwTyk9QyXkNp~Ij~8x1LCvA8LHUw7XZOmSqKD~eES7cJr565y9R0NDBoqQpFEXU~bwkaScxWbMBHhkWSumTxDfjzjB-1hmvfhl9EMtbP9PRc7qWbMRN5fL4BMvdqSR6xWpwYoHU8ZvC6rxibsdPYzRh72N8WpT0DJQ0Ov-4MSN33tRj9BgfB5-u2PDnwDNxJNrR2wKTSDWjlf5WsPmPid86bZe0BAAfchlUAFq06gIJ14PfiYKIUtXlUZ4vEb2SlU9oHlpDXHEMfhKEFRZjuoRrYL6lWSzVW2wF7PfSEvQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/1581931514614fnavsv7svxc5/1581931514614fnavsv7svxc5-768x432.0000003.jpeg?Expires=1582531932&Signature=NdDpFyvYZZxS7RBU~XcdrvPr9D03I3HJ5iRkAaXLQiq77K5gC6Tox37iTldcGjJfbX8IgP86bwROuJ7hYuL6JLEVCmc70YbXxB2FkP9z1aas-xXzrs-6gFeonngeXS4IfzANt7AoKQUsRmZ2ofkevH8keTdgJo7AK245mY5YJX7pLmyqb08PYUeAKnIdqW8febV6GuMijV8HoLDDRDLKYgGjt-SMOlSB~J1UmcDbox-Kbj6-Yf0IWZU-jK-Vv1b0gDCfb~P5FJxkSEfJCW3KVNr9fEIpxIZRIMQKWJqIDFl3YrwbFRg2ZAGteqzMxub6vp6KUw3ph~HYorTnw0l3rw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/1581931514614fnavsv7svxc5/1581931514614fnavsv7svxc5-200x288.0000003.jpeg?Expires=1582531932&Signature=Jhu0qn4Cdj8EFbo7M19ZIx1Mv2OM4vX416ac2H04xax0ohRk5aKOyvxjVpdfjnKV-wuGqa8pkp3MaYesw~j96kNHsKYYGGQ2q7ZItL-TiPa~G9jMz4ln5QNVFDg-7AmjGxJ5kbr-OUQCvFMTM8-ak~Ba0UjGpAYx1QRwsyKiam8-yFX17aghnYn~~PUIE2ylrUvifpQiNOMqEFPjgDMPpas5srOKzCuuvk~x5KkXAZE1meqjjmHFOhhJnEBPsZQIOJzQNUBwVPhHzv6CIBw3YxjpS4W85omigpl9GeazhyMuXpW~od4uB4T~mqKimHoa5FcEiiE2CWaTBvBHPeq1OA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "582",
                        captions: []
                      },
                      {
                        videoid: 1210,
                        videokey: "5AWHMONMBHS8",
                        video_password: "",
                        video_users: " ",
                        username: "",
                        userid: 1,
                        maturity_level: "all",
                        title: "Corporate Snakes",
                        file_name: "1581931514617pqvrnipqayt9",
                        file_type: 2,
                        description:
                          "Jaleel sahb misbehaves with the Head of the Project in his ignorance. Later on he realizes his mistake and scares about wrath of boss who might fire him over this. ",
                        tags: "corporate,snakes,ep-03.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: "",
                        datecreated: "1970-01-01",
                        country: "0",
                        blocked_countries: "",
                        sprite_count: 0,
                        season_id: 50,
                        series_id: 34,
                        sequence: 0,
                        allow_embedding: "yes",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 10m 23s",
                        status: "Successful",
                        failed_reason: "none",
                        default_thumb: 4,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "172.31.20.145",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "[1080,720,480,360,240]",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/17",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "0000-00-00 00:00:00",
                        end_published_date: "0000-00-00 00:00:00",
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/17/1581931514617pqvrnipqayt9/1581931514617pqvrnipqayt9.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/1581931514617pqvrnipqayt9/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/17/1581931514617pqvrnipqayt9/1581931514617pqvrnipqayt9.m3u8?Expires=1582531932&Signature=MTf4s91FJr8oapDjUpgsAX~gqc9m~21H~veaYuqN9twZ-95UuzjwAwe08oEsNjC3YsnQSkNvdT864846LIOvMqPXtMoksgtnhNUHanW1~HNudf6UgvS-O2wK7yp4JSmqNdRAzET3rpJYpTylEOuHw1mBVdpbTRo89mK-3glHQOSuPdcWKSc8VbpNQ64uDCJ0yiLyXffkE6mYC2gen3~9cWzt6w1Xyjqvp~OOFPv9KzO9nKRdcQAFpJOsFefYJm04NcyfJydRBgh-5F~GuakGAFqm8FzPYP3jW5dxjhs~lBKXJlLp153~~cTFOAvs1MzKMrFaSVWGC1ETPFF4Y-F2zQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/1581931514617pqvrnipqayt9/1581931514617pqvrnipqayt9-original.0000004.jpeg?Expires=1582531932&Signature=KNCXpjjG66nJL2Alo0WJ5o4DYeXXi2MMtVDRUBcwQL-sa-M0s5mPAEKkAu5FPuZ2fal0hMEBGoTfn2I-vQnIa-NG6rE5rVWQbDdCsUOzf6OmsF2NHNTtanM4b2Hw4u~jCM-skOtjkuCpiFk3mr1sKidPHG-rUpo6IdCZrJHdUNmZsAeLC5lPjcxXGFXkVl6F4sxawqtrK15riXXlVwuTzTsVqE87cYWJdfQfvCBMqiFIApLrfmerTBaCak5X6vPi5MOT1432amtCEKGJX8ja2l7rezxWmI3wjDDKbujUjOL7~iXz2~XBzEdu1eZuimcpWtedk-1pfz~QmAjeagQVEw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/1581931514617pqvrnipqayt9/1581931514617pqvrnipqayt9-168x105.0000004.jpeg?Expires=1582531932&Signature=NkmbkSpqjvcik7YYKZ62~luao1nZiSDsBuZp4aGcSQRm2aKavCIhwGGL3IRmLvXSluW6w4Lry6rjhXvFZ1MG0TI3nTIgiWQBJSm53sg8UYtlF6N7CKOhdmn6whO94tm0XXTHrSjLVid-ZfHOPIwz0qrj4hzQgYlfDRqTxbjDBsBexabJ8LzYqPOuUJrIoQ1lBpwyN-wC-ngIsyAf8FMXoRNeiwGftFBWQIWoyc~FGAaN9umiPwLOnCwJy321-cpncqf0VePyXc1eO0vJIHgBP7Y~nniE7ZUbh4FPXmk6VLIVzsvaU7gnXMMnjKQ9Im~Sxy0MWlYXYtgHvLFYrpHfFg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/1581931514617pqvrnipqayt9/1581931514617pqvrnipqayt9-416x260.0000004.jpeg?Expires=1582531932&Signature=Shtdos--FqZI9yLfDrAEQzvu1k1JxklMgwKad9yhWE1kVrEXnXE2zu3yxccuCPB0nXIFbGT7KBW1xoYZCdq3R18c6HAHyusz-4PhIF~ZsuWHKg0sR35-LdLiX0yMNNOMpO3cSgMyzctgrtDz7I0ft4rxaIRjPhVOpsDdQdfi5Uj5gK~6pI~Y5Vm6uM6qPAHudAznsRYUA7pqoHjF2Oq7kOAXMYAi06b1ltMoqzs6HnJAzGWiFpft9Ys5ObGXOPbI0CP-7DjO~oZIiUwlVUIm9xhK~EhNLBhnSPouglgDMlSa~xufbXzWNSYboMra2MUblu03Pen~i4IbTY71ckoYMQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/1581931514617pqvrnipqayt9/1581931514617pqvrnipqayt9-632x395.0000004.jpeg?Expires=1582531932&Signature=JJBB9ZWe55nFIP1K0NbhWISuTJBXhK72pbAYJ05kseV7MEWkSdblZljO7AI6-aXyWlFTSMcEDQbuCMtQ0ia~2PxFgHHOD6yggnDAHwUCTCNNOHV8UpTHVT3-dyEDyI1bOxgmkIP0d-NlN3mzLnNmSHvR11PGlAebWdJSsl8mgJoqWRq-bytBilXBbjtZ0hZ17M3nyiNIar7cIosBg-ORSrwZb1Wlnum7qnmylBtPkx6APBhSgkyP1shF5OF8AqkB6KwzfF8ynihc78x2x7we5Z4PniA-ybxlGODISqlo~Gb~u5vQVe9donwRP9AK0lnOoj2hb24tnNGvzubguMSuEA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/1581931514617pqvrnipqayt9/1581931514617pqvrnipqayt9-768x432.0000004.jpeg?Expires=1582531932&Signature=L9Z9FhIdxDXc5KnJYyFOqrP70FxR54XyrmpBSZMn5M-jorEKWkDh4INLyXD7kw0BM4w0f763A-ir~wQZDEOBdOcGuvqH1oBWfKb3l1FOYXpX6Tflz5HQIYlj6rJkpY5noyAp4TpkenpOVtNWe-lZwdjgaSd76PtLcHgA~vjyj-qpgOeLmN8pctVKOBGtnHJEmcpSGH3dJumi8jPK~Sj7odY-7lrU1kmmYBxIVSZ6uxfiB1yk7y7C-JlkEkdrmYJZmcYqdJx-L8mMEg0nMv-hbRUb06P0nKf58Bf9Xe1WpkXfb7uZRHWr-GoRnL5~WUf4qhdh1~k1vuFOv6WZ6oTV2w__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/17/1581931514617pqvrnipqayt9/1581931514617pqvrnipqayt9-200x288.0000004.jpeg?Expires=1582531932&Signature=Dr63RQ2LyIZIxSRk7Pkii9NUl~tzCKloEEZNVaa3YKtXx4l91gcKlmYAzCZau2cIzEf~Ir7mk0Bys3xAL85C4xKzvGi-pr2ek2zfbfWsQuG27-gMsSmcuiaj8iEP33sTDWq-SrNmntKTacvrdM0u3OHPMyO87BNEfNaqBIpVXYCWZVtHdcZLrhjQuAJF4NWU9Y7V6I5E~1ZbWt2KSU6IdJ8FkTSRUe5E1WeDyxFrKyQBwqPg7LRfBB2jLMjLsf82ZF-de16te9y1j90UIvY6VQgo5IHWFIxNJW6XpBDXhhgeadeeBytVz1VArvdLfMKIbpxBYBAjojfOxZCrBC8zaA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "623",
                        captions: []
                      }
                    ]
                  }
                ],
                cast: [],
                director: []
              },
              {
                series_id: 47,
                series_name: "Saat Mulaqatein ",
                series_description:
                  "A typical Pakistani couple decides to end things and opt for separation. The situation takes a turn when they realize the implications of them being separated.",
                series_tags: "Drama",
                maturity_level: "all",
                category: "#5# ",
                userid: 39,
                views: 0,
                date_added: "2020-02-19 01:52:18",
                featured: "yes",
                broadcast: "public",
                allow_comments: "",
                allow_rating: "yes",
                total_comments: 0,
                last_commented: "0000-00-00 00:00:00",
                total_objects: 0,
                rating: 0,
                rated_by: 0,
                voters: "",
                active: "yes",
                public_upload: "",
                type: "",
                file_directory: "2020/02/19",
                file_server_path: "",
                file_thumbs_path: "",
                aws_service_id: null,
                aws_cdn: null,
                ext_thumb: "jpg",
                aws_migrate: "no",
                thumb:
                  "https://deikho.com/images/series_thumbs/2020/02/19/47.jpg",
                categories: [
                  {
                    category_id: 5,
                    parent_id: 1,
                    category_name: "Web Series",
                    category_order: 1,
                    category_desc: "&lt;p&gt;&lt;br&gt;&lt;/p&gt;",
                    date_added: "2019-10-24 05:10:14",
                    category_thumb: 0,
                    featured: "no",
                    isdefault: ""
                  }
                ],
                seasons: [
                  {
                    season_id: 63,
                    series_id: 47,
                    sequence: 1,
                    episodes_count: 0,
                    date_added: "2020-02-19 01:52:18",
                    episodes: [
                      {
                        videoid: 1242,
                        videokey: "56O35UR8N1NO",
                        video_password: "",
                        video_users: " ",
                        username: "",
                        userid: 0,
                        maturity_level: "all",
                        title: "Trailer",
                        file_name: "1582077184975ul6d9n2qvt3",
                        file_type: 2,
                        description: " ",
                        tags: "sm-promo-01.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: "",
                        datecreated: "1970-01-01",
                        country: "0",
                        blocked_countries: "#0# ",
                        sprite_count: 0,
                        season_id: 63,
                        series_id: 47,
                        sequence: 0,
                        allow_embedding: "yes",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 13s",
                        status: "Successful",
                        failed_reason: "none",
                        default_thumb: 1,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "127.0.0.1",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "[1080,720,480,360,240]",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/19",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "2020-01-01 00:00:00",
                        end_published_date: "0000-00-00 00:00:00",
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/1582077184975ul6d9n2qvt3/1582077184975ul6d9n2qvt3.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077184975ul6d9n2qvt3/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/1582077184975ul6d9n2qvt3/1582077184975ul6d9n2qvt3.m3u8?Expires=1582531931&Signature=QdSGbb1n7wJ-mduPLMKpPY~mxUwyCDkqgQaAY3-iAPIy2l0RTpEc7OJX37EeuSufSMMNw-qGcZgITGMhnpWpf0kZMS6cA7VBnKqfoiNgNvRU0TzZEX9PCo6-l0zOn~6-Gbg3BainPIiXhYa1f87kwRNf6T~47i35yrzWGuTXMT9VBDzd44G4tSz1MAtHPaU8xguvExso67vbEA7DDgmBJBiihmQCLLcX9D9NoCL4aqMyKbzQwzNLtNbLLUPBXvTJkcmSzDSTgZu8p33hYtu~R5tpPe2VpdM6DOnbHcavDeZ~7~S~IKJaYOaXdha5aqrn1hd4kg4bV4yApmHKM7fj5w__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077184975ul6d9n2qvt3/1582077184975ul6d9n2qvt3-original.0000001.jpeg?Expires=1582531931&Signature=Q2ry0N0OXXS4VuWQ3cQ~6hA9qq6kLD2YTk~Cjhw--gGLPRHGm62G4dnKmXbUiiCFY~-4TEHGZChcQ3dTFyFzSls11JZsTK4OngGdZs9z1XVl8Hzy-If4yp4EPKpQGyt~RTJNAFdcNkCzMV2HfGvniunzO2e5r7qy8GkdSyivfOAKr9pKN72dvcQJtmnJVHBRkFej7MwZsP2-lOsO9qNznt7ww3yns1YNJxnWxcWzlBY2fxXH1CIgbfUg3ZlEpz1MOQFyDcTdqnFlvvyCzl4MyGy3Nx0r7OI30QxQozHdILgzCRjJPcleyBY9pnor-VsTV3qrdGhLkSvDgh2zcgfDzg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077184975ul6d9n2qvt3/1582077184975ul6d9n2qvt3-168x105.0000001.jpeg?Expires=1582531931&Signature=REydqCX94G5ifyAJdZvOLJ4cP11kqUGuLMQv-yhfOCMma~G~jZMdFVsA8zIrDaJ5ztU2lKd0Dk7pG9~MsOsTekj0IlZv5xYA6QIUNMqcTErFyoTJosOEtRBih1LUIX~lnDgeYPLU2U5Bd-LlTQy24NTBdGbRWrCttI3wjygriGJH8j7pEbKmBWzW6T8nZCNh~5nDje0s0MHObcyiBtoMF3~~-htKmUOD-apswkqCW9fImy4shztJzEi8ZJJEzKTYIFiEM8F5P3JBq5AiGWHCL~bo7Wy-Z7ORTK2l4HWLwgJXpnWyaU8Zhgeb3ZpKYuPRH4KL-sWBNpjKDy-3wSIv3Q__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077184975ul6d9n2qvt3/1582077184975ul6d9n2qvt3-416x260.0000001.jpeg?Expires=1582531931&Signature=M4lJLKeBbxPuRpjs0GBG8yRDil4DwdRc865IKxvJeiwzWg4nSR525UVqOksgwiN-FMB7zXkLUSuYZ3SqoiEhLQVAiKFYqebkrwJ~sY5NLtTRYe7Ic8NyJfS0Z3hKVaxoIriDMq9Fw8mf2Bzvny12Rure9FPUGOPuSXubV5KJdfjJROyXHuFxdzQfH4mN0--AxBd5YBqLFOQoHHPjro1mBLD6G1a39ac03Pzj6~6jU6LDpsBX3Bkn~u6NYEA6QDEFKxUeN-~2m1xPkTJswns6QAn4-pgCU3nMzioftSqUHHT0GqFlZYrjoVtSo-l5qNvx4nzZudMvJKoTGWDtJRLPiw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077184975ul6d9n2qvt3/1582077184975ul6d9n2qvt3-632x395.0000001.jpeg?Expires=1582531931&Signature=XR1Y5Tx0YF-tQfQ~TYJXVwZdNZ-y9vCsJn-mgtwKH2YqKyUMxbelg51YEg1i1mpoMLXM8LzorN2JuFI3H~VK7PDOjtZbJyWl8J5pZjDI0loiJCZMo12x2Ey6lT45k3nqFtVPQlPKVgmf~3akY4pVQX4caWHdGi7icbZ4LSuB8ApOZS-hzzo2HoX1IDFQOrkv6BHx~ZrDHwBem5vumRHyzuZfNy75w5-E4OUMIat1lGqLcqo4EtEViwCFQshbRDbMHMps27AnPhw2PFN9pz1kFzhnkYH3YJZl8oF2zhxRWGN~Ib4DiaXbr6WXbQr6S36Snd1gk~bs1ki5JpDYB49~CA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077184975ul6d9n2qvt3/1582077184975ul6d9n2qvt3-768x432.0000001.jpeg?Expires=1582531931&Signature=XlkWcA42xQ24G7jtYOqF3aXMSHyLAZs2kBkyFGMhkUJEz~a1tUvTEUei10t-1-a65elQtxRJvNiDH7OJw9tfsqg5MNcV82eeT~23G1oHwc4sKns8Up918FHTqRJeeQImTLummIg~gDFJNlB50y-ZjhT2GryEw5MYYnCD2u5gr~FYxzF8q6LyHTUBePO0mSuhYd2SayOlPgKfWr6fVMROCjnlxwhzfFG1n70quEE7OtTMN57C~WO3vysgLSxEPeC1KC7db2rVg2pQYh8B7u-zD1JK6tjyd-DS8yhn0WpwOS2okJmM0hHfq7pkpRC9N0WsFLbMj3UF0faQN6YhCpgUHw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077184975ul6d9n2qvt3/1582077184975ul6d9n2qvt3-200x288.0000001.jpeg?Expires=1582531931&Signature=Ecpw8fQp6WgtIrPQYmO1gmtoXEtqPawh2wPJ5HZszBViCk12Rk31fw0W6k0kTMso70t6pydWLHUVeHdRQfvjlo8U-t1qiv5P-d7tEZnGf8Aa1bAxDBmGBT8KFXmt35Pi47lfCsrbqCMDFUgaTj4NVyYHE8r2DAq71DWxHWyRyBDcgXCaFcH3lNu6J0CMsjutK-Ey1HvUwkGmj24KITsyC2es9JxXXbCvlYrRnGyz-02lleXJu-NU4ePnHDs3m8KyXH6JvrSQp6tHL9tXKEt~coAkX3T3GsJFc4AzQoURRkpaOr8gTtH216rXwxntqMT4vUZfy0YEmSgyDhC-X0TQjQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "13",
                        captions: []
                      },
                      {
                        videoid: 1243,
                        videokey: "XRNXUYUYARAG",
                        video_password: "",
                        video_users: " ",
                        username: "",
                        userid: 0,
                        maturity_level: "all",
                        title: "Act Of Separation",
                        file_name: "1582077202300k8w30pgppvn7",
                        file_type: 2,
                        description:
                          "After 15 years of marriage, Noman Sahab and his wife decide to finally part ways. But what led them to this painful decision? Letâ€™s find out.\r\n\r\n",
                        tags: "ep-1-act,separation.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: "",
                        datecreated: "1970-01-01",
                        country: "0",
                        blocked_countries: "#0# ",
                        sprite_count: 0,
                        season_id: 63,
                        series_id: 47,
                        sequence: 0,
                        allow_embedding: "yes",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 11m 28s",
                        status: "Successful",
                        failed_reason: "none",
                        default_thumb: 1,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "127.0.0.1",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "[1080,720,480,360,240]",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/19",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "2020-01-01 00:00:00",
                        end_published_date: "0000-00-00 00:00:00",
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/1582077202300k8w30pgppvn7/1582077202300k8w30pgppvn7.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202300k8w30pgppvn7/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/1582077202300k8w30pgppvn7/1582077202300k8w30pgppvn7.m3u8?Expires=1582531931&Signature=K6OYdXwgo7hNDVT0t2ab3d-XZeUFr0w~r38PBwJWKJyauXkA4QBDrsE2i2oUAHOn1YN1JAE9QhFKj~ACKsQpDGbm-3AlGNhbOA3xFJKDvF6eFH02dITJ4Bpp8ihVv9NHCUNhs1ApgfUIMqrAuuUgh7Z6ASmmc8EMLGhLIY6VuYvRYOiJ0YT4p-kJKvJEM8Y~UXdkDF-N2wWxNI2t0qWJpvTq9bH4vZk-uYqhsDYYC-VA64kqPGFgv8D8gTdoe54GiJ0iNV4eNv2rInXYzeBQ1W8KwaH-eiayD2AzUXhQwIpcxvhTyK-Jcf38Nu9ydLSdtXBQkHMdhL3Uy60fRhVTeg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202300k8w30pgppvn7/1582077202300k8w30pgppvn7-original.0000001.jpeg?Expires=1582531931&Signature=Gdp3sVt0f3DfiOYwP-bmZEN227ibWWABRAUx6hi1BOm9M4kPLmw-g8Byt2HxNK4M~Ckn9BFe7iCEbDeA4T55jXcL7uumull~XfQsDTHxvgS2YskuXoo19R-lH4hiBjQK4zgAN1cviWnBubCVkNe29Gig22lSv1zBLGzPXIDl9uILK9YfHFtPE4JzFSSTAbiQmBgQiG5qG783L4tQ11FycFS4jhHXC3gmlKW4fJ7ZLxNubwC0bYyk8meElcyfS67BIDr3jbC-OVR4Vl0~QoPxcKSoCbyrBmzDOpLXRVyVUKVz5tzkK49n0IJetaZ~bgS3z55blINhXqSE61~mh9i7dQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202300k8w30pgppvn7/1582077202300k8w30pgppvn7-168x105.0000001.jpeg?Expires=1582531931&Signature=HKDD032xOiXjxuHB~pVGK1--gxjz0UUebvWESzQVUJSCgVXsGtYIAZ9C~wYmlyLRKCcdn02-hSrONOhh249dm~O3xHBblX6uOoe8uf6foGvJdG4m2JgkjSp24oNzsbspOrFlyVq9kv7gnHlts6NE80OTcqnpDaqhW8q0-mCL9k5XamRvJjKEphph3z56y1JPv59kG5gwXzCGuAf0gVVHgfvrqlB-epChWNfNosF88CGohC8uWz52O047k37dAcixukGWpnTIJx7aZiXdBYaHT3Sj8COUQxYP5J8QIKP3D3ABATmOnnhZ5eo2N1Im1593kDq-V75BPm2ApG4ICxoH4A__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202300k8w30pgppvn7/1582077202300k8w30pgppvn7-416x260.0000001.jpeg?Expires=1582531931&Signature=HtUKuXZT-9930tZ8DsP19R6cG~ZP-tAYdu7SpFE~WgXsOUGWgutVX~c7a-vifAs7ChHiQZcZ9zvq-vLam8snz8mkrhVxiM52LHFpBioeDIcIu7BDOlKsPEOptyXokcxZgdLQfszBbR6FS0OUoMfa2YjXAlt5c9gmLPUoBeuynYOYOYKSkd9KJNEab0BHOMDa9~48ZlGshLAyp2ESEWHVGzcabhrfH85ZQG5ZtRdOv7CP9z-Z4BLzh3C-BOF4ggvErdFT2-TU5TtpTjoJOdFMqGn~pC4ZDPT0druodRYbTH-NVUkrSeChYJei7-OrLKM~06FZpDuDWerVAfy-Te5bcw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202300k8w30pgppvn7/1582077202300k8w30pgppvn7-632x395.0000001.jpeg?Expires=1582531931&Signature=eMw7sqI9vkurIoSlQeFSsOnN21KWIOONfpNCS43gxzyRLqcpMEWYf04hckloEnswX-uo0rYmqJ4n6WDd90MxfgVlr-wDIzpkCJaRgUGwvZPhF2SSTV6OwO00DwbEmhx8uqCQXm-7TK2UgbdOYMqhFe2n9ejuryxycudAwyChikHnY4lj5dPyrQAzIsGaV-J7zcwytTplzETdCZRKahthXhRVVayG~p5xps19T5uKeFccYOGB--QalK7Ox5cLqt8YFBvSppcSVGKIAsc-XnBz82iFsLULN5k7nA1giDsN94eFF~wgWj9O0kts7FMr0SR8YD7nK2dEmFtag2iYs62VXg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202300k8w30pgppvn7/1582077202300k8w30pgppvn7-768x432.0000001.jpeg?Expires=1582531931&Signature=H6KkA9USJU9ApmwnFBbteo2RNHMobHC~-PaAvlaAloEiz3vaDC2WhnhTAHKMc7raLpUwmCOxFuYDaYPVrNMVSwZ2nlUiAKsNf3W51oVpZQiVEoJptp6xJEsfcscCLMOGIph9hz5OYLeV4Kwi96oObJ~nWIEjo2stJEFC4FOBPJFYSNeoP6JB10g-efS8PCEYvaDbvtt8XO2fm-STQsaDrnAc8nRo2MuCOvsQT84G5jK7bY1Ofi0YhCL656iToFeQOKaV8C7wesBQpqkgpQiUtJF9lBxbdj4KjvPoibnJ~EsAMNyarUNcKeFuKdridtNKwZ8Yndn0wJOxIgAUz3OdBQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202300k8w30pgppvn7/1582077202300k8w30pgppvn7-200x288.0000001.jpeg?Expires=1582531931&Signature=bch5iT-SuG6HCUgJZHQA1NOfUqG067C-FLVeH54e8Y9LBgGOv3wxqoRKliBIP0epHYVfmIxoeTHcW6Ma330Xr8Wsc9qP7xOvI5KnFMHUdA3T45vWskmc7Mm3jozzHGiefIvBHFUUetYquNcUiut1VbusTd4xD0-C4Gg7aLuU6y9Bqp2f2qQUV8h6Z67ObE52nSvn9anEcWav1BdVdPzm1gv~wUPxEm-yZPcpW7xO7ef~nBalRo98W4fJSD~fZITNloEHfH3K7b72k3eAepmiQfkhY5mBVc5p505t3WpU0xv7rKMwVZq5H2NbajXaf44UFhPvL00GiEeJVvotvjjOtw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "688",
                        captions: []
                      },
                      {
                        videoid: 1244,
                        videokey: "95NBHR31GDAU",
                        video_password: "",
                        video_users: " ",
                        username: "",
                        userid: 0,
                        maturity_level: "all",
                        title: "Justification",
                        file_name: "158207720230267qvreva0y82",
                        file_type: 2,
                        description:
                          "Justifications and denial from Noman Sahab and his wife, both supporting the separation yet silently longing for each other.\r\n\r\n",
                        tags: "ep-2-justification.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: "",
                        datecreated: "1970-01-01",
                        country: "0",
                        blocked_countries: "#0# ",
                        sprite_count: 0,
                        season_id: 63,
                        series_id: 47,
                        sequence: 0,
                        allow_embedding: "yes",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 8m 46s",
                        status: "Successful",
                        failed_reason: "none",
                        default_thumb: 1,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "127.0.0.1",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "[1080,720,480,360,240]",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/19",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "2020-01-01 00:00:00",
                        end_published_date: "0000-00-00 00:00:00",
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/158207720230267qvreva0y82/158207720230267qvreva0y82.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/158207720230267qvreva0y82/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/158207720230267qvreva0y82/158207720230267qvreva0y82.m3u8?Expires=1582531931&Signature=PQIoCrlsQYausITFk5cccS6WCCrO~jgiHTQIEAxMs6hoemyHf3XI6DFbMogip69njAew8zoKq499fB4lXt7u3F73SKCg5DS5T-jNbOwl8Dx9c3fiaFBJO5wyHCQTpP2Bw4lY8AbmUk9NJz42sJu2Skux6xcipwEk~dOAwJx3B7WUvYBI1foev~tIgi6Jq7dUCTZhkaehUM6VJyBuGF6laU9xM5AaP6NhamR9oXWPMJ89plaB2OUnCf2qVJlBZaywOrzf9JJNBZXIiPsP07-B41zqRN-toFu-3C59QEjdGC9OvTgIJ43JJvucDeP6daD8xC7o9zx41RnAzKXPGqBHaA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/158207720230267qvreva0y82/158207720230267qvreva0y82-original.0000001.jpeg?Expires=1582531931&Signature=PG-vVCF9BOq6WRFW5-DF7c6oacAvrSI4Myy4RrM8mptXfxdbYO90mWnVX7fzV9sPhV-JCMx1i6fVMvMp6RKpIhhmwHXQ5CP04UU7C9uU6iTs4L0xrsnXDup2oh-nvjKUJNZpwvK1eRidk1TPeIXyTAqR5kiBe-apAoknASGdF9Hl19IbmzE9Xy2uvyTm4Ok97xHlkXiPh00tH6FxHoJkyi7cfv~SurYrgHSfBdnwv0eTbsgUH450GrnnZGfzBCtv66lb64BtkdwRzhYrZxqDA9U6jcuYkccw1TsYe4q3V3Uo6FyFqWG0LEu0BiWYAMw3W9C3SrLhmOWGbUu1GwOc0g__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/158207720230267qvreva0y82/158207720230267qvreva0y82-168x105.0000001.jpeg?Expires=1582531931&Signature=WKrL1LcPrPoMVcIkUgZaqewzrZrloTdGKhjBInxZVI8K~M1CsAl9n7YcjzJco9M03SKHOosPzujUoGRfDDsRAiq2lH1rxbpDZRbUS-1iJbtHsQ96ViZz2sKZAYMrGsuvZNyuaEaKysYC11wbdPeUx-Z8pd6fsihtx7Tv2O6Nh781l7jfq2A1f0Dks0GyP0bJgZ~e02d9Kk7~~sV8QJnBTeZiHDyjLh-64Sffolol7b1kYTSfeN14szjnrvlOAzYT2zfSFR1ibLuXleQ5gKenCvaq5K7f8ZvO7Ncmot4jVT1kif7~SdEfITnWghzOJeH6BFhFm6rOLDYy0paU9nDlMQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/158207720230267qvreva0y82/158207720230267qvreva0y82-416x260.0000001.jpeg?Expires=1582531931&Signature=gG84CIM9dSnqsGFM18uy03O6ji5YHKFUXSQKb7PIFXUCrr~6id5JEPf-QDxqa9shFzjy0zUGsDL~jdN-YdT-LgpIOb8LZe5zCVNFcBL3F7lbsqiaxwz91y6xF4gw6NO1bIWX40WPkOhkp1~tEgT3SnuVOGOfC5hEzB8tcuiyic-YuKec9WxsxHI6TXTCBDJJ6MqkI5mcsK-7y4m1IgBZfzoqoEEIQz6FTvsH6QpZknbXmQaOpd6bD8sNjdPAt4gmkQZZsQcFr9W6-KuHsRK0JRaSdgbQRmBHPslJauxvnGIl-DFAGlCevrPLyeRtzZmVX5rnzksyzQqyhZDZ4eo2mw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/158207720230267qvreva0y82/158207720230267qvreva0y82-632x395.0000001.jpeg?Expires=1582531931&Signature=YnIGisqYn9NvrnbZEUV2WKNZ99doPsDq~KThBWBZyeE~h28yelz3ZszO6PIdQGvVCSZkT-pzUHXtxY-XvIL8ch7YbhYSg2Aj~o0VrR07Sdoab3CcuZt3n9oWHeqvHl7-kA7QsbZhwp6mvxIGXoKumUeKWPaIfwp8cHgmvaPTNYqnvch3g5bS0H4AM6qLa8H~hFh-5Md09TB1-p8F~kwfs6ta4CTO8ICgJBVJCBptC1CXiQnZ9w2MChoNJLN-Pzty9mEJCo8qrCWf9uhzz1zBchYVXXUy~66dAZKa0FKEq0Ak5MSWmnWuzcj-o78bl7o9Enp2Gn0DkmqYOl2qZlGEvA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/158207720230267qvreva0y82/158207720230267qvreva0y82-768x432.0000001.jpeg?Expires=1582531931&Signature=QiOF8ya1mQa4rw-1guouhbbEgl69uiwoe-fUEySMNsaZOo6dB6dgYVn0bI0uT~DzmrdgN~HegLChxzOzuv12C1h5BfhxAI5wQfiHRFHTSwN9lXz1c6EHAKbLWzA50yyk3hw~nH0rWkvLVJ2skTVHTBSaL0Twvfk-BnSANTH5KJC~JcNuzJ5eqmjaJsTdieBmUsIAaqQTGC9cdzzz9nvndOUeobwwIQW7-zPW7MyxLdXZRVi49nr0FjGWxBNikhIN93r4BHqo4ohaO9Qm3eJbW-lK6He86S9~IKIf50A9jH5UrJvKgln9dXy3IiHQUj-AQA~hY9cPIHNH4fEDtMWfNA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/158207720230267qvreva0y82/158207720230267qvreva0y82-200x288.0000001.jpeg?Expires=1582531931&Signature=RjQo4CvYGk~jgCaTidAwYfr3XWoyA3Wx7K~dSEzJU4g8Xte7Z3FceGrrttS7TF56eUxH5-rMtjIFJr-X2fhL-1PT3pzYu6GoW-hyipB6k5EsPwAtLwOslzSp0BokjfxieBqRGM6t0~FJNXbnsO8R1~gTtBG1lkCgkyDgWa3nqVgklNc5WtcFnT8H-Q9WZfA57DdAkLAJY236xub2kGPdeaMjVKwsDi0s3kV1mXnh5IlzFPnV0WBiZ6yl0-rWoj~~iLs48rnVE-cWMez0iE3m9RzKDPSaQKo~rMoqZ9~jPNOra789WgSwMcya11LyGBSUkwhZFRyzW8~cA5I2PovVww__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "526",
                        captions: []
                      },
                      {
                        videoid: 1245,
                        videokey: "9S7HXG9M2KK5",
                        video_password: "",
                        video_users: " ",
                        username: "",
                        userid: 0,
                        maturity_level: "all",
                        title: "Consolation",
                        file_name: "1582077202303vtjo9mlza2q3",
                        file_type: 2,
                        description:
                          "Despite being separated, Noman sahab and his wife try to find solace in each other. But will years of bitterness prevail? Watch the episode to find out what happens.\r\n\r\n",
                        tags: "ep-3-consolation.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: "",
                        datecreated: "1970-01-01",
                        country: "0",
                        blocked_countries: "#0# ",
                        sprite_count: 0,
                        season_id: 63,
                        series_id: 47,
                        sequence: 0,
                        allow_embedding: "yes",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 1m 12s",
                        status: "Successful",
                        failed_reason: "none",
                        default_thumb: 1,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "127.0.0.1",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "[1080,720,480,360,240]",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/19",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "2020-01-01 00:00:00",
                        end_published_date: "0000-00-00 00:00:00",
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/1582077202303vtjo9mlza2q3/1582077202303vtjo9mlza2q3.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202303vtjo9mlza2q3/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/1582077202303vtjo9mlza2q3/1582077202303vtjo9mlza2q3.m3u8?Expires=1582531931&Signature=e8rdBmx-ozeZOJiTWzpGYRIviAf7iNoXjXzt9edsR-t8w~SPZRyK8dyhlrohUt5Vh3sPMlyQtfKAm1VuXR--WcNscFxib5ywczB1jIRDiZwceq0UDAlhH33pHtQ8zFCI731OnjRk9WFSZiIugupIW08p10N0Nd9XfyPU7w7oUc4pqrO8Fc7p4F82r-5D~yJYtziGQmrL1L6KCnfjmdNqRj3k0eu22cZvxf7kdjlscvgRrCp5DZOMYkB39~LYSpLpg2GzDNVFHqRXiWuWPzUCYf90s507HHklJ1SEWg7XAesnro1Clg0Fdee8R5xMpHUwQVt42Ay6jmOJIRxEOjCO8A__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202303vtjo9mlza2q3/1582077202303vtjo9mlza2q3-original.0000001.jpeg?Expires=1582531931&Signature=FVzm6KKVDxoUV46-1UCvT6oDdtTPbgIbTe3N6ZYwkm0AGu4GzCq5Hlt~HCnrlOJY3JbZQCNfr4rU0K~E8ONPQeJEpdkpke5H7BBOUQTbyZk~zdlyepNpLzvYCziRT16BpEhThfak07IkPKFR-UfRlKBun2kMu-AcxkNDCK54C9q3tu11Xn42nwj6EqtxW9LljhCkntEto~gA14tp~znJiYWqvNRkavhcmXjyVukA3KV9bgkuDoeKLlCgq32R0uHDFl1QfQvifCoVihS62K9TtJomWFtXW40viAGbsbua6RtWpnFen-V3sX6AKN2SdFEW2ijdZOxOt2uDjLi1xKtRgQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202303vtjo9mlza2q3/1582077202303vtjo9mlza2q3-168x105.0000001.jpeg?Expires=1582531931&Signature=Z0ywMmWu3dQyQxkdHuBtII0OxwGrGa6YYT-XjUhD8dYm6p0uDbzQ9jrwOOIHSDcjSayiS~Di2tb7IwEkVauNSY6ves5gQ2PyJJDI5jYfbFPLcHAZ9dkJzsffTySK6~O9p9wNAx6MGxV1tBkCnCUBx6zYPEOFQhn9RkAaAvLRuFIiddHd0QPpORMWhM1zYAmuZJC9pUD2Tp0e42wd3fzU7tLUF6auv94Rsg~uxDzfbbayY9NBf5qBHwqr6ENqCpPRa-2Ypb3Dw8wMCHcD2YeD7rJ4MG0NcLBRsCbo2Lth3HGK2u6BAoGKjObMqvixyvsj6hx4m3CF~RCJ59ZGLRvGoA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202303vtjo9mlza2q3/1582077202303vtjo9mlza2q3-416x260.0000001.jpeg?Expires=1582531931&Signature=fI-Bvwt525tR5MvtAdS6EEFLbyufCt7qWnz~wgZazlZLYfR189LYD6mkPhlprZh1PBAL5sZrpdSbM~KyAamb~rs5JQL4Ry-nPPC6qRLyvvPQfdkRHcZlTxgCPk3C19plLq22EZSRlFLGG3EkCYeKXyAxajJvQY6AFIq2bmf9k~4sBQbGStlvTFVRcna00GkLNiGkQsGHrJpJkhcMklRrj3zc9CD-lNN3IAM1uuA2FIHn0CBfUmNK9~w5Fs0QFWfasvqxxctRJWYsFSBEZhHnQBSdd04nT~F6GzsQvVjIN1E8DbTPnH4cf8FuUSoU1l1aKKkfwnFlHdPg5kr6cNOG7A__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202303vtjo9mlza2q3/1582077202303vtjo9mlza2q3-632x395.0000001.jpeg?Expires=1582531931&Signature=X36mLAwwIoLWxIi1Mwki7UzCpdxJSwT~86x7uyZv8zZ9OoFq9KLDtrbkvn8kr6-iDCTjuQkvVe429ScFa29s5k0mKB6H4W6zPtRnLQPrSKZgTcsMbHfnjsKZaLwkcjHTrHrnlU4VkUlM8-RI3jzCp3GaippZxzERjOnMa-w25-RtLhgiDWhriClGeeAM070ICtJh9pna2D4t3IciQxGA8cbr3QvlMSdGFFby7Lv~gNeRS-rSvBlSB9dOnWp9TPUQ4TRQblCaF5vgFvxPSZk7j-PcxKc-g1Wq8wXzhpTQ03mS91YUnEdBcy-thtppPtIY4dwGrSOiZ5v4SfYRwakctA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202303vtjo9mlza2q3/1582077202303vtjo9mlza2q3-768x432.0000001.jpeg?Expires=1582531931&Signature=TgTOcnkXKUYyCai1uDhpHrn6WAEqz6emjeVovKWwFnuwS8Obj5D8iIIHOu5lU7ULeHDcWYnTfktDyujDNHpHU62XnNa8lU1OXpzXFG4Yg6~dxkGfOKl6tvrrv5Gwi7DtsXIQtCXISP~3D3O5y3P6xIiwHJ9mOBZhCBUKMhY7vd4jJSUfLuffJX3BdDGB~mbXD6p0CVGh0-g0dNOwybGTM9eVichf9WjWn2xWN42cdDDS6Rewg1BpQoCpwTTR4~aqtnd6SODbEUDgBhrUNuK2Gxoc53lqEl7-Xs-Y1lKb58-CUVB4OznMpQyzQuyHZo98KHyR5xhvdULA~dZfaAW-gA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202303vtjo9mlza2q3/1582077202303vtjo9mlza2q3-200x288.0000001.jpeg?Expires=1582531931&Signature=YY~-AJrWixaqunIPP4otsbdQjH0JxvSqXEoC~yK04gwUmGaKf25Enpkh2WRjIJHOp0ZJATlror64WvOYde8tQyX8Vrge2QQyBvHB7cclNx9oZ5yWnW2q79bWLNFV8irGuVlB26WujZxYH7i-3Yo57ahXE0rcHTV~Kf-wc4QPPbrwEC6ePPg02~M97DappUrDA5ynXLzpnaMunWqlWRM8fGlFE-kY23730pi5Tso0IyEXP~73EZH39-aB-L7bEvujYcgrR6Spyis5pTPRneMQjy~yL1YqWbInfFyPluZQiI2RKlsr-ExwG-KImh6a1qobNm-fwWE0XOKGqL2-sLy5lg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "72",
                        captions: []
                      },
                      {
                        videoid: 1246,
                        videokey: "KWOS752NG4K3",
                        video_password: "",
                        video_users: " ",
                        username: "",
                        userid: 0,
                        maturity_level: "all",
                        title: "Permission",
                        file_name: "1582077202303v6715timgkd2",
                        file_type: 2,
                        description:
                          "Many a seasons have passed in separation when Ejaz sahabâ€™s path crosses once again with his wife. Will he be able to ask her permission to start his life anew?\r\n\r\n",
                        tags: "ep-4-permission.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: "",
                        datecreated: "1970-01-01",
                        country: "0",
                        blocked_countries: "#0# ",
                        sprite_count: 0,
                        season_id: 63,
                        series_id: 47,
                        sequence: 0,
                        allow_embedding: "yes",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 8m 44s",
                        status: "Successful",
                        failed_reason: "none",
                        default_thumb: 1,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "127.0.0.1",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "[1080,720,480,360,240]",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/19",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "2020-01-01 00:00:00",
                        end_published_date: "0000-00-00 00:00:00",
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/1582077202303v6715timgkd2/1582077202303v6715timgkd2.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202303v6715timgkd2/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/1582077202303v6715timgkd2/1582077202303v6715timgkd2.m3u8?Expires=1582531931&Signature=AgHeEbI6zG1xNZBRWwS-xlctPXt~YQgn8zXFBGo11F2kK5OircAtEeHiIxdsRk6OaUg3Um8K4lvepH76PEBkdX6GBFv9EAJn67pycqCYiOXBjtWQjw3gSVDQcWZ16KAZPEez0LZwIGde57V9OpX~2exEFO6Ny-QHTQEUQfX1gd1Rlrv96FhhCtX6k1~lFihxW8CeXLXIbQgVOJNVoVafkIjKy0yqIdMo-WBJlXvc5ObIcUe7-QInb-G7ApGHQe8poqVH7DJanIbuXjjZtNrLZW5UuyBP7qKAv3j8YmLTMYiIBKxVoeQZxhJU6qxoaeWCEiUI-46cjCPh2BONBurMVQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202303v6715timgkd2/1582077202303v6715timgkd2-original.0000001.jpeg?Expires=1582531931&Signature=SWj2aweWMGFVN29fJGYxUYKK8pDRdvIB6fZpgrOvyBSTelUSWFTweaSVHimBSxwRD~gGqxes5yX-A-x87nxdo-~d0czq4QEpKbSJBaLrh4aKuvFVvM7Sv0uKjf9LprWM7MFwD4dEnGLhJM6nsuRlX24TKbS0n1vvFOECHIQfV~7z4ZLkJ71hYdn4-TvD9vev9SwxtpPkterc2fHxaw5-PP7G8xvTI7IxqSM2Jv3XU-p2O9uFB4FsGu~bUB1ONHxDPngC5WM1O09zFIbwKjWV2kxjxg5nzUXrFZCxr7907j3eIl4-UfIfDZW4Ulo31Q-cTaEXdyuReKajBihs3~01AQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202303v6715timgkd2/1582077202303v6715timgkd2-168x105.0000001.jpeg?Expires=1582531931&Signature=BXhfGJbIK5aX9Bdw4TvY0HFDwNMsTOKKzsHw6JHcllxsgE03Y1me3HRW9Unhb8QYBdz1AFRDx1ldmtKHhirfqSM53BPcZUm6JO32Rfr9W7IpDv732nQvNp6ufn1JzGJSTOiZO~KjdYfT4eJA8tQJ3MSvdbznZ19QYpH2AH7wTne1PuDL5Jap-r2FZltNOEs0kwSVKopZzF2ePnKwbYa9syq15ZH3DNtrNJpfOONKQQ~oFlJ5~xfC1g2wcWH0TJf2J2TlwSa9NnEjf9VujAjJo~pUXjTBucbKg3RPz8IYGFy9mNWT0zmwUNKIl1aqOFeU6NTrG-T5o95KapCouKOSZw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202303v6715timgkd2/1582077202303v6715timgkd2-416x260.0000001.jpeg?Expires=1582531931&Signature=F2eXLHVOfwtNwBANtSUr0VQW3zHK0Cv4l1FcTLglfSe0YfUExnNnwrYdH9usrIT-VVafQ82IUCiRehYyvNOxZa5q~BjHYqI7vnGLKzQaRz5qPPbxs06XGs8hsQ~kZDL0yeFF8I3x~O8l9Mwb0suG~AzPAOeUY-Nsx4u3dP8GKzU3Xfe14E15DccbmVZdMc2Z9pO6hjGurzxYFYeJSKXp~RiDFitX-r5c0mQ3O7FpsAwcTClzcdNUHUrKw1IhX6ESj-oKOz3zAHqA6AGJMUY-Nw0QX~CDt3DKuFZicuNQKIyRD7YLMT6X2POMSz-lPFqOC5tPQFGTnkoUeZchxkH4hg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202303v6715timgkd2/1582077202303v6715timgkd2-632x395.0000001.jpeg?Expires=1582531931&Signature=IZC-lCR0LNSegOmR9XLymx62I2bRK52dmIk5mbJ3ydGXdKRSKxZqF500t9vK1f2lvp24gxeEIaxdznLyUWaZ~v0vbU6K-2E36Ieac4vePCGCGUOApB4DFCAtsidiN1adRxMHhD0T5ZllxXDhCiXNbZCEXG0QoQtcelH-aq4me~FS0AI8E3zS2egiw~yupe1gGcER2k14n3P-~i0fpHtNlRZ4GAJl~cWQQag4sMpQvorUK7gLxY4PLiNvRozYeTX8ht7qxBTm4dkGBrddEDzzwRnqkVFDGRq7Gin9~7ZSrXMhd-GPb9laXpbXyhjekRYs1OxJhrItU3P1G-mmsUbT~Q__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202303v6715timgkd2/1582077202303v6715timgkd2-768x432.0000001.jpeg?Expires=1582531931&Signature=amTnEg6uL7avTO98I2N3Lkh~pHpL9Enxj~5T2JN7ufcZqUG4lxALoxoXnW-OP~59vtT7R6nx01l43NfalWocbP4vr7cv0c0qGa91a9M9Lg7~jXHaW6YcGlvLE~0-74F3Z0-GETW53M48oAtkSs3z9hINoHdDDNcTKeDxb4uAFWqRcGbdUDzXRNWIXQ1D1bJEHJ1saf26nt-ANMgJ20zfS9nm9s95e175HGF9WDCLbilhm-uaLb7joolkv7wO2IKK1eOAHpPsoXhraFfQE71~0mznIvFmqQhZxuGcyKfFLP-2mbOgZOu9UEQ4ZBTYb5wqPwEoLWzSzlW325baQ3vedw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202303v6715timgkd2/1582077202303v6715timgkd2-200x288.0000001.jpeg?Expires=1582531931&Signature=eGGYn-v6zEVyy7VcRGXtZrYJPwk~v6550Hj-FjUh9SLHrakNogApgubCI0dQr-jo24JqOcglvqylozjVxE7gQnSx9XdMVZ1Sc5iywjeeMu7TY29Kig-GEO3mG7JaA1JE19mDmsgqFHPOjFc6E1cnWeM07TuC4NgwuyqsEjLzDQOYsxMayTV46XKhuidlvcT3wQQGzQfYUk4AeLMuS2n3RBzqsfhax~hOmv1E-nm40Ni5Qg1-8NEKouCtVotOotiaqRkjhiMua1khUSct9oDpUBtvYK86XEBUlAGraUBwNfC9Ec462Lh44hUalYXvaUEcgXZML-bLIc0wwId4OM5fVA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "524",
                        captions: []
                      },
                      {
                        videoid: 1247,
                        videokey: "1ANA3WR3WWYS",
                        video_password: "",
                        video_users: " ",
                        username: "",
                        userid: 0,
                        maturity_level: "all",
                        title: "Solicitation",
                        file_name: "1582077202304ju0gdw90q5c2",
                        file_type: 2,
                        description:
                          "In the middle of the night Ejaz comes home after many years. Broken and lost, he cannot move on, and yet can they ever go back?\r\n\r\n",
                        tags: "ep-5-solicitation.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: "",
                        datecreated: "1970-01-01",
                        country: "0",
                        blocked_countries: "#0# ",
                        sprite_count: 0,
                        season_id: 63,
                        series_id: 47,
                        sequence: 0,
                        allow_embedding: "yes",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 10m 9s",
                        status: "Successful",
                        failed_reason: "none",
                        default_thumb: 1,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "127.0.0.1",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "[1080,720,480,360,240]",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/19",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "2020-01-01 00:00:00",
                        end_published_date: "0000-00-00 00:00:00",
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/1582077202304ju0gdw90q5c2/1582077202304ju0gdw90q5c2.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202304ju0gdw90q5c2/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/1582077202304ju0gdw90q5c2/1582077202304ju0gdw90q5c2.m3u8?Expires=1582531931&Signature=cNiDTbruIUlNuEXHJJw0KeaWTZBM3bvsCCa3ACpRORVBv865RDtVUZzJlhYWMP8UKU1pjJWLgeERUvR0JmK1t9I64Ru12gwWxYKuHs9h5UXXRXCAQZ4icY4YQygSP~9CeHZK2N98fVxxUFJJx7~7WH6Y5RGhMh46ZIGRYrw-PGCflsdF2zLuX3kyToiqvIiKo2MHGRYtw0kWkWeaMT3UtibMCVHc2RabPLJKVX4WywhITz8NiiQHoGgKR7HXKPUgYRRcq~Rtg5STSMK626QC7RhJpquWVMYP5j5l8Mz-9u7GpgvPqBUyYnEzBvkZP87-zZ0h9wEGPOtUy3zKQYheig__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202304ju0gdw90q5c2/1582077202304ju0gdw90q5c2-original.0000001.jpeg?Expires=1582531931&Signature=Ifq0tHQFBAT-3bPlCr0UIGA6YQNmDNU4TyF7pIG7fHNf9~~bd8qwaFrgauPvTZGjoRg~fayOlQ14sg-yNyqt4mWrsU5TVCQuMU~hqIS94j6IJpaWswnJ5WEna3YC5NqIS-V2RthT~DDTeGjzSwZKpu9lITCJL93QMvjtlNt94o7YPhW2xFJx4pmoRfm6rW4ojGIxbLQbQVtQFmdZHxsYXzyGflayTLfK3vQ-cOZ64hRFiSwKFs5j6ZOraTMLBvD6qEnCoeSxW4W9aBo6o2MaTjlPQXHtyvX8Q7pQNVjWY22E6~92Tj-raSAn5LbhiX4uhTX1sBJy0vL~zUmrljeApg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202304ju0gdw90q5c2/1582077202304ju0gdw90q5c2-168x105.0000001.jpeg?Expires=1582531931&Signature=Ljw1jycCsZMK6if2yEKF~-CO3Ql~tDv3Gh7fcuZs6dVZU8HytDjmLL9kUMs1H6aiq4e1jh6u2TkRe~vEV2uidf8v6xhwsIKFc-35GFHv5faO4NXmF3NNDO2WGt3O7~O9pVgJkcmnVuBE1w3W-xeck7-amKFXLk2i6k-5qMY~zJmfH3q~GlUPe~L7qgT9F79piSp9axhwGfx~jm96MbEqauYJ-5d77F5pvrMrV-WJBxK4rNKcpmb8o~OK1V8GxJrHEHJwWvYPiN9Ej5Swdqe12VC1qrVsMJBTSRle~us16vdDZNwaM1WUzijb~8JEysqWBaDjKyFv-SAvoUQqBIMIOA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202304ju0gdw90q5c2/1582077202304ju0gdw90q5c2-416x260.0000001.jpeg?Expires=1582531931&Signature=NCBKtMSLJQvM1Lt8hkwdNuizUJ3b8FO01u4ukPJ8tiUfGHOgYW9nQTkfMRTcPCwlHGIRBobmPOpawdEfA2tBBq2okdX1w6qegJPlBkbZp~KaDIJrXuB-ic3FZV6EL6Ue0Khr92jPiF28SLjWmlytXGkrp5Dublr6eK6rKezfUlLrGJXM8f244dslligi9eTUCJzCCwBPAMvZea3T3w~Mx49nmPcpMn7F3SEr4csxVsQ59Pu6wd8gDGKvhKft-D6BZakU1G2OzdLxCvd9uJju3OeCFKWi8t6O9m07z24mi5oCMNb54rCWRLU-6GHTnO5dECUvzwKclNUwUAmwh7FgIQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202304ju0gdw90q5c2/1582077202304ju0gdw90q5c2-632x395.0000001.jpeg?Expires=1582531931&Signature=Rqs-DK9DTm4ri0AEeURvZrlhJWp6lQuwu1nV0Fm55A8SHK~7irQodPazFausQczMcrA6tha546JsiZ55z2yddh-KZRMrMdNGNWqLuMzUtNN6L1VqVomblUi7tFjoe9u9C0dZmSNd2zLcpg9gH6p-ElXgs9MbYlEQ8I0qLm5oPqOvBlN6twDGeRmaGiP~IMr-eLJRKnYmLVScNkqR~in45Zh1~ufONQuQ67zFi56Xmdyqlo-OZxAGofbJ9FcvrqiJLxmYIW~Mgfk7kKJgZHj8sc1AZs-iwMC8CNsBr~4OZHCM-TccFGBXHmmzn4qTMZ0QsQKMfd3oZrNjwI-~TuBwJg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202304ju0gdw90q5c2/1582077202304ju0gdw90q5c2-768x432.0000001.jpeg?Expires=1582531931&Signature=fndj8ywqgVpoCq2M16vFxwtTLDUmGQYNfY~u1owdB-cMZAp18uCWK9mZtbiLthK4dwpDEK6dt9W2NuYzBJE1QcB59~YzJs3rAoR3gvM5p7Ihg~~-1WrXNfDSPDsdPVSZLv4RYk4MlGyWqAI75SkJreK1qQSN1sG5PTRsQWI9TomnAwEOEhgCLNPl-BPv3USy1NNKUueBopJHcLfYbzT3uSI6SlgLZFv860~WVulR5Bc4l1Vgtq202i6JpAuKzId9iqfWOF3vRT~SQmc44Bcp74uqzxRzbVfPx7uPpgfLRrWcc7V5hpXAj6nAVldI~2DlGml~-qQ3s7KReITMMHb7mA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202304ju0gdw90q5c2/1582077202304ju0gdw90q5c2-200x288.0000001.jpeg?Expires=1582531931&Signature=Dt-STAvXiaNXXxqkbHjLtPV~CzS0OgkQtDJQmuTOmhh-3H4Jy7aLjQVbsPCaFCiWWsYiwyc368I9CUafSt7gVwU6~lOvxixCLPGPd-L4WdnaPC87RIiVyFegYx5V6qKjiwqCaROXocyjMJfHp5HYBVYdtQdkc5o3DW1YDQaRDX4L1v0h81iZWxIY-sIp4Q~3R1SZonY3JxisqUGpQ2DdrQvAvpNLdiySo2G~MFFGG4c1tlydd~t22e~Xc3dVz7kN91LC0zUCfMmV2y1GvqkPUUO2dJvGrlArsjFSD-Nc---OtaY~Jgh55FJ8JiuIPvRLkLN2B~0gfNOnWtThyBHCKw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "609",
                        captions: []
                      },
                      {
                        videoid: 1248,
                        videokey: "WOX4X5O1NM65",
                        video_password: "",
                        video_users: " ",
                        username: "",
                        userid: 0,
                        maturity_level: "all",
                        title: "Retaliation",
                        file_name: "15820772023055z9hlpemnd82",
                        file_type: 2,
                        description:
                          "Mrs. Noman wants a divorce, a new beginning. She has had enough. Will Ejaz sahab consent, Is it finally over?\r\n\r\n",
                        tags: "ep-6-retaliation.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: "",
                        datecreated: "1970-01-01",
                        country: "0",
                        blocked_countries: "#0# ",
                        sprite_count: 0,
                        season_id: 63,
                        series_id: 47,
                        sequence: 0,
                        allow_embedding: "yes",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 7m 5s",
                        status: "Successful",
                        failed_reason: "none",
                        default_thumb: 1,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "127.0.0.1",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "[1080,720,480,360,240]",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/19",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "2020-01-01 00:00:00",
                        end_published_date: "0000-00-00 00:00:00",
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/15820772023055z9hlpemnd82/15820772023055z9hlpemnd82.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/15820772023055z9hlpemnd82/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/15820772023055z9hlpemnd82/15820772023055z9hlpemnd82.m3u8?Expires=1582531931&Signature=T4pBJTHU97QcASLkgdGUxSzaeshfo8mvoMxDVyh9pW3nh6mAFF7MBDHzBmi~gpHv8aSrZ542mRqoCd2wPKfPeZS91fTUZ8qkYIuAfTgwQsTNExIqIkp1BQgZj-vIz3QcFZ1d-M~WMjf~xNbI~cw6ZEnQ7LOZ3KjxmoLmFWLezTg210xbW7HSXJo3h07OzwqELYXjH1jS-c21D145fA2SIivtXfRiUviaY4kBLF4pD0N5KuviIdPYAZc6iFwIx3JjQnEYmQ2Yf4LAVKPwWo~D1SDAkcXkpP-Gj8T0myhnXGFB9oe1J~XS0jCAHV5DnoW8y2Wff272ItQaBBVMRGxTgg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/15820772023055z9hlpemnd82/15820772023055z9hlpemnd82-original.0000001.jpeg?Expires=1582531931&Signature=DKF0fgS22fRjRqjE9R1k4WfDMaVl5SSSPn6geO0Q1ZiIh6u7PC28h0xfIKAq0difbVC3Q2gf9CpTKVEsGg-IUJ5VddD14e212CSGg0qklSZsRv1FDnXyhZpJ3RWp2TQEyREfIe~rbory2cqoLDBCItiWtk~AKGsWJoQWpa9Wdk3WNZRAj8P9p9xbM16Ro9Mfc2ncAgy6YCXAOuJ6AmnTYS1x8nYZDeG3TBQe8vffzBeLP7xFxmt7orUxOVWrID4hujysJvE8~pNVkOc8LLfY8-3jIwyeUi6JeYN9RmNj9Qq6H~z8QFDaQxzoh3fbayrxpoHuZZF8BsNTXdRlgjXHWQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/15820772023055z9hlpemnd82/15820772023055z9hlpemnd82-168x105.0000001.jpeg?Expires=1582531931&Signature=G7yXJUPYAhWTbQStKYmTNDwzPk0IkSmk3hKaWVqWDFfYqkWTSx1jnSZTlhzuwHXcXCOjb97n-txwgAiMa9l9tmWb67G0Gg9oTa9KSe9hCxYkRioKKnEY5ffONovYO~~uZRm6u5gYwd7npPjAWEbym1L3GQ~ZSpN3zbi2wuJ6in6a6oiqaDMc3wCW75Ul2KBvxgZXMDGZnyHi78K7i38RQwSkGxDWA2r8tLyOxwAaRWEkqJvkTWVVFubeumjOXTymqNTcZu4sQhkL1CnU3mv2toDRtc797ICFI5d84h02ETM4sOzf4aOAcd28L5PKsUrgRiLTZ9yqw8DIu3Xe7AcHOg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/15820772023055z9hlpemnd82/15820772023055z9hlpemnd82-416x260.0000001.jpeg?Expires=1582531931&Signature=NgDDVEGxQxXbJWG1pLosLp0iF31Yt20rKgCGy6c16FfM~ScdIFabyp3LAfLW56ywwqs2ZNJY1Hl~QOruOG5bLl4V6qaSU9UlrhsuLz7U8kBMPOXI-7yluk8MUQJVDLRNk9h0lS0x8U-lVr4RbF8fCMP0YgIpIOCNhPo23ZJm3tlrxaieGogDzAsIkvbrLz1FCVx7t2mcxYoyi8tI8sYblfGxWu7EkbbDdiVyA6We9vG1JJjZSqvWqfTTddJIAhBfAMhZYUb1WbZf-KHMrZ1zWD5zMqV9k82Vp3NvvkOnC2oUPdpYExIdkgN96EGmKq9ZES0XxG689F5HACCwyRMPzA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/15820772023055z9hlpemnd82/15820772023055z9hlpemnd82-632x395.0000001.jpeg?Expires=1582531931&Signature=GtIjvphPAZ-znpq6GEjO3A9417L-nBAq2KSnZBcdwWO48FFSJAH7UpYqVsyFYEaHYvmuKkLfucVg2TFObTNRXWaDZ6OSWv7ijK-9rNXYyg7U7xMYp20Mc7qRj2zP6C4-096BibAAUMLkmeWuk6PY9VUzfqdH-Oh3wHIIbX6JWmu1PhQc~-VFyGJYPEL4cvVObiZ1hdYG-IzakcUlQOGikJhZ17-XwBfQHUSs1UT859U4ONxXJGzKXyC6xFa0AWHpUJEP51LrQoDFfsYNiQAUT~Yz7VLoLDdkIWz~w7DjFcINoMGTzsofYvcbyluGgOWijXJpQYxL3e~MT1ovq5dmbA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/15820772023055z9hlpemnd82/15820772023055z9hlpemnd82-768x432.0000001.jpeg?Expires=1582531931&Signature=YjI59KFqBOAcyYoEi6f7mrEVWAentbLk9i5zpVAmPg3egidG4H3j-kgFIOpzoAEbN0WEQwvvC~ytQd8~JtKiVvI34VhxFdkBEwxbVW9TRO363Ra~b4Bc7Fbca2ATcD7jMCnMQXmyVJFKbwvXS2BSpuSuxaVXuGWVck0kRI7Q5LiuwgsTHjaSEDf-zejuTasYPeFuT8QE220fAKwSjilpfnVn~E-aHv16cytF4rTRgB3qpXgHot3tsFXnmdb28vaHiR92tsQWTRt69visFaG9SByA3YGuLrgw17OOQ6ju6D~~8jSeY~e4eOvT4j0YNyeChfySb2KkXKRg-rtw0fp28Q__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/15820772023055z9hlpemnd82/15820772023055z9hlpemnd82-200x288.0000001.jpeg?Expires=1582531931&Signature=gKY35~7lgYempA0JeovFjnkjKiUT95U9c6BwYS9pourMninQOPP2XYNOnKyWYpN2vyxgl6xt3mBaXlMnVcHOJrTv9iL1nsVe8Fu4IYfdT02vJXdkwarHTForGEJtmdTOZkUVRUHrWpibBZzORvgGo8GNmFGWWeV7YA3p-FOp4lDJvmmKs2nXWGXW7mMM3LS0abNH76O01qi0H4TSdFtc8gJpMmcJ3RbkkwCULphAD7O3zxRwdWkOvHJWafx2pyMUuMA58PZbTzMuFaaen6X9ErE8ZmCUygums-v6P3vel0KlOaGuXBRfIDTb2pV~re6yKRNtjD52J5d-0TnLFZfBfA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "425",
                        captions: []
                      },
                      {
                        videoid: 1249,
                        videokey: "USUUAUH329YK",
                        video_password: "",
                        video_users: " ",
                        username: "",
                        userid: 0,
                        maturity_level: "all",
                        title: "Realization",
                        file_name: "15820772023060u9dw2jlg8h4",
                        file_type: 2,
                        description:
                          "Tragedy has a way of bringing people together. Sitting in the hospital, both Ejaz sahab and his wife, for the very first time, reflect on all that has happened for so many years.\r\n\r\n",
                        tags: "ep-7-realization.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: "",
                        datecreated: "1970-01-01",
                        country: "0",
                        blocked_countries: "#0# ",
                        sprite_count: 0,
                        season_id: 63,
                        series_id: 47,
                        sequence: 0,
                        allow_embedding: "yes",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 9m 20s",
                        status: "Processing",
                        failed_reason: "none",
                        default_thumb: 1,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "127.0.0.1",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/19",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "2020-01-01 00:00:00",
                        end_published_date: "0000-00-00 00:00:00",
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/15820772023060u9dw2jlg8h4/15820772023060u9dw2jlg8h4.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/15820772023060u9dw2jlg8h4/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/15820772023060u9dw2jlg8h4/15820772023060u9dw2jlg8h4.m3u8?Expires=1582531931&Signature=Zs6jlrYBaBaqLVozXG55r9rshUXcB~ViknNVwmkRmaVP~YE44vI9IKD23kxmX2vqc6A-yhY1nnP3BKQP7L4houloJbA50RWxZHjC7rzWgAUVzaQABF8l5C3kQROOwxDlOpJCuCmx6glw8IEKCJu7AXdfzBGcsM9Lg9qeTMkwgVxRlxdLv0nXw32W6juC-TRqQfvzfjIHjUlo-MfPb~yc6Jj-Cv7v1UJ2AIVN0DlOJbEe~iFszqJHqPkL-P8xm-tffbXf8FrKG4UP8nAv1-zb6jEekMEaS7oeR0ZQx-MFyfbDvbKkkFgamArzPbtTMU8keg3RtDcLxHOtwAT7DPGJ4w__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/15820772023060u9dw2jlg8h4/15820772023060u9dw2jlg8h4-original.0000001.jpeg?Expires=1582531931&Signature=aMmpO0L8MIJ1fqyphEk50dbFr8E7KYCG8u1pP~ALvFo4GUvUramndUyLMFzLJEeIc7GaDqG-ou3kk1DwmE4-3EoX-ZexZPemYs4x6HGaSFlEcD0UxIHI7-4i0ZLjL81bHSWErX5gJhlwyQ2t0je~fyvenohlAwXGK9He0axalgwU-oOaanlhmhy2o6Eso~cPrS489ry7ddNiW4-qNtdlZCg6RVzGAYUgkjX1SfjgBXFs3X4m32KpZlrsa5eOffXAfkomsX1ct9FYvqX5tAldn6ZB6yk3KEaizhkSxC1dD7e0o3CiVmEcqr1-mOAx8lIs1tBLMk6Tl0oER54UQbyqAQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/15820772023060u9dw2jlg8h4/15820772023060u9dw2jlg8h4-168x105.0000001.jpeg?Expires=1582531931&Signature=gCjK07pBmEyOeipzzSuCb~2cMOiibL57MIiRTP7KzjzW7FHnRHrwONKuPUNsY7~WNpEJTeWI6CtU2Yvr15Jt3dy896bZcncaonkrNNya6pNB7nfdXpdr8X2QF13FruttkWY7bt5qgsH5xcI5-0CnUJD2Q3RK0uGAAh70sKyuTklCKg~7UF-QiBIPTvm06NuraRaXPuHOAzaGffIX-LlzCMxRjwP2eK5gz74emUu6SQRS2VxUI1-ChsTbNJZAcqQBpAe76QCOgxTb7bsWPcBIfCYYieQ5LX-M2zOpYl1-474MAy3NNtiVO-YALF8wrT6CAaQG0umltRuFGhdL-xd1Sw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/15820772023060u9dw2jlg8h4/15820772023060u9dw2jlg8h4-416x260.0000001.jpeg?Expires=1582531931&Signature=CfszlqSOo0HgEVKMUD~SgO~z~lsyRtcLxolvp0~R26iM4TrAdPDHLXFW2CnW1ey-OnqBT6W2mLEjWMDHW6SeohvOHLHqFXLqHPYq~FrTnw2GsTRJPBKiDdPREcDWAofyaS6HvLlHZv5nTNlPLNDk9ILxayiYfAcpEjgGHqBWQ4D7BnnoSMFJ40nYzxRJdAg-KhHpZ2cdO5j97Df2u2lHJqoF9XHhKet-~XE8RA5a8JR9q9g5jeE6gFpMsFenwXBOYlUREvZDejIxIJgOFCgzAYOZw2nUYYptPeCws3d0LFWBDGPh3W4UwIW36UMDFCun8Xk~4D6B8DmFi1SMR6WAUQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/15820772023060u9dw2jlg8h4/15820772023060u9dw2jlg8h4-632x395.0000001.jpeg?Expires=1582531931&Signature=czp~2ymb2VIyGRfWmCw5C6vjkheAuf~~akxy1~9i23GRub0ObqWrbmptS7yjROLN344hUMdoy2g2lTZtHsQCnyLfGx6DvftRSsdESyW58HYsFucDPK~ZyYjiwdDDvsW5doVk7IOWGcXQtEYkLTIhkadz7jGTiqLdWy2VmKgeRKzrYyf5HhAeK3VuYQIHNmxkYMgjpTwknax98214eP~bIUciho7xJBg3nSrZOFTbKAZNuMkX7Rs1EcnnKysitSQwhRMkxRnPp-K0lOaUfJ-f0cy45UdjvYFylbtyhiRjc7pgXWA9O-8zGT0eac2YJsz5UeAALl45yqO47pktujcfxA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/15820772023060u9dw2jlg8h4/15820772023060u9dw2jlg8h4-768x432.0000001.jpeg?Expires=1582531931&Signature=ByCHn9tSBPzxuz~1rTvvfDEwHhHos-IsnG3YAdcYtt5dd9GncMiQxCitgkcvhDLdUNsdmLk-0DlviPZPwy1xvuegLJjMdzWv~94a-XjFJDYLSrcTAhIVHrvvRz28FJ5MvX08Kjzp7y52jlwR7Br3lbn7EQfNGvIuCnvrBZEq-LykS8duPWnEQpcCAvOWYloxR-NJIlsHKAVFsVsW5lBiXCZd7AWvAG88IppvmgJioB6gFT8pQb~qAftJGJd-DyAVug5G82iTtYCr9bNsxFMoAib7Khb-4voVEgc7q9WDvOrX1J7oVs256mSpIn-4umQPjnyfDquBsmn5X2q4fQby-w__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/15820772023060u9dw2jlg8h4/15820772023060u9dw2jlg8h4-200x288.0000001.jpeg?Expires=1582531931&Signature=FCrNxMGFu85Im87snOoQeZYTQ84VNHhjmqWis4lEY53a~EKrkUgSYtW80XpwBlseq0MzsgcF7GPKou37UWjBax81mYX5sgsSqZKe1CRiJDhnIy4ANclz2Q9G~8a0MunSYLePPrTowHTTtQqLDeAufaiX9E6xeIFMX7yOc49OOshlgnkJElnWfW-T4B~4tAYmNguCvoEcDpKzWubMBY1oZ-ODPWe1A7dM97TSNQ6hdhCZ4ohswG38vZK6OB3a3nc3URy4qRe09Jy1d8fqELh6NguXcJotoN5D3ZA4atoaHOrFLymrGoXSXebp2Q7JQbto0NmpjbNqg9dcw55U-wCk1w__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "560",
                        captions: []
                      },
                      {
                        videoid: 1250,
                        videokey: "7584HB34YHRW",
                        video_password: "",
                        video_users: " ",
                        username: "",
                        userid: 0,
                        maturity_level: "all",
                        title: "Invitation",
                        file_name: "1582077202310uh7l406x1e7",
                        file_type: 2,
                        description:
                          "After a decade of separation, can Ejaz sahab and his wife reconcile their differences, or is it already too late?\r\n\r\n",
                        tags: "ep-8-invitation.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: "",
                        datecreated: "1970-01-01",
                        country: "0",
                        blocked_countries: "#0# ",
                        sprite_count: 0,
                        season_id: 63,
                        series_id: 47,
                        sequence: 0,
                        allow_embedding: "yes",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 6m 40s",
                        status: "Processing",
                        failed_reason: "none",
                        default_thumb: 1,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "127.0.0.1",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/19",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "2020-01-01 00:00:00",
                        end_published_date: "0000-00-00 00:00:00",
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/1582077202310uh7l406x1e7/1582077202310uh7l406x1e7.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202310uh7l406x1e7/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/1582077202310uh7l406x1e7/1582077202310uh7l406x1e7.m3u8?Expires=1582531931&Signature=KhMZ9cSvuWyl2eKuwT9hlb2dtB6-0MCE1zFZgeP9sydH4YdnG7cqiw0q~LN9x3i-OFU-RyYrt~PCTO65QgfAiL9wh3qJ1gQslY3EwAuTT2B6MgEMg67epu7jQUOv8uKJwaJMvSY3hd2KeCYHcj8isUVBxA2JeBgimI~NjAVjpWPvHZAII42U-vY0gm9zZ3LZTrqgr2kuKJ6WEexvpdMsxKByb1O7Dp8nzTEFcU9YfFuZd-oA7b5bhEi28XXau3B~KcarYEVsrfqtJu61I71SI-laJXb5KWQmAK8jd6j6CT48yJaMxzLzsrowkXkLb8b0prVDasGB~jLPPr8MkVv6JQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202310uh7l406x1e7/1582077202310uh7l406x1e7-original.0000001.jpeg?Expires=1582531931&Signature=Wv0~dMevy0QE7Q65zJ9UtePt2UmmTFsT4AhXxMLa2Ab9wXAZAfOm9cg-cEsLsO3VnTo-m7c5LGW2nHyumvqMhFN6Q6nG1V~6COIK5A85CPOT6bBXWOb4BXz7CSacZMXRYHLzs8Ncy6YTkyk7akReeII6Jy2danj0cJZDYQ5RM7BuuqGXxqDp1hdmYJLrKZHCm7CJqrPVxTAI2JIKyfRVcgi8zHN-VDKvibyvYGDjOmJzePuwrLa1FLUGzpR85t9AuVQPn19B6dbZb4nMdFnZC82jKKbE81uGVUTDDsBMM-ZhvQe2a4qBJP3ec1b4qMTQAU6vMATUpitDIA~Sw-VUGA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202310uh7l406x1e7/1582077202310uh7l406x1e7-168x105.0000001.jpeg?Expires=1582531931&Signature=E0Bqo~skslMB-OI9u9Td2qQ-pM7g90ihDgdvJRNO8AyFeCPCKXZ5kCqg1YqQI0vE0c47LHcTIFXHwPSmSt~PuKD3SAynI0Klie-DswvBwt~rjdm9Yxt8GV4sbK~Oe5lEnIZIdMPKTa0-kFjpDfvsaPXHxidCj5u5SlMjWzss3KtTxdJmpl2IVrvcetuE5irUlGNYysJ2AdTBDM8vOCHDGegYR3mXKrWC-z7L5DI2djyl9cveHqz61uLh3QZHUhTFD-iCf8SEyxai111V0pfgJ0eIFukKqQ5E4F1~epEnEI57tBxnwQ2N0c-CelJpnsBpSzQVqxXJhbqrGD-3iZEXIQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202310uh7l406x1e7/1582077202310uh7l406x1e7-416x260.0000001.jpeg?Expires=1582531931&Signature=Mm4ff5N4jyeF4TK7dM4fvsxz7v5KCpAstvLvTK9YMw5oaiZ4Q5D44uozDyWgZnTuj9Y13ehlg6I4V0iASxuXzgSy~GohtrJqj45L02LV7LtVf-ZDPkSI-RwA2Lget1~gc9hirDxB4AWbKqnKsHZfSOPGfKrEkslWtoQfKNklvrFRybi5WjF0KwH3OaiiHKLH9s1PA~jGFct7yLfOBMUrOC-t3EgJGQ4UUh~li7tQ8NR63qAGz0StdmPqVhfmBAgSfotAFDrKxi9MgnyRy6Gnpvc7aJkpgJ6uCzT~Onktx1BNTB6JP1BV8HnPb1ri3UsS1uXDO4kb2yZNtBZA2QJ~rg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202310uh7l406x1e7/1582077202310uh7l406x1e7-632x395.0000001.jpeg?Expires=1582531931&Signature=RjefACkBf9YwEMi6vgK6xjq5F-iBkv0FkyFKHg5eSDme-idB73yk4ZulrfkbbOnMjeDIH0LSVenpFOYqJtbiuC~FUj0MyZDagVPiGbdxurYMCmG4NOrWaaHVl9K~pNrhd9Kr23CgDPuer0YLyej7ugEeg0I~-fOCwvsGKM5Tg3Nj18DcEnNluu3I14XH5SN4WUZA08KzztToAYvGhiYD0Ozbv7B7~ZPtcxMNpqzHStfNSWxBMARjCabDcfEAZawXmZsR9q1PDRnjBoKloPFlOcY1CCdciIwCkyk98XqeaZQlk~EIHs0inJGi5CC96acu4DfG-MSCikvvPMOJtbxoVw__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202310uh7l406x1e7/1582077202310uh7l406x1e7-768x432.0000001.jpeg?Expires=1582531931&Signature=Lw3XaWdLgsZ9HLSMZLJVmMxGxO5iDUGltf73lXNFkRVJoefys5qpyMBE7OJkgj1NkSFQE9lUhwvMWiDLiXX4bhy6zYzXBz3J0KHWJ0a-~Hs2LJ1VqBxmzxx-H-3VsjiDOfGzgKmtDeaZcJVgYlnHke2Pibexe3RUDVSbBVSZghG3jS3eSdQWCPHXrtoDc~ViWCZA1rOq2XNrFLXyk48R2L8qTAB7QN6cyswCPWhBR2WlVGLP61BT~njBUFK-I-c4zQIDC6SbCj~qrJhDHU2JDV7nTQ~sqbXUcA~-vsxNiXwaLqZYOB3VYnK-v2k7~-7UhKwnyQvRmLha7XM2lM-wSg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202310uh7l406x1e7/1582077202310uh7l406x1e7-200x288.0000001.jpeg?Expires=1582531931&Signature=XyNmxJr-sfFa0TpFFNXMiiEDuY1~2SoAHISi4En5d2MmIn61SBu1v--FJCxawRNHjYuwQSchLXFeyb4JqCAPjs75g2KMPJ2YJYvonsksgASBi08KpjluSqX2tTApzX-nky0J5EUPZjOPx5RlQa~HZwhDWvOOwGF0I4p38liEDMWY9A3iqxy0KRGRKRyIUPcBUz~pMvpy6kn3vMKzVukWK2EUHXwvYMyJB16jDbsfjEzBghZNM2nEqaYqPTJ8FGIHGx5p5Hz9wZBHBG9vuKq1PLcC5yxoZdyY7zfM6gL3mKgmvigsAlTMEqCDmUOzqjtfPO7oVFeAE0Yyqptv5TsBpQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "400",
                        captions: []
                      },
                      {
                        videoid: 1251,
                        videokey: "5H2B49GK76AU",
                        video_password: "",
                        video_users: " ",
                        username: "",
                        userid: 0,
                        maturity_level: "all",
                        title: "Revisitation",
                        file_name: "1582077202310pfxctt0khv6",
                        file_type: 2,
                        description:
                          "And they lived happily ever after? Noman sahab and his wife, and a journey of 25 long years. Of love, life and loss.\r\n\r\n",
                        tags: "ep-9-revisitation.mp4",
                        category: "#12# ",
                        category_parents: "",
                        broadcast: "public",
                        location: "",
                        datecreated: "1970-01-01",
                        country: "0",
                        blocked_countries: "#0# ",
                        sprite_count: 0,
                        season_id: 63,
                        series_id: 47,
                        sequence: 0,
                        allow_embedding: "yes",
                        rating: 0,
                        rated_by: "0",
                        voter_ids: "",
                        featured: "no",
                        featured_order: null,
                        featured_date: "0000-00-00 00:00:00",
                        featured_description: "",
                        allow_rating: "yes",
                        active: "yes",
                        favourite_count: "0",
                        playlist_count: "0",
                        views: 0,
                        last_viewed: "0000-00-00 00:00:00",
                        date_added: "2020",
                        flagged: "no",
                        duration: " 3m 32s",
                        status: "Successful",
                        failed_reason: "none",
                        default_thumb: 1,
                        aspect_ratio: "",
                        embed_code: "",
                        refer_url: "",
                        downloads: 0,
                        uploader_ip: "127.0.0.1",
                        mass_embed_status: "no",
                        unique_embed_code: "",
                        remote_play_url: "",
                        video_files: "[1080,720,480,360,240]",
                        server_ip: "",
                        file_server_path: "",
                        file_directory: "2020/02/19",
                        files_thumbs_path: "",
                        file_thumbs_count: "",
                        has_hq: "no",
                        filegrp_size: "",
                        process_status: 0,
                        video_version: "2.7",
                        extras: "",
                        subscription_email: "pending",
                        thumbs_version: "2.8",
                        re_conv_status: "",
                        conv_progress: "",
                        is_premium: "no",
                        credits_required: 0,
                        premium_cid: 0,
                        in_editor_pick: "no",
                        has_subs: "no",
                        total_subs: 0,
                        last_sub_num: 0,
                        live: "",
                        start_published_date: "2020-01-01 00:00:00",
                        end_published_date: "0000-00-00 00:00:00",
                        has_sprite: "no",
                        version: 1,
                        has_resulotion: "no",
                        aws_service_id: 2,
                        aws_cdn:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/1582077202310pfxctt0khv6/1582077202310pfxctt0khv6.m3u8",
                        aws_thumb_path:
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202310pfxctt0khv6/",
                        aws_migrate: "no",
                        aws_thumbs_count: 5,
                        files: [
                          "https://d2o1c9j7e49z0u.cloudfront.net/file/video/2020/02/19/1582077202310pfxctt0khv6/1582077202310pfxctt0khv6.m3u8?Expires=1582531931&Signature=MZ9aTWd0FStdcL48ZlrLDmDw98K4UMx3F9VrtfA-HmIz2XAIM0b3uD3Yco14AR41NbTrHGQF6Y4lLo9oMHxo~blCk1k42MXArRATjlYRZMNqRoGJHKzhx1xSZhGwAfUT2BqcViPCNNyk7X0Yv-rEZixuaT~Fw33cOuTEOT51kdpyLDLJmmEcySagwv0ZCRJ1YCeXbFmC9eq9b8nebTRLk5X74i0lART3U-JSjJJEASdZw680HqY2HW3UL-kLDVuO-abJ0O9hpH1OqI7ZDnQum69u4WzWhHRDyyVbpPO6WXJ~nNwpW2VRnpwR8S2g6ohD3-QSehimMz3DWLfGfTwoZA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        ],
                        thumbs: {
                          original:
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202310pfxctt0khv6/1582077202310pfxctt0khv6-original.0000001.jpeg?Expires=1582531931&Signature=QvhONJiJVRDQSUueZDm3RT3mURMkXZw50e3RhHR6vTsUBJim~1Ym9QZVXwEGK040EHv1xgUFbgjG7tkPlF137PeJu~6xrxV8nNvj3UI6qQ0smqSZxmRpDo17A7Ah9ZYUhFObX90MCtGCSnhGJWSth-XkGfWeZ3nXV40zKcv3lSzqI-IoAtpdInyB86FEzbK0yKnkO5czwG-4KGG3s8jiq43yuGUjr5pjNDoLRWGDNfZTwH0~~BrkuuWtRZwxXQljfRhHexDZYTwF7kPcnW~WbRLDYiATeBuXUlJYlKLXrA~YIJEimkAKo68dYXS9-lAEM~GiDRD-975O8Urv-8dmkA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "168x105":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202310pfxctt0khv6/1582077202310pfxctt0khv6-168x105.0000001.jpeg?Expires=1582531931&Signature=Esnc5fpK56CDUlvqzvt1CsqMbArm2EhqLG9vJx-ibp-b9yi7tO41pEdRhS5PRfDdupSzHTdLAPCE9~kfqcuoDEXqu6c9BjgArTCHLfYcT4nL-65xEsBgkQAIzc4q-APdRF2F6E~yZnVvSmyPvDGHyLO1r6EJwOWT41w-eZQGAzhNc0LStbvmqO445O7KStWrKlbylFy-izpkdx18O46KzQxsPssSdADBqGtSdLqyBFUYeHZqiCnREX4JC4SmaqV5~SVmIKOyJcmQ7kgFX3eVIJjdeWFOr8LuB36g7B-LVY~cxEylU~gizsMlsZs9oWDOKSaXGOTPyb~Jm23Xb4q2FQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "416x260":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202310pfxctt0khv6/1582077202310pfxctt0khv6-416x260.0000001.jpeg?Expires=1582531931&Signature=IQbWzQ3~wI4unOSTmkHCq8NehxF6FK8GvaKhx5oo7bCftT3bq5gJ~LcQlvKuWX8NWKDQwLtC1ip-hG~oG~zZGyhy2C038NNdLDPQ3XCmIzn5GlKrqaM30PcaoJBDMT11qlpaOFghH7m5RrMlMXAmXGuGSGXVFd5tm3l9yqhs47sJqPT3YOh42TB2ZqB61ymjj6jgEz5KE4eBJQTrXeY4KRPrGRocuVzga7rD1rfHAMa4c0TqtSsnnhy6Qn~7Vuz9XHkQOAW9EpkTb0h01FlmIl7nlXmXPYoaq0auOC-~KBft3-nKTfCsSEKN3gOYJUfTmjmaFQKCgJRG60YHL8FCCQ__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "632x395":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202310pfxctt0khv6/1582077202310pfxctt0khv6-632x395.0000001.jpeg?Expires=1582531931&Signature=DOZ2FucfWnKlkuhY8kZwSIp9~oZ0TJ-6p7yjjM~PFUqQdO1gwlZZfk5y15x45Z9ZP9uzDgR5rJu49hidAiVn7VJvdiIZuZAUdVrGW885tfW03Hlrso1uaFfpuBscqM9mbpFr7I6viNlUaEDLYJpmEuiQQxLVuczYfdcOSN8ccLkuUuXnkvtEGmCpv67w4-zqOcIoRxCuLnAUIm5aPD52F2dVuMhw8V842BW1vuF3r-oSgZXjiE98NK9wvsTGQCwrhcJnQsTU50~M8ohZ12gDsJN4288Mxo09ddB-2lH4G4IBlek8pDdQCcvVPJv2RIrEfaDWJTTH2vrTKSonKaqvgA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "768x432":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202310pfxctt0khv6/1582077202310pfxctt0khv6-768x432.0000001.jpeg?Expires=1582531931&Signature=eUd5psHZYmO85SRqak~xHyYhP56VyeeMvYTW2JEfWl4IFt0zzuEkNF5w7zEKfcTwfKO9iXgYlkzCYI7p-64YoOmeq1BQOipupZUw~11OmGBlqeNHhzm5dzsUkRbHQ3WeXNk4~nAfZAwYat1OeoziINObpeGSpWcnkia6-sqfgLsSfJ8HG60fIJS0ZbviabFf~Gd0wFxxwcPyoEkve0h4GLvjexFLmfurlKzTh-r1yN3MINLjAst8YD98UtnQv909NI4cQC0wnOFJJIr85UsMlkrLvHSDhoiNFAiNQZaf1ErxeSG~TSgF-W9bddAelLBCyZpqKfcyh6WWDVb9GFzfBA__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A",
                          "200x288":
                            "https://d2o1c9j7e49z0u.cloudfront.net/file/thumb/2020/02/19/1582077202310pfxctt0khv6/1582077202310pfxctt0khv6-200x288.0000001.jpeg?Expires=1582531931&Signature=ZP0Io2D~Ue8ia31Wo9YIQYZVRIEn8eG9e8mFH5-xF5OJEFvdSZeSLvRw-VfZxZJFj-cvleVYpElrWtDK1TBkENm8liSfOzvnSN9aISQ0lFdbqGhKqedofY497i7sx6IoazRBRRLXK4CVZgVtWTVk2RXB0obOEVOeF8y2HmFCCxfyjB~vPpkeakwaWmsliNq8GWkSJvJiNMdzv-60K8OALK3WZQZEwdQFvG7pRrP4Ckxv0T~7hOhk31yAIiO-c-c6dOYRnsR0EDe4NV9ZE0TzFpVJfUellnLbBaRN9RnPj-0Codey2ctRDtktA8sI6ZG63js9YtCbOTaGwTdCBGFnLg__&Key-Pair-Id=APKAIB4AMB4X33ICZZ3A"
                        },
                        gif: null,
                        logo: null,
                        sprite: null,
                        categories: [
                          {
                            category_id: 12,
                            parent_id: 0,
                            category_name: "Action",
                            category_order: 1,
                            category_desc: "Action",
                            date_added: "2019-07-23 09:31:59",
                            category_thumb: "",
                            featured: "no",
                            isdefault: "yes",
                            navbar: "no"
                          }
                        ],
                        interval: "212",
                        captions: []
                      }
                    ]
                  }
                ],
                cast: [],
                director: []
              }
            ];
            this.featured_loaded = true;
            this.dataLoading = false;
          },
          err => {
            this.dataLoading = false;
            if (!err.response) {
              this.$store.commit(
                "snackIt",
                "Server isn't responding your list can't be fetched"
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    },

    closeVideoDetails() {},
    setTrendingSeries() {
      try {
        this.$axios.get(`/series/listing/?in_editor_pick=1`).then(
          response => {
            this.trendingSeries = this.trendingSeries.concat(response.data.series.featured);
            this.shuffleArray(this.trendingSeries);

          
          },
          err => {
            if (!err.response) {
              this.$store.commit(
                "snackIt",
                "Server isn't responding your list can't be fetched"
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    },
    getPranks() {
      try {
        this.$axios.get(`/series/list/?series_id=51`).then(
          response => {
            let tempdata =
              response.data.series.series_by_id["0"]["seasons"]["0"][
                "episodes"
              ];
            let data = [];
            for (var i = 0; i < 8; i++) {
              data.push(tempdata[i]);
            }
            this.pranksData = data;
          },
          err => {
            if (!err.response) {
              this.$store.commit(
                "snackIt",
                "Server isn't responding your list can't be fetched"
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    },
    getUserData() {
      let obj = {
        msisdn: this.$store.getters.currentUser.msisdn
      };
      axios
        .post(process.env.billing_URL+"/user/getStatus", obj)
        .then(response => {
          //console.log("response daat", response);
          if (response.data.status) {
            let user_obj = response.data.data[0];
            this.$store.getters.profileImage = response.data.data[0].image;
            if (typeof Storage !== "undefined") {
              // Code for localStorage/sessionStorage.
              localStorage.setItem("img", response.data.data[0].image);
              console.log("Setting local storage");
            } else {
              console.log("Sorry! No Web Storage suppor");

              // Sorry! No Web Storage support..
            }

            this.$store.getters.currentUser.is_subscribed =
              user_obj.status == "A" ? true : false;
            this.$store.getters.subscription_status =
              user_obj.status == "A" ? true : false;
            this.$store.getters.currentUser["plan_id"] = user_obj.plan_id;

            this.$store.getters["profileImage"] = user_obj.image;
            this.user_status =
              user_obj.status == "A"
                ? "Active"
                : status == "S"
                ? "Suspended"
                : status == "IA"
                ? "Inactive"
                : "In Active";
          }
        })
        .catch(err => {
          console.log(err);
          return err;
        });
    },
    logData(event_name, seriesObj,videoid) {
      this.$fireAnalyticsObj().logEvent(event_name, {
        msisdn: this.$store.getters.currentUser
          ? this.$store.getters.currentUser.msisdn
          : "N/A",
        video_title: seriesObj.series_name
      });
                 this.$fb.track("ViewContent",{
       msisdn: this.$store.getters.currentUser
          ? this.$store.getters.currentUser.msisdn
          : "N/A",
          videoid:videoid,
        video_title: seriesObj.series_name
      });	
    },
       getlatestRelease(seriesLimit, id) {
      try {
        this.moviesloading = true;

        this.$axios
          .get(`/videos/list/?limit=${15}`)
          .then(
            response => {
                          let data = response.data.videos;
                          this.latestRelease=data;
            },
            err => {
              if (!err.response) {
                this.$store.commit(
                  "snackIt",
                  "Server isn't responding your list can't be fetched"
                );
                this.moviesloading = false;
              } else {
                let errorMsg = err.response.data.errors.error;
                console.log(errorMsg);
                this.$store.commit("snackIt", errorMsg[0]);
                this.moviesloading = false;
              }
            }
          );
      } catch (err) {
        console.log(err);
        this.moviesloading = false;
      }
    },
  
    getMoviesAction(seriesLimit, id) {
      try {
        this.moviesloading = true;

        this.$axios
          .get(`/videos/list/?categories=${id}&limit=${seriesLimit}`)
          .then(
            response => {
              // let tempdata =
              //   response.data.series.series_by_id["0"]["seasons"]["0"][
              //     "episodes"
              //   ];
              let tempdata = response.data.videos.category_videos[id];
              let data = response.data.videos.category_videos[id];
              var self = this;
              self.featuredMovies = [];
              data.map(item => {
                if (item.featured == "yes") {
                  // if(
                  //   item.featuredOrder
                  // ){
                  // self.featuredSeries[item.featuredOrder]=item;}
                  // else
                  {
                    self.featuredMovies.push(item);
                  }
                }
              });
              // for (var i = 0; i < 10; i++) {
              //   data.push(tempdata[i]);
              // }
              this.moviesData = data;
              this.allData = tempdata;
              if (seriesLimit > 10) {
                this.allLoaded = true;
              }

              this.ComedyData = this.moviesData;
              this.moviesloading = false;
            },
            err => {
              if (!err.response) {
                this.$store.commit(
                  "snackIt",
                  "Server isn't responding your list can't be fetched"
                );
                this.moviesloading = false;
              } else {
                let errorMsg = err.response.data.errors.error;
                console.log(errorMsg);
                this.$store.commit("snackIt", errorMsg[0]);
                this.moviesloading = false;
              }
            }
          );
      } catch (err) {
        console.log(err);
        this.moviesloading = false;
      }
    },
    getVideoByCategory(seriesLimit, id) {
      try {
        this.moviesloading = true;

        this.$axios.get(`/videos/list/?getVideosByCategories=1`).then(
          response => {
            // let tempdata =
            //   response.data.series.series_by_id["0"]["seasons"]["0"][
            //     "episodes"
            //   ];
            this.movies_comedy =
              response.data.videos.videos_by_categories["17"];

            if (this.seriesByCategories) {
              const combined1 = [].concat(
                this.seriesByCategories["Comedy"],
                this.movies_comedy
              );
              this.seriesByCategories["Comedy"] = combined1;
              this.fused = true;
            }

            // this.seriesItem2 = this.movies_comedy[1];
            let tempdata = response.data.videos.videos_by_categories["12"];
            let data = response.data.videos.videos_by_categories["12"];
            this.DramaData = response.data.videos.videos_by_categories["19"];
            var self = this;
            self.featuredMovies = [];
            data.map(item => {
              if (item.featured == "yes") {
                // if(
                //   item.featuredOrder
                // ){
                // self.featuredSeries[item.featuredOrder]=item;}
                // else
                {
                  self.featuredMovies.push(item);
                }
              }
            });
            // for (var i = 0; i < 10; i++) {
            //   data.push(tempdata[i]);
            // }
            this.moviesData = data;
            this.allData = tempdata;
            if (seriesLimit > 10) {
              this.allLoaded = true;
            }

            this.ComedyData = this.moviesData;
            this.moviesloading = false;
          },
          err => {
            if (!err.response) {
              this.$store.commit(
                "snackIt",
                "Server isn't responding your list can't be fetched"
              );
              this.moviesloading = false;
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
              this.moviesloading = false;
            }
          }
        );
      } catch (err) {
        console.log(err);
        this.moviesloading = false;
      }
    },
       shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
},
       getEditorPicks() {
      try {
        this.moviesloading = true;

        this.$axios.get(`/videos/list/?editor_pick=1`).then(
          response => {
            let editor_picks= response.data.videos.editor_picks;
             this.trendingSeries= this.trendingSeries.concat(editor_picks);
            this.shuffleArray(this.trendingSeries);

       
          },
          err => {
            if (!err.response) {
              this.$store.commit(
                "snackIt",
                "Server isn't responding your list can't be fetched"
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          }
        );
      } catch (err) {
        console.log(err);
        this.moviesloading = false;
      }
    }
  },

  created() {
    // this.$router.push('/login')
    // this.setFeaturedSeries();  
    // this.setPageData();
    // this.setTrendingSeries();
    this.getlatestRelease();
    this.getVideoByCategory(1000, 12);
    this.setSeriesByCategories();
  },
  beforeMount() {
    // this.setVideoCategories()
    
    this.getEditorPicks();
this.setTrendingSeries();
    this.getPranks();
  },
  mounted() {
    let ver = localStorage.getItem("ver");
    console.log("version", ver);
    let curr_ver = "1.0.12";
    if (!ver || ver == undefined || ver != curr_ver) {
      if(localStorage){
      localStorage.clear();

      this.$auth?this.$auth.logout():null;
      localStorage.setItem("ver", curr_ver);
      this.$universalCookie.removeAll();

      this.$store.commit("setCurrentProfile", false);
      // console.log("this.$universalCookie",this.$universalCookie);
      this.$universalCookie.removeAll();
      this.$universalCookie.remove("currUserProfile");
      this.$universalCookie.remove("profileTimer");
      console.log("version update");
      }
    }
    if (this.$store.getters.currentUser) {
      this.getUserData();
    }
    this.$fireAnalyticsObj().logEvent("home_page", {
      msisdn: this.$store.getters.currentUser
        ? this.$store.getters.currentUser.msisdn
        : "N/A"
    });
  }
};
</script>
<style scoped>
.mobile-pop {
}
.featured-content-custom-mobile {
  display: none;
}
.featured-content-custom-mobile .pad-5 {
  width: 45vw;
  height: 44vw;
}

.featured-content-custom-mobile .image-custom-vertical {
  min-height: 35vw;
  height: 35vw;
}
.featured-content-custom {
  padding: 5vmin 20vmin;
}
.innerCategory__Video {
  padding: 0 20vmin;
  border-bottom: 0px !important;
}

.p10-v {
  padding: 10vmin;
}
.btn-grey {
  padding: 10px;
  width: 150px;
  border-radius: 5px;
  text-align: center;
  margin: 10px 0;

  background: #282828;
  color: white;
}
.btn-hollow {
  text-align: center;
  width: 150px;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #282828;
  color: white;
}
.main-load > .sliderimg > .v-image {
  height: 400px;
}
.p-20 {
  padding: 20px;
}
.btn-daikho {
  padding: 0 30px;
  color: white;
  height: 50px;
  background: #ffc511 !important;
  border-radius: 5px;
}
.lrp-0 {
  padding-left: 0px;
  padding-right: 0px;
}
.btn-daikho-hollow {
  padding: 0 30px;
  color: #ffc511;
  height: 50px;
  border: 1px solid #ffc511 !important;
  border-radius: 5px;
  background: none !important;
}
.btn-grey {
  padding: 0 30px;
  color: white;
  height: 50px;
  background: #b4b3b1 !important;
  border-radius: 5px;
}
.btn-grey:hover {
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
.innerTrending__Video .slider .slider-v .innerthumbs__v .v-thumb:hover,
.innerDramas__Video .slider .slider-v .innerthumbs__v .v-thumb:hover,
.innerlist__Video .slider .slider-v .innerthumbs__v .v-thumb:hover,
.innerCategory__Video .slider .slider-v .innerthumbs__v .v-thumb:hover {
  z-index: 2;
  -webkit-transition: all 200ms ease-in;
  -webkit-transform: scale(1.8);
  -ms-transition: all 200ms ease-in;
  -ms-transform: scale(1.8);
  -moz-transition: all 200ms ease-in;
  -moz-transform: scale(1.8);
  transition: all 200ms ease-in;
  transform: scale(1);
}
.main-slide-box > .sliderbeforeitems,
.main-slide-box > .sliderAfteritmes,
.main-slide-box > .thumb-beforeitems {
  transform: translate3d(0px, 0px, 0px) !important;
  transform: none !important;
}
.image-sec {
  padding: 50px 0px;
  /* height: 50vmin; */
}
.image-sec > img {
  width: inherit;
  height: inherit;
  /* height: 50vmin; */
}
.main-load {
  margin: 0px 10px !important;
}
.main-load > .hover__detaillist {
  margin-right: -10px !important;
}
.swiper-slider-prev,
.swiper-slider-next {
  position: absolute;
  background: rgba(0, 0, 0, 0);
  top: 105px;
  height: 58%;
  width: 50px;
  /* display: flex; */
  z-index: 1;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  flex-wrap: wrap;
  cursor: pointer;
  visibility: hidden;
}
.searchinner.active .searchbar {
  display: block;
  border-radius: 15px;
  background: #ffffff4d;
  border: 1px solid #3f3f3f;
  -webkit-animation: scale-up-hor-right 0.2s cubic-bezier(0.39, 0.575, 0.565, 1)
    both;
  animation: scale-up-hor-right 0.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@media screen and (max-width: 1024px) {
  .main-load {
    margin: 0;
  }
  .innerCategory__Video {
    padding: 0 8vmin;
  }
  .bob-overview-wrapper .title {
    display: none;
  }
  .bob-overview-wrapper .caption {
    display: none;
  }
  .hover__detaillist .button-group button {
    height: 25px !important;
  }
  .btn-daikho {
    padding: 0 0px;
    color: white;
    height: 50px;
    background: #ffc511 !important;
    border-radius: 5px;
  }
  .lrp-0 {
    padding-left: 0px;
    padding-right: 0px;
  }
  .hover__detaillist .button-group {
    padding: 0px 22px !important;
  }
  .btn-daikho-hollow {
    padding: 0 0px;
    color: #ffc511;
    height: 50px;
    border: 1px solid #ffc511 !important;
    border-radius: 5px;
    background: none !important;
  }
  .main-load > .hover__detaillist {
    margin-right: 0px;
  }
  .swiper-slider-prev,
  .swiper-slider-next {
    display: none;
  }
  .p10-v {
    padding: 0vmin;
  }
  .featured-content-custom {
    padding: 5vmin;
  }
  .image-sec {
    padding: 10vmin;
  }
  .image-sec > img {
    width: 70vw;
  }
  .d-flex {
    display: block !important;
  }
}
.innerTrending__Video .slider .slider-v,
.innerDramas__Video .slider .slider-v,
.innerlist__Video .slider .slider-v,
.innerCategory__Video .slider .slider-v {
  padding: 0 !important;
}
.hover__detaillist .button-group a {
  text-decoration: none;

  height: 35px;

  -webkit-box-align: center;
  align-items: center;
  border-radius: inherit;
  color: inherit;
  display: -webkit-box;
  display: flex;
  -webkit-box-flex: 1;
  -webkit-box-pack: center;
  justify-content: center;
  margin: 0 auto;
  position: relative;
  -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  white-space: nowrap;
  width: inherit;
  display: inherit;
  height: auto !important;
}
.hover__detaillist .button-group a i {
  color: #ffc511;
}
.hover__detaillist .button-group a :hover {
  color: #ffc511;
}
.main-home-custom .v-responsive__content {
  background: #0000004a;
  height: 100%;
  width: 100%;
  position: absolute;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0.5)
  ) !important;
  color: black;
}
.hover__detaillist .button-group {
  padding: 0px 30px;
}
.hover__detaillist .button-group button {
  width: 100%;

  height: 35px;
}
.bob-overview-wrapper {
  width: 90% !important;
}

@media screen and (max-width: 1024px) {
  .main-load {
    margin: 0;
  }
  .play-parent {
    display: flex;
    top: 40%;
  }
  .main-load > .hover__detaillist {
    margin-right: 0px;
  }
  .swiper-slider-prev,
  .swiper-slider-next {
    display: none;
  }
  .featured-content-custom {
    padding: 20vmin 10vmin;
    padding-top: 5vmin;
    padding-bottom: 5vmin;
  }
  .image-sec {
    padding: 10vmin 0vmin;
  }
  .image-sec > img {
    width: 80vw;
  }
  .d-flex {
    display: block !important;
  }
}
.view-cards {
  height: 15vw;
  min-height: 200px;

  width: 100%;
}
.view-cards-big {
  height: 33vw;
  min-height: 200px;
  width: 100%;
}
.view-cards-vertical pointer {
  height: 400px;
  width: 100%;
}
.see-all-col{
  
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.see-all{
  margin-top: 2.5px;
}

.pad-5 {
  padding: 15px;
}
.bg-class {
  background: url("https://deikho.com/files/thumbs/2019/10/21/img-mid.jpg");
}
.see-More {
  height: 1px;
  border-top: 1px solid #454545;
  display: flex;
  justify-content: center;
}
.btn-white {
  color: black;
  background: white;
  width: 140px;
  height: 50px;
}
.grid {
  display: grid;
  margin-top: -25px;
}
.pt-5-cus {
  padding-top: 5px;
}

.heading-line {
  width: 50px;
}
.section-heading {
  /* padding: 35px 0; */
}
.section-heading-parent {
  display: grid;
  align-items: center;
}

.image-custom {
  height: 13vw;
  min-height: 160px;
  width: 100%;
  object-fit: cover;
}
.image-custom-featured {
  min-height: 160px;
  height: 29.5vw;
  width: 100%;
  object-fit: cover;
}
.view-cards-vertical pointer-big {
  min-height: 200px;
  height: 20vw;
  width: 100%;
}
.image-custom-ver-big {
  min-height: 160px;
  object-position: bottom;
  height: 21vw;
  width: 100%;
  object-fit: cover;
}

.view-cards-vertical pointer {
  height: 22vw;
  min-height: 200px;
}
.play-parent {
  display: grid;
  align-items: center;
  justify-content: center;
}
.image-header-all {
  position: absolute;
  width: 100%;
  height: 80vh;
  object-fit: cover;
}
.v-btn__content {
  color: white !important;
}
.image-footer-all {
  position: absolute;
  width: 100%;
  height: 50vh;
  object-fit: cover;
}
.image-custom-vertical {
  min-height: 160px;
  height: 21vw;
  width: 100%;
  object-fit: cover;
}
.header-all {
  height: 80vh;
  margin-bottom: 13vmin;
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
.header-all-text {
  position: absolute;
  bottom: 5vw;
  left: 5vw;
}

@media screen and (min-width: 1200px) and (max-width: 1400px) {
.main-load > .sliderimg > .v-image {
  height: 350px;
}
}
@media screen and (min-width: 2000px) and (max-width: 3400px) {
.main-load > .sliderimg > .v-image {
  height: 550px;
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
@media only screen and (max-width: 767px) {
  
.btn-daikho-hollow{display: none !important;}
  .free-tag {
    position: absolute;
    z-index: 1;
    right: 0;
    padding: 2px 7px !important;
    background: #ffad01;
    text-transform: uppercase;
    top: 15px;
    color: white;
    border-radius: 5px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    font-size: 12px !important;
    font-weight: bolder;
  }
  .featured-content-custom-mobile {
    display: block;
  }
  .featured-content-custom {
    display: none;
  }
  .main-load > .sliderimg > .v-image {
    height: 40vw;
  }
  .image-header-bottom {
    height: 80vh;
  }
  .view-cards,
  .view-cards-big,
  .view-cards-vertical pointer-big,
  .view-cards-vertical pointer {
    min-height: 360px;
  }
  .image-custom,
  .image-custom-featured,
  .image-custom-ver-big,
  .image-custom-vertical {
    min-height: 325px;
  }
}
.pranks .pad-5 {
  width: 48.5vw;
  height: 44vw;
}

.pranks .pad-5 .rcbd {
  width: 90% !important;
}

.pranks .pad-5 .h-300 {
  margin-bottom: 0px !important;
}
.pranks .pt-5-cus {
  padding-top: 3px;
  padding-bottom: 5px;
}

.pranks .row {
  place-content: center;
}
.vjs-top-bar #video-title-text {
  display: none !important;
}
.text-section {
  color: white;
  padding: 0 15%;
  font-weight: 900;
}
.btn-round {
  border-radius: 30px;
  height: 35px;
}
.image-section {
  background: url(https://deikho.com/files/web/mobs.png);
  height: 175px;
  object-fit: contain;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;
}
.modal-body-bg {
  background: url("https://deikho.com/files/web/bg_1010.png");
  height: 500px;
  background-size: cover;
  width: 350px;
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 5% 0;
}

.col-md-3
  .pad-5
  .prank-card
  > div
  > p
  > div
  > div.v-image__image.v-image__image--cover {
  background-size: contain !important;
}

.innerTrending__Video
  .slider
  .slider-v
  .innerthumbs__v
  .v-thumb
  .hover__detaillist,
.innerDramas__Video
  .slider
  .slider-v
  .innerthumbs__v
  .v-thumb
  .hover__detaillist,
.innerlist__Video .slider .slider-v .innerthumbs__v .v-thumb .hover__detaillist,
.innerCategory__Video
  .slider
  .slider-v
  .innerthumbs__v
  .v-thumb
  .hover__detaillist {
  height: 50%;
  top: auto;
  bottom: 0;
}
.main-home-custom {
  cursor: pointer;
}
.free-tag {
  position: absolute;
  z-index: 1;
  right: 0;
  padding: 2px 12px;
  background: #ffad01;
  text-transform: uppercase;
  top: 15px;
  color: white;
  border-radius: 5px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  font-size: 18px;
  font-weight: bolder;
}
</style>  
