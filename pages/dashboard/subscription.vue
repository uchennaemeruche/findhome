<template>
  <v-container fluid>
      <v-row>
          <v-col>
            <v-card flat class="mx-auto" max-width="600" style="border: 2px solid #F4F5F4 !important; ">
                <v-toolbar flat="" color="#F4F5F4" >
                    <p>Current Subscriptions</p>
                </v-toolbar>
                <!-- <v-card-subtitle>Current Subscriptions</v-card-subtitle> -->
                <v-card-text class="text--primary">
                   <v-data-table
                    :headers="headers"
                    :items="payments"
                    item-key="payment_ref"
                    group-by="subscription_type"
                    class="elevation-1"
                    show-group-by
                    :search="search"
                    loading loading-text="Loading... Please wait" 
                    >
      
                    </v-data-table>
                </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card flat class="mx-auto" max-width="400" style="border: 2px solid #F4F5F4 !important; ">
                <v-toolbar flat="" color="#F4F5F4" >
                    <p>New Subscription</p>
                </v-toolbar>
                <v-card-subtitle>New Subscription</v-card-subtitle>
                <v-card-text class="text--primary">
                    <v-select outlined label="Plan" @change="changePaymentPlan" :items="payment_plans" :item-text="payment_plans.text" :item-value="payment_plans.value" v-model="payment.plan"></v-select>
                    <v-select v-if="monthly == true" outlined label="Duration" :items="payment_durations" :item-text="payment_durations.text" :item-value="payment_durations.value" v-model="payment.duration" ></v-select>
                    <v-select outlined label="Payment Method" @change="changePaymentMethod" :items="payment_methods" :item-text="payment_methods.text" :item-value="payment_methods.value" v-model="payment.method"></v-select>
                </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card flat class="mx-auto" max-width="400">
                <v-toolbar flat="" color="#FFD46B" >
                    <p>New Subscription  Summary</p>
                </v-toolbar>
                <v-row class="mx-0">
                    <v-card-subtitle>Plan: </v-card-subtitle>
                    <v-spacer></v-spacer>
                    <v-card-subtitle>{{payment.plan}}</v-card-subtitle>
                </v-row>
                 <v-divider></v-divider>
                <v-row class="mx-0" v-if="monthly == true" >
                    <v-card-subtitle>Duration: </v-card-subtitle>
                    <v-spacer></v-spacer>
                    <v-card-subtitle>{{ payment.duration}}</v-card-subtitle>
                </v-row>
                <v-divider></v-divider>
                <v-row class="mx-0">
                    <v-card-subtitle>Price: </v-card-subtitle>
                    <v-spacer></v-spacer>
                    <v-card-subtitle>{{ price }}</v-card-subtitle>
                </v-row>
                 <v-divider></v-divider>
                
                <v-toolbar flat="" color="#FFD46B" >
                    <p>Grand Total: </p>
                    <v-spacer></v-spacer>
                    <p>{{total_payment}}</p>
                </v-toolbar>
                <v-card-actions>
                    <!-- <v-btn color="green" text block>Pay Now</v-btn> -->
                    <form v-if="payOnline">
                        <script src="https://js.paystack.co/v1/inline.js"></script>
                        <!-- <button type="button" @click="payWithPaystack"> Pay </button>  -->
                        <v-btn style="display: -webkit-box; display: flex; -webkit-box-flex: 1; flex: 1 0 auto; width:380px !important; max-width: 800px !important;" color="green" text block type="button" @click="payWithPaystack">Pay Now</v-btn>
                    </form>
                    <div v-if="payOffline">
                        <v-card-text>
                            <div class="display-2 text--primary">Account Details</div>
                            <v-divider></v-divider>
                            
                            <v-card-title >Account Name:</v-card-title>
                            <v-card-subtitle>Name of Account</v-card-subtitle>
                            <v-card-title >Account Number:</v-card-title>
                            <v-card-subtitle>Acct Number</v-card-subtitle>
                            <v-card-title >Bank:</v-card-title>
                            <v-card-subtitle>bank name</v-card-subtitle>
                            
                            </v-card-text>
                    </div>
                </v-card-actions>
            </v-card>
          </v-col>
      </v-row>
   
    <Notifications />
  </v-container>
</template>

<script>
import Notifications from '@/components/Notifications'
export default {
    name: 'subscription',
    components:{
        Notifications,
    },
    head() {
        return {
            
        }
    },
    data(){
        return{
            search:'',
            headers: [
                {text: 'Payment Date', align: 'left', value: 'payment_date'},
                { text: 'Amount', value: 'amount' },
                { text: 'Subscription Type', value: 'subscription_type' },
                { text: 'Payment Ref', value: 'payment_ref' },
                
            ],
            monthly:false,
            payOnline:false,
            payOffline:false,
            payment:{
                plan:'',
                duration:'1',
                method:'',
            },
            payment_plans: [
                { text: 'Monthly', value:'monthly' },
                { text: 'Yearly', value:'yearly' },
                { text: 'Unlimited', value: 'unlimited' },
            ],
            payment_methods: [
                { text: 'Instant Payment(Online)', value:'online' },
                { text: 'Cash Deposit', value:'deposit' },
                { text: 'bank Transfer', value: 'transfer' },
            ],
            payment_durations: [
                { text: '1 Month', value:1 },
                { text: '2 Months', value:1 },
                { text: '3 Months', value: 3 },
                { text: '4 Months', value:4 },
                { text: '5 Months', value:5 },
                { text: '6 Months', value: 6 },
                { text: '7 Months', value:7 },
                { text: '8 Months', value:8 },
                { text: '9 Months', value: 9 },
                { text: '10 Months', value: 10 },
                { text: '11 Months', value: 11},
                { text: '12 Months', value: 12},
            ],
        }
    },
    computed:{
        price(){
            if(this.payment.plan == 'yearly'){
                return 10000
            }else if(this.payment.plan == 'unlimited'){
                return 100000
            }else if(this.payment.plan == 'monthly'){
                return 1000
            }
        },
        total_payment(){
            if(this.monthly){
                return this.price * this.payment.duration
            }else{
                return this.price
            } 
        },
        payments(){
            const newPayment = this.$store.state.payment.payments.map(payment =>{
                payment.data.id = payment.id
                return payment.data
            });
            return newPayment;
        },
    },
    methods:{
        changePaymentPlan(value){
            this.monthly = false
            console.log('Selected Value: ', value)
            if(value == 'monthly'){
                this.monthly = true;
            }else if(value == 'yearly'){

            }else if(value == 'unlimited'){

            }
        },
        changePaymentMethod(value){
            this.payOnline = false;
            this.payOffline = false;
            if(this.payment.plan != ""){
                if(value == 'online'){
                    this.payOnline = true;
                    this.payOffline = false;
                }else{
                    this.payOnline = false;
                    this.payOffline = true;
                }
            }
        },
        payWithPaystack(){
            var today = new Date();
            var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
            // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let vm = this;
            var handler = PaystackPop.setup({
            key: 'pk_test_d0ad603680ae9cc87aa887dadf4f4da97ed58cf6',
            email: this.$store.state.account.user.email,
            amount: this.total_payment+ '00',
            currency: "NGN",
            metadata: {
                custom_fields: [
                    {
                        display_name: this.$store.state.account.user.displayName,
                        variable_name: "mobile_number",
                        value: "+2348012345678"
                    }
                ]
            },
            callback: function(response){
                    console.log(response)
                // if(response.status == "success" && response.message == "Approved"){
                   console.log("Done: ")
                   console.log("Done: ", vm.$store.state.account.user.uid)
                    let payload ={
                        payment_date: date,
                        amount: vm.total_payment,
                        payment_ref: response.reference,
                        subscription_type: vm.payment.plan,
                    }
                    if(vm.payment.plan == 'monthly') payload.duration = vm.payment.duration
                    vm.$store.dispatch('payment/addPaymentHistory',{data: payload, uid:vm.$store.state.account.user.uid}).then(res =>{
                        if(res.status == 200){
                            vm.$bus.$emit('showNotification', {message: res.msg, type: 'success'})
                        }else{
                            vm.$bus.$emit('showNotification', {message: res.msg, type: 'error'})
                        }   
                    })
                // }
            },
            onClose: function(){
                // alert('window closed');
            }
            });
            handler.openIframe();
        }
    },
    mounted(){
        this.$store.dispatch('payment/fetchPaymentsByUser', {id: this.$store.state.account.user.uid})
    }

}
</script>

<style>

</style>