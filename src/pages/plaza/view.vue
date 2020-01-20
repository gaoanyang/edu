
<template>
    <div class="main">
<!--        <div>名师工作室公共Title</div>-->
        <navigation></navigation>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>
<script>
    /* eslint-disable */
    import Footer from '../common/plaza_footer'
    import navigation from '../common/plaza_nav'
    /* eslint-disable */
    export default {
        components:{navigation,Footer},
        data() {
            return {

            }
        }
    }
</script>
<style>
</style>
