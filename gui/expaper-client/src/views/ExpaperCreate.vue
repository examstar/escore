<template>
    <div class="register">
    <section class="form_container">
        <div class="manage_tip">
            <span class="title"> Expaper System Create </span>

    <el-form :model="expaperCreate" :rules="rules" ref="expaperCreateForm" label-width="100px" class="registerForm">
        <el-form-item label="试卷名称" prop="name">
            <el-input v-model="expaperCreate.name"></el-input>
        </el-form-item>
        <el-form-item label="命题人" prop="teacher">
            <el-input v-model="expaperCreate.teacher"></el-input>
        </el-form-item>
        <el-form-item label="种类" prop="class">
            <el-input v-model="expaperCreate.class"></el-input>
        </el-form-item>
        <el-form-item label="试卷描述" prop="description">
            <el-input type="textarea" v-model="expaperCreate.description"></el-input>
        </el-form-item>


        <el-form-item label="Header" prop="Header">
            <el-checkbox-group v-model="expaperCreate.absent">
                <el-checkbox label="Absent" name="absent"></el-checkbox>
            </el-checkbox-group>


            <el-form-item label="Barcode" prop="barcode">
                <el-input v-model="expaperCreate.barcode" ></el-input>
            </el-form-item>
            <el-form-item label="Note" prop="Note">
                <el-input type="textarea" v-model="expaperCreate.note"></el-input>
            </el-form-item>
        </el-form-item>

        <el-form-item label="问题：" prop="topic">
            <el-input type="topic" v-model="expaperCreate.topic"></el-input>
        </el-form-item>
        <el-form-item label="总分：" prop="score">
            <el-input type="score" v-model="expaperCreate.score"></el-input>
        </el-form-item>
        <el-form-item label="Level" prop="Level">
            <el-select v-model="expaperCreate.level" placeholder="seclet Level">
                <el-option label="Level 1" value="1"></el-option>
                <el-option label="Level 2" value="2"></el-option>
                <el-option label="Level 3" value="3"></el-option>
                <el-option label="Level 4" value="4"></el-option>
                <el-option label="Level 5" value="5"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="Type" prop="Type">
            <el-select v-model="expaperCreate.type" placeholder="type">
                <el-option label="none" value="1"></el-option>
                <el-option label="语文" value="2"></el-option>
                <el-option label="数学" value="3"></el-option>
                <el-option label="活动" value="4"></el-option>
                <el-option label="其他" value="5"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="expected">
            <el-checkbox-group v-model="expaperCreate.expected">
                <el-checkbox label="A" name="expected"></el-checkbox>
                <el-checkbox label="B" name="expected"></el-checkbox>
                <el-checkbox label="C" name="expected"></el-checkbox>
                <el-checkbox label="D" name="expected"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item>
            <el-button class="submit_btn" type="primary" @click="submitForm('expaperCreateForm')">创建试卷</el-button>
        </el-form-item>



<!--        <el-form-item label="打卡" prop="delivery">-->
<!--            <el-switch v-model="expaperCreate.delivery"></el-switch>-->
<!--        </el-form-item>-->


    </el-form>
        </div>
    </section>
    </div>
</template>

<script>
export default {
    name: "ExpaperCreate.vue",
    Components: {},
    data() {
        return {
            expaperCreate: {
                name: '',
                teacher: '',
                class: '',
                description: '',
                absent: '',
                barcode: '',
                note: '',
                topic: '',
                score: '',
                level: '',
                expected: [],  //可能存在多选题目因此这里暂时用数组
            },
            rules: {
                //配置rules：必填，提示，触发：失去焦点
                name: [{required: true, massage: "试卷名不能为空", trigger: "blur"},
                    {main: 2, max: 30, massage: "长度在2-30之间",trigger: "blur"},
                ],

            }
        }
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                //alert('submit!');

                this.$axios
                    .post('/api/add_expaper',this.loginUser)
                    .then(res=>{
                        this.$message({
                            message:'成功',
                            type: 'success'
                        })
                    });

                this.$router.push('/index');
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    },
}
</script>

<style scoped>
    .register {
        position: relative;
        width: 100%;
        height: 100%;
        /*background: url(../assets/bg.jpg) no-repeat center center;*/
        background-color: #23527c;
        background-size: 100% 100%;
    }
    .form_container {
        width: 50%;
        height: 400px;
        position: absolute;
        top: 10%;
        left: 25%;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
    }

    .registerForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0px 5px 10px #cccc;
    }

    .submit_btn {
        width: 100%;
    }
    .form_container .manage_tip .title {
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 26px;
        color: #555555;
    }
</style>