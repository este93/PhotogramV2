// initial state
const state = { 
  posts: [],
  nextPage: 1,
  currentPostIndex: '',
  currentPost: {}
}

// getters
const getters = {
  getPosts: state => {
    return state.posts
  },
  getCurrentPost: state => {
    return state.currentPost
  },
  getCurrentPostIndex: state => {
    return state.currentPostIndex
  }
}

// mutations
const mutations = {
  loadPosts: (state, { list,username }) => {
    state.posts = state.posts.concat(list)
    state.nextPage += 1
  },
  resetPosts: (state) => {
    state.nextPage = 1
    state.posts = []
    state.currentPostIndex = ""
  },
  setCurrentPost: (state, index) => {
    state.currentPost = state.posts[index]
    state.currentPostIndex = index
  },
}

// actions
const actions = {
  loadPosts: function ({ commit, rootState }, username) {
    commit('setLoading')
    var amount = ''
    if(rootState.states.isMobile){
      if(rootState.states.grid)
        this.amount = 15;
      else
        this.amount = 6;                 
    }
    else this.amount = 12;
    var url = ''
    if(username){
      url = 'posts'
    }else{
      url = 'home'
    }
    axios.get(url,{
      params: {
        amount: this.amount,
        page: state.nextPage,
        username: username
      }
    }).then((response) => {
      commit('loadPosts', { list: response.data.data })
      commit('setLoading')
    }, (err) => {
      console.log(err)
    })
  },
  resetPosts: function(context, payload){
    context.commit('resetPosts')
  },
  setCurrentPost: function(context, index){
    context.commit('setCurrentPost', index)
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}