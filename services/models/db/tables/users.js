//定义用户表表的模型
var Sequelize = require('sequelize');
var db=require('../db.js');

var Users = db.define('users', {
    id:{ //自增长id,主键,整形
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    username: {
        type: Sequelize.STRING,
        allowNull:false
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    identity: {
        type: Sequelize.STRING
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW
    },
    description: {
        type: Sequelize.TEXT
    },
    last_login: {
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW
    },
});
Users.sync(); //创建表

module.exports = Users;