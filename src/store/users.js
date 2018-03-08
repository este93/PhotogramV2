// initial state

import config from '../config.js'

const state = { 
    loggedUser: [],
    getUserInfo: [],
    usernameExists: false,
    confirmRegistration: false,
    errors: '' ,
}

// getters
const getters = {
    getLoggedUser: function(state){
      return state.loggedUser; 
    },
    getUserInfo: function(state){
      return state.getUserInfo; 
    },
    getConfirmRegistration: function(state){
      return state.confirmRegistration; 
    },
    getUsernameExists: function(state){
      return state.usernameExists; 
    },
    getErrors: function(state){
      return state.errors; 
    }
}

// mutations
const mutations = {
    loginUser: (state, {data}) => {   
        state.loggedUser = data
    },
    findUser: (state, {data}) => {   
        state.getUserInfo = data
    },
    follow: () => {
      state.getUserInfo.auth_follow = true
    },
    unFollow: () => {
      state.getUserInfo.auth_follow = false
    },    
    checkUsername: (state, {data}) => {
      data == true ? state.usernameExists = true : state.usernameExists = false;
    },    
    register: (state) => {
      state.confirmRegistration = true       
      setTimeout(function(){
         state.confirmRegistration = false
      }, 2000);
    },   
    catchError: (state, {data}) => {
      state.errors = data
    },  
    login: (state, {data}) => {
      const authUser = {}
      authUser.access_token = data.token
      window.localStorage.setItem('authUser', JSON.stringify(authUser))
      window.localStorage.setItem('firstInit', true)
      router.push({name: 'dashboard', params: {username: data.data.username}}) 
    },
    logout: (state) => {
      var authUser = window.localStorage.getItem('authUser')
      window.localStorage.removeItem('authUser', JSON.stringify(authUser))
      router.push({name: 'landing'})
    },
    resetUser: (state) => {
      state.getUserInfo = ''
    }
}

// actions
const actions = {
    loginUser: function(context){
      axios.get(config.authUrl).then(function(response){
        context.commit('loginUser', {data: response.data.data})
      })      
    },
    findUser: function(context, username){
      axios.get(config.findUser + username).then(function(response){
        context.commit('findUser', {data: response.data.data}) 
      })      
    },
    follow: function({commit}){
      let data = {
        user_id: state.getUserInfo.id
      }
      state.getUserInfo.auth_follow = true
      axios.post(config.followersUrl, data).then(response => {
        commit('follow')
      })
    },    
    unFollow: function({commit}){
      let user_id = state.getUserInfo.id
      state.getUserInfo.auth_follow = false
      axios.delete(config.followersUrl + user_id).then(response => {
        commit('unFollow')
      })
    },
    checkUsername: function(context, username){
      return new Promise((resolve, reject) => {
        axios.get(config.userExists + username)
          .then(function (response) {
            context.commit('checkUsername', {data: response.data.data.exists})
            resolve()
        }) 
      })      
    },
    login: function({commit, rootState}, data){
      axios.post(config.loginUrl, data)
      .then(response => {
        if (response.status === 200){
          commit('login', {data: response.data})            
        }
      })
      .catch(error => {
        commit('catchError', {data: error.response.data.error.message})
      })
    },
    register: function({commit, dispatch, state}, data){
      commit('setLoading')
      return dispatch(config.checkUsername, data.username).then(() => {
        axios.post(config.registerUrl, data)
        .then(response => {
          if (response.status >= 200){
            commit('register')
            commit('setLoading')
          }
        })
        .catch(error => {    
          if(error){
            commit('catchError', {data: error.response.data.error.errors.email[0]})
            commit('setLoading')
          }             
        })
      })       
    }
}

export default {
  state,
  getters,
  actions,
  mutations
}