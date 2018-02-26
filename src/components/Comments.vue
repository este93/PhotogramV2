<template>
	<div class="o-photo__comments">
        <div class="o-photo__comments__single" v-if="post.description">
            <div class="o-photo__comments__img">
                <img :src="imageRoot + post.user_image.comment">
            </div>
            <h3 class="o-photo__comments__txt">{{ post.description }}</h3>
        </div>

        <div class="o-photo__comments__single" v-for="comment in filteredComments" v-if="post.comments">
            <div class="o-photo__comments__img">
                <img :src="imageRoot + comment.user_image.comment" v-if="comment.user_image">
            </div>
            <h3 class="o-photo__comments__txt">{{comment.body}}</h3>
        </div>
        <h3 class="o-photo__comments__all" v-if="post.comments_count >=5" @click="openComments(currentPostIndex)">view all comments</h3>
    </div>
</template>

<script>
    import {rootUrl} from '../config'
	export default{
        props: ['post', 'index'],
        data(){
        	return{     
                imageRoot: this.$store.getters.getImageRoot,   		
        	}
        },
        methods: {
            openComments(index){
                this.$store.dispatch('openComments', index)
            }
        },
        computed:{
            currentPostIndex(){
                if(this.$store.state.imagePopupActive){                    
                    return this.$store.state.currentPostIndex
                }
                else{
                    return this.index
                }
            },
            filteredComments(){
                if(this.post.comments_count >=5){
                    return this.post.comments.slice(0,2);
                }else{
                    return this.post.comments
                }
                
            }
        }
    }
</script>