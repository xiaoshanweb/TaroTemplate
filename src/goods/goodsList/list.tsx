import {useState,useEffect} from 'react'
import { View,ScrollView,Image } from '@tarojs/components'
import PageContainer from '@/components/page_container'
import NavHeader from '@/components/navigation_header'
import { getConfig,goodsSearchList } from '../../dataJson'
import { AtInput } from 'taro-ui'
import search from '../../assets/img/search.png'
import omit from "../../assets/img/omit.png"
import TabIndex from './components/tab'
import ListItem from './components/listItem'
import './list.scss'
import {ParamsDrawer} from '@/utils/type'

const GoodsListIndex = () => {
  const [select, setSelect] = useState({
    text:''
  })
  const [params, setParams] = useState<ParamsDrawer>({
    minPrice: '',
    maxPrice: '',
    brandList: [],
    channelList:[]
  })
  useEffect(() => {}, [])
  // 筛选
  const changeParams = (data:ParamsDrawer) => {
    setParams(data)
  }
  const searchGoodsList = () => {}
  return (
    <PageContainer bgColor={getConfig.bkcolor1} containerClass="GoodsListIndex" customNavHeader={false}>
      <NavHeader color={getConfig.bkcolor1}>
        <View className="search-box">
          <Image src={search} className="search-icon" />
          <AtInput name='text' className="search-input" type='text' placeholder='请输入内容' value={select.text} onBlur={searchGoodsList} clear/>
        </View>
        <Image src={omit} className="omit-icon" />
      </NavHeader>
      {/* <View style={{backgroundColor:getConfig.bkcolor1,height:'100%'}} className=""> */}
        <TabIndex chooseParams={params} color={getConfig.bkcolor1} selectData={goodsSearchList} onChange={changeParams} />
        <Image src={getConfig.topImgList[0].ShowImg} className='swiper-item-img' />
        <View className='goods-list' >
          {goodsSearchList.goodsList.map(item => <ListItem key={item._id} detail={item} goToDetail={ ()=>{}} />)}
        {/* </View> */}
      </View>
    </PageContainer>
  )
}

export default GoodsListIndex
