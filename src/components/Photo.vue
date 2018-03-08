<template>
	<div class="b-photos" v-infinite-scroll="loadMore" infinite-scroll-disabled="loadingPosts" :infinite-scroll-distance="scrollDistance/2" infinite-scroll-immediate-check='false'>
		<div class="o-photo" v-for="(post, index) in posts" v-if="post">

			<router-link :to="'dashboard/' + post.username" class="o-photo__head">
				<div class="o-photo__head__img">
					<img :src="imageRoot + post.user_image.avatar"> 
				</div>
				<h3 class="o-photo__head__name">{{ post.username }}</h3>
			</router-link>
			
			<div v-if="post.type_id == 1" class="o-photo__img" @click="imagePopup(index)">
				<picture>
				    <source :srcset="imageRoot + post.media.large" media="(min-width: 400px)" />
				    <img v-if="grid && isMobile" :srcset="imageRoot + post.media.small" />
				    <img v-else :srcset="imageRoot + post.media.medium" />
				</picture>
			</div>
			<div v-else class="o-photo__img" @click="imagePopup(index)">
				<video v-if="grid && isMobile" :src="imageRoot + post.media" width="106" height="106" :poster="imageRoot + post.thumbnail"></video>
				<video v-else :src="imageRoot + post.media" width="320" height="320" :poster="imageRoot + post.thumbnail"></video>
			</div>	

			<likes :post="post" :index="index"></likes>

			<comments :post="post" :index="index"></comments>
		</div>

		<div class="spinner" v-show="loading">
		  <div class="double-bounce1"></div>
		  <div class="double-bounce2"></div>
		</div>

		<div class="spinner spinner--photo" v-show="loadingPosts">
		  <div class="double-bounce1"></div>
		  <div class="double-bounce2"></div>
		</div>

  		<transition name="fade">
			<imagePopup v-if="showImagePopup"></imagePopup>
		</transition>	

  		<transition name="fade">
			<commentPopup v-if="showComments"></commentPopup>
		</transition>	
	</div>	
</template>

<script>
	import likes from './Likes.vue'
	import imagePopup from './ImagePopup.vue'
	import commentPopup from './CommentPopup.vue'
	import comments from './Comments.vue'
	import { mapGetters } from 'vuex'
	var infiniteScroll =  require('vue-infinite-scroll')

	export default{
  		directives: {infiniteScroll},
		components: {
			likes,
			comments,		
			imagePopup,
			commentPopup
		},
        data(){
            return{
            	routeUsername: this.$route.params.username,
				bottom: false,
            }
        },
        created(){    
			this.$store.dispatch('loadPosts', this.routeUsername)
        },	
		watch: {
		    '$route.params.username': function (id) {
        	  this.$store.dispatch('resetPosts')
		      this.$store.dispatch('loadPosts', this.$route.params.username)	
		    }
		},
        methods:{
        	loadMore: function() {
        		if(!this.noPosts){
		      		this.$store.dispatch('loadPosts', this.$route.params.username)
        		}
		    },
        	imagePopup(index){
				this.$store.dispatch('openImagePopup', index)
	            if(!this.isMobile){              
	              document.getElementsByTagName( 'html' )[0].setAttribute( 'class', '' );       
	            }
        	},   	
        },
        computed: {  
            ...mapGetters({
		      posts: 'getPosts',
		      showComments: 'getCommentsPopup',
		      showImagePopup: 'getImagePopup',
		      grid: 'getGrid',
		      isMobile: 'getMobile',
		      loading: 'getLoading',
              imageRoot: 'getImageRoot',
              noPosts: 'getNoPosts',
              loadingPosts: 'getLoadingPosts'
		    }),
		    scrollDistance(){
			   return window.innerHeight
		    }
        }
    }

</script>
