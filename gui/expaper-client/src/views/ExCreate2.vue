<template>
    <div class="background">
<!--        <rightmenu ref="rightmenu"></rightmenu>-->
<!--        迭代生成试卷纸 A4-->
        <template v-for="(paperpage,index) in mytitles">
            <div class="paper" >
                <h3 style="text-align: center">答题卡</h3>
                <div class="container" ref="container">

                    <!--迭代每一道大题，并且返回大题坐标-->
                    <template v-for="(item,tindex) in paperpage.titles">
                        <!--迭代每道小题-->
                        <questions :item=item :index={outer:index,inner:tindex} @listenData="setItemPosition">
                        </questions>

                        <point v-for="i in 4" :myposition="item" :index="i" :tindex="index+'-'+ tindex" ></point>
                    </template>
                </div>
            </div>
        </template>

<!--        右侧添加题目导航栏-->
        <template>
            <div class="rightmeun">
                <a> Header</a>
                <div style="text-align: center;margin: 10px 30px 40px 10px;border: seagreen">
                    <el-form label-width="100px" :model="mytitles[0].titles[0].header">
                        <el-form-item label="创建人：">
                            <el-input v-model="mytitles[0].titles[0].header.teacher" placeholder="?"></el-input>
                        </el-form-item>
                        <el-form-item label="创建时间：">
                            <el-input v-model="mytitles[0].titles[0].header.created_at" placeholder="?"
                                      :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="更新时间:">
                            <el-input v-model="mytitles[0].titles[0].header.update_at" placeholder="?"
                                      :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="Note：">
                            <el-input v-model="mytitles[0].titles[0].header.note" placeholder="?"></el-input>
                        </el-form-item>
                        <el-form-item label="描述：">
                            <el-input type="textarea" v-model="mytitles[0].titles[0].header.description"
                                      placeholder="?"></el-input>
                        </el-form-item>
                    </el-form>
                </div>

                <a> 添加题目</a>
                <div style="text-align: center;margin: 10px 30px 10px 10px">
                    <el-form label-width="100px" :model="formLabelAlign">
                        <el-form-item label="大题：">
                            <el-input v-model="formLabelAlign.t1" placeholder="示例：三"></el-input>
                        </el-form-item>
                        <el-form-item label="小题：">
                            <el-input v-model="formLabelAlign.t2" placeholder="示例：16-20"></el-input>
                        </el-form-item>
                        <el-form-item label="每道题得分:">
                            <el-input v-model="formLabelAlign.score" placeholder="示例：3"></el-input>
                        </el-form-item>
                        <el-form-item label="答案：">
                            <el-input v-model="formLabelAlign.t3" placeholder="示例：B-A-ABC-C-BC"></el-input>
                        </el-form-item>
                    </el-form>

                    <el-button type="primary" @click="insertTitle(formLabelAlign)">加入</el-button>

                    <el-button type="primary" @click="deletepop(formLabelAlign.index)">删除</el-button>

                </div>
                <div style="text-align: center;margin: 80px 30px 10px 10px">
                    <el-button type="primary" @click="submitForm(mytitles)">保存</el-button>
                </div>

            </div>
        </template>

    </div>
</template>

<script>
    //import rightmenu from '../components/rightmenu'
    import questions from '../components/questions'
    import point from '../components/small/point'

    export default {
        components: {
           // 'rightmenu': rightmenu,
            questions,
            point,
        },
        name: "mypaper",
        computed: {
            user() {
                return this.$store.getters.user;
            }
        },
        data() {
            return {
                formLabelAlign: {
                    t1: '',
                    t2: '',
                    t3: '',
                    score: '',
                    index: ''
                },
                itemposition: {},
                paperpages: 2,
                titles: [
                    {
                        header: {
                            barcode: '',
                            name: '',
                        }
                    },

                    {
                        title: '一', questions: [
                            {id: 1, e: 'A'},
                            {id: 2, e: 'A'},
                            {id: 3, e: 'A'},
                        ], x1: '', x2: '', y1: '', y2: ''
                    },

                    {
                        title: '二', questions: [
                            {id: 1, e: 'A'},
                            {id: 2, e: 'A'},
                            {id: 3, e: 'A'},
                            {id: 3, e: 'A'},
                            {id: 3, e: 'A'},
                            {id: 3, e: 'A'},
                            {id: 3, e: 'A'},
                            {id: 3, e: 'A'},
                            {id: 3, e: 'A'},
                        ], x1: '', x2: '', y1: '', y2: ''
                    },

                ],
                mytitles: [{
                    titles: [
                        {
                            header: {
                                name: '第五次月考数学试卷',
                                "teacher": '',
                                "class": "数学",
                                "content_path": "",
                                "created_at": new Date().toString(),
                                "description": "this is desc",
                                "update_at": new Date().toString(),
                                "absent": "",
                                "note": "this is note",
                                "barcode": "jahdj4h5h5jn45bh43b",
                            }
                        },

                        {
                            title: '一', questions: [
                                {id: 1, e: 'A', score: ''},
                                {id: 2, e: 'A', score: ''},
                                {id: 3, e: 'A', score: ''},
                            ], x1: '', x2: '', y1: '', y2: ''
                        },

                        {
                            title: '二', questions: [
                                {id: 4, e: 'A', score: ''},
                                {id: 5, e: 'A', score: ''},
                                {id: 6, e: 'A', score: ''},
                                {id: 7, e: 'A', score: ''},
                                {id: 8, e: 'A', score: ''},
                                {id: 9, e: 'A', score: ''},
                                {id: 10, e: 'A', score: ''},
                                {id: 11, e: 'A', score: ''},
                                {id: 12, e: 'A', score: ''},
                            ], x1: '', x2: '', y1: '', y2: ''
                        },

                    ]
                },
                //     {
                //     titles: [
                //         {
                //             title: '一', questions: [
                //                 {id: 1, e: 'A', score: ''},
                //                 {id: 2, e: 'A', score: ''},
                //                 {id: 3, e: 'A', score: ''},
                //             ], x1: '', x2: '', y1: '', y2: ''
                //         },
                //
                //         {
                //             title: '二', questions: [
                //                 {id: 4, e: 'A', score: ''},
                //                 {id: 5, e: 'A', score: ''},
                //                 {id: 6, e: 'A', score: ''},
                //                 {id: 7, e: 'A', score: ''},
                //                 {id: 8, e: 'A', score: ''},
                //                 {id: 9, e: 'A', score: ''},
                //                 {id: 10, e: 'A', score: ''},
                //                 {id: 11, e: 'A', score: ''},
                //                 {id: 12, e: 'A', score: ''},
                //             ], x1: '', x2: '', y1: '', y2: ''
                //         },
                //
                //     ]
                // }

                ]
            }
        },
        methods: {
            //用来测试是否能正常加入的函数。
            insertTitle: function (form) {
                var title = {
                    title: form.t1,
                    questions: []
                };
                var count = form.t2.split("-")[0];
                var max = form.t2.split("-")[1];
                var exp = [];           //期望的答案
                var score = form.score; //本题分数

                /** 数据打包！**/
                if (max != undefined) {
                    max++;
                    for (var e in form.t3.split("-")) {
                        exp.push(e)
                    }
                    for (var i = count; i < max; i++) {
                        title.questions.push({id: i, e: exp, score: score})
                    }
                } else {
                    exp.push(form.t3);
                    title.questions.push({id: count, e: exp, score: score})
                }
                if (title.title === '' || title.title === undefined) {
                    alert("空数据");
                    return
                }

                /** 识别是在哪张试卷生成这道题目**/
                var maxHeight=759.77;   //this.$refs.paper.getBoundingClientRect().height; console.log("最大高度"+maxHeight);
                var currentHeight=0.0;
                if(this.mytitles.length!=1){
                    for(var paperp in  this.mytitles[this.mytitles.length-1].titles){
                        currentHeight+=this.mytitles[this.mytitles.length-1].titles[paperp].yy;
                       // if(currentHeight>maxHeight) throw "当前高度已经大于最大高度了！";
                    }
                    if (currentHeight<maxHeight-151){
                        this.mytitles[this.mytitles.length-1].titles.push(title);   //如果高度足够则放进去
                    } else {
                        this.mytitles.push({titles:[title]});                       //高度不够新开一个试卷
                    }
                }else {
                    //var headerHeight=this.mytitles[0].titles[0].yy;
                    for(var paperp in  this.mytitles[0].titles){
                        currentHeight+=this.mytitles[0].titles[paperp].yy;
                       // if(currentHeight>maxHeight) throw "当前高度已经大于最大高度了！";
                    }
                    if (currentHeight<maxHeight-151){
                        this.mytitles[0].titles.push(title);   //如果高度足够则放进去

                    } else {
                        this.mytitles.push({titles:[title]}); //高度不够新开一个试卷

                    }
                }
                //到这里还不算，需要判断插入的数据是否正确。需要在update中判断。




            },
            deletepop: function () {

                this.mytitles[this.mytitles.length-1].titles.pop();

                if(this.mytitles[this.mytitles.length-1].titles.length===0){
                    this.mytitles.pop();
                }
            },
            isFail:function () {
                /** 测试放入的题目可不可行**/
                var currentHeight=0.0;
                for(var paperp in  this.mytitles[this.mytitles.length-1].titles){
                    currentHeight+=this.mytitles[this.mytitles.length-1].titles[paperp].yy;
                    //console.log(currentHeight);
                    if (currentHeight>756){
                        this.deletepop();
                        alert("在这道题放入的小题目太多了");
                    }
                }
            },
            setItemPosition: function (data) {   //从子组件获取坐标值
                this.itemposition = data;
            },
            submitForm(formName) {
                this.$axios
                // .post('http://localhost:3000/api/add_expaper',this.expaperCreate)
                    .post('api/add_expaper', formName)
                    .then(res => {
                        this.$message({
                                message: '成功',
                                type: 'success'
                            },
                        );
                        console.log(res)

                    });
                this.$router.push('/index');


            },
        },
        updated(){
            this.isFail();
        },
        mounted(){
            this.mytitles[0].titles[0].header.teacher=this.user.username
        },
        directives: { //自定义属性

        },

    }
</script>

<style scoped>

    .rightmeun {
        width: 400px;
        height: 900px;
        float: right;

        position: absolute;
        right: 5%;
        top: 10%;
        z-index: 100;
        border: 1px solid #c7ddef;
        background-color: #c7ddef;
    }

    .tiny {
        float: left;
        margin: 5px;
        padding: 5px;
    }

    .title {
        float: left;
        margin: 5px;
        padding: 5px;
    }

    .question {
        width: 100%;
        min-height: 149px;

        top: 5%;
        left: 5%;
        /*position: absolute;*/
        overflow: hidden;
        text-align: center;
        border: 1px solid #000;
    }

    .paperheader {
        width: 100%;
        height: 20%;
        top: 5%;
        left: 5%;
        /*position: absolute;*/
        /*overflow:hidden;*/
        text-align: center;
        border: 1px solid #000;
    }

    .container {
        width: 90%;
        height: 90%;
        top: 5%;
        left: 5%;
        position: absolute;
        text-align: center;
        border: 1px solid #000;
    }

    .paper {
        /* A4 595x842    210mm x 297mm */
        width: 595px;
        height: 842px;
        /*position: absolute;*/
        position: relative;


        /*top: 0%;*/
        left: 25%;
        /*padding: 25px;*/
        /*border-radius: 5px;*/
        text-align: center;
        margin-top: 20px;
        margin-bottom: 50px;
        background-color: #fff;
        /*padding: 20px 40px 20px 20px;*/
        border-radius: 5px;
        box-shadow: 0px 5px 10px #cccc;

        overflow: auto;

    }

    .background {
        width: 100%;
        height: 100%;
        overflow: auto;

    }

</style>