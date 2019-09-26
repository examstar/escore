<template>
    <div id="app">


        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">试卷预览页</h3>
            </div>
            <div class="panel-body form-inline">
                <label>
                    Id:
                    <input type="text" class="form-control" v-model="id">
                </label>
                <label>
                    Name:
                    <input type="text" class="form-control" v-model="name" @keyup.enter="add">
                </label>

                <input type="button" value="add" class="btn btn-primary" @click="add">
                <label>
                    关键字:
                    <input type="text" class="form-control" v-model="keywords">
                </label>

            </div>
        </div>

        <table class="table table-bordered table-hover table-striped">
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Ctime</th>
                <th>Operation</th>
            </tr>
            </thead>
            <tbody>
            <!--        之前-->
            <tr v-for="item in search2(keywords)" :key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.created_at | dataFormat('yyyy-mm-dd')}}</td>
                <!--            <td><a href="" @click.prevent="del2(item.id)">delete</a></td>-->
                <td><a href="" @click.prevent="delmsg(item.id)">delete</a></td>

            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'ExpaperCreate',
        props: {
            msg: String
        }
    }




</script>
