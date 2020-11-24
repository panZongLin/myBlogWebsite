import request from '@/utils/request';
const {ajaxRequest} = request;
import {LoginPayloadsType} from '@/models/login';


export async function fakeAccountLogin(payload: LoginPayloadsType) {
  return ajaxRequest('/api/login/account', {
    method: 'POST',
    data: payload,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return ajaxRequest(`/api/login/captcha?mobile=${mobile}`);
}