<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title"> Expaper System Register </span>
                <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="100px" class="registerForm">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码" prop="password2">
                        <el-input type="password" v-model="registerUser.password2" placeholder="请输入密码"></el-input>
                    </el-form-item>

                    <el-form-item label="选择身份" prop="">
                        <el-select v-model="registerUser.identity" placeholder="请选择身份">
                            <el-option label="管理员" value="manager"></el-option>
                            <el-option label="用户" value="employee"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="submit_btn" type="primary" @click="submitForm('registerForm')">注册</el-button>
                    </el-form-item>


                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Register.vue",
        Components: {},

        data() {
            var validatePass2 = (rule, value, callback) => {
              if (value !== this.loginUser.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                registerUser: {
                    name: '',
                    email: '',
                    password: '',
                    password2: '',
                    identity: '',
                },
                rules: {
                    //配置rules：必填，提示，触发：失去焦点
                    name: [{required: true, massage: "用户名不能为空", trigger: "blur"},
                        {main: 2, max: 30, massage: "长度在2-30之间",trigger: "blur"},
                    ],
                    email: [
                        {type:"email",required: true, massage: "用户名不能为空", trigger: "blur"},
                    ],
                    password: [
                        {required: true, massage: "密码不能为空", trigger: "blur"},
                        {main: 2, max: 30, massage: "长度在2-30之间",trigger: "blur"},
                    ],
                    password2: [
                        {required: true, massage: "密码不能为空", trigger: "blur"},
                        {main: 2, max: 30, massage: "长度在2-30之间",trigger: "blur"},
                        {validator:validatePass2,trigger:"blur"}
                    ],
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //alert('submit!');

                        this.$axios
                            .post('/api/ueser/register',this.loginUser)
                            .then(res=>{
                                this.$message({
                                    message:'账号注册成功',
                                    type: 'success'
                                })
                            });

                        this.$router.push('/login');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

        }
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
        width: 370px;
        height: 210px;
        position: absolute;
        top: 10%;
        left: 34%;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
    }
    .form_container .manage_tip .title {
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 26px;
        color: #555555;
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
</style>

