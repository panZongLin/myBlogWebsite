import {
    userLiOrReQuest,
    findMessageQuest,
    createMessageQuest,
    deleteMessageQuest
} from './service';
import { Effect, Reducer, history } from 'umi';

import { setAuthority } from '@/utils/authority';
import {SuccessResponseType} from '@/models/common';


export interface StateType {
    completeMessageList: [],
    messageList: [
        {
            name?: string,
            email?: string,
            message?: string,
            createTime?: number
        }
    ]
}

export interface ModelType {
    namespace: string,
    state: StateType,
    subscriptions: {

    },
    effects: {
        userLoginOrRegister: Effect,
        findMessage: Effect,
        createMessage: Effect,
        deleteMessage: Effect
    },
    reducers: {
        updateState: Reducer
    }
}
const Model: ModelType = {
    namespace: 'message',
    state: {
        completeMessageList: [],
        messageList: [{}]
    },

    subscriptions: {

    },

    effects: {
        *userLoginOrRegister( { payload }, { call, put, select }) {
            const response: SuccessResponseType = yield call(userLiOrReQuest, payload);
            if(response.code >0) {
                setAuthority(response.data);
                history.push('/dashboard/message');
            }
        },
        *findMessage( { payload }, { call, put, select }) {
            const response: SuccessResponseType = yield call(findMessageQuest, payload);
            const data = response.data.reverse();
            if(response.code >0) {
                yield put({
                    type: 'updateState',
                    payload: {
                        completeMessageList: data,
                        messageList: data.length>10 ? data.slice(0, 10) : data, 
                    }
                })
            }
        },
        *createMessage( { payload }, { call, put, select }) {
            const response: SuccessResponseType = yield call(createMessageQuest, payload);
            if(response.code >0) {
                yield put({
                    type: 'findMessage',
                    payload: {}
                })
            }
        },
        *deleteMessage( { payload }, { call, put, select }) {
            const response: SuccessResponseType = yield call(deleteMessageQuest, payload);
            if(response.code >0) {
                yield put({
                    type: 'findMessage',
                    payload: {}
                })
            }
        },
    },

    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload};
        }
    }
}

export default Model;