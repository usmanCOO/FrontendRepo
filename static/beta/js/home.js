$(document).ready(function(){
  authCHange();
    $("#logout").on('click',function(){
      console.log("logout");
      let vuex=JSON.parse(localStorage.getItem("vuex"));
      delete vuex.auth.user;
      localStorage.setItem('vuex',JSON.stringify(vuex));
      authCHange();
  
    });
      // window.onload=function(){if(window.jQuery){$(document).ready(function(){$(".sidebarNavigation .navbar-collapse").hide().clone().appendTo("body").removeAttr("class").addClass("sideMenu").show();$("body").append("<div class='overlay'></div>");$(".navbar-toggle, .navbar-toggler").on("click",function(){$(".sideMenu").addClass($(".sidebarNavigation").attr("data-sidebarClass"));$(".sideMenu, .overlay").toggleClass("open");$(".overlay").on("click",function(){$(this).removeClass("open");$(".sideMenu").removeClass("open")})});$("body").on("click",".sideMenu.open .nav-item",function(){if(!$(this).hasClass("dropdown")){$(".sideMenu, .overlay").toggleClass("open")}});$(window).resize(function(){if($(".navbar-toggler").is(":hidden")){$(".sideMenu, .overlay").hide()}else{$(".sideMenu, .overlay").show()}})})}else{console.log("sidebarNavigation Requires jQuery")}}
      getSeriesData();
      GetFeaturedData();
  })
  function authCHange(){
    
    let auth_obj=localStorage.getItem("auth._token.local");
    let vuex=JSON.parse(localStorage.getItem("vuex"));
console.log(vuex);
    let auth=vuex.auth?vuex.auth.user:null;
    let msisdn=auth?auth.username:null;
    console.log("isAuth",vuex.auth.user);
    if(vuex.auth.user){
      $("#name").text(msisdn);
      $(".profile").show();
      $(".login").hide();
    }
    else{
      
      $(".profile").hide();
      $(".login").show();
    }
  }
  function getSeriesData(){
      var settings = {
          "url": "https://deikho.com/api/series/listing/?getSeriesByCategories=1",
          "method": "GET",
          "timeout": 0,
        };
        
        $.ajax(settings).done(function (response) {
          console.log(response);
          let series_data=response.series["series_by_categories"];
          console.log("series_data",series_data);
          Object.keys(series_data).map((index)=>{
              let id=index.replace(" ","_");
              let item=series_data[index];
              if(item.length>0){
              PlotSeriesData(item,id,index);
              }
          });
          
      // Category Slider
      var swiper = new Swiper('.swiper-container-categories', {
   
          simulateTouch: true,
          slidesPerView: 4.2,
          spaceBetween: 25,
          slidesPerGroup: 4,
          loop: false,
          navigation:false,
          loopFillGroupWithBlank: true,
          // pagination: {
          //   el: ".swiper-pagination",
          //   clickable: true
          // },
          breakpoints: {
            1400: {
              slidesPerView: 4.2,
              spaceBetween: 25,
              slidesPerGroup: 4,
            },
            1024: {
              slidesPerView: 3.2,
              spaceBetween: 25,
              slidesPerGroup: 4,
  
            },
            768: {
  
              slidesPerView: 2.2,
              spaceBetween: 25,
              slidesPerGroup: 2
            },
            640: {
              slidesPerView: 2.2,
              spaceBetween: 25,
              slidesPerGroup: 2
            },
            375: {
              slidesPerView: 2.2,
              spaceBetween: 25,
                slidesPerGroup: 2
            }
          },
          navigation: {
            nextEl: ".swiper-slider-next-cat",
            prevEl: ".swiper-slider-prev-cat"
          }
        });
        });
  }
  function PlotSeriesData(series_obj,selectorObj,name){
      console.log("series_obj",series_obj);
      console.log("selectorObj",selectorObj);
      let p_obj=`   <section class="section-padding">
      <br data-v-f0602dd0="" />
      <div class="" data-v-f0602dd0="">
        <h2 class="text-white">${name}</h2>
      </div>
      <div class="col">
        <div class="swiper-container-categories">
          <br data-v-f0602dd0="" />
          <br data-v-f0602dd0="" />
          <div class="swiper-wrapper" id='${selectorObj}'>
         
          </div>
          <!-- Add Pagination -->
          <!-- <div class="swiper-pagination"></div> -->
          <!-- Add Arrows -->
          <div class="swiper-button-next-cat"></div>
          <div class="swiper-button-prev-cat"></div>
        </div>
      </div>
      <br data-v-f0602dd0="" />
      <br data-v-f0602dd0="" />
    </section>`;
    $(".categories_data").append(p_obj);
  
      $(selectorObj).empty();
  
      series_obj.map(item=>{
        let obj=` <div class="swiper-slide swiper-slide-category " id="${item.series_id}"
        style="background-image: url('${item.thumb}')">
      
        <div class="col lrp-0 button-group-parent">
  
          <div class="col button-group">
            <div class="hover-box" style="margin-bottom: 10px;">
  
            <small class="text-white"> ${item.series_name}</small>
            <p class="text-white  bm-0 fs-10">${item.series_description} </p>
          </div>
            <button class="btn btn-daikho-hollow" style="display:flex;justify-content:center" 
            onclick="myFunction(${item.series_id})" >
              <span style="margin-top:2.5px;
  align-content: center;"><i class="fas fa-play"></i> &nbsp; &nbsp;Play Now</span>
            </button>
  
            <button class="btn btn-hollow btn-hollow-white">
              <a  href="/tvCollections/details/${item.series_id}"
                 style="display:inherit;height:auto !important">Details
              </a>
            </button>
          </div>
        </div>
      </div>`;
      $("#"+selectorObj).append(obj);
      });
  }
  function Play_Video(id){
      console.log("videoPlay id",id);
  }
  function GetFeaturedData(){
      let featuredSeries = [
          {
            series_id: 33,
            series_name: "BATANA HI PADEGA",
            series_description:
              "Exclusive interviews of well known cricketers , revealing the untold secrets of their career and personal lives!",
            series_tags: "cricket,shows",
          
            thumb:
              "https://ncdn.deikho.com/images/series_thumbs/2019/12/19/33.jpg"
          },
          {
            series_id: 46,
            series_name: "Parinday",
            series_description:
              "An action drama, Parinday, shows the lives of underworld drug mafia and target killers of Karachi. ",
            series_tags: "Crime",
          
            thumb:
              "https://deikho.com/images/series_thumbs/2020/02/18/46.jpg",
           
          },
          {
            series_id: 42,
            series_name: "Arpita",
            series_description:
              "The horror web series, revolves around some kind of unseen dark forces. ",
            series_tags: "Horror",
            maturity_level: "all",
         
            thumb:
              "https://deikho.com/images/series_thumbs/2020/02/18/42.jpg",
          
          },
  
          {
            series_id: 43,
            series_name: "Pillow Talk",
            series_description:
              "This web series revolves around the relationship of husband and wife. The story narrates three different phases of married life involving three couples, a young couple, a middle age couple and an old couple. The separate life stories but almost the same concept in each episode.",
            series_tags: "Drama",
          
            thumb:
              "https://deikho.com/images/series_thumbs/2020/02/18/43.jpg",
          
          },
  
          {
            series_id: 34,
            series_name: "Corporate Snakes",
            series_description:
              "The corporate office where new entry is a girl whom Tony tries to impress by his fake gestures.Boss announces to disclose the team leader of the new upcoming project.",
            series_tags: "comedy",
         
            thumb:
              "https://ncdn.deikho.com/images/series_thumbs/2019/12/23/34.jpg",
           
          },
          {
            series_id: 47,
            series_name: "Saat Mulaqatein ",
            series_description:
              "A typical Pakistani couple decides to end things and opt for separation. The situation takes a turn when they realize the implications of them being separated.",
            series_tags: "Drama",
          
            thumb:
              "https://deikho.com/images/series_thumbs/2020/02/19/47.jpg",
           
          }
        ];
        $(".featured-slider").empty();
  
        featuredSeries.map(item=>{
  
          PlotFeaturedData(item);
          if(item.series_id==43){
              $("#bt-sust").append(`      <div class="col-md-7 image-sec">
              <img src="${item.thumb}" height />
            </div>
            <div class="col-md-5 p10-v">
              <h3 style="text-transform:capitalize" class="text-white">${item.series_name.toLowerCase().trim()}
              </h3>
              <br />
              <p  class="text-white">${item.series_description}</p>
              <div class="row col button-group">
                <button class="btn btn-grey btn-grey" onclick="myFunction(${item.series_id})">
                  <span style="margin-top:2.5px;
  align-content: center;"><i class="fas fa-play"></i> &nbsp; &nbsp;Play Now</span> </button>
  
                <button class="btn btn-hollow btn-hollow-white">
                <a  href="/tvCollections/details/${item.series_id}">See Details</a></button>
              </div>
            </div>`);
          }
        });
         // Main Slider
      
      // Main Slider
      var Swipes = new Swiper('.swiper-container', {
          loop: true,
          // direction: "horizontal",
          nav: false,
          
          // pagination: {
          //   el: ".swiper-pagination"
          // },
          // navigation: {
          //   nextEl: ".editer_next",
          //   prevEl: ".editer_prev"
          // },
          navigation:false,

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
          },
          navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
          },
          pagination: {
              el: '.swiper-pagination',
          },
      });
  
  
  }
  function PlotFeaturedData(seriesDetails){
  let obj=`  <div class="swiper-slide" style="background-image:
   url(${seriesDetails.thumb});">
   <div class="header-all-text">
  <h1 style="text-transform:capitalize" class="text-white">${seriesDetails.series_name.toLowerCase().trim()}</h1>
  
  <small
  class="text-white"
    style="padding-bottom:15px;text-transform:capitalize"
  >
    <i class="text-white"></i>${seriesDetails.series_tags.replace(",",", ")}</i>
  </small>
  
  <div class="pad-15 text-white">
    <p>${seriesDetails.series_description}</p>
  </div>
  <div class="row lrp-0 lrm-0 button-group">
    <div class="lrp-0">
    <button class="btn btn-grey btn-daikho btn-featured" onclick="myFunction(${seriesDetails.series_id})" >
  
        <span style="margin-top:2.5px;
        align-content: center;"><i class="fas fa-play"></i> &nbsp; Watch Now</span> 
    </button>
  </div>
  <div class="col">
  
    <button
      class="btn btn-hollow btn-hollow-white btn-featured"
      
    ><a href="/tvCollections/details/${seriesDetails.series_id}">Details</a></button>
  </div>
  </div>
  </div>
  </div>
  `;
  $(".featured-slider").append(obj);
  }
  
  function myFunction(id){
      console.log("Play_Video",id);
      var settings = {
          "url": "https://deikho.com/api/series/list/?series_id="+id,
          "method": "GET",
          "timeout": 0,
          
        };
        
        $.ajax(settings).done(function (response) {
          console.log(response);
          if (response.status) {
              let seasons = response.series.series_by_id[0].seasons;
              //  let seasons = seriesObj.seasons;
              let firstSeason = seasons.filter(season => season.sequence == 1);
              firstSeason = firstSeason[0];
            console.log(firstSeason);
              let episode_id = firstSeason.episodes[0]["videoid"];
           {
                console.log(
                  "network changed",
                  localStorage.getItem("network_changed")
                );
                if (
                  localStorage.getItem("network_changed") == true ||
                  localStorage.getItem("network_changed") == "true"
                ) {
                  console.log("header video ");
                  window.location.href = `http://www.deikho.com/watch_video.html?episode_id=${episode_id}&type=series&series_id=${id}&season_id=${firstSeason.season_id}`;
                } else {
                  window.location.href=                  `/watch/${episode_id}?type=series&series_id=${id}&season_id=${firstSeason.season_id}`
                  ;
                }
  
                //
              }
            }
        });
  }
  