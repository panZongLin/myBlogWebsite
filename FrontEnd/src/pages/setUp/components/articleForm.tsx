import React, { FC, useState, useEffect } from 'react';
import {
    PlusOutlined
} from '@ant-design/icons';
import ReactMarkdown from 'react-markdown/with-html';
import * as qiniu from 'qiniu-js';
import {
    Row,
    Col,
    Form,
    Input,
    Select,
    Button,
    Modal,
    Popconfirm,
    Upload,
    message
} from 'antd';

import { ArticleListType } from '@/pages/dashboard/model';
import CodeBlock from './CodeBlock';
import styles from '../index.less';


const { TextArea } = Input;
const { Option } = Select;
const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};
const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
};
function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}


export interface ArticleFormType {
    editArticle: ArticleListType,
    formSubmit: any,
    hasResume: boolean,
    uploadToken: string,
    deleteQiniuFile: any
}
const ArticleForm: FC<ArticleFormType> = (props) => {
    const {editArticle, formSubmit, hasResume, uploadToken, deleteQiniuFile} = props;
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [articleType, setArticleType] = useState<ArticleListType['articleType']>('');
    const [fileList, setFileList] = useState<ArticleListType['pictures']>([]);
    const [markdownValue, setMdValue] = useState<ArticleListType['article']>('');

    useEffect(()=>{
        form.setFieldsValue(editArticle); 
        setArticleType(editArticle.articleType);
        setFileList(editArticle.pictures);
        setMdValue(editArticle.article);
    }, [editArticle])


    //form
    const onFinish = ()=> {
        form.validateFields(['title', 'articleType', 'desc']).then((values)=> {
            let params: any = {
                ...values,
                _id: form.getFieldValue('_id'),
                name: localStorage.getItem('name'),
                email: localStorage.getItem('email'),
                article: markdownValue, 
                createTime: new Date().getTime()
            }
            if(params['_id']=='' || params['_id']==undefined) {
                delete params['_id'];
            }
            if(values.articleType=='diary') {
                params.pictures = fileList;
                params.address = form.getFieldValue('address');
            }
            
            formSubmit(params);
        })          
    }

    const markdownValueChange = (e: any)=> {
        setMdValue(e.target.value);
    }

    //upload
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className="ant-upload-text">Upload</div>
        </div>
    );
    const beforeUpload = (file: any)=> {      
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('请选择JPG/PNG文件');
        }
        const isLt1M = file.size / 1024 / 1024 < 10;
        if (!isLt1M) {
          message.error('图片请小于10MB');
        }
        return isJpgOrPng && isLt1M;
    }
    const uploadChange = (info: any)=> {      
        let fileList = info.fileList;

        fileList.forEach((item: any, idx: number)=> {
            if(!item.completeUrl) {
                getBase64(item.originFileObj, (result: any)=> {
                    //qiniu
                    let observable = qiniu.upload(
                        item.originFileObj, 
                        item.name, 
                        uploadToken, 
                        {},
                        {region: qiniu.region.z2}
                    );
                    observable.subscribe({
                        complete(res){
                            let link = `http://pzldiarybucket.panzonglin.cn/${res.key}`;
                            fileList[idx].completeUrl = link
                        }
                    })
                })
            }           
        })
        setFileList(fileList);
    }
    const uploadRemove =(file: any)=> {
        //qiniu
        deleteQiniuFile(file.name);
        setFileList(()=>{
            return fileList?.filter((item)=> item.uid !==file.uid);
        });
    }

    //previewMd
    const previewMd = ()=> {      
        setVisible(true);
    }

	return(
		<Row>
            <Col span={24}>
                <Form 
                    {...layout} 
                    form={form} 
                    name="articleForm" 
                    onFinish={onFinish}
                    className={styles.setBaseFormStyle}
                >
                    <Form.Item name="_id">
                        <Input style={{ display: 'none' }} />
                    </Form.Item>
                    <Form.Item name="title" label="标题" rules={[{required: true, message: '请填写标题'}]}>
                        <Input style={{ width: 300 }} />
                    </Form.Item>
                    <Form.Item name="articleType" label="类型" rules={[{required: true, message: '请填写类型'}]}>
                        <Select 
                            style={{ width: 300 }} 
                            onChange={(v)=>{setArticleType(String(v))}}
                        >
                            <Option value="blog">笔记</Option>
                            <Option value="diary">日记</Option>
                            <Option value="resume" disabled={hasResume}>简历</Option>
                        </Select>
                    </Form.Item>
                    {articleType==='diary'&&
                        <Form.Item name="address" label="地点">
                            <Input style={{ width: 300 }} />
                        </Form.Item>
                    }
                    {articleType==='diary'&&
                        <Form.Item name="pictures" label="照片">
                            <Upload
                                name="pictures"
                                action=""
                                listType="picture-card"
                                fileList={fileList}
                                beforeUpload={beforeUpload}
                                onChange={uploadChange}
                                onRemove={uploadRemove}
                            >
                                {fileList&&fileList.length >=5 ? null : uploadButton}
                            </Upload>  
                        </Form.Item>
                    }                   
                    <Form.Item name="desc" label="笔记描述" rules={[{required: true, message: '请填写描述'}]}>
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item name="article" label="笔记内容(markdown)">
                        <TextArea onChange={(e)=>markdownValueChange(e)} autoSize={{ minRows: 23 }} />
                    </Form.Item>
                    <Form.Item {...tailLayout}>  
                        <Popconfirm
                            title="要发布这篇笔记吗"
                            okText="是"
                            cancelText="不"
                            onConfirm={onFinish}
                        >
                            <Button type="primary" style={{ float: 'right' }}>发布</Button>
                        </Popconfirm>                                    
                        <Button 
                            onClick={previewMd}
                            style={{ float: 'right', marginRight: 20 }} 
                        >
                            预览
                        </Button>
                    </Form.Item>
                </Form>
            </Col>	
            <Modal
                title="笔记预览"
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
		</Row>
	)
}

export default ArticleForm;
