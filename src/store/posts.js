// initial state
const state = { 
  posts: [],
  nextPage: 1,
  currentPostIndex: '',
  post: {},
  comments: []
}

// getters
const getters = {
  getPosts: state => {
    return state.posts
  },
  getCurrentPostIndex: state => {
    return state.currentPostIndex
  },
  getPost: state => {
    return state.post
  },
  getComments: state => {
    return state.comments
  },
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
  resetPost: (state) => {
    state.post = {}
    state.comments = []
  },
  setPost: (state, {data, index}) => {
    //state.post = data
    state.post = state.posts[index]
    state.currentPostIndex = index
  },
  setComments: (state, {data}) => {
    state.comments = data
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
  setPost: function({commit, rootState}, index){
    let postId = rootState.posts.posts[index].id;
    return new Promise((resolve, reject) => {
      commit('setPost', { index: index })
      resolve()
      // axios.get('/posts/' + postId).then((response) =>{
      //   commit('setPost', { data: response.data.data, index: index })
      //   resolve()
      // }) 
    })      
  },
  editPost: function({commit, rootState}, index){
    //let postId = rootState.posts.posts[index].id;
    axios.patch('posts', {
      thumbnail: '',
      description: ''
    }).then((response) =>{
      //commit('setPost', { data: response.data.data, index: index })
    })      
  },
  setComments: function({commit, rootState}, index){
    let postId = rootState.posts.posts[index].id;
    return new Promise((resolve, reject) => { 
      axios.get('/comments/', {
        params: {
          post_id: postId,
          amount: 20,
          page: 1
        }
      }).then((response) =>{
          commit('setComments', { data: response.data.data})
          resolve() 
      })       
    })     
  },
  openComments: function({commit, dispatch}, index){
    commit('setLoading')
    return dispatch('setComments', index).then(() => {
        dispatch('openCommentsPopup', index)
        commit('setLoading')
    })
  },
  addComment: function({commit, dispatch}, data){ 
    commit('setLoading')   
    axios.post('comments/', data).then(response => {
      return dispatch('setComments', state.currentPostIndex).then(() => {
          commit('setLoading')
      })   
    })
  },
  deleteComment: function({commit,dispatch}, commentId){    
    commit('setLoading')
    axios.delete('comments/' + commentId).then(response => {
      return dispatch('setComments', state.currentPostIndex).then(() => {
          commit('setLoading')
      })
    })
  },
  resetPosts: function(context, payload){
    context.commit('resetPosts')
  },
  openImagePopup: function({commit, dispatch}, index){
    commit('setLoading')
    return dispatch('setPost', index).then(() => {
        commit('setImagePopup')
        commit('setLoading')
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}