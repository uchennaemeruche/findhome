<template>
  <div class="settings">
      <v-container>
          <v-card>
              <v-row>
          <v-expansion-panels>

          <!-- Property Listings -->
           <v-expansion-panel>
            <v-expansion-panel-header v-slot="{ open }" style="min-height:100px;">
              <v-row no-gutters>
                <v-col cols="4"> Property Listings </v-col>
                <v-col cols="8" class="text--secondary">
                  <v-fade-transition leave-absolute>
                    <span v-if="open" key="0" >Property Listings</span>
                    <span v-else key="1"></span>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutters>
                <v-card-text class="text--primary">
                  <v-data-table
                    :headers="propertyHeaders"
                    :items="propertyListings"
                    item-key="id"
                    group-by="category"
                    class="elevation-1"
                    show-group-by
                    :search="propertySearch"
                    loading loading-text="Loading... Please wait" 
                  />
                </v-card-text>
                <v-spacer></v-spacer>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- End of Property Listings -->

          <!-- Payment Module -->
           <v-expansion-panel>
            <v-expansion-panel-header v-slot="{ open }" style="min-height:100px;">
              <v-row no-gutters>
                <v-col cols="4"> Payments </v-col>
                <v-col cols="8" class="text--secondary">
                  <v-fade-transition leave-absolute>
                    <span v-if="open" key="0" >Payments</span>
                    <span v-else key="1"></span>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutters>
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
                <v-spacer></v-spacer>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- End of Payment -->

            <v-expansion-panel>
              <v-expansion-panel-header style="min-height:100px;">
                <template v-slot:default="{ open }">
                  <v-row no-gutters>
                    <v-col cols="4">Categories </v-col>
                    <v-col cols="8" class="text--secondary">
                      <v-fade-transition leave-absolute>
                        <span v-if="open" key="0">Add, Edit or Delete Property Categories </span>
                        <span v-else key="1">  </span>
                      </v-fade-transition>
                    </v-col>
                  </v-row>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <data-table collection="category" :data="categories" />
              </v-expansion-panel-content>
          </v-expansion-panel>

           <v-expansion-panel>
            <v-expansion-panel-header v-slot="{ open }" style="min-height:100px;">
              <v-row no-gutters>
                <v-col cols="4">Property types </v-col>
                <v-col cols="8" class="text--secondary">
                  <v-fade-transition leave-absolute>
                    <span v-if="open" key="0" >Add, Edit or Delete Property Types</span>
                    <span v-else key="1"></span>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutters>
                <data-table collection="types" :data="types" />
                <v-spacer></v-spacer>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

           <v-expansion-panel>
            <v-expansion-panel-header v-slot="{ open }" style="min-height:100px;">
              <v-row no-gutters>
                <v-col cols="4"> Locations </v-col>
                <v-col cols="8" class="text--secondary">
                  <v-fade-transition leave-absolute>
                    <span v-if="open" key="0" >Add, Edit or Delete Property Locations</span>
                    <span v-else key="1"></span>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutters>
                <data-table collection="locations" :data="locations" />
                <v-spacer></v-spacer>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header v-slot="{ open }" style="min-height:100px;">
              <v-row no-gutters>
                <v-col cols="4"> Account Mgt </v-col>
                <v-col cols="8" class="text--secondary">
                  <v-fade-transition leave-absolute>
                    <span v-if="open" key="0" >User Administration</span>
                    <span v-else key="1"></span>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              
             <v-form>
               <v-text-field outlined label="Email Address" v-model="adminEmail" 
                :append-outer-icon="adminEmail ? 'mdi-send' : 'mdi-plus'" 
                prepend-inner-icon="mdi-email" type="email"
                clearable clear-icon="mdi-close" 
                @click:append-outer="setAdminRole"></v-text-field>
             </v-form>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        </v-row>
        </v-card>
        <Notifications /> 
      </v-container>
  </div>
</template>

<script>
import AdminCrudTable from '@/components/AdminCrudTable'
import Notifications from '@/components/Notifications'
export default {
    components:{
        'data-table': AdminCrudTable,
        Notifications,
    },
    data(){
        return{
            adminEmail:'',
            search:'',
            headers: [
                {text: 'Customer Name', align: 'left', value: 'payerName'},
                {text: 'Customer Phone', align: 'left', value: 'payerPhone'},
                {text: 'Payment Date', align: 'left', value: 'payment_date'},
                { text: 'Amount', value: 'amount' },
                { text: 'Subscription Type', value: 'subscription_type' },
                { text: 'Payment Ref', value: 'payment_ref' },
                
            ],
            propertySearch:'',
            propertyHeaders: [
              {
                text: 'Property Name',
                align: 'left',
                value: 'title',
              },
              { text: 'Type', value: 'typeName' },
              { text: 'Category', value: 'categoryName' },
              { text: 'Location', value: 'locationName' },
              {text: 'Action', value: 'action'}
            ],
        }
    },
    computed:{
        categories(){
        return this.$store.state.property.categories;
        },
        types(){
        return this.$store.state.property.types;
        },
        locations(){
        return this.$store.state.property.locations;
        },
        payments(){
            const newPayment = this.$store.state.payment.allPayments.map(payment =>{
                payment.data.id = payment.id
                payment.data.payerName = payment.payer.displayName
                payment.data.payerPhone = payment.payer.phone
                return payment.data
            });
            return newPayment;
        },
        propertyListings(){
          const newListing = this.$store.state.property.propertyListings.map(listing =>{
            listing.data.id = listing.id
            return listing.data
          });
          return newListing;
        }
    },
    methods:{
        setAdminRole(){
            this.$store.dispatch('account/setAdminRole', this.adminEmail).then(res =>{
                if(res.data.errorInfo){
                this.$bus.$emit('showNotification', {message: res.data.errorInfo.message, type: 'error'})
                }else{
                this.$bus.$emit('showNotification', {message: res.data.message, type: 'success'})
                }
            })
        }
    },
    created(){
      // if(!this.$store.state.account.user.admin){
      //   this.$router.back()
      // }
      this.$store.dispatch('payment/fetchPayments')
      this.$store.dispatch('property/loadPropertyListings')
    },
    mounted(){
      // if(!this.$store.state.account.user.admin){
      //   this.$router.back()
      // }
        this.$store.dispatch('property/loadItems')
        this.$store.dispatch('payment/fetchPayments')
        this.$store.dispatch('property/loadPropertyListings')
    }
}
</script>

<style>

</style>