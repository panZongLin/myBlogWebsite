import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';

import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

//state 
export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}
//effect payload
export interface LoginPayloadsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}
//effect response
export interface BaseResponseType {
  code: number;
  msg: string;
}
export interface LoginResponseType extends BaseResponseType {
  data: {
    type: string;
    token: string;
    currentAuthority: 'admin' | 'user',
  }
}
//model
export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response: LoginResponseType = yield call(fakeAccountLogin, payload);
            if(response.code > 0) {
        //储存
        yield put({
          type: 'changeLoginStatus',
          payload: response.data,
        }); // Login successfully
  
        //跳转
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as {redirect: string};
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');

      }
    },

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
