
var Expaper = require('./expaper');

module.exports.addSql=function (req,res,message,callback) {
    //如果没有post数据或者数据为空,直接返回
    if (message.name == undefined ||message.name == ''
        || message.content_path == undefined || message.content_path == '') {
        res.render('404', {});
        callback(new Error('执行sql语句出错！'));
        return ;
    }
    //创建一条记录,创建成功后跳转回首页
    Expaper.create(message).then(function(msg){
        console.log(msg);
        res.redirect('/');
    });
};

/**  查找全部条目  **/
module.exports.getAll=function(req,res,callback){
    Expaper.findAll().then(function(msgs) {
        //res.render('other/index.ejs', { messages: msgs });
        callback(msgs);
    });
};

module.exports.delSql=function (req,res,callback) {
    //如果没有id字段,返回404
    if (req.query.id == undefined ||req.query.id == '') {
        res.render('404', {});
        return;
    }
    //先查找,再调用删除,最后返回首页
    Expaper.findOne({
        where:{
            id:req.query.id
        }
    }).then(function(msg){
        callback(msg.content_path);
        msg.destroy().then(function(){
            console.log('delete success !!');
            res.redirect('/expaperlist');
        });
    });
};