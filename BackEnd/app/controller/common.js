const { Controller } = require('egg');

class CommonController extends Controller {

	success(msg, data) {
		this.ctx.body = {
			code: 100,
			msg,
			data,
		};
	}

	notGood(msg, data = {}) {
		this.ctx.body = {
			code: -100,
			msg,
			data,
		};
	}

	fail(msg) {
		msg = msg || '出错了';
		this.ctx.throw(404, msg);
	}
}

module.exports = CommonController;