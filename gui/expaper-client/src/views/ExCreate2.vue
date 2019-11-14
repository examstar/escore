<template>
    <div class="background" id="bigbackground" ref="bigbackground">
        <!--        <rightmenu ref="rightmenu"></rightmenu>-->
        <!--        迭代生成试卷纸 A4-->
        <template v-for="(paperpage,index) in mytitles">
            <div class="paper">
                <h3 style="text-align: center">答题卡</h3>
                <div class="container" ref="container">

                    <!--迭代每一道大题，并且返回大题坐标-->
                    <template v-for="(item,tindex) in paperpage.titles">
                        <!--迭代每道小题-->
                        <questions :item=item :index={outer:index,inner:tindex} @listenData="setItemPosition">
                        </questions>
                        <!--                        返回坐标-->
                        <point v-for="i in 4" :myposition="item" :index="i" :tindex="index+'-'+ tindex"></point>
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
                        <el-form-item label="试卷名称：">
                            <el-input v-model="mytitles[0].titles[0].header.name" placeholder="?"></el-input>
                        </el-form-item>
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
                            <a> 从第<el-input v-model="formLabelAlign.from" placeholder="示例：16-20" style="width: 30%"></el-input>题到
                                第<el-input v-model="formLabelAlign.fromto" placeholder="示例：16-20" style="width: 30%"></el-input>题</a>
                        </el-form-item>

                            <el-form-item label="题目类型" >
                                <a>
                                <el-select v-model="formLabelAlign.tinytype" placeholder="请选题目类型" style="width: 35%">
                                    <el-option label="选择题" value="select"></el-option>
                                    <el-option label="填空题" value="blank"></el-option>
                                    <el-option label="解答题" value="answer"></el-option>
                                </el-select>
                                每道题得分<el-input v-model="formLabelAlign.score" placeholder="示例：3" style="width: 35%"></el-input></a>
                            </el-form-item>




                        <el-form-item label="答案：">
                            <el-input v-model="formLabelAlign.t3" placeholder="示例：B-A-ABC-C-BC"></el-input>
                        </el-form-item>
                    </el-form>

                    <el-button type="primary" @click="insertTitle(formLabelAlign)">加入</el-button>

                    <el-button type="primary" @click="deletepop(formLabelAlign.index)">删除</el-button>

                </div>
                <div style="text-align: center;margin: 20px 30px 10px 10px">
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
        watch: {},
        data() {
            return {

                formLabelAlign: {
                    t1: '',
                    //t2: '' + "浏览器状态" + window.innerHeight + "-----" + window.innerWidth+"\n"+"h:"+document.body.clientWidth +"w:"+document.body.clientHeight,
                    t2: '',
                    t3: '',
                    score: '',
                    index: '',
                    from:'',
                    fromto:'',
                    tinytype:'',
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
                            {id: 1, e: 'A',tinytype:'select'},
                            {id: 2, e: 'A',tinytype:'select'},
                            {id: 3, e: 'A',tinytype:'select'},
                            {id: 4, e: 'A',tinytype:'select'},
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
                                "scalingrate": (window.screen.width / 1920).toFixed(4),
                            }
                        },

                        {
                            title: '一', questions: [
                                {id: 1, e: 'A', score: '',tinytype:'select'},
                                {id: 2, e: 'A', score: '',tinytype:'select'},
                                {id: 3, e: 'A', score: '',tinytype:'select'},
                                {id: 4, e: 'A', score: '',tinytype:'select'},
                                {id: 5, e: 'A', score: '',tinytype:'select'},
                                {id: 6, e: 'A', score: '',tinytype:'select'},
                                {id: 7, e: 'A', score: '',tinytype:'select'},
                                {id: 8, e: 'A', score: '',tinytype:'select'},
                                {id: 9, e: 'A', score: '',tinytype:'select'},
                                {id: 10, e: 'A', score: '',tinytype:'select'},
                            ], x1: '', x2: '', y1: '', y2: ''
                        },

                        {
                            title: '二', questions: [

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

                ],

            }
        },
        methods: {


            //用来测试是否能正常加入的函数。
            insertTitle: function (form) {
                var title = {
                    title: form.t1,
                    questions: []
                };
                var count =form.from; // form.t2.split("-")[0];
                var max =form.fromto; // form.t2.split("-")[1];
                var exp = [];           //期望的答案
                var score = form.score; //本题分数
                var tinytype = form.tinytype; //本题分数

                /** 数据打包！ 正确答案数据**/
                if (max != undefined) {
                    max++;
                    for (var e in form.t3.split("-")) {
                        exp.push(e)
                    }
                    for (var i = count; i < max; i++) {
                        title.questions.push({id: i, e: exp, score: score,tinytype:tinytype})
                    }
                } else {
                    exp.push(form.t3);
                    title.questions.push({id: count, e: exp, score: score,tinytype:tinytype})
                }
                if (title.title === '' || title.title === undefined) {
                    alert("空数据");
                    return
                }

                /** 识别是在哪张试卷生成这道题目**/
                var maxHeight = 759.77;   //this.$refs.paper.getBoundingClientRect().height; console.log("最大高度"+maxHeight);
                var currentHeight = 0.0;
                if (this.mytitles.length != 1) {
                    for (var paperp in  this.mytitles[this.mytitles.length - 1].titles) {
                        currentHeight += this.mytitles[this.mytitles.length - 1].titles[paperp].yy;
                        // if(currentHeight>maxHeight) throw "当前高度已经大于最大高度了！";
                    }
                    if (currentHeight < maxHeight - 151) {
                        this.mytitles[this.mytitles.length - 1].titles.push(title);   //如果高度足够则放进去
                    } else {
                        this.mytitles.push({titles: [title]});                       //高度不够新开一个试卷
                    }
                } else {
                    //var headerHeight=this.mytitles[0].titles[0].yy;
                    for (var paperp in  this.mytitles[0].titles) {
                        currentHeight += this.mytitles[0].titles[paperp].yy;
                        // if(currentHeight>maxHeight) throw "当前高度已经大于最大高度了！";
                    }
                    if (currentHeight < maxHeight - 151) {
                        this.mytitles[0].titles.push(title);   //如果高度足够则放进去

                    } else {
                        this.mytitles.push({titles: [title]}); //高度不够新开一个试卷

                    }
                }
                //到这里还不算，需要判断插入的数据是否正确。需要在update中判断。


                //更新列表
                this.formLabelAlign.t1 = this.toChies(this.getQuestionIndex());
                this.formLabelAlign.from = this.getTinyIndex() + "";
                this.formLabelAlign.fromto = this.getTinyIndex() + 5;
            },
            //获取当前的题目数
            getQuestionIndex: function () {
                var countQ = 0;
                for (var indexT in this.mytitles) {
                    for (var indexQ in this.mytitles[indexT].titles) {
                        countQ = countQ + 1;
                    }
                }
                //console.log("索引为---------"+countQ);
                return countQ;
            },
            getTinyIndex: function () {
                var countQ = 0;
                for (var indexT in this.mytitles) {

                    for (var indexQ in this.mytitles[indexT].titles) {

                        for (var index in this.mytitles[indexT].titles[indexQ].questions) {
                            countQ = countQ + 1;
                        }
                    }
                }
                //console.log("索引为---------"+countQ);
                return countQ + 1;
            },
            //删除题目
            deletepop: function () {

                this.mytitles[this.mytitles.length - 1].titles.pop();

                if (this.mytitles[this.mytitles.length - 1].titles.length === 0) {
                    this.mytitles.pop();
                }

                this.formLabelAlign.t1 = this.toChies(this.getQuestionIndex());
                this.formLabelAlign.from = this.getTinyIndex() + "";
                this.formLabelAlign.fromto = this.getTinyIndex() + 5;
            },
            //判断是否成功
            isFail: function () {
                /** 测试放入的题目可不可行**/
                var currentHeight = 0.0;
                for (var paperp in  this.mytitles[this.mytitles.length - 1].titles) {
                    currentHeight += this.mytitles[this.mytitles.length - 1].titles[paperp].yy;
                    //console.log(currentHeight);
                    if (currentHeight > 756) {
                        this.deletepop();
                        alert("在这道题放入的小题目太多了");
                    }
                }
            },
            //设置题目位置
            setItemPosition: function (data) {   //从子组件获取坐标值
                this.itemposition = data;
                //console.log("aaaaa"+data.xx+"----"+data.yy);
            },
            //提交数据给后端接口
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
                        //console.log(res);
                        this.$router.push('/expaperlist');

                    });


            },

            //中文数字转换
            toChies: function (values) {//形参
                values = values.toString();
                var len = values.length;   //统计出长度

                var arr = [];

                //var chin_list=['零','壹','贰','叁','肆','伍','陆','柒','捌','玖']; //所有的数值对应的汉字
                var chin_list = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //所有的数值对应的汉字

                //var chin_lisp=['仟','佰','拾','亿','仟','佰','拾','万','仟','佰','拾']; //进制
                var chin_lisp = ['仟', '佰', '拾', '亿', '仟', '佰', '拾', '万', '千', '百', '十']; //进制

                for (var i = 0; i < len; i++) {
                    arr.push(parseInt(values[i]));		//输入的数据按下标存进去   存进去的只是数字
                    arr[i] = chin_list[arr[i]]			//是根据我们输入的输入的数字，对应着我们的chin_list这个数组
                }//123['壹','佰','贰','拾','叁']

                for (var i = len - 1, j = 1; i > 0; i--) {//i =2	1		//倒序		为了添加进制，方便我们去观看
                    arr.splice(i, 0, chin_lisp[chin_lisp.length - j++])	//j=2
                }
                //console.log(arr)

                arr = arr.join('')
                if (len >= 1) {
                }
                return arr
            },
        },
        updated() {
            this.isFail();


        },

        mounted() {
            this.mytitles[0].titles[0].header.teacher = this.user.username;
            this.formLabelAlign.t1 = this.toChies(this.getQuestionIndex());
            this.formLabelAlign.from = this.getTinyIndex() + "";
            this.formLabelAlign.fromto = this.getTinyIndex() + 5;


            //console.log("浏览器状态"+window.innerHeight+"-----"+window.innerWidth)


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

        /*overflow: auto;*/

    }

    .background {
        width: 100%;
        height: 100%;
        overflow: auto;

    }

</style>