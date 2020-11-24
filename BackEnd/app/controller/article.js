const Controller = require('./common');

class NewsController extends Controller {
	async findArticle() {
		const ctx = this.ctx;
		const result = await ctx.model.Article.find();
		this.success('获取文章列表', result);
	}

	async createArticle() {
		const ctx = this.ctx;
		const result = await ctx.model.Article.create(ctx.request.body);
		this.success('添加文章', result);
	}

	async updateArticle() {
		const ctx = this.ctx;
		const { _id, ...rest } = ctx.request.body;
		const result = await ctx.model.Article.updateOne({ _id }, { ...rest });
		this.success('更新文章', result);
	}

	async removeArticle() {
		const ctx = this.ctx;
		const { _id, ...rest } = ctx.request.body;
		const result = await ctx.model.Article.deleteOne({ _id });
		this.success('删除文章', result);
	}

}

module.exports = NewsController;