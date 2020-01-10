<template>
     <div class="filter">
      <v-btn color="" dark @click.stop="toggleDrawer" class="hidden-md-and-up" style="background:#3d6599;">
        <v-icon>mdi-view-dashboard</v-icon>
      </v-btn>
      <v-navigation-drawer v-if="drawer == true" v-model="drawer" class="pb-0" flat hide-overlay width="380" floating bottom clipped>  
         <search-box :scrolledSearchArea="true" :searchCriteriaContainer="false" :col1="12" :col2="12" :col3="12" :col4="12" />    
        <!-- <v-divider></v-divider> -->
        <!-- <v-list class="pt-0" dense >
          <v-divider light></v-divider>
          <v-subheader>Brand:</v-subheader>
          
              <v-radio-group v-model="brandModel" hide-details v-for="(item, i) in items" :key="i">
                <v-radio :value="`${item.title}`" :label="`${item.title}`"></v-radio>
                
            </v-radio-group>
        </v-list> -->
       
    </v-navigation-drawer>
    </div>
</template>

<script>
import SearchBox from './SearchBox';
export default {
    name: 'search-filter',
    components:{
      'search-box': SearchBox
    },
    props:['param'],
    data(){
        return{
            chip:[],
            brandModel:'',
            priceModel:'',
            items: [
                { title: 'Home', icon: 'dashboard' },
                { title: 'About', icon: 'question_answer' }
            ],
            prices:[
              {label: 'Under 2000', value: 2000},
              {label: '10, 000', value: 10000},
              {label: '20, 000', value: 20000},
              {label: '30, 000', value: 30000},
              {label: '40, 000', value: 40000},

            ],
            selectedFilters:[],
            drawer:true
        } 
    },
    computed:{
       products(){
         return '';
       },
    },
    methods:{
      toggleDrawer(){
        this.drawer = !this.drawer
      },
    },
    // created(){
    //   this.$bus.$on('showSearchBox', (data) =>{
    //     this.toggleDrawer()
    //   })
    // }
}
</script>

<style>
    #nav-drawer{
    font-size: .75rem;
    max-width: 100%;
    padding-top: .4375rem;
    color:#1c1d1f !important;
    background:#f2f2f2 !important;
  }
  .filter .scrolled-search-area{
   background:#3d6599 !important;
   padding:20px 10px;
  }
  .filter .scrolled-search-area #search-text .v-input{
    /* margin-left:-30px; */
    border-radius: 30px 30px 0 0px !important;
    margin-left:0;
  }
  .filter .scrolled-search-area #search-btn-col button{
    border-radius:0px 0px 30px 30px; 
    padding-top:20px; padding-bottom:37px;
    max-width: 600px;
    width: 100%;
    margin-top:10px;
  }

</style>