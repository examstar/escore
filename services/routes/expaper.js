var express = require('express');
var router = express.Router();
var path = require('path');

var handler = require('../handler/expaperhandler.js');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

/**  试图增加一个jsonp函数 **/
router.get('/api/getscript', function (req, res, next) {
    handler.getscript(req, res)
});

/**  接口 **/
router.get('/api/add_expaper', function (req, res, next) {
    handler.addExpaperApi(req, res);
});


/** post 添加试卷接口**/
router.post('/api/add_expaper', function (req, res, next) {
    handler.addExpaperApi(req, res);
});

/**  删除api！ **/
router.get('/api/del_expaper', function (req, res, next) {
    handler.delExpaperApi(req, res);
});

/**  查看详情！ **/
router.get('/api/expaper_detail', function (req, res, next) {
    handler.getExpaperApi(req, res);
});

/**  编辑(更新)操作！ **/
router.post('/api/edit_expaper', function (req, res, next) {
    //更新操作
    handler.editExpaperApi(req, res);
    //console.log(req.body.mytitles);
});

router.use('/public', express.static(path.join(__dirname, '..', 'public')));


/** 提交图片的接口**/
router.post('/api/postimg',multipartMiddleware ,function (req, res, next) {
    handler.postImgApi(req,res)
});

/** 提交图片的接口 openCV 批量添加**/
router.post('/api/postimage',multipartMiddleware ,function (req, res, next) {
    handler.postImageApi(req,res)
});

/**  试图增加一个jsonp函数 **/
router.get('/api/getPaperChip', function (req, res, next) {
    handler.getChipImgApi(req, res)
});



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
