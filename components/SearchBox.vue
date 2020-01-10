<template>
  <div class="search-box">
      <v-row no-gutters align="center" justify="center" style="" class="" :class="{ xsOnly: $vuetify.breakpoint.xs, 'search-criteria-container':searchCriteriaContainer, 'scrolled-search-area':scrolledSearchArea }" >
        <!-- <v-col cols="12" :md="col4" :lg="col4" :sm="col3" xs="10"  class="" style="margin-right:0 !important; padding-right:0 !important" id="search-text">
          <v-text-field v-model="searchText" label="Search By Location, Property Name or Owner" outlined prepend-icon="mdi-location" />
          <v-select :items="locations" label="Type" outlined />
        </v-col> -->
        <v-col cols="12" :lg="col4" :md="col4" :sm="col2" style="" class="search-criteria" > 
          <v-select v-model="location" :items="locations" :item-text="locations.text" :item-value="locations.value" label="Search By Location" outlined prepend-inner-icon="mdi-google-maps" style="border-radius: 30px 0 0px !important;"  />
        </v-col>
        <v-col cols="12" :lg="col2" :md="col2" :sm="col2" style="" class="search-criteria"> 
          <v-select v-model="type" :items="types" :item-text="types.text" :item-value="types.value" label="Type" outlined />
        </v-col>
        <v-col cols="12" :lg="col2" :md="col2" :sm="col2" style="" class="search-criteria">
            <v-select v-model="rooms" :items="items" label="Bedrooms" outlined />
        </v-col>
        <v-col cols="12" :lg="col2" :md="col2" :sm="col2" style="" class="search-criteria">
          <v-select v-model="category" :items="categories" :item-text="categories.text" :item-value="categories.value" label="Category" outlined />
        </v-col>
        <v-col cols="12" :lg="col1" :md="col1" :sm="col2" style="" id="search-btn-col" >
          <v-btn style="" @click="search">Search</v-btn>
        </v-col>
    </v-row>

    <!-- <v-row no-gutters align="center" justify="center" class="scrolled-search-area"
        :class="{ xsOnly: $vuetify.breakpoint.xs }">
        <v-col cols="12" md="4" lg="4" sm="3" xs="10" class=""
            style="margin-right:0 !important; padding-right:0 !important" id="search-text">
            <v-text-field label="Search By Location, Property Name or Owner" outlined prepend-icon="mdi-location" />
        </v-col>
        <v-col cols="12" lg="2" md="2" sm="2" xs="10" style="" class="search-criteria">
            <v-select :items="items" label="Type" outlined="" />
        </v-col>
        <v-col cols="12" lg="2" md="2" sm="2" xs="10" style="" class="search-criteria">
            <v-select :items="items" label="Bedrooms" outlined="" />
        </v-col>
        <v-col cols="12" lg="1" md="1" sm="2" xs="10" style="" class="search-criteria">
            <v-select :items="items" label="Rent" outlined="" />
        </v-col>
        <v-col cols="12" lg="1" md="1" sm="2" xs="10" style="" id="search-btn-col">
            <v-btn style="">Search</v-btn>
        </v-col>
    </v-row> -->
  </div>
</template>

<script>
export default {
    name:'search-box',
    props:['searchCriteriaContainer', 'scrolledSearchArea', 'col1', 'col2', 'col3', 'col4'],
    data(){
        return{
            items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            searchText:'',
            location:'',
            type:'',
            rooms:'',
            category:'',
            
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
        search(){
          let data = {
            location: this.location,
            rooms: this.rooms,
            type: this.type,
            category: this.category
          }
          // if(this.location == ""){
          //   // data.location = this.locations[0];
          //   data.location = null;
          // }
          if(this.category == ""){
            data.category = this.categories[2].id;
          }
          // if(this.type == ""){
          //   // data.type = this.types[0];
          //   data.type = null;
          // }
          // console.log(data)
          this.$router.push({name:'property-id', params:{id: data.category, data: data}})
          
        },
    },
    mounted(){
      this.$store.dispatch('property/loadItems')
    }
   

}
</script>

<style>
.scrolled-search-area{
      /* transition: opacity .4s ease-out; */
  }
  .scrolled-search-area .v-input__slot{
    border:#fff 1px solid;
  }
  .scrolled-search-area .v-label{
    color:#fff !important;
  }
  .scrolled-search-area .v-icon{
    color:#fff !important;
  }
  .scrolled-search-area #search-btn-col{
    padding-left:0 !important; 
    margin-top:-30px ; 
    padding-top:0 !important;
  }
  .scrolled-search-area #search-btn-col button{
    max-width:80px; 
    border-radius:0px 0px 30px 0px; 
    padding-top:20px; padding-bottom:37px;
    background:#fff;
  }
  .scrolled-search-area .search-criteria .v-select__selection{
    color:#fff !important;
  }
  .scrolled-search-area #search-text #input-20{
     color:#fff !important;
  }
</style>