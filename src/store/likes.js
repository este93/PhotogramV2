// initial state
const state = { 
  likes: [],   
  likesNextPage: 1
}

// getters
const getters = {
  getLikes: state => {
    return state.likes
  }
}

// mutations
const mutations = {
  loadLikes: (state, { list,payload }) => {
    state.likes = state.likes.concat(list)
    state.likesNextPage += 1;
  },
  like: (state, response) => {
    if(response.type == 1)
      response.rootState.posts.posts[response.index].auth_like_id = response.dataId
    else
      response.rootState.posts.comments[response.index].auth_like_id = response.dataId
  },
  unlike: (state, response) => {
    if(response.type == 1)
      response.rootState.posts.posts[response.index].auth_like_id = null
    else
      response.rootState.posts.comments[response.index].auth_like_id = null
  },
  showLikesPopup: function(){    
    state.likes.likes = []
    state.likes.likesNextPage = 1
  }
}

// actions
const actions = {
  loadLikes: function({commit, rootState}, index){
    commit('setLoading')
    let likable_id = rootState.posts.posts[index].id;
    axios.get('likes', {
      params: {
        likable_id: likable_id,
        likable_type: 1,
        amount: 15,
        page: state.likesNextPage
      }
    }).then(response => {
      commit('loadLikes', { list: response.data.data, payload: rootState })
      commit('setLoading')
      commit('setSearchIcon')
      commit('showLikesPopup')
      if(response.data.data = ""){
        console.log('no more!')
      }
    })
  },
  like: function({commit, rootState}, [index, type]){
    let likable_id = ""
    if(type == 1){
      rootState.posts.posts[index].auth_like_id = true
      likable_id = rootState.posts.posts[index].id;
    }
    else{
      likable_id = rootState.posts.comments[index].id
      rootState.posts.comments[index].auth_like_id = true
    }
    let data = {
      likable_id: likable_id,
      likable_type: type
    }
    rootState.posts.posts[index].likes_count += 1
    axios.post('likes', data).then(response => {
      let data = {
        dataId: response.data.data.id,
        index: index,
        type: type,
        rootState
      }
      commit('like', data)
    })
  },
  unlike: function({commit, rootState}, [index, type]){
    let likable_id = ""
    if(type == 1){
      likable_id = rootState.posts.posts[index].auth_like_id;
      rootState.posts.posts[index].auth_like_id = null
    }
    else{
      likable_id = rootState.posts.comments[index].auth_like_id
    }
    rootState.posts.posts[index].likes_count -= 1
    let data = {
      index: index,
      type: type,
      rootState
    }
    axios.delete('likes/' + likable_id).then(response => {
      commit('unlike', data)
    })
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}