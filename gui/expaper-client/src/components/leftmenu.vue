<template>
    <el-row class="menu_page">

        <el-col >
            <el-menu
                    class="el-menu-vertical-demo"
                    background-color="#324057"
                    text-color="#fff"
                    active-text-color="#409eff"
                    default-active="1"

            >
                <router-link to="/home">


                    <el-menu-item index="0">
                        <i class="fa fa-margin fa-server"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>

                    <template v-for="item in items">

                        <el-submenu v-if="item.children" :index="item.path" :key="item.path">

                            <template slot="title">
                                <i class="'fa fa-margin fa-server'+item.icon"></i>
                                <span slot="title">{{item.name}}</span>
                            </template>
                            <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
                                <el-menu-item :index="citem.path" >
                                    <span slot="title">{{citem.name}}</span>
                                </el-menu-item>
                            </router-link>

                        </el-submenu>
                    </template>
                </router-link>

            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "leftmeau",
        data(){
            return{
                items:[
                    {icon:'fa-money',name:'试卷管理',path:'fund',children:[
                            {path:'mypaper',name:'创建答题卡'},
                            {path:'expapercreate',name:'创建试卷'},
                            {path:'expaperlist',name:'试卷列表'},


                        ]},
                    {icon:'fa-asterike',name:'信息管理',path:'info',children:[
                            {path:'infoshow',name:'个人信息'}
                        ]},
                    {icon:'fa-asterike',name:'其他操作',path:'opera',children:[
                            {path:'operating',name:'分割试卷'},
                            {path:'uplodeimg',name:'上传图片'}
                        ]},
                    {icon:'fa-asterike',name:'学生管理',path:'stud',children:[
                            {path:'stulist',name:'学生列表'},
                            {path:'uplodeimg',name:'其他'},
                            {path:'testpages',name:'测试'},
                        ]},
                ]
            }
        },
       mounted() {
           if (this.$store.getters.identity==="manager") {
               var info={path:'userslist',name:'用户列表'};
               this.items[1].children.push(info)
           }else{
               var info={path:'userslist',name:'用户列表'};
               this.items[1].children.push(info)
           }
       }
    }
</script>

<style scoped>
    .menu_page {
        position: absolute;
        top: 71px;
        left: 0;
        min-height: 100%;
        background-color: #324057;
        z-index: 99;

    }
    .el-menu {
        border: none;
    }
    .fa-margin {
        margin-right: 5px;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 180px;
        min-height: 400px;
    }
    .el-menu-vertical-demo {
        width: 35px;
    }
    .el-submenu .el-menu-item {
        min-width: 180px;
    }

    .hiddenDropdown,
    .hiddenDropname {
        display: none;
    }
    a {
        text-decoration: none;
    }
</style>