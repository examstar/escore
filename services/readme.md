+ 已提供API
  - /api/getscript
  - /del_expaper
  - /add_expaper（post）
  - /add_expaper（get）

+ 已提供主页访问
  - /
  - /index
  - /expaperlist  


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

# 例子
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

## 接口3： 查询列表接口
+ GET    /api/getscript



| 参数        | 是否必填    |  说明   |
| --------    | -----: | :----:  |
| page      | 否  |   页码    |
| num        |   否  |    无   |
| id        |    否  |   无  |

| 返回结果        | 状态码    |  说明   |
| --------    | -----: | :----:  |
| id      | 200  |   无    |
| name        |   200  |   无   |
| ctime        |    200  |   无  |
| status        |    200  |   无  |

# 接口4： 查询列表接口
+ GET    /del_expaper



| 参数        | 是否必填    |  说明   |
| --------    | -----: | :----:  |
| page      | 否  |   页码    |
| num        |   否  |    无   |
| id        |    否  |   无  |

| 返回结果        | 状态码    |  说明   |
| --------    | -----: | :----:  |
| id      | 200  |   无    |
| name        |   200  |   无   |
| ctime        |    200  |   无  |
| status        |    200  |   无  |

