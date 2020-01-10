<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" :color="color">
      {{ msg }}
      <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
</template>

<script>
export default {
    data(){
        return{
            msg:'',
            snackbar:null,
            timeout: 4000,
            color:'',
        }
    },
    methods:{
        showNotification(msg, type){
            this.msg = msg;
            if(type == "error") this.color ="red"
            else this.color = "green"
            this.snackbar = true
        }
    },
    mounted(){
      this.$bus.$on('showNotification', (data) =>{
        this.showNotification(data.message, data.type)
      })
    }
}
</script>

<style>

</style>