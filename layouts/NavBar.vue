<template>
  <div class="navbar">
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="!$vuetify.breakpoint.smAndDown" /> -->
        <v-app-bar extended :extension-height="extensionHeight" v-if="!$vuetify.breakpoint.smAndDown"
          :clipped-left="clipped" fixed app :flat="flatNav" elevate-on-scroll=""
          style="border-radius:0px 0px 20px 20px; background: #3d6599;">

          <v-toolbar-title>
            <div class="text-center" >
              <nuxt-link to="/">
                <vuetify-logo />
              </nuxt-link>
            </div>
          </v-toolbar-title>

          <v-spacer></v-spacer>
      
          <v-toolbar-items>
            <v-btn text to="/property/4SbY4LaEW829Lr0umD8X">Buy</v-btn>
            <v-btn text to="/property/aBtCR6UtAVEjDTStlgGM">Rent</v-btn>
            <v-btn text to="/account/login">Sell/List Property</v-btn>
            <v-btn text to="/account/login">Login</v-btn>
            <v-btn text to="/dashboard" v-show="JSON.stringify($store.state.account.user) !== '{}'">My Dashboard</v-btn>
            <v-btn text to="/account/signup">Signup</v-btn>
          </v-toolbar-items>
          <template v-slot:extension v-if="showSearchBox" >
            <v-tabs background-color="transparent">

              <v-flex>
                <search-box :scrolledSearchArea="true" :searchCriteriaContainer="false" :col1="1" :col2="2" col4="4" col3="3" />
              </v-flex>

            </v-tabs>
          </template>

        </v-app-bar>
        <v-app-bar fixed flat tile v-if="$vuetify.breakpoint.smAndDown" elevate-on-scroll=""
          style="background: #3d6599;">
          <v-toolbar-title>
            <div class="text-center">
              <vuetify-logo />
            </div>
          </v-toolbar-title>

          <v-spacer></v-spacer>
          <v-menu >
            <template v-slot:activator="{ on }">
                <v-app-bar-nav-icon v-on="on" color="white"></v-app-bar-nav-icon>
            </template>
            <v-list dense nav>
              <!-- <v-list-item @click.native="toggleSearchBox">
                <v-list-item-content>Search</v-list-item-content>
              </v-list-item> -->
              <v-list-item link to="/dashboard" v-if="JSON.stringify($store.state.account.user) !== '{}'">
                  <v-list-item-content>
                    <v-list-item-title>Dashboard</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                
              </v-list>
          </v-menu>
        </v-app-bar>
      
  </div>
</template>

<script>
  import VuetifyLogo from '~/components/VuetifyLogo.vue';
  import SearchBox from '@/components/SearchBox';
  import firebase from 'firebase'
  export default {
    components: {
      VuetifyLogo,
      'search-box': SearchBox,
    },
    data() {
      return {
        showSearchBox: true,
        extensionHeight: 0,
        flatNav: false,
        clipped: false,
        drawer: false,
        title: "Find Home",
        miniVariant: false,
        items: [
          {
            icon: 'mdi-apps',
            title: 'Buy',
            to: '/property/4SbY4LaEW829Lr0umD8X'
          },
          {
            icon: 'mdi-chart-bubble',
            title: 'Rent',
            to: '/property/aBtCR6UtAVEjDTStlgGM'
          },
          {
            icon: 'mdi-chart-bubble',
            title: 'Sell/List Property',
            to: '/account/login'
          },
          {
            icon: 'mdi-chart-bubble',
            title: 'Signup',
            to: '/account/signup'
          },
          {
            icon: 'mdi-chart-bubble',
            title: 'Login',
            to: '/account/login'
          },
        ],
      }
    },
    methods:{
        // toggleSearchBox(){
        //   this.$bus.$emit('showSearchBox', true)
        // },
        handleScroll(){
            if(window.scrollY >= 190){
                if(this.$route.name !== 'property-search'){
                  this.extensionHeight = 70;
                  this.$bus.$emit('handleScroll', false)
                }
            } else{
                this.extensionHeight = 0;
                this.$bus.$emit('handleScroll', true)
            }
        },
        
    },
    created() {
        if (process.browser){
            window.addEventListener('scroll', this.handleScroll);
        }
    },

    beforeDestroy() {
        if(process.browser){
            window.removeEventListener('scroll', this.handleScroll);
        }
    },
  }

</script>

<style>
  .v-toolbar__items button {
    text-transform: capitalize;
    font-weight: lighter;
    
  }
  .v-content {
    padding-top: 0px !important;
  }

  .v-toolbar__items {
    display: block;
  }
  .navbar .v-toolbar__items .v-btn{
    color:#fff !important;
  }
  .v-toolbar__items button {
    width: 60px;
    padding: 0 20px;
    margin: 0 20px;
    font-family: ‘Tahoma’;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 400;
    color: white !important;
    text-align: center;
    text-decoration: none;
    -webkit-transition: all .25s ease;
    -moz-transition: all .25s ease;
    -ms-transition: all .25s ease;
    -o-transition: all .25s ease;
    transition: all .25s ease;
  }

  .v-toolbar__items button:hover {
    background-color: #3d6599;
    color: #fff;
    background-color: rgb(58, 142, 219);
  }
  

</style>
