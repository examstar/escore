# All Storage related infrastructure 

1. mysql
2. file system

# Windows 
+ 安装mysql
```
#创建新用户，为用户添加权限、远程登录，刷新！
create user <你的用户名> identified by '<你的密码>';
grant all privileges on *.* to <你的用户名>@'%' identified by '<你的密码>'; 
flush privileges;

#建立数据库expaperdb
create database `expaperdb`;
use expaperdb;
source ./expaper.sql;

```
# Ubuntu Linux
+ 安装mysql
```
# 查看有没有安装MySQL：  
dpkg -l | grep mysql

# 安装MySQL（sudo）：  
sudo apt install mysql-server

#打开这个文件查看mysql登入密码
sudo cat /etc/mysql/debian.cnf

#登录
mysql -u debian-sys-maint -p<你的密码>

#修改root密码，刷新权限退出，二选一
use mysql;
update mysql.user set authentication_string=password('<你的密码>') where user='root' and Host ='localhost';
update user set plugin="mysql_native_password"; 
flush privileges;
quit;

#输入（初始化，根据需要配置）：
mysql_secure_installation

#注释掉#bind-address = 127.0.0.1（允许远程，不推荐）
vi /etc/mysql/mysql.conf.d/mysqld.cnf


#登录mysql：
mysql -uroot -p<你的密码>

#创建新用户，为用户添加权限，刷新！
create user <你的用户名> identified by '<你的密码>';
grant all privileges on *.* to <你的用户名>@'%' identified by '<你的密码>'; 
flush privileges;

#关闭防火墙或打开相应网络端口否则无法远程连接ssh或mysql
sudo ufw status #命令查看当前防火墙状态
sudo ufw enable #命令来开发防火墙
sudo ufw status #命令查看开启防火墙后的状态为active 说明防火墙开启成功。
sudo ufw disable #命令来关闭防火墙。

#启动mysql：
#方式一：
sudo /etc/init.d/mysql start
#方式二：
sudo service mysql start
#停止mysql：
#方式一：
sudo /etc/init.d/mysql stop
#方式二：
sudo service mysql stop
#重启mysql：
#方式一：
sudo/etc/init.d/mysql restart
#方式二：
sudo service mysql restart

#建立数据库expaperdb
create database `expaperdb`;
use expaperdb;
source ./expaper.sql;

```


