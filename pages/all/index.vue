
<template>
  <v-content>
    <!-- Editor picks -->
    <!-- <editorPicks
      :addToMyList="addToMyList"
      :swiperOption="swiperOption"
      :editorPicks="editorPicks"
    />-->
    <template v-if="!dataLoading">
      <div class="bg-class" v-if="seriesItem5">
        <img :src="seriesItem5.poster?seriesItem5.thumb:seriesItem5.thumb" class="image-header-all" />

        <div class="col-md-12 d-flex justify-content-center header-all">
          <div class="col play-parent" @click="takeMeToWatch(seriesItem5)">
            <i
              data-v-166faf4c
              aria-hidden="true"
              class="v-icon material-icons circle-play"
            >play_arrow</i>
          </div>
          <div class="header-all-text">
            <h1>{{seriesItem5.series_name}}</h1>
            <small
              v-for="(cat, index) in seriesItem5.categories"
              :key="index"
              style="padding-bottom:15px;"
            >
              <i key v-if="index ==0">{{cat.category_name}}</i>
              <i v-else>, {{cat.category_name}}</i>
            </small>
            <br />
            <p>{{seriesItem5.description}}</p>

            <div class="row button-group" style="margin-left;0px;margin-right:0px;">
              <v-btn class="btn btn-grey btn-daikho" @click="takeMeToWatch(seriesItem5)">
                <v-icon>play_arrow</v-icon>Watch Now
              </v-btn>&nbsp;
              &nbsp;
              &nbsp;
              <v-btn
                class="btn btn-hollow btn-hollow-white"
                @click="logData('featured_all_video_details',seriesItem5)"
                :to="`/tvCollections/details/${seriesItem5.series_id}`"
              >See Details</v-btn>
            </div>
          </div>
        </div>
      </div>
    </template>
    <br/>
    <div id='1'></div>
<div id="webseries">

    <template v-if="!dataLoading">
      <section >
        <br />
        <div class="featured-content-custom">
          <div class="row">
            <div class="col-md-7">
              <div class="row">
                <div class="col-md-4 pad-5">
                  <div class="view-cards section-heading-parent">
                    <div class="heading-line">
                      <div class="see-More"></div>
                    </div>
                    <div class="section-heading">
                      <h2>Popular Web Series to Watch</h2>
                      <br />
                      <p>Most Watched Content</p>
                    </div>
                    <div class="see-More"></div>
                    <div style="padding-top:5px">
                      <!-- <router-link to>View All ></router-link> -->
                    </div>
                  </div>
                </div>
                <div class="col-md-4 pad-5 mob-50" v-if="seriesItem1">
                  <div class="view-cards">
                    <router-link
                      class="h-300"
                      :to="`/tvCollections/details/${seriesItem1.series_id}`"
                      @click="logData('video_details',seriesItem1)"
                    >
                      <img :src="seriesItem1.thumb" class="image-custom" />
                    </router-link>
                    <div class="pt-5-cus">
                      <small v-for="(cat, index) in seriesItem1.categories" :key="index">
                        <i key v-if="index ==0">{{cat.category_name}}</i>
                        <i v-else>, {{cat.category_name}}</i>
                      </small>
                      <p>{{seriesItem1.series_name}}</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 pad-5 mob-50" v-if="seriesItem2">
                  <div class="view-cards">
                    <router-link
                      class="h-300"
                      :to="`/tvCollections/details/${seriesItem2.series_id}`"
                      @click="logData('video_details',seriesItem2)"
                    >
                      <img :src="seriesItem2.thumb" class="image-custom" />
                    </router-link>
                    <div class="pt-5-cus">
                      <small v-for="(cat, index) in seriesItem2.categories" :key="index">
                        <i key v-if="index ==0">{{cat.category_name}}</i>
                        <i v-else>, {{cat.category_name}}</i>
                      </small>
                      <p>{{seriesItem2.series_name}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 pad-5 mob-50" v-if="seriesItem3">
                  <div class="view-cards">
                    <router-link
                      class="h-300"
                      :to="`/tvCollections/details/${seriesItem3.series_id}`"
                      @click="logData('video_details',seriesItem3)"
                    >
                      <img :src="seriesItem3.thumb" class="image-custom" />
                    </router-link>
                    <div class="pt-5-cus">
                      <small v-for="(cat, index) in seriesItem3.categories" :key="index">
                        <i key v-if="index ==0">{{cat.category_name}}</i>
                        <i v-else>, {{cat.category_name}}</i>
                      </small>
                      <p>{{seriesItem3.series_name}}</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 pad-5 mob-50" v-if="seriesItem4">
                  <div class="view-cards">
                    <router-link
                      class="h-300"
                      :to="`/tvCollections/details/${seriesItem4.series_id}`"
                      @click="logData('video_details',seriesItem4)"
                    >
                      <img :src="seriesItem4.thumb" class="image-custom" />
                    </router-link>
                    <div class="pt-5-cus">
                      <small v-for="(cat, index) in seriesItem4.categories" :key="index">
                        <i key v-if="index ==0">{{cat.category_name}}</i>
                        <i v-else>, {{cat.category_name}}</i>
                      </small>
                      <p>{{seriesItem4.series_name}}</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 pad-5 mob-50" v-if="seriesItem5">
                  <div class="view-cards">
                    <router-link
                      class="h-300"
                      :to="`/tvCollections/details/${seriesItem5.series_id}`"
                      @click="logData('video_details',seriesItem5)"
                    >
                      <img :src="seriesItem5.thumb" class="image-custom" />
                    </router-link>
                    <div class="pt-5-cus">
                      <small v-for="(cat, index) in seriesItem5.categories" :key="index">
                        <i key v-if="index ==0">{{cat.category_name}}</i>
                        <i v-else>, {{cat.category_name}}</i>
                      </small>
                      <p>{{seriesItem5.series_name}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-5 pad-5" v-if="seriesItemFeatured">
              <div class="view-cards-big">
                <router-link
                  class="h-300"
                  :to="`/tvCollections/details/${seriesItemFeatured.series_id}`"
                  @click="logData('video_details',seriesItemFeatured)"
                >
                  <img :src="seriesItemFeatured.thumb" class="image-custom-featured" />
                </router-link>
                <div class="pt-5-cus">
                  <small v-for="(cat, index) in seriesItemFeatured.categories" :key="index">
                    <i key v-if="index ==0">{{cat.category_name}}</i>
                    <i v-else>, {{cat.category_name}}</i>
                  </small>
                  <p>{{seriesItemFeatured.series_name}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="see-More"></div> -->
        <div class="justify-content-center grid">
          <!-- <button class="btn btn-primary btn-white" >+Load More</button> -->
        </div>
      </section>
    </template>
    </div>
    <br />
    <div id='2'></div>
    
<div id="comedy">
    <template v-if="!dataLoading">
      <section >
        <br />

        <div class="featured-content-custom">
          <h2>Comedy</h2>
          <div class="row">
            <div class="col-md-5 pad-5" v-if="comedyItemFeatured">
              <div class="view-cards-big">
                <router-link
                  class="h-300"
                  :to="`/tvCollections/details/${comedyItemFeatured.series_id}`"
                  @click="logData('video_details',comedyItemFeatured)"
                >
                  <img :src="comedyItemFeatured.thumb" class="image-custom-featured" />
                </router-link>
                <div class="pt-5-cus">
                  <small v-for="(cat, index) in comedyItemFeatured.categories" :key="index">
                    <i key v-if="index ==0">{{cat.category_name}}</i>
                    <i v-else>, {{cat.category_name}}</i>
                  </small>
                  <p>{{comedyItemFeatured.series_name}}</p>
                </div>
              </div>
            </div>
            <div class="col-md-7">
              <div class="row">
                <div class="col-md-4 pad-5 mob-50" v-if="comedyItem1">
                  <div class="view-cards">
                    <router-link
                      class="h-300"
                      :to="`/tvCollections/details/${comedyItem1.series_id}`"
                      @click="logData('video_details',comedyItem1)"
                    >
                      <img :src="comedyItem1.thumb" class="image-custom" />
                    </router-link>
                    <div class="pt-5-cus">
                      <small v-for="(cat, index) in comedyItem1.categories" :key="index">
                        <i key v-if="index ==0">{{cat.category_name}}</i>
                        <i v-else>, {{cat.category_name}}</i>
                      </small>
                      <p>{{comedyItem1.series_name}}</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 pad-5 mob-50" v-if="comedyItem2">
                  <div class="view-cards">
                    <router-link
                      class="h-300"
                      :to="`/tvCollections/details/${comedyItem2.series_id}`"
                      @click="logData('video_details',comedyItem2)"
                    >
                      <img :src="comedyItem2.thumb" class="image-custom" />
                    </router-link>
                    <div class="pt-5-cus">
                      <small v-for="(cat, index) in comedyItem2.categories" :key="index">
                        <i key v-if="index ==0">{{cat.category_name}}</i>
                        <i v-else>, {{cat.category_name}}</i>
                      </small>
                      <p>{{comedyItem2.series_name}}</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 pad-5 mob-50" v-if="comedyItem3">
                  <div class="view-cards">
                    <router-link
                      class="h-300"
                      :to="`/tvCollections/details/${comedyItem3.series_id}`"
                      @click="logData('video_details',comedyItem3)"
                    >
                      <img :src="comedyItem3.thumb" class="image-custom" />
                    </router-link>
                    <div class="pt-5-cus">
                      <small v-for="(cat, index) in comedyItem3.categories" :key="index">
                        <i key v-if="index ==0">{{cat.category_name}}</i>
                        <i v-else>, {{cat.category_name}}</i>
                      </small>
                      <p>{{comedyItem3.series_name}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 pad-5 mob-50" v-if="comedyItem4">
                  <div class="view-cards">
                    <router-link
                      class="h-300"
                      :to="`/tvCollections/details/${comedyItem4.series_id}`"
                      @click="logData('video_details',comedyItem4)"
                    >
                      <img :src="comedyItem4.thumb" class="image-custom" />
                    </router-link>
                    <div class="pt-5-cus">
                      <small v-for="(cat, index) in comedyItem4.categories" :key="index">
                        <i key v-if="index ==0">{{cat.category_name}}</i>
                        <i v-else>, {{cat.category_name}}</i>
                      </small>
                      <p>{{comedyItem4.series_name}}</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 pad-5 mob-50" v-if="comedyItem5">
                  <div class="view-cards">
                    <router-link
                      class="h-300"
                      :to="`/tvCollections/details/${comedyItem5.series_id}`"
                      @click="logData('video_details',comedyItem5)"
                    >
                      <img :src="comedyItem5.thumb" class="image-custom" />
                    </router-link>
                    <div class="pt-5-cus">
                      <small v-for="(cat, index) in comedyItem5.categories" :key="index">
                        <i key v-if="index ==0">{{cat.category_name}}</i>
                        <i v-else>, {{cat.category_name}}</i>
                      </small>
                      <p>{{comedyItem5.series_name}}</p>
                    </div>
                  </div>
                </div>
                <!-- <div class="col-md-4 pad-5" v-if="comedyItem6">
                  <div class="view-cards">
                    <router-link
                      class="h-300"
                      :to="`/tvCollections/details/${comedyItem6.series_id}`"
                    >
                      <img :src="comedyItem6.thumb" class="image-custom" />
                    </router-link>
                    <div class="pt-5-cus">
                      <small v-for="(cat, index) in comedyItem6.categories" :key="index">
                        <i key v-if="index ==0">{{cat.category_name}}</i>
                        <i v-else>, {{cat.category_name}}</i>
                      </small>
                      <p>{{comedyItem6.series_name}}</p>
                    </div>
                  </div>
                </div>-->
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
</div>
    <br/>
    <div id='3'></div>

<div id="shows">

    <template v-if="!dataLoading">
      <section >
        <br />

        <div class="featured-content-custom">
          <h1>Tv Shows</h1>

          <div class="row">
            <div class="col-md-7">
              <div class="row">
                <div class="col-md-4 pad-5 mob-50" v-if="showsItem1">
                  <div class="view-cards-vertical">
                    <router-link
                      class="h-300"
                      :to="`/tvCollections/details/${showsItem1.series_id}`"
                      @click="logData('video_details',showsItem1)"
                    >
                      <img :src="showsItem1.thumb" class="image-custom-vertical" />
                    </router-link>
                    <div class="pt-5-cus">
                      <small v-for="(cat, index) in showsItem1.categories" :key="index">
                        <i key v-if="index ==0">{{cat.category_name}}</i>
                        <i v-else>, {{cat.category_name}}</i>
                      </small>
                      <p>{{showsItem1.series_name}}</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 pad-5 mob-50" v-if="showsItem2">
                  <div class="view-cards-vertical">
                    <router-link
                      class="h-300"
                      :to="`/tvCollections/details/${showsItem2.series_id}`"
                      @click="logData('video_details',showsItem2)"
                    >
                      <img :src="showsItem2.thumb" class="image-custom-vertical" />
                    </router-link>
                    <div class="pt-5-cus">
                      <small v-for="(cat, index) in showsItem2.categories" :key="index">
                        <i key v-if="index ==0">{{cat.category_name}}</i>
                        <i v-else>, {{cat.category_name}}</i>
                      </small>
                      <p>{{showsItem2.series_name}}</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 pad-5 mob-50" v-if="showsItem3">
                  <div class="view-cards-vertical">
                    <router-link
                      class="h-300"
                      :to="`/tvCollections/details/${showsItem3.series_id}`"
                      @click="logData('video_details',showsItem3)"
                    >
                      <img :src="showsItem3.thumb" class="image-custom-vertical" />
                    </router-link>
                    <div class="pt-5-cus">
                      <small v-for="(cat, index) in showsItem3.categories" :key="index">
                        <i key v-if="index ==0">{{cat.category_name}}</i>
                        <i v-else>, {{cat.category_name}}</i>
                      </small>
                      <p>{{showsItem3.series_name}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-5 pad-5" v-if="showsItemFeatured">
              <div class="view-cards-vertical-big">
                <router-link
                  class="h-300"
                  :to="`/tvCollections/details/${showsItemFeatured.series_id}`"
                  @click="logData('video_details',showsItemFeatured)"
                >
                  <img :src="showsItemFeatured.thumb" class="image-custom-ver-big" />
                </router-link>
                <div class="pt-5-cus">
                  <small v-for="(cat, index) in showsItemFeatured.categories" :key="index">
                    <i key v-if="index ==0">{{cat.category_name}}</i>
                    <i v-else>, {{cat.category_name}}</i>
                  </small>
                  <p>{{showsItemFeatured.series_name}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
</div>

    <br />
        <div id='4'></div>

      <section id="music" :ref="`music`">
    <template v-if="!dataLoading">
      <section>
        <br />

        <div class="featured-content-custom">
          <h1>Talent Hunt</h1>

          <div class="row">
            <div class="col-md-5 pad-5" v-if="musicItemFeatured">
              <div class="view-cards-vertical-big">
                <router-link
                  class="h-300"
                  :to="`/tvCollections/details/${musicItemFeatured.series_id}`"
                  @click="logData('video_details',musicItemFeatured)"
                >
                  <img :src="musicItemFeatured.thumb" class="image-custom-ver-big" />
                </router-link>
                <div class="pt-5-cus">
                  <small v-for="(cat, index) in musicItemFeatured.categories" :key="index">
                    <i key v-if="index ==0">{{cat.category_name}}</i>
                    <i v-else>, {{cat.category_name}}</i>
                  </small>
                  <p>{{musicItemFeatured.series_name}}</p>
                </div>
              </div>
            </div>
            <div class="col-md-7">
              <div class="row">
                <div class="col-md-4 pad-5 mob-50" v-if="musicItem1">
                  <div class="view-cards-vertical">
                    <router-link
                      class="h-300"
                      :to="`/tvCollections/details/${musicItem1.series_id}`"
                      @click="logData('video_details',musicItem1)"
                    >
                      <img :src="musicItem1.thumb" class="image-custom-vertical" />
                    </router-link>
                    <div class="pt-5-cus">
                      <small v-for="(cat, index) in musicItem1.categories" :key="index">
                        <i key v-if="index ==0">{{cat.category_name}}</i>
                        <i v-else>, {{cat.category_name}}</i>
                      </small>
                      <p>{{musicItem1.series_name}}</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 pad-5 mob-50" v-if="musicItem2">
                  <div class="view-cards-vertical">
                    <router-link
                      class="h-300"
                      :to="`/tvCollections/details/${musicItem2.series_id}`"
                      @click="logData('video_details',musicItem2)"
                    >
                      <img :src="musicItem2.thumb" class="image-custom-vertical" />
                    </router-link>
                    <div class="pt-5-cus">
                      <small v-for="(cat, index) in musicItem2.categories" :key="index">
                        <i key v-if="index ==0">{{cat.category_name}}</i>
                        <i v-else>, {{cat.category_name}}</i>
                      </small>
                      <p>{{musicItem2.series_name}}</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 pad-5 mob-50" v-if="musicItem3">
                  <div class="view-cards-vertical">
                    <router-link
                      class="h-300"
                      :to="`/tvCollections/details/${musicItem3.series_id}`"
                      @click="logData('video_details',musicItem3)"
                    >
                      <img :src="musicItem3.thumb" class="image-custom-vertical" />
                    </router-link>
                    <div class="pt-5-cus">
                      <small v-for="(cat, index) in musicItem3.categories" :key="index">
                        <i key v-if="index ==0">{{cat.category_name}}</i>
                        <i v-else>, {{cat.category_name}}</i>
                      </small>
                      <p>{{musicItem3.series_name}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
      </section>

   
    <div  id='pranks'></div>
    
    <div  id='6'></div>
    <br/>
<section class="featured-content-custom" >
<div class="col" style="padding:0px">
          <h1>Pranks <small style="font-size:18px;margin-top: 5px;color:#FFC511;position: absolute;margin-left: 5px;" >Free</small></h1>
      

<pranks/>
</div>
          </section>
          
    <br />
    <br />
<!--     
        <div id='5'></div>

    <div id="upcoming">
    <template v-if="!dataLoading">
      <section >
        <br />

        <div class="featured-content-custom">
          <h1>Upcoming</h1>
          <h4>No upcoming series.</h4>
          <div class="row">
            <div class="col-md-5 pad-5" v-if="upcomingItemFeatured">
              <div class="view-cards-vertical-big">
                <router-link
                  class="h-300"
                  :to="`/tvCollections/details/${upcomingItemFeatured.series_id}`"
                >
                  <img :src="upcomingItemFeatured.thumb" class="image-custom-ver-big" />
                </router-link>
                <div class="pt-5-cus">
                  <small v-for="(cat, index) in upcomingItemFeatured.categories" :key="index">
                    <i key v-if="index ==0">{{cat.category_name}}</i>
                    <i v-else>, {{cat.category_name}}</i>
                  </small>
                  <p>{{upcomingItemFeatured.series_name}}</p>
                </div>
              </div>
            </div>
            <div class="col-md-7">
              <div class="row">
                <div class="col-md-4 pad-5" v-if="upcomingItem1">
                  <div class="view-cards-vertical">
                    <router-link
                      class="h-300"
                      :to="`/tvCollections/details/${upcomingItem1.series_id}`"
                    >
                      <img :src="upcomingItem1.thumb" class="image-custom-vertical" />
                    </router-link>
                    <div class="pt-5-cus">
                      <small v-for="(cat, index) in upcomingItem1.categories" :key="index">
                        <i key v-if="index ==0">{{cat.category_name}}</i>
                        <i v-else>, {{cat.category_name}}</i>
                      </small>
                      <p>{{upcomingItem1.series_name}}</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 pad-5" v-if="upcomingItem2">
                  <div class="view-cards-vertical">
                    <router-link
                      class="h-300"
                      :to="`/tvCollections/details/${upcomingItem1.series_id}`"
                    >
                      <img :src="upcomingItem2.thumb" class="image-custom-vertical" />
                    </router-link>
                    <div class="pt-5-cus">
                      <small v-for="(cat, index) in upcomingItem2.categories" :key="index">
                        <i key v-if="index ==0">{{cat.category_name}}</i>
                        <i v-else>, {{cat.category_name}}</i>
                      </small>
                      <p>{{upcomingItem2.series_name}}</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 pad-5" v-if="upcomingItem3">
                  <div class="view-cards-vertical">
                    <router-link
                      class="h-300"
                      :to="`/tvCollections/details/${upcomingItem3.series_id}`"
                    >
                      <img :src="upcomingItem3.thumb" class="image-custom-vertical" />
                    </router-link>
                    <div class="pt-5-cus">
                      <small v-for="(cat, index) in upcomingItem3.categories" :key="index">
                        <i key v-if="index ==0">{{cat.category_name}}</i>
                        <i v-else>, {{cat.category_name}}</i>
                      </small>
                      <p>{{upcomingItem3.series_name}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
    </div> -->

    <br />
    <template v-if="!dataLoading">
      <div class v-if="showsItem2">
        <img src="images/cover/banner@2x.png" class="image-header-bottom" />

        <div class="featured-content-custom">
          <div class="col-md-12 d-flex justify-content-center">
            <div class="col-md-5 p-20" style="padding:10vmin">
              <h1>{{showsItem2.series_name}}</h1>
              <br />
              <small
                v-for="(cat, index) in showsItem2.categories"
                :key="index"
                style="padding-bottom:15px;"
              >
                <i key v-if="index ==0">{{cat.category_name}}</i>
                <i v-else>, {{cat.category_name}}</i>
              </small>
              <br />
              <p>{{showsItem2.series_description}}</p>

              <div class="row col button-group">
                <v-btn class="btn btn-grey btn-daikho" @click="takeMeToWatch(showsItem2)">
                  <v-icon>play_arrow</v-icon>Watch Now
                </v-btn>&nbsp;
                &nbsp;
                &nbsp;
                <v-btn
                  class="btn btn-hollow btn-hollow-white"
                  :to="`/tvCollections/details/${showsItem2.series_id}`"
                  @click="logData('video_details',showsItem2)"
                >See Details</v-btn>
              </div>
            </div>
            <div class="col-md-7 play-parent" @click="takeMeToWatch(showsItem2)">
              <i
                data-v-166faf4c
                aria-hidden="true"
                class="v-icon material-icons circle-play"
              >play_arrow</i>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="dataLoading">
      <circleLoader />
    </template>
  </v-content>
</template>

<script>
import seriesDetails from "~/components/default/base/seriesDetails";
import seriesCategories from "~/components/default/category/seriesCategories";
import circleLoader from "~/components/default/circleLoader";import pranks from "~/components/default/pranks";

import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "all",
  // middleware: ["auth"],
  // middleware: ["guest"],
  components: {
    seriesDetails,
    seriesCategories,
    circleLoader,
    pranks
  },
  head() {
    return {
      titleTemplate: this.$t("series") + " - %s",
      meta: [
        {
          name: "description",
          content: "Recent movies"
        }
      ]
    };
  },
  data() {
    return {
      value: "",
      swiperOptionh: {
        slidesPerView: 7,
        spaceBetween: 15,
        loop: false,
        navigation: {
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev"
        },
        breakpoints: {
          1400: {
            slidesPerView: 6,
            spaceBetween: 15
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 0
          },
          375: {
            slidesPerView: 2,
            spaceBetween: 10
          }
        }
      },
      swiperTrending: {
        simulateTouch: false,
        slidesPerView: 6,
        spaceBetween: 10,
        slidesPerGroup: 3,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        breakpoints: {
          1400: {
            slidesPerView: 5,
            spaceBetween: 15
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 0
          },
          375: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        },
        navigation: {
          nextEl: ".swiper-slider-next",
          prevEl: ".swiper-slider-prev"
        }
      },
      series: "",
      defaultLayout: true,
      trendingSeries: "",
      recentSeries: "",
      seriesByCategories: "",
      rowIdentifier: "",
      prevIdentifier: "",
      prevSeries: "",
      seriesItem1: [],
      seriesItem2: [],
      seriesItem3: [],
      seriesItem4: [],
      seriesItem5: [],
      seriesItem6: [],
      seriesItem7: [],
      seriesItemFeatured: [],

      comedyItem1: [],
      comedyItem2: [],
      comedyItem3: [],
      comedyItem4: [],
      comedyItem5: [],
      comedyItemFeatured: [],

      showsItem1: [],
      showsItem2: [],
      showsItem3: [],
      showsItem4: [],
      showsItem5: [],
      showsItemFeatured: [],

      musicItem1: [],
      musicItem2: [],
      musicItem3: [],
      musicItem4: [],
      musicItem5: [],
      musicItemFeatured: [],

      webItem1: [],
      webItem2: [],
      webItem3: [],
      webItem4: [],
      webItem5: [],
      webItemFeatured: [],

      upcomingItem1: [],
      upcomingItem2: [],
      upcomingItem3: [],
      upcomingItem4: [],
      upcomingItem5: [],
      upcomingItemFeatured: [],

      seeMore: false,
      dataLoading: true
    };
  },
  computed: {
    ...mapGetters(["configs"])
  },
  methods: {
 
    hoverIn(e) {
      this.$mouseEnter(e);
    },
    hoverOut(e) {
      this.$mouseLeave(e);
    },
    takeMeToWatch(seriesObj) {
      axios
        .get("https://deikho.com/api/series/list/" + seriesObj.series_id)
        .then(response => {
          //  console.log("Seasons data", response);
          if (response.data.status) {
            let seasons = response.data.series.series_by_id[0].seasons;

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
            else
              this.$router.push(
                `/watch/${episode_id}?type=series&series_id=${seriesObj.series_id}&season_id=${firstSeason.season_id}`
              );
          }
        })
        .catch(err => {
          console.log(err);
          return err;
        });
    },
    getMeSeries(series_id, identifier) {
      this.markNewThumb(series_id, identifier);
      this.closePrevSeriesDetails(identifier);
      this.rowIdentifier = identifier;
      this.$root.$emit("getSeriesData", {
        series_id: series_id,
        identifier: identifier
      });
      var el =
        this.$refs[identifier][0] === undefined
          ? this.$refs[identifier].$el
          : this.$refs[identifier][0].$el;
      el.removeAttribute("style");
    },
    markNewThumb(series_id, identifier) {
      this.unmarkPrevThumb(series_id);
      let id = identifier + series_id;
      let elArrowId = id + "Arrow";
      this.$refs[id][0].classList.add("border_selected");
      this.$refs[elArrowId][0].classList.add("arroow");
    },
    unmarkPrevThumb(series_id = null) {
      if (!this.prevSeries) {
        this.prevSeries = series_id;
      } else {
        let prevSeriesTempId = this.prevIdentifier + this.prevSeries;
        let elem = this.$refs[prevSeriesTempId][0];
        elem.classList.remove("border_selected");
        this.prevSeries = series_id;
      }
    },
    // this method will be fired when close button will be clicked
    closeSeriesDetails() {
      let identifier = this.rowIdentifier;
      var el =
        this.$refs[identifier][0] === undefined
          ? this.$refs[identifier].$el
          : this.$refs[identifier][0].$el;
      el.style.display = "none";
      this.unmarkPrevThumb();
    },
    // this method will be fired when new video will be open for details
    closePrevSeriesDetails(identifier) {
      if (!this.prevIdentifier || this.prevIdentifier != identifier) {
        if (this.prevIdentifier) {
          let prevDetailsTempId = this.prevIdentifier;
          var el =
            this.$refs[prevDetailsTempId][0] === undefined
              ? this.$refs[prevDetailsTempId].$el
              : this.$refs[prevDetailsTempId][0].$el;
          el.style.display = "none";
        }
        this.prevIdentifier = identifier;
      }
    },
    setTrendingSeries() {
      try {
        this.$axios.get(`/series/list/?trending=1`).then(
          response => {
            this.trendingSeries = response.data.series.trending;
            // console.log(this.trendingSeries);
            this.seriesItem1 = this.trendingSeries[0]
              ? this.trendingSeries[0]
              : null;
            this.seriesItem2 = this.trendingSeries[1]
              ? this.trendingSeries[1]
              : null;
            this.seriesItem3 = this.trendingSeries[2]
              ? this.trendingSeries[2]
              : null;
            this.seriesItem4 = this.trendingSeries[3]
              ? this.trendingSeries[3]
              : null;
            this.seriesItem5 = this.trendingSeries[4]
              ? this.trendingSeries[4]
              : null;
            this.seriesItemFeatured = this.trendingSeries[1]
              ? this.trendingSeries[1]
              : this.trendingSeries[0];
            this.seriesItem6 = this.trendingSeries[6]
              ? this.trendingSeries[6]
              : null;
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
    setRecentSeries() {
      try {
        this.$axios.get(`/series/list/?recent=1`).then(
          response => {
            this.dataLoading = false;
            this.recentSeries = response.data.series.recent;
          },
          err => {
            this.dataLoading = false;
            console.log(err);
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
    addToMyList(series) {
      try {
        var seriesObj = {
          series_id: series.series_id
        };
        this.$axios
          .post("/series/addToFavourites", seriesObj)
          .then(response => {
            this.$store.commit(
              "snackIt",
              series.series_name + " added to your list"
            );
          })
          .catch(err => {
            if (!err.response) {
              this.$store.commit(
                "snackIt",
                `Server isn't responding ${series.series_name} cannot be added to your list`
              );
            } else {
              let errorMsg = err.response.data.errors.error;
              console.log(errorMsg);
              this.$store.commit("snackIt", errorMsg[0]);
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    setSeriesByCategories() {
      try {
        this.dataLoading = true;
        this.$axios.get(`/series/listing/?getSeriesByCategories=1`).then(
          response => {
            this.seriesByCategories = response.data.series.series_by_categories;
            // console.log(this.trendingSeries);
            this.comedyItemFeatured = this.seriesByCategories["Comedy"][0]
              ? this.seriesByCategories["Comedy"][0]
              : null;
            this.comedyItem1 = this.seriesByCategories["Comedy"][1]
              ? this.seriesByCategories["Comedy"][1]
              : null;
            this.comedyItem2 = this.seriesByCategories["Comedy"][2]
              ? this.seriesByCategories["Comedy"][2]
              : null;
            this.comedyItem3 = this.seriesByCategories["Comedy"][3]
              ? this.seriesByCategories["Comedy"][3]
              : null;
            this.comedyItem4 = this.seriesByCategories["Comedy"][4]
              ? this.seriesByCategories["Comedy"][4]
              : null;
            this.comedyItem5 = this.seriesByCategories["Comedy"][5]
              ? this.seriesByCategories["Comedy"][5]
              : null;
            this.comedyItem6 = this.seriesByCategories["Comedy"][6]
              ? this.seriesByCategories["Comedy"][6]
              : null;

            // SHOW DATA

            this.showsItemFeatured = this.seriesByCategories["Shows"][0]
              ? this.seriesByCategories["Shows"][0]
              : null;
            this.showsItem1 = this.seriesByCategories["Shows"][3]
              ? this.seriesByCategories["Shows"][3]
              : null;
            this.showsItem2 = this.seriesByCategories["Shows"][2]
              ? this.seriesByCategories["Shows"][2]
              : null;
            this.showsItem3 = this.seriesByCategories["Shows"][1]
              ? this.seriesByCategories["Shows"][1]
              : null;
            this.showsItem4 = this.seriesByCategories["Shows"][4]
              ? this.seriesByCategories["Shows"][4]
              : null;
            this.showsItem5 = this.seriesByCategories["Shows"][5]
              ? this.seriesByCategories["Shows"][5]
              : null;
            this.showsItem6 = this.seriesByCategories["Shows"][6]
              ? this.seriesByCategories["Shows"][6]
              : null;

            // Music item
            this.musicItemFeatured = this.seriesByCategories["Talent Hunt"][0]
              ? this.seriesByCategories["Talent Hunt"][0]
              : null;
            this.musicItem1 = null;
            // this.musicItem1 = this.seriesByCategories["Talent Hunt"][0]
            //   ? this.seriesByCategories["Talent Hunt"][0]
            //   : null;
            this.musicItem2 = this.seriesByCategories["Talent Hunt"][2]
              ? this.seriesByCategories["Talent Hunt"][2]
              : null;
            this.musicItem3 = this.seriesByCategories["Talent Hunt"][3]
              ? this.seriesByCategories["Talent Hunt"][3]
              : null;
            this.musicItem4 = this.seriesByCategories["Talent Hunt"][4]
              ? this.seriesByCategories["Talent Hunt"][4]
              : null;
            this.musicItem5 = this.seriesByCategories["Talent Hunt"][5]
              ? this.seriesByCategories["Talent Hunt"][5]
              : null;

            // Web DATA
            // console.log("series", this.seriesItemFeatured);
            this.seriesItemFeatured = this.seriesByCategories["Web Series"][1]
              ? this.seriesByCategories["Web Series"][1]
              : null;
            this.seriesItem1 = this.seriesByCategories["Web Series"][2]
              ? this.seriesByCategories["Web Series"][2]
              : null;
            this.seriesItem2 = this.seriesByCategories["Web Series"][0]
              ? this.seriesByCategories["Web Series"][0]
              : null;
            this.seriesItem3 = this.seriesByCategories["Web Series"][3]
              ? this.seriesByCategories["Web Series"][3]
              : null;
            this.seriesItem4 = this.seriesByCategories["Web Series"][5]
              ? this.seriesByCategories["Web Series"][5]
              : null;
            this.seriesItem5 = this.seriesByCategories["Web Series"][4]
              ? this.seriesByCategories["Web Series"][4]
              : null;
            this.seriesItem6 = this.seriesByCategories["Web Series"][6]
              ? this.seriesByCategories["Web Series"][6]
              : null;

            // Upcoming
            this.upcomingItemFeatured = this.seriesByCategories["Upcoming"][0]
              ? this.seriesByCategories["Upcoming"][0]
              : null;
            this.upcomingItem1 = this.seriesByCategories["Upcoming"][1]
              ? this.seriesByCategories["Upcoming"][1]
              : null;
            this.upcomingItem2 = this.seriesByCategories["Upcoming"][2]
              ? this.seriesByCategories["Upcoming"][2]
              : null;
            this.upcomingItem3 = this.seriesByCategories["Upcoming"][3]
              ? this.seriesByCategories["Upcoming"][3]
              : null;
            this.upcomingItem4 = this.seriesByCategories["Upcoming"][4]
              ? this.seriesByCategories["Upcoming"][4]
              : null;
            this.upcomingItem5 = this.seriesByCategories["Upcoming"][5]
              ? this.seriesByCategories["Upcoming"][5]
              : null;
            //   this.upcomingItem6 = this.seriesByCategories['Upcoming'][6]
            // ? this.seriesByCategories['Upcoming'][6]: null;
            this.dataLoading = false;
                            this.scrollFix('#'+this.$route.query.id);

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
      scrollFix: function(hashbang)
    {
      location.hash = hashbang;
    },
    switchLayout(flag) {
      if (flag == true) this.setRecentSeries();
      else this.setSeriesByCategories();
      this.defaultLayout = flag;
    },
    getStatus() {
      // let obj = {
      //   msisdn: this.$store.getters.currentUser.msisdn
      // };
      // console.log("msisdn", obj);
      // axios
      //   .post("https://api.deikho.com/user/getStatus", obj)
      //   .then(response => {
      //     let user_obj = response.data.data[0];
      //     this.currentUser.is_subscribed =
      //       user_obj.status == "A" ? true : false;
      //     this.currentUser["plan_id"] = user_obj.plan_id;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     return err;
      //   });
    },
    logData(event_name, seriesObj,videoid) {
      this.$fireAnalyticsObj().logEvent(event_name, {

      msisdn: this.$store.getters.currentUser?this.$store.getters.currentUser.msisdn:"N/A",
              video_title: seriesObj.series_name
      });
                  this.$fb.track("ViewContent",{
           msisdn: this.$store.getters.currentUser
          ? this.$store.getters.currentUser.msisdn
          : "N/A",
          videoid:videoid,
        video_title: seriesObj.series_name
      });	
    }
  },
  beforeMount() {
    // this.setRecentSeries();

    // this.setTrendingSeries();
    this.setSeriesByCategories();
    this.switchLayout(true);
    // this.getStatus();
  },
  mounted() {
    
    this.$fireAnalyticsObj().logEvent("all_series_page", {
      msisdn: this.$store.getters.currentUser?this.$store.getters.currentUser.msisdn:"N/A"
    });
    document.onreadystatechange = () => {
      //  console.log("this.$refs", this.$refs);
      //console.log("document.readyState",document.readyState);
      if (!this.dataLoading || document.readyState == "complete") {
         console.log("scrolling to music",this.$refs);
        this.$refs["music"].scrollIntoView();
      }
      //console.log(document.readyState);
      if (document.readyState == "complete") {
        console.log("Page completed with image and files!");
        // fetch to next page or some code
      }
    };
    // try {
    //   console.log("this.$refs",this.$refs);
    //   this.$refs["music"].scrollIntoView();
    // } catch (err) {
    //   console.log("err scrolling",err);
    // }
  }
};
</script>
<style >
.h-300 > .v-responsive .v-image .grey .lighten-2 > .v-responsive__sizer {
  height: 300px;
  padding: 0px !important;
  padding-bottom: 0 !important;
}
.featured-content-custom {
  padding: 5vmin 20vmin;
}
.innerCategory__Video {
  padding: 5vmin 15vmin;
  border-bottom: 3px solid #ffc511;
}
.collectionlayout__Categorylist > .innerCategory__Video {
  padding: 0 !important;
}
.center-play-button > .circle-play {
  background: #ffc511 !important;
  min-width: 40px !important;
  margin: 0 !important;
  padding: 0 !important;
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
}
.image-sec > img {
  width: 40vw;
  height: auto;
}
.main-load {
  padding: 0px 10px;
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
.circle-play {
  height: 50px;
  background: #ffc511;
  width: 50px;
  border-radius: 50px;
  padding: 22px;
  font-size: 32px;
}
@media screen and (max-width: 1024px) {
  .main-load {
    padding: 0;
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
    padding: 20vmin 5vmin;
    padding-top: 5vmin;
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
.play-parent {
  cursor: pointer;
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
.view-cards-vertical {
  height: 400px;
  width: 100%;
}

.pad-5 {
  padding: 15px;
}
.bg-class {
  /* background: url("https://deikho.com/files/thumbs/2019/10/21/img-mid.jpg"); */
}
.header-all-text {
  text-transform: capitalize !important;
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
.pt-5-cus small {
  display: none;
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
  object-position: bottom;
}
.image-custom-featured {
  min-height: 160px;
  height: 29.5vw;
  object-position: bottom;
  width: 100%;
  object-fit: cover;
}
.view-cards-vertical-big {
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

.view-cards-vertical {
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
.image-header-bottom {
  position: absolute;
  width: 100%;
  height: 50vmin;
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
@media only screen and (max-width: 767px) {
  .image-header-bottom {
    height: 80vh;
  }
  .view-cards,
  .view-cards-big,
  .view-cards-vertical-big,
  .view-cards-vertical {
    min-height: 250px;
  }
  .image-custom,
  .image-custom-featured,
  .image-custom-ver-big,
  .image-custom-vertical {
    min-height: 225px;
  }
  .mob-50 {
    width: 50% !important;
  }
  .mob-50 .image-custom {
    min-height: 200px;
    height: 200px;
  }
}
@media screen and (min-width: 1280px) and (max-width: 1600px) {
  .image-header-bottom {
    height: 65vmin;
  }
}
</style>
