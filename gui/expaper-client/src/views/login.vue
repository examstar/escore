<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title"> Expaper System </span>
                <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="60px" class="demo-ruleForm">


                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button class="submit_btn" type="primary" @click="submitForm('registerForm')">登录</el-button>
                    </el-form-item>

                    <div class="tiparea">
                        <p>
                            还没有账号？<router-link to='/register'>立即注册</router-link>
                        </p>
                    </div>

                </el-form>
            </div>
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
                            .post('/api/ueser/login',this.loginUser)
                            .then(res=>{
                                this.$message({
                                   //拿到token
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
    }
</script>

<style scoped>


</style>