<template>
    <div class="container">
        <el-upload
                :limit="500"
                class="upload-img"
                ref="upload"
                action="api/postimage"
                :multiple=true
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-upload="handleBefore"
                :file-list="fileList"
                :data="data"
                :auto-upload="false"
                :on-success="handleSuccess">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <el-button style="margin-left: 10px;" size="small" type="primary" @click="clearFiles">清空</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                fileList: [{
                    name: '试卷.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                },
                    {
                        name: '试卷2.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    }],
                data:{'Id':
                        '44'},
            };
        },
        methods: {
            submitUpload() {


                this.$refs.upload.submit();

                console.log(this.$refs.upload.data);

            },


            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleSuccess(response, file, fileList) {},
            handleBefore() {


            },
            clearFiles() {
                this.$refs.upload.clearFiles()
            }
        }
    }
</script>
<style scoped>
    .container {
        width: 60%;
        height: 60%;
        top: 20%;
        left: 20%;
        position: absolute;
        /*text-align: center;*/
        /*border: 1px solid #000;*/
        margin: 50px;

    }
</style>