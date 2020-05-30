import colors from 'vuetify/es5/util/colors'
import {
  firebase,
  db
} from './plugins/firebase';

// const glob = require('glob')
// const path = require('path')

// var getDynamicRoutes = function(){
//   return [].concat(
//     glob
//       .sync('*')
//   )
// }
// var getDynamicRoutes = function() {
//   return [].concat(
//     glob
//       .sync('*.md', { cwd: 'posts/' })
//       .map((filepath) => `/software/${path.basename(filepath, '.md')}`),
//     glob
//       .sync('*.md', { cwd: 'blog/' })
//       .map((filepath) => `/blog/${path.basename(filepath, '.md')}`)
//   )
// }


// let dynamicRoutes = () => {
//   return axios.get('https://your-api-here/products').then(res => {
//     return res.data.map(product => `/product/${product.id}`)
//   })
// }

// let dynamicRoutes = () => {
//   return new Promise(resolve => {
//     resolve(data.map(el => `product/${el.id}`))
//   })
// }

// pages/property/:id
let dynamicPropertyRoute = () => {
  return db.collection('property-listing').get().then((snapshot) => {
    snapshot.forEach((res) => {
      return res.map((property) => {
        return '/property/' + property.id
      })
    })
  })
}
// pages/property/details/:id
let dynamicDetailsRoute = () => {
  return db.collection('property-listing').get().then((snapshot) => {
    snapshot.forEach((res) => {
      return res.map((property) => {
        return '/property/details/' + property.id
      })
    })
  })
}

export default {
  generate: {
    routes: [
      dynamicDetailsRoute,
      dynamicPropertyRoute
    ]
  },
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/eventBus.js',
    '~/plugins/lightGallery.client.js',
    '~/plugins/firebase.js',
    '~/plugins/firebaseAuth.js',
  ],

  /*
   ** Router Middleware
   */
  router: {
    middleware: ['router-auth']
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  server: {
    port: 3000, // default: 3000
    host: 'localhost' // default: localhost

  }
}
