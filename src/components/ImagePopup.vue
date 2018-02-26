<template>
	<div class="b-photos-popup">
		<div class="b-photos-popup__back" @click="hidePopup"></div>
		<div class="o-photo">
		
			<router-link :to="'dashboard/' + post.username" class="o-photo__head">
				<div class="o-photo__head__img">
					<img :src="imageRoot + post.user_image.avatar"> 
				</div>
				<h3 class="o-photo__head__name">{{ post.username }}</h3>
			</router-link>

			<button v-if="this.$route.name == 'dashboard'" class="o-photo__edit-btn btn">Edit Post</button>

			<div v-if="post.type_id == 1" class="o-photo__img">
                <button @click="slideIt('left')" class="o-photo__arrow left"><img src="../assets/img/slider-arrow.png" alt=""></button>
                <button @click="slideIt('right')" class="o-photo__arrow right"><img src="../assets/img/slider-arrow.png" alt=""></button>
				<picture>
				    <source :srcset="imageRoot + post.media.large" media="(min-width: 768px)" />
				    <img :srcset="imageRoot + post.media.medium" />
				</picture>
			</div>
			<div v-else class="o-photo__img">
				<video :src="imageRoot + post.media" width="400" height="400" controls></video>
			</div>	

			<likes :post="post" :index="currentPostIndex"></likes>

			<comments v-bind:post="post"></comments>

		</div>
  		<transition name="fade">
			<commentPopup v-show="showComments"></commentPopup>
		</transition>	
	</div>	
</template>

<script>
	import comments from './Comments.vue'
	import commentPopup from './CommentPopup.vue'
	import likes from './Likes.vue'
    import { mapGetters } from 'vuex'

	export default{
		props: ['index'],
		components: {
			comments,
			commentPopup,
			likes		
		},
        data(){
        	return{        		
            	imageRoot: this.$store.getters.getImageRoot,
      			post: this.$store.getters.getCurrentPost,
      			currentPostIndex: this.$store.getters.getCurrentPostIndex
        	}
        },
        methods: {
        	hidePopup(){    
        		this.$store.commit('setImagePopup');
        	},
        	slideIt(direction){
        		if(direction == 'left'){
        			if(this.currentPostIndex == 0)
        				this.currentPostIndex
        			else
        				this.currentPostIndex -= 1
        		}
        		else
        			this.currentPostIndex += 1

        		if(this.currentPostIndex + 3 > this.$store.state.posts.posts.length)
        			this.$store.dispatch('loadPosts', this.$route.params.username)
        		this.post = this.$store.state.posts.posts[this.currentPostIndex]
        	}
        },
        computed: {	
            ...mapGetters({
              showComments: 'getCommentsPopup',
              isMobile: 'getMobile',
            })        	
        }
    }
</script>
