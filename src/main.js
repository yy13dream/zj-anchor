import Vue from 'vue'
import App from './App.vue'
import zjAnchor from '../lib/index.umd.min'
import '../lib/index.css'
// import zjAnchor from '../packages'

Vue.use(zjAnchor)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
