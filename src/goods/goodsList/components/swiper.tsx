import { View,Swiper, SwiperItem,Image  } from '@tarojs/components'

type SwiperProps = {
  topImg:string
}
const SwiperIndex = (props: SwiperProps) => {
  const {topImg} = props
  return (
    <Swiper
        className='test-h'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        >
        <SwiperItem>
          <Image src={topImg} className='swiper-item-img' />
        </SwiperItem>
      </Swiper>
  )
}

export default SwiperIndex
