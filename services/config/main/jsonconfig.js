
//这里存放需要保存的json对象和sql对象

const crypto = require('crypto');
module.exports.jsonobj=function (req) {
    var jsonmessage = {
        "header": {
            "id":req.body.id || req.query.id,
            "absent": req.body.absent || req.query.absent,
            "note": req.body.note || req.query.note ,
            "barcode": req.body.barcode || req.query.barcode
        },
        "question-1": {
            "level": req.body.level||req.query.level,
            "topic":req.body.topic ||req.query.topic ,
            "class": req.body.type ||req.query.class,
            "score":req.body.score ||req.query.score,
            "expected":req.body.expected || req.query.expected
        },

    };
    return jsonmessage;
};

module.exports.sqlobj=function (req,content) {
    var sqlmessage = {
        name: req.body.name||req.query.name,
        teacher: req.body.teacher||req.query.teacher,
        class: req.body.class||req.query.class,
        x1: req.body.x1||req.query.x1,
        y1: req.body.y1||req.query.y1,
        x2: req.body.x2||req.query.x2,
        y2: req.body.y2||req.query.y2,
        content_path: content,
        description:req.body.description||req.query.description,
        hash_code:crypto.createHash('md5').update(content).digest('hex')
    };
    return sqlmessage;
};