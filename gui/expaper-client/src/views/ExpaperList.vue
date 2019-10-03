<template>

    <div class="list">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title"> Expaper List </span>

    <el-table
            :data="list"
            style="width: 100%" class="listTable">


        <el-table-column
                label="试卷名字"
                width="180">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                    <p>试卷名字: {{ scope.row.name }}</p>
                    <p>描述: {{ scope.row.description }}</p>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                    </div>
                </el-popover>
            </template>
        </el-table-column>


        <el-table-column
                label="试卷类型"
                width="180">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.class }}</span>
            </template>
        </el-table-column>

        <el-table-column
                label="命题人"
                width="180">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.teacher }}</span>
            </template>
        </el-table-column>

        <el-table-column
                label="日期"
                width="180">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
            </template>
        </el-table-column>

        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row.id, scope.row)">删除</el-button>
            </template>
        </el-table-column>



    </el-table>

            </div>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </section>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                list:[],

                tableData: [{
                    date: '2016-05-02',
                    name: '数学试卷',
                    address: '2016年数学考试试卷'
                }, {
                    date: '2016-05-02',
                    name: '语文试卷',
                    address: '2016年数学考试试卷'
                }, {
                    date: '2016-05-02',
                    name: '数学试卷',
                    address: '2016年数学考试试卷'
                }, {
                    date: '2016-05-02',
                    name: '英语试卷',
                    address: '2016年数学考试试卷'
                }]
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {

                    this.$axios.get('/api/del_expaper',{params:{id:index}}).then(result => {

                        console.log(result);
                        this.getAllList();
                    });


            },
            getAllList() {
                this.$axios.get('/api/getscript').then(result => {
                    this.list = result.data.data
                    console.log(result.data.data)
                })
            },
        },
        created() {
            this.getAllList()
        },
    }
</script>

<style scoped>
    .list {
        position: relative;
        width: 100%;
        height: 100%;
        /*background: url(../assets/bg02.jpg) no-repeat center center;*/
        /*background-color: #2c3e50;*/
        background-size: 100% 100%;
    }

    .form_container {
        width: 80%;
        height: 20%;
        position: absolute;
        top: 20%;
        left: 10%;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
    }
    .form_container .manage_tip .title {
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 26px;
        color: #555555;
    }
    .listTable {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0px 5px 10px #cccc;
    }

</style>