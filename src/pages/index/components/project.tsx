import React from 'react'
import { View, Image, Text } from '@tarojs/components'

const Project = () => {
  return (
    <View className="projects">
				<View className="projects-item my">
					<Image className='img' src={require('../../../assets/img/data2.png')} />
					<View>我的任务</View>
					<View>1</View>
				</View>
				<View className="projects-item bug">
					<Image className='img' src={require('../../../assets/img/data1.png')} />
					<View>我的bug</View>
					<View>0</View>
				</View>
				<View className="projects-item ongoing">
					<Image className='img' src={require('../../../assets/img/data1.png')} />
					<View>我的任务</View>
					<View>1</View>
				</View>

			</View>
  )
}

export default Project
