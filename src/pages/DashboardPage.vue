<template>
    <div class="b-profile" id="dashboard-wrapper">
        <app-header></app-header>
        <div class="wrapper-inner">
            <div class="b-profile__top" v-if="user">
                <!-- <router-link class="btn" to="/camera">Take photo</router-link> -->
                <button @click="takePhoto = !takePhoto" class="btn">Take Photo</button>
                <h3 class="b-profile__top__name">{{ user.username }}</h3>
                <div class="b-profile__top__content">                
                    <div class="b-profile__top--left">
                        <div class="b-profile__top__img">
                            <img :src="imageRoot + user.image.profile" alt="">
                        </div>
                    </div>
                    <div class="b-profile__top--right">
                        <p><span>{{ user.posts_count }}</span>posts</p>
                        <p><span>{{ user.followers_count }}</span>followers</p>
                        <p><span>{{ user.following_count }}</span>following</p>
                    </div>
                </div>
                <p class="b-profile__top__info">{{ user.about }}</p>
                
                <router-link v-if="personalPage" :to="'/profile-edit/' + this.$route.params.username" class="b-profile__top__edit" >Edit Profile</router-link>
                <div v-else>
                    <transition name="show">
                        <button v-show="user.auth_follow" @click="unfollow" class="b-profile--follow b-profile__top__edit">Following</button>
                    </transition>
                    <transition name="show">
                        <button v-show="!user.auth_follow" @click="follow" class="b-profile--follow b-profile__top__edit">Follow</button>
                    </transition>
                </div>    

            </div>

            <div class="b-profile__grid">
                <button @click="changeGrid"><img src='../assets/img/profile-grid.png' alt=""></button>
                <button @click="changeGrid"><img src='../assets/img/profile-grid.png' alt=""></button>
            </div>    

            <div :class="{'b-profile--photo' : !grid, 'b-profile--grid' : grid}">
                <photo></photo>                
            </div>

            <takePhoto v-show="takePhoto"></takePhoto>    

        </div>       
    </div>
</template>

<script>
    import {apiDomain, getHeader, userUrl} from './../config'
    import Photo from '../components/Photo.vue'
    import takePhoto from '../components/CameraView.vue'
    import { mapGetters } from 'vuex'

    export default{
        components: {
            Photo,
            takePhoto
        },
        data(){
            return{
                personalPage: '',
                takePhoto: false
            }            
        },
        created(){
            this.$store.dispatch('setProfilePage')
            this.$store.dispatch('resetPosts')
            this.$store.dispatch('updateTitle', this.$route.params.username)
            this.$store.dispatch('findUser', this.$route.params.username)
        },
        methods: {
            changeGrid(){
                this.$store.commit('setGrid')
            },
            follow(){
                this.$store.dispatch('follow');
            },
            unfollow(){
                this.$store.dispatch('unFollow');
            }
        },
        computed: {
            ...mapGetters({
              grid: 'getGrid',
              loggedUser: 'getLoggedUser',
              imageRoot: 'getImageRoot',
              windowWidth: 'getWindowWidth',
            }),
            user(){ 
                if(this.loggedUser){
                    if(this.$route.params.username == this.loggedUser.username){
                        this.personalPage = true;
                        return this.loggedUser
                    }else{
                        this.personalPage = false;
                        return this.$store.getters.getUserInfo
                    }  
                }
            }
        },
        beforeCreate(){
            if(window.localStorage.getItem('firstInit')){
                this.$router.go(this.$router.currentRoute)
            }            
            window.localStorage.removeItem('firstInit')
        }
    }
</script>
