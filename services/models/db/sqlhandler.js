var Expaper = require('./tables/expaper');
var CutMeta = require('./tables/CutMeta');
//Depressed!
module.exports.addSql = function (req, res, message, callback) {
    //如果没有post数据或者数据为空,直接返回
    if (message.name == undefined || message.name == ''
    ) {
        //res.render('404', {});
        var result = {
            status: 500,
            tips: "服务端接受了空数据!拒绝访问！"
        };
        res.json(result);
        callback(new Error('执行sql语句出错！'));
        return;
    }
    //创建一条记录,创建成功后跳转回首页
    Expaper.create(message).then(function (msg) {
        //console.log(msg);
        var result = {
            status: 200,
            tips: "请求正常！",
            data: msg
        };
        //res.send(result);
        res.json(result);

    });
};


/**  查找全部条目  **/
module.exports.getAll = function (req, res, callback) {
    Expaper.findAll().then(function (msgs) {
        //res.render('other/index.ejs', { messages: msgs });


        var result = {
            status: 200,
            tips: "请求正常！",
            data: msgs
        };

        callback(result);
        //res.send(result);

    });
};

module.exports.delSql = function (req, res, callback) {
    //如果没有id字段,返回404
    if (req.query.id == undefined || req.query.id == '') {
        var result = {
            status: 500,
            tips: "请求失败！",
            data: "id为空"
        };
        //res.send(result);
        res.json(result);
    }
    //先查找,再调用删除,最后返回首页
    Expaper.findOne({
        where: {
            id: req.query.id
        }
    }).then(function (msg) {
        callback(msg.content_path);
        msg.destroy().then(function () {
            console.log('delete success !!');

            var result = {
                status: 200,
                tips: "请求正常！",
                data: msg
            };

            res.send(result)

        });
    });

};

// module.exports.getOneSql = function (req, res, callback) {
//     //如果没有id字段,返回404
//     if (req.query.id == undefined || req.query.id == '') {
//         var result = {
//             status: 500,
//             tips: "请求失败！",
//             data: "id为空"
//         };
//         res.json(result);
//     }
//     //先查找,再调用删除,最后返回首页
//     Expaper.findOne({
//         where: {
//             id: req.query.id
//         }
//     }).then(function (msg) {
//
//         callback(msg);
//         //res.json(msg);
//     });
//
// };

module.exports.getOneSql = function (req, res, callback) {
    return new Promise((resolve,reject)=>{
        //如果没有id字段,返回404
        if (req.query.id == undefined || req.query.id == '') {
            var result = {
                status: 500,
                tips: "请求失败！",
                data: "id为空"
            };
            reject(result);
        }
        //先查找,把值返回
        Expaper.findOne({
            where: {
                id: req.query.id
            }
        }).then(function (msg) {
            resolve(msg);
        });
    })
};

module.exports.getEditSql = function (req, res, callback) {
    return new Promise((resolve,reject)=>{
        //如果没有id字段,返回404
        if (req.body.id == undefined || req.body.id == '') {
            var result = {
                status: 500,
                tips: "请求失败！",
                data: "id为空"
            };
            reject(result);
        }
        //先查找,把值返回
        Expaper.findOne({
            where: {
                id:req.body.id
            }
        }).then(function (msg) {
            resolve(msg);
        }).catch(err=>reject(err));
    })
};

module.exports.getOneCommentSql = function (id, res) {
    return new Promise((resolve,reject)=>{
        //如果没有id字段,返回404
        if (id == undefined || id == '') {
            var result = {
                status: 500,
                tips: "请求失败！",
                data: "id为空"
            };
            reject(result);
        }
        //先查找,把值返回
        Expaper.findOne({
            where: {
                id: id
            }
        }).then(function (msg) {
            resolve(msg);
        });
    })
};

/** 判断请求来的数据是否可以被写入数据库，成功则返回写入的数据，失败返回错误**/
module.exports.addSqlP = function (req, res, message) {
    return new Promise((resolve, reject) => {
        //如果没有post数据或者数据为空,直接返回
        if (message.name == undefined || message.name == '') {
            var result = {
                status: 500,
                tips: "服务端接受了空数据!拒绝访问！"
            };
            reject(result);
            return;
        }
        //创建一条记录,创建成功后跳转回首页
        Expaper.create(message).then(function (msg) {
            var result = {
                status: 200,
                tips: "请求正常！",
                data: msg
            };
            resolve(result)
        });
    })
};

/** 判断请求来的数据是否可以被写入数据库，成功则返回写入的数据，失败返回错误**/
module.exports.updateSqlP = function (req, res, message) {
    return new Promise((resolve, reject) => {
        //如果没有post数据或者数据为空,直接返回
        if (message.name == undefined || message.name == '') {
            var result = {
                status: 500,
                tips: "服务端接受了空数据!拒绝访问！"
            };
            reject(result);
            return;
        }
        //创建一条记录,创建成功后跳转回首页
        //console.log("aaaaaa--------------"+message);
        Expaper.update(
            message,
            {
                where: {
                    id:req.body.id
                }
            }

        ).then(function (msg) {
            var result = {
                status: 200,
                tips: "请求正常！",
                data: msg
            };
            resolve(result)
        });
    })
};

module.exports.addImgChim = function (req, res, message) {
    return new Promise((resolve, reject) => {
        //如果没有post数据或者数据为空,直接返回
        if (message.name == undefined || message.name == '') {
            var result = {
                status: 500,
                tips: "服务端接受了空数据!拒绝访问！"
            };
            reject(result);
            return;
        }
        //创建一条记录,创建成功后跳转回首页
        CutMeta.create(message).then(function (msg) {
            var result = {
                status: 200,
                tips: "请求正常！",
                data: msg
            };
            resolve(result)
        });
    })
};