<template>
  <div class="b-upload">
    <div class="b-upload__back" @click="hideUpload"></div>
    <form action="" class="b-upload__content" enctype="multipart/form-data" @submit.prevent="uploadPhoto">
      
      <div class="b-upload__capture" v-if="!isMobile">
        <vue-webcam ref='webcam'></vue-webcam>
        <!-- <img :src="photo" alt="" style="width:400px;height:300px" /> -->
        <button type="button" class="btn" @click="take_photo">Take Photo</button>
        <!-- <button type="button" class="btn" @click="uploadPhoto">Upload Photo</button>         -->
      </div>

      <h3 class="b-upload__title">Upload Photo</h3>      
      <div class="b-upload__image--inner">
        <div class="b-upload__image" v-if="!isMobile">   
          <input type="file" name="media" ref='imageInput' accept="image/*" @change="imagePicked" capture="camera">
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
        <div class="b-upload--mob" v-if="isMobile">
          <image-uploader 
            class="b-upload--mob__wrap" 
            :autoRotate='true' 
            @input="imagePickedMob" 
            @onUpload="startImageResize" 
            @onComplete="asd"
            :maxWidth="700">          
          </image-uploader> 
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
  import { mapGetters } from 'vuex'
  import VueWebcam from 'vue-webcam'
  import { ImageUploader } from 'vue-image-upload-resize'

  export default {
    components: {
      VueWebcam,
      ImageUploader
    },
    data(){
      return{
        description: ''
      }
    },
    computed:{
      ...mapGetters({
        loading: 'getLoading',
        photo: 'getPhoto',
        showDragTitle: 'getDragTitle',
        isMobile: 'getMobile',
        // description: 'getDescription'
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
      startImageResize(){
        this.$store.commit('setLoading')
      },
      asd(){
        this.$store.commit('setLoading')
      },
      imagePicked(event){
        this.$store.dispatch('imagePicked', event)   
      },
      imagePickedMob(event){
        let data = {
          refs: event
        }
        this.$store.dispatch('takePhoto', data)
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
