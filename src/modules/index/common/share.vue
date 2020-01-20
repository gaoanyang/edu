<template>
    <div class="share">
      <ul class="share_ul">
        <li class="fx">分享</li>
<!--        <div id="qrcode" v-show="qrcodeShow"></div>-->
<!--        <li class="li1" @mouseleave="mouseLeave('1')" @mouseover="mouseOver('1')">-->
<!--          <img v-if="!i1" src="../images/share/icon_wechat_normal.png">-->
<!--          <img v-else src="../images/share/icon_wechat_hover.png">-->
<!--        </li>-->
        <li class="li1" @mouseleave="mouseLeave('2')" @mouseover="mouseOver('2')" @click="shareToQQwb">
          <img v-if="!i2" src="../images/share/icon_qq_normal.png">
          <img v-else src="../images/share/icon_qq_hover.png">
        </li>
        <li class="li1" @mouseleave="mouseLeave('3')" @mouseover="mouseOver('3')" @click="fxzqq">
          <img v-if="!i3" src="../images/share/icon_qzone_normal.png">
          <img v-else src="../images/share/icon_qzone_hover.png">
        </li>
        <li class="li1" @mouseleave="mouseLeave('4')" @mouseover="mouseOver('4')" @click="fshareToSinaWB">
          <img v-if="!i4" src="../images/share/icon_weibo_normal.png">
          <img v-else src="../images/share/icon_weibo_hover.png">
        </li>
      </ul>
    </div>
</template>
<script>
import QRCode from 'qrcodejs2'  // 引入qrcode
export default {
  props:['title'],
  data() {
      return {
          url:'',
          i1:false,
          i2:false,
          i3:false,
          i4:false,
          qrcodeShow:false,
          data:{
              img1:'../images/share/icon_wechat_normal.png'
          }
      }
  },
  methods:{
      mouseLeave(val) {
          switch(val){
              case '1':
                  this.i1 = false
                  this.qrcodeShow = false
                  break;
              case '2':
                  this.i2 = false
                  break;
              case '3':
                  this.i3 = false
                  break;
              case '4':
                  this.i4 = false
          }
      },
      mouseOver(val) {
        switch(val){
            case '1':
                this.i1 = true
                this.qrcodeShow = true
                break;
            case '2':
                this.i2 = true
                break;
            case '3':
                this.i3 = true
                break;
            case '4':
                this.i4 = true
        }
   },
    //分享到微信二维码
    qrcode() {
      let qrcode = new QRCode('qrcode', {
        width: 132,
        height: 132,
        text: 'http://sm.zgjsfz.com/index/index.html#/b?id=2c909c336f694745016f695b354a0001', // 二维码地址
        colorDark : "#000",
        colorLight : "#fff",
      })
    },
  //分享QQ空间
  fxzqq(event) {
      event.preventDefault();
      let _url = this.url
      let _showcount = 1
      let _desc = this.title
      let _summary = this.title
      let _title = this.title
      let _site = this.title
      // let _pic = 'https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=bbe8a73e36a85edfee81f671283d6246/1f178a82b9014a90f1da88d3ab773912b21beefc.jpg'
      let _width = 100,_height = 200,_top = 100,_left = 100
      let _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
      _shareUrl += 'url=' + encodeURIComponent(_url||document.location);   //参数url设置分享的内容链接|默认当前页location
      _shareUrl += '&showcount=' + _showcount||0;      //参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
      _shareUrl += '&desc=' + encodeURIComponent(_desc||'分享的描述');    //参数desc设置分享的描述，可选参数
      _shareUrl += '&summary=' + encodeURIComponent(_summary||'分享摘要');    //参数summary设置分享摘要，可选参数
      _shareUrl += '&title=' + encodeURIComponent("这是标题");    //参数title设置分享标题，可选参数
      _shareUrl += '&site=' + encodeURIComponent(_site||'');   //参数site设置分享来源，可选参数
      // _shareUrl += '&pics=' + encodeURIComponent(_pic||'');   //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
      window.open(_shareUrl,'_blank','width='+_width+',height='+_height+',top='+_top+',left='+_left+',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');
  },
  //分享到QQ
  shareToQQwb(event){
      event.preventDefault();
      // $('.panle-share').hide()
      var _shareUrl = 'http://connect.qq.com/widget/shareqq/index.html?';
      var _url = this.url
      var _title = this.title
      // var _pic = 'https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=bbe8a73e36a85edfee81f671283d6246/1f178a82b9014a90f1da88d3ab773912b21beefc.jpg'
      _shareUrl += 'url=' + encodeURIComponent(_url||location.href);   //分享的链接
      _shareUrl += '&title=' + encodeURIComponent(_title||document.title);     //分享的标题
      // _shareUrl += '&pics=' + encodeURIComponent(_pic);   //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
      window.open(_shareUrl,'_blank');
      },
    //分享到新浪微博
    fshareToSinaWB(event){
      event.preventDefault();
      let _url = this.url
      let _title = this.title
      let _source = ''
      let _sourceUrl = this.url
      // var _pic = 'https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=bbe8a73e36a85edfee81f671283d6246/1f178a82b9014a90f1da88d3ab773912b21beefc.jpg'
      var _shareUrl = 'http://v.t.sina.com.cn/share/share.php?&appkey=895033136';     //真实的appkey，必选参数
      let _width = 100,_height = 200,_top = 100,_left = 100
      _shareUrl += '&url='+ encodeURIComponent(_url||document.location);     //参数url设置分享的内容链接|默认当前页location，可选参数
      _shareUrl += '&title=' + encodeURIComponent(_title||document.title);    //参数title设置分享的标题|默认当前页标题，可选参数
      _shareUrl += '&source=' + encodeURIComponent(_source||'');
      _shareUrl += '&sourceUrl=' + encodeURIComponent(_sourceUrl||'');
      _shareUrl += '&content=' + 'utf-8';   //参数content设置页面编码gb2312|utf-8，可选参数
      // _shareUrl += '&pic=' + encodeURIComponent(_pic||'');  //参数pic设置图片链接|默认为空，可选参数
      window.open(_shareUrl,'_blank','width='+_width+',height='+_height+',top='+_top+',left='+_left+',toolbar=no,menubar=no,scrollbars=no, resizable=1,location=no,status=0');
    }
  },
  mounted() {
    this.qrcode()
    this.url = window.location.href
  }
}
</script>
<style lang="scss" scoped>
.share{
    position: absolute;
    top: 267px;
    left: 50px;
  .share_ul{
    position: relative;
    #qrcode{
      padding: 10px;
      border: 1px solid #cccccc;
      position: absolute;
      left: 60px;
      bottom: 123px;
      background: #ffffff;
      img{
        width: 132px;
        height: 132px;
        background-color: #fff; //设置白色背景色
        padding: 6px; // 利用padding的特性，挤出白边
      }
    }
    .fx{
        color: #888888;
        font-size: 14px;
        margin-bottom: 18px;
    }
    .li1{
        margin-top: 10px;
    }
    li{
        list-style: none;
    }
  }
}
</style>
