<template>
    <div class="tea_coursecite">
        <Button @click="link">返回</Button>
        <p class="p1">引用课程</p>
        <div class="main1">
          <div class="d1">
            <span class="s1">查询条件</span>
          </div>
            <mul_cdts
                @courselist = "getCourseList"
            ></mul_cdts>
            <Table ref="selection" :columns="columns4" :data="data1"></Table>
        </div>
    </div>
</template>
<script>
    import mul_cdts from '../common/mul_cdts'
    export default {
        components:{mul_cdts},
        data () {
            return {
                columns4: [
                    {
                        title: '课程名称',
                        key: 'rscName',
                        width:300
                    },
                    {
                        title: '主讲人',
                        key: 'speaker',
                        width:300
                    },
                    {
                        title: '课程类型',
                        key: 'itemText',
                        width:150
                    },
                    {
                        title: '修改时间',
                        key: 'updateDate',
                        width:200
                    },
                    {
                        title: '预览',
                        key: 'address',
                        width:100,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({path:'/admin/preview',query:{id:params.row.logRscId}})
                                        }
                                    }
                                }, '预览'),
                            ])
                        }
                    },
                    {
                        title: '引用课程',
                        key: 'address',
                        width:100,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginLeft: '10px'
                                    },
                                    on: {
                                        click: () => {
                                                this.$Modal.confirm({
                                                    title: '你是否引用此课程！',
                                                    content: '<p>通过后网页上将会出现该视频</p>',
                                                    onOk: () => {
                                                        console.log(params.row)
                                                        var message = {
                                                            "courseName":params.row.rscName,
                                                            "courseThumbnail":params.row.firstImage,
                                                            "courseIntroduction":params.row.rscDesc,
                                                            "courseType":params.row.rscType,
                                                            "courseModule":params.row.crsMod,
                                                            "courseSpecialSubject":params.row.crsSeminar,
                                                            "studioId":JSON.parse(sessionStorage.getItem("user")).studioId,

                                                        }
                                                        var url = this.GLOBAL+"/fzw/course/vid/"+params.row.logRscId
                                                        this.$http.get(url,{
                                                            headers:{
                                                                'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")).access_token
                                                            }
                                                        }).then(res => {
                                                            var data = res.data.data
                                                            var courseVideoList1 = []
                                                            for(var i = 0;i < data.length;i++) {
                                                                var obj = {}
                                                                obj.videoName = data[i].rscName
                                                                obj.videoImage = data[i].firstImage
                                                                obj.vid = data[i].vid
                                                                courseVideoList1.push(obj)
                                                            }
                                                            message.courseVideoList = courseVideoList1
                                                            console.log(message)

                                                            var url = this.GLOBAL+"/board/course"
                                                            this.$http.post(url, message,{
                                                                headers:{
                                                                    'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")).access_token
                                                                }
                                                            }).then(res => {
                                                                console.log(res)
                                                                if(res.data.code == 0){
                                                                    alert("新增成功")
                                                                    // this.$router.go(-1)
                                                                }
                                                            })

                                                        })
                                                    },
                                                    onCancel: () => {

                                                    }
                                                })
                                        }
                                    }
                                },"引用课程")
                            ])
                        }
                    }
                ],
                data1: [
                ],
                course: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                ],
                model1: '',
                model2: '',
                model3: '',
                model4: '',
                phone: 'apple',
            }
        },
        methods:{
            getCourseList(val) {
              console.log(val)
                this.data1 = val
            },
            link() {
                this.$router.push({path:'/admin/tea_course'})
            }
        },
    }
</script>
<style lang="scss">
.tea_coursecite {
    .ivu-input-wrapper{
        .ivu-input{
            width: 150px;
        }
        .ivu-input-group-append{
            height: 32px;
        }
    }
}
</style>
<style lang="scss" scoped>
    .tea_coursecite {
        padding-left: 50px;
        text-align: left;
        .p1{
            font-size: 20px;
            margin-top: 10px;
            margin-bottom: 30px;
        }
        .ivu-btn {
            width: 120px;
            height: 50px;
        }
        .main1{
            width: 1500px;
            height: 27px;
            line-height: 27px;
            border: 1px solid #E7E7E7;
          .d1{
              color: #AAAAAA;
              .s1{
                  padding-left: 10px;
              }
          }
          .ivu-table-wrapper{
              width: 1152px;
          }
          .d2{
              height: 80px;
              border: 1px solid #E7E7E7;
            .d3{
                margin-top: 10px;
              .ivu-select{
                  margin-left: 10px;
              }
              .s5{
                margin-left: 35px;
              }
            }
            .sub1{
            .ivu-input-group{
                display: inline-block;
                width: 200px;
                margin-left: 10px;
            }
            .sp{
                margin-left: 50px;
              }
              .ivu-select{
                margin-left: 10px;
              }
              .s1{
                margin-left: 10px;
              }
            }
          }
        }
    }
</style>
