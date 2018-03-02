// initial state
const state = { 
  posts: [],
  nextPage: 1,
  currentPostIndex: '',
  post: {},
  comments: [],
  photo: null,
  photoUrl: '',
  photoDescription: '',
  showDragTitle: true,
  noPosts: false,
  loadingPosts: false
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
  getPhoto: state => {
    return state.photoUrl
  },
  getDragTitle: state => {
    return state.showDragTitle
  },
  getDescription: state => {
    return state.photoDescription
  },
  getNoPosts: state => {
    return state.noPosts
  },
  getLoadingPosts: state => {
    return state.loadingPosts
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
  takePhoto: (state, {file, img}) => {
    state.photo = file
    state.photoUrl = img
    state.showDragTitle = false
  },
  resetUploading: (state) => {
    state.upload = !state.upload
    state.photoUrl = ''
    state.description = ''
    state.showDragTitle = true
  },
  noPosts: (state) => {
    state.noPosts = true
  },
  setLoadingPosts: (state) => {
    state.loadingPosts = !state.loadingPosts
  },
  imagePicked: (state, {img}) => {
    state.showDragTitle = false
    state.photo = img
  }
}

// actions
const actions = {
  loadPosts: function ({ commit, rootState }, username) {
    commit('setLoadingPosts')
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
      if(response.data.data.length){
        commit('loadPosts', { list: response.data.data })
        commit('setLoadingPosts')
      }else{
        commit('noPosts')
        commit('setLoadingPosts')
        console.log('No more posts')
      }
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
  editPost: function({commit, rootState}, data){
    commit('setLoading')
    axios.patch('posts/' + data.post_id, {
      thumbnail: '',
      description: data.description
    }).then((response) =>{
      commit('setLoading')
    })      
  },
  deletePost: function({commit}, index){
    let postId = index
    commit('setLoading')
    axios.delete('posts/' + postId).then((response) =>{
      commit('setEditPopup')
      commit('setImagePopup')
      commit('setLoading')
    }) 
  },
  // Comments
  setComments: function({commit, rootState}, index){
    let postId = rootState.posts.posts[index].id;
    return new Promise((resolve, reject) => { 
      axios.get('/comments/', {
        params: {
          post_id: postId,
          amount: 6,
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
  },
  // Uploading of photos
  takePhoto: function({commit, dispatch}, data){
    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }
    var file = dataURLtoFile(data.refs, 'image.png');
    commit('takePhoto', {file: file, img: data.refs})
  }, 
  uploadPhoto: function({commit, dispatch}, data){
    commit('setLoading')
    var formData = new FormData();
    formData.append("image", state.photo);
    formData.append("description", data.description);
    axios.post('/posts', formData).then(function(){
      commit('setLoading')
      commit('resetUploading')
      dispatch('showUpload');
    })
  },
  imagePicked: function({commit, dispatch}, data){
    var formData = new FormData();
    formData.append("image", state.photo);
    var img = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      state.photoUrl = e.target.result;
    }
    reader.readAsDataURL(img);
    commit('imagePicked', {img: img})
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}