// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import { routerHistory, writeHistory } from 'vue-router-back-button'
import config from './config.js'
import Routes from './routes.js'
import Header from './components/Header'
import {store} from './store/index'
//window.$ = window.jQuery = require('jquery')

require('./assets/scss/default.scss')

var token = JSON.parse(window.localStorage.getItem('authUser'));

// Axios
window.axios = require('axios');
axios.defaults.baseURL = config.apiDomain;
if(token){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;
}

Vue.use(VueRouter)
Vue.use(routerHistory)
Vue.use(VueResource)
Vue.component('app-header', Header)

global.router = new VueRouter({
    //mode: 'history',
    routes: Routes
})

// if('serviceWorker' in navigator) {
// navigator.serviceWorker.register('../dist/service-worker.js');
// }

router.afterEach(writeHistory)

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth){
        if (token && token.access_token){
            next()
        }
        else{
            next({name:'landing'})
        }
    }
    next()
})

new Vue({
    store: store,
    el: '#app',
    router,
    beforeCreate() {
        if(token){
            this.$store.dispatch('loginUser')
        }
        this.$store.commit('resetIcons')
        this.$store.commit('headerCloseAll')
        this.$store.commit('setMobile')
    }
})