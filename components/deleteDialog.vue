<template>
  <v-row justify="center">
        <v-dialog v-model="deleteConfirmationDialog" persistent max-width="290">
            <v-card>
                <v-toolbar dark color="error" />
                <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                <v-card-text>Note: Deleted Item can not be recovered!!</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="cancelDeletion">Cancel</v-btn>
                <v-btn color="green darken-1" text @click="deleteItem">Agree</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    data(){
        return{
            deleteConfirmationDialog:false,
            name:'',
            itemId:'',
            collection:'',
        }
    },
    methods:{
        cancelDeletion(){
            this.deleteConfirmationDialog = false;
            return;
        },
        deleteItem(){
            let data = {
                id: this.itemId,
                collection: this.collection
            }
            this.$store.dispatch('property/deleteItem', data).then((res) =>{
                if(res.status == 200){
                    this.$bus.$emit('showNotification', {message: res.msg, type: 'success'})
                    this.deleteConfirmationDialog = false;
                }else{
                    this.$bus.$emit('showNotification', {message: res.msg, type: 'error'})
                    this.deleteConfirmationDialog = false;
                }  
            })
        },
    },
    mounted(){
      this.$bus.$on('showDeleteDialog', (data) =>{
        this.itemId = data.id;
        this.collection = data.collection
        this.deleteConfirmationDialog = true;
        // this.showNotification(data.message, data.type)
      })
    }
}
</script>

<style>

</style>