import vueCurrentcyF from 'vue-currency-filter'
import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
Vue.config.productionTip = false;
Vue.use(vueCurrentcyF,{
       name:'currency',
       symbol:'$',
       thousandsSeparator:',',
       fractionSeparator:'.',
       fractionCount:2,
       symbolPosition:'front',
       symbolSpacing:true
}
);
 export var hepWord=[1]
 export function created2(a){

  setTimeout(_=>{
  if(a=="login"){
    hepWord[0]=1
  }else{
    
    hepWord[0]=2
  }

  },1000) 
 }
new Vue({
  router,
  store,
  vuetify,
  vueCurrentcyF,
  render: h => h(App)
}).$mount('#app')
