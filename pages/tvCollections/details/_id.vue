<template>
  <v-content>
    <div class="Vidlix_active_layout">
      <div class="rowContainer_layout active">
        <div class="collectionlayout__Categorylist active">
          <section style=" margin-top: 150px" class="innerCategory__Video">
            <seriesDetails
              v-show="true"
              :ref="`sol_series_index`"
              :sData="{'type':`sol_series_index`}"
              :withCloseBtn="false"
            />
          </section>
        </div>
      </div>
    </div>
  </v-content>
</template>
<script>
import seriesDetails from "~/components/default/base/seriesDetails";
export default {
  name: "seriesWithDetails",
  // middleware: ["auth", "subscription_needed"],
  // middleware: ["guest"],

  components: {
    seriesDetails
  },
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  data() {
    return {};
  },
  methods: {},
  beforeMount() {},
  mounted() {
    let series_id = this.$route.params.id;
    this.$root.$emit("getSeriesData", {
      series_id: series_id,
      identifier: "sol_series_index"
    });
  }
};
</script>