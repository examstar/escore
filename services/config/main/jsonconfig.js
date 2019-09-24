
//这里存放需要保存的json对象和sql对象

const crypto = require('crypto');
module.exports.jsonobj=function (req) {
    var jsonmessage = {
        "header": {
            "id":req.body.id,
            "absent": req.body.absent,
            "note": req.body.note,
            "barcode": req.body.barcode
        },
        "question-1": {
            "level": req.body.level,
            "topic":req.body.topic ,
            "type": req.body.type,
            "score":req.body.score,
            "expected":req.body.expected
        },

    };
    return jsonmessage;
};

module.exports.sqlobj=function (req,content) {
    var sqlmessage = {
        name: req.body.name,
        teacher: req.body.teacher,
        class: req.body.class,
        x1: req.body.x1,
        y1: req.body.y1,
        x2: req.body.x2,
        y2: req.body.y2,
        content_path: content,
        description:req.body.description,
        hash_code:crypto.createHash('md5').update(content).digest('hex')
    };
    return sqlmessage;
};