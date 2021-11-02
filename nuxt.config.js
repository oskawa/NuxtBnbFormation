export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Page : %s',
    htmlAttrs: {
      lang: 'fr'
    },
    bodyAttrs: {
      // Ajout d'une classe au body
      class: ["style-principal"]
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: {
    prefetchLinks: false,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/sass/app.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/maps.client',
    '~/plugins/dataAPI',
    '~/plugins/auth.client',
    '~/plugins/vCalendar.client',
    '~/plugins/stripe.client'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '~/modules/auth', '~/modules/algolia', '~/modules/cloudinary', '@nuxtjs/cloudinary', '~/modules/stripe'
  ],
  cloudinary: {
    cloudName: 'drjvgmb9r',
  },
  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/drjvgmb9r/image/upload'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    }
  },
  publicRuntimeConfig: {
    rootUrl: process.env.NODE_ENV === 'production' ? 'https://nuxt-bnb-formation.vercel.app' : 'http://localhost:3000',

    auth: {
      cookieName: 'idToken',
      clientId: '1096738360283-p3nifqavajmh7kgp00qe4v2ag3qnqndc.apps.googleusercontent.com'
    },
    algolia: {
      appId: 'WXLDNGI2AX',
      key: 'd082a6cde8e3762b3f98a7b0e529f17b'
    },
    cloudinary: {
      apiKey: '832418369476269',
    },
    stripe: {
      key: "pk_test_51JeL1wCB8vL7Jyfj7FAzpW4KwSnMY5nEJsO94MNzNPGv7dH8PL1gU5CI44UkrB60NkD2MJM9pC54DcZHZIsarM6W00XeTb8f2o"
    }
  },
  privateRuntimeConfig: {
    algolia: {
      appId: 'WXLDNGI2AX',
      key: process.env.ALGOLIA_SECRET_KEY,
    },
    cloudinary: {
      apiSecret: process.env.CLOUDINARY_SECRET_KEY,
    },
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY
    }

  }
}
