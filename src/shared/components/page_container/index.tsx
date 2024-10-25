import React from 'react'
import { View } from '@tarojs/components'
import NavHeader from '../navigation_header'

type PageContainerProps = {
	title?: string
	containerClass: string
  children: React.ReactNode,
  bgColor?: string,
  customNavHeader?: boolean
}

export const PageContainer = (props: PageContainerProps): JSX.Element => {
	const { title, containerClass, children,bgColor,customNavHeader } = props
	return (
    <View className={containerClass} style={{backgroundColor:bgColor}}>
      {
        customNavHeader ? <View>
          <NavHeader title={title} color={bgColor} />
          {children}
        </View> : children
      }

		</View>
	)
}

export default PageContainer
