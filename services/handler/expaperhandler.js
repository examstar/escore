var config = require('../config/main/config.js');
var fs = require('fs');
var querystring = require('querystring');
var path = require('path');
var sqlhandler = require('../models/db/sqlhandler.js'); //
var context = require('../config/main/jsonconfig.js');

/** 增加试卷，此业务需要执行以下几个操作！
 * 1.建立json对象
 * 2.把json写入磁盘
 * 3.把元数据写入到数据库
 * **/


/** 纯API 不去定向 与前端解耦**/
module.exports.addExpaperApi = function (req, res, callback) {
    setCORSallow(req, res);
    /** 先在磁盘写json文件 然后把信息写入数据库 如果出错则回滚操作删除文件 **/
    writeNewDate(context.json2str(req))
        .then((content) => {
            return sqlhandler.addSqlP(req, res, context.sqlobj(req, content))
        })
        .then((data) => {
                res.json(data)
            },
            (err) => {
                fs.unlink(data);
                res.json(err+"数据写入错误，已经写入的文件已删除！");
            })
        .catch((err) => {
            res.json(err)
        });
    // writeNewsDate(context.json2str(req), function (content) {
    //     sqlhandler.addSql(req, res, context.sqlobj(req, content), function (err) {
    //         if (err) {
    //             fs.unlink(content, function (error) {
    //                 if (error) {
    //                     console.log(error);
    //                     console.log('文件删除失败！');
    //                 }
    //                 console.log('因为数据库写入错误，已写下文件删除成功！');
    //             });
    //             throw err;
    //         }
    //         callback();
    //     });
    // });

};

/** 与上面一样，只不过会去定向**/
module.exports.addExpaper = function (req, res) {
    this.addExpaperApi(req, res, function (err) {
        if (err) {
            throw err
        }
        res.redirect('/')
    });

};

/** json函数业务，从数据库选择全部数据给前端 (需要设置跨域请求)**/
module.exports.getscript = function (req, res) {
    setCORSallow(req, res);
    sqlhandler.getAll(req, res, function (data) {

        // var scriptStr = `${JSON.stringify(data)}`;
        // res.send(scriptStr);
        res.send(data)
    });
};

/** 选择一个数据详情给前端
 * 1.查询数据库 2.读取数据库json路径 3.解析json返回
 * **/
module.exports.getExpaperApi = function (req, res) {
    sqlhandler.getOneSql(req,res)
        .then((item)=>{ return readOneData(item.content_path)})
        .then(data=>res.json(data))
        .catch(err=>{res.json(err)})
};




/** 删除试卷，此业务需要执行以下几个操作！
 * 1.在数据库查找id，获取content path
 * 2.删除sql数据
 * 3.删除文件
 * **/
module.exports.delExpaperApi = function (req, res) {
    setCORSallow(req, res);
    sqlhandler.delSql(req, res, function (content_path) {
        fs.unlink(content_path, function (err) {
            if (err) {
                console.log("删除文件出错，需要手动删除：" + content_path);
                //throw err;
            }
        });

    });

};

module.exports.delExpaper = function (req, res) {
    this.delExpaper(req, res);
    res.redirect('/expaperlist');

};

/** 更新数据，此业务需要执行以下几个操作！
 * 1.在数据库查找contentPath，获取content path
 * 2.更新sql数据
 * 3.覆盖content path的文件
 * **/
module.exports.editExpaperApi = function (req, res) {
   //sqlhandler.getEditSql(req,res)
   //    .then( item=>{ return sqlhandler.updateSqlP(req,res,context.editsqlobj(req))})
    sqlhandler.updateSqlP(req,res,context.editsqlobj(req))
        .then(success=>{return sqlhandler.getEditSql(req,res)})
        .then((item)=>{return writeFilePromise(item.content_path,JSON.stringify(req.body.mytitles))})
        .then(msg=>res.json("msg"))
        .catch(err=>{console.log(err) })
};


function writeFilePromise(path,data) {
    return new Promise((resolve, reject) =>{
        fs.writeFile(path,data,function (err) {
            if(err){
                reject(err)
            }else{
                resolve("1")
            }
        })
    } )
}

/** ↓ handler函数夫人封装区 ↓**/
/** 设置跨域请求头**/
function setCORSallow(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header('Access-Control-Max-Age', 172800);//预请求缓存20天
}

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

// function readOneData(path, callback) {
//     fs.readFile(path, 'utf8', function (err, data) {
//         if (err && err.code != 'ENOENT') {
//             throw err;
//         }
//         var list = JSON.parse(data || '[]');
//         callback(list);
//     });
// }

function readOneData(path,) {
    return new Promise((resolve,reject)=>{
        fs.readFile(path, 'utf8', function (err, data) {
            if (err && err.code != 'ENOENT') {
                reject(err);
            }
            var list = JSON.parse(data || '[]');
            resolve(list);
        });
    })

}


//封装写入jsonvar
function writeNewsDate(data, callback) {
    var dataPath = path.join(config.dataPath, "data1");  //获取data路径
    var count = fs.readdirSync(dataPath).length + 1;
    dataPath = path.join(dataPath, "expaper" + count + ".json");

    var c = 0; //安全系数
    while (fs.existsSync(dataPath) && c != 100) {
        count++;
        dataPath = path.join(config.dataPath, "data1", "expaper" + count + ".json");
        console.log(count);
        c++;
    }

    fs.writeFile(dataPath, data, function (err) {
        if (err) {
            throw err;
        }
        console.log('写入成功');
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

/**  防止文件重写、覆盖，所以加入了循环判断文件是否存在，安全系数用来避免无限循环**/
/** 这个操作用来确定文件以后可以被应用于 HDFS的分布式文件系统**/
function writeNewDate(data) {
    return new Promise((resolve, reject) => {
        var dataPath = path.join(config.dataPath, "data1");  //获取data路径
        var count = fs.readdirSync(dataPath).length + 1;
        dataPath = path.join(dataPath, "expaper" + count + ".json");
        var c = 0; //安全系数
        while (fs.existsSync(dataPath) && c != 100) {
            count++;
            dataPath = path.join(config.dataPath, "data1", "expaper" + count + ".json");
            console.log(count);
            c++;
        }
        fs.writeFile(dataPath, data, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(dataPath)
            }
        });
    });
}