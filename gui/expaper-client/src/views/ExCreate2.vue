<template>
    <div class="background">
        <rightmenu ref="rightmenu"></rightmenu>

        <template v-for="(paperpage,index) in mytitles">
            <!--        <template>-->
            <div class="paper">
                <h3 style="text-align: center">答题卡</h3>
                <div class="container">
                    <div class="paperheader" id="header">
                    </div>
                    <!--        <template v-for="item in items">-->
                    <template v-for="(item,tindex) in paperpage.titles">

                        <questions :item=item :index={outer:index,inner:tindex} @listenData="setItemPosition">
                        </questions>

                        <template v-for="i in 4">
                            <point :myposition="itemposition" :index="i"></point>
                        </template>

                        <!--                        <div class="question" id="question" ref="element" v-getxy='{a:index,b:tindex }' >-->
                        <!--                            <div class ="title" >  <strong><a>第{{item.title}}大题：</a></strong> </div><br>-->

                        <!--                            <template v-for="(question,qindex) in item.questions">-->
                        <!--                                <div class="tiny"> {{question.id}}、_______ </div>-->
                        <!--                            </template>-->

                        <!--                        </div>-->
                    </template>

                </div>


            </div>
        </template>

        <template>
            <div class="rightmeun">


                <div style="text-align: center;margin: 10px 30px 10px 10px">
                    <el-form  label-width="80px" :model="formLabelAlign">
                        <el-form-item label="大题：" style="text-decoration-color: white">
                            <el-input v-model="formLabelAlign.t1" placeholder="示例：三"></el-input>
                        </el-form-item>
                        <el-form-item label="小题:" style="text-decoration-color: white">
                            <el-input v-model="formLabelAlign.t2" placeholder="示例：16-20"></el-input>
                        </el-form-item>
                        <el-form-item label="答案:" style="text-decoration-color: white">
                            <el-input v-model="formLabelAlign.t3"  placeholder="示例：B-A-ABC-C-BC"></el-input>
                        </el-form-item>
                    </el-form>

                    <el-button type="primary" @click="aaaa(formLabelAlign)">加入</el-button>

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
    import rightmenu from '../components/rightmenu'
    import questions from '../components/questions'
    import point from '../components/small/point'

    export default {
        components: {
            'rightmenu': rightmenu,
            questions,
            point,
        },
        name: "mypaper",
        data() {
            return {

                formLabelAlign: {
                    t1: '',
                    t2: '',
                    t3: '',
                    index:''
                },
                itemposition: {},
                paperpages: 2,
                titles: [
                    {
                        header:{
                            barcode:'',
                            name:'',
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
                            header:{
                                barcode:'aaaaaasdasdassada',
                                name:'aaaa',
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

                    ]
                }, {
                    titles: [
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

                    ]
                }]
            }
        },
        methods: {
            //用来测试是否能正常加入的函数。
            aaaa: function (form) {

                var title={
                    title:form.t1,
                    questions:[]
                };
                var count=form.t2.split("-")[0];
                var max=form.t2.split("-")[1];
                max++;
                var exp=[];
                for(var e in form.t2.split("-")){
                    exp.push(e)
                }
                for(var i=count;i<max;i++ ){
                    title.questions.push({id:i,e:exp})
                }


                if(title.title===''||title.title===undefined){
                    alert("空数据");
                    return
                }
               this.mytitles[0].titles.push(title);

            },

            deletepop:function(){
                this.mytitles[0].titles.pop()
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
        directives: { //自定义属性

        }
    }
</script>

<style scoped>

    .rightmeun {
        width: 400px;
        height: 700px;
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
        min-height: 150px;

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