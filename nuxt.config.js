export default {
  target: 'static',
  modules: ['@nuxtjs/composition-api/module'],
  buildModules: [
    '@nuxtjs/composition-api/module',
    '@nuxtjs/tailwindcss'
  ],
  components: true,
  head: {
    title: 'A2OJ DSA Tracker',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A2OJ DSA Tracker' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '@/assets/css/main.css'
  ],
  tailwindcss: {
    jit: true,
    exposeConfig: false,
    config: {}
  }
}
