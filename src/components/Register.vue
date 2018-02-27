<template>  
  <div class="register">
      <h3 class="login__lang">SRB</h3>
      <h1 class="logo animated fadeIn"><span>Photo</span>gram</h1>
      <div class="form animated lightSpeedIn">
          <form v-on:submit.prevent="handleRegisterFormSubmit()">
              <div class="form__input">
                  <span class="icon icon--mail"></span>
                  <input class="" v-validate="'required|email'" placeholder="Email" type="text" v-model='registeremail' name="email">
                  <span class="form__errors" v-show="errors.has('email')">{{ errors.first('email') }}</span>
              </div>

              <div class="form__input">
                  <span class="icon icon--lock"></span>
                  <input class="" v-validate="'required|min:4|verify_password'" placeholder="Password" type="password" v-model='registerpassword' name="password">
                  <span class="form__errors" v-show="errors.has('password')">{{ errors.first('password') }}</span>
              </div>

              <div class="form__input">
                  <span class="icon icon--lock"></span>
                  <input class="" v-validate="'required|confirmed:password'" placeholder="Confirm Password" type="password" data-vv-as="password" name="password_confirmation">
                  <span class="form__errors" v-show="errors.has('password_confirmation')">{{ errors.first('password_confirmation') }}</span>
              </div>

              <div class="form__input" v-if="!isMobile">
                  <span class="icon icon--name"></span>
                  <input class="" v-validate="'required|alpha'" placeholder="Full Name" type="text" v-model='name' name="name">
                  <span class="form__errors" v-show="errors.has('name')">{{ errors.first('name') }}</span>
              </div>

              <div class="form__input">
                  <span class="icon icon--user"></span>
                  <input class="" v-validate="'required'" placeholder="Username" type="text" v-model='username' @change="checkUsername(username)" name="username">
                  <span class="username-taken form__errors" v-show="usernameExists">This username is taken!</span>
                  <span class="form__errors" v-show="errors.has('username')">{{ errors.first('username') }}</span>
                  <div class="form__errors" v-if='getErrors'>{{ getErrors }}</div>
              </div>
              
              <div class="terms">
                I accept to the 
                <router-link to="/terms"><span>Terms & Privacy Policy</span></router-link>
              </div>             

              <div class="spinner" v-show="loading">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
              </div>

              <div class="g-recaptcha" data-sitekey="6Ldm4EUUAAAAAMy0fm8wCmJ-8WN4DaetWyzm2jb4"></div>

              <button class="btn">Sign Up</button>
          </form>
      </div>
      <div class="switchLogin animated lightSpeedIn">Already have Account? <span><a @click='changeIt'>Log in</a></span></div>

      <transition name="fade">
        <div class="registration__confirm" v-if='confirmRegistration'>You will need to confirm your registration!</div>
      </transition>

  </div>
</template>

<script>

  import Vue from 'vue'
  import {apiDomain, getHeader, userUrl, registerUrl} from '../config'
  import VeeValidate from 'vee-validate';
  import { mapGetters } from 'vuex'

  Vue.use(VeeValidate);

  VeeValidate.Validator.extend('verify_password', {
      getMessage: field => `minimum 8 characters at least 1 number, 1 special character, 1 uppercase`,
      validate: value => {
          var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
          return strongRegex.test(value);
      }
  });

  export default{
    data(){
      return{
          registeremail: '',
          registerpassword: '',
          username: '',
          name: '',
      }
    },
    computed: {      
      ...mapGetters({
        usernameExists: 'getUsernameExists',
        confirmRegistration: 'getConfirmRegistration',
        isMobile: 'getMobile',
        getErrors: 'getErrors',
        loading: 'getLoading',
      })
    },
    methods: {     
      changeIt(){
        this.$emit('changeIt', 'login');
      },
      checkUsername(username){
        this.$store.dispatch('checkUsername', username) 
      },
      handleRegisterFormSubmit (){
        const data = {
          email: this.registeremail,
          username: this.username,
          name: this.name,
          password: this.registerpassword,
          password_confirmation: this.registerpassword
        }
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$store.dispatch('register', data)     
          }
        })
      }
    }
  }
</script>
