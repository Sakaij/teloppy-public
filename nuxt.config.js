export default {
    // Target: https://go.nuxtjs.dev/config-target

    target: 'static',
    ssr: true,


    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'GIF、MP4のメッセージ動画を簡単に作成。 | Teloppy テロッピー',
        htmlAttrs: {
            lang: 'en'
        },
        script: [{
            src: 'https://www.googletagmanager.com/gtag/js?id=' + process.env.GOOGLE_ANALYTICS_ID,
            async: true
        }, ],
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
                content: 'テロッピーは、メッセージを入力するだけでMP4形式、またはGIF形式のオリジナルのメッセージ動画を作ることができるサービスです。'
            },
            {
                name: 'format-detection',
                content: 'telephone=no'
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: 'Teloppy テロッピー | 自分だけのメッセージ動画を作ろう！'
            },
            {
                hid: 'og:site_name',
                property: 'og:site_name',
                content: 'Teloppy テロッピー'
            },
            {
                hid: 'og:type',
                property: 'og:type',
                content: 'website'
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content: 'テロッピーは、メッセージを入力するだけでMP4形式、またはGIF形式のオリジナルのメッセージ動画を作ることができるサービスです。'
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: 'https://teloppy.com/img/fix/ogpLogo.jpg'
            },
            {
                hid: 'og:locale',
                property: 'og:locale',
                content: 'ja_JP'
            },
            {
                hid: 'twitter:card',
                name: 'twitter:card',
                content: 'summary'
            },
        ],
        link: [{
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        }]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [{
            src: '~/assets/scss/style.scss',
            lang: 'scss'
        },
        {
            src: 'hooper/dist/hooper.css',
        }
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [{
            src: '~/plugins/amplifyInit',
            ssr: true
        }, {
            src: '~/plugins/ga.js',
            ssr: false
        }, {
            src: '~/plugins/vuePlugins',
            ssr: false
        },
        {
            src: '~plugins/storePersist',
            ssr: false
        }
    ],
    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        'nuxt-fontawesome',
        '@nuxtjs/axios',
    ],
    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build'
    ],
    publicRuntimeConfig: {
        googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
        apiUrl: process.env.NODE_ENV == "development" ? process.env.API_DEVELOPMENT_URL : process.env.NODE_ENV == "production" ? process.env.API_PRODUCTION_URL : process.env.API_STAGING_URL,
        encryptApiUrl: process.env.NODE_ENV == "development" ? process.env.API_DEVELOPMENT_URL + 'encrypt' : process.env.NODE_ENV == "production" ? process.env.API_PRODUCTION_URL + 'encrypt' : process.env.API_STAGING_URL + 'encrypt',
        decryptApiUrl: process.env.NODE_ENV == "development" ? process.env.API_DEVELOPMENT_URL + 'decrypt' : process.env.NODE_ENV == "production" ? process.env.API_PRODUCTION_URL + 'decrypt' : process.env.API_STAGING_URL + 'decrypt',
        s3ResourceUrl: process.env.S3_RESOURCE_URL
    },
    fontawesome: {
        imports: [{
                set: '@fortawesome/free-brands-svg-icons',
                icons: ['faGoogle', 'faTwitter', 'faFacebook', 'faInstagram', 'faLine']
            },
            {
                set: '@fortawesome/free-solid-svg-icons',
                icons: ['faCopy', 'faPlayCircle', 'faRedoAlt', 'faTrashAlt', 'faVideo', 'faGift']
            },
            {
                set: '@fortawesome/free-regular-svg-icons',
                icons: ['faThumbsUp', 'faThumbsDown', 'faEdit']
            }
        ]
    },
    env: {
        NODE_ENV: process.env.NODE_ENV
    },
    generate: {
        fallback: 'error.html',
    },
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extend(config, ctx) {
            config.node = {
                fs: 'empty'
            }
        }
    }
}