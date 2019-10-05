<template>
    <div class="background">
        <rightmenu ref="rightmenu"></rightmenu>
                <template v-for="paperpage in paperpages">
<!--        <template>-->
            <div class="paper">
                <h3 style="text-align: center">答题卡</h3>
                <div class="container">
                    <div class="paperheader" id="header">
                    </div>
                    <!--        <template v-for="item in items">-->
                    <template v-for="item in titles">
                        <div class="question" id="question">
                            <div class ="title">  <strong><a>第{{item.title}}大题：</a></strong> </div><br>

                            <template v-for="(question,index) in item.questions">
                                <div class="tiny"> {{question.id}}、_______ </div>
                            </template>

                        </div>
                    </template>

                </div>


            </div>
        </template>

        <template>
            <div class="rightmeun">

                <button @click="aaaa(titles.length)">aaaaa </button>
            </div>
        </template>

    </div>
</template>

<script>
    import rightmenu from '../components/rightmenu'

    export default {
        components:{
            'rightmenu':rightmenu,
        },
        name: "mypaper",
        data() {
            return {
                paperpages:2,

                items: [
                    {
                        icon: 'fa-money', name: '试卷管理', path: 'fund', children: [
                            {path: 'expapercreate', name: '创建试卷'},
                            {path: 'expaperlist', name: '试卷列表'},
                        ]
                    },
                    {
                        icon: 'fa-asterike', name: '信息管理', path: 'info', children: [
                            {path: 'infoshow', name: '个人信息'}
                        ]
                    },
                ],

                titles:[
                    {title:'一',questions:[
                        {id:1,e:'A'},
                        {id:2,e:'A'},
                        {id:3,e:'A'},
                        ],x1:'',x2:'',y1:'',y2:''},

                    {title:'二',questions:[
                            {id:1,e:'A'},
                            {id:2,e:'A'},
                            {id:3,e:'A'},
                            {id:3,e:'A'},
                            {id:3,e:'A'},
                            {id:3,e:'A'},
                            {id:3,e:'A'},
                            {id:3,e:'A'},
                            {id:3,e:'A'},
                        ],x1:'',x2:'',y1:'',y2:''},

                ]
            }
        },
        methods:{
            //用来测试是否能正常加入的函数。
            aaaa:function (index) {
                console.log(this.$refs.rightmenu)
                console.log(this.$refs.rightmenu.ooxx)
                this.paperpages++
                this.titles.push(
                    {title:index,questions:[
                            {id:1,e:'A'},
                            {id:2,e:'A'},
                            {id:3,e:'A'},
                        ],x1:'',x2:'',y1:'',y2:''}
                )

            },

        }
    }
</script>

<style scoped>

    .rightmeun{


        width: 400px;
        height: 700px;


        float:right;
        position:absolute; right:5%; top:10%;
        z-index: 100;
        border: 1px solid #23527c;
        background-color: #204d74;
    }

    .tiny{
        float: left;
        margin: 5px;
        padding: 5px;
    }
    .title{
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
        overflow:hidden;
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

        overflow:auto;

    }

    .background{
        width: 100%;
        height: 100%;
        overflow:auto;
    }

</style>