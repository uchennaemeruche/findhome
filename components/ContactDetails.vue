<template>
  <div class="contact-details" style="width:100%;">
      <v-expansion-panels >
        <v-expansion-panel>
            <v-expansion-panel-header v-slot="{ open }" >
                <v-row no-gutters>
                <v-col cols="4">Contact: </v-col>
                <!-- <a :href="'sms:+234' + item.phone.slice(1) + '?&body=Property%20Listing%20Enquiry'">Click here to text us!</a> -->
                <v-col cols="8" class="text--secondary">
                    <v-fade-transition leave-absolute>
                    <span v-if="open">Login to view contact Details</span>
                    <v-row v-else no-gutters style="width: 100%">
                        <v-col cols="6">Phone Number</v-col>
                        <v-col cols="6">Details</v-col>
                    </v-row>
                    </v-fade-transition>
                </v-col>
                </v-row>
            </v-expansion-panel-header>
            <!-- v-if="JSON.stringify($store.state.account.user) !== '{}'" -->
            <v-expansion-panel-content v-if="JSON.stringify($store.state.account.user) !== '{}'">
                <v-row  no-gutters>
                    <!-- Item:  {{item }} -->
                    <v-col v-if="item.phone">
                        <span>+234{{item.phone.slice(1)}}</span>
                        <v-btn color="success darken-1" fab :href="'tel:+234' + item.phone.slice(1) "><v-icon>mdi-phone-in-talk</v-icon></v-btn> 
                        <v-btn fab color="#00E676"  :href="'https://wa.me/' + '234'+item.phone.slice(1) + '?text=I\'m%20inquiring%20about%20the%20property%20listing'"><v-icon color="white">mdi-whatsapp</v-icon></v-btn>
                        <v-btn fab color="primary"  :href="'mailto:' + item.email + '?subject=Property%20Listing%20Enquiry'"><v-icon color="white">mdi-email-outline</v-icon></v-btn>
                        </v-col>
                </v-row>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
    name: 'contact-details',
    props:['item'],
    data(){
        return{
            
        }
    }

}
</script>

<style>

</style>