<template>
   <div id="latest-deals">
    <v-container >
        <v-row>
            <!-- <p>New Deals</p> -->
        </v-row>
        <v-row dense>
            <v-col v-for="item in propertyListings" :key="item.id" cols="12" xs="6" sm="6" md="4" lg="4"   smAndDown="6">
                <v-hover v-slot:default="{ hover }">
                    <v-card width="500" :elevation="hover ? 12 : 0" :class="{ 'on-hover': hover }">
                       
                        <!-- <nuxt-link :to="`/property/details/${item.id}`"> -->
                        <nuxt-link :to="`/property/details/${item.id}`">
                        <v-img :src="item.frontViewImage" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                            <v-card-title v-text="item.title"></v-card-title>
                            <v-expand-transition>
                                <div v-if="hover" style="height: 100%;"
                                    class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                                >
                                    <span>&#8358;</span>{{item.price}}
                                </div>
                            </v-expand-transition>
                        </v-img>
                        <v-card-title>
                            {{ item.title }}<v-chip color="deep-purple accent-4 white--text">{{ item.typeName }}</v-chip>
                        </v-card-title>

                        <v-card-subtitle>
                            Location: {{ item.locationName }}
                        </v-card-subtitle>
                        <v-card-title>
                            <v-chip><span>&#8358;</span>{{ item.price }}</v-chip>
                        </v-card-title>
                        </nuxt-link>
                        

                        <v-card-actions >
                           <contact-details :item="item" />
                        </v-card-actions>
                    </v-card>
                </v-hover>
            </v-col>
    </v-row>
    </v-container>
   </div>
</template>

<script>
import ContactDetails from '@/components/ContactDetails'
export default {
    name: 'latest',
    components:{
        'contact-details': ContactDetails
    },
    data(){
        return{
        phone: '07067194827',
        email:'mail.asktech@gmail.com',
        text:"I'm%20interested%20in%20the%20%20property%20you",
        transparent: 'rgba(255, 255, 255, 0)',
           items: [
                { title: 'Pre-fab homes', slug:'pre-fab-homes',  src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 4, price: "20000", type: "rent" },
                { title: 'Favorite road trips', slug:'favorite-road-trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 4, price: "340000", type: "sale" },
                { title: 'Best airlines', slug:'best-airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 4, price: "50000", type: "rent" },
            ],          
        }
    },
    computed:{
      propertyListings(){
        const newListing = this.$store.state.property.propertyListings.map(listing =>{
          listing.data.id = listing.id
          return listing.data
        });
        return newListing;
      },
    },
    mounted(){
      this.$store.dispatch('property/loadPropertyListings')
    }
}
</script>

<style>

#latest-deals .v-card {
  transition: opacity .4s ease-in-out;
  border-radius: 20px 0px 20px 0px !important;
}

/* #latest-deals .v-card:not(.on-hover) {
  opacity: 0.6;
 } */

#latest-deals .show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
#latest-deals .v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}

</style>