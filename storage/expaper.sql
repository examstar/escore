/*
Navicat MySQL Data Transfer

Source Server         : wxwmodder
Source Server Version : 50723
Source Host           : localhost:3306
Source Database       : nodedb

Target Server Type    : MYSQL
Target Server Version : 50723
File Encoding         : 65001

Date: 2019-09-28 22:31:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `expaper`
-- ----------------------------
DROP TABLE IF EXISTS `expaper`;
CREATE TABLE `expaper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `teacher` varchar(255) DEFAULT NULL,
  `class` varchar(255) DEFAULT NULL,
  `content_path` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `description` text,
  `hash_code` varchar(255) DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of expaper
-- ----------------------------
/*
INSERT INTO `expaper` VALUES ('1', '数学试卷', '张老师', '数学', 'F:\\study_project\\IDEAworkplace\\escore\\public\\data\\data1\\expaper8.json', '2019-09-22 14:58:51', null, '84af06ce9c7a81fbf3a0f60c4b5319a4', '2019-09-22 14:58:51');
INSERT INTO `expaper` VALUES ('2', '第一次模拟考', '张老师', '学校', 'F:\\study_project\\IDEAworkplace\\escore\\public\\data\\data1\\expaper9.json', '2019-09-22 15:48:05', null, '4b3f8d2be19078d64d2532f21100cc4d', '2019-09-22 15:48:05');
INSERT INTO `expaper` VALUES ('3', '第二次模拟考', '张老师', '学校', 'F:\\study_project\\IDEAworkplace\\escore\\public\\data\\data1\\expaper10.json', '2019-09-22 15:48:10', null, '1bebfa35b65ba311cee46cf5b9375dc7', '2019-09-22 15:48:10');
INSERT INTO `expaper` VALUES ('4', '第三次模拟考', '张老师', '学校', 'F:\\study_project\\IDEAworkplace\\escore\\public\\data\\data1\\expaper11.json', '2019-09-22 15:48:13', null, '1f3e826ee0aebb35152276fb0d9e3fab', '2019-09-22 15:48:13');
INSERT INTO `expaper` VALUES ('5', '语文', '张老师', '语文', 'F:\\study_project\\IDEAworkplace\\escore\\public\\data\\data1\\expaper12.json', '2019-09-22 15:48:17', null, 'b9df8a0e037c1eea6ac25bc32355a803', '2019-09-22 15:48:17');
INSERT INTO `expaper` VALUES ('6', '物理', '张老师', '物理', 'F:\\study_project\\IDEAworkplace\\escore\\public\\data\\data1\\expaper2.json', '2019-09-23 11:50:18', null, 'dc156e1c4526573f5ff3670c35b512ec', '2019-09-23 11:50:18');
*/
/*
Navicat MySQL Data Transfer

Source Server         : wxwmodder
Source Server Version : 50723
Source Host           : localhost:3306
Source Database       : nodedb

Target Server Type    : MYSQL
Target Server Version : 50723
File Encoding         : 65001

Date: 2019-09-29 16:25:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `identity` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `description` text,
  `last_login` datetime DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'wxwxw', '$2a$10$lswRqeqTq5V0JeuvTMGF/eDmwD6dvyLmkiXgK3SJxVu8.h2tQVa5y', '213213123123', '1231231323123123', '2019-09-29 05:03:05', null, '2019-09-29 05:03:05', '2019-09-29 05:03:05');
INSERT INTO `users` VALUES ('2', 'wxw', '$2a$10$N1f5zI0y1SbCwIkTHWeUI.pAZAwB81Sm0yiugiqgz9bIvkUqgHYeu', '810237976@qq.com', 'bbbb', '2019-09-29 05:05:39', null, '2019-09-29 05:05:39', '2019-09-29 05:05:39');
INSERT INTO `users` VALUES ('3', '123', '$2a$10$Lb3IhlpuZ/FdbTgohc03zuxw1B.M/68UbzPh6QS1ktvZGzKAvRdxO', '123@qq.com', '123', '2019-09-29 05:09:29', null, '2019-09-29 05:09:29', '2019-09-29 05:09:29');
