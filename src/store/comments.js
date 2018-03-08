import config from '../config.js'

// initial state
const state = { 
  nextPageComments: 1,
  comments: [],
  noComments: false
}

// getters
const getters = {
  getComments: state => {
    return state.comments
  },
  getNoComments: state => {
    return state.noComments
  },
}

// mutations
const mutations = {
  setComments: (state, data) => {
    if(data.type == 1){
      state.comments = data.data
    }else if(data.type == 2){
      state.comments.splice(data.commentIdex, 1);
    }
    else{
      state.comments = state.comments.concat(data.data)
    }
    state.nextPageComments += 1
  },
  noComments: (state) => {
    state.noComments = true
  },
  resetComments: (state) => {
    state.noComments = false,
    state.comments = [],
    state.nextPageComments = 1
  },
}

// actions
const actions = {
  setComments: function({commit, rootState}, data){
    let postId = rootState.posts.posts[data.index].id;
    commit('setLoading')
    return new Promise((resolve, reject) => { 
      axios.get(config.commentsUrl, {
        params: {
          post_id: postId,
          amount: 15,
          page: state.nextPageComments
        }
      }).then((response) =>{
          if(response.data.data.length){
            let dataSet = {
              data: response.data.data, 
              type: data.type, 
              commentIdex: data.commentIdex
            }            
            commit('setComments', dataSet)
            commit('setLoading')
          }else{
            commit('noComments')
            commit('setLoading')
          }
          resolve() 
      })       
    })     
  },
  openComments: function({commit, dispatch, rootState}, index){
    commit('setLoading')
    // document.getElementsByTagName( 'html' )[0].setAttribute( 'class', 'htmlOverflow' );
    // dispatch('openCommentsPopup', index)
    // commit('setLoading')
    return dispatch('setComments', {index: index}).then(() => {
        if(!rootState.states.isMobile){  
          document.getElementsByTagName( 'html' )[0].setAttribute( 'class', 'htmlOverflow' );
        }
        dispatch('openCommentsPopup', index)
        commit('setLoading')
    })
  },
  addComment: function({commit, dispatch, rootState}, data){ 
    commit('setLoading')   
    state.nextPageComments = 1
    axios.post(config.commentsUrl, data).then(response => {
      return dispatch('setComments', {index: rootState.posts.currentPostIndex, type: 1}).then(() => {
          commit('setLoading')
      })   
    })
  },
  deleteComment: function({commit,dispatch, rootState}, data){    
    commit('setLoading')
    axios.delete(config.commentsUrl + data.commentId).then(response => {
      let dataSet = {
        index: rootState.posts.currentPostIndex, 
        type: 2, 
        commentIdex: data.index
      }
      commit('setComments', dataSet)
      commit('setLoading')
    })
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}