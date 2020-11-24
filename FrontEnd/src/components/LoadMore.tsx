import React, { FC } from 'react';
import {Dispatch} from 'umi';
import { Pagination } from 'antd';
import {ArticleListType} from '../pages/dashboard/model';


export interface LoadMoreType {
    dispatch: Dispatch,
    modelName: string,
    listName: string,
    completeList: ArticleListType[]
}

const LoadMore: FC<LoadMoreType> = (props) => {
    const {dispatch, modelName, listName, completeList} = props;
    
    const onChange = (page: number)=> {
        dispatch({
			type: `${modelName}/updateState`,
			payload: {[`${listName}`]: completeList.slice( ((page-1)*10), (page*10) )}
		})
    }

	return(
        <div style={{width: '100%'}}>
            <Pagination 
                style={{float: 'right', marginTop: 12}}
                defaultCurrent={1} 
                total={completeList.length}        
                onChange={onChange}     
            />
        </div>
	)
}

export default LoadMore

