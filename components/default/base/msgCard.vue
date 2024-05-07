<template v-if="isEmptyList">
	<v-flex mt-4 xs10 offset-xs1>
	  <v-card>
			<v-card-text>
				<p>No Package exists for now please ask admin to create one.</p>
			</v-card-text>
		</v-card>
	</v-flex>
</template>
<script>
export default {
  name: 'msgCard',
  data () {
    return {
    }
  },
  methods: {
        
  },
}
</script>