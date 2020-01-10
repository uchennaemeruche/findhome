<template>
  <div class="account-signup mt-12">
      
      
    <v-container fluid>
        <v-row>
            <v-col cols="12" md="4" lg="4" sm="12" id="left-column" v-show="!$vuetify.breakpoint.smAndDown">
                <v-card  flat="">
                    <v-card dark flat>
                        
                        <v-container class="">
                            <v-row align="center" justify="center">
                                <strong class="display-1 font-weight-regular mr-6">Why Signup with us?</strong>
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
            <v-col cols="12" class="mx-auto" md="8" lg="8" sm="12" id="right-column">
                <v-card flat="" >
                   <v-img height="auto" width="auto" src="/signup.jpg">
                        <v-form  ref="form" v-model="valid" lazy-validation style="margin:50px auto; width:60%;">
                            <v-text-field outlined v-model="name" :counter="10" :rules="nameRules" label="Name" required />
                            <v-text-field type="email" outlined v-model="email" :rules="emailRules" label="E-mail" required />
                            <v-text-field type="number" outlined v-model="phone" :rules="[v => !!v || 'Phone Number is required']" label="Phone Number" required />
                            <v-text-field type="password" outlined v-model="password" :rules="[v => !!v || 'Password is required']" label="Password" required />
                            <v-text-field type="password" outlined v-model="confirmPassword" :rules="[v => !!v || 'Password is required']" label="Confirm Password" required />
                            <v-select outlined v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="Account Type" required />
                            <v-checkbox outlined v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" required >
                                <template v-slot:label>
                                    <div @click.stop="">
                                    Do you accept the
                                    <a href="javascript:;" @click.stop="terms = true">terms</a>
                                    and
                                    <a href="javascript:;" @click.stop="terms = true">conditions?</a>
                                    </div>
                                </template>
                            </v-checkbox>
                            
                            
                            <v-btn block outlined :disabled="!valid" color="primary" @click="signup" class="mb-3">Signup</v-btn>
                            <span style="color:#fff">Already Registed? <v-btn text color="success" class="" to="/account/login">Login</v-btn></span>
                            <v-btn block text color="error">Or</v-btn>
                            <v-btn style="font-size: 12px; text-transform: capitalize;" text color="white">Signup with </v-btn>
                            <v-btn fab color="primary" class="" @click="signupWithFacebook"><v-icon>mdi-facebook</v-icon></v-btn>
                            <v-btn outlined fab color="#4285F4" @click="signupWithGoogle"><v-icon>mdi-google</v-icon></v-btn>
                        </v-form>
                    </v-img>
                </v-card>
            </v-col>
            <v-dialog v-model="terms" width="70%">
                <v-card>
                    <v-card-title class="title">Terms</v-card-title>
                    <v-card-text v-for="n in 5" :key="n">
                     {{ content }}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text color="purple" @click="terms = false">Ok</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- <v-dialog v-model="show">
                <v-card width="500" class="mx-auto pt-5 pb-5 pl-5 pr-5" >
                    <v-text-field type="number" outlined v-model="phone" label="Phone Number" required />
                    <v-select outlined v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="Account Type" required />
                    <v-btn outlined v-on:click="google ? signupWithGoogle() : signupWithFacebook()">Continue</v-btn>
                </v-card>
            </v-dialog> -->

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
            terms:false,
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.`,
            google:false,
            fb: false,
            show:false,
            valid: false,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                // v => (v && v.length < 6) || 'Name must be less than 6 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            phone:'',
            password:'',
            confirmPassword:'',
            select: null,
            items: [
                'Individual',
                'Property Owner',
                'Estate Agent',
            ],
            checkbox: false,
        }
    },
    methods:{
        showDialog(provider){
            if(provider === 'google'){
                console.log("Provider: ", provider)
                this.google = true;
                this.fb = false;
                this.show = true;
            }else{
                console.log("Provider: ", provider)
                this.google = false,
                this.fb = true;
                this.show = true;
            }
        },
        signupWithGoogle(){
            this.$store.dispatch('account/googleOAuth', {phone: this.phone, accType: this.select}).then(res =>{
              console.log("Response: ", res)
              this.$router.replace({name:'dashboard'})
            })
        },
        signupWithFacebook(){
            console.log("Facebook Selected")
        },
        signup(){
            if(this.$refs.form.validate()){
                this.$store.dispatch('account/signup', {phone: this.phone, email:this.email, password:this.password, name: this.name, accType: this.select}).then(res =>{
                    console.log("Signup Response: ", res);
                    if(res.user){
                        this.$router.replace({name: 'dashboard'})
                    }
                    else if(res.code){
                         this.$bus.$emit('showNotification', {message: res.message, type: 'error'})
                        return;
                    }
                }).catch(error =>{
                    console.log("Signup Error : ", error)
                })
            }else{
                alert("Not valid");
                return
            }
        },
        validate () {
            if (this.$refs.form.validate()) {
                this.valid = true
            }
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },
        googleSignIn () {
          this.provider = new firebase.auth.GoogleAuthProvider()
          firebase.auth().signInWithPopup(this.provider).then(result => {
            // store the user ore wathever
            // this.$router.push('/home')
            console.log("Login Result: ", result)
          }).catch(e => {
            // this.$snotify.error(e.message)
            console.log(e)
          })
        }
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
    #right-column .v-select__selections{
        color:#fff !important;
    }
    #right-column .v-form .v-icon{
        color:#fff !important;
    }
    .v-dialog .v-input__control input{
        color: #3d6599 !important;
    }

    

</style>