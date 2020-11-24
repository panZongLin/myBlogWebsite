const Service = require('egg').Service;
//用于编写业务逻辑层，可选，可以使公用逻辑得到复用


class NewsService extends Service {
  async list(page = 1) {
    const {pageSize, serverUrl} = this.config;
    //console.log('this.config', this.config)
    //this.ctx.curl(url, { dataType: 'json' });

    let data = [];
    for(let i=0; i<20; i++) {
      data.push({
        title: 'listTitle' + i,
        url: 'www.baidu.com'
      })
    }
    return data;
  }
}

module.exports = NewsService;