var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs');
var jwt=require('jsonwebtoken');
var passport=require('passport');
const User = require('../models/db/tables/users');

const keys = require("../config/main/config");

const gravatar=require('gravatar');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    success:"登陆成功！"
  });
});

//router.post()


// @route  POST api/users/register
// @desc   返回的请求的json数据
// @access public
router.post('/register', (req, res) => {
  // 查询数据库中是否拥有邮箱
  User.findOne({ where:{
      email:req.body.email
    } }).then(user => {
    if (user) {
      return res.status(400).json('邮箱已被注册!');
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      }
      );
      const newUser ={
        username: req.body.username,
        email: req.body.email,
       // avatar,
        password: req.body.password,
        identity: req.body.identity
      };

      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;

          User.create(newUser).then(user => res.json(user))
              .catch(err => console.log(err));

        });
      });
    }
  });
});



// @route  POST api/users/login
// @desc   返回token jwt passport
// @access public

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // 查询数据库
  User.findOne({ where:{
    email
    } }).then(user => {
    if (!user) {
      return res.status(404).json('用户不存在!');
    }

    // 密码匹配
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const rule = {
          id: user.id,
          name: user.name,
         // avatar: user.avatar,
          identity: user.identity
        };
        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        });
        // res.json({msg:"success"});
      } else {
        return res.status(400).json('密码错误!');
      }
    });
  });
});

// @route  GET api/users/current
// @desc   return current user
// @access Private
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
      });
    }
);



module.exports = router;
