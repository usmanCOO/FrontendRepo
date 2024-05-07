 <!-- Footer of the application -->
 <template>
  <div class="footer-box">
    <div class="line-margin"></div>
    <div style="position: absolute; right: 10px; bottom: 65px">
      <a
        href="https://m.me/DeikhoOfficial"
        class="instagram pad-5"
        target="_blank"
      >
        <span class="icon-instagram footer-color-item">
          <img
            src="~/assets/images/messenger_1.png"
            class=""
            width="32"
            height="32"
          />
        </span>
      </a>
    </div>
    <div class="p-50">
      <div class="row  footer-box-margin lr-0">
         <div class="col-md-6">
      <span class="icon-instagram footer-color-item">
        <img src="~/assets/images/white_logo_non.png" class="" width="100" />
      </span>
      <div class="row mt-10 lr-0">
        <div class="col-md-6 lrp-5">
         
          <div class="pad-5 footer-color-item space-5">
            <router-link target="_blank" :to="`/privacypolicy`"
              >Privacy Policy</router-link
            >
          </div> <div class="pad-5 footer-color-item space-5">
            <router-link target="_blank" :to="`/terms`"
              >Terms and Conditions</router-link
            >
          </div>
          <div class="pad-5 footer-color-item space-5">
            <router-link target="_blank" :to="`/contactUs`"
              >Contact Us</router-link
            >
          </div>
        </div>

        <div class="col-md-6 tun-tna-tun">
          <div class="pad-5 footer-color-item space-5">
            <router-link :to="`/aboutus`" target="_blank">About Us</router-link>
          </div>
          <div class="pad-5 footer-color-item space-5">
            <router-link :to="`/faq`" target="_blank">FAQ</router-link>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-md-6 v-center">
      <div class="row lr-0">
        <a
          href="https://play.google.com/store/apps/details?id=com.jazz.pakistani.drama.videos.deikho&hl=en"
          class="facebook pad-5"
          target="_blank"
        >
          <span class="footer-color-item dumdum" >
            <img src="~/assets/images/gplay.png" class="" height="50" />
          </span>
        </a>
        <a
          href="https://apps.apple.com/pk/app/deikho/id1529082248"
          class="facebook pad-5"
          target="_blank"
        >
          <span class="footer-color-item dumdum">
            <img src="~/assets/images/astore.png" class="" height="50" />
          </span>
        </a>
      </div>
    </div>
      </div>
    </div>

    <v-bottom-nav class="footer pt-2">
      <v-layout footer-iner>
        <v-flex
          class="copy-right"
          text-center
          justify-center
          style="cursor: initial"
        >
          <div class="row bm-10 lr-0">
            <v-flex
              class="copy-right"
              text-center
              justify-center
              style="cursor: initial"
            >
              <a
                href=" https://www.facebook.com/deikho19"
                class="facebook pad-5"
                target="_blank"
              >
                <span class="footer-color-item">
                  <img src="~/assets/images/facebook.png" class="" width="30" />
                </span>
              </a>
              <a
                href="https://www.instagram.com/deikho19/"
                class="instagram pad-5"
                target="_blank"
              >
                <span class="icon-instagram footer-color-item">
                  <img
                    src="~/assets/images/instagram-logo.png"
                    class=""
                    width="30"
                  />
                </span>
              </a>
            </v-flex>
          </div>
          <span class="fw-500"
            >Copyright &copy; 2020, Deikho Platform INC, All rights
            reserved.</span
          >
        </v-flex>
      </v-layout>
    </v-bottom-nav>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "appFooter",
  data() {
    return {};
  },
  computed: {
    // mapping store's getters into component
    ...mapGetters(["currentRoute", "configs"]),
  },
  components: {},
};
</script>
<style scoped>
.footer {
  position: absolute;
  bottom: 0;
}
.lrp-5 {
  padding: 0px 5px;
}
.pad-5 {
  padding: 0 10px;
}
.bm-10 {
  margin-bottom: 10px;
}
.lr-0 {
  margin-left: 0px;
  margin-right: 0px;
  padding-right: 0px;
  padding-left: 0px;
}
.mt-10 {
  margin-top: 10px;
}
.space-5 {
  margin: 10px 0;
}
.space-5 > a {
  color: #b9b9b9 !important;
}
.fw-500 {
  font-weight: 500;
}
.footer-box {
  height: 250px;
  color: #282c35;
}
.footer-box-margin {
  margin: 0vmin 20vmin;
}
.line-margin {
  /* margin: 0vmin 20vmin; */
  background: #272b34;
  color: #272b34;
  display: block;
  height: 1px;
  border: 0;
  /* border-top: 1px solid #282c35; */
  border-top: 1px solid #ffc511;
  padding: 0;
}
.footer {
  background: #ffc511 !important;
  align: center !important;
}
.copy-right {
  text-align: center;
  color: black;
}
.p-50 {
  padding: 5vmin 0;
}
.v-center {
  align-items: center;
  display: grid;
}
.d-flex {
  display: flex !important;
  justify-content: center;
}
.footer-color-item {
  color: #bebebe;
}
@media only screen and (max-width: 767px) {
  .footer-box {
    height: 345px;
    width: 99vw;
    color: #282c35;
  }
  
.footer-box-margin {
  margin: 0vmin 0vmin;
  display: flex;
  justify-content: center;
  text-align: center;
}
.v-center{justify-content: center;
margin-top: 10px;}
.dumdum img{
  height: 30px;
}
h2 {
    font-size: 1.4rem !important;
}
.tun-tna-tun{
  margin-top: -10px;
}
}
</style>