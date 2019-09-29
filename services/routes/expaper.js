var express = require('express');
var router = express.Router();
var path=require('path');

var handler = require('../handler/expaperhandler.js');



/**  试图增加一个jsonp函数 **/
router.get('/api/getscript', function (req, res,next) {
    handler.getscript(req,res)
});

/**  接口 **/
router.get('/api/add_expaper', function (req, res, next) {
    handler.addExpaperApi(req, res);
});
/** post方式似乎跨域无效**/
 router.post('/api/add_expaper', function (req, res, next) {
     handler.addExpaperApi(req, res);
 });

/**  删除api！ **/
router.get('/api/del_expaper', function (req, res, next) {
    handler.delExpaperApi(req,res);
});


router.use('/public',express.static(path.join(__dirname,'..','public')));






router.get('/del_msg', function (req, res, next) {
    res.send(req);
});


router.get('/edit', function (req, res, next) {
    res.send(req);
});


router.post('/edit/update_msg', function (req, res, next) {
    res.send(req);
});

module.exports = router;
