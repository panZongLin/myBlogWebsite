import {
    getBaseInfoQuest,
    getArticleListQuest,
    getDiaryListQuest,
    deleteArticleQuest,
    deleteDiaryQuest
} from './service';
import { Subscription, Effect, Reducer } from 'umi';

export interface BaseInfoType {
	avatar?: string,
	name?: string,
	signature?: string,
	phone?: string,
	email?: string,
	github?: string,
	address?: string,
	position?: string,
	company?: string,
	tags?: string[]
}

export interface ArticleListType { 
	name?: string,
	email?: string,
    createTime?: number,
    title?: string,
    desc?: string,
    article?: string,
    articleType?: string,
    pictures?: any[],
    address?: string
}

export interface StateType {
    baseInfo: BaseInfoType,
    completeArticleList: ArticleListType[],
    articleList: ArticleListType[]
    editArticle: ArticleListType,
    resumeInfo: ArticleListType,
    compDiaryList: ArticleListType[],
    diaryList: ArticleListType[]
}



export interface ModelType {
    namespace: string,
    state: StateType,
    subscriptions: {

    },
    effects: {
        getBaseInfo: Effect,
        getArticleList: Effect,
        getDiaryList: Effect,
        deleteArticle: Effect,
        deleteDiary: Effect
    },
    reducers: {
        updateState: Reducer
    }
}
const Model: ModelType = {
    namespace: 'dashboard',
    state: {
        baseInfo: {},
        completeArticleList: [],
        articleList: [],
        editArticle: {},
        resumeInfo: {},
        compDiaryList: [],
        diaryList: []
    },

    subscriptions: {
    },

    effects: {
        *getBaseInfo( { payload }, { call, put, select }) {
            const response = yield call(getBaseInfoQuest, payload);
            if(response.code >0) {
                yield put({
                    type: 'updateState', 
                    payload: {baseInfo: response.data}
                })
            }           
        },
        *getArticleList( { payload }, { call, put, select }) {
            const response = yield call(getArticleListQuest, payload);
            const blog = response.data.filter((item: ArticleListType)=> item.articleType =='blog').reverse();
            const resume = response.data.filter((item: ArticleListType)=> item.articleType =='resume');

            if(response.code >0) {
                yield put({
                    type: 'updateState', 
                    payload: {
                        completeArticleList: blog,
                        articleList: blog.length>10 ? blog.slice(0, 10) : blog, 
                        resumeInfo: resume[0] || {}, 
                    }
                })
            } 
        },
        *getDiaryList( { payload }, { call, put, select }) {
            const response = yield call(getDiaryListQuest, payload);
            const diary = response.data.filter((item: ArticleListType)=> item.articleType =='diary').reverse();

            if(response.code >0) {
                yield put({
                    type: 'updateState', 
                    payload: {
                        compDiaryList: diary,
                        diaryList: diary.length>10 ? diary.slice(0, 10) : diary
                    }
                })
            } 
        },
        *deleteArticle( { payload }, { call, put, select }) {
            const response = yield call(deleteArticleQuest, payload);
            if(response.code >0) {
                yield put({
                    type: 'getArticleList', 
                    payload: {}
                })
            } 
        },
        *deleteDiary( { payload }, { call, put, select }) {
            const response = yield call(deleteDiaryQuest, payload);
            if(response.code >0) {
                yield put({
                    type: 'getDiaryList', 
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