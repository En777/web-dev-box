import Vue from 'vue'
import App from './App'
// import { shell } from 'electron'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
