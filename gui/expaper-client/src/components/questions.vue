<template>
    <div class="question" id="question" ref="element" >
        <div class ="title" >  <strong><a>第{{item.title}}大题：</a></strong> </div><br>

        <template v-for="(question,qindex) in item.questions">
            <div class="tiny"> {{question.id}}、_______ </div>
        </template>

    </div>
</template>

<script>
    export default {
        name: "questions.vue",
        props:["item"],
        mounted() {
            console.log(this.$refs.element.getBoundingClientRect().top);
            console.log(this.$refs.element.getBoundingClientRect().width);
            console.log(this.$refs.element.getBoundingClientRect().left);
        },
        methods:{
            getXY:function (index,tindex) {
                var heightStyle =this.$refs.element.style.height;
                var widthStyle =this.$refs.element.style.width;
                var left =this.$refs.element.style.left;
                var top =this.$refs.element.style.top;

                this.mytitles[index].titles[tindex].x1=left;
                this.mytitles[index].titles[tindex].y1=top;
                this.mytitles[index].titles[tindex].x2=widthStyle;
                this.mytitles[index].titles[tindex].y2=heightStyle;

                console.log("坐标："+ this.mytitles[index].titles[tindex].x1+"----"+this.mytitles[index].titles[tindex].y1)
            }
        }
    }
</script>

<style scoped>
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
</style>