'use static'

module.exports = (app) => {
    const {mongoose} = app;
    const {Schema} = mongoose;


    const DiarySchema = new Schema({
        name: {type: String},
        email: {type: String},
        createTime: {type: Number},
        title: {type: String},
        desc: {type: String},
        article: {type: String},
        articleType: {type: String},
        pictures: {type: Array},
        address: {type: String}
    })
    return mongoose.model('Diary', DiarySchema)
}


// {
//     "name": "不动情的咳嗽",
//     "email": "1328785074@qq.com",
//     "createTime": 5689216545487,
//     "title": "日记标题",
//     "desc": "日记的一段描述",
//     "article": "#日记内容日记内容日记内容日记内容",
//     "articleType": "diary",
// }