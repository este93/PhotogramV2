<template>
	<div class="b-photos-popup">
		<div class="b-photos-popup__back" @click="hidePopup"></div>

		<div class="o-photo" v-if="post">
		
			<router-link :to="'dashboard/' + post.username" class="o-photo__head">
				<div class="o-photo__head__img">
					<img :src="imageRoot + post.user_image.avatar"> 
				</div>
				<h3 class="o-photo__head__name">{{ post.username }}</h3>
			</router-link>

			<button v-if="this.loggedUser.username == this.post.username" class="o-photo__edit-btn btn" @click="editPost(currentPostIndex)">Edit Post</button>

			<div v-if="post.type_id == 1" class="o-photo__img">
                <button @click="slideIt('left')" class="o-photo__arrow left" v-if="currentPostIndex !== 0"><img src="../assets/img/slider-arrow.png" alt=""></button>
                <button @click="slideIt('right')" class="o-photo__arrow right"><img src="../assets/img/slider-arrow.png" alt=""></button>
				<picture v-touch:swipe.left="swipeRight" v-touch:swipe.right="swipeLeft">
				    <source :srcset="imageRoot + post.media.orig" media="(min-width: 768px)" />
				    <img :srcset="imageRoot + post.media.medium" />
				</picture>
			</div>
			<div v-else class="o-photo__img" v-touch:swipe.left="swipeRight" v-touch:swipe.right="swipeLeft">
				<video :src="imageRoot + post.media" width="400" height="400" controls></video>
			</div>	

			<likes :post="post" :index="currentPostIndex"></likes>

			<comments v-bind:post="post"></comments>

		</div>

  		<transition name="fade">
			<commentPopup v-show="showComments"></commentPopup>
		</transition>	

        <transition name="fade">
            <editPost v-show="showEdit"></editPost>
        </transition>   

	</div>	
</template>

<script>
    import Vue from 'vue'
	import comments from './Comments.vue'
	import commentPopup from './CommentPopup.vue'
    import editPost from './EditPost.vue'
	import likes from './Likes.vue'
    import { mapGetters } from 'vuex'
    import Vue2TouchEvents from 'vue2-touch-events'
    Vue.use(Vue2TouchEvents)

	export default{
		components: {
			comments,
			commentPopup,
			likes,
            editPost,		
		},
        data(){
        	return{        		
            	imageRoot: this.$store.getters.getImageRoot,
      			post: this.$store.getters.getPost,
                titleD: this.$store.getters.title
        	}
        },
        methods: {
        	hidePopup(){    
        		this.$store.commit('setImagePopup');
        		this.$store.commit('resetPost');
                if(!this.isMobile){              
                  document.getElementsByTagName( 'html' )[0].setAttribute( 'class', '' );       
                }
        	},
            swipeLeft(){
                if(this.currentPostIndex == 0){
                    this.currentPostIndex
                }else{
                    this.$store.state.posts.currentPostIndex -= 1
                }                        
                if(this.currentPostIndex + 3 > this.$store.state.posts.posts.length)
                this.$store.dispatch('loadPosts', this.$route.params.username)
                this.post = this.$store.state.posts.posts[this.currentPostIndex]
            },
            swipeRight(){
                this.$store.state.posts.currentPostIndex += 1
                if(this.currentPostIndex + 3 > this.$store.state.posts.posts.length)
                    this.$store.dispatch('loadPosts', this.$route.params.username)
                this.post = this.$store.state.posts.posts[this.currentPostIndex]
            },
        	slideIt(direction){
        		if(direction == 'left'){
        			if(this.currentPostIndex == 0)
        				this.currentPostIndex
        			else
        				this.$store.state.posts.currentPostIndex -= 1
        		}
        		else
        			this.$store.state.posts.currentPostIndex += 1
        		if(this.currentPostIndex + 3 > this.$store.state.posts.posts.length)
        			this.$store.dispatch('loadPosts', this.$route.params.username)
                if(this.currentPostIndex == this.$store.state.posts.posts.length)
                    this.$store.state.posts.currentPostIndex = 0
        		this.post = this.$store.state.posts.posts[this.currentPostIndex]
        	},
            editPost(index){
                this.$store.dispatch('setComments', {index: index})
                this.$store.commit('setEditPopup')
                if(this.showEdit){
                    this.$store.dispatch('updateTitle', 'Edit Post');
                }else{
                    this.$store.dispatch('updateTitle', this.titleD);
                }
            }
        },
        computed: {	
            ...mapGetters({
              showComments: 'getCommentsPopup',
              isMobile: 'getMobile',
              currentPostIndex: 'getCurrentPostIndex',
              showEdit: 'getEditPopup',
              loggedUser: 'getLoggedUser',
            })        	
        }
    }
</script>
