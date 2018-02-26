<template>
  <div class="wrapper" id="home-wrapper">      
    <section class="smallWrapper">   
      <component :is="component" @changeIt="changeTemplate"></component>
    </section>
 </div>
</template>

<script>

  import Login from './components/Login.vue'
  import Register from './components/Register.vue'

  export default {
      components: {
        Login, 
        Register
      },
      data(){
          return{       
             component: 'login',    
             show: true
          }
      },
      methods:{
        changeTemplate(value){
          this.component = value;        
        }
      },
      created(){
        
      }
  }
</script>
