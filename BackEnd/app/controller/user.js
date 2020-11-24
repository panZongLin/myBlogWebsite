const Controller = require('./common');

class NewsController extends Controller {
	async userLoginOrRegister() {
		const ctx = this.ctx;
		const { email, ...rest } = ctx.request.body;

		const isUser = await ctx.model.User.find({ email });
		if (isUser.length == 0) {
			await ctx.model.User.create(ctx.request.body);
		} else {
			let notType = rest;
			delete notType.userType;
			await ctx.model.User.updateOne({ email }, rest);
		}
		let result = await ctx.model.User.find({ email });
		this.success('登录或注册', result[0]);
	}

	async findAllUser() {
		const ctx = this.ctx;
		this.success('获取登录信息列表', await ctx.model.User.find());
	}

	async makeItIsAdmin() {
		const ctx = this.ctx;
		const { email } = ctx.request.body;
		await ctx.model.User.updateOne({ email }, { userType: 'admin' });
		this.success('添加管理员', await ctx.model.User.find({ email }));
	}

	async makeItNotAdmin() {
		const ctx = this.ctx;
		const { email } = ctx.request.body;
		await ctx.model.User.updateOne({ email }, { userType: 'visitor' });
		this.success('移出管理员', await ctx.model.User.find({ email }));
	}


	async removeOneUser() {
		const ctx = this.ctx;
		const { email } = ctx.request.body;
		const result = await ctx.model.User.deleteOne({ email });
		this.success('删除登录信息', result);
	}
}

module.exports = NewsController;