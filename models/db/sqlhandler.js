
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