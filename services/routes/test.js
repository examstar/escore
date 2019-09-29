var express = require('express');
var router = express.Router();
var path=require('path');

var handler = require('../handler/expaperhandler.js');


/** 没用 用来封装测试用的路由 **/

router.get('/', function (req, res, next) {
    res.render('expaper.ejs', {});
});

router.get('/index', function (req, res, next) {
    res.render('expaper.ejs', {});
});

/**  去list主页**/
router.get('/expaperlist', function (req, res, next) {
    res.render('expaperlist.ejs',{});
});

router.get('/userregister', function (req, res, next) {
    res.render('userregister.ejs',{});
});

/** 实际上要进入虚拟路径/expaper/add_expaper （并不需要）**/
router.get('/add_expaper', function (req, res, next) {
    handler.addExpaper(req, res);
});

/** 路由添加试卷 实际上要进入虚拟路径/expaper/add_expaper （并不需要）**/
router.post('/add_expaper', function (req, res, next) {
    handler.addExpaper(req, res);
});

/**  删除！ **/
router.get('/del_expaper', function (req, res, next) {
    handler.delExpaper(req,res);
});

module.exports = router;