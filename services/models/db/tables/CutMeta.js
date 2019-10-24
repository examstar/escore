//定义用户表表的模型
var Sequelize = require('sequelize');
var db=require('../db.js');

var CutMeta = db.define('cut_meta', {
    id:{ //自增长id,主键,整形
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    num: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull:false
    },
    name: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull:false
    },
    username: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull:false
    },
    content_path: {
        type: Sequelize.STRING,
        allowNull:false
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW
    }

});
CutMeta.sync(); //创建表

module.exports = CutMeta;