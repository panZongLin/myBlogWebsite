'use static'

module.exports = (app) => {
    const {mongoose} = app;
    const {Schema} = mongoose;


    const ArticleSchema = new Schema({
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
    return mongoose.model('Article', ArticleSchema)
}


// {
//     "name": "不动情的咳嗽",
//     "email": "1328785074@qq.com",
//     "createTime": 5689216545487,
//     "title": "笔记标题",
//     "desc": "笔记的一段描述",
//     "article": "#笔记内容笔记内容笔记内容笔记内容",
//     "articleType": "blog | resume ",
// }