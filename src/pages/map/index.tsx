import React, {useState,useEffect } from 'react'
import PageContainer from '@/components/page_container'
import { Button, View, Map, Input, Image } from '@tarojs/components';
import Router from '@/utils/route'
import Taro from '@tarojs/taro'
import {useNavigationBarInfo} from '@/utils/hooks'

import './index.scss'

interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  width: number;
  height: number;
  iconPath: string;
  title?: string;
}

const MapIndex = (): JSX.Element => {
  const { statusBarHeight} = useNavigationBarInfo()

  const [longitude,setLongitude] = useState(120)
  const [latitude,setLatitude] = useState(30)
  const [markers, setMarkers] = useState<Marker[]>([])
  const [searchValue,setSearch] = useState('')
	useEffect(() => {
		// console.log('process.env', process.env.TARO_ENV)
    // console.log('TARO_API_BASE', process.env.TARO_API_BASE)
    getLocation()
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

  const getLocation = () => {
    Taro.getLocation({
      type: 'wgs84',
      success: res => {
        console.log(res)
        setLongitude(res.longitude)
        setLatitude(res.latitude)
      }
    })
  }
  const searchLocation = (address?:any) => {
    Taro.chooseLocation({
      success: (chooseRes) => {
        console.log(chooseRes)
        setLongitude(chooseRes.longitude)
        setLatitude(chooseRes.latitude)
        setMarkers([{
          id: 0,
          latitude: chooseRes.latitude,
          longitude: chooseRes.longitude,
          width: 22,
          height: 33,
          iconPath: require('../../assets/img/mark.png')
        }])
        setSearch(chooseRes.name)
      },
      fail: (err) => {
        console.log(err)
        setSearch('')
      }
    })
  }
	return (
		<PageContainer
			title="地图"
			containerClass="MapIndex"
		>
      <Map
        className='map'
        longitude={longitude}
        latitude={latitude}
        scale={16}
        markers={markers}
        show-location />
      <View className='search-map' style={{top: statusBarHeight + 70}}>
        <Image src={require('../../assets/img/search.png')} className='search-icon' />
        <Input value={searchValue} placeholder='搜索' className='search-input' onFocus={() => searchLocation()}/>
      </View>
		</PageContainer>
	)
}

export default MapIndex
