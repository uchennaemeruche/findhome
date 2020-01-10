<template>
   <div class="footerNav">
       <v-bottom-navigation app shift :value="0" color="rgba(255, 0, 0, 0.5)" background-color="#3d6599"
        fixed v-show="$vuetify.breakpoint.smAndDown " >
        <template v-if="$route.matched[0].path != '/dashboard'">
            <v-btn to="/property/4SbY4LaEW829Lr0umD8X" >
                <span>Buy</span>
                <v-icon>mdi-cart-outline</v-icon>
            </v-btn>
            <v-btn to="/property/aBtCR6UtAVEjDTStlgGM">
                <span>Rent</span>
                <v-icon>mdi-chair-school</v-icon>
            </v-btn>
            <v-btn to="/account/login">
                <span>Sell/List Property</span>
                <v-icon>mdi-camera-switch</v-icon>
            </v-btn>
            <v-btn to="/account/login">
                <span>Login</span>
                <v-icon>mdi-login</v-icon>
            </v-btn>
            <v-btn to="/account/signup">
                <span>Signup</span>
                <v-icon>mdi-account-plus</v-icon>
            </v-btn>
        </template>
        <template v-else>
            <v-btn to="/property/4SbY4LaEW829Lr0umD8X" >
                <span>Buy</span>
                <v-icon>mdi-cart-outline</v-icon>
            </v-btn>
            <v-btn to="/property/aBtCR6UtAVEjDTStlgGM">
                <span>Rent</span>
                <v-icon>mdi-chair-school</v-icon>
            </v-btn>
            <v-btn to="#">
                <span>Sell</span>
                <v-icon>mdi-settings</v-icon>
            </v-btn>
            <v-btn to="#">
                <span>Profile</span>
                <v-icon>mdi-settings</v-icon>
            </v-btn>
        </template>
    </v-bottom-navigation>
   <div v-show="($route.matched[0].path != '/dashboard') ">
        <footer class="footer">
            <div class="container">
                <v-row class="">
                    <v-col cols="12" md="3" lg="3" sm="12" xs="6" class="">
                        <div class="footer_column footer_contact">
                            <div class="logo_container">
                                <div class="logo">FindHome</div>
                            </div>
                            <div class="footer_title">Got Question? Call Us 24/7</div>
                            <div class="footer_phone">+234 000 000 0000</div>
                            <div class="footer_contact_text">
                                <p>17 Princess Road, Some Address</p>
                                <p>Grester Another Address</p>
                            </div>
                            <div class="footer_social">
                               <ul>
                                   <li v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
                                        <v-icon size="24px">{{ icon }}</v-icon>
                                    </li>
                               </ul>
                            </div>
                        </div>
                    </v-col>

                    <v-col cols="12" md="2" lg="2" sm="3" xs="6" offset-lg="2" offset-md="2" class="">
                        <div class="footer_column">
                            <div class="footer_title">Find it Fast</div>
                            <ul class="footer_list">
                                <li>Flats and Apartments</li>
                                <li>Semi Detached Bungalow</li>
                                <li>Semi Detached Duplex</li>
                                <li>Detached Duplex </li>
                                <li>Mini Flats</li>
                            </ul>
                            <div class="footer_subtitle">Lands</div>
                            <ul class="footer_list">
                                <li>Terraced Bungalow</li>
                            </ul>
                        </div>
                    </v-col>

                    <v-col cols="12" lg="2" md="2" sm="3" xs="6" class="">
                        <div class="footer_column">
                            <ul class="footer_list footer_list_2">
                                <li>Shops</li>
                                <li>Office Spaces</li>
                                <li>Warehouse</li>
                                <li>Commercial Properties</li>
                                <li>Shop In A Mall</li>
                                <li>Co-working space</li>
                                <li>Terraced Duplex</li>
                            </ul>
                        </div>
                    </v-col>

                    <v-col cols="12" md="2" lg="2" sm="3" xs="6"  class="">
                        <div class="footer_column">
                            <div class="footer_title">Customer Care</div>
                            <ul class="footer_list">
                                <li>My FinedHome</li>
                                <li>Order TFinedHome</li>
                                <li>WiFinedHome</li>
                                <li>Customer SFinedHome</li>
                                <li>Returns / EFinedHome</li>
                                <li>FinedHome</li>
                                <li>Product FinedHome</li>
                            </ul>
                        </div>
                    </v-col>

                </v-row>
            </div>
        </footer>

        <v-footer :fixed="fixed" padless>
            <v-card width="100%" flat class="text-center" style="background-color:#fff !important; color:red !important;">
                <v-divider></v-divider>

                <v-card-text class="white--text">
                &copy; {{ new Date().getFullYear() }} — <strong>FindHome</strong>
                </v-card-text>
            </v-card>
        </v-footer>	
    </div>
   </div>
</template>

<script>
export default {
    name: 'FooterNav',
    data(){
        return{
            fixed: false,
            icons: [
                'mdi-facebook',
                'mdi-twitter',
                'mdi-linkedin',
                'mdi-instagram',
            ],
        }
    }
}
</script>

<style>
    .footerNav .v-btn__content{
        color:#fff !important;
    }
    .footerNav .v-card__text{
        color:rgba(0, 0, 0, 0.54) !important;
    }
    .footerNav .v-btn{
        color:rgba(0, 0, 0, 0.54) !important;
    }
    .footerNav{
        margin-top:0px;
    }

    .footerNav .footer{padding-top: 52px;padding-bottom: 40px;}
    .footerNav .footer .logo_container{ height: auto; margin-bottom: 18px; margin-top: -10px;}
    .footerNav .footer .logo{ top: auto; transform: none;}
    .footerNav .footer .logo a{ color: #000000;}
    .footerNav .footer_title{font-size: 14px; font-weight: 500; color: #000000;}
    .footerNav .footer_phone{font-size: 18px;font-weight: 500;color: #0e8ce4;margin-top: 13px;}
    .footerNav .footer_contact_text{margin-top: 10px;}
    .footerNav .footer_contact_text p{margin-bottom: 0px;}
    .footerNav .footer_social{margin-top: 27px;}
    .footerNav .footer_social ul li{
        display: inline-block;
        width: 30px;
        height: 30px;
        background: #fafafa;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
        margin-right: 16px;
        text-align: center;
    }
    .footerNav .footer_social ul li i{
        color: #000000;
        line-height: 30px;
        -webkit-transition: all 200ms ease;
        -moz-transition: all 200ms ease;
        -ms-transition: all 200ms ease;
        -o-transition: all 200ms ease;
        transition: all 200ms ease;
    }
    .footerNav .footer_social ul li:hover i{color: #0e8ce4;}
    .footerNav .footer_subtitle{font-size: 12px;color: #000000;}
    .footerNav .footer_column ul:first-of-type{margin-top: 21px;}
    .footerNav .footer_column ul{margin-top: 7px; list-style-type: none;}
    .footerNav .footer_list li{margin-bottom: 6px;}
    .footerNav .footer_list li
    {
        font-size: 12px;
        font-weight: 500;
        color: rgba(0,0,0,0.4);
        -webkit-transition: all 200ms ease;
        -moz-transition: all 200ms ease;
        -ms-transition: all 200ms ease;
        -o-transition: all 200ms ease;
        transition: all 200ms ease;
    }
    .footerNav .footer_list li a:hover{color: #0e8ce4;}
    .footerNav .footer_list_2{margin-top: 42px !important; }

    .footerNav .copyright{width: 100%;background: #fafafa;}
    .footerNav .copyright_container{width: 100%;height: 56px;}
    .footerNav .copyright_content{font-size: 12px;color: rgba(0,0,0,0.6);}
    .footerNav .copyright_content span{font-weight: 500;}
    .footerNav .logos_list li{display: inline-block;margin-right: 16px;}
    .footerNav .logos_list li:last-child{margin-right: 0px;}
</style>