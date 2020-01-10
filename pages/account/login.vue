<template>
  <div class="account-login mt-12">
    <v-container fluid>
        <v-row wrap>
            <v-col cols="12" md="4" lg="4" sm="12" order="12" order-sm="1"  id="left-column" v-show="!$vuetify.breakpoint.smAndDown">
                <v-card  flat="">
                    <v-card dark flat>
                        <v-container class="">
                            <v-row align="center" justify="center">
                                <strong class="display-1 font-weight-regular mr-6">Why Create an Account? </strong>
                            </v-row>
                        </v-container>
                    </v-card>
                    <v-card-text class="py-0">
                        <v-timeline align-top dense>
                            <v-timeline-item color="pink" small>
                                <v-row class="pt-1">
                                    <v-col cols="5">
                                        <strong>Buy. Rent. Sell. </strong>
                                    </v-col>
                                    <v-col>
                                        <div class="caption">Choose from thousands of properties in every region of Kerala.</div>
                                    </v-col>
                                </v-row>
                            </v-timeline-item>

                            <v-timeline-item color="teal lighten-3" small>
                            <v-row class="pt-1">
                                <v-col cols="5">
                                    <strong>Notifications</strong>
                                </v-col>
                                <v-col>
                                    <div class="caption mb-2">Receive E-mail notifications when properties become available</div>
                                </v-col>
                            </v-row>
                            </v-timeline-item>

                            <v-timeline-item color="pink" small>
                                <v-row class="pt-1">
                                    <v-col cols="5 ">
                                        <strong>Verified Sellers</strong>
                                    </v-col>
                                    <v-col>
                                        <div class="caption mb-2">Thousands of verified sellers to find your dream home.</div>
                                    </v-col>
                                </v-row>
                            </v-timeline-item>

                            <v-timeline-item color="teal lighten-3" small>
                                <v-row class="pt-1">
                                    <v-col cols="5">
                                        <strong>List your property</strong>
                                    </v-col>
                                    <v-col>
                                        <div class="caption">Create Your Own Listings for rental or sale</div>
                                    </v-col>
                                </v-row>
                            </v-timeline-item>
                        </v-timeline>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="8" lg="8" sm="12" order="1" order-sm="12" id="right-column">
                <v-card flat="" >
                   <v-img height="auto" width="auto" src="/signup.jpg">
                        <v-form  ref="form" v-model="valid" lazy-validation style="margin:130px auto; width:60%;">
                            <v-text-field outlined v-model="loginForm.email" :rules="emailRules" label="E-mail" required type="email"/>
                            <v-text-field type="password" outlined v-model="loginForm.password" :rules="[v => !!v || 'Password is required']" label="Password" required />                            
                            <v-btn block outlined :disabled="!valid" color="primary" @click="login" class="mb-3">Login</v-btn>
                            <span style="color:#fff">Not Registed? <v-btn text color="success" class="" to="/account/signup">Signup</v-btn></span>
                            <v-btn block text color="error">Or</v-btn>
                            <v-btn style="font-size: 13px; text-transform: capitalize;" text color="white">Login with </v-btn>
                            <v-btn fab color="primary" class="" @click="showFbDialog"><v-icon>mdi-facebook</v-icon></v-btn>
                            <v-btn outlined fab color="#4285F4" @click="loginWithGoogle"><v-icon>mdi-google</v-icon></v-btn>
                        </v-form>
                    </v-img>
                </v-card>
            </v-col>

            <Notifications />
            
        </v-row>
    </v-container>
  </div>
</template>

<script>
import Notifications from '@/components/Notifications'
export default {
    components:{
        Notifications,
    },
    data(){
        return{
            show:false,
            fb:false,
            google: false,
            valid: true,
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            phone:'',
            select: null,
            items: [
                'Individual',
                'Property Owner',
                'Estate Agent',
            ],
            loginForm:{
                email:'',
                password:'',
            },
        }
    },
    methods:{
       login(){
           if(this.$refs.form.validate()){
               this.$store.dispatch('account/login', this.loginForm).then(res =>{
                    if(res.user){
                        this.$router.replace({name: 'dashboard'})
                    }
                    else if(res.code){
                        this.$bus.$emit('showNotification', {message: res.message, type: 'error'})
                        // this.$bus.$emit('showNotification', res)
                        return;
                    }
               })
           }
      },
      showGoogleDialog(){
          this.fb = false;
          this.google = true;
          this.show = !this.show;
      },
      showFbDialog(){
        this.fb = false;
        this.google = true;
        this.show = !this.show;
      },
      loginWithGoogle(){
          this.$store.dispatch('account/googleOAuth', {phone: this.phone, accType: this.select}).then(res =>{
            if(res.code){
                console.log("Response: ", res)
                 this.$bus.$emit('showNotification', {message: res.message, type: 'error'})
                return;
            }
            else if(res.user){
                this.$router.replace({name:'dashboard'})
            }
          })
      },
      loginWithFacebook(){
        // Sign in using a popup.
        this.$store.dispatch('account/loginWithFacebook')
      },
      validate () {
        if (this.$refs.form.validate()) {
            this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
  }
}
</script>

<style>
    .row #left-column, #right-column{
        padding:0 !important;
    }
    #right-column .v-input__slot{
        /* border: 1px solid #fff; */
    }
    #right-column .v-input__slot fieldset{
        border: 1px solid #fff;
    }
    #right-column .v-form .v-label, input{
        color:#fff !important;
    }
    #input-92{
        color:#3d6599 !important;
    }
    

</style>