import React from 'react'
import { View, Image} from '@tarojs/components'
import './index.scss'

const arrow = require('../../../assets/img/arrow.png')

type TitleProps = {
	title: string,
	children?: React.ReactNode,
	clickFunction?: () => void
}

const Title = (props: TitleProps): JSX.Element => {
	const { title,children,clickFunction } = props
	return (
		<View className='title-style'>
			<View class={title}>{title} </View>
			{clickFunction ? <Image className="arrow" src={arrow} onClick={clickFunction} /> : ''}
			{children}
		</View>
	)
}

export default Title
