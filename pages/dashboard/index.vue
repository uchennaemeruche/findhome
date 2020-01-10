<template>
  <div class="dashboard" style="margin-top:100px">
      <v-container>
        <v-card flat>
        <v-row>
          <v-col v-for="(item, i) in menus" :key="i"  >
              <v-card class="mx-auto" max-width="400" :to="item.url">
                <v-card-title style="margin:auto; width:100px;"><center><v-icon>{{ item.icon }}</v-icon></center></v-card-title>
                <v-card-title style="margin:0px auto; width:150px;">{{ item.title }}</v-card-title>
                <v-card-subtitle style="margin:0px auto; width:260px;">{{ item.text }}</v-card-subtitle>
              </v-card>
          </v-col>
          <v-col  v-if="this.$store.state.account.user.admin" >
              <v-card class="mx-auto" max-width="400" to="/dashboard/settings">
                <v-card-title style="margin:auto; width:100px;"><center><v-icon>mdi-search</v-icon></center></v-card-title>
                <v-card-title style="margin:0px auto; width:150px;">Settings</v-card-title>
                <v-card-subtitle style="margin:0px auto; width:260px;">Admin Settings</v-card-subtitle>
              </v-card>
          </v-col>
        </v-row>
      </v-card>   
      <Notifications /> 
      </v-container>
  </div>
</template>

<script>
import AdminCrudTable from '@/components/AdminCrudTable'
import Notifications from '@/components/Notifications'
import {firebase, db} from '@/plugins/firebase';
export default {
  components:{
    'data-table': AdminCrudTable,
     Notifications,
  },
  
  data(){
    return{
      showSettings:false,
      admin:true,
      adminEmail:'',
      menus:[
        {
          title: 'My Listings',
          text: 'Add Remove or Edit your Listings',
          url:'/dashboard/property-listings',
          icon: 'mdi-content-copy',
        },
        {
          title: 'My Profile',
          text: 'Update Profile',
          url:'/dashboard/profile',
          icon: 'mdi-account',
        },
        {
          title: 'My Subscription',
          text: 'Subscribe or Upgrade your current subscription',
          url:'/dashboard/subscription',
          icon: 'mdi-content-copy',
        },
        {
          title: 'My Page',
          text: 'View your dedicated webpage as it is',
          url:'/dashboard/pages',
           icon: 'mdi-content-copy',
        },
      ],
      desserts: [
        {
          id: 1,
          name: 'Frozen Yogurt',
        },
        {
          id: 2,
          name: 'Frozen Somethinf',
        },
        
      ],
          
    }
  },
  computed:{
    categories(){
      return this.$store.state.property.categories;
    },
    types(){
      return this.$store.state.property.types;
    },
    locations(){
      return this.$store.state.property.locations;
    }
  },
  methods:{
    setAdminRole(){
      this.$store.dispatch('account/setAdminRole', this.adminEmail).then(res =>{
        if(res.data.errorInfo){
          this.$bus.$emit('showNotification', {message: res.data.errorInfo.message, type: 'error'})
        }else{
          this.$bus.$emit('showNotification', {message: res.data.message, type: 'success'})
        }
      })
    }
  },
  mounted(){
    this.$store.dispatch('property/loadItems')
  }
}
</script>

<style>

</style>