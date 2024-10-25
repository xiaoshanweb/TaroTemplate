import {useState,useEffect} from 'react'
import { View, Text, Image } from '@tarojs/components'
import { AtDrawer, AtInput } from 'taro-ui'
import ChooseIndex from '@/components/choose_multi'
import {ChooseItem,ParamsDrawer} from '@/utils/type'
import { useNavigationBarInfo } from '@/utils/hooks'


const tabSelect = [
  {
    id: 1,
    name: '综合'
  },
  {
    id: 2,
    name:'价格'
  },
  {
    id: 3,
    name: '销量'
  },
  {
    id: 4,
    name: '筛选',
    icon:require('../../../assets/img/select.png')
  }
]



type TabProps = {
  color: string,
  selectData: any,
  chooseParams: any,
  onChange:(item: ParamsDrawer) => void
}

const TabIndex = (props: TabProps) => {
  let selectParams: ParamsDrawer = {
    brandList:[],
    channelList:[],
    maxPrice: '',
    minPrice:''}
  const { color, selectData, onChange, chooseParams } = props
  const [query,setQuery] = useState<ParamsDrawer>(selectParams)
  const [show, setShow] = useState(false)
  const [curTab, setCurTab] = useState(1)
  const [brand,setBrand] = useState<any>([])
  const [channel, setChannel] = useState<any>([])

  const {
		statusBarHeight,
		navigationBarHeight,
		navigationContentHeight,
		menuButtonHeight,
		navigationPaddding,
		menuButtonWidth,
	} = useNavigationBarInfo()

  useEffect(() => {
    if (chooseParams) {
      setQuery(chooseParams)
    }
    console.log('statusBarHeight==',statusBarHeight)
  },[])
  const closeDrawer = () => {
    setShow(false)
  }
  const resetDrawer = () => {
    setQuery(selectParams)
  }
  const sureDrawer = () => {
    setShow(false)
    onChange(selectParams)
  }

  const changeTab = (item: any) => {
    if (item.id == 4) {
      setShow(true)
    }
    setCurTab(item.id)
  }

  const changeChannelChoose = (data:Array<ChooseItem>) => {
    // const newData = { ...query, channelList: data }
    // setQuery(newData)
    setChannel(data)
  }
  const changeBrandChoose = (data:Array<ChooseItem>) => {
    // const newData = {...query,brandList:data}
    // setQuery(newData)
    setBrand(data)
  }

  return (
    <View className="tab-container">
      <View style={{backgroundColor:color}} className="tab-box">
        {
          tabSelect.map(item => <View key={item.id} className="tab-item">
            <Text onClick={()=>changeTab(item)} className='tab-text' style={{fontWeight:curTab === item.id ? 'bold' : '400'}}>{item.name}</Text>
            {item.icon ? <Image src={item.icon} className="tab-icon" /> : null}
          </View>)
        }
        <View className="tab-active" style={{left:`${93 / 2 + (curTab-1) * 93 - 5}px`}}></View>
      </View>
      <AtDrawer show={show} mask right onClose={closeDrawer}>
        <View className="drawer-content">
          <View
            style={{
              height: statusBarHeight,
            }}
          />
          <View className="drawer-content-module-con">
            <View className='drawer-content-module price-range'>
            <View class="section-title">价格区间</View>
            <View className="range-con">
              <AtInput name="text" placeholder='最低价' value={query.minPrice} className="input-range"/>
              <Text>-</Text>
              <AtInput name="text" placeholder='最高价' value={query.maxPrice} className="input-range"/>
            </View>
          </View>
          <View className='drawer-content-module channel'>
            <View class="section-title">渠道</View>
            <View>
              <ChooseIndex activeColor="#FF6A00" data={selectData.channelList} onChange={changeChannelChoose}/>
            </View>
          </View>
          <View className='drawer-content-module brand'>
            <View class="section-title">品牌</View>
            <View>
              <ChooseIndex activeColor="#FF6A00" data={selectData.brandList} onChange={changeBrandChoose}/>
            </View>
          </View>
          </View>
          <View className='drawer-footer'>
            <View className="btn-style btn-reset" onClick={resetDrawer}>重置</View>
            <View className="btn-style btn-sure" onClick={sureDrawer}>确定</View>
          </View>
        </View>
      </AtDrawer>
    </View>
  )
}

export default TabIndex
