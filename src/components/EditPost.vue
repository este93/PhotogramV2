<template>
	<div class="b-comments b-photos-popup">
    <div class="b-upload__back" @click="hideEdit"></div>
		<div class="b-comments__content">
      <div class="b-comments--outer">
			   <div class="b-comments--inner">

            <div class="spinner" v-show="loading">
              <div class="double-bounce1"></div>
              <div class="double-bounce2"></div>
            </div>

            <div class="b-comments__personal">
              <div class="b-comments__single">
                <div class="b-comments__single--left">
                  <div class="b-comments__img">
                      <img :src="imageRoot + currentPost.user_image.comment" v-if="currentPost.user_image">                  
                  </div>
                  <p class="b-comments__txt"><span>{{ currentPost.username }}</span> post edit <br>{{ currentPost.description }}</p>
                </div>
                <div class="b-comments__single--right">
                  <span class="b-comments__deletePost" @click="deletePost(currentPost.id)">Delete</span>
                </div>
              </div>
            </div>

            <div class="b-comments__form">
                <form action="" @submit.prevent="editPost" class="c-profile-edit__form">
                    <img class="b-comments__form__icon" src='../assets/img/comment-icon@2x.png' alt="">
                    <textarea value="Description" class="c-profile-edit__input" ref="comment" name="comment" v-model="currentPost.description"></textarea>
                    <input type="submit" value="Save" class="c-profile-edit__submit">
                </form>
            </div>

    				<div class="b-comments__single" v-for="(com, index) in comments">
              <span class="b-comments__delete" @click="deleteComment(index)">X</span>
    					<div class="b-comments__single--left">
    						<div class="b-comments__img">
                    <img :src="imageRoot + com.user_image.comment" v-if="com.user_image">                  
                </div>
    						<p class="b-comments__txt"><span>{{ com.username }}</span> commented <br>{{ com.body }}</p>
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

	export default{
        methods: {
          	hideEdit(){    
              this.$store.commit('setEditPopup')   
          	},
            deletePost(index){
              this.$store.dispatch('deletePost', index)
            },
            editPost(){
              let data = {
                post_id: this.currentPost.id,
                description: this.$refs.comment.value
              }
              this.$store.dispatch('editPost', data)        
            },
            likeIt(index){
                this.$store.dispatch('like', [index, 2])  
            },
            unlikeIt(index){
                this.$store.dispatch('unlike', [index, 2])  
            },
            deleteComment(index){
              let commentId = this.comments[index].id
              this.$store.dispatch('deleteComment', commentId)  
            }
        },
        computed:{
            ...mapGetters({
              currentPost: 'getPost',
              imageRoot: 'getImageRoot',
              loading: 'getLoading',
              comments: 'getComments'
            }),
        }
    }
</script>