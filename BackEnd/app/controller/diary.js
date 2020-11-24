const Controller = require('./common');

class NewsController extends Controller {
	async findDiary() {
		const ctx = this.ctx;
		const result = await ctx.model.Diary.find();
		this.success('获取日记列表', result);
	}

	async createDiary() {
		const ctx = this.ctx;
		const result = await ctx.model.Diary.create(ctx.request.body);
		this.success('添加日记', result);
	}

	async updateDiary() {
		const ctx = this.ctx;
		const { _id, ...rest } = ctx.request.body;
		const result = await ctx.model.Diary.updateOne({ _id }, { ...rest });
		this.success('更新日记', result);
	}


	async removeDiary() {
		const ctx = this.ctx;
		const { _id, ...rest } = ctx.request.body;
		const result = await ctx.model.Diary.deleteOne({ _id });
		this.success('删除日记', result);
	}

}

module.exports = NewsController;