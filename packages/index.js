import Anchor from './anchor'

const install = function (Vue) {
  Vue.component('zj-anchor', Anchor)
}

if (typeof window !== 'undefined' && window.Vue){
  install(window.Vue)
}

// 挂载到Vue原型上
export default install