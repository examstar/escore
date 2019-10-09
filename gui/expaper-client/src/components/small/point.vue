<template>
    <div class="pointball" ref="pointball"></div>
</template>

<script>
    export default {
        props:["myposition","index"],

        name: "point",

        data(){
          return{
              positions:this.myposition,
              myindex:this.index,
          }
        },
        mounted(){

            this.setPosition(this.myindex,this.positions);

            //this.setPosition(this.myindex,this.positions);

        },


        methods:{
            setPosition:function (index,position) {
               // console.log(position);
                switch (index) {
                    case 1:{
                      //  this.$refs.pointball.style.left = Math.ceil(position.x1) +"px";
                      //  this.$refs.pointball.style.top = position.y1 +"px";

                        this.$refs.pointball.style.left = 0 +"px";
                        this.$refs.pointball.style.top = 0 +"px";
                    }
                        break;
                    case 2:{
                      //  this.$refs.pointball.style.left = position.x2+"px";
                      //  this.$refs.pointball.style.top = position.y1+"px";

                        this.$refs.pointball.style.left = position.xx +"px";
                        this.$refs.pointball.style.top = 0 +"px";

                        console.log("获取到第二个！！"+ Math.ceil(this.$refs.pointball.getBoundingClientRect().top)+"px");
                    } break;
                    case 3:{
                      //  this.$refs.pointball.style.left = position.x1+"px";
                      //  this.$refs.pointball.style.top = position.y2+"px";

                        this.$refs.pointball.style.left = 0 +"px";
                        this.$refs.pointball.style.top = position.yy +"px";
                    } break;
                    case 4:{
                      //  this.$refs.pointball.style.left = position.x2+"px";
                      //  this.$refs.pointball.style.top = Math.ceil(position.y2)+"px";

                        this.$refs.pointball.style.left = position.xx  +"px";
                        this.$refs.pointball.style.top = position.yy +"px";

                    } break;
                    default:console.log("索引出现错误！！")
                }
            }
        },

        watch: {

            myposition(){

                this.positions = this.myposition;
                //console.log(this.positions.x1);



            }
        }

    }
</script>

<style scoped>
    .pointball {
        width: 5px;
        height: 5px;
        background-color: red;
        position:absolute;
        border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
    }
</style>