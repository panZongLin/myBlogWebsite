/* eslint valid-jsdoc: "off" */

'use strict';

/**
 *  用于编写配置文件
 */
module.exports = appInfo => {
	/**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
	const config = exports = {};

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1597801698673_8625';

	// add your middleware config here
	config.middleware = [];

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
	};

	//请求实体最大值
	config.bodyParser = {
		formLimit: '20mb',
		jsonLimit: '20mb',
		textLimit: '20mb'
	}

	config.view = {
		defaultViewEngine: 'nunjucks',
		mapping: {
			'.html': 'nunjucks',
		},
	};

	config.mongoose = {
		url: 'mongodb://localhost:27017/admin',
		options: {
		},
	};

	config.security = {
		csrf: {
			enable: false,
		},
		domainWhiteList: ['*'], // 允许访问接口的白名单
	};

	config.cors = {
		origin: '*', // 允许跨域请求的地址
		allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS', // 允许跨域请求的方式
	};


	return {
		...config,
		...userConfig,
	};
};

