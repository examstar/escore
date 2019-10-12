<!--Attention!   Depressed! -->

<template>
    <el-row class="menu_page">


    </el-row>
</template>

<script>
    export default {
        name: "leftmeau",
        data(){
            return{
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                },

                items:[
                    {icon:'fa-money',name:'试卷管理',path:'fund',children:[
                            {path:'expapercreate',name:'创建试卷'},
                            {path:'expaperlist',name:'试卷列表'},
                        ]},
                    {icon:'fa-asterike',name:'信息管理',path:'info',children:[
                            {path:'infoshow',name:'个人信息'}
                        ]},
                ],
                ooxx:"aaaaaaaaa"
            }
        }
    }
</script>

<style scoped>
    .menu_page {
        position: fixed;
        top: 0%;
        left: 90%;
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