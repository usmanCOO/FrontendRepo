<template>
  <v-content>
    <div class="Vidlix_active_layout">
      <div class="rowContainer_layout active">
        <div class="collectionlayout__Categorylist active">
          <section style=" margin-top: 150px" class="innerCategory__Video">
            <!-- <seriesDetails
              v-show="true"
              :ref="`sol_series_index`"
              :sData="{'type':`sol_series_index`}"
              :withCloseBtn="false"
            />-->
            <videoDetails
              v-show="true"
              :ref="`sol_video_index`"
              :withCloseBtn="false"
              :vData="{'type':'sol_video_index'}"
            />
          </section>
        </div>
      </div>
    </div>
  </v-content>
</template>
<script>
import videoDetails from "~/components/default/base/videoDetails";
export default {
  name: "videoWithDetails",
  middleware: ["auth", "subscription_needed"],
  components: {
    videoDetails
  },
  //   validate({ params }) {
  //     // return /^\d+$/.test(params.id);
  //   },
  data() {
    return {};
  },
  methods: {},
  beforeMount() {},
  mounted() {
    let videoid = this.$route.params.id;
    this.$root.$emit("getVideoData", {
      videoid: videoid,
      identifier: "sol_video_index"
    });

    // this.$root.$emit("getSeriesData", {
    //   series_id: series_id,
    //   identifier: "sol_video_index"
    // });
  }
};
</script>
<style scoped>
.v-btn__content {
  display: none;
}
</style>