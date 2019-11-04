var config = require('../config/main/config.js');
var fs = require('fs');
var querystring = require('querystring');
var path = require('path');
var sqlhandler = require('../models/db/sqlhandler.js'); //
var context = require('../config/main/jsonconfig.js');
var imghandler = require('./imghandler.js');
const crypto = require('crypto');
var multiparty = require('multiparty');
//const formidable = require('express');  //图片、视频处理

var gm = require("gm");
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
                res.json(err + "数据写入错误，已经写入的文件已删除！");
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
    sqlhandler.getOneSql(req, res)
        .then((item) => {
            return readOneData(item.content_path)
        })
        .then(data => res.json(data))
        .catch(err => {
            res.json(err)
        })
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
    sqlhandler.updateSqlP(req, res, context.editsqlobj(req))
        .then(success => {
            return sqlhandler.getEditSql(req, res)
        })
        .then((item) => {
            return writeFilePromise(item.content_path, JSON.stringify(req.body.mytitles))
        })
        .then(msg => res.json("msg"))
        .catch(err => {
            console.log(err)
        })
};

/** 接受图片，此业务需要执行以下几个操作！
 * 1.从数据库里面根据前端id查找文件路径
 * 2.拿到试卷数据，坐标
 * 3.递归创临时建文件夹、数据存放文件夹
 * 4.写入临时源文件
 * 6.根据源文件切割图像，数据写入磁盘，元数据存入数据库
 * 8.删除临时文件
 * **/
module.exports.postImgApi = function (req, res) {

    var lists;  //试卷数据
    var Srcpath = ''; //源文件路径
    sqlhandler.getOneCommentSql(req.body.Id, res)
        .then(item => {
            return readOneData(item.content_path)
        })
        .then(list => {
            lists = list;
        })
        .then(() => {
            //mkdirsSync( path.join(config.dataPathDir,'paperpoint' ,'paperpoint'+getClientIp(req).split(".")[3])); //不能保证唯一写入，面临高并发可能会覆盖
            mkdirsSync(path.join(config.dataPathDir, 'paperpoint', 'paperpoint' + req.body.Id));                      //数据库序号试卷写入的唯一性,这个要和下面写入的路径手动一致
            mkdirsSync(path.join(config.dataPathDir, 'temp'));
        })
        .then(() => {
            return writeSrc(req, res)   //写源文件，返回路径。
        })
        .then(srcpath => {
            Srcpath = srcpath;
            return writeChip(req, res, srcpath, lists);
        })
        //.then(()=>fs.unlinkSync(Srcpath))          //完成后需要删除temp里的文件
        .then(res.json("ok"))
        .catch(err => console.log(err))

};

/**基于视觉处理图片效果
 *
 * **/
module.exports.postImageApi = function (req, res) {
    // mkdirsSync( path.join(config.dataPathDir,'paperpoint' ,'paperpoint'+req.body.Id))                      //数据库序号试卷写入的唯一性,这个要和下面写入的路径手动一致
    //     .then(()=>{
    //     return writeSrc(req, res)   //写源文件，返回路径。
    //      })
    //     .then(srcpath=>{
    //
    //     })、
    //console.log(req.files.file);


    console.log("reqData:----------" + req.body.Id);
    var Srcpath;
    var lists;

    sqlhandler.getOneCommentSql(req.body.Id, res)
        .then(item => {
            return readOneData(item.content_path)
        })
        .then(list => {
            lists = list;
           return  mkdirsSync(path.join(config.dataPathDir, 'paperpoint', 'paperpoint' + req.body.Id));
        })
        .then(() => {
            return writeEach(req)
        })
        .then(targetFilepath => {
            Srcpath = targetFilepath;
        })
        .then(() => {
            return writeChip(req, res, Srcpath, lists);
        })
        .then(res.json("ok"))
        .catch(err => {
            console.log(err)
        })


};

function writeEach(req) {
    return new Promise((resolve, reject) => {
        var targetFilepath = path.join(config.dataPathDir, 'temp', req.files.file.name);
        var readStream = fs.createReadStream(req.files.file.path);
        var writeStream = fs.createWriteStream(targetFilepath);
        readStream.pipe(writeStream);
        readStream.on('end', function (err) {
            if (err) {
                reject(err)
            }
            fs.unlinkSync(req.files.file.path);
            console.log(path.join(config.dataPathDir, 'temp', req.files.file.name))
            resolve(targetFilepath)
        });
    })
}


function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};

function writeChip(req, res, srcpath, lists) {
    return new Promise((resolve, reject) => {

        var Safetyrate = 0;
        var rate = 0;
        for (var paperindex in lists) {
            for (var titlesindex in lists[paperindex].titles) {

                // var width = lists[paperindex].titles[titlesindex].xx-90;
                // var height = lists[paperindex].titles[titlesindex].yy-21;
                // var x = lists[paperindex].titles[titlesindex].x1-226-rate/3;
                // var y = lists[paperindex].titles[titlesindex].y1-81-rate;

                // var width = lists[paperindex].titles[titlesindex].xx;
                // var height = lists[paperindex].titles[titlesindex].yy;
                // var x = lists[paperindex].titles[titlesindex].x1+130;
                // var y = lists[paperindex].titles[titlesindex].y1-20-rate;

                var width = lists[paperindex].titles[titlesindex].xx;
                var height = lists[paperindex].titles[titlesindex].yy;
                var x = lists[paperindex].titles[titlesindex].x1 - 45;
                var y = lists[paperindex].titles[titlesindex].y1 - 94 - rate;


                var sqlmsg = {
                    name: lists[0].titles[0].header.name,
                    num: "5120161599",              //还没有学生
                    username: "吴晓伟",              //随机一个名字
                    content_path: path.join(config.dataPathDir, 'paperpoint', 'paperpoint' + req.body.Id, '' + lists[0].titles[0].header.name + req.body.Id + paperindex + '' + titlesindex + '.png'),
                };

                imghandler.cropImg(srcpath, sqlmsg.content_path, width, height, x, y);
                sqlhandler.addImgChim(req, res, context.imgChip(sqlmsg));
                Safetyrate++;
                rate += 8;
                if (Safetyrate > 1000) {
                    throw "安全指数到达上限，可能程序陷入死循环！"
                }
            }
            //rate+=40;
        }

    })
}

function writeSrc(req) {
    return new Promise((resolve, reject) => {
        var base64 = req.body.base64.replace(/^data:image\/\w+;base64,/, "");   //去掉图片base64码前面部分data:image/png;base64
        var dataBuffer = new Buffer.from(base64, 'base64');                           //把base64码转成buffer对象，
        var srcpath = path.join(config.dataPathDir, 'temp', crypto.createHash('md5').update(getClientIp(req) + new Date()).digest('hex') + '.png');
        fs.writeFile(srcpath, dataBuffer, function (err) {//用fs写入文件
            if (err) {
                console.log(err);
                reject(err)
            } else {
                //console.log('写入成功！');
                resolve(srcpath)
            }
        });
    })
}

function mkdirForChip(path) {
    return new Promise((resolve, reject) => {
        fs.existsSync(path)

        fs.mkdir(path, function (err) {
            if (err) {
                reject(err)
            }
            resolve("ok!")
        })
    })
}

function mkdirsSync(dirname) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(dirname)) {
            resolve(0)
            //return true;
        } else {
            if (mkdirsSync(path.dirname(dirname))) {
                fs.mkdirSync(dirname);
                resolve(1)
            }
        }
    })

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
    return new Promise((resolve, reject) => {
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


/** 为编辑答题卡设置了一个写入文件的Promise | editExpaperApi方法**/
function writeFilePromise(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve("1")
            }
        })
    })
}