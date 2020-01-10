<template>
  <div class="admin-navigation">
      <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.mdAndUp" app>
        <v-list dense>
            <template v-for="item in items">
            <v-list-item :key="item.text" link :to="item.url">
                <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                <v-list-item-title>
                    {{ item.text }}
                </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </template>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.mdAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
          <router-link to="/dashboard">
            <span class="hidden-sm-and-down">FindHome</span>
          </router-link>
        </v-toolbar-title>
      <v-text-field flat
        solo-inverted hide-details prepend-inner-icon="mdi-magnify" label="Search" class="hidden-sm-and-down"/>
      <v-spacer />
      <!-- <p v-if="$store.state.account.user"> {{ $store.state.account.user.email }}</p> -->
      <v-avatar color="indigo">
        <!-- <v-icon dark>mdi-account-circle</v-icon> -->
        <span class="white--text headline">{{ $store.state.account.user.email.substring(0, 2)}}</span>
      </v-avatar>
      <!-- <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn> -->
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <!-- <v-btn icon large>
        <v-icon>mdi-account</v-icon>
      </v-btn> -->
      <v-btn icon large @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

  </div>
</template>

<script>
import {firebase, usersCollection} from '@/plugins/firebase';
import cookie from 'js-cookie';
export default {
    data(){
        return{
            dialog: false,
            drawer: false,
            items: [
                { icon: 'mdi-home', text: 'Go to Site', url: '/' },
                { icon: 'mdi-contacts', text: 'View Listings', url: '/dashboard/property-listings' },
                { icon: 'mdi-history', text: 'Add New Listing', url: '/dashboard/property-listings' },
                { icon: 'mdi-settings', text: 'Profile', url: '' },
                // {
                // icon: 'mdi-chevron-up',
                // 'icon-alt': 'mdi-chevron-down',
                // text: 'Labels',
                // model: true,
                // children: [
                //     { icon: 'mdi-plus', text: 'Create label' },
                // ],
                // },
                // {
                // icon: 'mdi-chevron-up',
                // 'icon-alt': 'mdi-chevron-down',
                // text: 'More',
                // model: false,
                // children: [
                //     { text: 'Import' },
                //     { text: 'Export' },
                //     { text: 'Print' },
                //     { text: 'Undo changes' },
                //     { text: 'Other contacts' },
                // ],
                // },
                { icon: 'mdi-settings', text: 'Settings', url: '/dashboard/settings' },
                { icon: 'mdi-message', text: 'Send feedback', url: '' },
                { icon: 'mdi-help-circle', text: 'Help', url: '' },
                { icon: 'mdi-cellphone-link', text: 'App downloads', url: '' },
            ],
        }
    },
    methods:{
      logout(){
        this.$store.dispatch('account/logout').then(res =>{
          this.$router.replace({name: 'account-login'});
        }).catch((error) =>{
          console.log("Logout Error: ", error)
        })
      }
    }
}
</script>

<style>

</style>