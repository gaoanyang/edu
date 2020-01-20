<template>
    <div class="plaza_home">
        <div>名师导航页 专家文章</div>
        <left_nav
                :title=title
                :mainList=mainList
        >
        </left_nav>
        <router-view></router-view>
    </div>
</template>
<script>
    import left_nav from '../common/left_nav'
    export default {
        components:{left_nav},
        data() {
            return {
                title:'名师领航',
                mainList:['专家文章','名师课程','学习资源']
            }
        }
    }
</script>
<style>

</style>
