<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title"> Expaper System </span>
            </div>
                <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="60px" class="loginForm">


                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button class="submit_btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
                    </el-form-item>

                    <div class="tiparea">
                        <p>
                            还没有账号？<router-link to='/register'>立即注册</router-link>
                        </p>
                    </div>

                </el-form>

        </section>
    </div>
</template>

<script>
    export default {
        name: "login.vue",
        Components: {},

        data() {

            return {
                loginUser: {
                    email: '',
                    password: ''
                },
                rules: {
                    //配置rules：必填，提示，触发：失去焦点

                    email: [
                        {type:"email",required: true, massage: "用户名不能为空", trigger: "blur"},
                    ],
                    password: [
                        {required: true, massage: "密码不能为空", trigger: "blur"},
                        {main: 2, max: 30, massage: "长度在2-30之间",trigger: "blur"},
                    ]
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //alert('submit!');

                        this.$axios
                            .post('/api/user/login',this.loginUser)
                            .then(res=>{
                                //拿到token(如果有)
                                const {token}=res.data;
                                localStorage.setItem('eleToken',token)
                            });

                        this.$router.push('/index');
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
    .login {
        position: relative;
        width: 100%;
        height: 100%;
        background: url(../assets/bg03.jpg) no-repeat center center;
        /*background-color: #2c3e50;*/
        background-size: 100% 100%;
    }
    .form_container {
        width: 370px;
        height: 210px;
        position: absolute;
        top: 20%;
        left: 34%;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
    }
    .form_container .manage_tip .title {
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 26px;
        color:#fff;
    }
    .loginForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0px 5px 10px #cccc;
    }

    .submit_btn {
        width: 100%;
    }
    .tiparea {
        text-align: right;
        font-size: 12px;
        color: #333;
    }
    .tiparea p a {
        color: #409eff;
    }
</style>