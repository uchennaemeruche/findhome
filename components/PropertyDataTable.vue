<template> 
    <div class="property-table">
      <v-card>
        <v-card-title>
          Property List
          
          <v-spacer></v-spacer>
          <v-text-field style="color:black !important;" v-model="search" append-icon="mdi-search-web" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="propertyListings"
          item-key="id"
          group-by="category"
          class="elevation-1"
          show-group-by
          :search="search"
          loading loading-text="Loading... Please wait" 
        >
        <template v-slot:item.action="{ item }">
          <v-btn text @click="editRecord(item)"><v-icon>mdi-table-edit</v-icon></v-btn>
          <v-btn text @click="deleteRecord(item)"><v-icon>mdi-table-row-remove</v-icon></v-btn>
         
        </template>
      
        </v-data-table>
      </v-card>
      
      <DeleteDialog />
    </div>
  
</template>

<script>
import Notifications from '@/components/Notifications'
import DeleteDialog from '@/components/deleteDialog'
export default {
    name: 'property-data-table',
    components:{
        DeleteDialog,
    },
    data(){
        return{
          search:'',
            headers: [
          {
            text: 'Property Name',
            align: 'left',
            value: 'title',
          },
          { text: 'Type', value: 'typeName' },
          { text: 'Category', value: 'categoryName' },
          { text: 'Location', value: 'locationName' },
          {text: 'Action', value: 'action'}
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
    methods: {
      editRecord(item){
        this.dialog = !this.dialog
        this.$bus.$emit('showDialog', {type:'update', data:item})
      },
      deleteRecord(item){
        this.$bus.$emit('showDeleteDialog', {collection: 'property-listing', id: item.id})
      }
    },
    mounted(){
      this.$store.dispatch('property/loadPropertyListingsByUser', {user: this.$store.state.account.user})
    }
}
</script>

<style>

</style>