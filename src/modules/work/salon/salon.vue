<template>
    <div class="plaza_salon">
      <div class="main">
        <salonList></salonList>
<!--        <salonRight></salonRight>-->
      </div>
    </div>
</template>
<script>
import salonList from './component/salonList'
// import salonRight from './component/salonRight'
export default {
    components:{salonList},
    data() {
        return {

        }
    }
}
</script>
<style>
.plaza_salon{
    display: inline-block;
}
</style>
