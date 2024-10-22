import React from 'react'
import { View, Image, Text } from '@tarojs/components'

const Header = () => {
  return (
    <View className="header">
				<View className="header-container">
					<View className="title"></View>
					<View className="base-info">
						<View className="msg">
							<View className="msg-left">
								<Image src={require('../../../assets/img/avator.png')} className="msg_bg" />
								<View className="name">王建国</View>
							</View>
							<View className="position">平台二部</View>
						</View>
						<View className="weather">
							<View className="temperature">32°</View>
							<Image src={require('../../../assets/img/weather.png')} className="weather_bg" />
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

  )
}

export default Header
