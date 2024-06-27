import React, { useEffect } from 'react'
import { View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Router from '@/utils/route'
import Title from './components/title'
import './index.scss'

const statusData = {
	0: '未开始',
	1: '进行中',
	2: '已完成',
	3: '已挂起',
}

const projectData = [
	{ name: 'Taro', status: 2, progress: 100, },
	{ name: '日常迭代', status: 1, progress: 35.5, },
	{ name: '版本迭代', status: 1, progress: 43, },
	{ name: '数据库迁移项目', status: 2, progress: 100, },
	{ name: 'Taro', status: 1, progress: 32, },
	{ name: '升级项目', status: 0, progress: 0, }
]

const UserIndex = (): JSX.Element => {
	useEffect(() => {
		// console.log('process.env', process.env.TARO_ENV)
		// console.log('TARO_API_BASE', process.env.TARO_API_BASE)
		Taro.getSystemInfo({
			success: (res) => {
				console.log('Taro.getSystemInfo success', res)
			},
			fail: (err) => {
				console.log('Taro.getSystemInfo fail', err)
			},
		})
	}, [])

	/**
	 * 跳转demo页面
	 */
	const jumpToDemo = (demoType: 'router' | 'form') => {
		switch (demoType) {
			case 'router':
				Router.navigateTo({
					url: '/demo/router/router',
				})
				break
			case 'form':
				Router.navigateTo({
					url: '/demo/form/form',
				})

				break
		}
	}

	return (
		<View className="index-page">
			<View className="header">
				<View className="header-container">
					<View className="title"></View>
					<View className="base-info">
						<View className="msg">
							<View className="msg-left">
								<Image src={require('../../assets/img/avator.png')} className="msg_bg" />
								<View className="name">王建国</View>
							</View>
							<View className="position">平台二部</View>
						</View>
						<View className="weather">
							<View className="temperature">32°</View>
							<Image src={require('../../assets/img/weather.png')} className="weather_bg" />
							<View className="word">多云 空气 优</View>
						</View>

					</View>
					<View className="status-data">
						<View className="handle-total data-item">
							<View className="num">3</View>
							<View className="text">任务总数</View>
						</View>
						<View className="unhandle-total data-item">
							<View className="num">3</View>
							<View className="text"> 待处理任务</View>
						</View>
					</View>
				</View>
			</View>

			<Title title='工作任务' />
			<View className="projects">
				<View className="projects-item my">
					<Image className='img' src={require('../../assets/img/data2.png')} />
					<View>我的任务</View>
					<View>1</View>
				</View>
				<View className="projects-item bug">
					<Image className='img' src={require('../../assets/img/data1.png')} />
					<View>我的bug</View>
					<View>0</View>
				</View>
				<View className="projects-item ongoing">
					<Image className='img' src={require('../../assets/img/data1.png')} />
					<View>我的任务</View>
					<View>1</View>
				</View>

			</View>


			<Title title='进行中的项目' clickFunction={() => jumpToDemo('form')} />
			<View className="ongoing-projects">
				<View className="project-header">
					<View className="header-item">项目名称</View>
					<View className="header-item">状态</View>
					<View className="header-item">进度</View>
				</View>
				{
					projectData.map((item, index) => (
						<View className="project-item" key={index}>
							<View className="body-item project-name">{item.name}</View>
							<View className="body-item project-status">{statusData[item.status]}</View>
							<View className="body-item project-progress">
								<View>{item.progress}%</View>
								<View className="progress">
									<View className="progress-active" style={{ width: item.progress }} />
								</View>
							</View>
						</View>
					))
				}
			</View>

			<View className="bottom-tip">技术服务：工福科技</View>
		</View>

	)
}

export default UserIndex
