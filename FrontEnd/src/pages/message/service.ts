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

export function userLiOrReQuest(payload: any) {
    return ajaxRequest(`/api/userLoginOrRegister`, opt('POST', payload))
}

export function findMessageQuest(payload: any) {
    return ajaxRequest(`/api/findMessage`, {method: 'GET'})
}

export function createMessageQuest(payload: any) {
    return ajaxRequest(`/api/createMessage`, opt('POST', payload))
}

export function deleteMessageQuest(payload: any) {
    return ajaxRequest(`/api/removeMessage`, opt('POST', payload))
}