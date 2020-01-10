<template>
    <div class="property-page" style=" padding-top:50px; margin:0 20px">
        <v-card flat>
            <v-sheet
                :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                class="px-3 pt-3 pb-3"
                v-show="loading == true"
            >
                <v-skeleton-loader
                class="mx-auto"
                max-width="auto"
                type="card-heading, article@2, card-avatar" 
                ></v-skeleton-loader>
            </v-sheet>

            
            <!-- {{ propertyListings }} -->
            <div v-show="loading==false">
                <v-row>
                    <v-card flat style="background:#fafafa">
                    <v-breadcrumbs :items="items" large></v-breadcrumbs>
                    </v-card>
                </v-row>
                <h2 style="color:#3d6599;" v-show="title"> {{ title }} </h2>
                <v-row  v-if="!isEmpty(property[0])">
                    <v-col cols="12" md="8" lg="8" sm="12" xs="12" >
                        <v-card>
                            <v-img :src="property[0].frontViewImage" class="grey lighten-2" width="auto" height="400" />
                            <v-row>
                                <v-col cols="12" sm="6" offset-sm="1">
                                    <v-card flat>
                                        <v-container fluid>
                                            <v-row>
                                                <no-ssr>
                                                    <LightGallery :images="images()" :index="index" :disable-scroll="true" @close="index = null"/>
                                                </no-ssr>
                                                <v-col v-for="(thumb, thumbIndex) in images()" :key="thumbIndex" @click="index= thumbIndex" class="d-flex child-flex" cols="4" style="cursor: pointer;">
                                                    <v-card flat tile class="d-flex">
                                                        <v-img :src="`${thumb.url}`" :lazy-src="`${thumb.url}`" aspect-ratio="1" class="grey lighten-2">
                                                        <template v-slot:placeholder>
                                                            <v-row class="fill-height ma-0" align="center" justify="center" >
                                                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                                            </v-row>
                                                        </template>
                                                        </v-img>
                                                    </v-card>
                                                </v-col>
                                            </v-row>
                                            <v-rating ></v-rating>
                                        </v-container>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col cols="12" lg="4" md="4" sm="12" xs="12">
                        <v-tabs centered light :color="color" icons-and-text grow>
                            <v-tabs-slider :color="color"></v-tabs-slider>
                            <v-tab href="#description">Description</v-tab>
                            <v-tab href="#reviews">Reviews</v-tab>
                            <v-tab href="#contact">Contact</v-tab>

                            <v-tab-item :value="'description'">
                                <v-card flat>
                                    <v-card-text>{{ property[0].description  }}</v-card-text>
                                    <v-card-text>{{ property[0].price  }}</v-card-text>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item :value="'reviews'">
                                <v-card flat>
                                    <v-card-text>{{ text  }}</v-card-text>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item :value="'contact'">
                                <v-card flat>
                                    <v-card-text>{{ text  }}</v-card-text>
                                </v-card>
                            </v-tab-item>
                        </v-tabs>
                    </v-col>
                </v-row>
            </div>
        </v-card>
  </div>
</template>

<script>
export default {
    inject: ['theme'],
    data(){
        return{
            loading:true,
            isFetching:this.$store.state.property.isFetching,
            items: [
                {
                    text: 'Home',
                    disabled: false,
                    to: '/',
                },
                {
                    text: 'Property',
                    disabled: false,
                    href: '/property',
                },
                {
                    text: this.$route.params.id,
                    disabled: true,
                    to: this.$route.params.id,
                },
            ],
            images2:[
                '/property/1.jpg',
                '/property/2.jpg',
                '/property/3.jpg',
            ],
            // images: [
            //     { title:'img 1', url: '/property/1.jpg' },
            //     { title:'img 2', url: '/property/2.jpg' },
            //     { title:'img 3', url: '/property/3.jpg' },
            // ],
            index: null,
            color: '#3d6599',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
    },
    watch:{
    },
    computed:{
        propertyListings(){
            const newListing = this.$store.state.property.propertyListings.map(listing =>{
            listing.data.id = listing.id
                return listing.data
            });
            return newListing;
        },
        property(){
            let prop = this.propertyListings.filter(listing =>{
                console.log(listing) 
                return listing.id == this.$route.params.id
            })
            return prop
               
        },
        title(){
            if(!this.isEmpty(this.property[0])){
                return this.property[0].title
            }
        }
        
    },
    // async fetch ({ context, store, params }) {
    //     await store.dispatch('property/refreshPropertySearch')
    //     store.commit('property/setStatus', {isFetching:false})
    
    // },

    methods:{
        images(){
            // console.log(this.property)
            if(!this.isEmpty(this.property[0])){
                if((this.property[0].frontViewImage)){
                    let newImages = []
                    
                    newImages.push(
                        {url: this.property[0].frontViewImage, 'title': 'Property One Image'},
                    )
                    if(this.property[0].rearViewImage){
                        newImages.push(
                            {url: this.property[0].rearViewImage, 'title': 'Property Two Image'},
                        )
                    }
                    if(this.property[0].otherViewsImage){
                        this.property[0].otherViewsImage.forEach(img =>{
                            newImages.push(
                                {url: img, 'title': 'Other Views'}
                            )
                        })
                    }
                    return newImages;
                }
            }
        },
        isEmpty(obj) {
            for(var key in obj) {
                if(obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }
    },
    async created(){
        this.$store.dispatch('property/loadPropertyListings').then(() =>{
          console.log("Action Dispatched")
          this.loading = false;
      })
    },
    
    mounted(){
      this.$store.dispatch('property/loadPropertyListings').then(() =>{
          console.log("Action Dispatched")
          this.loading = false;
      })
    },
    
}
</script>

<style scoped>


</style>