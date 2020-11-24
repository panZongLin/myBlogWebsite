import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = ProSettings & {
	pwa: boolean;
};

const proSettings: DefaultSettings = {
	"navTheme": "light",
	"primaryColor": "#d34242",
	"layout": "top",
	"contentWidth": "Fixed",
	"fixedHeader": false,
	"fixSiderbar": true,
	"menu": {
		"locale": true
	},
	"title": "=v=",
	"pwa": false,
	"iconfontUrl": "",
	"splitMenus": false,
	"headerRender": false,
	"footerRender": false
}

export type { DefaultSettings };

export default proSettings;
