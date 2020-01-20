<template>
    <div class="plaza_salonRight">
        <title-line
          :title="title"
        ></title-line>
        <ul class="salinR_ul">
          <li class="salinR_li" @click="link(item.issueId,item.issueName)" v-for="(item,index) in data">
              <div class="sort s">
                {{index+1}}
              </div>
              <div class="sortD s">
                  {{item.issueName | ellipsis}}
              </div>
          </li>
        </ul>
    </div>
</template>
<script>
export default {
    components:{},
    data() {
        return {
            data:[],
            title:'热门话题'
        }
    },
    methods:{
        link(val,name) {
            this.$router.push({path:'/salonD',
                query:{
                    id:val,
                    name:name
                }})
        },
        //最热
        getTeacher() {
            var url = this.GLOBAL.baseURL+"/portal/issue/top10"
            this.$http.get(url).then(res => {
                console.log(res)
                this.data = res.data.data
            })
        },
    },
    filters:{
        ellipsis(value){
            console.log(value)
            console.log(value.length)
            if (!value) return '';
            if (value.length > 14) {
                return value.slice(0,14) + '...'
            }
            return value
        }
    },
    mounted() {
        this.getTeacher()
    }
}
</script>
<style lang="scss">
.plaza_salonRight{
  .commonTitle{
      width: 252px;
      margin: auto;
      padding-top: 29px;
  }
}
</style>
<style scoped lang="scss">
.plaza_salonRight{
    display: inline-block;
    width: 300px;
    height: 720px;
    background: #ffffff;
    margin-left: 14px;
    vertical-align: top;
    .salinR_ul{
        width: 252px;
        margin: auto;
      .salinR_li{
          cursor: pointer;
          margin-top: 30px;
          text-align: left;
          list-style: none;
          height: 22px;
        .sort{
            text-align: center;
            line-height: 20px;
            color: #FFFFFF;
            font-size: 14px;
            width: 20px;
            height: 20px;
            background:#DDDDDD;
            border-radius:3px;
        }
        .sortD:hover{
            color: #008CFA;
            border-bottom: 1px solid #008CFA;
        }
        .sortD{
            color: #444444;
            margin-left: 10px;
            font-size: 14px;
        }
          .s{
            vertical-align: middle;
            display: inline-block;
        }
      }
    .salinR_li:first-child{
        .sort{
            background: rgba(252,166,0,1);
        }
        }
        .salinR_li:nth-child(2)
        {
            .sort{
                background: rgba(252,166,0,1);
            }
        }
        .salinR_li:nth-child(3)
        {
            .sort{
                background: rgba(252,166,0,1);
            }
        }
    }
}
</style>
