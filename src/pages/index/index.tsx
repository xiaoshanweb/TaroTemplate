import React, { useEffect } from 'react'
import { View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Router from '@/utils/route'
import Title from './components/title'
import './index.scss'
import Header from './components/header'
import Project from './components/project'
import OnGoingProject from './components/onGoingProject'



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
	const jumpToDemo = (demoType: string) => {
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
      case 'project':
				Router.navigateTo({
					url: '/project/task/task',
				})
				break
		}
	}

	return (
		<View className="index-page">
			<Header />



      <View className="section-project">
        <Title title='工作任务' clickFunction={() => jumpToDemo('project')}/>
        <Project />

        <Title title='进行中的项目' clickFunction={() => jumpToDemo('form')} />
        <OnGoingProject />

        <View className="bottom-tip">技术服务：工福科技</View>
      </View>
		</View>

	)
}

export default UserIndex
