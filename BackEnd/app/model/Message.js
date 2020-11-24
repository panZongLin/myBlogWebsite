'use static'

module.exports = (app) => {
    const {mongoose} = app;
    const {Schema} = mongoose;

    const MessageSchema = new Schema({
        name: {type: String},
        email: {type: String},    
        message: {type: String},
        createTime: {type: Number},
    })
    return mongoose.model('Message', MessageSchema)
}
  

// {
    // "name": "不动情的咳嗽",
    // "email": "1328785074@qq.com",
    // "message": "假如再碰不见你，那祝你早安，午安，晚安",
    // "createTime": 1245467898384579
// }