import React, { FC, useEffect, useLayoutEffect, useState, useRef } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { connect, Dispatch, history, Route } from 'umi';
// import classnames from 'classnames';
import {
	PhoneOutlined,
	MailOutlined,
	GithubOutlined,
	AimOutlined,
	DesktopOutlined,
	WifiOutlined,
	CopyrightOutlined,
	CaretUpOutlined,
	CaretRightOutlined
} from '@ant-design/icons';
import {
	Row,
	Col,
	Card,
	Divider,
	Tag,
	Tabs,
	BackTop,
} from 'antd';
import moment from 'moment';

import CanvasParticle from '@/utils/canvas-particle';
import Resume from '@/pages/resume';
import BlogList from '@/pages/blog';
import Message from '@/pages/message';
import DiaryList from '@/pages/diary';
import SetUp from '@/pages/setUp';

import {StateType, BaseInfoType} from './model';
import styles from './index.less';


const {TabPane} = Tabs;
const backTopStyle = {
	height: 40,
	width: 40,
	lineHeight: '40px',
	borderRadius: 4,
	backgroundColor: '#d34242',
	color: '#fff',
	textAlign: 'center',
	fontSize: 14,
}

const nowYMD = moment(new Date()).format('YYYY/MM/DD');
const dayForFullYearFn = ()=> {
	let y = new Date().getFullYear(),
  		isLeap = (0===y%4) && (0!==y%100) || (0===y%400),
  		days = isLeap ? 366 : 365;
	return days;
}
const nowDayForFullYearFn =()=> {
	let n:any = new Date(),
		y:any = new Date( n.getFullYear().toString() ),
		dd = 24*60*60*1000;
	return Math.ceil((n-y) / dd)
}
const dayForFullMonthFn = ()=> {
	let date = new Date(),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		d = new Date(year, month, 0);
	return d.getDate();
}
const nowDayForFullMonthFn = ()=> {
	return new Date().getDate();
}
const nowHourForFullDayFn = ()=> {
	return new Date().getHours();
}



export interface DashboardType {
	dispatch: Dispatch,
	loadingB: boolean,
	loadingA: boolean,
	dashboard: StateType
}
const Dashboard: FC<DashboardType> = (props) => {
	const {dispatch, loadingB, loadingA, dashboard} = props;
	const {baseInfo} = dashboard;

	const videoRef: any = useRef(HTMLVideoElement);
	const audioRef: any = useRef(HTMLAudioElement);
	const [activeTab, setActiveTab] = useState("1");
	const [userType, setUserType] = useState<string | null>('');
	const [playVideo, setPlayVideo] = useState(false);
	const [nowTime, setNowTime] = useState( moment(new Date()).format('HH: mm:ss') );
	const dayForFullYear:number = dayForFullYearFn();
	const nowDayForFullYear:number = nowDayForFullYearFn();
	const dayForFullMonth:number = dayForFullMonthFn();
	const nowDayForFullMonth:number = nowDayForFullMonthFn();
	const nowHourForFullDay:number = nowHourForFullDayFn();


	useEffect(()=> {
		let ss = setTimeout(()=>{
			setNowTime(moment(new Date()).format('HH: mm:ss'))
		}, 1000);
		return ()=> {
			clearTimeout(ss); 
		}		
	},[nowTime])
	
	useEffect(()=> {
		dispatch({
			type: 'dashboard/getBaseInfo',
			payload: {}
		})
		dispatch({
			type: 'dashboard/getArticleList',
			payload: {}
		})
		setUserType(localStorage.getItem('userType'));	
		setTimeout(()=>{
			dispatch({
				type: 'dashboard/getDiaryList',
				payload: {}
			})
		}, 3000)	
	},[])

	useEffect(()=> {		
		switch (history.location.pathname) {
			case "/dashboard/resume":
				setActiveTab("0");
				break;
			case "/dashboard":
				setActiveTab("1");
				break;
			case "/dashboard/message":
				setActiveTab("2");
				break;
			case "/dashboard/diary":
				setActiveTab("3");
				break;
			case "/dashboard/setUp":
				setActiveTab("4");
				break;
			case "/dashboard/setUp/edit":
				setActiveTab("4");
				break;	
			default:
				break;
		}
	},[history.location.pathname])

	useLayoutEffect(()=>{
		let config = {
			stroke: "211, 66, 66", //点颜色
			color: "20, 50, 110", //线条颜色
			count: 70
		}
		CanvasParticle(config);
	}, [])


	const renderInfoItems = (baseInfo: BaseInfoType)=> {
		return(
			<div>
				<p className={styles.items}>
					<PhoneOutlined /> {baseInfo.phone}
				</p>
				<p className={styles.items}>
					<MailOutlined /> {baseInfo.email}
				</p>
				<p className={styles.items}>
					<GithubOutlined /> {baseInfo.github}
				</p>
				<p className={styles.items}>
					<AimOutlined /> {baseInfo.address}
				</p>
				<p className={styles.items}>
					<DesktopOutlined /> {baseInfo.position}
				</p>
				<p className={styles.items}>
					<WifiOutlined /> {baseInfo.company}
				</p>
			</div>
		)
	}

	const renderTagsList = (tagsList: BaseInfoType['tags'])=> {
		let colors = ['#d34242','#14326e'];
		return( 
			<div>
				{tagsList&&tagsList.map((item)=> {
					return(
						<Tag 
							key={item} 
							style={{marginBottom: '5px'}}
							color={colors[Math.floor( Math.random()*2)]} 						
						>
							{item}
						</Tag>
					)
				})}
			</div>
		)
	}

	const clockCard = ()=> {
		return(
			<div className={styles.clockWrap}>
				<div className={styles.time}>
					<p className={styles.ymd}>{nowYMD}</p>
					<p className={styles.hms}>{nowTime}</p>
				</div>
				<div className={styles.time}>
					<div className={styles.tit}>
						<p>Year</p><p>{nowDayForFullYear}/{dayForFullYear} days</p>										
					</div>
					{progress(nowDayForFullYear, dayForFullYear)}
					<div className={styles.footer}>
						{dayForFullYear-nowDayForFullYear} days until the end of {new Date().getFullYear()}
					</div>
				</div>
				<div className={styles.time}>
					<div className={styles.tit}>
						<p>Month</p><p>{nowDayForFullMonth}/{dayForFullMonth} days</p>										
					</div>
					{progress(nowDayForFullMonth, dayForFullMonth)}
					<div className={styles.footer}>
						{dayForFullMonth-nowDayForFullMonth} days until the end of {new Date().getMonth()+1} month
					</div>
				</div>
				<div className={styles.time}>
					<div className={styles.tit}>
						<p>Day</p><p>{nowHourForFullDay}/{24} hours</p>										
					</div>
					{progress(nowHourForFullDay, 24)}
					<div className={styles.footer}>
						{24-nowHourForFullDay} hours until the end of this day
					</div>
				</div>
			</div>
		)
	}

	const progress =(now: any, full: any)=> {
		const percent = `${((now/full)*100).toFixed(2)}%`;
		return(
			<div style={{width: '100%', height: 30}}>
				<div className={styles.progressBg}>
					<div className={styles.percent} style={{width: percent}}>
						{percent}
					</div>
				</div>
			</div>
		)
	}

	const tabPaneChange = (key: any)=> {
		switch (key) {
			case "0":
				history.push('/dashboard/resume');
				setActiveTab("0");
				break;
			case "1":
				history.push('/dashboard');
				setActiveTab("1");
				break;
			case "2":
				history.push('/dashboard/message');
				setActiveTab("2");
				break;
			case "3":
				history.push('/dashboard/diary');
				setActiveTab("3");
				break;
			case "4":
				history.push('/dashboard/setUp');
				setActiveTab("4");
				break;		
			default:
				break;
		}
	}

	const togglePlayVideo = ()=> {
		setPlayVideo(!playVideo);
		if(!playVideo) {
			videoRef.current.play();
			audioRef.current.play();
		}else {
			videoRef.current.pause();
			audioRef.current.pause();
		}
	}


	return(
		<div style={{position: 'relative', zIndex: 10}}> 
			<div className={styles.banner} onClick={togglePlayVideo}>
				<video 
					ref={videoRef}					
					width={'100%'} height={'auto'} loop 
					src={'http://pzlcommonbucket.panzonglin.cn/bannerMp4.mp4'} 
				/>
				<audio 
					ref={audioRef} loop
					src={'http://pzlcommonbucket.panzonglin.cn/bannerMp3.mp3'}
				/>
				{!playVideo &&
					<div className={styles.playControl}>
						<CaretRightOutlined style={{marginRight: 18}} /> 
						Between Worlds
					</div>
				}
			</div>			
			<GridContent>
				<Row gutter={24}>
					<Col lg={7} md={24} style={{width: '100%'}}>
						<Card bordered={false} style={{ marginBottom: 24 }} loading={loadingB}>
							<div className={styles.avatarHolder}>
								<img alt="" src={baseInfo.avatar} />
								<div className={styles.name}>{baseInfo.name}</div>
								<div>{baseInfo.signature}</div>
							</div>
							<Divider orientation="left" plain>信息</Divider>
							{renderInfoItems(baseInfo)}
							<Divider orientation="left" plain>标签</Divider>
							{renderTagsList(baseInfo.tags)} 
						</Card>
						<Card bordered={false} style={{ marginBottom: 24 }}>
							{clockCard()}
						</Card>
						<div className={styles.copyright}>
							<CopyrightOutlined /> panZongLin
							<Divider type={'vertical'} /> 
							<a href={'http://beian.miit.gov.cn/'} target={'_blank'}>桂ICP备2020008882号-1</a>
						</div>
					</Col>
					<Col lg={17} md={24} style={{width: '100%'}}>
						<Card bordered={false} style={{ marginBottom: 24 }} loading={loadingA}>
							<Tabs 
								activeKey={activeTab} 
								onChange={tabPaneChange} 
								type="card" 
								className={styles.tabsBarPadding}
							>
								<TabPane tab="简历" key="0">
									<Route path={'/dashboard/resume'} component={Resume} />
								</TabPane>
								<TabPane tab="知识笔记" key="1">
									<Route path={'/dashboard'} component={BlogList} />
								</TabPane>
								<TabPane tab="留言板" key="2">
									<Route path={'/dashboard/message'} component={Message} />
								</TabPane>
								<TabPane tab="生活足迹" key="3">
									<Route path={'/dashboard/diary'} component={DiaryList} />
								</TabPane>
								{userType=="admin" &&
									<TabPane tab="设置区" key="4">
										<Route path={'/dashboard/setUp'} component={SetUp} />
									</TabPane>
								}						
							</Tabs>
						</Card>					
					</Col>
				</Row>
				<BackTop>
					<div style={backTopStyle}><CaretUpOutlined /></div>
				</BackTop>
			</GridContent>
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
			loadingA: loading.effects['dashboard/getArticleList'],
			loadingB: loading.effects['dashboard/getBaseInfo'],
		}
	}
)(Dashboard)
