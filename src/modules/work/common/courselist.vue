<template>
<div class="pCommon">
    <div class="all_course">
        <div class="c" :class="index%4 == 0?'firse_course':'courseD'" @click="linkCoursed(item.courseId)" v-for="(item,index) in data" :key="index">
            <div class="sptp">
                <img class="img1" :src="item.courseThumbnail">
                <img class="img2" src="../../../assets/icon_player.png">
            </div>
            <div class="title">
                {{item.courseName}}
            </div>
            <div class="title2">
                <span>{{item.fullName}}</span>
                <span class="date">2019-10-23</span>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
      return {
          data:[]
      }
    },
    methods:{
        linkCoursed(val) {
            console.log(sessionStorage.getItem('user'))
            if(sessionStorage.getItem('user')) {
                this.$router.push({path:'/pg_courseD',query:{id:val}})
            }else{
                alert('登录后查看')
            }
        },
        getCoursePage(val) {
            var url = this.GLOBAL.baseURL + "/portal/course/page?page=1&size=10&studioId="+sessionStorage.getItem('studioId')
            this.$http.get(url).then(res => {
                console.log(res)
                this.data = res.data.data.data
                // console.log(this.data)
                // for(var i = 0; i < this.data.length;i++) {
                //     console.log(this.data[i].gmtCreate.split(""))
                // }
            })
        },
    },
    mounted() {
        this.getCoursePage()
    }
}
</script>
<style scoped lang="scss">
.pCommon{
    .all_course{
        width: 839px;
        height: 230px;
        margin-top: 30px;
        .courseD{
            width:200px;
            height:230px;
            margin-left:13px
        }
        .c{
            margin-top: 12px;
            vertical-align: top;
            display: inline-block;
            width:200px;
            height:250px;
            border:1px solid rgba(234, 234, 234, 1);
            cursor:pointer;
            .sptp{
                width:180px;
                height:136px;
                margin: auto;
                margin-top: 10px;
                position: relative;
                .img1{
                    width: 100%;
                    height: 100%;
                }
                .img2{
                    position: absolute;
                    left: 0px;
                    right: 0px;
                    top: 0px;
                    bottom: 0px;
                    margin: auto;
                }
            }
            .title{
                width: 180px;
                font-size: 16px;
                margin: auto;
                margin-top: 18px;
                text-align: left;
                height: 48px;
            }
            .title2{
                display: flex;
                justify-content: space-between;
                width: 180px;
                margin: auto;
                margin-top: 10px;
                .date{
                    color: #AAAAAA;
                }
            }
        }
    }
}
</style>
