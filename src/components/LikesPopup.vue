<template>
	<div class="o-photo__likes__popup b-comments b-photos-popup">
   		<div class="b-upload__back" @click="hideLikesPopup"></div>
		<div class="b-comments__content">
			<div class="b-comments--outer">
				<div class="b-comments--inner">
					<div class="b-comments__single" v-for="like in likes">
						<div class="b-comments__single--left">
							<div class="b-comments__img">   
								<img :src="imageRoot + like.image.comment" alt="" v-if="like.image" width="35" height="35">            
	                        </div>
							<p class="b-comments__txt"><span>{{ like.username }}</span></p>
						</div>
						<div class="b-comments__single--right">
	                        
						</div>
					</div>	
					<div class="spinner" v-show="loading">
					  <div class="double-bounce1"></div>
					  <div class="double-bounce2"></div>
					</div>			
				</div>
			</div>	
		</div>
	</div>
</template>

<script>
    import { mapGetters } from 'vuex'

	export default{
		computed: {	
            ...mapGetters({
              likes: 'getLikes',
              loading: 'getLoading',
              imageRoot: 'getImageRoot'
            })
		},
		methods:{			
        	hideLikesPopup(){    
        		this.$store.commit('showLikesPopup')
        		this.$store.commit('hideLikesPopup')

        	},
		}
	}
</script>