<template>
	<div class="b-comments b-photos-popup">
    <div class="b-upload__back" @click="hideComments"></div>
		<div class="b-comments__content">
      <div class="b-comments--outer">
			   <div class="b-comments--inner" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" :infinite-scroll-distance="scrollDistance">
          <div class="spinner" v-show="loading">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
            <div class="b-comments__form">
                <form action="" @submit.prevent="addComment" class="c-profile-edit__form">
                    <img class="b-comments__form__icon" src='../assets/img/comment-icon@2x.png' alt="">
                    <textarea placeholder="Comment" class="c-profile-edit__input" ref="comment" name="comment" v-model="commentBody"></textarea>
                    <input type="submit" value="Save" class="c-profile-edit__submit">
                </form>
            </div>
    				<div class="b-comments__single" v-for="(com, index) in comments">
              <span class="b-comments__delete" @click="deleteComment(index)" v-if="com.username == currentUsername">X</span>
    					<div class="b-comments__single--left">
    						<div class="b-comments__img">
                    <router-link :to="'/dashboard/' + com.username">
                        <img :src="imageRoot + com.user_image.comment" v-if="com.user_image">
                    </router-link>                 
                </div>
    						<p class="b-comments__txt"><span><router-link :to="'/dashboard/' + com.username">{{ com.username }}</router-link> </span> commented <br>{{ com.body }}</p>
    					</div>
    					<div class="b-comments__single--right">
                <img v-if="com.auth_like_id" src='../assets/img/like-green-lg.png' @click="unlikeIt(index)">
                <img v-else src='../assets/img/like-green-g.png' alt="" @click="likeIt(index)">
    					</div>
    				</div>				
    		 </div>
        </div>  
		</div>
	</div>
</template>

<script>
  import {rootUrl} from '../config'
  import { mapGetters } from 'vuex'
  var infiniteScroll =  require('vue-infinite-scroll');

	export default{
        directives: {infiniteScroll},
        data(){
        	return{        		
            commentBody: ''
        	}
        },
        methods: {
        	hideComments(){    
        		this.$store.dispatch('hideComments')   
            this.$store.commit('resetPost');
            if(!this.isMobile){              
              document.getElementsByTagName( 'html' )[0].setAttribute( 'class', '' );       
            }
        	},
          addComment(){
            let data = {
              post_id: this.currentPost.id,
              body: this.commentBody
            }
            this.$store.dispatch('addComment', data)   
            this.commentBody = ''              
          },
          likeIt(index){
              this.$store.dispatch('like', [index, 2])  
          },
          unlikeIt(index){
              this.$store.dispatch('unlike', [index, 2])  
          },
          deleteComment(index){
            let data = {
              index: index,
              commentId: this.comments[index].id
            }
            this.$store.dispatch('deleteComment', data)  
          },
          loadMore: function() {
            if(!this.noComments && !this.imagePopup){
              this.$store.dispatch('setComments', {index: this.currentPostIndex})
            }
          },
        },
        computed:{
            ...mapGetters({
              //addingComment: 'addCommentPopup',
              currentPost: 'getPost',
              imageRoot: 'getImageRoot',
              loading: 'getLoading',
              loggedUser: 'getLoggedUser',
              noComments: 'getNoComments',
              isMobile: 'getMobile',
              currentPostIndex: 'getCurrentPostIndex',
              comments: 'getComments',
              imagePopup: 'getImagePopup'
            }),
            currentUsername(){
              return this.$store.state.users.loggedUser.username
            },
            scrollDistance(){
             return window.innerHeight
            }
        }
    }
</script>