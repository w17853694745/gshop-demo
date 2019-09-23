<template>
  <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">{{$t('title')}}</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="logtype?'on':''" @click="logtype=true">{{$t('sms')}}</a>
            <a href="javascript:;" :class="!logtype?'on':''" @click="logtype=false">{{$t('pwd')}}</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <div :class="logtype?'on':''">
              <section class="login_message">
                <input type="tel" maxlength="11" :placeholder="$t('phone')" name="phone" v-model="phone" v-validate="{required: true,regex: /^1\d{10}$/}">
                <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
                <button :disabled="!isRightPhone||countdown>0" class="get_verification" @click.prevent="getcode" :class="{right_phone_number:isRightPhone}">{{countdown>0?`已发送验证码(${countdown}s)`:$t('send')}}</button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" :placeholder="$t('code')" name="code" v-model="code" v-validate="{required: true}">
                <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
              </section>
              <section class="login_hint">
                {{$t('msg')}}
                <a href="javascript:;">{{$t('agreement')}}</a>
              </section>
            </div>
            <div :class="!logtype?'on':''">
              <section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" name="name" v-model="name" v-validate="{required: true}">
                  <span style="color: red;" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                </section>
                <section class="login_verification">
                  <input :type="isShowPwd?'text':'password'" maxlength="8" placeholder="密码" name="pwd" v-model="pwd" v-validate="'required'">
                  <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
                  <div class="switch_button" @click="isShowPwd = !isShowPwd" :class="isShowPwd?'on':'off'">
                    <div class="switch_circle" :class="isShowPwd?'right':''"></div>
                    <span class="switch_text">{{isShowPwd?'abc':''}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" name="captcha" v-model="captcha" v-validate="'required'">
                  <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
                  <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="setcaptcha" ref="captcha2">
                </section>
              </section>
            </div>
            <button class="login_submit" @click.prevent="login">{{$t('login')}}</button>
          </form>
          <a href="javascript:;" class="about_us">{{$t('AboutUs')}}</a>
          <a href="javascript:;" class="about_us" style="color:blue" @click="lang">{{language?'语言':'language'}}:{{language?'中文':'English'}}</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.go(-1)">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
    </section>
</template>

<script type="text/ecmascript-6">
  import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../api'
  import { Toast, MessageBox } from 'mint-ui'
  export default {
    data() {
      return {
        logtype:true, //登录类型:true 短信登录 / false 密码登录
        phone:'', //手机号
        code:'', //验证码
        name:'', //密码登录
        pwd:'', //密码
        captcha:'', //图片验证码
        countdown:0, //剩余时间
        isShowPwd:false, //密码是否可见
        language:true, //语言:true 中文 / false 英文
      }
    },
    computed: {
      isRightPhone(){
        //return /^1\d(10)$/.test(this.phone)
        return /^1\d{10}$/.test(this.phone)
      }
    },
    methods: {
      async getcode(){
        if (this.countdown>0) {
          return
        }
        this.countdown = 10
        const timeId = setInterval(() => {
          this.countdown--
          if (this.countdown<=0) {
            clearInterval(timeId)
          }
        }, 1000)
        const result = await reqSendCode(this.phone)
        if (result.code === 0) {
          //发送成功
          Toast('已发送验证码')
        }else{
          this.countdown = 0
          MessageBox("提示",result.msg)
        }
      },
      async login(){
        let names
        if (this.logtype) {
          names = ['phone', 'code']
        }else{
          names = ['name', 'pwd', 'captcha']
        }
        const success = await this.$validator.validateAll(names) // 对所有表单项进行验证
        if (success) {
          const {phone,code,name,pwd,captcha} = this
          let result
          if (this.logtype) { //短信登录
            result = await reqSmsLogin({phone,code})
            // 停止倒计时
            this.countdown = 0       
          }else{ //密码登录
            result = await reqPwdLogin({name,pwd,captcha})
            if (result.code === 1) {
              // 再次请求svg图片
              this.setcaptcha()
            }
          }
          if (result.code===0) { //登录成功
            // 保存user
            const user = result.data
            //保存loken
            localStorage.setItem("token_id",user.token)
            this.$store.dispatch("saveUser",user)
            // 跳转到个人
            this.$router.replace("/profile")
          }else{
            //登录失败
            MessageBox("提示",result.msg)
          }
        }
      },
      setcaptcha(){
        this.$refs.captcha2.src = `http://localhost:4000/captcha?time=${Date.now()}`
      },
      lang(){
        this.language = !this.language
        this.$i18n.locale = this.language?'zh_CN':'en'
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                .right_phone_number
                  color black  
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(27px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>
