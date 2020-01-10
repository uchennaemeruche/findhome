<template>
  <div class="id" style="margin-top:100px;">
      <p>CHECK VUE</p>
      <v-btn @click="goTO">Check Route</v-btn>
  </div>
</template>

<script>
export default {
  methods:{
    goTO(){
            console.log("Check: ",this.$route)
            
            //  this.$router.push({name:'dashboard-id'})
        }
  }
}
</script>

<style>

</style>