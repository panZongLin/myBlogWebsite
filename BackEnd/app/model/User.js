'use static'

module.exports = (app) => {
    const {mongoose} = app;
    const {Schema} = mongoose;

    //初始化数据，添加初始管理员
    app.beforeStart(async () => {
        const ctx = app.createAnonymousContext();
        const data = {
            "name": "不动情的咳嗽",
            "github": "https://github.com/panZongLin",
            "email": "1328785074@qq.com",
            "userType": "admin",
        }

        const isUser = await ctx.model.User.find({email: data.email});
        if(isUser.length ==0) {
            await ctx.model.User.create(data);
        }else {
            await ctx.model.User.update({email: data.email}, data);
        }
    });

    const UserSchema = new Schema({
        name: {type: String},
        email: {type: String},
        github: {type: String},
        userType: {type: String}
    })
    return mongoose.model('User', UserSchema)
}


// {
//     "name": "不动情的咳嗽",
//     "github": "https://github.com/panZongLin",
//     "email": "1328785074@qq.com",
//     "userType": "admin",
// }