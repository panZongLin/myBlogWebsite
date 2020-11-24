import React, { FC } from 'react';
import {
    Row,
    Table,
    Tag,
    Popconfirm,
    Divider 
} from 'antd';
import { StateType } from '../model';

export interface InfoFormType {
    userArray: StateType['userArray'],
    confirmChangeType: any,
    confirmDeleteType: any
}


const InfoForm: FC<InfoFormType> = (props) => {
    const {userArray, confirmChangeType, confirmDeleteType} = props;
    const columns = [
        {
            title: '昵称',
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: '邮箱',
            key: 'email',
            dataIndex: 'email'
        },
        {
            title: 'github',
            key: 'github',
            dataIndex: 'github'
        },
        {
            title: '类型',
            key: 'userType',
            dataIndex: 'userType',
            render: (text: any, rcord: any)=> {
                if(text==='admin') {
                    return <Tag color="#d34242">{text}</Tag>
                }
                return <Tag>{text}</Tag>
            }
        },
        {
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            render: (text: any, rcord: any)=> {
                if(rcord.email==="1328785074@qq.com") {
                    return null
                }
                return(
                    <div style={{width: 80}}>
                        <Popconfirm
                            title="确认更改吗?"
                            onConfirm={()=>confirmChangeType(rcord)}
                            okText="是"
                            cancelText="否"
                        >
                            <a href="#">变更</a>
                        </Popconfirm>
                        <Divider type={'vertical'} />
                        <Popconfirm
                            title="确认删除吗?"
                            onConfirm={()=>confirmDeleteType(rcord)}
                            okText="是"
                            cancelText="否"
                        >
                            <a href="#">删除</a>
                        </Popconfirm>
                    </div>                   
                )
            }
        },
    ]

	return(
		<Row>
            <Table 
                style={{marginTop: 24}}
                columns={columns} 
                dataSource={userArray}
                rowKey={(record)=>record['_id']} 
            />		
		</Row>
	)
}

export default InfoForm;
