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


export function getBaseInfoQuest(payload: any) {
    return ajaxRequest(`/api/getBaseInfo`)
}

export function getArticleListQuest(payload: any) {
    return ajaxRequest(`/api/findArticle`)
}

export function getDiaryListQuest(payload: any) {
    return ajaxRequest(`/api/findDiary`)
}

export function deleteArticleQuest(payload: any) {
    return ajaxRequest(`/api/removeArticle`, opt('POST', payload))
}

export function deleteDiaryQuest(payload: any) {
    return ajaxRequest(`/api/removeDiary`, opt('POST', payload))
}