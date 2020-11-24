'use strict';

/**
 * @param {Egg.Application} app - egg application
 * 用于配置 URL 路由规则
 */
module.exports = app => {
	const { router, controller } = app;

	//基本信息
	router.get('/api/getBaseInfo', controller.base.getBaseInfo);
	router.post('/api/updateBaseInfo', controller.base.updateBaseInfo);
	router.post('/api/createBaseInfo', controller.base.createBaseInfo);
	router.post('/api/removeBaseInfo', controller.base.removeBaseInfo);
	router.post('/api/deleteQiniuFile', controller.base.deleteQiniuFile);

	//用户管理
	router.post('/api/userLoginOrRegister', controller.user.userLoginOrRegister);
	router.get('/api/findAllUser', controller.user.findAllUser);
	router.post('/api/makeItIsAdmin', controller.user.makeItIsAdmin);
	router.post('/api/makeItNotAdmin', controller.user.makeItNotAdmin);
	router.post('/api/removeOneUser', controller.user.removeOneUser);

	//留言
	router.get('/api/findMessage', controller.message.findMessage);
	router.post('/api/createMessage', controller.message.createMessage);
	router.post('/api/removeMessage', controller.message.removeMessage);

	//笔记
	router.get('/api/findArticle', controller.article.findArticle);
	router.post('/api/createArticle', controller.article.createArticle);
	router.post('/api/updateArticle', controller.article.updateArticle);
	router.post('/api/removeArticle', controller.article.removeArticle);

	//日记
	router.get('/api/findDiary', controller.diary.findDiary);
	router.post('/api/createDiary', controller.diary.createDiary);
	router.post('/api/updateDiary', controller.diary.updateDiary);
	router.post('/api/removeDiary', controller.diary.removeDiary);
};
