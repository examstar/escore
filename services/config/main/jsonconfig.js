
//这里存放需要保存的json对象和sql对象

const crypto = require('crypto');
/** 老方法 即将弃用**/
module.exports.jsonobj=function (req) {
    var jsonmessage = {
        header: {
            // "id":req.body.id || req.query.id,
            // "absent": req.body.absent || req.query.absent,
            // "note": req.body.note || req.query.note ,
            // "barcode": req.body.barcode || req.query.barcode
        },
        questionlist:[
            {
                // "level": req.body.level||req.query.level,
                // "topic":req.body.topic ||req.query.topic ,
                // "class": req.body.type ||req.query.class,
                // "score":req.body.score ||req.query.score,
                // "expected":req.body.expected || req.query.expected
            },
        ],
    };

        if(req.method.toLowerCase()==="get"){
            for(var items in req.query.questionlist ){
                console.log("------------get");
                jsonmessage.header=req.query.questionlist;
                jsonmessage.questionlist.push(items)
            }
        }else{
            for(var items in req.body.questionlist ){
                console.log("---------post");
                jsonmessage.header=req.body.header;
                jsonmessage.questionlist.push(items)
            }
        }
    return jsonmessage;
};

/** 获取到前端来的json，然后序列化**/
module.exports.json2str=function(req){
    var expaperpage;
    if(req.method.toLowerCase()==="get"){
        expaperpage=req.query ;
    }else{
        expaperpage= req.body ;
    }

    expaperpage= JSON.stringify(expaperpage);
    return expaperpage

};
module.exports.json2sql=function (req,content) {

    var sqlmessage = {

        name: req.query.expaperpage.header.name,
        teacher: req.query.expaperpage.header.teacher,
        class: req.query.expaperpage.header.class,
        content_path: content,
        description:req.query.expaperpage.header.description,
        hash_code:crypto.createHash('md5').update(content).digest('hex')

    };
    return sqlmessage;

};


module.exports.sqlobj=function (req,content) {

    var sql;
    if(req.method.toLowerCase()==="get"){
        sql=req.query ;
    }else{
        sql= req.body ;
    }

    var sqlmessage = {
        // name: req.body.name||req.query.name,
        // teacher: req.body.teacher||req.query.teacher,
        // class: req.body.class||req.query.class,
        // x1: req.body.x1||req.query.x1,
        // y1: req.body.y1||req.query.y1,
        // x2: req.body.x2||req.query.x2,
        // y2: req.body.y2||req.query.y2,
        // content_path: content,
        // description:req.body.description||req.query.description,
        // hash_code:crypto.createHash('md5').update(content).digest('hex')

        name: sql.name,
        teacher: sql.teacher,
        class: sql.class,
        content_path: content,
        description:sql.description,
        hash_code:crypto.createHash('md5').update(content).digest('hex')


    };
    return sqlmessage;
};