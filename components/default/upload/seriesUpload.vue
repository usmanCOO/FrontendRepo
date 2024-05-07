<template>
	<v-content>
		<div>
			<!-- ***************************** -->
			<!-- uploader starts here -->
			<!-- ***************************** -->		
			<v-tabs-items>
				<v-tab-item transition="scale-transition" reverse-transition="scale-transition" origin="top center 0">
					<v-layout row wrap mx-3 my-5 align-center justify-center row class="upload_selected_video">
						<v-flex lg10 class="uploaderprogress__block">
							<div class="moreuploadbtn">
								<v-flex d-inline-block lg2 mx-2>
									<v-select
									:items="series"
									item-text="series_name"
									item-value="series_id"
									v-on:change="seriesSelected"
									:label="$t('select_tv_series')"
									>
									</v-select>
								</v-flex>
								<v-flex v-if="seasonAreHere" d-inline-block lg2 mx-2>
									<v-select
									:items="seasons"
									item-text="sequence"
									item-value="season_id"
									v-model="selectedSeason"
									:label="$t('select_season')"
									>
									</v-select>
								</v-flex>
								<v-flex v-if="seasonAreHere" d-inline-block lg2 mx-2>
									<v-list-tile>
										<v-dialog v-model="addSeasonDialog" persistent max-width="500px">
											<v-btn slot="activator" color="primary" dark>+{{$t("add_new_season")}}</v-btn>
											<v-card>
												<v-card-title>
													<span class="headline">{{$t("add_new_season")}}</span>
												</v-card-title>
												<v-card-text>
													<v-container grid-list-md>
														<v-layout wrap>
															<v-text-field :label="$t('sequence_number')" hint="1,2,3 and so on (can be number only)" required v-model="seasonSequenceNumber"
																:error-messages="seasonSequenceNumberError"
												        @input="$v.seasonSequenceNumber.$touch()"
												        @blur="$v.seasonSequenceNumber.$touch()"
															></v-text-field>
														</v-layout>
													</v-container>
												</v-card-text>
												<v-card-actions>
													<v-spacer></v-spacer>
													<v-btn color="blue darken-1" flat @click="validateSequenceNumber">{{$t("submit")}}</v-btn>
													<v-btn color="blue darken-1" flat @click="addSeasonDialog = false">{{$t("close")}}</v-btn>
												</v-card-actions>
											</v-card>
										</v-dialog>
									</v-list-tile>
								</v-flex>
								<div class="right mt-2">
									<v-btn color="primary" 
										dark @click="createNewSeries 
										= true">
											{{$t("create_new_series")}}
									</v-btn>
								</div>
							</div>
						</v-flex>
						<!-- uploadfile_inner_input -->
						<v-flex v-show="seriesIsSelected" lg10 py-3 class="uploadfile_inner tea text-md-center">
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
						            		{{$t("select_video")}}
						            	</uploader-btn>
						          	</div>
						        </uploader-drop>
						        <uploader-list></uploader-list>
						    </uploader>
						</v-flex>
						<v-flex v-if="!seriesIsSelected" lg10 py-3 class="uploadfile_inner tea text-md-center">
						    {{$t("please_select_a_series_first_or_create_one")}}
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
							<v-btn dark flat @click="validateVideoData" :disabled="fileDataProcessing" :loading="fileDataProcessing">{{$t("save")}}</v-btn>
						</v-toolbar-items>
					</v-toolbar>
					<v-container grid-list-md>
						<div class="headline d-block text__Required">{{$t("required_fields")}}</div>
							<v-layout class="Uploaderformopen" py-4 px-3 fill-height>
								<v-flex lg12 md12 xs12 sm12>
									<div class="my-2">
										<v-text-field 
										v-model="title" 
										label="Title"
										:error-messages="titleError"
						        @input="$v.title.$touch()"
						        @blur="$v.title.$touch()"
										></v-text-field>
									</div>
									<div class="my-2">
										<v-text-field 
										v-model="description" 
										label="description"
										:error-messages="descriptionError"
						        @input="$v.description.$touch()"
						        @blur="$v.description.$touch()"
										></v-text-field>
									</div>
									<div class="my-2">
										<v-text-field 
										v-model="tags" 
										label="Tags" 
										tags 
										clearable
										:error-messages="tagsError"
						        @input="$v.tags.$touch()"
						        @blur="$v.tags.$touch()"
										>
										</v-text-field>
									</div>
									<div class="my-2">
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
							</v-layout>
						</div>
					</v-container>
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
						<v-btn color="blue darken-1" flat  @click="dateAndLocation=false">{{$t("close")}}</v-btn>
						<v-btn color="blue darken-1" flat  @click="dateAndLocation=false">{{$t("save")}}</v-btn>
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
												 <v-radio key="public" value="public" :label="$t('vdo_br_opt1')"></v-radio>
											</v-flex>
										</v-flex>
										<v-flex lg12 class="option__inners">	
											<v-flex d-inline-block>
													<v-radio key="private" value="private" :label="$t('vdo_br_opt2')"></v-radio>
											</v-flex>
										</v-flex>
										<v-flex lg12 class="option__inners">	
											<v-flex d-inline-block>
												<v-radio key="unlisted" value="unlisted" :label="$t('vdo_broadcast_unlisted')"></v-radio>
											</v-flex>
										</v-flex>
										<v-flex lg12 class="option__inners">	
											<v-flex d-inline-block>
												<v-radio key="logged" value="logged" :label="$t('logged_users_only')"></v-radio>
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
			<v-dialog class="Creatcollectionform" persistent v-model="createNewSeries" max-width="600px">
				<v-layout class="Creatcollectionform" wrap row py-3 px-3>
					<v-card-title>
						<span class="headline">Series Section</span>
					</v-card-title>
					<!-- Input_tag -->
					<v-flex lg12>
						<div class="my-2">
							<v-text-field 
							v-model="seriesTitle" 
							label="Series Name"
							:error-messages="seriesTitleError"
			        @input="$v.seriesTitle.$touch()"
			        @blur="$v.seriesTitle.$touch()"
							></v-text-field>
						</div>
						<div class="my-2">
							<v-text-field 
							v-model="seriesDescription" 
							label="Series description"
							:error-messages="seriesDescriptionError"
			        @input="$v.seriesDescription.$touch()"
			        @blur="$v.seriesDescription.$touch()"
							></v-text-field>
						</div>
						<div class="my-2">
							<v-text-field 
							v-model="seriesTags" 
							label="Series tags" 
							chips 
							clearable
							:error-messages="seriesTagsError"
			        @input="$v.seriesTags.$touch()"
			        @blur="$v.seriesTags.$touch()"
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
							{{$t("series_thumb")}}
							<v-btn>
								<input type="file" id="seriesThumb" ref="seriesThumb" accept="image/jpeg" v-on:change="handleSeriesThumbUpload()"/>
							</v-btn>
						</div>	
					</v-flex>
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
						:selectedOptions='[]' 
						/>
						<autocomplete 
						:fieldLabel="$t('select_director')" 
						:fieldHint="$t('select_director')" 
						:itemValue="'director_id'" 
						:itemText="'name'"
						@selectedDataUpdated="updateDirectors"
						:options='directors' 
						:selectedOptions='[]' 
						/>
					</v-layout>
					<!-- catagory_list -->
					<v-flex lg8 md8 xs12 sm12 ml-1>
						<div class="Video__Category">
							<div class="headline">
								Series Genre
							</div>
							<div v-if="seriesCategories.length != 0" class="select_Video__Category app-card mb-4">
								<div class="ais-refinement-list">
									<div class="list-item-inner my-2 py-2">
										<!-- second_category with out sub cat -->
										<div v-for="seriesCategory in seriesCategories" class="list-item-one">
											<div class="v-toolbar__content"> 
												<div class="v-toolbar__title">
													<v-checkbox class="d-inline" v-model="seriesCategory.checked" :key="seriesCategory.category_id" 
													@click.native="setSeriesCategories(seriesCategory.category_id,$event)" :label="seriesCategory.category_name"
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
													{{$t("series_categories_not_found")}}
												</div>    
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</v-flex>
				</v-layout>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="darken-1"  @click="validateSeries">Create Series</v-btn>
					<v-btn color="darken-1" flat  @click="createNewSeries=false">Close</v-btn>
				</v-card-actions>
			</v-dialog> 
		</v-layout>
		<template v-if='fileDataProcessing'>
      <loader msg="Please stand by saving video details"/>
    </template>
    <template v-if='subtitleProcessing'>
      <loader msg="Please stand by uploading subtitle"/>
    </template>
    <template v-if='thumbsProcessing'>
      <loader msg="Please stand by uploading thumbs"/>
    </template>
    <template v-if='seriesProcessing'>
      <loader msg="Please stand by series creation is under process"/>
    </template>
    <template v-if='loadingEditVideoData'>
      <circleLoader/>
    </template>
    <template v-if='genProcessing'>
      <circleLoader/>
    </template>

	</v-content>
</template>
<script>
	import axios from "axios"
	import { mapGetters } from "vuex";
	import { between,integer,required,minLength,maxLength } from 'vuelidate/lib/validators'
	import loader from '~/components/default/loader'
	import circleLoader from '~/components/default/circleLoader'
	import autocomplete from '~/components/default/base/autocomplete'
	export default {
		name:'seriesUpload',
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
				fileDataProcessing: false,
				subtitleProcessing: false,
				genProcessing: false,
				fileToEdit: null,
				// dialog boxes
        editVideo: false,
        addSubtitles: false,
        dateAndLocation: false,
        sharingAndPrivacy: false,
				createNewSeries:false,
				addSeasonDialog:false,
				// dialog boxes
				videoid: '',
				loadingEditVideoData: false,
        title: '',
        description: '',
        tags: '',
        dateCreated: new Date().toISOString().slice(0,10),
				menu: false,
				selectedThumb: '',
        radioGroup: '',
        VideoPassword: '',
        Videousers: '',
        subtitleName: '',
        blockedInCountries:[],
        uploadedFrom: '',
				allowVideoRating: true,
				privacyOption: 'public',
				subtitleFiles: '',
				subtitleUploadDone : false,
				subtitleIsDefault : {name:'No',value:'no'},
				selection : [
					{name:'No',value:'no'}, 
					{name:'Yes',value:'yes'}
				],
        // edit video
        thumbsProcessing:false,
        thumbs:[],
      	// series
      	seriesTitle:'',
				seriesDescription:'',
				seriesTags:'',
				seriesCategories: [],
				seriesThumb:'',
		    checkedSeriesCategories: [],
				checkbox:false,
				series: [],
		    selectedSeries:'',
		    seasons: [],
		    selectedSeason: '',
		    seriesProcessing: false,
		    seriesIsSelected: false,
		    seasonAreHere: false,
		    // Cast and direction
				directorName: '',
				castName:'',
				cast:[],
				directors:[],
				selectedCast:[],
				selectedDirectors:[],
				showAddCast:false,
				showAddDirector:false,
				selectedMaturityLevel: { name: 'All', value: 'all' },
        maturityLevels: [
          { name: 'All', value: 'all' },
          { name: '7+', value: '7_plus' },
          { name: '13+', value: '13_plus' },
          { name: '16+', value: '16_plus' },
          { name: '18+', value: '18_plus' }
        ],
        seasonSequenceNumber:'',
      }
		},
		validations: {
        title: { required,minLength: minLength(5),maxLength: maxLength(60) },
        description: { required,minLength: minLength(5) },
        tags: { required },
        subtitleName: { required,minLength: minLength(3),maxLength: maxLength(60) },
        seriesTitle: { required,minLength: minLength(5),maxLength: maxLength(60) },
        seriesDescription: { required,minLength: minLength(5) },
        seriesTags: { required },
        castName: { required,minLength: minLength(5),maxLength: maxLength(150) },
        directorName: { required,minLength: minLength(5),maxLength: maxLength(150) },
        seasonSequenceNumber: { required,between:between(1, 100),integer,minLength: minLength(1),maxLength: maxLength(3) },
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
	    seriesTitleError () {
	      const errors = []
	      if (!this.$v.seriesTitle.$dirty) return errors
	      !this.$v.seriesTitle.required && errors.push('Series title is required')
	      !this.$v.seriesTitle.minLength && errors.push('Series title must contain atleast 5 characters')
	      !this.$v.seriesTitle.maxLength && errors.push('Series title must be 60 characters maximum')
	      return errors
	    },
	    seriesDescriptionError () {
	      const errors = []
	      if (!this.$v.seriesDescription.$dirty) return errors
	      !this.$v.seriesDescription.required && errors.push('Series description is required')
	      !this.$v.seriesDescription.minLength && errors.push('Series description must contain atleast 5 characters')
	      return errors
	    },
	    seriesTagsError () {
	      const errors = []
	      if (!this.$v.seriesTags.$dirty) return errors
	      !this.$v.seriesTags.required && errors.push('Series tags are required minimun 1')
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
	    seasonSequenceNumberError () {
	      const errors = []
	      if (!this.$v.seasonSequenceNumber.$dirty) return errors
	      !this.$v.seasonSequenceNumber.between && errors.push('Season sequence number can be between 1 to 100')
	      !this.$v.seasonSequenceNumber.required && errors.push('Season sequence number is required')
	      !this.$v.seasonSequenceNumber.integer && errors.push('Season sequence number can be an integer only')
	      !this.$v.seasonSequenceNumber.minLength && errors.push('Season sequence number must contain atleast 1 characters')
	      !this.$v.seasonSequenceNumber.maxLength && errors.push('Season sequence number must be 3 characters maximum')
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
				var videoObj = {
					'title' : file.name,
					'description' : file.name,
					'filename':file.uniqueIdentifier,
				}
				if(this.selectedSeries)
					videoObj.series_id = this.selectedSeries
				if(this.selectedSeason)
					videoObj.season_id = this.selectedSeason
				console.log(videoObj)
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
            this.$console('Chunks cleaned up')
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
			saveEditedVideo () {
        this.fileDataProcessing = true;
        var videoObj = {
        	'videoid' : this.videoid,
          'title' : this.title,
          'description' : this.description,
          'tags':this.tags,
          'filename':this.fileToEdit.uniqueIdentifier,
          'blocked_countries':this.blockedInCountries,
          'country':this.uploadedFrom,
          'allow_rating':this.allowVideoRating,
          'broadcast':this.privacyOption,
          'datecreated':this.dateCreated,
          'series_video':true,
        }
        try{
	        this.$axios.put('/videos/update', videoObj).then((response)=>{
            this.$store.commit('snackIt',this.title+"'s details updated")
	        }).catch((err)=>{
        		console.log(err.response)
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
        this.fileDataProcessing = false
      },
      // Subtitle
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
		  		if ( /\.(jpg)$/i.test( uploadedFiles[i].name) && uploadedFiles[i].type == 'image/jpeg') {
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
	        	this.$store.commit('snackIt','Thumbs updated for '+this.title)
	        }).catch((err)=>{
	          if(!err.response){
              this.$store.commit('snackIt',"Server isn't responding can't remove the junky chunks")
            }else{
              let errorMsg = err.response.data.errors.error;
              this.$store.commit('snackIt',errorMsg[0]);
            }
	        });
	        this.thumbsProcessing = false
				}catch(err){
      		console.log(err)
      	}
      },
      // Series
      setSeriesCategories(catId,event){
				this.checkedSeriesCategories.includes(catId) ? this.$removeIndexByValue(this.checkedSeriesCategories,catId) : this.checkedSeriesCategories.push(catId)
			},
			getLatestSeries(){
				try{
					this.$axios.get('/series/list/?limit=100').then( (response) => {
	  				this.series = response.data.series
	  			},(err)=>{
			      if(!err.response){
              this.$store.commit('snackIt',"Server isn't responding can't fetch updated series")
            }else{
              let errorMsg = err.response.data.errors.error;
              this.$store.commit('snackIt',errorMsg[0]);
            }
					});
				}catch(err){
					console.log(err)
				}
			},
			handleSeriesThumbUpload(){
				this.seriesThumb = this.$refs.seriesThumb.files[0]
				let input = this.$refs.seriesThumb;
				if ( this.seriesThumb.type != 'image/jpeg' ) {
		    	this.$store.commit('snackIt','Invalid image type for '+this.seriesThumb.name+' only jpg is supported')
		    	input.type = 'text'
        	input.type = 'file'
        	this.seriesThumb = ''
		    }
			},
			insertSeries(){
				this.seriesProcessing = true;
				let formData = new FormData();
				formData.append('series_name', this.seriesTitle)
				formData.append('series_description', this.seriesDescription)
				formData.append('series_tags', this.seriesTags)
				formData.append('series_thumb', this.seriesThumb)
				formData.append('maturity_level', this.selectedMaturityLevel.value)
				formData.append('categories', JSON.stringify(this.checkedSeriesCategories))
				formData.append('cast', JSON.stringify(this.selectedCast))
				formData.append('directors', JSON.stringify(this.selectedDirectors))
				try{
	        this.$axios.post('/series/insert', formData).then((response)=>{
					  this.seriesProcessing = false
					  this.getLatestSeries()
					  this.$store.commit('snackIt',this.seriesTitle+"' has been created as new series")
	  				this.clearSeriesForm()

					}).catch((err)=>{
        		console.log(err.response)
        		this.seriesProcessing = false
            if(!err.response){
              this.$store.commit('snackIt',"Server isn't responding can't create new series")
            }else{
              let errorMsg = err.response.data.errors.error;
              this.$store.commit('snackIt',errorMsg[0]);
            }
	        });
	        this.createNewSeries = false
	    	}catch(err){
	    		console.log(err)
	    	}
			},
	    seriesSelected(e){
	    	if(e){
	    		this.seriesIsSelected = true
	    		this.selectedSeries = e
	    	}
	    	this.getUpdatedSeasons()
	    },
	    getUpdatedSeasons(){
	    	try{
		    	this.$axios.get(`/season/list/${this.selectedSeries}`).then( (response) => {
	  				let seasons = response.data.data.seasons
	  				this.selectedSeason = seasons[0].season_id 
	  				if(seasons.length > 0){
	  					this.seasons = seasons
	  					this.seasonAreHere = true
	  				}else{
	  					this.seasonAreHere = false
	  				}
	  			},(error)=>{
			        console.log(error.response)
			    });
	    	}catch(err){
	    		console.log(err)
	    	}
	    },
			// Clear form
			clearSubtitleForm () {
    		this.subtitleName = ''
    		let input = this.$refs.subtitleFiles
        input.type = 'text'
        input.type = 'file'
	    },
			clearSeriesForm () {
				this.$v.$reset()
    		this.seriesTitle = ''
        this.seriesDescription = ''
        this.seriesTags = ''
        this.checkedSeriesCategories = ''
        let input = this.$refs.seriesThumb
        input.type = 'text'
        input.type = 'file'
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
      validateSeries () {
        this.$v.seriesTitle.$touch()
        this.$v.seriesDescription.$touch()
        this.$v.seriesTags.$touch()
        if (!this.$v.seriesTitle.$invalid) 
	        if (!this.$v.seriesDescription.$invalid)
	          if (!this.$v.seriesTags.$invalid)
	          	this.insertSeries()
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
      validateSequenceNumber () {
        this.$v.seasonSequenceNumber.$touch()
        if (!this.$v.seasonSequenceNumber.$invalid) {
          this.addNewSeason()
        }
      },
      // Cast and directors
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
			async setUpInitData(){
      	try{
      		await axios.all([
      			this.$axios.get('/series/listupload/?limit=100'),
      			this.$axios.get('/series/categories/')
      			]).then(axios.spread((seriesRes, seriesCategoryRes) => {

      				this.series = seriesRes.data.series

						// Setting up series categories
						this.seriesCategories = seriesCategoryRes.data.categories
						let defaultSeriesCatObj = this.$findObjectByKey(this.seriesCategories,'checked',true)
						this.checkedSeriesCategories.push(defaultSeriesCatObj.category_id)

					}, (err) => {
						if (!err.response) {
							this.$store.commit('snackIt', "Server isn't responding video categories can't be fetched")
						} else {
							let errorMsg = err.response.data.errors.error
							console.log(errorMsg)
							this.$store.commit('snackIt', errorMsg[0])
						}
					}))
      	} catch(err){
      		console.log(err)
      	}
      },
      setUpCast(){
      	try {
	        this.$axios.get(`/cast/list/`).then((response) => {
	          this.cast = response.data.data
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
      setUpDirectors(){
      	try {
	        this.$axios.get(`/directors/list/`).then((response) => {
	          this.directors = response.data.data
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
      updateCast(event){
      	this.selectedCast = event
      },
      updateDirectors(event){
      	this.selectedDirectors = event
      },
      addNewSeason(){
      	this.genProcessing = true
      	var seasonObj = {
					'series_id' : this.selectedSeries,
					'sequence' : this.seasonSequenceNumber,
				}
				this.$axios.post('/season/insert', seasonObj).then((response)=>{
					this.getUpdatedSeasons()
					this.genProcessing = false
					this.$store.commit('snackIt','New season created successfully');
					this.seasonSequenceNumber = ''
					this.addSeasonDialog = false
				}).catch((err)=>{
					this.genProcessing = false
					if(!err.response){
						this.$store.commit('snackIt',"Server isn't responding file processing could not be started")
					}else{
						let errorMsg = err.response.data.errors.error;
						console.log(errorMsg)
						this.$store.commit('snackIt',errorMsg[0]);
					}
				});

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
	        file.allow_rating == 'yes' ? this.allowVideoRating = true : this.allowVideoRating = false
					this.blockedInCountries = file.blocked_countries
					this.uploadedFrom = file.country
					this.dateCreated = file.datecreated
					this.editVideo = true
	      }
    	})
		},
		beforeMount(){
			this.setUpInitData()
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