<template>
  <div class="b-upload">
    <div class="b-upload__back" @click="hideUpload"></div>
    <form action="" class="b-upload__content" enctype="multipart/form-data" @submit.prevent="uploadPhoto">
      
      <div class="b-upload__capture">
        <vue-webcam ref='webcam'></vue-webcam>
        <!-- <img :src="photo" alt="" style="width:400px;height:300px" /> -->
        <button type="button" class="btn" @click="take_photo">Take Photo</button>
        <!-- <button type="button" class="btn" @click="uploadPhoto">Upload Photo</button>         -->
      </div>

      <h3 class="b-upload__title">Upload Photo</h3>      
      <div class="b-upload__image--inner">
        <div class="b-upload__image">   
          <input type="file" name="media" ref='imageInput' accept="image/*" @change="imagePicked">
          <img :src="photo" alt="" width="500">
          <div class="b-upload__drag" @click="changeImage" v-show="showDragTitle">
            <img class="" src='../assets/img/upload-icon2.png' alt="">
            <h3>drag and drop</h3>              
          </div>
          <div class="spinner" v-show="loading">
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
  import VueWebcam from 'vue-webcam'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      VueWebcam
    },
    computed:{
      ...mapGetters({
        loading: 'getLoading',
        photo: 'getPhoto',
        showDragTitle: 'getDragTitle',
        description: 'getDescription'
      })
    },
    methods: {
      changeImage(){
        this.$refs.imageInput.click()
      },           
      take_photo (event) {  
        let data = {
          refs: this.$refs.webcam.getPhoto()
        }
        this.$store.dispatch('takePhoto', data)      
      },
      imagePicked(event){
        this.$store.dispatch('imagePicked', event)        
      },
      uploadPhoto(){
        let data = {
          description: this.description
        }
        let self = this
        this.$store.dispatch('uploadPhoto', data);           
      },
      hideUpload(){    
        this.$store.dispatch('showUpload');
      }      
    }
  }
</script>
