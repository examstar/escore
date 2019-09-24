# escore

# 项目启动

# 启动：

##  ！注意！

1.在/config/mysql里面配置数据库账户密码！

2.在/config/main里面配置项目，默认即可。

3.因为idea并不会下载node_modules文件。所以我在项目中打包了一份.

4.运行： node ./bin/www 或 使用idea直接启动www

5.打开 http://localhost:3000/expaper

# 更新 
+ 试卷预览页：http://127.0.0.1:3000/expaperlist
- 还没有其他功能，只能读取数据

## 1.mysql数据库配置

采用mysql数据库

ORM:sequelize

## 2.Vue.js配置

暂无

## 3.Node.js配置

express框架

# 开发环境

 Ubuntu

#IDEA

# 一、数据库

# 二、前端

使用vue.js


# 三、后端

使用node.js的experss框架。


# 目录结构

## --bin
## |-www		程序入口
## --config	配置
## |-main		程序配置
## |-mysql		数据库配置
## --handler	业务模块
## |-main.js
## --models	模型模块
## |-db
## |--db.js
## --public	公共资源
## --routers	路由模块
## |-index.js
## --views		网页模块
## --app.js	app配置

# 开发文档。

模块化项目 

在/models/db中编写mysql操作模型

在/router中编写各个路由模块

在/handler中编写业务

所有配置放在/config里

模板引擎放在views中

公共资源放在/public中，json数据打包在public/data