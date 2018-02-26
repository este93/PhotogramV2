<template>
    <div class="p-profile-edit wrapper" id="dashboard-wrapper">
	    <app-header></app-header>
	    <div class="wrapper-inner">
			<div class="c-profile-edit" v-if="user">
				<div class="c-profile-edit__top">
					<h3 class="c-profile-edit__top__title">Edit Profile</h3>
					<div class="c-profile-edit__top__img" @click="changeImage">
						<img v-if="image" :src="image" alt="" width="220" height="220">
						<img v-else :src="imageRoot + user.image.profile_large" alt="" width="220" height="220">
					</div>
					<form action="" class="hide" enctype="multipart/form-data">
						<input type="file" name="image" ref='imageInput' accept="image/*" @change="imagePicked">
					</form>
					<h4 class="c-profile-edit__top__change" @click="changeImage">Change Photo</h4>
					<div class="spinner" v-show="imageUploading">
					  <div class="double-bounce1"></div>
					  <div class="double-bounce2"></div>
					</div>
				</div>
				<form action="" @submit.prevent="editProfile" class="c-profile-edit__form">
					<input type="text" placeholder="Name" class="c-profile-edit__input" name="name" v-model="user.name">
					<input type="text" v-bind:class="{error: usernameExists}" placeholder="username" class="c-profile-edit__input" @change="checkUsername(user.username)" v-model="user.username">
					<input type="text" placeholder="Something about you" class="c-profile-edit__input" v-model="user.about">
<!-- 				<input type="text" placeholder="Email Address" class="c-profile-edit__input" v-model="email">
 -->				<input type="text" placeholder="Phone Number" class="c-profile-edit__input" v-model="user.phone">
					<div class="c-profile-edit__input c-profile-edit__input--radio">
						<input type="radio" value="1" name="" v-model="user.gender_id">
						<label for="one">Male</label>

						<input type="radio" value="2" name="" v-model="user.gender_id">
						<label for="one">Female</label>						
					</div>
					<button class="c-profile-edit__logout">Log Out</button>
					<input type="submit" value="Save" class="c-profile-edit__submit">

				</form>
			</div>
		</div>	
	</div>
</template>

<script>
    import { mapGetters } from 'vuex'

	export default{
		data(){
			return{
				image: false,
				imageUploading: false,
				currentUsername: this.$route.params.username,
				editing: false
			}
		},
		created(){	
            this.$store.dispatch('updateTitle', 'Edit Profile');            
		},
		computed: {
            ...mapGetters({
              user: 'getLoggedUser',
              usernameExists: 'getUsernameExists',
              imageRoot: 'getImageRoot'
            })
		},
		methods: {
			editProfile(){
				var self = this
				this.checkUsername();
				if(!this.usernameExists){
					console.log('asd')
					self.imageUploading = true;
					axios.patch('users/auth/update',{ 
						name: this.user.name, 
						username: this.user.username, 
						about: this.user.about, 
						// email: this.user.email, 
						phone: this.user.phone, 
						gender_id: this.user.gender_id
					})
					.then(function(response){
						self.imageUploading = false;
						self.$router.push({ name: 'profile-edit', params: { username: self.user.username }})
					}); 
				}
			},
			checkUsername(username){	
				if(this.user.username !== this.currentUsername){
					this.$store.dispatch('checkUsername', username)				
				}
			},
			changeImage(){
				this.$refs.imageInput.click()
			},
			imagePicked(event){
				var self = this;
				var img = event.target.files[0];
				var formData = new FormData();
				formData.append("image", img);
				self.imageUploading = true;
				axios.post('/users/auth/image', formData, {
				    headers: {
				      'Content-Type': 'multipart/form-data' , 'Authorization': 'Bearer ' + JSON.parse(window.localStorage.getItem('authUser')).access_token
				    }
				}).then(function(response){
					var reader = new FileReader();
	                reader.onload = function(e) {
	                    self.image = e.target.result;
	                    self.imageUploading = false
				    }
	                reader.readAsDataURL(img);
	                axios.get('/users/auth/').then(function(response){
	                	self.$store.dispatch('loginUser');
	                })
			    })
			}
		},
	}
</script>