// initial state
const state = { 
    loggedUser: [],
    getUserInfo: [],
    usernameExists: false,
    confirmRegistration: false,
    errors: '' 
}

// getters
const getters = {
    getLoggedUser: function(state){
      return state.loggedUser[0]; 
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
    loginUser: (state, {payload}) => {   
        state.loggedUser = state.loggedUser.concat(payload);  
    },
    findUser: (state, {data, username}) => {   
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
    }
}

// actions
const actions = {
    loginUser: function(context){
      axios.get('/users/auth/').then(function(response){
        context.commit('loginUser', {payload: response.data.data})
      })      
    },
    findUser: function(context, username){
      axios.get('/users/find?username=' + username).then(function(response){
        context.commit('findUser', {data: response.data.data}) 
      })      
    },
    follow: function({commit}){
      let data = {
        user_id: state.getUserInfo.id
      }
      state.getUserInfo.auth_follow = true
      axios.post('followers/', data).then(response => {
        commit('follow')
      })
    },    
    unFollow: function({commit}){
      let user_id = state.getUserInfo.id
      state.getUserInfo.auth_follow = false
      axios.delete('followers/' + user_id).then(response => {
        commit('unFollow')
      })
    },
    checkUsername: function(context, username){
      return new Promise((resolve, reject) => {
        axios.get('users/exists?username=' + username)
          .then(function (response) {
            context.commit('checkUsername', {data: response.data.data.exists})
            resolve()
        }) 
      })      
    },
    login: function(context, data){
      axios.post('http://192.168.0.154:8000/api/auth/login', data)
      .then(response => {
        if (response.status === 200){
          context.commit('login', {data: response.data})            
        }
      })
      .catch(error => {
        context.commit('catchError', {data: error.response.data.error.message})
      })
    },
    register: function({commit, dispatch, state}, data){
      commit('setLoading')
      return dispatch('checkUsername', data.username).then(() => {
        axios.post('/auth/signup', data)
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