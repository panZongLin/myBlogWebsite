import React, { FC, useState, useEffect } from 'react';
import { connect, Dispatch, history } from 'umi';
import {
	AccountBookFilled,
	AlertFilled ,
	ApiFilled ,
	ProjectFilled ,
	SafetyCertificateFilled 
} from '@ant-design/icons';
import {
	Input,
	Modal,
	Form,
	Button,
	Popconfirm,
	Tag,
	message as Message
} from 'antd';
import moment from 'moment';

import LoadMore from '@/components/LoadMore';
import {StateType} from './model';
import styles from './index.less';

const {TextArea} = Input;

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
};


export interface MessageAndListType {
	dispatch: Dispatch,
	loading: boolean,
	message: StateType
}

const MessageAndList: FC<MessageAndListType> = (props) => {
	const {dispatch, message} = props;
	const {completeMessageList, messageList} = message;
	const [loginForm] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [textAreaValue, setTextAreaValue] = useState('')

	useEffect(()=>{
		dispatch({
			type: 'message/findMessage',
			payload: {}
		})
	}, [])

	//login
	const loginOk = ()=> {
		loginForm.validateFields(['name', 'email', 'github']).then((values)=> {
			let payload = values;
			payload.userType = "visitor";
			dispatch({
				type: 'message/userLoginOrRegister',
				payload: {...payload}
			})
			setVisible(false);
			loginForm.resetFields();
		})
	}
	const loginCancel = ()=> {
		setVisible(false);
		loginForm.resetFields();
	}
	const renderLoginModal = ()=> {
		return(
			<Modal
				title="登录" 
				visible={visible}
				onOk={loginOk}
				onCancel={loginCancel}
				className={styles.modalWrap}
			>
				<Form {...layout} form={loginForm} name="loginForm" >
                    <Form.Item name="name" rules={[{ required: true, message: "请输入昵称" }]}>
						<Input addonBefore="昵称（必填）"  />
					</Form.Item>
					<Form.Item name="email" rules={[{ required: true, message: "请输入邮箱" }]}>
						<Input addonBefore="邮箱（必填）"  />
					</Form.Item>
					<Form.Item name="github">
						<Input addonBefore="github（选填）"  />
					</Form.Item>
				</Form>
			</Modal>
		)
	}

	//logout
	const logout = ()=> {
		localStorage.removeItem('name');
		localStorage.removeItem('email');
		localStorage.removeItem('userType');
		history.push('/dashboard/message');
	}

	//message
	const textAreaValueChange = (e: any)=> {
		setTextAreaValue(e.target.value);
	}
	const confirmMessage = ()=> {
		if(textAreaValue=='') {
			Message.warning('写点什么');
			return
		}
		let payload = {
			name: localStorage.getItem('name'),
			email: localStorage.getItem('email'),
			createTime: new Date().getTime(),
			message: textAreaValue
		}
		dispatch({
			type: 'message/createMessage',
			payload: {...payload}
		})
		setTextAreaValue('');
	}

	const deleteMessage = (id: string)=> {
		dispatch({
			type: 'message/deleteMessage',
			payload: {_id: id}
		})
	}

	return(
        <div>
			<div className={styles.textAera}>
				<div className={styles.logInTab}>
					<div style={{marginLeft: 10}}> 
						<AccountBookFilled /> <AlertFilled /> <ApiFilled /> <ProjectFilled /> <SafetyCertificateFilled />
					</div>
					<div 
						className={styles.logBtn} 
						onClick={
							localStorage.getItem('email')
							? ()=> logout()
							: ()=> setVisible(true)
						}
					>
						{localStorage.getItem('email')
							? '退出'
							: '登录'
						}
					</div>
				</div>
				<TextArea bordered={false} rows={5} value={textAreaValue} onChange={textAreaValueChange} />
			</div>
			{localStorage.getItem('email')&&
				<Popconfirm
					title="要发布这条留言吗"
					onConfirm={confirmMessage}
					okText="是"
					cancelText="不"
				>
					<Button type="primary" style={{float: 'right', marginRight: 20}}>确定</Button> 
				</Popconfirm>
			}
			{renderLoginModal()}
			<div style={{marginTop: 50, padding: 20}}>
				{messageList&&messageList.map((item, index)=> {				
					return(
						<div key={index} className={styles.content}>
							<div>{messageList.length-index} 楼</div>
							<div>
								<Tag key={index+'tag'}>{item.name}</Tag>
								<span style={{color: '#ccc'}}>
									{moment(item.createTime).format('YYYY-MM-DD hh:mm')}
								</span>
							</div>
							<div>{item.message}</div>
							{localStorage.getItem('userType')==='admin' &&
								<Button 
									size={"small"} 
									type={"primary"} 
									style={{float: 'right'}}
									onClick={()=>deleteMessage(item['_id'])}
								>
									删除
								</Button>
							}
						</div>
					)
				})}
				{completeMessageList.length > messageList.length &&
					<LoadMore 
						dispatch={dispatch}
						modelName={'message'}
						listName={'messageList'}
						completeList={completeMessageList}					
					/>
				}
			</div>			
		</div>
	)
}

export default connect((
	{
		message,
		loading
	}: {
		message: StateType,
		loading: any
	}
)=>{
	return {
		message,
		loading: loading.models.message
	}
})(MessageAndList)
