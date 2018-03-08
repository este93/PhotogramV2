<template>  
  <div class="login">
    <div class="login_back"></div>
    <div class="login__holder">
      <h3 class="login__lang">SRB</h3>
      <h1 class="logo__white animated fadeIn"><span>Photo</span>gram</h1>
      <div class="form animated lightSpeedIn">
          <form v-on:submit.prevent="handleLoginFormSubmit()">
              <div class="form__input">
                  <span class="icon icon--user"></span>
                  <input class="" placeholder="Email/Username" type="text" v-model='email'>
              </div>

              <div class="form__input">
                  <span class="icon icon--lock"></span>
                  <input class="" placeholder="Password" type="password" v-model='password'>
              </div>

              <div class="form__errors" v-if='getErrors'>{{ getErrors }}</div>

              <a class="forgotPassword" href='/forgot'>Forgot password?</a>
              <button class="btn">Log in</button>
          </form>
      </div>
      <div class="switchLogin animated lightSpeedIn">Don't have account? <span><a @click='changeIt'>Sign up</a></span></div>
    </div>
  </div>
</template>

<script>

  export default{
    data(){
      return{
        email: 'stefan.petkovic@diwanee.com',
        password: '1'
      }
    },
    methods: {     
      changeIt(){
        this.$emit('changeIt', 'register');
      },
      handleLoginFormSubmit (){
        const postData = {
            email: this.email,
            password: this.password
        }
        this.$store.dispatch('login', postData);       
      }      
    },
    computed: {
      getErrors(){
        return this.$store.getters.getErrors
      }
    }
  }
</script>

<style>
  body{
     padding-top: 0;
  }
  .login_back{
    background: url(../assets/img/background.jpg) no-repeat;  
    background-size: cover; 
  }
  .login_back:after{
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #212227;
  }
</style>
