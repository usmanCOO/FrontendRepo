
<template>
 <section class="swiper-container " 
  v-swiper="optionsSwiper"
    :instanceName="'swiperTop'"
    @someSwiperEvent="slideChange()">
  <div class="swiper-wrapper">
    <div class="swiper-slide" >
      <img src="https://drive.google.com/uc?export=view&id=0B_koKn2rKOkLbVhsNzdIYmlfN1E" class="entity-img" />
      <div class="content">
        <p class="title" data-swiper-parallax="-30%" data-swiper-parallax-scale=".7">Shaun Matthews</p>
        <span class="caption" data-swiper-parallax="-20%">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span>
      </div>
    </div>
    <div class="swiper-slide" >
      <img src="https://drive.google.com/uc?export=view&id=0B_koKn2rKOkLWTdaX3J5b1VueDg" class="entity-img" />
      <div class="content">
        <p class="title" data-swiper-parallax="-30%" data-swiper-parallax-scale=".7">Alexis Berry</p>
        <span class="caption" data-swiper-parallax="-20%">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span>
      </div>
    </div>
    <div class="swiper-slide" >
      <img src="https://drive.google.com/uc?export=view&id=0B_koKn2rKOkLRml1b3B6eXVqQ2s" class="entity-img" />
      <div class="content">
        <p class="title" data-swiper-parallax="-30%" data-swiper-parallax-scale=".7">Billie	Pierce</p>
        <span class="caption" data-swiper-parallax="-20%">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span>
      </div>
    </div>
    <div class="swiper-slide" >
      <img src="https://drive.google.com/uc?export=view&id=0B_koKn2rKOkLVUpEems2ZXpHYVk" class="entity-img" />
      <div class="content">
        <p class="title" data-swiper-parallax="-30%" data-swiper-parallax-scale=".7">Trevor	Copeland</p>
        <span class="caption" data-swiper-parallax="-20%">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span>
      </div>
    </div>
    <div class="swiper-slide" >
      <img src="https://drive.google.com/uc?export=view&id=0B_koKn2rKOkLNXBIcEdOUFVIWmM" class="entity-img" />
      <div class="content">
        <p class="title" data-swiper-parallax="-30%" data-swiper-parallax-scale=".7">Bernadette	Newman</p>
        <span class="caption" data-swiper-parallax="-20%">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span>
      </div>
    </div>
  </div>
  
  <!-- If we need pagination -->
  <div class="swiper-pagination"></div>
  <!-- If we need navigation buttons -->
  <div class="swiper-button-prev swiper-button-white"></div>
  <div class="swiper-button-next swiper-button-white"></div>
</section>

</template>
<script>
export default {
    data() {
  return {
      optionsSwiper :{
      init: true,
      loop: true,
      speed:800,
      slidesPerView: 1.55, // or 'auto'
      // spaceBetween: 10,
      centeredSlides : true,
      effect: 'coverflow', // 'cube', 'fade', 'coverflow',
      coverflowEffect: {
        rotate: 50, // Slide rotate in degrees
        stretch: 0, // Stretch space between slides (in px)
        depth: 100, // Depth offset in px (slides translate in Z axis)
        modifier: 1, // Effect multipler
        slideShadows : true, // Enables slides shadows
      },
      grabCursor: true,
      parallax: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        1023: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      },
      // Events
      on: {
        imagesReady: function(){
          this.el.classList.remove('loading');
        }
      }
    }
  };
},
}

</script>
<style scoped>
[class^="swiper-button-"], .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet, .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet::before {
  transition: all .3s ease;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.swiper-container {
  width: 100%;
  height: 28vw;
  transition: opacity .6s ease;
}
.swiper-container.swiper-container-coverflow {
  padding-top: 2%;
}
.swiper-container.loading {
  opacity: 0;
  visibility: hidden;
}
.swiper-container:hover .swiper-button-prev,
.swiper-container:hover .swiper-button-next {
  -webkit-transform: translateX(0);
          transform: translateX(0);
  opacity: 1;
  visibility: visible;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
}
.swiper-slide .entity-img {
  /* display: none; */
}
.swiper-slide .content {
  position: absolute;
  top: 40%;
  left: 0;
  width: 50%;
  padding-left: 5%;
  color: #fff;
}
.swiper-slide .content .title {
  font-size: 2.6em;
  font-weight: bold;
  margin-bottom: 30px;
}
.swiper-slide .content .caption {
  display: block;
  font-size: 13px;
  line-height: 1.4;
}

[class^="swiper-button-"] {
  width: 44px;
  opacity: 0;
  visibility: hidden;
}

.swiper-button-prev {
  -webkit-transform: translateX(50px);
          transform: translateX(50px);
}

.swiper-button-next {
  -webkit-transform: translateX(-50px);
          transform: translateX(-50px);
}

.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 0 9px;
  position: relative;
  width: 12px;
  height: 12px;
  background-color: #fff;
  opacity: .4;
}
.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  border: 0px solid #fff;
  border-radius: 50%;
}
.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet:hover, .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet.swiper-pagination-bullet-active {
  opacity: 1;
}
.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet.swiper-pagination-bullet-active::before {
  border-width: 1px;
}

@media (max-width: 1180px) {
  .swiper-slide .content .title {
    font-size: 25px;
  }
  .swiper-slide .content .caption {
    font-size: 12px;
  }
}
@media (max-width: 1023px) {
  .swiper-container {
    height: 40vw;
  }
  .swiper-container.swiper-container-coverflow {
    padding-top: 0;
  }
}

</style>