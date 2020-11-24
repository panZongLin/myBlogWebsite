'use static'

module.exports = (app) => {
    const {mongoose} = app;
    const {Schema} = mongoose;

    const BaseSchema = new Schema({
        avatar: {type: String},
        name: {type: String},
        signature: {type: String},
        phone: {type: String},
        email: {type: String},
        github: {type: String},
        address: {type: String},
        position: {type: String},
        company: {type: String},
        tags: {type: Array},
    })
    return mongoose.model('Base', BaseSchema)
}


// {
//     "avatar": "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
//     "name": "不动情的咳嗽",
//     "signature": "我一直都在流浪，可我不曾见过海洋",
//     "phone": "18275717600",
//     "email": "1328785074@qq.com",
//     "github": "https://github.com/panZongLin",
//     "address": "广西-南宁",
//     "position": "前端开发",
//     "company": "南宁市xx网络科技有限公司",
//     "tags": ["前端", "react", "typescript", "node", "mongodb"]
// }