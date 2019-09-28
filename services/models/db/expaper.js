//定义表的模型
var Sequelize = require('sequelize');
var db=require('./db.js');

var Expaper = db.define('expaper', {
    id:{ //自增长id,主键,整形
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    name: {
        type: Sequelize.STRING,
        allowNull:false
    },
    teacher: {
        type: Sequelize.STRING
    },
    class: {
        type: Sequelize.STRING
    },
    content_path: {
        type: Sequelize.STRING
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW
    },
    description: {
        type: Sequelize.TEXT
    },
    hash_code: {
        type: Sequelize.STRING
    }
});
Expaper.sync(); //创建表

module.exports = Expaper;