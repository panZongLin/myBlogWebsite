import React, { FC, useState, useEffect } from 'react';
import { connect, Dispatch, history } from 'umi';
import {
	Menu,
	Row,
	Col
} from 'antd';

import {
	StateType as dashboardStateType, 
	BaseInfoType, 
	ArticleListType
} from '@/pages/dashboard/model';

import { StateType } from './model';
import InfoForm from './components/infoForm';
import ArticleForm from './components/articleForm';
import UserForm from './components/userForm'; 
import styles from './index.less';


export interface SetUpType {
	dispatch: Dispatch,
	dashboard: dashboardStateType,
	setUp: StateType
}

const SetUp: FC<SetUpType> = (props) => {
	const {
		dispatch, 
		dashboard,
		setUp
	} = props;

	const [menukey, setMenuKey] = useState("1");
	const [hasResume, setHasResume] = useState(false);

	useEffect(()=>{
		dispatch({
			type: 'setUp/findAllUser'
		})

		const pathname = history.location.pathname;
		if(pathname.includes('edit')) {
			setMenuKey("2");
		}

		const {resumeInfo} = dashboard;
		if(Object.keys(resumeInfo).length !==0) {
			setHasResume(true);
		}
	}, [])

	const menuClick = (e: any)=> {
		setMenuKey(e.key);
	}

	const baseInfoFormSubmit = (payload: BaseInfoType)=> {
		dispatch({
			type: 'setUp/baseInfoSubmit',
			payload: payload
		})
	}

	const articleFormSubmit = (payload: ArticleListType)=> {
		if(payload.articleType==='diary') {
			dispatch({
				type: 'setUp/saveDiary',
				payload: payload
			})
			return;
		}	
		dispatch({
			type: 'setUp/saveArticle',
			payload: payload
		})	
	}

	const confirmChangeType = (payload: StateType['userArray'])=> {
		dispatch({
			type: 'setUp/changeUserType',
			payload: payload
		})
	}

	const confirmDeleteType = (payload: StateType['userArray'])=> {
		dispatch({
			type: 'setUp/deleteUserType',
			payload: payload
		})
	}

	const deleteQiniuFile = (key: string)=> {
		dispatch({
			type: 'setUp/deleteQiniuFile',
			payload: {key}
		})
	}

	return(
		<Row gutter={24}>
			<Col lg={4} md={24}>
				<Menu
					onClick={menuClick}
					selectedKeys={[menukey]}
					mode="inline"
				>
					<Menu.Item key="1">基本信息</Menu.Item>
					<Menu.Item key="2">笔记发布</Menu.Item>
					<Menu.Item key="3">管理员设置</Menu.Item>
				</Menu>
			</Col>	
			<Col lg={20} md={24}>
				<div className={styles.content}>
					{ menukey=="1" && 
						<InfoForm 
							baseInfo={dashboard.baseInfo}
							formSubmit={baseInfoFormSubmit}
						/>
					}
					{ menukey=="2" && 
						<ArticleForm 
							hasResume={hasResume}
							editArticle={dashboard.editArticle}
							formSubmit={articleFormSubmit}
							uploadToken={dashboard.baseInfo['uploadToken']}
							deleteQiniuFile={deleteQiniuFile}
						/>
					}
					{ menukey=="3" && 
						<UserForm 
							userArray={setUp.userArray}
							confirmChangeType={confirmChangeType}
							confirmDeleteType={confirmDeleteType}
						/>
					}
				</div>
			</Col>					
		</Row>
	)
}

export default connect(
	({
		dashboard,
		setUp,
		loading
	}:{
		dashboard: dashboardStateType,
		setUp: StateType,
		loading: any
	})=>{
		return {
			dashboard,
			setUp,
			loading: loading.models.setUp
		}
	}
)(SetUp)
