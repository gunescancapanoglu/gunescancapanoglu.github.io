/* eslint-disable no-unused-vars */
// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'firebase',
      'icons'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      //'roboto-font', // optional, you are not bound to it
      //'material-icons', // optional, you are not bound to it

      //'mdi-v4'
    ],

    framework: {
      // iconSet: 'ionicons-v4',
      // lang: 'de', // Quasar language

      // all: true, // --- includes everything; for dev only!

      components: [
        'QLayout',
        'QPageContainer',
        'QPage',
        'QLinearProgress',
        'QPageSticky',
        'QChip',
        'QFab',
        'QFabAction',
        'QBtn',
        'QTooltip',
        'QImg',
        'QCard',
        'QCardSection',
        'QInfiniteScroll',
        'QSpinnerDots',
        'QCarousel',
        'QCarouselControl',
        'QCarouselSlide',
        'QSpinner'
      ],

      directives: [
        //'Ripple'
        'TouchSwipe'
      ],

      // Quasar plugins
      plugins: [
        'Notify',
        'Loading',
        'Dialog'
      ]
    },

    build: {
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {
      },
      transpile: false
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: false // opens browser window automatically
    },

    // animations: 'importStrategy', // --- includes all animations
    animations: [
      'fadeIn',
      'fadeOut',
      'fadeInLeft',
      'fadeInRight',
      'fadeOutLeft',
      'fadeOutRight',
      'fadeInDown',
      'fadeInUp',
      'fadeOutDown',
      'fadeOutUp'
    ],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'gunescan.capanoglu.me',
        // short_name: 'gunescan.capanoglu.me',
        // description: 'gunescan.capanoglu.me personal website',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3'
      }
    },

    cordova: {
      // id: '',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack(cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'gunescan.capanoglu.me'
      }
    }
  }
}