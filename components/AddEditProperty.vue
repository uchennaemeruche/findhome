<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" id="add-edit-property">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Close</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>


        <v-stepper v-model="e6" vertical light non-linear="">
          <v-stepper-step :complete="e6 > 1" step="1" :editable="operation != 'add'">
            Enter Property Details
            <small>Summarize if needed</small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-card color="white darken-5" class="mb-12" height="auto">
              <v-form ref="form" v-model="valid" lazy-validation style="margin:0 20px;">
                <!-- <v-select v-model="form.title" :items="categories" :item-text="categories.text" :item-value="categories.value" label="Department" solo ></v-select> -->
              
                <v-text-field v-model="form.title" :counter="100" :rules="titleRules" label="Property Title" required />
                <v-select v-model="form.category" :items="categories" :item-text="categories.text" :item-value="categories.value" :rules="[v => !!v || 'Item is required']" label="Category" required />
                <v-select v-model="form.type" :items="types" :item-text="types.text" :item-value="types.value" :rules="[v => !!v || 'Item is required']" label="Type" required />
                <v-select v-model="form.location" :items="locations" :item-text="locations.text" :item-value="locations.value" :rules="[v => !!v || 'Item is required']" label="Location" required />
                <v-text-field v-model="form.road" :rules="[v => !!v || 'Item is required']" label="Street/Road" required />
                  <v-divider></v-divider>
                <v-text-field type="number" v-model="form.price" :rules="[v => !!v || 'Item is required']" label="Price" />
                <v-textarea v-model="form.description" clearable clear-icon="mdi-close" label="Property Description " value="Description" placeholder="Selling points of the property e.g: Constant Water Supply, Security etc."/>
              </v-form>
            </v-card>
            <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
            <v-btn text>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 2" step="2" :editable="operation != 'add'">Upload Images</v-stepper-step>

          <v-stepper-content step="2">
            <v-card color="white darken-1" class="mb-12" height="auto">
               <v-file-input dense v-model="frontViewImage" color="deep-purple accent-4" 
                accept="image/*" counter label="Front View" placeholder="Select Front View Image" 
                prepend-icon="mdi-paperclip" outlined :show-size="1000"
                @change="setFrontImage" id="frontView">
                  <template v-slot:selection="{ index, text }">
                    <v-chip v-if="index < 2" color="primary accent-4" dark label small>
                      {{ text }}
                    </v-chip>
                    <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
                      +{{ files.length - 2 }} File(s)
                    </span>
                  </template>
                </v-file-input>
                <v-img v-if="update.frontViewImage" :src="update.frontViewImage" :lazy-src="update.frontViewImage" height="200"></v-img>
                <!-- <div>
                  <v-file-input dense v-model="rearViewImage" color="deep-purple accent-4" 
                    accept="image/*" counter label="Rear View" placeholder="Select Rear View Image" 
                    prepend-icon="mdi-paperclip" outlined :show-size="1000" id="rearView"
                    @change="setRearImage">
                    <template v-slot:selection="{ index, text }">
                      <v-chip v-if="index < 2" color="primary accent-4" dark label small>
                        {{ text }}
                      </v-chip>

                      <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
                        +{{ files.length - 2 }} File(s)
                      </span>
                    </template>
                  </v-file-input>
                  <v-img v-if="update.rearViewImage" :src="update.rearViewImage" :lazy-src="update.rearViewImage" height="200"></v-img>
                </div> -->
                <div>
                  <v-file-input dense v-model="otherViewImages" color="deep-purple accent-4" 
                    accept="image/*" counter label="Other Images" placeholder="Select Other View Image" 
                    prepend-icon="mdi-paperclip" outlined :show-size="1000" multiple id="otherImages"
                    @change="setOtherImages">
                    <template v-slot:selection="{ index, text }">
                      <v-chip v-if="index < 2" color="primary accent-4" dark label small>
                        {{ text }}
                      </v-chip>

                      <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
                        +{{ files.length - 2 }} File(s)
                      </span>
                    </template>
                  </v-file-input>
                  <v-img v-if="update.rearViewImage" :src="update.rearViewImage" :lazy-src="update.rearViewImage" height="200"></v-img>
                  <v-btn block color="primary">Add More Images</v-btn>
                </div>
                <p v-if="update.otherViewImages" > 
                  <template v-for="(imageSrc, i) in update.otherViewImages">
                    <v-img :src="imageSrc" height="200" :key="i"></v-img>
                  </template>
                 <!-- Length of Array:  {{ update.otherViewImages.length}} -->
                </p>
               </v-card>
            <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
            <!-- <v-btn color="primary" @click="uploadImages">Upload</v-btn> -->
            <v-btn text @click="e6 = 1"> Back</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 3" step="3" :editable="operation != 'add'">Finalize and Publish</v-stepper-step>

          <v-stepper-content step="3">
            <v-card color="" class="mb-12" height="auto">
                <v-banner single-line>
                  <v-icon slot="icon" color="warning" size="36" >
                    mdi-wifi-strength-alert-outline
                  </v-icon>
                  {{msg}}
                  <v-container style="height:auto;" v-if="uploading">
                    <v-row class="fill-height" align-content="center" justify="center">
                      <v-col
                        class="subtitle-1 text-center"
                        cols="12"
                      >
                        Uploading ...
                      </v-col>
                      <v-col cols="6">
                        <v-progress-linear
                          color="deep-purple accent-4"
                          indeterminate
                          rounded
                          height="6"
                        ></v-progress-linear>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-banner>
            </v-card>
            <v-btn :disabled="!valid" outlined v-on:click="operation == 'add' ? addListing() : updateListing()">
                  {{ operation == 'add' ? 'Upload Property' : 'Update Property'}}
            </v-btn>
            <v-btn color="error" outlined class="ml-4" @click="dialog = !dialog">Close</v-btn>
            <v-btn text @click="e6 = 2">Back</v-btn>
          </v-stepper-content>

          
        </v-stepper>
      </v-card>
    </v-dialog> 
    
         
</template>

<script>
export default {
    name: 'add-or-delete-property',
    data(){
        return{
            msg: '',
            uploading:false,
            e6:1,
            files: [],
            operation:null,
            valid: true,
            titleRules: [
              v => !!v || 'Property Title is required',
                v => (v.length > 10) || 'Title must not be less than 10 characters',
            ],
            frontViewImage:[],
            rearViewImage:[],
            otherViewImages:[],
            newImg:"Hello",
            update:{
              frontViewImage:'',
              rearViewImage:'',
              
              defaultFrontView:'',
              defaultRearView:'',
              defaultOtherViews:[],
              docID: null,
              newImg:[],
              otherViews:[],
            },
            form:{
              title: '',
              category: '',
              type: '',
              location: '',
              road:'',
              description:'',
              price:'',
            },
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false, 
        }
    },
    computed:{
      categories(){
        return this.$store.state.property.categories;
        // const newCategory = this.$store.state.property.categories.map(category =>{
        //   return category.name
        // });
        // return newCategory;
      },
      types(){
        return this.$store.state.property.types;
        // const newType = this.$store.state.property.types.map(type =>{
        //   return type.name;
        // })
        // return newType;
      },
      locations(){
        return this.$store.state.property.locations;
        // const newLocation = this.$store.state.property.locations.map(location =>{
        //   return location.name;
        // })
        // return newLocation;
      }
    },
    methods:{
      addListing(){
        console.log(this.form)
        this.uploading = true;
        let images = {
          frontView:this.frontViewImage,
          rearView: this.rearViewImage[0],
          otherViews: this.otherViewImages
        }
        this.$store.dispatch('property/addNewProperty', {form:this.form, images, user: this.$store.state.account.user }).then(res =>{
          this.msg = "New Property Listed successfully";
          this.uploading = false;
        })
      },
      editListing(data){
        console.log('Data to load', data.title);
        this.form.title = data.title
        this.form.category = data.category
        this.form.type = data.type
        this.form.location = data.location
        this.form.road = data.road
        this.form.description = data.description
        this.form.price = data.price
        this.update.frontViewImage = data.frontViewImage;
        this.update.rearViewImage = data.rearViewImage;
        this.update.otherViews = data.otherViewsImage;
        this.update.defaultFrontView = data.frontViewImage;
        this.update.defaultRearView = data.rearViewImage;
        this.update.defaultOtherViews = data.otherViewsImage;
        // data.otherViewsImage.forEach(img =>{
        //   this.update.otherViewImages.push(img);
        // })
        this.update.docID = data.id;
        
        this.dialog = !this.dialog;
      },
      updateListing(){
        this.uploading = true;
        let newImages = null;
        let newFrontView = null;
        let newRearView = null;
        let images = {};
        if((this.frontViewImage[0] != undefined) || (this.rearViewImage[0] != undefined )){
          newImages = true;
          if((this.frontViewImage[0] != undefined) && (this.rearViewImage[0] == undefined ) ){
            newFrontView = true
            newRearView = false
            images = {
              frontView:this.frontViewImage[0],
              rearView: this.update.defaultRearView
            }
          }else if((this.frontViewImage[0] == undefined) && (this.rearViewImage[0] != undefined )){
            newRearView = true
            newFrontView = false
            images = {
              frontView: this.update.defaultFrontView,
              rearView: this.rearViewImage[0]
            }
          }
          else if((this.frontViewImage[0] != undefined ) && (this.rearViewImage[0] != undefined )) {
            newFrontView = true
            newRearView = true
            images = {
              frontView:this.frontViewImage[0],
              rearView: this.rearViewImage[0]
            }
          }
        }else{
          newImages = false;
            images = {
              frontView:this.update.defaultFrontView,
              rearView: this.update.defaultRearView
            }
        }
        
        console.log("Images: ", images)
        console.log("Change: ", newImages)
        console.log("Front View: ", newFrontView)
        console.log("Front View: ", newRearView)
        this.$store.dispatch('property/updateProperty', {form: this.form, images, newImages, newFrontView, newRearView, docID:this.update.docID}).then(res =>{
          this.msg = "Property updated successfully";
          this.uploading = false;
        })
        // alert("You want to update new listing")
      },
      setFrontImage(e){
        var frontViewSelector = document.getElementById('frontView');
        if(frontViewSelector.value.length == 0){
          console.log("You choosed to cancel the operation")
        }else{
          console.log("Selected Image: ", this.frontViewImage)
          const fr = new FileReader()
          if(this.frontViewImage){
            if(e.size > 1048576){
              alert("Selected File is too Big!!!");
              return;
            };
            let data =  this.frontViewImage
            fr.readAsDataURL(data)
            fr.addEventListener('load', () =>{
              console.log("Dialog opened")
              this.update.frontViewImage = fr.result;
            })
          }else{
            if(this.operation != 'add') {
              this.update.frontViewImage = this.update.defaultFrontView;
            }else{
              this.update.frontViewImage = ''
            }
          }
        }
      },
      setRearImage(){
        var rearViewSelector = document.getElementById('rearView');
        if(rearViewSelector.value.length == 0){
          console.log("You chossed to cancel the operation")
        }else{
          const fr = new FileReader()
          if(this.rearViewImage){
            let data =  this.rearViewImage
            fr.readAsDataURL(data)
            fr.addEventListener('load', () =>{
              console.log("Dialog opened")
              this.update.rearViewImage = fr.result;
            })
          }else{
            if(this.operation != 'add') {
              this.update.rearViewImage = this.update.defaultRearView;
            }else{
              this.update.rearViewImage = ''
            }
          }

        }
      },
      setOtherImages(e){
        let vm = this;
        console.log("Files selected: ", e.length)
        var rearViewSelector = document.getElementById('otherImages');
        if(rearViewSelector.value.length == 0){
          console.log("You choosed to cancel the operation")
        }else{
          if(Array.isArray(this.otherViewImages)){
            if(e.length > 3){
              alert("Maximum number of images exceeded")
              return;
            }
            if(e.size > 1048576){
              alert("Selected File is too Big!!!");
              return;
            };
            this.otherViewImages.forEach(img =>{
              console.log("Image: ", img);

              console.log("VM update 1: ", vm.update.otherViewImages);

              let reader = new FileReader()
              // console.log("Images: ", img)
              reader.readAsDataURL(img);
              reader.addEventListener('load', () =>{
                console.log("VM update: ", vm.update.otherViews);
                console.log("New  update: ", vm.update.newImg);
                vm.update.otherViews.push(reader.result);
                // console.log("Loaded Result: ")
              })
            })
          }else{
            console.log("Not an array")
            return
          }
        } 
      },
      uploadImages(){
        this.uploading = true;
        let images = {
          others: this.otherViewImages
        }
        this.$store.dispatch('property/uploadImages', {images }).then(res =>{
          this.msg = "New Property Listed successfully";
          this.uploading = false;
        })
      }
    },
    mounted(){
    this.$store.dispatch('property/loadItems')

      this.$bus.$on('showDialog', (data) =>{
        this.operation = data.type;
        if(data.type == 'add'){
          this.dialog = !this.dialog;
        }else{
          this.editListing(data.data)
        }
        
      })
    }
}
</script>

<style scoped>
  .v-image .v-responsive__content{
    border: 2px dotted red;
    margin-bottom:2px;
  }
</style>