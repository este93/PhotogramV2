import Vue from 'vue'
import Vuex from 'vuex'
import states from './states'
import users from './users'
import posts from './posts'
import likes from './likes'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
    	states,
    	users,
    	posts,
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
