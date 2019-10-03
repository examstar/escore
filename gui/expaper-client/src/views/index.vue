<template>
    <div class="index">
        <headnav></headnav>
        <leftmenu>
        </leftmenu>
        <router-view/>
<!--    <div class="form_container">-->
<!--        初始化页面-->
<!--        <el-row :gutter="20">-->
<!--            <el-col :span="6"><div class="grid-content bg-purple">-->
<!--                <p>进入注册？<router-link to='/register'>立即注册</router-link></p>-->
<!--            </div></el-col>-->
<!--            <el-col :span="6"><div class="grid-content bg-purple">-->
<!--                <p>进入登录？<router-link to='/login'>点击这里</router-link></p>-->
<!--            </div></el-col>-->
<!--            <el-col :span="6"><div class="grid-content bg-purple">-->
<!--                <p>进入创建？<router-link to='/expapercreate'>点击这里</router-link></p>-->
<!--            </div></el-col>-->
<!--            <el-col :span="6"><div class="grid-content bg-purple">-->
<!--                <p>查看列表？<router-link to='/expaperlist'>点击这里</router-link></p>-->
<!--            </div></el-col>-->
<!--        </el-row>-->
<!--    </div>-->
    </div>
</template>

<script>
    import HeaderNav from '../components/headernav';
    import leftmenu from '../components/leftmenu';



    export default {
        name: "index.vue",
        comments:{
        },
        components:{
            'headnav':HeaderNav,
            'leftmenu':leftmenu,
        }
    }
</script>
<style>
    .index{
        width:100%;
        height:100%;
        overflow: hidden;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .form_container {
        width: 40%;
        height: 20%;
        position: absolute;
        top: 20%;
        left: 30%;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
    }
</style>