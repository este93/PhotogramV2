<template>
  <div class="wrapper" id="home-wrapper">
      <h1>Welcome to <span>Photogram</span></h1>
      <section class="login">
          <div class="row">
            <div class="col-md-6 col-md-push-3">

                <div class="panel panel-default">
                    <div class="panel-heading"><strong>Forgot Your Password</strong></div>
                        <div class="panel-body">
                            <form v-on:submit.prevent="handleResetFormSubmit()">
                                <div class="form-group">
                                    <label>Email address</label>
                                    <input class="form-control" placeholder="Enter your email adress" type="email" v-model='email'>
                                     <div class="message">{{ validation.firstError('email') }}</div>
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input class="form-control" placeholder="Enter Your Password" type="password" v-model='password'>
                                      <div class="message">{{ validation.firstError('password') }}</div>
                                </div>
                                <div class="form-group">
                                    <label>Repeat Password</label>
                                    <input class="form-control" placeholder="Enter Your Password Again" type="password" v-model='repeat'>
                                      <div class="message">{{ validation.firstError('repeat') }}</div>
                                </div>

                                <button class="btn btn-primary">Send</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
      </section>
  </div>
</template>

<script>
import config from '../../config'

import Vue from 'vue'


function getParameterByName(name, url) { if (!url) { url = window.location.href; } name = name.replace(/[\[\]]/g, "\\$&"); var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url); if (!results) return null; if (!results[2]) return ''; return decodeURIComponent(results[2].replace(/\+/g, " ")); }
const getToken = getParameterByName('token')
export default {

    data(){
        return{
            email: '',
            password: '',
            repeat: '',
            submitted: false
        }
    },
    validators: {
        email: function(value) {
          return Validator.value(value).required().email();
      },
      password: function (value) {
        return Validator.value(value).required().minLength(6);
      },
      'repeat, password': function (repeat, password) {
        if (this.submitted || this.validation.isTouched('repeat')) {
          return Validator.value(repeat).required().match(password);
        }
    },
    },
    methods:{
        handleResetFormSubmit (){
            const postData = {
                email: this.email,
                password: this.password,
                password_confirmation: this.repeat,
                token: getToken

            }
            this.$http.post(config.resetPassword, postData)

            .then(response => {
                if (response.status === 200){
                    toastr.success('New password has been added !')

                    setTimeout(
                        this.$router.push({name: 'home'})
                    ,3000);
                    // this.$http.get(apiDomain, {headers: getHeader()})
                    // this.$router.push({name: 'dashboard'})
                    // .then(response => {
                    //     window.localStorage.setItem('authUser', JSON.stringify(authUser))
                    //     this.$router.push({name: 'dashboard'})
                    // })
                }
            }, (response) => {
              toastr.warning('Something went wrong !')
        });
    }
}
}
</script>

<style lang="scss" scoped>
   // @import '../../assets/css/bootstrap.css';

    .row{
        margin: 3% auto;
    }
    .fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
    h1{
        text-align: center;
        margin-top: 10rem;
        span{
            color: orange;
        }
    }
    .login{
        transition: .5s all ease-in;
    }
    .nav-tabs{
        background-color:#158cba;
        border-bottom: 1px solid #158cba;
        a{
            border:0;
            margin: 0;
            cursor: pointer;
            color: #fff;
                padding: 15px 25px;
            &:hover{
                padding: 15px 25px;
                border-radius: 0;
                color: #000;
            }
        }
        .active{
                background-color:orange;
                    color: #fff;
                    border-radius:0;
        }
    }
    .message{
        color: red;
    }
</style>
