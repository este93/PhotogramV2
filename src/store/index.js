import Vue from 'vue'
import Vuex from 'vuex'
import states from './states'
import users from './users'
import posts from './posts'
import likes from './likes'
import comments from './comments'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
    	states,
    	users,
    	posts,
    	comments,
    	likes
    },
	state: {
	},
	getters: {
	},
	mutations: {
	},
	actions: {
	}
})
