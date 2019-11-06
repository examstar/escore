<!--        右侧添加题目导航栏-->
<template v-if="!cutting">
    <div class="rightmeun">
        <a> Header</a>
        <div style="text-align: center;margin: 10px 30px 40px 10px;border: seagreen">
            <el-form label-width="100px" :model="mytitles[0].titles[0].header">
                <el-form-item label="试卷名称：">
                    <el-input v-model="mytitles[0].titles[0].header.name" placeholder="?"></el-input>
                </el-form-item>
                <el-form-item label="创建人：">
                    <el-input v-model="mytitles[0].titles[0].header.teacher" placeholder="?"></el-input>
                </el-form-item>
                <el-form-item label="创建时间：">
                    <el-input v-model="mytitles[0].titles[0].header.created_at" placeholder="?"
                              :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="更新时间:">
                    <el-input v-model="mytitles[0].titles[0].header.update_at" placeholder="?"
                              :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="Note：">
                    <el-input v-model="mytitles[0].titles[0].header.note" placeholder="?"></el-input>
                </el-form-item>
                <el-form-item label="描述：">
                    <el-input type="textarea" v-model="mytitles[0].titles[0].header.description"
                              placeholder="?"></el-input>
                </el-form-item>
            </el-form>
        </div>

        <a> 添加题目</a>
        <div style="text-align: center;margin: 10px 30px 10px 10px">
            <el-form label-width="100px" :model="formLabelAlign">
                <el-form-item label="大题：">
                    <el-input v-model="formLabelAlign.t1" placeholder="示例：三"></el-input>
                </el-form-item>
                <el-form-item label="小题：">
                    <el-input v-model="formLabelAlign.t2" placeholder="示例：16-20"></el-input>
                </el-form-item>
                <el-form-item label="每道题得分:">
                    <el-input v-model="formLabelAlign.score" placeholder="示例：3"></el-input>
                </el-form-item>
                <el-form-item label="答案：">
                    <el-input v-model="formLabelAlign.t3" placeholder="示例：B-A-ABC-C-BC"></el-input>
                </el-form-item>
            </el-form>

            <el-button type="primary" @click="insertTitle(formLabelAlign)">加入</el-button>

            <el-button type="primary" @click="deletepop(formLabelAlign.index)">删除</el-button>

        </div>
        <div style="text-align: center;margin: 80px 30px 10px 10px">
            <el-button type="primary" @click="submitForm(mytitles)">保存</el-button>
        </div>

    </div>
</template>

<script>
    export default {
        props:["mytitles"],
        name: "rightmeuncom"
    }
</script>

<style scoped>

</style>