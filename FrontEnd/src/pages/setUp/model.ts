import {
    findAllUserQuest,
    changeUserTypeQuest,
    deleteUserTypeQuest,
    updateBaseInfoQuest,
    createBaseInfoQuest,
    updateArticleQuest,
    createArticleQuest,
    updateDiaryQuest,
    createDiaryQuest,
    deleteQiniuFileQuest
} from './service';
import { Effect, Reducer, history } from 'umi';
import { SuccessResponseType } from '@/models/common';


export interface StateType {
    userArray?: object[]
}

export interface ModelType {
    namespace: string,
    state: StateType,
    subscriptions: {

    },
    effects: {
        findAllUser: Effect,
        changeUserType: Effect,
        deleteUserType: Effect,
        baseInfoSubmit: Effect,
        saveArticle: Effect,
        saveDiary: Effect,
        deleteQiniuFile: Effect
    },
    reducers: {
        updateState: Reducer
    }
}
const Model: ModelType = {
    namespace: 'setUp',
    state: {
        userArray: []
    },

    subscriptions: {

    },

    effects: {
        *findAllUser( { payload }, { call, put, select }) {
            const response: SuccessResponseType = yield call(findAllUserQuest, payload);
            if(response.code > 0) {
                yield put({
                    type: 'updateState',
                    payload: {userArray: response.data}
                })
            }                  
        },
        *changeUserType( { payload }, { call, put, select }) {
            const response: SuccessResponseType = yield call(changeUserTypeQuest, payload);
            if(response.code > 0) {
                yield put({
                    type: 'findAllUser'
                })
            }                  
        },
        *deleteUserType( { payload }, { call, put, select }) {
            const response: SuccessResponseType = yield call(deleteUserTypeQuest, payload);
            if(response.code > 0) {
                yield put({
                    type: 'findAllUser'
                })
            }                  
        },
        *baseInfoSubmit( { payload }, { call, put, select }) {
            if(payload['_id']) {
                const response: SuccessResponseType = yield call(updateBaseInfoQuest, payload);
                if(response.code > 0) {
                    history.push('/');
                }
            }else {
                const response: SuccessResponseType = yield call(createBaseInfoQuest, payload);
                if(response.code > 0) {
                    history.push('/');
                }
            }                  
        },
        *saveArticle( { payload }, { call, put, select }) {
            let response: any = null;

            if(payload['_id']) {
               response = yield call(updateArticleQuest, payload);
            }else {
               response = yield call(createArticleQuest, payload);
            }  
            if(response.code > 0) {
                yield put({
                    type: 'dashboard/updateState',
                    payload: {editArticle: {}}
                })
                history.push('/');
            }          
        },
        *saveDiary( { payload }, { call, put, select }) {
            let response: any = null;

            if(payload['_id']) {
               response = yield call(updateDiaryQuest, payload);
            }else {
               response = yield call(createDiaryQuest, payload);
            }  
            if(response.code > 0) {
                yield put({
                    type: 'dashboard/updateState',
                    payload: {editArticle: {}}
                })
                yield put({
                    type: 'dashboard/getDiaryList',
                    payload: {}
                })
                history.push('/dashboard/diary');
            }          
        },
        *deleteQiniuFile( { payload }, { call, put, select }) {
            
            yield call(deleteQiniuFileQuest, payload);                            
        },
    },

    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload};
        }
    }
}

export default Model;