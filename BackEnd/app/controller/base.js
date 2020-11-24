const qiniu = require('qiniu');
const Controller = require('./common');

//就不隐藏了吧
const accessKey = 'nZgPkj0vdAnQIg11e32bE9alJJwfaRdwi3gTmWUs';
const secretKey = '51T3EhAVdzEVpuqBERW4FPssZQs-feyy72CZu3YI';
const bucket = 'pzldiarybucket';

class NewsController extends Controller {
	async getBaseInfo() {
		const ctx = this.ctx; // console.log('ctx', ctx)  console.log('app', this.app)

		//qiniu 
		let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
		let options = {
			scope: bucket,
			expires: 3600 * 24
		};
		let putPolicy = new qiniu.rs.PutPolicy(options);
		let uploadToken = putPolicy.uploadToken(mac);

		let result = await ctx.model.Base.find();
		if (result.length !== 0) {
			this.ctx.body = {
				code: 100,
				msg: '获取基本信息',
				data: { ...result[0]['_doc'], uploadToken }
			};
		} else {
			this.success('未有基本信息', {});
		}
	}

	async updateBaseInfo() {
		const ctx = this.ctx;
		const { _id, ...rest } = ctx.request.body;
		if (!_id) {
			this.notGood('更新基本信息时缺少ID');
			return
		}
		const result = await ctx.model.Base.findByIdAndUpdate(_id, rest);
		this.success('更新基本信息', await ctx.model.Base.find({ _id }));
	}

	async createBaseInfo() {
		const ctx = this.ctx;
		const result = await ctx.model.Base.create(ctx.request.body);
		this.success('创建基本信息', result);
	}

	async removeBaseInfo() {
		const ctx = this.ctx;
		const { _id, ...rest } = ctx.request.body;
		if (!_id) {
			this.notGood("缺少ID，删除集合，确定请加clear：'all' ");
			if (!rest.clear) { return }
		}
		const result = await ctx.model.Base.findByIdAndRemove(_id || {});
		this.success('删除基本信息', result);
	}

	async deleteQiniuFile() {
		const ctx = this.ctx;
		const { key } = ctx.request.body;

		//qiniu 
		var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
		var config = new qiniu.conf.Config();
		config.zone = qiniu.zone.Zone_z0;
		var bucketManager = new qiniu.rs.BucketManager(mac, config);

		bucketManager.delete(bucket, key, function (err, respBody, respInfo) {
			if (err) {
				console.log(err);
			} else {
				console.log(respInfo.statusCode);
				console.log(respBody);
			}
		});
		this.success('删除七牛云文件', {});
	}
}

module.exports = NewsController;