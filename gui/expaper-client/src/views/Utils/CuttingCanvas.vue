<template>
    <div>
    <!-- 把需要生成截图的元素放在一个元素容器里,设置一个ref -->
    <div class="image_tofile" ref="imageTofile" style="text-align: center">
<!--        <excreate></excreate>-->
        <exedit :showright="false"></exedit>
        <button @click="toImage"> aaaaaa</button>
    </div>



    <!-- 如果需要展示截取的图片,给一个img标签 -->
    <img style="text-align: center" alt="无法显示" :src="htmlUrl"/>
    </div>
</template>

<script>
    import html2canvas from 'html2canvas';
   // import excreate from '../ExCreate2'
   import exedit from '../ExEdit'

    export default {
       beforeCreate(){

       },
        // 引入html2canvas
        // 注册组件
        components: {
            html2canvas,
            //excreate
            exedit
        },
        data () {
            return {
                htmlUrl: '',
                scalingrate:(window.screen.width/1920).toFixed(4),
            }
        },

        mounted () {
            // 如果页面一加载就需要生成图片,就在mounted里调用方法,给一个setTimeout,保证页面元素已存在
            setTimeout(this.toImage, 2000);
            //setTimeout(alert("完成"), 2000);

        },
        methods: {
            // 页面元素转图片
            toImage () {
                // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等

                html2canvas(this.$refs.imageTofile, {
                    backgroundColor: null,
                    useCORS: true ,// 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
                  //  width:100,
                  //  height:100,
                  //  x:100,
                  //  y:100,

                }).then((canvas) => {
                    let url = canvas.toDataURL('image/png')
                    this.htmlUrl = url
                    // 把生成的base64位图片上传到服务器,生成在线图片地址
                    this.sendUrl()
                })
            },

            // 图片上传服务器
            sendUrl () {
                // 如果图片需要formData格式,就自己组装一下,主要看后台需要什么参数
                const formData = new FormData();
                formData.append('base64', this.htmlUrl);
                formData.append('Id',this.$route.params.id);
                formData.append('Scalingrate',this.scalingrate);
                formData.append('pathName', 'pdf');
                // this.$ajax({
                //     url: apiPath.common.uploadBase,
                //     method: 'post',
                //     data: formData
                // }).then(res => {
                //     if (res.code && res.data) {
                //     }
                // })


                this.$axios
                    .post('api/postimg', formData)
                    .then(res => {
                        this.$message({
                                message: '成功',
                                type: 'success'
                            },
                        );
                        console.log(formData)

                    });
                this.$router.push('/operating');

            }
        }
    }
</script>

<style scoped>

</style>