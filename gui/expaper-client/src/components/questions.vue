<template>

    <div v-if="item.header" class="question" id="question" ref="element">
        <div style="text-align: center"><a style= "font-size: 25px">{{item.header.name}}</a></div>
        <div style="float: left; margin: 0px 0px 0px 10px"> 姓名：________________</div><br>
        <div style="float: left; margin: 0px 0px 0px 10px"> 学校：________________</div><br>
        <div style="float: left; margin: 0px 0px 0px 10px"> 学号：________________</div><br>
        <div style="float: left; margin: 0px 0px 0px 10px"> barcode：<div style="border: 1px #1f2d3d solid;width: 80px;height: 20px"></div></div><br>
        <br>
    </div>
    <div v-else-if="item.questions.length===1" class="question" id="question" ref="element">
        <div class="title"><strong><a>第{{item.title}}大题：</a></strong></div>
        <br>
        <template v-for="(question,qindex) in item.questions">
            <div class="tiny"> {{question.id}}、</div>
        </template>
    </div>
    <div v-else class="question" id="question" ref="element">
        <div class="title"><strong><a>第{{item.title}}大题：</a></strong></div>
        <br>
        <template v-for="(question,qindex) in item.questions">
            <div class="tiny"> {{question.id}}、_______</div>
        </template>
    </div>
</template>

<script>

    export default {

        name: "questions.vue",
        props: ["item", "index"],
        mounted() {

            this.getXY(this.index.outer, this.index.inner);
            this.sendMsgToParent()

        },
        data() {
            return {
                titem: this.item,

                xx: '',
                yy: '',

            }
        },
        methods: {
            getXY: function (index, tindex) {
                var height = this.$refs.element.getBoundingClientRect().height;
                var width = this.$refs.element.getBoundingClientRect().width;
                var left = this.$refs.element.getBoundingClientRect().left;
                var top = this.$refs.element.getBoundingClientRect().top;

                this.titem.x1 = left;
                this.titem.y1 = top;
                this.titem.x2 = width + left;
                this.titem.y2 = height + top;

                this.titem.xx = width;
                this.titem.yy = height;

                this.xx = width;
                this.yy = height;
                //   console.log("坐标："+this.item.x1+"------"+this.item.y1);
                //   console.log("坐标2："+this.item.x2+"------"+this.item.y2);

            },
            sendMsgToParent: function () {
                this.$emit("listenData", {

                    x1: parseFloat(this.titem.x1).toFixed(4),
                    y1: parseFloat(this.titem.y1).toFixed(4),
                    x2: parseFloat(this.titem.x2).toFixed(4),
                    y2: parseFloat(this.titem.y2).toFixed(4),
                    xx: parseFloat(this.titem.xx).toFixed(4),
                    yy: parseFloat(this.titem.yy).toFixed(4),
                    // x1: Math.ceil(this.titem.x1),
                    // y1: Math.ceil(this.titem.y1),
                    // x2: Math.ceil(this.titem.x2),
                    // y2: Math.ceil(this.titem.y2),
                    // xx: Math.ceil(this.titem.xx),
                    // yy: Math.ceil(this.titem.yy),

                })
            }
        },
    }
</script>

<style scoped>
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

    .pointball {
        width: 5px;
        height: 5px;
        background-color: red;
        position: absolute;
        border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
    }
</style>