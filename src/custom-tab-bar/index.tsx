import React, { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import Route from '@/utils/route'
import './index.scss'

interface TabbarItem {
	pagePath: string
	text: string
	iconPath: string
	selectedIconPath: string
}

const list: TabbarItem[] = [
	{
		pagePath: 'pages/index/index',
		text: '首页',
		iconPath: '../assets/tabbar/home.png',
		selectedIconPath: '../assets/tabbar/home_active.png',
	},
	{
		pagePath: 'pages/map/index',
		text: '地图',
		iconPath: '../assets/tabbar/map.png',
		selectedIconPath: '../assets/tabbar/map_active.png',
	},
	{
		pagePath: 'pages/warning/index',
		text: '异况',
		iconPath: '../assets/tabbar/warning.png',
		selectedIconPath: '../assets/tabbar/warning_active.png',
	},
	{
		pagePath: 'pages/user/index',
		text: '我的',
		iconPath: '../assets/tabbar/user.png',
		selectedIconPath: '../assets/tabbar/user_active.png',
	},
]

const CustomTabBar = (): JSX.Element => {
	const [currentTab, setCurrentTab] = useState('')

	const handleSwtich = (item: any) => {
		Taro.switchTab({
			url: `/${item.pagePath}`,
		})
	}

	useEffect(() => {
		// 默认选中当前页面
		const currentRoute = Route.getCurrentRoute()
		if (currentRoute) {
			setCurrentTab(currentRoute)
		}

		// 监听变化
		wx.onAppRoute((res: { path: string }) => {
			if (res.path) {
				setCurrentTab(res.path)
			}
		})
	}, [])

	return (
		<View className="tabbar-container">
			{list.map(item => {
				return (
					<View
						onClick={() => handleSwtich(item)}
						key={item.pagePath}
						className={`tabbar-item ${item.pagePath === currentTab ? 'tabbar-item-selected' : ''}`}
					>
						<Image
							className="icon-img"
							src={item.pagePath === currentTab ? item.selectedIconPath : item.iconPath}
						/>
						<View className="tabbar-item-text">{item.text}</View>
					</View>
				)
			})}
		</View>
	)
}

export default CustomTabBar
