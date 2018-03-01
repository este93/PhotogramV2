<template>
	<div class="b-comments b-photos-popup">
    <div class="b-upload__back" @click="hideComments"></div>
		<div class="b-comments__content">
      <div class="b-comments--outer">
			   <div class="b-comments--inner">
            <div v-if="addingComment" class="b-comments__form">
                <form action="" @submit.prevent="addComment" class="c-profile-edit__form">
                    <img class="b-comments__form__icon" src='../assets/img/comment-icon@2x.png' alt="">
                    <textarea placeholder="Comment" class="c-profile-edit__input" ref="comment" name="comment" v-model="commentBody"></textarea>
                    <input type="submit" value="Save" class="c-profile-edit__submit">
                </form>
            </div>
    				<div class="b-comments__single" v-for="(com, index) in comments">
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
        data(){
        	return{        		
                commentBody: ''
        	}
        },
        methods: {
        	hideComments(){    
        		this.$store.dispatch('hideComments')   
            this.$store.commit('resetPost');       
        	},
            addComment(submitEvent){
              let self = this
              let data = {
                post_id: this.currentPost.id,
                body: this.commentBody
              }
              axios.post('comments/', data).then(response => {
                 this.$store.dispatch('setComments', self.currentPostIndex)   
                 this.commentBody = ''    
              })
            },
            likeIt(index){
                this.$store.dispatch('like', [index, 2])  
            },
            unlikeIt(index){
                this.$store.dispatch('unlike', [index, 2])  
            },
        },
        computed:{
            ...mapGetters({
              addingComment: 'addCommentPopup',
              currentPost: 'getPost',
              imageRoot: 'getImageRoot',
              loggedUser: 'getLoggedUser',
              currentPostIndex: 'getCurrentPostIndex',
              comments: 'getComments'
            })
        }
    }
</script>