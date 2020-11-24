import React, { FC, useState } from 'react';
import { connect, Dispatch, history } from 'umi';
import ReactMarkdown from 'react-markdown/with-html';
import {
	DeleteOutlined,
	EditOutlined
} from '@ant-design/icons';
import {
	Row,
	Col,
	Card,
	Modal,
	Carousel
} from 'antd';
import moment from 'moment';
import Zmage from 'react-zmage';

import LoadMore from '@/components/LoadMore';
import CodeBlock from '@/pages/setUp/components/CodeBlock';
import {StateType, ArticleListType} from '@/pages/dashboard/model';
import defaultLongmao from '@/assets/default.jpg';
import styles from './index.less';



export interface DiaryListType {
	dispatch: Dispatch,
	dashboard: StateType
}

const DiaryList: FC<DiaryListType> = (props) => {
	const {dispatch, dashboard} = props;
	const {compDiaryList, diaryList} = dashboard;
	const [visible, setVisible] = useState(false);
	const [markdownValue, setMdValue] = useState<string | undefined>('');
	const [previewPic, setPreviewPic] = useState<any[] | undefined>([]);

	// 放在这里的话会被重复触发，原因是请求成功后，dshboard会重新渲染，子组件跟着也会被触发
	// useEffect(()=>{
	// 		dispatch({
	// 			type: 'dashboard/getDiaryList',
	// 			payload: {}
	// 		})								
	// }, [])

	const previewMd = (item: ArticleListType)=> {
		setMdValue(item.article);
		setPreviewPic(item.pictures)
        setVisible(true);
	}
	
	const deleteArticle = (item: ArticleListType)=> {
		item.pictures !==undefined 
		&& item.pictures.length !==0 
		&& item.pictures.forEach((obj)=> {
			dispatch({
				type: 'setUp/deleteQiniuFile',
				payload: {key: obj.name}
			})
		})
		dispatch({
			type: 'dashboard/deleteDiary',
			payload: {_id: item['_id']}
		})
	}

	const editArticle = (e: any, item: ArticleListType)=> {
		e.stopPropagation();
		dispatch({
			type: 'dashboard/updateState',
			payload: {editArticle: item}
		})
		history.push('/dashboard/setUp/edit');
	}

	return(
        <Row gutter={24}>
			{diaryList&&diaryList.map((item, index)=> {
				return(
					<Col lg={12} md={24} key={item.title +`${index}`} style={{width: '100%'}}>
						<Card						
							bordered={false}
							hoverable={true}
							onClick={()=>previewMd(item)}
							style={{marginBottom: 20}}
							actions={
								localStorage.getItem('userType')&&localStorage.getItem('userType') =='admin'
								? 	[	
										<div onClick={(e)=>e.stopPropagation()} onDoubleClick={()=>deleteArticle(item)}>
											<DeleteOutlined key="delete" /> 删除
										</div>,
										<div onClick={(e)=>editArticle(e, item)}><EditOutlined key="edit" /> 编辑</div>,						
									]
								: 	[]
							}	
							cover={item.pictures&&item.pictures.length==0 
								? <img alt="picture1" src={defaultLongmao} />	
								: <img alt="picture1" src={item.pictures&&item.pictures[0].completeUrl} />						
							}					
						>						
							<Card.Meta 
								title={
									<div>
										<p>{item.title}</p>
										<p>{moment(item.createTime).format('YYYY-MM-DD HH:ss')}</p>
									</div>								
								} 
								description={
									<p>{item.desc}</p>
								}
							/>
						</Card>
					</Col>
				)
			})}
			{compDiaryList.length > diaryList.length &&
				<LoadMore 
					dispatch={dispatch}
					modelName={'dashboard'}
					listName={'diaryList'}
					completeList={compDiaryList}					
				/>
			}
			<Modal
                title="日记内容"
                footer={null}
                visible={visible}
                width={1080}
                onCancel={()=> setVisible(false)}
            >
				<div className={styles.carouselWrap}>
					<Carousel>
						{previewPic && previewPic.length>0 && previewPic.map((item)=> {
								return(
									<div key={item.uid} style={{width: '100%'}}>
										<Zmage 
											alt={'picture'+item.uid} 
											src={item.completeUrl} 
											set={[{src: item.completeUrl, alt: 'picture'+item.uid}]}
										/>
									</div>
								)
							})
						}
					</Carousel>
					<div style={{marginTop: 20}}>
						<ReactMarkdown 
							source={markdownValue} 
							escapeHtml={false} 
							renderers={{
								code: CodeBlock,
							}}
						/>
					</div>
				</div>
            </Modal>
		</Row>
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
)(DiaryList)

