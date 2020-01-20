<template>
    <div id="app">
<!--        <HelloWorld msg="页面1：ceshi1 "/>-->
<!--        <p>页面1URL：http://localhost:8081</p>-->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    components: {}
}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    body{
        margin: 0px;
    }
    html{
        overflow-y: overlay;
    }
</style>
