<template>
    <div class="background">
        <rightmenu ref="rightmenu"></rightmenu>
        <!--        <template v-for="item in items">-->
        <template>
            <div class="paper">
                <h3 style="text-align: center">答题卡</h3>
                <div class="container">
                    <div class="paperheader" id="header">
                    </div>
                    <!--        <template v-for="item in items">-->
                    <template v-for="item in titles">
                        <div class="question" id="question">

                            <template v-for="(question,index) in item.questions">
                                <div> {{question.id}}、_______ </div>
                            </template>

                        </div>
                    </template>

                </div>


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
                    {title:'1',questions:[
                        {id:1,e:'A'},
                        {id:2,e:'A'},
                        {id:3,e:'A'},
                        ],x1:'',x2:'',y1:'',y2:''},
                    {title:'2',questions:[{}],x1:'',x2:'',y1:'',y2:''},
                    {title:'3',questions:[{}],x1:'',x2:'',y1:'',y2:''},
                    {title:'4',questions:[{}],x1:'',x2:'',y1:'',y2:''},
                ]
            }
        },
        methods:{
            aaaa:function () {
                console.log(this.$refs.rightmenu)
                console.log(this.$refs.rightmenu.ooxx)

            },
            getDivPosition:function (dom) {
                var x1= this.$refs.dom.getBoundingClientRect().left;
                var y1= this.$refs.dom.getBoundingClientRect().top;

            }
        }
    }
</script>

<style scoped>

    .question {
        width: 100%;

        top: 5%;
        left: 5%;
        /*position: absolute;*/
        overflow:hidden;
        text-align: center;
        border: 1px solid #000
    }
    .paperheader {
        width: 100%;
        height: 20%;
        top: 5%;
        left: 5%;
        /*position: absolute;*/
        /*overflow:hidden;*/
        text-align: center;
        border: 1px solid #000
    }

    .container {
        width: 90%;
        height: 90%;
        top: 5%;
        left: 5%;
        position: absolute;
        text-align: center;
        border: 1px solid #000
    }

    .paper {
        /* A4 595x842    210mm x 297mm */
        width: 595px;
        height: 842px;
        position: absolute;
        /*top: 0%;*/
        left: 25%;
        /*padding: 25px;*/
        /*border-radius: 5px;*/
        text-align: center;
        margin-top: 20px;
        background-color: #fff;
        /*padding: 20px 40px 20px 20px;*/
        border-radius: 5px;
        box-shadow: 0px 5px 10px #cccc;

    }

</style>