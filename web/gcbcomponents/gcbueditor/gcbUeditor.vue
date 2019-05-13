<template>
  <div>
    <script :id=id type="text/plain"> </script>
  </div>
</template>
<script>
    export default {
        name: 'gcb-ueditor',
        data() {
            return {
                editor: null
            }
        },
        props: {
            content: {
              type: String,
              default:''
            },
            placeholder: {
                type: String
            },
            config: {
                type: Object
            },
            id: {
                type: String
            },
        },
        mounted() {
            const _this = this;
            this.editor = UE.getEditor(this.id, this.config); // 初始化UE
            this.editor.addListener("ready", function() {
                _this.editor.setContent(_this.placeholder); // 确保UE加载完成后，放入内容。
            });
        },
        methods: {
            getUEContent() { // 获取内容方法
                return this.editor.getContent()
            },
            getUEContentTxt() { // 获取纯文本内容方法
                return this.editor.getContentTxt()
            }
        },
        destroyed() {
            this.editor.destroy();
        }
    }
</script>
