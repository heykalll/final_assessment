/* --------------------------------------- */
/* STORE CONFIGURATION
/* --------------------------------------- */
const useMagentoCommerce = false; // setup uses magento commerce or community
const storeCode = ''; // fill it with any store code when the magento is setup with multiple stores. leave it empty to use default store.
const assetsVersion = '1.0.5';

const HOST = {
    local: 'http://localhost:3000',
    dev: 'https://swiftpwa.testingnow.me',
    stage: 'https://pwa.getswift.asia.dmmy.me',
    prod: 'https://pwa.getswift.asia',
};

/* Magento GraphQL Endpoint */
const graphqlEndpoint = {
    local: 'https://swiftpwa-be.testingnow.me/graphql',
    dev: 'https://swiftpwa-be.testingnow.me/graphql',
    stage: 'https://swiftpwa-be.testingnow.me/graphql',
    prod: 'https://b2cdemo.getswift.asia/graphql',
};

/* --------------------------------------- */
/* FEATURES CONFIGURATION
/* --------------------------------------- */

const installMessage = 'Get our free app.';
const appName = 'Swift APP';
const originName = 'pwa';

/* Social Sharing */
const shareIcon = {
    facebook: true,
    twitter: true,
    line: true,
    email: true,
    telegram: true,
    pinterest: false,
    linkedin: false,
};

/* Password Validator */
const passwordStrength = {
    minValue: 8,
    maxValue: 20,
    numberOfRequiredClass: 3, // Lowercase + Uppercse + Dgits + spesial caracter = 4
};

/* Translation */
const translation = {
    defaultLanguage: 'en', // just change to your default language
    languages: ['en', 'id'], // array code language what you want
    // language label code
    languagesLabel: {
        en: 'English',
        id: 'Indonesia',
    },
};

/* Google Tag Manager
 * before enable this configuration, firstly you need to import the gtm tags json.
 * gtm tags json need to be exported from Magento admin in Welpixel GTM configuration.
 * adjust the tag name if you want before import into GTM dashboard setting.
 * as reference you can find sample gtm tags in folder "sample/gtm" folder
 * NOTE: this GTM functionality includes connecting to GA via GTM tag.
 */
const GTM = {
    enable: false,
    gtmId: {
        local: '', // sample: GTM-N76V8KQ
        dev: '', // sample: GTM-N76V8KQ
        stage: '', // sample: GTM-N76V8KQ
        prod: '', // sample: GTM-N76V8KQ
    },
};

/* Recapthca Configuration */
const recaptcha = {
    enable: false,
    siteKey: {
        local: '', // sample: 6LcZmLEZAAAAADkdlp8S8tExis2EVhNiuMv6ayo7
        dev: '', // sample: 6LcZmLEZAAAAADkdlp8S8tExis2EVhNiuMv6ayo7
        stage: '', // sample: 6LcZmLEZAAAAADkdlp8S8tExis2EVhNiuMv6ayo7
        prod: '', // sample: 6LcZmLEZAAAAADkdlp8S8tExis2EVhNiuMv6ayo7
    },
    serverKey: {
        local: '', // sample: 6LcZmLEZAAAAANHhkqwoRna2vqIVWHNKwOvxm26n
        dev: '', // sample: 6LcZmLEZAAAAANHhkqwoRna2vqIVWHNKwOvxm26n
        stage: '', // sample: 6LcZmLEZAAAAANHhkqwoRna2vqIVWHNKwOvxm26n
        prod: '', // sample: 6LcZmLEZAAAAANHhkqwoRna2vqIVWHNKwOvxm26n
    },
};

// error management monitoring
const sentry = {
    enabled: false,
    enableMode: 'production',
    dsn: {
        local: 'https://c60fbed461fd49da9455730ba70da8a6@o484453.ingest.sentry.io/5537614',
        dev: 'https://c60fbed461fd49da9455730ba70da8a6@o484453.ingest.sentry.io/5537614',
        stage: 'https://c60fbed461fd49da9455730ba70da8a6@o484453.ingest.sentry.io/5537614',
        prod: 'https://c60fbed461fd49da9455730ba70da8a6@o484453.ingest.sentry.io/5537614',
    },
};

const rollbar = {
    enabled: false,
    config: {
        accessToken: '76876f52664341b4a1981c4618723bda',
        captureUncaught: true,
        captureUnhandledRejections: true,
    },
};

/* Contact Us */
// identifiers for cmsBlocks in contact page
const cmsContactIdentifiers = 'weltpixel_contact_page';

/* Dashboard */
// identifiers for cmsBlocks in contact page
const cmsSocialMediaLinkIdentifiers = 'pwa_socmed_links';

/* Social media link */
// social media link in dashboard
const enableSocialMediaLink = true;

/* Loader */
const loaderImage = '/assets/img/loader.svg';

/* --------------------------------------- */
/* LOCAD DATA CACHE & COKIES
/* --------------------------------------- */

const expiredCookies = 6;
const storeConfigNameCookie = 'storeConfig';
const nameCartId = 'nci';
const custDataNameCookie = 'cdt';
const nameCheckoutCookie = 'ccdt';
const nameGlobalCookie = 'spwa';
const nameToken = 'sk';
const expiredToken = new Date(Date.now() + 1000 * 60 * 60);
const expiredDefault = 365;
const localResolverKey = 'resolver';

const features = {
    useCustomStyle: false,
    ssrCache: false,
    crm: {
        enabled: false,
        graphqlEndpoint: {
            local: 'http://swiftcrm.testingnow.me/graphql',
            dev: 'http://swiftcrm.testingnow.me/graphql',
            stage: 'http://swiftcrm.testingnow.me/graphql',
            prod: 'http://swiftcrm.testingnow.me/graphql',
        },
    },
    facebookMetaId: {
        enabled: false,
        app_id: '', // if enabled add fb app id here. e.g. 3080154482073095
    },
    // masuk module -> pindah jika module sudah siap
    productAvailableToCart: {
        SimpleProduct: true,
        ConfigurableProduct: true,
        VirtualProduct: true,
        GroupedProduct: true,
        BundleProduct: true,
        DownloadableProduct: false,
    },
    imageSize: {
        product: {
            width: 240,
            height: 300,
        },
        homeSlider: {
            mobile: {
                width: 960,
                height: 1120,
            },
            desktop: {
                width: 1800,
                height: 750,
            },
        },
        category: {
            width: 960,
            height: 577,
        },
    },
    vesMenu: {
        enabled: true,
        alias: 'top-menu',
    },
    customInstallApp: {
        enabled: true,
    },
    firebase: {
        config: {
            apiKey: 'AIzaSyCD0ZuTMcNi3PSsJH9LD21v7_XA1sVLjdI',
            authDomain: 'swiftpwa-firebase.firebaseapp.com',
            databaseURL: 'https://swiftpwa-firebase.firebaseio.com',
            projectId: 'swiftpwa-firebase',
            storageBucket: 'swiftpwa-firebase.appspot.com',
            messagingSenderId: '731430387766',
            appId: '1:731430387766:web:af85ac9f9559c873309897',
            measurementId: 'G-DP22E2CL8G',
        },
        pushNotification: {
            enabled: true,
            config: {
                // key from cloud messaging sertificat web push
                pairKey: 'BBIzfGdH56tlTaV1jxqaWA_n47trFqy51WjcCn9Fa1-7xzmY4iBwBlGQjO1e_bRBEx9kq4o8q4zyl14JuXSIC-k',
            },
        },
    },
    thumbor: {
        url: 'https://thumbor.sirclocdn.xyz/unsafe/widthxheight/filters:format(webp)/',
    },
};

const modules = {
    authentication: {
        enabled: true,
        path: '/authentication',
    },
    about: {
        enabled: true,
        path: '/about-us',
    },
    blog: {
        enabled: true,
        path: '/blog',
        link: {
            detail: {
                href: '/blog/[id]',
                as: '/blog/',
            },
            category: {
                href: '/blog/category/[id]',
                as: '/blog/category/',
            },
            default: {
                href: '/blog',
            },
        },
        featuredImage: true,
    },
    brands: {
        enabled: true,
        path: '/brands',
    },
    catalog: {
        enabled: true,
        productListing: {
            pageSize: 10,
            drawerFilterOnDesktop: {
                enabled: false, // used if need to desktop view on large screen
            },
            label: {
                enabled: true,
                new: {
                    enabled: true,
                },
                sale: {
                    enabled: true,
                },
            },
            configurableOptions: {
                enabled: false,
            },
            rating: {
                enabled: true,
            },
            addToCart: {
                enabled: false,
            },
        },
        pdp: {
            popupDetailImage: {
                enabled: true,
            },
        },
    },
    confirmpayment: {
        enabled: true,
        path: '/confirmpayment',
    },
    checkout: {
        enabled: true,
        checkoutOnly: false,
        path: '/checkout',
        ipayUrl: 'ipay88/ipayredirect/?orderId=',
        snapUrl: {
            dev: 'https://app.sandbox.midtrans.com/snap/snap.js',
            prod: 'https://app.midtrans.com/snap/snap.js',
        },
        pickupStore: {
            enabled: true,
        },
        extraFee: {
            enabled: true,
        },
        cashback: {
            enabled: true,
        },
        orderComment: {
            enabled: false,
        },
    },
    cart: {
        enabled: true,
        path: '/checkout/cart',
    },
    customer: {
        enabled: true,
        path: '/customer',
        plugin: {
            address: {
                splitCity: true,
            },
            newsletter: {
                enabled: true,
            },
        },
    },
    contact: {
        enabled: true,
        path: '/contact',
        recaptcha: {
            enabled: true,
        },
    },
    forgotpassword: {
        enabled: true,
        path: '/customer/account/forgotpassword',
    },
    rewardpoint: {
        enabled: true,
        path: '/aw_rewardpoints/info',
    },
    rma: {
        enabled: true,
        path: '/rma/customer',
    },
    storecredit: {
        enabled: true,
        path: '/customer/account/storecredit',
        useCommerceModule: false,
    },
    storeLocator: {
        enabled: true,
        path: '/storelocator',
    },
    giftcard: {
        enabled: true,
        path: '/awgiftcard/card',
        useCommerceModule: false,
    },
    login: {
        enabled: true,
        path: '/customer/account/login',
        recaptcha: {
            enabled: true,
        },
    },
    notification: {
        enabled: true,
        path: 'inboxnotification/notification',
    },
    register: {
        enabled: true,
        path: '/customer/account/create',
        recaptcha: {
            enabled: true,
        },
    },
    trackingorder: {
        enabled: true,
        path: '/sales/order/track',
        fieldDetail: {
            shipperid: ['name', 'description', 'updateDate'],
            gosend: [
                'bookingType',
                'buyerAddressName',
                'buyerAddressDetail',
                'driverId',
                'driverName',
                'insuranceDetails',
                'liveTrackingUrl',
                'receiverName',
                'sellerAddressDetail',
                'sellerAddressName',
                'status',
                'cancelDescription',
                'orderArrivalTime',
                'orderClosedTime',
                'orderCreatedTime',
            ],
        },
    },
    thanks: {
        enabled: true,
        path: '/checkout/onepage/success',
    },
    home: {
        enabled: true,
        featuresProduct: {
            enable: true,
            url_key: 'homepage-featured-products',
        },
        categoryList: {
            enable: true,
            url_key: 'homepage-featured-categories',
            imageSize: {
                mobile: {
                    width: 960,
                    height: 577,
                },
                desktop: {
                    width: 404,
                    height: 465,
                },
            },
        },
        bannerSlider: {
            enable: true,
            title: 'Client App Homepage Slider',
        },
    },
    promo: {
        enabled: true,
    },
    order: {
        enabled: true,
        path: '/sales/order',
    },
    wishlist: {
        enabled: true,
        path: '/wishlist',
    },
    maintenance: {
        enabled: true,
        path: '/maintenance',
    },
    setting: {
        enabled: true,
        path: '/setting',
    },
    error: {
        enabled: true,
    },
    popular: {
        enabled: true,
        path: 'popular',
    },
};

const nossrCache = [
    '/aw_rewardpoints/info',
    '/sales/order/history',
    '/customer/account/profile',
    '/customer/account/address',
    '/awgiftcard/card',
    '/customer/account/storecredit',
    '/inboxnotification/notification',
    '/customer/newsletter',
    '/rma/customer',
    '/confirmpayment',
    '/checkout',
    '/checkout/cart',
    '/graphql',
    '/authentication',
    '/checkout/onepage/success',
];

const debuging = {
    originalError: false,
};

const general = {
    defaultCurrencyCode: 'IDR',
};

module.exports = {
    assetsVersion,
    general,
    sentry,
    storeCode,
    debuging,
    GTM,
    HOST,
    graphqlEndpoint,
    shareIcon,
    passwordStrength,
    expiredCookies,
    storeConfigNameCookie,
    nameCartId,
    nameToken,
    expiredToken,
    expiredDefault,
    loaderImage,
    cmsContactIdentifiers,
    cmsSocialMediaLinkIdentifiers,
    custDataNameCookie,
    nameCheckoutCookie,
    nameGlobalCookie,
    enableSocialMediaLink,
    features,
    nossrCache,
    recaptcha,
    modules,
    installMessage,
    appName,
    localResolverKey,
    originName,
    useMagentoCommerce,
    rollbar,
    translation,
};
