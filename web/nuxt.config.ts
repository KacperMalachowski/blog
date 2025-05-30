// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  css: [
    '@/assets/css/main.css'
  ],

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxtjs/strapi',
    '@nuxtjs/i18n'
  ],
  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_and_default',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'pl', name: 'Polish', file: 'pl.json' }
    ]
  },
  runtimeConfig: {
    strapi: {
      url: process.env.STRAPI_URL || 'http://strapi:1337',
    },
    public: {
      strapi: {
        url: process.env.STRAPI_PUBLIC_URL || 'http://localhost:1337',
      }
    },
  }
})