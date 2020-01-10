<template>
  <div class="search">
        <v-container fluid class="searchResult">
        <v-card flat style="padding-top:20px;" class="searchResult">
        <v-row>   
          <v-col cols="12" md="3" lg="3" sm="12" id="searchFilter">
            <filter-panel :param="param"></filter-panel>
          </v-col>

          <v-col cols="12" md="8" lg="8" sm="12" >
              <div class="latest-deals">
                <div id="lastest-products">
                    <v-container>
                        <v-card id="latest-deals" flat class="searchResult"> 
                            <v-row>
                              <v-card width="100%" flat>
                                <v-row>
                                <v-col cols="12" md="6"> 
                                  <p v-if="this.$store.state.property.propertyListings == []">No Result found</p>
                                  <p v-else>Result: 1-{{propertyListings.length }} of {{ propertyListings.length }}</p>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col cols="12" md="6" >
                                  <v-select v-model="value" :items="items" attach chips label="Sort By: Bedrooms" multiple />
                                </v-col>
                                </v-row>
                              </v-card>
                            </v-row>
                            
                            <v-row v-for="(item, i) in propertyListings" :key="i" >
                              <v-card class="my-2" hover style="border-radius:10px !important;" flat>
                                  <nuxt-link :to="`/property/details/${item.id}`" class="product-link" style="text-decoration:none;">
                                      <div>
                                        <v-row>
                                          <v-col cols="12" md="4">
                                            <v-img :src="item.frontViewImage" class="image"></v-img>
                                          </v-col>
                                          <v-col cols="12" md="8">
                                            <v-card-title primary-title>
                                              <h3 class="mb-0"> {{ item.title }}</h3>
                                            </v-card-title>
                                            <v-card-text>
                                              <p>
                                                {{ item.description }}
                                              </p>
                                              <nuxt-link :to="`/property/details/${item.id}`">Read More</nuxt-link>
                                            </v-card-text>  
                                            <v-card-subtitle>Added On:</v-card-subtitle>
                                          </v-col>
                                        </v-row>
                                      </div>
                                  </nuxt-link>
                                  <v-divider></v-divider>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-chip>NGN {{ item.price }}</v-chip>
                                    <!-- <v-chip>Name of Agent/Owner </v-chip> -->
                                  </v-card-actions>
                                  <v-card-actions >

                                      <contact-details :item="item" />
                            
                                  </v-card-actions>
                              </v-card>                                
                            </v-row>
                        </v-card>
                    </v-container>
                </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
  
</template>

<script>
import Filter from '@/components/SearchFilters'
import ContactDetails from '@/components/ContactDetails'

export default {
    components:{
        'filter-panel': Filter,
        'contact-details': ContactDetails
    },
    data(){
        return{
          phone: '2348031194042',
          email:'mail.asktech@gmail.com',
          text:"I'm%20interested%20in%20the%20%20property%20you",
          param:'',
          sidenav:true,
          items: ['foo', 'bar', 'fizz', 'buzz'],
          value: ['foo', 'bar', 'fizz', 'buzz'],
        }
    },
    computed:{
      searchResult(){
        return "";
      },
      drawer(){
        return ""
      },
      propertyListings(){
        if(this.$store.state.property.propertyListings != [] ){
          const newListing = this.$store.state.property.propertyListings.map(listing =>{
            listing.data.id = listing.id
            return listing.data
          });
          return newListing;
        }else{
          let data;
          let action;
          if(this.$route.params.data){
            data = this.$route.params.data;
            action = 'searchProperty';
          }else{
            data = this.$route.params.id;
            action = 'refreshPropertySearch';
          }
          this.$store.dispatch(`property/${action}`, data).then((res) =>{
            console.log("Fetch Response: ", res)
            const newListing = this.$store.state.property.propertyListings.map(listing =>{
              listing.data.id = listing.id
              return listing.data
            });
            return newListing;
          })
        }
      },
    },
    fetch ({ context, store, params }) {
      var arg;
      var action;
      if(params){
        if((params.data == undefined) || (params.data == 'undefined')){
          arg = params.id;
          action = 'refreshPropertySearch';
        }else{
          arg = params.data;
          action = 'searchProperty';
        }
      }
      console.log("Triggered Action: ", action)
      console.log("Passed Data: ", arg)
      store.dispatch(`property/${action}`, arg).then((res) =>{
        console.log("Async Fetch Result: ", res)
        })
    },
    mounted(){
      let data;
      let action;
      if(this.$route.params){
        if(this.$route.params.data){
          data = this.$route.params.data;
          action = 'searchProperty';
        }else{
          data = this.$route.params.id;
          action = 'refreshPropertySearch';
        }
      }
      this.$store.dispatch(`property/${action}`, data).then(() =>{
            })
    }
    
}
</script>

<style>
    .searchResult{
        font-size: .75rem;
        max-width: 100%;
        padding-top: .4375rem;
        color:#1c1d1f !important;
        background:#f2f2f2 !important;
        margin-top:20px;
    }
    #searchFilter #search-text .v-input__slot{
      width:100%;
      margin-left:-33px;
    }
</style>