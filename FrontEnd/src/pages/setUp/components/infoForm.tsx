import React, { FC, useState, useEffect, useRef } from 'react';
import {
    PlusOutlined,
    UploadOutlined
} from '@ant-design/icons';
import {
    Row,
    Col,
    Form,
    Input,
    Button,
    Tag,
    Upload,
    message
} from 'antd';
import styles from '../index.less';
import { BaseInfoType } from '@/pages/dashboard/model';

const { TextArea } = Input;
const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};
const tailLayout = {
    wrapperCol: { offset: 0, span: 16 },
};

export interface InfoFormType {
    baseInfo: BaseInfoType,
    formSubmit: any
}

const InfoForm: FC<InfoFormType> = (props) => {
    const {baseInfo, formSubmit} = props;
    const inputRef = useRef<Input | null>(null);
    const [form] = Form.useForm();
    const [tags, setTags] = useState<BaseInfoType['tags']>([]);
    const [tagInputVisible, setTagInputVisible] = useState(false);
    const [tagInputValue, setTagInputValue] = useState('');
    const [imgSrc, setImgSrc] = useState<BaseInfoType['avatar']>('');

    useEffect(()=>{
        setTags(baseInfo.tags);
        setImgSrc(baseInfo.avatar);
        form.setFieldsValue(baseInfo); 
    }, [baseInfo])


    //tags
    const tagClose = (removeTag: string)=> {
        let newTags = tags&&tags.filter(tag=> tag !==removeTag)
        setTags(newTags);
    }
    const showInput = ()=> {
        setTagInputVisible(true);
    }
    const tagInputChange = (e: any)=> {
        setTagInputValue(e.target.value);
    }
    const tagInputConfirm = ()=> {    
        let newTags = tags !==undefined ? tags : [];
        newTags.push(tagInputValue);
        setTags(newTags);
        setTagInputVisible(false);
    }
    const renderTags = ()=> {
        return(
            <>
                {tags&&tags.map((tag)=> {
                    return(
                        <Tag 
                            key={tag} 
                            style={{marginBottom: '5px'}}
                            closable onClose={()=>tagClose(tag)}                       
                        >
                            {tag}
                        </Tag>
                    )
                })}
                {!tagInputVisible && (
                    <Tag onClick={showInput}>
                        <PlusOutlined /> New Tag
                    </Tag>
                )}
                {tagInputVisible && (
                    <Input
                        ref={inputRef}
                        type="text"
                        size="small"
                        value={tagInputValue}
                        onChange={tagInputChange}
                        onBlur={tagInputConfirm}
                        onPressEnter={tagInputConfirm}
                    />
                )}
            </>
        )
    }

    //upload
    const beforeUpload = (file: any)=> {      
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('请选择JPG/PNG文件');
        }
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
          message.error('图片请小于1MB');
        }
        return isJpgOrPng && isLt1M;
    }
    const uploadChange = (info: any)=> {
        if (info.file.status === 'done'&&info.fileList.length ==1) {
            const reader = new FileReader();
            reader.readAsDataURL(info.file.originFileObj);
            //注意，需要onload
            reader.onload = ()=> {
                const file: any = reader.result;
                setImgSrc(file);
            }       
        }
    }
    const uploadRemove = ()=> {
        setImgSrc(baseInfo.avatar);
    }

    //form
    const onFinish = (values: BaseInfoType)=> {
        let payload = {...baseInfo, ...values};
        payload.avatar = imgSrc;
        payload.tags = tags;
        
        formSubmit(payload);
    }

	return(
		<Row gutter={24}>
            <Col lg={12} sm={24}>
                <Form 
                    {...layout} 
                    form={form} 
                    name="setBaseForm" 
                    onFinish={onFinish}
                    className={styles.setBaseFormStyle}
                >
                    <Form.Item name="name" label="昵称"><Input /></Form.Item>
                    <Form.Item name="signature" label="个人简介"><TextArea rows={4} /></Form.Item>
                    <Form.Item name="phone" label="电话"><Input /></Form.Item>
                    <Form.Item name="email" label="邮箱"><Input /></Form.Item>
                    <Form.Item name="github" label="github"><Input /></Form.Item>
                    <Form.Item name="address" label="地区/省市"><Input /></Form.Item>
                    <Form.Item name="position" label="职位"><Input /></Form.Item>
                    <Form.Item name="company" label="公司"><Input /></Form.Item>
                    <Form.Item name="company" label="标签">
                        {renderTags()}
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">更新基本信息</Button>
                    </Form.Item>
                </Form>
            </Col>	
            <Col lg={12} sm={24}>
                <div className={styles.avatarHolder}>
                    <img alt="avatar" src={imgSrc} />
                    <Upload
                        name="avatar"
                        action=""
                        beforeUpload={beforeUpload}
                        onChange={uploadChange}
                        onRemove={uploadRemove}
                    >
                        <Button> <UploadOutlined /> 更换头像</Button>
                    </Upload>               
                </div>
            </Col>		
		</Row>
	)
}

export default InfoForm;
