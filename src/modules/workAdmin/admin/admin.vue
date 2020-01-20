<template>
    <div class="admin_admin">
        <div class="title">工作室基础信息管理</div>
        <div class="gzsname"><span>工作室名称：</span><input type="text" v-model="studioName"/></div>
        <div class="gzsdes"><span>工作室简介：</span><textarea v-model="studioIntroduction"></textarea></div>
        <div class="myAddress">
            <span class="s1">省市区选择：</span>
            <v-distpicker :disabled="true" :province="this.editprovince" :city="this.editcity" :area="this.editarea" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
        </div>
        <div class="category">
            <span>工作室类别：</span>
            <Select v-model="studioCategory" style="width:200px">
                <Option v-for="item in items" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
        <div class="fgys">
            <span class="s1">风格样式</span>
            <RadioGroup v-model="animal1">
                <div class="d1 style1">
                    <div class="colour"></div>
                    <Radio label="1">默认样式</Radio>
                </div>
                <div class="d1 style2">
                    <div class="colour"></div>
                    <Radio label="2">样式1</Radio>
                </div>
                <div class="d1 style3">
                    <div class="colour"></div>
                    <Radio label="3">样式2</Radio>
                </div>
                <div class="d1 style4">
                    <div class="colour"></div>
                    <Radio label="4">样式3</Radio>
                </div>
            </RadioGroup>
        </div>
        <div class="tpxz">
            <span class="s1">横幅图片</span>
            <RadioGroup v-model="animal2" @on-change="cradio">
                <div class="d1">
                    <img src="https://gzs-file.oss-cn-beijing.aliyuncs.com/fc7a7ec0-182f-4f7c-b3be-70a88184cc2e.jpg"/>
                    <Radio label="https://gzs-file.oss-cn-beijing.aliyuncs.com/fc7a7ec0-182f-4f7c-b3be-70a88184cc2e.jpg">默认横幅1</Radio>
                </div>
                <div class="d1">
                    <img src="https://gzs-file.oss-cn-beijing.aliyuncs.com/ea3c9ce3-66a2-4326-b58b-ab27e371a64d.jpg"/>
                    <Radio label="https://gzs-file.oss-cn-beijing.aliyuncs.com/ea3c9ce3-66a2-4326-b58b-ab27e371a64d.jpg">默认横幅2</Radio>
                </div>
                <div class="d1">
                    <img src="https://gzs-file.oss-cn-beijing.aliyuncs.com/61868749-c855-4367-91d8-bc0f0931d811.jpg"/>
                    <Radio label="https://gzs-file.oss-cn-beijing.aliyuncs.com/61868749-c855-4367-91d8-bc0f0931d811.jpg">默认横幅3</Radio>
                </div>
                <div class="d1">
                    <img src="https://gzs-file.oss-cn-beijing.aliyuncs.com/7def4a17-4ade-4d23-8226-2048e386e8ee.jpg"/>
                    <Radio label="https://gzs-file.oss-cn-beijing.aliyuncs.com/7def4a17-4ade-4d23-8226-2048e386e8ee.jpg">默认横幅4</Radio>
                </div>
            </RadioGroup>
        </div>
        <div class="hfimg">
            <span class="s1"></span>
            <div class="sc">

                <upload :uploadType="`head`" :imgWidth="`520px`" :imgHeight="`160px`" :imgUrl="imgUrl"
                        @upload="getImgUrl" :message="message"></upload>
                <span class="s2">建议尺寸: 1920*320</span>
            </div>
        </div>
        <div class="but">
            <Button type="primary" @click="commit">确定上传</Button>
        </div>
    </div>
</template>
<script>
    import VDistpicker from 'v-distpicker'
    import upload from '../common/upload'
    export default {
        components:{
            upload,VDistpicker
        },
        watch: {
            "$route":{
                handler(to){
                    var user = JSON.parse(sessionStorage.getItem("user"))
                    console.log(user)
                    this.studioId = user.studioId
                    this.token = user.access_token
                    this.getDatabyId()
                },
                immediate:true
            }
        },
        data() {
            return {
                studioId:'',
                tt:'00012',
                id:'',
                token:'',
                studioName:'',
                studioIntroduction:'',
                imgUrl:'',
                message:"确认上传",
                animal1:'2',
                animal2:'',
                province:"330000",
                city:"330200",
                area:'330212',
                editprovince:'浙江省',
                editcity:'宁波市',
                editarea:'鄞州区',
                items: [
                    {
                        value: '0',
                        label: '校园长、书记学习共同体'
                    },
                    {
                        value: '1',
                        label: '名师工作室'
                    },
                    {
                        value: '2',
                        label: '名班主任（德育导师）工作室'
                    },
                ],
                studioCategory: '0'
            }
        },
        methods:{
            cradio(val) {
                this.imgUrl = val
            },
            //查询当前工作室信息
            //根据id查询
            getDatabyId() {
                var url = this.GLOBAL+"/board/studio/"+this.studioId
                this.$http.get(url,{
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then(res => {
                    console.log(res)
                    var data = res.data.data
                    this.studioName = data.studioName
                    this.studioIntroduction = data.studioIntroduction
                    this.studioCategory = String(data.studioCategory)
                    this.animal1 = data.style
                    if(data.bannerIndex == "-1") {
                        this.imgUrl = data.bannerUrl
                    }else{
                        this.imgUrl = ''
                        this.animal2 = data.bannerUrl
                    }
                    this.editprovince = data.provinceName
                    this.editcity = data.cityName
                    this.editarea = data.areaName
                })
            },
            commit() {
                var data = {
                    "studioId":this.studioId,
                    "studioName":this.studioName,
                    "studioIntroduction":this.studioIntroduction,
                    "studioCategory":this.studioCategory,
                    "province":this.province,
                    "city":this.city,
                    "area":this.area,
                    "style":this.animal1,
                    "bannerUrl":this.animal2,
                    "bannerIndex":1,
                    "provinceName":this.editprovince,
                    "cityName":this.editcity,
                    "areaName":this.editarea,
                }
                if(this.imgUrl != null && this.imgUrl != "" && this.imgUrl != undefined) {
                    data.bannerUrl = this.imgUrl
                    data.bannerIndex = -1
                }
                var url = this.GLOBAL+"/board/studio"
                console.log(data)
                this.$http.put(url, data,{
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                    .then(res => {
                        console.log(res)
                        if(res.data.code == 0){
                            alert("修改成功")
                        }
                    })
            },
            getImgUrl(data) {
                console.log(data)
                this.animal2 = ""
                this.imgUrl = data
            },
            onChangeProvince(a){
                console.log(a)
                this.province = a.code
                this.editprovince = a.value
            },

            onChangeCity(a){
                this.city = a.code
                this.editcity = a.value
            },

            onChangeArea(a){
                this.area = a.code
                this.editarea = a.value
                this.show=false
            }
        },
        mounted() {
        }
    }
</script>
<style lang="scss" scoped>
    .admin_admin{
        padding-left: 67px;
        text-align: left;
        .distpicker-address-wrapper{
            display: inline-block;
            margin-top: 40px;
        }
        .ivu-btn{
            width: 120px;
            height: 50px;
        }
        .title{
            font-size: 20px;
        }
        .gzsname{
            font-size: 16px;
            margin-top: 60px;
        }
        .gzsdes{
            font-size: 16px;
            margin-top: 20px;
            textarea{
                vertical-align: top;
                width: 400px;
                height: 100px;
            }
        }
        .category{
            margin-top: 20px;
            font-size: 16px;
        }
        .hfimg{
            .s1{
                vertical-align: top;
            }
            .sc{
                vertical-align: top;
                display: inline-block;
                margin-left: 104px;
                width: 520px;
                height: 160px;
                border: 1px solid;
                .s2{
                    /*margin-left: 20px;*/
                    font-size: 16px;
                }
                .imgD{
                    margin-top: 20px;
                }
            }
        }
        .myAddress{
            margin-top: 40px;
            .s1{
                font-size: 16px;
            }
        }
        .but{
            padding-left: 200px;
            padding-bottom: 50px;
            margin-top: 50px;
            .ivu-btn{
                width: 100px;
                height: 40px;
            }
            .ivu-btn:nth-child(2){
                margin-left: 50px;
            }
        }
        .fgys{
            .ivu-radio-group{
                vertical-align: top;
                margin-top: 50px;
                .style1{
                    .colour{
                        width: 200px;
                        height: 100px;
                        background: #008cfa;
                    }
                }
                .style2{
                    .colour{
                        width: 200px;
                        height: 100px;
                        background: #ec3a46;
                    }
                }
                .style3{
                    .colour{
                        width: 200px;
                        height: 100px;
                        background: #18bc62;
                    }
                }
                .style4{
                    .colour{
                        width: 200px;
                        height: 100px;
                        background: #f89e02;
                    }
                }
            }
            .s1{
                vertical-align: top;
                font-size: 16px;
                margin-top: 50px;
                position: relative;
                top: 43px;
            }
            .d1{
                margin-left: 35px;
                display: inline-block;
                height: 200px;
                position: relative;
                width: 276px;
                display: inline-block;
                .ivu-radio-wrapper{
                    position: absolute;
                    bottom: 16px;
                    left: 0px;
                }
            }
        }
        .tpxz{
            .ivu-radio-group{
                vertical-align: top;
                margin-top: 22px;
                padding-left: 71px;
            }
            .s1{
                vertical-align: top;
                font-size: 16px;
                margin-top: 50px;
                position: relative;
                top: 43px;
            }
            .d1{
                margin-left: 35px;
                display: inline-block;
                height: 250px;
                position: relative;
                width: 510px;
                display: inline-block;
                img{
                    height: 200px;
                    width: 100%;
                }
                .ivu-radio-wrapper{
                    position: absolute;
                    bottom: 16px;
                    left: 0px;
                }
            }
        }
        img{
            width: 200px;
            border-style: none;
            height: 150px;
        }

    }
</style>
