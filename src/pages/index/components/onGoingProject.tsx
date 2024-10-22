import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import { statusData, projectData } from '../data.config'

const OnGoingProject = () => {
  return (
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
  )
}

export default OnGoingProject
