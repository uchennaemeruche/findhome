<template>
   <div>
    <v-text-field 
        v-model="name" 
        label="Enter To Add New Item" 
        :append-outer-icon="name ? 'mdi-send' : 'mdi-plus'" 
        clearable clear-icon="mdi-close"
        @click:append-outer="addItem"
    />   
    <v-data-table
        :headers="headers"
        :items="data"
        :items-per-page="5"
        class="elevation-1"
    >

        <template v-slot:item.action="{ item }">
            <v-speed-dial direction="left" :transition="transition">
                <template  v-slot:activator >
                    <v-btn v-model="item" fab text>
                    <v-icon  >mdi-table-edit</v-icon>
                    <!-- <v-icon v-else>mdi-close</v-icon> -->
                    </v-btn>
                </template>
                <v-btn fab dark small color="red" @click="showDeleteDialog(item)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn fab dark small color="green" @click="editItem(item)">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </v-speed-dial>
            
        </template>
    </v-data-table>

    <v-dialog v-model="dialog" transition="dialog-bottom-transition" width="700">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <!-- <v-toolbar-title>Close</v-toolbar-title> -->
        </v-toolbar>
        <v-card color="white darken-5" class="mb-12" height="auto">
            <v-form ref="form" lazy-validation style="margin:20px 80px; padding:30px 5px;">
                <v-text-field v-model="name" :counter="10" label="Name" required />
                
                <v-btn outlined @click="updateItem">Update Record</v-btn>
            </v-form>
        </v-card>         
      </v-card>
    </v-dialog> 

    <DeleteDialog />
   </div>
</template>

<script>
import Notifications from '@/components/Notifications'
import DeleteDialog from '@/components/deleteDialog'
export default {
    name: 'admin-crud-table',
    components:{
        DeleteDialog,
    },
    props:['collection', 'data'],
    data(){
        return{
            dialog:false,
            deleteConfirmationDialog:false,
            name:'',
            itemId:'',
            fab:false,
            transition: 'slide-y-reverse-transition',
            hover: false,  
            
            headers: [
            {
                text: 'ID',
                align: 'left',
                sortable: false,
                value: 'id',
            },
            { text: 'Name', value: 'name' },
            {text: 'Action', value: 'action'}
          
        ],
        }
    },
    methods:{
        addItem(){
            this.$store.dispatch('property/createItems', {name:this.name, collection:this.collection}).then((res) =>{
                if(res.status == 200){
                    this.$bus.$emit('showNotification', {message: res.msg, type: 'success'})
                }else{
                    this.$bus.$emit('showNotification', {message: res.msg, type: 'error'})
                }   
            })
        },
        editItem(item){
            this.name = item.name;
            this.itemId = item.id
            this.dialog = !this.dialog;
        },
        showDeleteDialog(item){
            // this.itemId = item.id;
            // this.deleteConfirmationDialog = true;
            this.$bus.$emit('showDeleteDialog', {collection: this.collection, id: item.id})
        },
        
        updateItem(){
            let data = {
                id: this.itemId,
                collection:this.collection,
                name: this.name
            }
            this.$store.dispatch('property/updateItem', data).then((res) =>{
                if(res.status == 200){
                    this.$bus.$emit('showNotification', {message: res.msg, type: 'success'})
                }else{
                    this.$bus.$emit('showNotification', {message: res.msg, type: 'error'})
                }   
            })
        }
    }
}
</script>

<style>

</style>