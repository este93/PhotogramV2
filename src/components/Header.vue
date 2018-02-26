<template>
	<div class="b-header-wrap">
		<div class="b-header--mobile">
			<router-link v-if="search && this.$route.name == 'home'" class="b-header__back" to="/search">
				<img src='../assets/img/search-icon@2x.png' height="29" alt="">	
			</router-link>	
			<div v-else class="b-header__back">
				<div v-if="upload || showComments || imagePopup || likesPopup" @click="closeIt">
					<img src='../assets/img/back.png' height="20" alt="">	
				</div>
				<router-link v-else-if="$routerHistory.hasHistory()" :to="{ path: $routerHistory.previous().path }">
					<img src='../assets/img/back.png' height="20" alt="">	
				</router-link>	
				<router-link v-else to="/home">
					<img src='../assets/img/back.png' height="20" alt="">	
				</router-link>			
			</div>
			<h3 class="b-header__title" v-html="title"></h3>
			<div class="b-header__notif">
				<router-link to="/notifications">
					<img v-if="notifActive & !upload" src='../assets/img/notif-active.png' alt="">
					<img v-else src='../assets/img/notif.png' alt="">
				</router-link>		
			</div>
		</div>
		<header class="b-header" v-if="user">
			<div class="b-header--left">
				<ul>
					<li class="header-home">
						<router-link to="/home">
							<img v-if="homeActive & !upload" src='../assets/img/home-active.png' alt="">
							<img v-else src='../assets/img/home.png' alt="">
						</router-link>
					</li>
					<li class="header-upload header-upload--mob">
						<a href="" @click.prevent="showUploadFunc">
							<img v-if="upload" src='../assets/img/upload-icon-mob-active.png' alt="">
							<img v-else src='../assets/img/upload-icon-mob.png' alt="">
						</a>
					</li>
					<li class="header-profile">
						<router-link :to="'/dashboard/' + user.username">
							<img :src='imageRoot + user.image.avatar' alt="" width="39" height="39">
						</router-link>
						<div class="b-header__submenu">
							<button v-on:click='logout' class="">Logout</button>
						</div>
					</li>
					<li class="header-upload">
						<a href="" @click.prevent="showUploadFunc">
							<img v-if="upload" src='../assets/img/upload-icon-active.png' alt="">
							<img v-else src='../assets/img/upload-icon.png' alt="">
						</a>
					</li>
					<li class="header-like">
						<router-link to="/notifications">
							<img v-if="notifActive & !upload" src='../assets/img/like-icon-active.png' alt="">
							<img v-else src='../assets/img/like-icon.png' alt="">
						</router-link>
					</li>
				</ul>
			</div>
			<div class="b-header--center">
				<h3><a href="" class="b-header__title">photo<span>gram</span></a></h3>
			</div>
			<div class="b-header--right">
				<router-link to="/search" class="b-header__search">
					<img v-if="search & !upload" src='../assets/img/search-icon-active.png' alt="">
					<img v-else src='../assets/img/search-icon.png' alt="">
				</router-link>
				<div class="b-header__language">
					SRB
				</div>
			</div>
		</header>

		<UploadPhoto v-show="upload"></UploadPhoto>		
	</div>
</template>
<script>

	import UploadPhoto from './UploadPhoto.vue'
	import { mapGetters } from 'vuex'

	export default{
		data(){
            return{
               titleD: this.$store.getters.title,
            }
        },
        components: {UploadPhoto},
        methods:{
        	showUploadFunc(){
            	this.$store.dispatch('showUpload');
                if(this.upload){
            		this.$store.dispatch('updateTitle', 'Upload');
                }else{
            		this.$store.dispatch('updateTitle', this.titleD);
                }
        	},
        	closeIt(){
            	this.$store.commit('headerCloseAll');
            	this.$store.dispatch('updateTitle', this.titleD);
            	this.$store.commit('setSearchIcon');
        	},
            logout: function () {
      			this.$store.commit('logout');
            }
        },
        computed: {
            ...mapGetters({
		      title: 'title',
		      search: 'getSearchIcon',
		      homeActive: 'getHomeIcon',
		      notifActive: 'getNotificationIcon',
		      upload: 'upload',
		      showComments: 'getCommentsPopup',
		      user: 'getLoggedUser',
		      imagePopup: 'getImagePopup',
		      likesPopup: 'likesPopup',
		      imageRoot: 'getImageRoot'
		    })
        }
	}
</script>
