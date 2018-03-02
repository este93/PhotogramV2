<template>
    <div class="wrapper" id="main-wrapper">
        <app-header></app-header>
        <div class="wrapper-inner">
            <photo></photo>
        </div>
    </div>
</template>

<script>
    import Photo from '../components/Photo.vue'

    export default{
        components: {
            Photo
        },
        created(){
            this.$store.dispatch('updateTitle', 'photo<span>gram</span>');
            this.$store.dispatch('setHomePage');                       
            this.$store.dispatch('resetPosts') 
            this.$store.commit('resetUser')
        }
    }
</script>
