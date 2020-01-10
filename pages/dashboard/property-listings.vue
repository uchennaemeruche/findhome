<template>
  <div class="listings">
      <!-- <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <PropertyList />
        </v-row>
      </v-container> -->
      {{ $store.state.account.user.accType }}
      <PropertyListFilter v-show="$store.state.account.user.accType == 'individual'" />
      <div v-if="$store.state.account.user.accType != 'individual'">
        <PropertyDataTable />
        <v-btn @click="addListing" :bottom="$vuetify.breakpoint.mdAndUp" :top="$vuetify.breakpoint.smAndDown" class="mt-12" :right="$vuetify.breakpoint.mdAndUp" :left="$vuetify.breakpoint.smAndDown" color="pink" dark fab fixed>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
       <edit-dialog />
  </div>
</template>

<script>
import PropertyList from '@/components/PropertyList'
import PropertyListFilter from '@/pages/property/_id/index'
import PropertyDataTable from '@/components/PropertyDataTable'
import RecordDialog from '@/components/AddEditProperty'
export default {
  components:{
    PropertyList,
    PropertyListFilter,
    PropertyDataTable,
    'edit-dialog': RecordDialog,
  },
  data(){
      return{
          source:'',
      }
  },
  methods:{
    addListing(){
      this.$bus.$emit('showDialog', {type:'add', data:{}})
    }
  }
}
</script>

<style>

</style>