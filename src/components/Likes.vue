<template>

	<div>
		<div class="o-photo__likes">
			<transition name="show">
				<button v-if="post.auth_like_id" class="likeIt" @click="unlikeIt(index)">
					<img src='../assets/img/like-green-lg.png'>
				</button>	
			</transition>	
			<transition name="show">
				<button v-if="!post.auth_like_id & popupActive && !isMobile" class="likeIt" @click="likeIt(index)">
					<img src='../assets/img/like-white.png'>
				</button>
			</transition>	
			<transition name="show">
				<button v-if="!post.auth_like_id & !popupActive" class="likeIt" @click="likeIt(index)">
					<img src='../assets/img/like.png'>
				</button>
			</transition>
			<transition name="show">
				<button v-if="!post.auth_like_id & popupActive && isMobile" class="likeIt" @click="likeIt(index)">
					<img src='../assets/img/like.png'>
				</button>
			</transition>

			<button v-if="popupActive && !isMobile" @click="openComments(index)" class="comment"><img src='../assets/img/comment-icon-white.png' alt=""></button>
			<button v-else class="comment" @click="openComments(index)"><img src='../assets/img/comment-icon.png' alt=""></button>

			<h3 v-if="post.likes_count" @click="openLikesPopup(index)">
				<img src='../assets/img/like-green.png' alt="">
				<span v-if="post.likes_count > 1">{{ post.likes_count }} likes</span>
				<span v-else>1 like</span>
			</h3>
		</div>	
		<transition name="fade" v-if="likesPopup">
			<likesPopup></likesPopup>
		</transition>	
	</div>

</template>

<script>
	import likesPopup from './LikesPopup'
	import { mapGetters } from 'vuex'

	export default{
		props: ['post', 'index'],
		components: {likesPopup},
		data(){
			return{				
            	imageRoot: this.$store.getters.getImageRoot,
        		likePage: 1,
        		bottom: false,
			}
		},
		created(){			
		    window.addEventListener('scroll', () => {
		      this.bottom = this.bottomVisible()
		    })		    
		},
		watch: {
		    bottom(bottom) {
		        if (bottom) {
		      		this.getLikes(this.index, this.likePage)
		        }
		    }
		},
		methods: {			
        	likeIt(index){
        		this.$store.dispatch('like', [index, 1]) 
        	},
        	unlikeIt(index){
        		this.$store.dispatch('unlike', [index, 1])         		
        	},
        	openLikesPopup(index){
        		this.$store.dispatch('loadLikes', index)
        	},
            openComments(index){   
                this.$store.dispatch('openComments', index) 
                //this.$store.commit('openCommentAdding')          
            },
        	bottomVisible: function(context){
        		if(this.likesPopup){
        			const scrollY = $('.b-comments--outer').scrollTop()
        			const wrapper = $('.b-comments--outer').height()
				    const inner = $('.b-comments--inner').height()
				    const bottomOfPage = scrollY + wrapper >= inner
			        return bottomOfPage
        		}				
			},
		},
        computed: {  	
            ...mapGetters({
		      posts: 'getPosts',
		      popupActive: 'getImagePopup',
		      isMobile: 'getMobile',
		      likesPopup: 'likesPopup',
		      isBottom: 'getIsBottom',
		    })
        }
	}
</script>