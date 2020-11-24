import React, { FC } from 'react';
import { connect, Dispatch, history } from 'umi';
import ReactMarkdown from 'react-markdown/with-html';
import {
	CaretDownOutlined,
	DeleteOutlined,
	EditOutlined
} from '@ant-design/icons';
import {
	Button
} from 'antd';

import CodeBlock from '@/pages/setUp/components/CodeBlock';
import {StateType, ArticleListType} from '@/pages/dashboard/model';



export interface ResumeInfoType {
	dispatch: Dispatch,
	dashboard: StateType
}

const ResumeInfo: FC<ResumeInfoType> = (props) => {
	const {dispatch, dashboard} = props;
	const {resumeInfo} = dashboard;

	const deleteArticle = (_id: number)=> {
		dispatch({
			type: 'dashboard/deleteArticle',
			payload: {_id}
		})
	}

	const editArticle = (item: ArticleListType)=> {
		dispatch({
			type: 'dashboard/updateState',
			payload: {editArticle: item}
		})
		history.push('/dashboard/setUp/edit');
	}

	return(
        <div>
			<ReactMarkdown 
				source={resumeInfo.article} 
				escapeHtml={false} 
				renderers={{
					code: CodeBlock,
				}}
			/>
			<div style={{textAlign: 'right'}}>
				<Button style={{marginBottom: 10}}>
					<a href={'http://pzlcommonbucket.panzonglin.cn/resume.pdf'} target={'_blank'}>
						<CaretDownOutlined />查看pdf
					</a>
				</Button>
			</div>			
			{localStorage.getItem('userType')&&localStorage.getItem('userType') =='admin'&&
				<div style={{textAlign: 'right'}}>
					<Button onClick={()=>deleteArticle(resumeInfo['_id'])} style={{marginRight: 20}}>
						<DeleteOutlined />删除
					</Button>
					<Button type="primary" onClick={()=>editArticle(resumeInfo)}>
						<EditOutlined /> 编辑
					</Button>
				</div>				
			}
		</div>
	)
}

export default connect(
	({
		dashboard,
		loading
	}:{
		dashboard: StateType,
		loading: any
	})=>{
		return {
			dashboard,
			loading: loading.models.dashboard
		}
	}
)(ResumeInfo)

