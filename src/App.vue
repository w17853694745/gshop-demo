<template>
  <div>
    <router-view/>
    <FooterGuide v-show="$route.meta.isFooterShow"/>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  import {autoLogin} from './api'
  import {MessageBox} from 'mint-ui'
  export default {
    name:'App',
    components:{
      FooterGuide
    },
    mounted() {
      this.$store.dispatch("auto_Login")
    },
  }
</script>

<style>

</style>
