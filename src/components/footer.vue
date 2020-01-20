<template>
    <div class="footer_cpt">
        <div class="inner">
            <div class="pfooter1">
                <span>三名工作室 | 宁波市鄞州区</span>
            </div>
            <div class="pfooter2">
                <span class="s1" @click="link">网站管理</span>
            </div>
        </div>

    </div>
</template>
<script>

    export default {
        components:{},
        data() {
            return {

            }
        },
        methods:{
            link() {
                var user = JSON.parse(sessionStorage.getItem('user'))
                console.log(user)
                if(user&&user.type == 0) {
                    sessionStorage.setItem('adminuser', sessionStorage.getItem('user'))
                    var new_url = '/webAdmin/webAdmin.html#/administrator'
                    window.open(new_url);
                }else{
                    var new_url = '/webAdmin/webAdmin.html#/login'
                    window.open(new_url);
                }
            }
        }
    }
</script>
<style lang="scss">
    .footer_cpt{
        display: flex;
        width: 100%;
        height: 120px;
        background: #104a78;
        align-items: center;
        .inner{
            display: flex;
            width: 1200px;
            margin: auto;
            justify-content: space-between;
            .pfooter1{
                font-size: 20px;
                display: inline-block;
                span{
                    color: #FFFFFF;
                    width: 1200px;
                }
            }
            .pfooter2{
                color: #93D0F8;
                font-size: 14px;
                display: inline-block;
                .s1{
                  cursor: pointer;
                  margin-right: 80px;
                }
                .s2{

                }
            }
        }
    }
</style>
