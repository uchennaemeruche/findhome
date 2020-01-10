<template>
  <div class="dash" style="margin-top:100px;">
    <AdminNavigation/>
    <Notifications />

    <v-dialog v-model="show" persistent>
        <v-card width="500" class="mx-auto pt-5 pb-5 pl-5 pr-5" >

            <!-- <v-text-field type="text" outlined v-model="Name" :rules="[v => !!v || 'Item is required']" label="Phone Number" required /> -->
            <v-text-field type="number" outlined v-model="phone" :rules="[v => !!v || 'Item is required']" label="Phone Number" required />
            <v-select outlined v-model="accType" :items="items" :rules="[v => !!v || 'Item is required']" label="Account Type" required />
            <v-btn block outlined @click="updateRecord">Update</v-btn>
        </v-card>
    </v-dialog>
    <nuxt-child/>      
  </div>
</template>

<script>
import AdminNavigation from '@/components/AdminNavigation'
import {firebase, usersCollection} from '@/plugins/firebase';
import Notifications from '@/components/Notifications'
export default {
    components:{
        AdminNavigation,
        Notifications,
    },
    data(){
      return{
        show:false,
        phone:'',
        displayName:'',
        email:'',
        accType: null,
            items: [
                'Individual',
                'Property Owner',
                'Estate Agent',
            ],
        currentUser:null,
      }
    },
    methods:{
      updateRecord(){
        this.$store.dispatch("account/updatePhoneAndAccountType", {displayName: this.displayName, email:this.email, phone:this.phone, accType: this.accType, uid: this.$store.state.account.user.uid}).then(() =>{
          this.$bus.$emit('showNotification', {message: 'Account updated successfully', type: 'success'})
          this.show = false
          return;
        }).catch(() =>{

        })
      }
    },
    mounted(){
      usersCollection.doc(this.$store.state.account.user.uid).get().then(snapshot =>{
        // console.log(snapshot.data())
        // console.log("Current User: ", this.$store.state.account.user)
        if(snapshot.exists){
          this.$store.commit('account/setAccountType', snapshot.data().accountType.split(" ").join(''))
          return;
        }else{
          this.displayName = this.$store.state.account.user.displayName;
          this.email = this.$store.state.account.user.email;
          this.show = true
        }
      })
    }
}
</script>

<style>

</style>