'use strict';

/**用于配置需要加载的插件 */
module.exports = {
	// had enabled by egg
	// static: {
	//   enable: true,
	// }

	nunjucks: {
		enable: true,
		package: 'egg-view-nunjucks'
	},
	mongoose: {
		enable: true,
		package: 'egg-mongoose'
	},
	cors: {
		enable: true,
		package: 'egg-cors'
	}
};
