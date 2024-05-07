<template>
	<v-flex xs12>
    <v-autocomplete
      @input="castAdded"
      :value="selectedOptions"
      :items="options"
      chips
      :label="fieldLabel"
      :hint="fieldHint "
      :item-text="itemText"
      :item-value="itemValue"
      multiple
    >
      <template slot="selection" slot-scope="data">
        <v-chip
          :selected="data.selected"
          close
          :small="true"
          class="chip--select-multi"
          @input="remove(data.item[itemValue])"
        >
          {{ data.item[itemText] }}
        </v-chip>
      </template>
      <template slot="item" slot-scope="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-tile-content v-text="data.item"></v-list-tile-content>
        </template>
        <template v-else>
          <v-list-tile-content>
            <v-list-tile-title v-html="data.item[itemText]"></v-list-tile-title>
          </v-list-tile-content>
        </template>
      </template>
    </v-autocomplete>
  </v-flex>
</template>
<script>
export default {
  name: 'autocomplete',
  props: ['selectedOptions','options','fieldLabel','fieldHint','itemValue','itemText'],
  // props: ['options','fieldLabel','fieldHint','itemValue','itemText'],
	data () {
    return {
    }
  },
  methods: {
    remove (itemId) {
      if(this.$removeIndexByValue(this.selectedOptions,itemId)){
        // Do nothing
      }else{
        this.$removeIndexByObjectId(this.selectedOptions,itemId,this.itemValue)
      }
      
      this.$emit('selectedDataUpdated',this.selectedOptions)
    },
    castAdded(event){
      this.$emit('selectedDataUpdated',event)
    }      
  },
}
</script>