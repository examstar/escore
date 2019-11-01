<template>
    <div class="pointball" :ref="refindex"></div>
</template>

<script>
    export default {
        props:["myposition","index","tindex","containertop"],

        name: "point",

        data(){
          return{
              positions:this.myposition,
              myindex:this.index,
              refindex:"pointball-"+this.tindex,
              paperpage:this.tindex.split('-')[0],

          }
        },
        mounted(){

            this.setPosition(this.myindex,this.positions);

            //this.setPosition(this.myindex,this.positions);

        },


        /**
         * 获取滚动高度，这里用总高度减去滚动高度来生成最终定位坐标
         * **/
        methods:{
            setPosition:function (index,position) {
                //console.log(this.refindex);

                var relativeTop;
                //var relativeTop=this.paperpage*890+150;
                let sposition = document.documentElement.scrollTop || document.body.scrollTop;
                //console.log("S:------"+sposition);

             if(this.paperpage==0){
                 relativeTop=150-sposition
             }else{
                 relativeTop=150+890*this.paperpage-sposition                    //1040-sposition
             }



                switch (index) {
                    case 1:{
                        this.$refs[`${this.refindex}`].style.left = 0 +"px";
                        this.$refs[`${this.refindex}`].style.top = position.y1-relativeTop+"px";
                    }
                        break;
                    case 2:{
                        this.$refs[`${this.refindex}`].style.left = position.xx +"px";
                        this.$refs[`${this.refindex}`].style.top = position.y1-relativeTop +"px";
                    } break;
                    case 3:{
                        this.$refs[`${this.refindex}`].style.left = 0 +"px";
                        this.$refs[`${this.refindex}`].style.top = position.y2-relativeTop +"px";
                    } break;
                    case 4:{
                        this.$refs[`${this.refindex}`].style.left = position.xx  +"px";
                        this.$refs[`${this.refindex}`].style.top = position.y2-relativeTop +"px";

                    } break;
                    default:console.log("索引出现错误！！")
                }
            }
        },

        watch: {


        }

    }
</script>

<style scoped>
    .pointball {
        width: 10px;
        height: 8px;
        background-color: red;
        position:inherit;

        border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
    }
</style>