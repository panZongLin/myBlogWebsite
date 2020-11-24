const Controller = require('./common');

class NewsController extends Controller {
	async createMessage() {
		const ctx = this.ctx;
		let result = await ctx.model.Message.create(ctx.request.body);
		this.success('创建留言', result);
	}

	async findMessage() {
		const ctx = this.ctx;
		let result = await ctx.model.Message.find();
		this.success('获取留言', result);
	}

	async removeMessage() {
		const ctx = this.ctx;
		const { _id, ...rest } = ctx.request.body;
		const result = await ctx.model.Message.deleteOne({ _id });
		this.success('删除留言', result);
	}

}

module.exports = NewsController;