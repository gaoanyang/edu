const mockIndexData = require("./mock/index.json");
const activityListData = require("./mock/activityList.json");
const indexhI = require("./mock/indexhI.json");
const resType = require("./mock/resType.json");
const resMou = require("./mock/resMou.json");
const RCvideo = require("./mock/RCvideo.json");
const RCarticle = require("./mock/RCarticle.json");
const teachAr = require("./mock/teachAr.json");
const gzsplaza = require("./mock/gzsplaza.json");
const member = require("./mock/member.json");
const path = require('path');//引入path模块
let pageMethod = require('./util/getPages.js');
var pages = pageMethod.pages();
function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}

module.exports = {
    //...
    lintOnSave:false,
    pages:{
        index:{
            entry:'src/modules/index/index.js',
            template:'src/modules/index/index.html',
            filename:'index.html',
            chunks:['chunk-vendors','chunk-common','index']
        },
        webAdmin:{
            entry:'src/modules/webAdmin/webAdmin.js',
            template:'src/modules/webAdmin/webAdmin.html',
            filename:'webAdmin.html',
            chunks:['chunk-vendors','chunk-common','webAdmin']
        },
        work:{
            entry:'src/modules/work/work.js',
            template:'src/modules/work/work.html',
            filename:'work.html',
            chunks:['chunk-vendors','chunk-common','work']
        },
        workAdmin:{
            entry:'src/modules/workAdmin/workAdmin.js',
            template:'src/modules/workAdmin/workAdmin.html',
            filename:'workAdmin.html',
            chunks:['chunk-vendors','chunk-common','workAdmin']
        }
    },
    devServer: {
        port: 8080,
        before(app) {
            app.get("/api/index", (req, res) => {
                res.json(mockIndexData);
            });
            app.get("/api/activityList", (req, res) => {
                res.json(activityListData);
            });
            app.get("/api/indexI", (req, res) => {
                res.json(indexhI);
            });
            app.get("/api/resType", (req, res) => {
                res.json(resType);
            });
            app.get("/api/resMou", (req, res) => {
                res.json(resMou);
            });
            app.get("/api/RCvideo", (req, res) => {
                res.json(RCvideo);
            });
            app.get("/api/RCarticle", (req, res) => {
                res.json(RCarticle);
            });
            app.get("/api/teachAr", (req, res) => {
                res.json(teachAr);
            });
            app.get("/api/gzsplaza", (req, res) => {
                res.json(gzsplaza);
            });
            app.get("/api/member", (req, res) => {
                res.json(member);
            });
        }
    },
    chainWebpack:(config)=>{
        config.resolve.alias
            .set('@',resolve('./src'))
            .set('components',resolve('./src/components'))
        //set第一个参数：设置的别名，第二个参数：设置的路径
    },
    pages,
    publicPath: process.env.NODE_ENV === 'production'
        ? '/'
        : '/',
};
