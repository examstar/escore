<template>

<div class="container">
    <!-- Table -->
    <!--    <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>-->

    <el-dialog title=""
               :visible.sync="dialog.show"
               :close-on-click-modal="true"
               :close-on-press-escape="true"
               :modal-append-to-body="true"
               :show-close="true"
               width="80%"
               :append-to-body="true"
               ref="eldialog"
               >
        <div class="inner">
            <tableDialog buttonText="选择" is-child="true" @toFather="getMsgFormSon"></tableDialog>
        </div>

    </el-dialog>

</div>
</template>

<script>
    import tableDialog from '../../views/OperaList'

    export default {
        components:{
            tableDialog
        },
        name:'dialogItems',
        props:{
            dialog:Object
        },
        data() {
            return {
                index:''
            };
        },
        methods:{
            getMsgFormSon(data){
                this.index = data;
                this.$emit('toFather',data);
              this.dialog.show=false;
            }
        }
    };
</script>

<style scoped>

.inner{
    top: 0%;
    left: 0%;
    width: 100%;
    height: 600px;
    min-width: 1100px;
    position: absolute;
    overflow: auto;
    /*text-align: center;*/
    background-color: #ffffff;
}



</style>