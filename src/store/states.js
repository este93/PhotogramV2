// initial state
const state = {    
  title: "",    
  searchIcon: '',   
  homeIcon: '',
  notificationIcon: '',
  commentsPopup: false,
  imagePopup: false,
  upload: false,
  loading: false,
  addCommentPopup: false,     
  isMobile: true, 
  imageRoot: "http://192.168.0.154:8000/storage/", 
  likesPopup: false,
  grid: false,   // Profile page grid or single image display
}

// getters
const getters = {
  title: function(state){
    return state.title; 
  },
  getSearchIcon: function(state){
    return state.searchIcon; 
  },
  getHomeIcon: function(state){
    return state.homeIcon; 
  },
  getNotificationIcon: function(state){
    return state.notificationIcon; 
  },
  getCommentsPopup: function(state){
    return state.commentsPopup; 
  },
  getImagePopup: function(state){
    return state.imagePopup; 
  },
  upload: function(state){
    return state.upload; 
  },
  getLoading: function(state){
    return state.loading; 
  },
  getMobile: function(state){
    return state.isMobile; 
  },
  getImageRoot: function(state){
    return state.imageRoot; 
  },
  addCommentPopup: function(state){
    return state.addCommentPopup; 
  },
  likesPopup: function(state){
    return state.likesPopup; 
  },
  getGrid: function(state){
    return state.grid; 
  },
}

// mutations
const mutations = {
  updateTitle: (state, payload) => {
    state.title = payload;
  },
  setSearchIcon: (state) => {
    state.searchIcon = !state.searchIcon;
  },
  setHomeIcon: (state) => {
    state.homeIcon = !state.homeIcon;
  },
  setNotificationIcon: (state) => {
    state.notificationIcon = !state.notificationIcon;
  },
  setCommentsPopup: (state) => {
    state.commentsPopup = !state.commentsPopup;
  },
  setImagePopup: (state) => {
    state.imagePopup = !state.imagePopup;
    state.searchIcon = false;
  },
  showUpload: (state) => {
    state.upload = !state.upload;
  },
  setLoading: (state) => {
    state.loading = !state.loading;
  },
  resetIcons: (state) => {
    state.searchIcon = false;
    state.homeIcon = false;
    state.notificationIcon = false;
    state.imagePopup = false
  },
  headerCloseAll(state, response){
    state.upload = false;
    state.imagePopup = false;
    state.commentsPopup = false;
    state.likesPopup = false
  },
  setMobile: (state) => {
    if($(document).width() > 1024){
      state.isMobile = false
    }
  },
  openCommentAdding: (state) => {
    state.addCommentPopup = !state.addCommentPopup;
  },
  openCommentsPopup: (state, payload) => {
    state.commentsPopup = true;
    state.searchIcon = false;
  },
  hideComments: (state, payload) => {
    state.commentsPopup = false;
    state.addCommentPopup = false
  },
  showLikesPopup: (state) => {
    state.likesPopup = !state.likesPopup;    
  },
  setHomePage: (state) => {
    state.grid = false; 
    if(state.isMobile){
      state.searchIcon = true
    }
  },
  setProfilePage: (state) => {
    state.grid = true; 
  },
  setGrid: (state) => {
    state.grid = !state.grid;
  }
}

// actions
const actions = {
  updateTitle: function(context, payload){
    context.commit('updateTitle', payload)
  },
  showUpload: function(context){
    context.commit('showUpload')
    context.commit('setSearchIcon');
    context.dispatch('updateTitle', 'Upload');
  },
  openCommentAdding: function(context){
    context.commit('openCommentAdding')
  },  
  openCommentsPopup: function({commit,dispatch, rootState}, index){
      commit('updateTitle', 'Comments');
      if(Object.keys(rootState.posts.post).length === 0){
        dispatch('setPost', index)
      }
      commit('openCommentsPopup')
  },
  hideComments: function(context){
    context.commit('hideComments')
  },
  setHomePage: function(context){
    context.commit('resetIcons');
    context.commit('setHomeIcon');
    context.commit('setHomePage')
  },
  setProfilePage: function(context){
    context.commit('resetIcons');
    context.commit('setProfilePage')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}