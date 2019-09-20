<template>
  <div>
    <router-view/>
    <FooterGuide v-show="$route.meta.isFooterShow"/>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  export default {
    name:'App',
    components:{
      FooterGuide
    }
  }
</script>

<style>

</style>
