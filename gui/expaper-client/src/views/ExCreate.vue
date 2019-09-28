<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title"> Expaper System Create </span>
            </div>

            <el-form :model="expaperCreate" :rules="rules" ref="expaperCreateForm" label-width="100px"
                     class="registerForm">

                <div class="expaperHeader">
                    <el-form-item label="Header" prop="Header">

                        <el-form-item label="试卷名称" prop="name">
                            <el-input v-model="expaperCreate.name"></el-input>
                        </el-form-item>

                        <el-form-item label="Type" prop="Type">
                            <div class="absent" style="float: left;padding: 20px">
                                <el-select v-model="expaperCreate.class" placeholder="type">
                                    <el-option label="none" value="none"></el-option>
                                    <el-option label="语文" value="语文"></el-option>
                                    <el-option label="数学" value="数学"></el-option>
                                    <el-option label="活动" value="活动"></el-option>
                                    <el-option label="其他" value="其他"></el-option>
                                </el-select>
                            </div>
                            <div class="absent" style="float: left;padding: 20px">
                                <el-checkbox-group v-model="expaperCreate.absent">
                                    <el-checkbox label="Absent" name="absent"></el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </el-form-item>
                        <el-form-item label="试卷描述" prop="description">
                            <el-input type="textarea" v-model="expaperCreate.description"></el-input>
                        </el-form-item>


                        <el-form-item label="Barcode" prop="barcode">
                            <el-input v-model="expaperCreate.barcode"></el-input>
                        </el-form-item>
                        <el-form-item label="Note" prop="Note">
                            <el-input type="textarea" v-model="expaperCreate.note"></el-input>
                        </el-form-item>
                    </el-form-item>
                </div>



                <div class="expaperBody">
                    <el-divider></el-divider>
                    <el-form-item label="问题1" prop="Body">

                        <el-form-item label="问题：" prop="topic">
                            <el-input type="topic" v-model="expaperCreate.topic"></el-input>
                        </el-form-item>

                        <div style="padding: 5px ">
                        <div class="absent2" style="float: left">
                        <el-form-item label="总分：" prop="score" >
                            <el-input type="score" v-model="expaperCreate.score"></el-input>
                        </el-form-item>
                        </div>
                        <div class="absent2" style="float: left">
                            <el-form-item label="Level" prop="Level">
                                <el-select v-model="expaperCreate.level" placeholder="seclet Level">
                                    <el-option label="Level 1" value="1"></el-option>
                                    <el-option label="Level 2" value="2"></el-option>
                                    <el-option label="Level 3" value="3"></el-option>
                                    <el-option label="Level 4" value="4"></el-option>
                                    <el-option label="Level 5" value="5"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="absent2" style="float: left">
                            <el-form-item label="题型" prop="Level">
                                <el-select v-model="page.type" placeholder="seclet Level" v-on:click="tag1(page.type)">
                                    <el-option label="选择/判断" value="true"></el-option>
                                    <el-option label="解答" value="false"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        </div>
                        <div style="float: left" >
                        <el-form-item label="正确答案" v-show="page.type_flag">
                            <el-checkbox-group v-model="expaperCreate.expected">

                                <el-checkbox label="A" name="expected" style="float: left;padding: 0 0 0 50px">
                                    <el-input type="topic" v-model="expaperCreate.topic"></el-input>
                                </el-checkbox>
                                <el-checkbox label="B" name="expected" style="float: left;padding: 0 0 0 50px">
                                    <el-input type="topic" v-model="expaperCreate.topic"></el-input>
                                </el-checkbox>
                                <el-checkbox label="C" name="expected" style="float: left;padding: 0 0 0 50px">
                                    <el-input type="topic" v-model="expaperCreate.topic"></el-input>
                                </el-checkbox>
                                <el-checkbox label="D" name="expected" style="float: left;padding: 0 0 0 50px">
                                    <el-input type="topic" v-model="expaperCreate.topic"></el-input>
                                </el-checkbox>

                            </el-checkbox-group>
                        </el-form-item>
                        </div>

                    </el-form-item>
                    <el-divider></el-divider>
                    </div>
                <div class="expaperBody">
                    <el-divider></el-divider>
                    <el-form-item label="问题2" prop="Body">

                        <el-form-item label="问题：" prop="topic">
                            <el-input type="topic" v-model="expaperCreate.topic"></el-input>
                        </el-form-item>

                        <div style="padding: 5px ">
                            <div class="absent2" style="float: left">
                                <el-form-item label="总分：" prop="score" >
                                    <el-input type="score" v-model="expaperCreate.score"></el-input>
                                </el-form-item>
                            </div>
                            <div class="absent2" style="float: left">
                                <el-form-item label="Level" prop="Level">
                                    <el-select v-model="expaperCreate.level" placeholder="seclet Level">
                                        <el-option label="Level 1" value="1"></el-option>
                                        <el-option label="Level 2" value="2"></el-option>
                                        <el-option label="Level 3" value="3"></el-option>
                                        <el-option label="Level 4" value="4"></el-option>
                                        <el-option label="Level 5" value="5"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="absent2" style="float: left">
                                <el-form-item label="题型" prop="Level">
                                    <el-select v-model="page.type" placeholder="seclet Level" v-on:click="tag1(page.type)">
                                        <el-option label="选择/判断" value="true"></el-option>
                                        <el-option label="解答" value="false"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        <div style="float: left" >
                            <el-form-item label="正确答案" v-show="page.type_flag">
                                <el-checkbox-group v-model="expaperCreate.expected">

                                    <el-checkbox label="A" name="expected" style="float: left;padding: 0 0 0 50px">
                                        <el-input type="topic" v-model="expaperCreate.topic"></el-input>
                                    </el-checkbox>
                                    <el-checkbox label="B" name="expected" style="float: left;padding: 0 0 0 50px">
                                        <el-input type="topic" v-model="expaperCreate.topic"></el-input>
                                    </el-checkbox>
                                    <el-checkbox label="C" name="expected" style="float: left;padding: 0 0 0 50px">
                                        <el-input type="topic" v-model="expaperCreate.topic"></el-input>
                                    </el-checkbox>
                                    <el-checkbox label="D" name="expected" style="float: left;padding: 0 0 0 50px">
                                        <el-input type="topic" v-model="expaperCreate.topic"></el-input>
                                    </el-checkbox>

                                </el-checkbox-group>
                            </el-form-item>
                        </div>

                    </el-form-item>
                    <el-divider></el-divider>
                </div>
                <div class="expaperBody">
                    <el-divider></el-divider>
                    <el-form-item label="问题3" prop="Body">

                        <el-form-item label="问题：" prop="topic">
                            <el-input type="topic" v-model="expaperCreate.topic"></el-input>
                        </el-form-item>

                        <div style="padding: 5px ">
                            <div class="absent2" style="float: left">
                                <el-form-item label="总分：" prop="score" >
                                    <el-input type="score" v-model="expaperCreate.score"></el-input>
                                </el-form-item>
                            </div>
                            <div class="absent2" style="float: left">
                                <el-form-item label="Level" prop="Level">
                                    <el-select v-model="expaperCreate.level" placeholder="seclet Level">
                                        <el-option label="Level 1" value="1"></el-option>
                                        <el-option label="Level 2" value="2"></el-option>
                                        <el-option label="Level 3" value="3"></el-option>
                                        <el-option label="Level 4" value="4"></el-option>
                                        <el-option label="Level 5" value="5"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="absent2" style="float: left">
                                <el-form-item label="题型" prop="Level">
                                    <el-select v-model="page.type" placeholder="seclet Level" v-on:click="tag1(page.type)">
                                        <el-option label="选择/判断" value="true"></el-option>
                                        <el-option label="解答" value="false"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        <div style="float: left" >
                            <el-form-item label="正确答案" v-show="page.type_flag">
                                <el-checkbox-group v-model="expaperCreate.expected">

                                    <el-checkbox label="A" name="expected" style="float: left;padding: 0 0 0 50px">
                                        <el-input type="topic" v-model="expaperCreate.topic"></el-input>
                                    </el-checkbox>
                                    <el-checkbox label="B" name="expected" style="float: left;padding: 0 0 0 50px">
                                        <el-input type="topic" v-model="expaperCreate.topic"></el-input>
                                    </el-checkbox>
                                    <el-checkbox label="C" name="expected" style="float: left;padding: 0 0 0 50px">
                                        <el-input type="topic" v-model="expaperCreate.topic"></el-input>
                                    </el-checkbox>
                                    <el-checkbox label="D" name="expected" style="float: left;padding: 0 0 0 50px">
                                        <el-input type="topic" v-model="expaperCreate.topic"></el-input>
                                    </el-checkbox>

                                </el-checkbox-group>
                            </el-form-item>
                        </div>

                    </el-form-item>
                    <el-divider></el-divider>
                </div>

                    <el-form-item>
                        <el-button class="submit_btn" type="primary" @click="submitForm('expaperCreateForm')">+ 添加更多题目 +
                        </el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button class="submit_btn" type="primary" @click="submitForm('expaperCreateForm')">创建试卷
                        </el-button>
                    </el-form-item>




            </el-form>

        </section>
    </div>
</template>

<script>
    export default {
        name: "ExpaperCreate.vue",
        Components: {},
        data() {
            return {
                page: {
                    type: "",
                    type_flag: false
                },

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
                        {main: 2, max: 30, massage: "长度在2-30之间", trigger: "blur"},
                    ],

                }
            }
        },

        watch: {
            'page.type': function () {
                if (this.page.type === "true") {
                    this.page.type_flag = true
                } else {
                    this.page.type_flag = false
                }
            },
        },
        methods: {


            submitForm(formName) {
                var jsonbox = {
                    exheader: {
                        name: this.expaperCreate.name,
                        id: this.expaperCreate.id,
                    },
                    questionlist: [
                        this.expaperCreate
                    ]
                };


                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //alert('submit!');

                        this.$axios
                        // .post('http://localhost:3000/api/add_expaper',this.expaperCreate)
                            .get('http://localhost:3000/api/add_expaper', {params: jsonbox})
                            .then(res => {
                                this.$message({
                                        message: '成功',
                                        type: 'success'
                                    },
                                );
                                console.log(res)

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
    .register {
        position: relative;
        width: 100%;
        height: 100%;
        /*background: url(../assets/bg.jpg) no-repeat center center;*/
        /*background-color: #23527c;*/
        background-size: 100% 100%;
    }

    .form_container {
        width: 50%;
        height: 50%;
        position: absolute;
        top: 0%;
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

    .absent {
        padding: 0 0 0px 20%;
    }
    .absent {
        padding: 0 0 0px 20px;
    }
</style>