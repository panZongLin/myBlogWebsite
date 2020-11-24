import request from '@/utils/request';
const {ajaxRequest} = request;

export async function query() {
  return ajaxRequest('/api/users');
}

export async function queryCurrent() {
  return ajaxRequest('/api/currentUser');
}

export async function queryNotices() {
  return ajaxRequest('/api/notices');
}
