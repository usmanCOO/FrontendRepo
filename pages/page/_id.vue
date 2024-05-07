<template>
    <v-container >
      <v-layout wrap mt-5 pt-4>
        <v-flex v-flex class="grey darken-3 px-4 py-4">
          <!-- <v-flex  class="headline mb-2">{{ pageTitle }}</v-flex> -->
          <div d-flex xs12 body-1>
            <p v-html="pageContent">
            </p> 
          </div>
        </v-flex>

      </v-layout>
    </v-container>
</template>
<script>

export default {
  name:'person',
  middleware:['auth','subscription_needed'],
  head(){
    return {
      titleTemplate: this.pageTitle
    }
  },
  data () {
    return {
      pageContent : null,
      pageTitle : null
    }
  },
  methods:{

   getPageData() {
     let pageId = this.$route.params.id;
     let _this = this;
     this.$axios.get('/page/'+pageId).then(function(response){
      let pageData = response.data.pageData;
      _this.pageTitle = pageData.page_title;
      _this.pageContent = pageData.page_content;
     }).catch(function(error){
       console.log(error);
     });
   }
  },
  beforeMount(){
    this.getPageData();
  }
}
</script>
<style scoped>

</style> 