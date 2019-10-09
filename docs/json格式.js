
/**
 * 简要说明
 * 1.整张答题卡是一个json数组。
 * 2.数组第一项即为答题卡第一张。
 * 3.答题卡也是一个json数组中有大题，每个大题含有相应坐标。
 * 4.每个大题也是json数组，含有相应题目以及对应的答案。
 *
 * 示例如下
 *
 * **/



mytitles: [{
    titles: [
        {
            header: {
                barcode: 'aaaaaasdasdassada',
                name: '模拟2',
                class:'语文',
                teacher:'张老师',
            }
        },
        {
            title: '一', questions: [
                {id: 1, e: 'A'},
                {id: 2, e: 'A'},
                {id: 3, e: 'A'},
            ], x1: '', x2: '', y1: '', y2: ''
        },
        {
            title: '二', questions: [
                {id: 1, e: 'A'},
                {id: 2, e: 'A'},
                {id: 3, e: 'A'},
                {id: 3, e: 'A'},
                {id: 3, e: 'A'},
                {id: 3, e: 'A'},
                {id: 3, e: 'A'},
                {id: 3, e: 'A'},
                {id: 3, e: 'A'},
            ], x1: '', x2: '', y1: '', y2: ''
        },

    ]
}, {
    titles: [
        {
            title: '一', questions: [
                {id: 1, e: 'A'},
                {id: 2, e: 'A'},
                {id: 3, e: 'A'},
            ], x1: '', x2: '', y1: '', y2: ''
        },

        {
            title: '二', questions: [
                {id: 1, e: 'A'},
                {id: 2, e: 'A'},
                {id: 3, e: 'A'},
                {id: 3, e: 'A'},
                {id: 3, e: 'A'},
                {id: 3, e: 'A'},
                {id: 3, e: 'A'},
                {id: 3, e: 'A'},
                {id: 3, e: 'A'},
            ], x1: '', x2: '', y1: '', y2: ''
        },

    ]
}]