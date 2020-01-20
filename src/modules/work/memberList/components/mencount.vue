<template>
    <div class="mencount">
        <div class="desc">
            <title-line class="t3"
                        :title="title2"
                        :count="true"
                        :countLength = "countLength"
            ></title-line>
        </div>
    </div>
</template>
<script>
    export default {
        components:{},
        props:{
          title2:{
            type:String,
            default:'引领专家'
          },
          countLength:{
              type:Number,
              default: 0
          }
        },
        data() {
            return {
                // title2:'引领专家'
            }
        },
        methods:{
            getAxios() {
            }
        },
        created() {
            this.getAxios()
        }
    }
</script>
<style lang="scss">

</style>
<style scoped lang="scss">
    .mencount{
        .desc{
            text-align: left;
            .t3{
                padding-top: 0px;
            }
            .inner2{
                margin-left: 10px;
            }
            .inner{
                display: inline-block;
                margin-top: 26px;
                width: 130px;
                height: 200px;
                text-align: center;
                .name{
                    margin-top: 10px;
                    font-size: 20px;
                    color: #008CFA;
                }
                .des{
                    color: #444444;
                    font-size: 12px;
                }
                img{
                    width: 90px;
                    border-style: none;
                    height: 90px;
                    border-radius: 90px;
                }
            }
        }
    }
</style>
