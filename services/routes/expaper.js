var express = require('express');
var router = express.Router();
var path=require('path');

var handler = require('../handler/expaperhandler.js');

/** 实际上要进入虚拟路径/ **/
router.get('/', function (req, res, next) {
    res.render('expaper.ejs', {});
});

/** 实际上要进入虚拟路径/index **/
router.get('/index', function (req, res, next) {
    res.render('expaper.ejs', {});
});

/**  去list主页**/
router.get('/expaperlist', function (req, res, next) {
    res.render('expaperlist.ejs',{});
});

/** 实际上要进入虚拟路径/expaper/add_expaper （并不需要）**/
router.get('/add_expaper', function (req, res, next) {
    handler.addExpaper(req, res);
});

/** 路由添加试卷 实际上要进入虚拟路径/expaper/add_expaper （并不需要）**/
router.post('/add_expaper', function (req, res, next) {
    handler.addExpaper(req, res);
});

/**  试图增加一个jsonp函数 **/
router.get('/api/getscript', function (req, res,next) {
    handler.getscript(req,res)
});


/**  删除！ **/
router.get('/del_expaper', function (req, res, next) {
   handler.delExpaper(req,res);
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
