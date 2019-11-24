<template>

    <div class="list">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title"> Expaper List </span>

                <el-table
                        :data="pagelist"
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
<!--                            <el-button-->
<!--                                    size="mini"-->
<!--                                    @click="handleSplit(scope.row.id, scope.row)">分割-->
<!--                            </el-button>-->
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.row.id, scope.row)">编辑
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row.id, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>


                </el-table>

            </div>
            <el-col :span="24">
                <div class="pagination">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="paginations.page_index"
                            :page-sizes="paginations.page_sizes"
                            :page-size="paginations.page_size"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="paginations.total">
                    </el-pagination>
                </div>
            </el-col>

        </section>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                list: [],
                pagelist: [],
                paginations: {
                    page_index: 1,
                    total: 0,
                    page_size: 5,
                    page_sizes: [5, 10, 15, 20],
                    layout: 'total,sizes,prev,paper,next,jumper',
                },

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
                this.$router.push("/exedit"+index);
            },
            handleSplit(index, row) {
                document.documentElement.scrollTop=0;
                this.$router.push("/cuttingcanvas"+index);
            },
            handleDelete(index, row) {

                //this.$axios.get('/api/del_expaper', {params: {id: index}}).then(result => {
                this.$axios.get('/api/del_expaper/'+index).then(result => {

                    console.log(result);
                    this.getAllList();
                });

            },
            getAllList() {
                this.$axios.get('/api/getscript').then(result => {
                    this.list = result.data.data
                    console.log(result.data.data)
                    this.setPaginations()
                })
            },
            setPaginations() {
//分页属性
                this.paginations.total = this.list.length;
                this.paginations.page_index = 1;
                this.paginations.page_size = 5;
                //设置默认分页数据
                this.pagelist=this.list.filter((item,index)=>{
                    return index<this.paginations.page_size;
                })

            },
            handleSizeChange(page_size) {
                //console.log(`每页 ${val} 条`);
                this.paginations.page_index=1;
                this.paginations.page_size=page_size;
                this.pagelist=this.list.filter((item,index)=>{
                    return index<page_size;
                })
            },
            handleCurrentChange(page) {
                //console.log(`当前页: ${val}`);
                let index =this.paginations.page_size*(page-1);

                let nums=this.paginations.page_size*page;

                let tables=[];

                for(let i=index;i<nums;i++){
                    if(this.list[i]){
                        tables.push(this.list[i])
                    }
                    this.pagelist=tables
                }


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
        top: 10%;
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