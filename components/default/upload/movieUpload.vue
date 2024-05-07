<template>
	<v-content>
		<div>
			<!-- ***************************** -->
			<!-- uploader starts here -->
			<!-- ***************************** -->		
			<v-tabs-items>
				<v-tab-item transition="scale-transition" reverse-transition="scale-transition" origin="top center 0">
					<v-layout row wrap mx-3 my-5 align-center justify-center row class="upload_selected_video">
						<!-- uploadfile_inner_input -->
						<v-flex lg10 py-3 class="uploadfile_inner tea text-md-center">
						    <uploader :options="options" class="uploader-example" ref="uploader" :fileStatusText="fileStatusText" @file-success="success" @file-complete="fileComplete" @file-error="error" @file-removed="fileRemoved">
						        <uploader-unsupport></uploader-unsupport>
						        <uploader-drop>
						          	<p class="headline text-md-center">Drop files here to upload or</p>
						          	<div class="display-1 my-3">{{$t("drag_drop")}}</div>
									<div class="subheading my-3">
										Upload videos of any common format you can also upload HD videos
									</div>
						          	<div class="text-md-center">
						            	<uploader-btn class="subheading uploadinput" :attrs="attrsVids">
						            		<v-icon>control_point</v-icon>
						            		{{$t("select_videos")}}
						            	</uploader-btn>
						          	</div>
						        </uploader-drop>
						        <uploader-list></uploader-list>
						    </uploader>
						</v-flex>
					</v-layout>
				</v-tab-item>
			</v-tabs-items>	
		</div>
			<!-- uploader ends here -->
		<!-- edit video block -->
		<v-layout row justify-center>
			<v-dialog v-model="editVideo" fullscreen hide-overlay transition="dialog-bottom-transition">
				<v-card>
					<v-toolbar dark color="primary">
						<v-btn icon dark @click="closeEditVideoDialog">
							<v-icon>close</v-icon>
						</v-btn>
						<v-toolbar-title>{{$t("settings")}}</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-toolbar-items>
							<v-btn dark flat @click="validateVideoData" :disabled="fileDataProcessing" :loading="fileDataProcessing">Save</v-btn>
						</v-toolbar-items>
					</v-toolbar>
					<v-container grid-list-md>
						<div class="headline d-block text__Required">{{$t("required_fields")}}</div>
							<v-layout class="Uploaderformopen" py-4 px-3 fill-height>
								<v-flex lg8 md8 xs12 sm12>
									<div class="my-2">
										<v-text-field 
										v-model="title" 
										:label="$t('title')"
										:error-messages="titleError"
						        @input="$v.title.$touch()"
						        @blur="$v.title.$touch()"
										></v-text-field>
									</div>
									<div class="my-2">
										<v-text-field 
										v-model="description" 
										:label="$t('description')"
										:error-messages="descriptionError"
						        @input="$v.description.$touch()"
						        @blur="$v.description.$touch()"
										></v-text-field>
									</div>
									<div class="my-2">
										<v-text-field 
										v-model="tags" 
										:label="$t('tags')" 
										tags 
										clearable
										:error-messages="tagsError"
						        @input="$v.tags.$touch()"
						        @blur="$v.tags.$touch()"
										>
										</v-text-field>
									</div>
									<div class="my-2">
										<v-select
						          v-model="selectedMaturityLevel"
						          hint="Maturity level"
						          :items="maturityLevels"
						          item-text="name"
						          item-value="value"
						          label="Select"
						          persistent-hint
						          return-object
						          single-line
						        ></v-select>
									</div>
									<div class="my-2">
										<v-btn slot="activator" color="primary" dark @click="addVideoLogo = true">
											{{$t("add_video_logo")}}
										</v-btn>
										<v-btn slot="activator" color="primary" dark @click="castAndDirection = true">
											{{$t("cast_and_direction")}}
										</v-btn>
										<v-btn slot="activator" color="primary" dark @click="addSubtitles = true">
											{{$t("subtitle_section")}}
										</v-btn>
										<v-btn slot="activator" color="primary" dark @click="dateAndLocation = true">
											{{$t("date_recorded_location")}}
										</v-btn>
										<v-btn slot="activator" color="primary" dark @click="sharingAndPrivacy = true">
											{{$t("vdo_share_opt")}}
										</v-btn>
									</div>
									<v-layout row wrap mt-4 class="uploadthumbsforms">
										<v-flex lg12 class="upload__thumb">
											<div class="text-md-center my-2">
												<v-btn v-show='false' class="uploadinput">
													<input type="file" id="thumbs" ref="thumbs" multiple accept="image/jpeg" v-on:change="handleThumbsUpload()"/>
												</v-btn>
												<v-btn class="uploadinput" v-on:click="addThumbFiles">{{$t("vdo_select_vdo_thumb")}}</v-btn>
												<v-btn class="uploadinput" v-on:click="submitThumbs">{{$t("submit_thumbs")}}</v-btn>
											</div>
										</v-flex>
										<v-flex v-for="(thumb, key) in thumbs" :key="key" lg3 class="Video_Thumbnails">
											<div class="selected_img">
												<div class="vodthumb">
													<img class="thumbCustom" v-bind:ref="'image'+parseInt( key )">
												</div>
												<v-radio-group v-model="selectedThumb">
													<v-radio :key="key" :value="key"></v-radio>
												</v-radio-group>
												<v-btn fab small @click = "removeVideoThumb(key)"><v-icon style="font-size: 15px;">delete</v-icon></v-btn>
												<p class="caption">{{ thumb.name }}</p>
											</div>
										</v-flex>
									</v-layout>
								</v-flex>
								<v-flex lg4 md4 xs12 sm12 ml-5>
									<div class="Video__Category">
										<div class="headline">
											Movie Genre
										</div>
										<div v-if="videoCategories.length != 0" class="select_Video__Category app-card mb-4">
											<div class="ais-refinement-list">
												<div class="list-item-inner my-2 py-2">
													<!-- second_category with out sub cat -->
													<div v-for="videoCategory in videoCategories" class="list-item-one">
														<div class="v-toolbar__content"> 
															<div class="v-toolbar__title">
																<v-checkbox class="d-inline" v-model="videoCategory.checked" :key="videoCategory.category_id" 
																@click.native="setVideoCategories(videoCategory.category_id,$event)" :label="videoCategory.category_name"
  															></v-checkbox>
  															</div>
														</div> 
													</div>
												</div>
											</div>
										</div>
										<div v-else>
											<div class="ais-refinement-list">
												<div class="list-item-inner my-2 py-2">
													<div class="list-item-one">
														<div class="list-item-one">
															<div class="v-toolbar__content"> 
																{{$t("video_categories_not_found")}}
															</div>    
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</v-flex>
							</v-layout>
						</div>
					</v-container>
				</v-card>
			</v-dialog>
			<!-- Video Logo form  -->
			<v-dialog class="Subtitles_Section" persistent v-model="addVideoLogo" max-width="600px">
				<v-card>
					<v-card-title>
						<span class="headline">{{$t("video_logo_section")}}</span>
					</v-card-title>
					<v-card-text>
						<v-container grid-list-md>
							<v-layout wrap align-center justify-center row>
								<span class="subheading">Upload logo file to show as title of this video, logo file can be 500 KB in size.File extension must be ".png"</span>
								<div class="text-xs-center my-2">
									<!-- simply add multiple for more than one files -->
									<v-btn class="inputsubtitle">
										<input type="file" id="videologoFile" ref="videologoFile" v-on:change="handleVideoLogoUpload()"/>
									</v-btn>
								</div>
							</v-layout>
						</v-container>
						<small></small>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" flat  @click="addVideoLogo=false">Close</v-btn>
						<v-btn color="blue darken-1" flat  @click="submitVideoLogoFile" :disabled="videoLogoProcessing" :loading="videoLogoProcessing">Save</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<!-- cast and direction -->
			<v-dialog class="Location__dialog" persistent v-model="castAndDirection" max-width="600px">
				<v-card>
					<v-card-title>
						<span class="headline">{{$t("cast_and_direction")}}</span>
					</v-card-title>
					<v-card-text>
						<v-container grid-list-md>
							<v-layout wrap align-center justify-center row>
								<v-btn flat color="primary" flat  @click="showAddCast=true">
								  <v-icon class="primary--text">add</v-icon> Add Cast
								</v-btn>
						    <v-btn flat color="primary" flat  @click="showAddDirector=true">
						      <v-icon class="primary--text">add</v-icon> Add director
						    </v-btn>
								<v-layout v-if="showAddCast" row>
								  <v-flex xs12>
								    <v-text-field 
										v-model="castName" 
										:label="$t('add_new_cast')"
										:hint="$t('add_new_cast_if_not_in_list')"
										:error-messages="castNameError"
						        @input="$v.castName.$touch()"
						        @blur="$v.castName.$touch()"
										></v-text-field>
								  </v-flex>
								  <v-flex p>
								    <v-btn flat fab small color="primary"  @click="validateCast">
								      <v-icon class="primary--text">save</v-icon>
								    </v-btn>
								  </v-flex>
								  <v-flex p>
								    <v-btn flat fab small color="primary"  @click="showAddCast=false">
								      <v-icon class="primary--text">clear</v-icon>
								    </v-btn>
								  </v-flex>
								</v-layout>
								<v-layout v-if="showAddDirector" row>
								  <v-flex xs12>
								    <v-text-field 
										v-model="directorName" 
										:label="$t('add_new_director')"
										:hint="$t('add_new_director_if_not_in_list')"
										:error-messages="directorNameError"
						        @input="$v.directorName.$touch()"
						        @blur="$v.directorName.$touch()"
										></v-text-field>
								  </v-flex>
								  <v-flex p>
								    <v-btn flat fab small color="primary"  @click="validateDirector">
								      <v-icon class="primary--text">save</v-icon>
								    </v-btn>
								  </v-flex>
								  <v-flex p>
								    <v-btn flat fab small color="primary" @click="showAddDirector=false">
								      <v-icon class="primary--text">clear</v-icon>
								    </v-btn>
								  </v-flex>
								</v-layout>
								<autocomplete 
								:fieldLabel="$t('select_cast')" 
								:fieldHint="$t('select_cast')" 
								:itemValue="'cast_id'" 
								:itemText="'name'"
								@selectedDataUpdated="updateCast"
								:options='cast' 
								:selectedOptions='selectedCast' 
								/>
							  <autocomplete 
							  :fieldLabel="$t('select_director')" 
							  :fieldHint="$t('select_director')" 
							  :itemValue="'director_id'" 
							  :itemText="'name'"
							  @selectedDataUpdated="updateDirectors"
							  :options='directors' 
								:selectedOptions='selectedDirectors' 
							  />
							</v-layout>
						</v-container>
					<small></small>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" flat  @click="castAndDirection=false">Close</v-btn>
						<v-btn color="blue darken-1" flat  @click="castAndDirection=false">Save</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<!-- subtitles_Section_Form  -->
			<v-dialog class="Subtitles_Section" persistent v-model="addSubtitles" max-width="600px">
				<v-card>
					<v-card-title>
						<span class="headline">{{$t("subtitle_section")}}</span>
					</v-card-title>
					<v-card-text>
						<v-container grid-list-md>
							<v-layout v-if="subtitleUploadDone" wrap align-center justify-center row>
                <div class="text-xs-center my-2">
                  <v-btn class="inputsubtitle" @click="uploadAnotherSub">
                    Upload another subtitle
                  </v-btn>
                  <v-btn class="inputsubtitle" @click="closeUploadSub">
                    Close
                  </v-btn>
                </div>
              </v-layout>
							<v-layout v-else wrap align-center justify-center row>
								<span class="subheading">Upload subtitle file,format must be ".vtt"</span>
								<div class="text-xs-center my-2">
									<!-- simply add multiple for more than one files -->
									<v-btn class="inputsubtitle">
										<input type="file" id="subtitleFiles" ref="subtitleFiles" v-on:change="handleSubtitleFilesUpload()"/>
									</v-btn>
								</div>
								<v-flex xs12 my-2>
									<v-text-field
									v-model="subtitleName"
									label="Language of Subtitle file. e:g English(uk)"
									solo
									:error-messages="subtitleNameError"
					        @input="$v.subtitleName.$touch()"
					        @blur="$v.subtitleName.$touch()"
									></v-text-field>
								</v-flex>
								<v-flex xs12 my-2>
									<v-select 
									v-model="subtitleIsDefault" 
									:items="selection" 
									item-text="name" 
									item-value="value" 
									:label="$t('Is default')"
									></v-select>
								</v-flex>
							</v-layout>
						</v-container>
						<small></small>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" flat  @click="closeUploadSub">Close</v-btn>
						<v-btn color="blue darken-1" flat  @click="validateSubtitle" :disabled="subtitleProcessing" :loading="subtitleProcessing">Save</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<!-- date recorded & Location_dialog -->
			<v-dialog class="Location__dialog" persistent v-model="dateAndLocation" max-width="600px">
				<v-card>
					<v-card-title>
						<span class="headline">{{$t("date_recorded_location")}}</span>
					</v-card-title>
					<v-card-text>
						<v-container grid-list-md>
							<v-layout wrap align-center justify-center row>
								<v-flex xs12>
									<v-select
									:items="countries"
									item-text="name_en"
									item-value="iso2" 
									v-model="blockedInCountries"
									:label="$t('blocked_in_countries')"
									multiple
									chips
									hint="Countries where this video won't be accessible (Optional)"
									persistent-hint
									prepend-icon="block"
									></v-select>
								</v-flex>
								<v-flex xs12>
									<v-select
									:items="countries"
									item-text="name_en"
									item-value="iso2" 
									v-model="uploadedFrom"
									:label="$t('uploaded_from')"
									hint="Country from where this video is being uploaded (Optional)"
									persistent-hint
									prepend-icon="outlined_flag"
									></v-select>
								</v-flex>
								<v-flex xs12 class="mt-3">
									<v-menu
									ref="menu"
									:close-on-content-click="false"
									v-model="menu"
									:nudge-right="40"
									:return-value.sync="dateCreated"
									lazy
									transition="scale-transition"
									offset-y
									full-width
									min-width="290px"
									>
										<v-text-field
										slot="activator"
										v-model="dateCreated"
										:label="$t('date_recorded')"
										prepend-icon="event"
										readonly
										></v-text-field>
										<v-date-picker v-model="dateCreated" no-title scrollable>
											<v-spacer></v-spacer>
											<v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
											<v-btn flat color="primary" @click="$refs.menu.save(dateCreated)">OK</v-btn>
										</v-date-picker>
									</v-menu>
								</v-flex>
							</v-layout>
						</v-container>
					<small></small>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" flat  @click="dateAndLocation=false">Close</v-btn>
						<v-btn color="blue darken-1" flat  @click="dateAndLocation=false">Save</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<!-- sharing block -->
			<v-dialog class="Sharing__options" persistent v-model="sharingAndPrivacy" max-width="600px">
				<v-card>
					<v-card-title>
						<span class="headline">{{$t("vdo_share_opt")}}</span>
					</v-card-title>
					<v-card-text>
								<div class="sectionContent">
									<p class="subheading">{{$t("privacy_options")}}</p>
									<v-radio-group v-model="privacyOption">
										<v-flex lg12 class="option__inners">	
											<v-flex d-inline-block>
												 <v-radio key="public" value="public" label="Public - Share your video with Everyone! (Recommended)"></v-radio>
											</v-flex>
										</v-flex>
										<v-flex lg12 class="option__inners">	
											<v-flex d-inline-block>
													<v-radio key="private" value="private" label="Private - Viewable by you and your friends only."></v-radio>
											</v-flex>
										</v-flex>
										<v-flex lg12 class="option__inners">	
											<v-flex d-inline-block>
												<v-radio key="unlisted" value="unlisted" label="Unlisted (anyone with the link and/or password can view)"></v-radio>
											</v-flex>
										</v-flex>
										<v-flex lg12 class="option__inners">	
											<v-flex d-inline-block>
												<v-radio key="logged" value="logged" label="Logged only (only logged in users can watch)"></v-radio>
											</v-flex>
										</v-flex>
									</v-radio-group>
								</div>
								<div class="sectionContent">
									<v-flex lg12 class="option__inners_group">
											<p class="subheading">{{$t("video_rating")}}</p>
											<v-switch
												label="Allow video rating?"
									      v-model="allowVideoRating"
									    ></v-switch>
									</v-flex>	
								</div>
						<small></small>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" flat  @click="sharingAndPrivacy=false">Close</v-btn>
						<v-btn color="blue darken-1" flat  @click="sharingAndPrivacy=false">Save</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog> 
		</v-layout>
		<template v-if='fileDataProcessing'>
      <loader msg="Please stand by saving video details"/>
    </template>
    <template v-if='subtitleProcessing'>
      <loader msg="Please stand by uploading subtitle"/>
    </template>
    <template v-if='videoLogoProcessing'>
      <loader msg="Please stand by uploading video logo"/>
    </template>
    <template v-if='thumbsProcessing'>
      <loader msg="Please stand by uploading thumbs"/>
    </template>
    <template v-if='genProcessing'>
      <circleLoader/>
    </template>
	</v-content>
</template>
<script>
	import { mapGetters } from "vuex";
	import { required,minLength,maxLength } from 'vuelidate/lib/validators'
	import loader from '~/components/default/loader'
	import circleLoader from '~/components/default/circleLoader'
	import autocomplete from '~/components/default/base/autocomplete'
	export default {
		name:'upload',
	  components: {
			loader,
			circleLoader,
			autocomplete
		},
		data () {
			return {
				// *** Simple uploader ***
				uploader:null,
				uniStamp:null,
      	options: {
	        // target: 'http://httpbin.org/anything',
	        target: this.$axios.defaults.baseURL+'/videos/uploadChunks',
	        headers: {
	            Authorization:this.$axios.defaults.headers.common.Authorization
	        },
	        fileParameterName:'video',
	        testChunks: false,
	        allowDuplicateUploads:true,
	        chunkRetryInterval:500,
	        query:{
	            app:'web',
	        },
        	generateUniqueIdentifier(){
          	let randNum = Math.floor(Math.random() * 10) + 1;
          	return ""+Date.now() + Math.random().toString(36).replace('0.', '') + randNum;
        	},
         	parseTimeRemaining: function (timeRemaining, parsedTimeRemaining) {
            return '('+parsedTimeRemaining
              .replace(/\syears?/, ' years')
              .replace(/\days?/, ' days')
              .replace(/\shours?/, ' hours')
              .replace(/\sminutes?/, ' minutes')
              .replace(/\sseconds?/, ' seconds')+' left)'
        	}
      	},
        attrsVids: {
          filename:'video',
          accept: ['.wmv','.avi','.divx','.3gp','.mov','.mpeg','.mpg','.xvid','.flv','.asf','.rm','.dat','.mp4','.mkv','.WMV','.AVI','.DIVX','.3GP','.MOV','.MPEG','.MPG','.XVID','.FLV','.ASF','.RM','.DAT','.MP4','.MP3','.MKV'],
        },
        fileStatusText:
        {
          error: "An error occured",
          paused: "Uploading has been paused",
          success: "Success file uploaded",
          uploading: "Uploading",
          waiting: "Waiting",
        },				
				// *** Simple uploader ***
        // edit video
				fileDataProcessing : false,
				subtitleProcessing : false,
				genProcessing : false,
				fileToEdit : null,
				// dialog boxes
        editVideo : false,
        addSubtitles : false,
        dateAndLocation : false,
        sharingAndPrivacy : false,
        castAndDirection : false,
        // video logo thing
        addVideoLogo : false,
        videoLogoProcessing : false,
        logoFile :'',
				// dialog boxes
        videoid : '',
        title : '',
        description : '',
        tags : '',
				videoCategories : [],
        checkedVideoCategories : [],
        dateCreated: new Date().toISOString().slice(0,10),
				menu: false,
        selectedThumb : '',
        VideoPassword : '',
        Videousers : '',
        subtitleName : '',
        blockedInCountries :[],
        uploadedFrom : '',
				allowVideoRating : true,
				privacyOption : 'public',
				subtitleFiles : '',
				subtitleUploadDone : false,
				subtitleIsDefault : {name:'No',value:'no'},
				selection : [
					{name:'No',value:'no'}, 
					{name:'Yes',value:'yes'}
				],
				// Cast and direction
				directorName: '',
				castName: '',
				cast: [],
				directors: [],
				selectedCast: [],
				selectedDirectors: [],
				showAddCast: false,
				showAddDirector: false,
				// edit video
        thumbsProcessing: false,
        thumbs: [],
        // checkmate
        selectedMaturityLevel: { name: 'All', value: 'all' },
        maturityLevels: [
          { name: 'All', value: 'all' },
          { name: '7+', value: '7_plus' },
          { name: '13+', value: '13_plus' },
          { name: '16+', value: '16_plus' },
          { name: '18+', value: '18_plus' }
        ],
      }
		},
		validations: {
        title: { required,minLength: minLength(5),maxLength: maxLength(60) },
        description: { required,minLength: minLength(5) },
        tags: { required },
        subtitleName: { required,minLength: minLength(3),maxLength: maxLength(60) },
        castName: { required,minLength: minLength(5),maxLength: maxLength(150) },
        directorName: { required,minLength: minLength(5),maxLength: maxLength(150) },
    },
		computed:{
			...mapGetters(["countries"]),
	    titleError () {
	      const errors = []
	      if (!this.$v.title.$dirty) return errors
	      !this.$v.title.required && errors.push('Title name is required')
	      !this.$v.title.minLength && errors.push('Title must contain atleast 5 characters')
	      !this.$v.title.maxLength && errors.push('Title must be 60 characters maximum')
	      return errors
	    },
	    descriptionError () {
	      const errors = []
	      if (!this.$v.description.$dirty) return errors
	      !this.$v.description.required && errors.push('Description is required')
	      !this.$v.description.minLength && errors.push('Description must contain atleast 5 characters')
	      return errors
	    },
	    tagsError () {
	      const errors = []
	      if (!this.$v.tags.$dirty) return errors
	      !this.$v.tags.required && errors.push('tags are required minimun 1')
	      return errors
	    },
			subtitleNameError () {
	      const errors = []
	      if (!this.$v.subtitleName.$dirty) return errors
	      !this.$v.subtitleName.required && errors.push('Subtitle name is required')
	      !this.$v.subtitleName.minLength && errors.push('Subtitle must contain atleast 3 characters')
	      !this.$v.subtitleName.maxLength && errors.push('Subtitle must be 60 characters maximum')
	      return errors
	    },
	    castNameError () {
	      const errors = []
	      if (!this.$v.castName.$dirty) return errors
	      !this.$v.castName.required && errors.push('Cast name is required')
	      !this.$v.castName.minLength && errors.push('Cast name must contain atleast 5 characters')
	      !this.$v.castName.maxLength && errors.push('Cast name must be 150 characters maximum')
	      return errors
	    },
	    directorNameError () {
	      const errors = []
	      if (!this.$v.directorName.$dirty) return errors
	      !this.$v.directorName.required && errors.push('Director name is required')
	      !this.$v.directorName.minLength && errors.push('Director name must contain atleast 5 characters')
	      !this.$v.directorName.maxLength && errors.push('Director name must be 150 characters maximum')
	      return errors
	    },
		},
		methods:{
			// *** Simple uploader methods ***
      fileComplete (file) {
      	this.insertVideo(file)
        this.$console(file.name+' upload completed!', 'w')
      },
      success(rootFile, file){
        try{	
	        let numberOfChunks = file.chunks.length 
	        file.totalChunks = numberOfChunks
	        this.$axios.post('/videos/processVideo', file).then((response)=>{
	            this.$console(file.name+' Chunks gathered!')
					}).catch((err)=>{
	            if(!err.response){
	              this.$store.commit('snackIt',"Server isn't responding file processing could not be started")
	            }else{
	              let errorMsg = err.response.data.errors.error
	              console.log(errorMsg)
	              this.$store.commit('snackIt',errorMsg[0])
	            }
	        });
      	}catch(err){
      		console.log(err)
      	}
			},
			insertVideo(file){
				try{
					var videoObj = {
						'title' : file.name,
						'description' : file.name,
						'filename':file.uniqueIdentifier,
					}
					this.$axios.post('/videos/insert', videoObj).then((response)=>{
						this.$store.commit('snackIt',file.name+' Uploaded Successfully and is under processing');
						this.$console(file.name+' upload success!', 's');
					}).catch((err)=>{
						this.cleanUpJunk(file)
						if(!err.response){
							this.$store.commit('snackIt',"Server isn't responding file processing could not be started")
						}else{
							let errorMsg = err.response.data.errors.error;
							console.log(errorMsg)
							this.$store.commit('snackIt',errorMsg[0]);
						}
					});
				}catch(err){
					console.log(err)
				}
	    },
      error(rootFile, file, message){
      	try{
          this.$console('Error occured for file '+file.name, 'd');
          let msgObj = JSON.parse(message)
          let errorMsg = msgObj.errors.error;
          this.$store.commit('snackIt',errorMsg[0]+' for file '+file.name);
          this.cleanUpJunk(file)
  	  	}catch(err){
  	  		console.log(err)
  	  	}
      },
      fileRemoved(file){
      	try{
	        this.$console(file.name+' removed from queue!');
	        this.cleanUpJunk(file)
	      }catch(err){
	    		console.log(err)
	    	}
      },
      cleanUpJunk(file){
				this.$axios.post('/videos/cleanUpJunk', file).then((response)=>{
            this.$console('Chunks cleaned up','d')
        }).catch((err)=>{
            if(!err.response){
              this.$store.commit('snackIt',"Server isn't responding can't remove the junky chunks")
            }else{
              let errorMsg = err.response.data.errors.error;
              this.$store.commit('snackIt',errorMsg[0]);
            }
        });
			},
			// *** Simple uploader methods ***
			// VDATA
      closeEditVideoDialog () {
				this.editVideo = false
				this.$store.commit('editUploadedFile', null)
			},
			setVideoCategories(catId,event){
				this.checkedVideoCategories.includes(catId) ? this.$removeIndexByValue(this.checkedVideoCategories,catId) : this.checkedVideoCategories.push(catId)
			},
			saveEditedVideo () {
        this.fileDataProcessing = true;
        var videoObj = {
          'videoid' : this.videoid,
          'title' : this.title,
          'description' : this.description,
          'maturity_level' : this.selectedMaturityLevel.value,
          'tags':this.tags,
          'filename':this.fileToEdit.uniqueIdentifier,
          'category':this.checkedVideoCategories,
          'blocked_countries':this.blockedInCountries,
          'country':this.uploadedFrom,
          'allow_rating':this.allowVideoRating,
          'broadcast':this.privacyOption,
          'datecreated':this.dateCreated,
          'cast':this.selectedCast,
          'directors':this.selectedDirectors,
        }
        try{
        	this.$axios.put('/videos/update', videoObj).then((response)=>{
            this.$store.commit('snackIt',this.title+"'s details updated")
	        }).catch((err)=>{
            if(!err.response){
              this.$store.commit('snackIt',"Server isn't responding can't check the updated video's status")
            }else{
              let errorMsg = err.response.data.errors.error;
              this.$store.commit('snackIt',errorMsg[0]);
            }
	        });
	    	}catch(err){
	    		console.log(err)
	    	}
        this.fileDataProcessing = false
      },
      // Thumbs
      handleSubtitleFilesUpload(){
        this.subtitleFiles = this.$refs.subtitleFiles.files;
      },
      submitSubtitleFile(){
      	try{
					this.subtitleProcessing = true
	        let formData = new FormData();
					for( var i = 0; i < this.subtitleFiles.length; i++ ){
	          let file = this.subtitleFiles[i];
						formData.append('subtitleFiles[' + i + ']', file);
	        }
	        
	        formData.append('filename', this.fileToEdit.uniqueIdentifier)
	        formData.append('videoid', this.videoid)
					formData.append('subtitle_name', this.subtitleName)
					formData.append('isdefault', this.subtitleIsDefault)

					this.$axios.post( '/videos/uploadSubtitles',formData).then((response) => {
	          this.subtitleProcessing = false
	          this.$store.commit('snackIt','Subtitle updated for '+this.title)
	          this.clearSubtitleForm ()
	          this.subtitleUploadDone = true
					}).catch((err)=>{
	          this.subtitleProcessing = false
	          console.log(err.response)
            if(!err.response){
              this.$store.commit('snackIt',"Server isn't responding can't update subtitle")
            }else{
              let errorMsg = err.response.data.errors.error;
              this.$store.commit('snackIt',errorMsg[0]);
            }
	        });
	      }catch(err){
      		console.log(err)
      	}
      },
      // Handling video logo upload
      handleVideoLogoUpload(){
        this.logoFile = this.$refs.videologoFile.files[0];
        let reader  = new FileReader();
        if( this.logoFile ){
          if ( /\.(png)$/i.test( this.logoFile.name ) && this.logoFile.type == 'image/png' ) {
            reader.readAsDataURL( this.logoFile );
          }else{
          	this.clearVideoLogoForm()
			    	this.$store.commit('snackIt','Invalid image type for '+this.logoFile.name+' only png is supported')
		    	}
        }
      },
      submitVideoLogoFile(){
				try{
					this.videoLogoProcessing = true
					let formData = new FormData();
					formData.append('logoFile', this.logoFile)
					formData.append('filename', this.fileToEdit.uniqueIdentifier)

		      this.$axios.post( '/videos/addVideoLogo',formData ).then((response) => {
        		
        		console.log(response)
        		this.videoLogoProcessing = false
        		this.$store.commit('snackIt','Logo uploaded for '+this.title)
	          this.clearVideoLogoForm()

	        }).catch((err)=>{
	        	
	        	console.log(err)
	      		this.videoLogoProcessing = false
	          if(!err.response){
	            this.$store.commit('snackIt',"Server isn't responding can't update subtitle")
	          }else{
	            let errorMsg = err.response.data.errors.error;
	            this.$store.commit('snackIt',errorMsg[0]);
	          }

	        });

	      }catch(err){
      		console.log(err)
      	}
      },
      clearVideoLogoForm () {
      	this.addVideoLogo = false
    		let input = this.$refs.videologoFile;
        input.type = 'text';
        input.type = 'file';
	    },
      // Thumbs
      addThumbFiles(){
        this.$refs.thumbs.click();
      },
      removeVideoThumb(key){
        this.thumbs.splice(key, 1);
        let apiThumbKey = key + 1;
        try{
	        this.$axios.delete( '/videos/deleteVideoThumb/'+apiThumbKey,{ data: { 'filename': this.fileToEdit.uniqueIdentifier }}).then((response) => {
	        	this.$store.commit('snackIt','Thumb deleted for '+this.title)
	        }).catch((err)=>{
	          if(!err.response){
	            this.$store.commit('snackIt',"Server isn't responding can't remove the junky chunks")
	          }else{
	            let errorMsg = err.response.data.errors.error;
	            this.$store.commit('snackIt',errorMsg[0]);
	          }
	        });
      	}catch(err){
      		console.log(err)
				}
        this.getThumbsPreviews()
      },
      handleThumbsUpload(){
		  	let uploadedFiles = this.$refs.thumbs.files
		  	for( var i = 0; i < uploadedFiles.length; i++ ){
		  		if ( /\.(jpg)$/i.test( uploadedFiles[i].name ) && uploadedFiles[i].type == 'image/jpeg') {
			    	this.thumbs.push( uploadedFiles[i] );
						this.getThumbsPreviews();
		    	}else{
			    	this.$store.commit('snackIt','Invalid image type for '+uploadedFiles[i].name+' only jpg is supported')
		    	}
		    }
		  },
      getThumbsPreviews() {
      	for (var i = 0, thumb; thumb = this.thumbs[i]; i++) {
					var reader = new FileReader();
					reader.onload = ( (theFile) => {
	        	return (e) => {
	        		this.$refs['image'+parseInt( i-1 )][0].src = reader.result;
	          };
	        })(thumb);
					reader.readAsDataURL(thumb);
      	}
      },
      submitThumbs(){
      	try{
					this.thumbsProcessing = true
	        let formData = new FormData();
					for( var i = 0; i < this.thumbs.length; i++ ){
	          let file = this.thumbs[i];
						formData.append('thumbs[' + i + ']', file);
	        }
	        formData.append('filename', this.fileToEdit.uniqueIdentifier)
	        formData.append('default_thumb', this.selectedThumb + 1)
	        this.$axios.post( '/videos/uploadVideoThumbs',formData).then((response) => {
	        	this.thumbsProcessing = false
	        	this.$store.commit('snackIt','Thumbs updated for '+this.title)
	        }).catch((err)=>{
	        	this.thumbsProcessing = false
	          if(!err.response){
              this.$store.commit('snackIt',"Server isn't responding can't remove the junky chunks")
            }else{
              let errorMsg = err.response.data.errors.error;
              this.$store.commit('snackIt',errorMsg[0]);
            }
	        });
	      }catch(err){
      		console.log(err)
      	}
      },
      // Cast and direction
      addNewCast(){
				this.genProcessing = true
				try {
					let obj = { 'cast_name':this.castName }
					this.$axios.post('/cast/addNewCast', obj).then((response)=>{
						this.setUpCast()
						this.showAddCast = false
						this.clearCastField()
						this.genProcessing = false
          }).catch((err)=>{
          	this.genProcessing = false
            if(!err.response){
              this.$store.commit('snackIt',"Server isn't responding file processing could not be started")
            }else{
              let errorMsg = err.response.data.errors.error
              console.log(errorMsg)
              this.$store.commit('snackIt',errorMsg[0])
            }
		      });
				} catch(e) {
					console.log(e);
				}
			},
			addNewDirector(){
				this.genProcessing = true
				try {
					let obj = { 'director_name':this.directorName }
					this.$axios.post('/directors/addNewDirector', obj).then((response)=>{
						this.setUpDirectors()
						this.showAddDirector = false
						this.clearDirectorField()
						this.genProcessing = false
          }).catch((err)=>{
          	this.genProcessing = false
            if(!err.response){
              this.$store.commit('snackIt',"Server isn't responding file processing could not be started")
            }else{
              let errorMsg = err.response.data.errors.error
              console.log(errorMsg)
              this.$store.commit('snackIt',errorMsg[0])
            }
		      });
				} catch(e) {
					console.log(e);
				}
			},
      // clear subtitle form
      clearSubtitleForm () {
    		this.subtitleName = ''
    		let input = this.$refs.subtitleFiles;
        input.type = 'text';
        input.type = 'file';
	    },
	    clearDirectorField () {
    		this.directorName = ''
    	},
    	clearCastField () {
    		this.castName = ''
    	},
	    // Validations
      validateVideoData () {
        this.$v.title.$touch()
        this.$v.description.$touch()
        this.$v.tags.$touch()
        if (!this.$v.title.$invalid) 
	        if (!this.$v.description.$invalid)
	          if (!this.$v.tags.$invalid)
	          	this.saveEditedVideo()
	    },
      validateSubtitle () {
        this.$v.subtitleName.$touch()
        if (!this.$v.subtitleName.$invalid) {
          this.submitSubtitleFile()
        }
      },
      validateCast () {
        this.$v.castName.$touch()
        if (!this.$v.castName.$invalid) {
          this.addNewCast()
        }
      },
      validateDirector () {
        this.$v.directorName.$touch()
        if (!this.$v.directorName.$invalid) {
          this.addNewDirector()
        }
      },
      // Setting up initial data
      async setUpCategories(){
      	try {
	        await this.$axios.get(`/videos/categories/`).then((response) => {
	          this.videoCategories = response.data.categories
	          let defaultCatObj = this.$findObjectByKey(this.videoCategories,'checked',true)
						this.checkedVideoCategories.push(defaultCatObj.category_id)
	        }, (err) => {
	          if (!err.response) {
	            this.$store.commit('snackIt', "Server isn't responding video categories can't be fetched")
	          } else {
	            let errorMsg = err.response.data.errors.error
	            console.log(errorMsg)
	            this.$store.commit('snackIt', errorMsg[0])
	          }
	        })
	      } catch (err) {
	        console.log(err)
	      }
      },
      setUpCast(){
      	try {
	        this.$axios.get(`/cast/list/`).then((response) => {
	          this.cast = response.data.data
	        }, (err) => {
	          if (!err.response) {
	            this.$store.commit('snackIt', "Server isn't responding movie cast can't be fetched")
	          } else {
	            let errorMsg = err.response.data.errors.error
	            console.log(errorMsg)
	            this.$store.commit('snackIt', errorMsg[0])
	          }
	        })
	      } catch (err) {
	        console.log(err)
	      }
      },
      setUpDirectors(){
      	try {
	        this.$axios.get(`/directors/list/`).then((response) => {
	          this.directors = response.data.data
	        }, (err) => {
	          if (!err.response) {
	            this.$store.commit('snackIt', "Server isn't responding movie director can't be fetched")
	          } else {
	            let errorMsg = err.response.data.errors.error
	            console.log(errorMsg)
	            this.$store.commit('snackIt', errorMsg[0])
	          }
	        })
	      } catch (err) {
	        console.log(err)
	      }
      },
      updateCast(event){
      	this.selectedCast = event
      },
      updateDirectors(event){
      	this.selectedDirectors = event
      },
      uploadAnotherSub(){
      	this.subtitleUploadDone = false
      	this.subtitleIsDefault = {name:'No',value:'no'}
      },
      closeUploadSub(){
      	this.addSubtitles=false
      	this.subtitleUploadDone = false
      	this.subtitleIsDefault = {name:'No',value:'no'}
      }
		},
		created () {
			this.$store.watch(state => state.uploadedFileToEdit, () => {
	      this.fileToEdit = this.$store.state.uploadedFileToEdit
	      if (!this.$isEmptyObj(this.fileToEdit)) {
	        var file = this.fileToEdit
	        
	        this.videoid = file.videoid
	        this.title = file.title
	        this.description = file.description
	        this.tags = file.tags
	        this.privacyOption = file.broadcast
	        this.selectedCast = file.cast
	        this.selectedDirectors = file.director
	        this.selectedMaturityLevel = file.maturity_level

	        file.allow_rating == 'yes' ? this.allowVideoRating = true : this.allowVideoRating = false
	       	// Categories check uncheck according to video issue solved finally (DON'T TOUCH IT OR IT WILL BE A MESS)
	       	var videoCatTemp = []
					var checkCatTemp = []
	        for (var cat of this.videoCategories) {
	        	if(file.category.includes(cat.category_id.toString())) { 
	        		cat.checked = true 
	        		checkCatTemp.push(cat.category_id)
						}else{ 
	        		cat.checked = false
					  }
					  videoCatTemp.push(cat)
					}
					this.videoCategories = videoCatTemp
					this.checkedVideoCategories = checkCatTemp
	       	// Categories check uncheck according to video issue solved finally (DON'T TOUCH IT OR IT WILL BE A MESS)
					this.blockedInCountries = file.blocked_countries
					this.uploadedFrom = file.country
					this.dateCreated = file.datecreated
					this.editVideo = true
	      

	      }
    	})
		},
		beforeMount(){
			this.setUpCategories()
			this.setUpCast()
			this.setUpDirectors()
		},
		mounted () {

		}
	}
</script>
<style scoped>
  .uploader-drop{
    background-color:#0c0c0c !important;
    height:250px;
    border:0px;
  }
  .uploader-example .uploader-btn {
    color:#fff;
    margin-right: 4px;
    padding:10px;
    border-radius: 25px;
    background-color: #FF3E42;
    border:0px;
    font-size:14px;
    text-transform:uppercase;
    font-weight:500;
  }
  .uploader-example .uploader-list {
    max-height: auto;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #333333;
    color:#333333;
  } 
  .thumbCustom{
  	border: 1px solid #ddd; /* Gray border */
	  border-radius: 4px;  /* Rounded border */
	  padding: 5px; /* Some padding */
	  width: 150px; /* Set a small width */
  }
</style>  