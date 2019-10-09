<template>
    <div class="question" id="question" ref="element">


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
                    x1: this.titem.x1,
                    y1: this.titem.y1,
                    x2: this.titem.x2,
                    y2: this.titem.y2,

                    xx: this.titem.xx,
                    yy: this.titem.yy,
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