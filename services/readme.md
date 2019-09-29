+ 已提供API列表
  - /api/getscript
  - /api/del_expaper
  - /api/add_expaper（post）
  - /api/add_expaper（get）
  - /api/user/register
  - /api/user/login

+ page(无效，用于后端测试)
  - /
  - /index
  - /expaperlist  
  - /expaper

# 接口文档（待完善）
# 接口1： 添加试卷接口
+ POST    /api/add_expaper（post）

| 参数        | 是否必填    |  说明   |
| --------    | -----: | :----:  |
| id      | 是  |   试卷ID(非数据库id，jsonId)   |
| name        |   是  |    试卷名称   |
| ...        |    否  |   更多查看文档  |

| 返回结果        | 状态码    |  说明   |
| --------    | -----: | :----:  |
| status     | 200  |   正常    |
| tips        |   500  |   消息   |
| data        |      |   数据库数据  |

## 例子
```
{
	"status": 200,
	"tips": "请求正常！",
	"data": {
		"created_at": "2019-09-26T14:32:45.185Z",
		"id": 36,
		"name": "aaa",
		"content_path": "F:\\study_project\\IDEAworkplace\\escore\\services\\public\\data\\data1\\expaper6.json",
		"hash_code": "40f8c644dae1dd75796c1b6356d59e01",
		"updatedAt": "2019-09-26T14:32:45.186Z",
		"createdAt": "2019-09-26T14:32:45.186Z"
	}
}
```


# 接口2： 添加试卷接口
+ GET    /api/add_expaper（get）

| 参数        | 是否必填    |  说明   |
| --------    | -----: | :----:  |
| id      | 是  |   试卷ID(非数据库id，jsonId)   |
| name        |   是  |    试卷名称   |
| ...        |    否  |   更多查看文档  |

| 返回结果        | 状态码    |  说明   |
| --------    | -----: | :----:  |
| status     | 200  |   正常    |
| tips        |   500  |   消息   |
| data        |      |   数据库数据  |

# 接口3： 查询列表接口
+ GET    /api/getscript

| 参数        | 是否必填    |  说明   |
| --------    | -----: | :----:  |
|       | 否  |   页码    |
|         |   否  |    无   |
|        |    否  |   无  |

| 返回结果        | 状态码    |  说明   |
| --------    | -----: | :----:  |
| status      | 200  |   状态码    |
| tips        |   500  |   状态消息   |
| data        |      |   数据体  |

## 例子
```
{
	"status": 200,
	"tips": "请求正常！",
	"data": [
		{
			"id": 1,
			"name": "数学试卷",
			"teacher": "张老师",
			"class": "数学",
			"content_path": "F:\\study_project\\IDEAworkplace\\escore\\public\\data\\data1\\expaper8.json",
			"created_at": "2019-09-22 14:58:51",
			"description": null,
			"hash_code": "84af06ce9c7a81fbf3a0f60c4b5319a4",
			"createdAt": "2019-09-22 14:58:51",
			"updatedAt": "2019-09-22 14:58:51"
		},
		{
			"id": 2,
			"name": "第一次模拟考",
			"teacher": "张老师",
			"class": "学校",
			"content_path": "F:\\study_project\\IDEAworkplace\\escore\\public\\data\\data1\\expaper9.json",
			"created_at": "2019-09-22 15:48:05",
			"description": null,
			"hash_code": "4b3f8d2be19078d64d2532f21100cc4d",
			"createdAt": "2019-09-22 15:48:05",
			"updatedAt": "2019-09-22 15:48:05"
		}
	]
}
```
# 接口4： 删除单个接口
+ GET    /api/del_expaper

| 参数        | 是否必填    |  说明   |
| --------    | -----: | :----:  |
| id        |    是 |   根据ID删除数据  |

| 返回结果        | 状态码    |  说明   |
| --------    | -----: | :----:  |
| status      | 500  |   状态码    |
| tip        |   200  |   说明   |
| data        |      |   被删除数据  |

 ```
{
	"status": 200,
	"tips": "请求正常！",
	"data": {
		"id": 4,
		"name": "第三次模拟考",
		"teacher": "张老师",
		"class": "学校",
		"content_path": "F:\\study_project\\IDEAworkplace\\escore\\services\\public\\data\\data1\\expaper11.json",
		"created_at": "2019-09-22 15:48:13",
		"description": null,
		"hash_code": "1f3e826ee0aebb35152276fb0d9e3fab",
		"createdAt": "2019-09-22 15:48:13",
		"updatedAt": "2019-09-22 15:48:13"
	}
}
```


# 接口5： 试卷详情接口
+ GET    /api/expaper_detail

| 参数        | 是否必填    |  说明   |
| --------    | -----: | :----:  |
| id       |    是 |   试卷id |


| 返回结果        | 状态码    |  说明   |
| --------    | -----: | :----:  |
| status      | 500  |   状态码    |
| tip        |   200  |   说明   |
| data        |      |   数据体，包含题库  |

##例子(data)
```
{
  "id": "1",
  "name": "第一次模拟考",
  "teacher":"mr chen" ,
  "class":"数学" ,
  "content_path":"F:\\...\\.json" ,
  "created_at":"" ,
  "description": "",
  "update_at":"" ,
   "absent": "",
   "note": "" ,
   "barcode":"",
  "expaperlist": [
    {"question:": "1","type": "选择","x1": "0.00","y1": "0.00","x2": "10.00","y2": "10.00","expected": "0.00","score": "5"},
    {"question:": "2","type": "选择","x1": "0.00","y1": "0.00","x2": "0.00","y2": "0.00","expected": "0.00","score": "5"},
    {"question:": "3","type": "选择","x1": "0.00","y1": "0.00","x2": "0.00","y2": "0.00","expected": "0.00","score": "5"}
  ]
}

```

# 接口6： 注册接口
+ POST    /api/user/register

| 参数        | 是否必填    |  说明   |
| --------    | -----: | :----:  |
| username       |    是 |   用户名 |
| password       |    是 |   密码 |
| email       |    是 |   邮箱 |
| identity       |    是 |   身份 |

| 返回结果        | 状态码    |  说明   |
| --------    | -----: | :----:  |
| status      | 400  |    状态    |
| tip        |   200  |   说明   |
| data        |      |   数据体  |

# 接口7： 登录接口
+ POST    /api/user/login

| 参数        | 是否必填    |  说明   |
| --------    | -----: | :----:  |
| username       |    是 |   用户  |
| password       |    是 |   密码  |

| 返回结果        | 状态码    |  说明   |
| --------    | -----: | :----:  |
| status      | 500  |   状态码    |
| tip        |   200  |   说明   |
| data        |      |   被删除数据  |