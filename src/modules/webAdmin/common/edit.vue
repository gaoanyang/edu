<template>
    <div id="wangeditor">
        <div ref="editorElem" style="text-align:left;"></div>
    </div>
</template>
<script>
    import E from "wangeditor";
    export default {
        name: "Editor",
        props:{
            phone:{
                type:String,
                default:'123'
            },
            content:{
                type:String,
                default: ''
            }
        },
        watch:{
            "content":{
                handler: function (val, oldVal) {

                    // this.editor = new E(this.$refs.editorElem);
                    // this.editor.txt.html(val);
                },
                immediate:true
            }
        },
        data() {
            return {
                editor: null,
                editorContent: ''
            };
        },
        // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
        // props: [phone], // 接收父组件的方法
        mounted() {
            var token = JSON.parse(sessionStorage.getItem("adminuser")).access_token
            var url = this.GLOBAL+"/board/upload"
            this.editorContent = "11111111111111"
            this.editor = new E(this.$refs.editorElem);
            console.log(this.editor)
            this.editor.customConfig.uploadImgServer = url; //上传URL
            this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
            this.editor.customConfig.uploadImgMaxLength = 5;
            this.editor.customConfig.uploadFileName = 'file';
            this.editor.customConfig.uploadImgHeaders = {
                'Authorization': 'Bearer ' + token
            }
            this.editor.customConfig.uploadImgHooks = {
                customInsert: function (insertImg, result, editor) {

                    // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                    // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                    // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                    console.log(result.data)
                    var url =result.data;
                    insertImg(url);

                    // result 必须是一个 JSON 格式字符串！！！否则报错
                }
            }
            // 编辑器的事件，每次改变会获取其html内容
            this.editor.customConfig.onchange = html => {
                this.editorContent = html;
                this.$emit('reloadData',this.editorContent)
                // this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
            };
            this.editor.customConfig.menus = [
                // 菜单配置
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'italic', // 斜体
                'underline', // 下划线
                'strikeThrough', // 删除线
                'foreColor', // 文字颜色
                'backColor', // 背景颜色
                'link', // 插入链接
                'list', // 列表
                'justify', // 对齐方式
                'quote', // 引用
                'emoticon', // 表情
                'image', // 插入图片
                'table', // 表格
                'code', // 插入代码
                'undo', // 撤销
                'redo' // 重复
            ];
            this.editor.create()
        },
        methods:{
            confirm() {

            },
            cancel() {

            },
            transData(val) {
                this.editor.txt.html(val);
            }
        }
    }

</script>
