<template>
  <div id="latest-deals">
    <v-skeleton-loader
      :loading="propertyListings.length != 0 ? false: true"
      :transition="transition"
      height="400"
      type="table"
    >
      <v-container  style="margin:auto 50px;">
        <v-row>
          <!-- <p>New Deals</p> -->
        </v-row>
        <v-row dense>
          <v-col
            v-for="item in propertyListings"
            :key="item.id"
            cols="12"
            md="3"
            
          >
          <property-card :property="item" />
            <!-- <v-hover v-slot:default="{ hover }">
              <v-card width="500" :elevation="hover ? 12 : 0" :class="{ 'on-hover': hover }">
               
                <nuxt-link :to="`/property/details/${item.id}`">
                  <v-img
                    :src="item.frontViewImage"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                  >
                    <v-card-title v-text="item.title"></v-card-title>
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        style="height: 100%;"
                        class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                      >
                        <span>&#8358;</span>
                        {{item.price}}
                      </div>
                    </v-expand-transition>
                  </v-img>
                  <v-card-title>
                    {{ item.title }}
                    <v-chip color="deep-purple accent-4 white--text">{{ item.typeName }}</v-chip>
                  </v-card-title>

                  <v-card-subtitle>Location: {{ item.locationName }}</v-card-subtitle>
                  <v-card-title>
                    <v-chip>
                      <span>&#8358;</span>
                      {{ item.price }}
                    </v-chip>
                  </v-card-title>
                </nuxt-link>

                <v-card-actions>
                  <contact-details :item="item" />
                </v-card-actions>
              </v-card>
            </v-hover> -->
          </v-col>
        </v-row>
      </v-container>
    </v-skeleton-loader>
  </div>
</template>

<script>
import ContactDetails from "@/components/ContactDetails";
import PropertyCard from './PropertyCard.vue';
export default {
  name: "latest",
  components: {
    "contact-details": ContactDetails,
    "property-card": PropertyCard,
  },
  data() {
  
      return {
      loading: false,
      transition: "scale-transition",
      phone: "07067194827",
      email: "mail.asktech@gmail.com",
      text: "I'm%20interested%20in%20the%20%20property%20you",
      transparent: "rgba(255, 255, 255, 0)",
      items: [
        {
          title: "Pre-fab homes",
          slug: "pre-fab-homes",
          frontViewImage: require("../assets/images/1.jpg"),
          flex: 4,
          price: "20000",

          type: "rent",
          id:1
        },
        {
          title: "Favorite road trips",
          slug: "favorite-road-trips",
          frontViewImage: require("../assets/images/2.jpg"),
          flex: 4,
          price: "340000",
          type: "sale",
          id:2,
        },
        {
          title: "Best airlines",
          slug: "best-airlines",
          frontViewImage: require("../assets/images/3.webp"),
          flex: 4,
          price: "50000",
          type: "rent",
          id:3,
        },
        {
          title: "Best airlines",
          slug: "best-airlines",
          frontViewImage: require("../assets/images/3.webp"),
          flex: 4,
          price: "50000",
          type: "rent",
          id:4,
        }
      ]
    };
  },
  computed: {
    propertyListings() {
      const newListing = this.$store.state.property.propertyListings.map(
        listing => {
          listing.data.id = listing.id;
          return listing.data;
        }
      );
      return newListing;
    }
  },
  mounted() {
    this.$store.dispatch("property/loadPropertyListings");
  }
};
</script>

<style>
#latest-deals .v-card {
  transition: opacity 0.4s ease-in-out;
  border-radius: 20px 0px 20px 0px !important;
}

#latest-deals .show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
#latest-deals .v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>