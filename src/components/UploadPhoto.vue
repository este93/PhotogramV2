<template>
  <div class="b-upload">
    <div class="b-upload__back" @click="hideUpload"></div>
    <form action="" class="b-upload__content" enctype="multipart/form-data" @submit.prevent="uploadPhoto">
      <h3 class="b-upload__title">Upload Photo</h3>      
      <div class="b-upload__image--inner">
        <div class="b-upload__image">   
          <input type="file" name="media" ref='imageInput' accept="image/*" @change="imagePicked">
          <img :src="imageUrl" alt="" height="500">
          <div class="b-upload__drag" @click="changeImage" v-show="showDragTitle">
            <img class="" src='../assets/img/upload-icon2.png' alt="">
            <h3>drag and drop</h3>              
          </div>
          <div class="spinner" v-show="imageUploading">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
        </div>            
      </div>
      <input type="submit" class="b-upload__button btn" value="Upload">
      <input type="text" class="b-upload__input" v-model="description" placeholder="Add Description">
    </form>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        imageRoot: this.$store.getters.getImageRoot,
        imageUrl: '',
        showDragTitle: true,
        img: '',
        description: '',
        imageUploading: false
      }
    },
    methods: {
      reset() {
        //this.$refs.imageInput = '';
        this.imageUrl = '';
        this.img = '';
        this.description = '';
        this.imageUploading = false;
        this.$store.dispatch('showUpload');
      },
      changeImage(){
        this.$refs.imageInput.click()
      },
      imagePicked(event){
        var formData = new FormData();
        formData.append("image", this.img);
        this.img = event.target.files[0];
        var reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
        }
        reader.readAsDataURL(this.img);
        this.showDragTitle = false;
      },
      uploadPhoto(){
        var self = this;
        var formData = new FormData();
        formData.append("image", this.img);
        formData.append("description", this.description);
        self.imageUploading = true;
        axios.post('/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data' , 'Authorization': 'Bearer ' + JSON.parse(window.localStorage.getItem('authUser')).access_token
          }
        }).then(function(){
          self.reset();
        })
      },
      hideUpload(){    
        this.$store.dispatch('showUpload');
      }      
    }
  }
</script>
