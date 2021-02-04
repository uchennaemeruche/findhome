<template>
  <v-app light>
    <Navigation v-show="$route.matched[0].path != '/dashboard' "/>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <Footer v-show="($route.matched[0].path != '/account') " />
  </v-app>
</template>

<script>
import Navigation from './NavBar'
import Footer from '@/components/Footer'
export default {
  components:{
    Navigation, 
    Footer,
  },
  data () {
    return {
       fixed: false,

     
    }
  },
  // mounted () {
  //     console.log(this.$vuetify.breakpoint)
  // },

  // computed: {
  //   imageHeight () {
  //     switch (this.$vuetify.breakpoint.name) {
  //       case 'xs': return '220px'
  //       case 'sm': return '400px'
  //       case 'md': return '500px'
  //       case 'lg': return '600px'
  //       case 'xl': return '800px'
  //     }
  //   },
  // },
}
</script>
<style>
   #search-btn-col{
    padding-left:0 !important; 
    margin-top:-30px ; 
    padding-top:0 !important;
  }
  #search-btn-col button{
    max-width:80px; 
    border-radius:0px 0px 30px 0px; 
    padding-top:20px; padding-bottom:37px;
    background:#3d6599;
  }
  #search-text{
    padding-right:0 !important;
  }
  #search-text .v-input{
    border-radius:30px 0px 0 0px ;
  }

  .search-criteria-container{
    margin-top:250px;
    background:#f6faff !important;
    padding-top:15px; 
    padding-bottom:0;
  }
  .search-criteria-container .v-input__slot{
    border:#3d6599 1px solid;
  }
  .search-criteria-container .v-label{
    color:#3d6599 !important;
  }
  .search-criteria-container .v-icon{
    color:#3d6599 !important;
  }
  .search-criteria{
    margin-left:0 !important; 
    margin-right:0 !important; 
    padding-left:0 !important; 
    padding-right:0 !important;
  }
  .search-criteria .v-input{
    border-radius: 0px !important;
  }
  .search-criteria .v-select__selection{
    color:#3d6599 !important;
  }
  .search-criteria-container.xsOnly{
    padding:15px 10px 0 10px;
    margin: 250px 10px 0 10px;
    
  }
  .search-criteria-container.xsOnly .search-criteria .v-input{
    border-radius: 20px 20px 0 0px !important;
  }
  .search-criteria-container.xsOnly #search-text .v-input{
    border-radius:20px 20px 0 0px ;
    margin-left: 0 !important;
    padding-left: 0 !important;
  }
  .search-criteria-container.xsOnly #search-btn-col button{
    border-radius:0px 0px 30px 30px; 
    padding-top:20px; padding-bottom:37px;
    background:#3d6599;
    max-width: 600px;
    width: 100%;
    margin-top:10px;
  }
  .search-criteria-container.xsOnly #search-text .v-input__control{
    margin-left:-30px;
  }
  .search-criteria-container.xsOnly #search-text #input-34{
     color:#3d6599 !important;
  }
</style>