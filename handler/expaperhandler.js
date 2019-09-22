var config = require('../config/main/config.js');
var fs = require('fs');
var querystring = require('querystring');
var path = require('path');
var sqlhandler = require('../models/db/sqlhandler.js'); //
var context=require('../config/main/jsonconfig.js');

/** 增加试卷，此业务需要执行以下几个操作！
 * 1.建立json对象
 * 2.把json写入磁盘
 * 3.把数据写入到数据库
 * **/
module.exports.addExpaper = function (req, res) {


    writeNewsDate(JSON.stringify(context.jsonobj(req)), function (content) {

        sqlhandler.addSql(req,res,context.sqlobj(req,content));

        //res.send(JSON.stringify(context.jsonobj(req)));
    });


};


module.exports.delExpaper = function (req, res) {
};

module.exports.editExpaper = function (req, res) {
};

module.exports.getExpaper = function (req, res) {
};


//封装读取json
function readNewsData(callback) {
    fs.readFile(config.dataPath, 'utf8', function (err, data) {
        if (err && err.code != 'ENOENT') {
            throw err;
        }
        var list = JSON.parse(data || '[]');
        callback(list);
    });
}

//封装写入jsonvar
function writeNewsDate(data, callback) {
    var dataPath = path.join(config.dataPath, "data1");  //获取data路径
    var count=fs.readdirSync(dataPath).length+1
    dataPath=path.join(dataPath,"expaper"+count+".json");

    fs.writeFile(dataPath, data, function (err) {
        if (err) {
            throw err;
        }
        callback(dataPath);
    });


}

function postBodyData(req, callback) {
    var array = [];
    req.on('data', function (chunk) {
        array.push(chunk);
    });
    req.on('end', function () {
        var postBody = querystring.parse(Buffer.concat(array).toString('utf8'));
        callback(postBody);
    });
}