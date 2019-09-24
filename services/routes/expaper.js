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

/** 实际上要进入虚拟路径/expaper/add_expaper （并不需要）**/
router.get('/add_expaper', function (req, res, next) {
    handler.addExpaper(req, res);
});
/** 路由添加试卷 实际上要进入虚拟路径/expaper/add_expaper （并不需要）**/
router.post('/add_expaper', function (req, res, next) {
    handler.addExpaper(req, res);
});

/**  试图增加一个jsonp函数 **/
router.get('/getscript', function (req, res,next) {
    handler.getscript(req,res)
});

router.get('/expaperlist', function (req, res, next) {
    res.render('expaperlist.ejs',{});
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
