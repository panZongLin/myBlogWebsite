import request from '@/utils/request';
const {ajaxRequest} = request;

const opt =(method: 'POST' | 'PUT' | 'DELETE', payload: any)=> {
    return{
        method: method,
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    }
}

export function findAllUserQuest(payload: any) {
    return ajaxRequest(`/api/findAllUser`)
}

export function changeUserTypeQuest(payload: any) {
    if(payload.userType==='admin') {
        return ajaxRequest(`/api/makeItNotAdmin`, opt('POST', payload))
    }
    return ajaxRequest(`/api/makeItIsAdmin`, opt('POST', payload))
}

export function deleteUserTypeQuest(payload: any) {
    return ajaxRequest(`/api/removeOneUser`, opt('POST', payload))
}

export function updateBaseInfoQuest(payload: any) {
    return ajaxRequest(`/api/updateBaseInfo`, opt('POST', payload))
}

export function createBaseInfoQuest(payload: any) {
    return ajaxRequest(`/api/createBaseInfo`, opt('POST', payload))
}


export function updateArticleQuest(payload: any) {
    return ajaxRequest(`/api/updateArticle`, opt('POST', payload))
}

export function createArticleQuest(payload: any) {
    return ajaxRequest(`/api/createArticle`, opt('POST', payload))
}

export function updateDiaryQuest(payload: any) {
    return ajaxRequest(`/api/updateDiary`, opt('POST', payload))
}

export function createDiaryQuest(payload: any) {
    return ajaxRequest(`/api/createDiary`, opt('POST', payload))
}

export function deleteQiniuFileQuest(payload: any) {
    return ajaxRequest(`/api/deleteQiniuFile`, opt('POST', payload))
}