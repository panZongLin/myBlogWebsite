import React, { FC, useState } from 'react';
import { connect, Dispatch, history } from 'umi';
import ReactMarkdown from 'react-markdown/with-html';
import {
	DeleteOutlined,
	EditOutlined
} from '@ant-design/icons';
import {
	Card,
	Modal,
	Tag,
} from 'antd';
import moment from 'moment';

import LoadMore from '@/components/LoadMore';
import CodeBlock from '@/pages/setUp/components/CodeBlock';
import {StateType, ArticleListType} from '@/pages/dashboard/model';
import styles from './index.less';



export interface BlogListType {
	dispatch: Dispatch,
	dashboard: StateType
}

const BlogList: FC<BlogListType> = (props) => {
	const {dispatch, dashboard} = props;
	const {completeArticleList, articleList} = dashboard;
	const [visible, setVisible] = useState(false);
    const [markdownValue, setMdValue] = useState<string | undefined>('');

	const previewMd = (item: ArticleListType)=> {
        setMdValue(item.article);
        setVisible(true);
	}
	
	const deleteArticle = (_id: number)=> {
		dispatch({
			type: 'dashboard/deleteArticle',
			payload: {_id}
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
        <div>
			{articleList&&articleList.map((item, index)=> {
				return(
					<Card
						key={item.title +`${index}`}
						bordered={false}
						hoverable={true}
						onClick={()=>previewMd(item)}
						style={{
							marginBottom: 20, 
							backgroundColor: index%2===0 ? 'rgba(211, 66, 66, 0.3)' : 'rgba(20, 50, 110, 0.3)'
						}}
						actions={
							localStorage.getItem('userType')&&localStorage.getItem('userType') =='admin'
							? 	[	
									<div onClick={(e)=>e.stopPropagation()} onDoubleClick={()=>deleteArticle(item['_id'])}>
										<DeleteOutlined key="delete" /> 删除
									</div>,
									<div onClick={(e)=>editArticle(e, item)}><EditOutlined key="edit" /> 编辑</div>,						
								]
							: 	[]
						}						
					>						
						<div className={styles.content}>
							<div>{item.title}</div>
							<div>{item.desc}</div>
							<div>
								<Tag>{item.name}</Tag> 
								<span style={{color: '#848484'}}>
									{moment(item.createTime).format('YYYY-MM-DD hh:ss')}
								</span>
							</div>
						</div>
					</Card>
				)
			})}
			{completeArticleList.length > articleList.length &&
				<LoadMore 
					dispatch={dispatch}
					modelName={'dashboard'}
					listName={'articleList'}
					completeList={completeArticleList}					
				/>
			}
			<Modal
                title="笔记内容"
                footer={null}
                visible={visible}
                width={1080}
				onCancel={()=> setVisible(false)}
				className={styles.modalWrap}
            >
                <ReactMarkdown 
                    source={markdownValue} 
                    escapeHtml={false} 
                    renderers={{
                        code: CodeBlock,
                    }}
                />
            </Modal>
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
)(BlogList)

