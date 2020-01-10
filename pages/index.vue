<template>
  <div class="index">
    <v-layout column >
    <v-container fluid>
      <v-flex xs12 sm12 md12 style="background:red;">
        <v-card style="height:auto; ">
          <v-carousel  height="" hide-delimiter-background hide-delimiters show-arrows-on-hover>
            <v-carousel-item v-for="(slide, i) in slides" :key="i">
                <v-sheet height="" :style="{ background: `url(${images[i]})` }" style="border-radius: 0px !important; " >
                  <v-layout row wrap v-if="showSearchCriteria" style="">

                      <v-flex xs12 mb-5 pb-12 style="">
                        <search-box :scrolledSearchArea="false" :searchCriteriaContainer="true" :col1="1" :col2="2" col4="4" col3="3" />
                      </v-flex>
                  </v-layout>
                </v-sheet>
              
            </v-carousel-item>
            
          </v-carousel>
        </v-card>
      </v-flex>
      <v-flex mt-3>
        
        <PropertyList />

      </v-flex>
    </v-container>
  </v-layout>
  </div>
</template>

<script>
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import SearchBox from '@/components/SearchBox'
import PropertyList from '@/components/PropertyList'

export default {
  components: {
    VuetifyLogo,
    PropertyList,
    'search-box': SearchBox,
  },
  data(){
    return{
      showSearchCriteria:true,
      colors: [          
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
      slides: [
          'First',
          'Second',
        ],
      images:[
        "/banner.jpg",
        "/banner2.jpg"
      ],
    }
  },
  computed: {
    viewport(){
      return this.$vuetify.breakpoint.name
    }
  },
  watch:{
    viewport(val){
      switch (val) {
        case 'xs': console.log('220px')
        case 'sm': console.log('400px')
        case 'md': console.log('500px')
        case 'lg': console.log('600px')
        case 'xl': console.log('800px')
      }
    }
  },
  mounted(){
      this.$bus.$on('handleScroll', (data) => { 
          this.showSearchCriteria = data
      }) 
  }
  
  
  
}
</script>
<style>
  .container{
    padding:0 !important;
  }
</style>
