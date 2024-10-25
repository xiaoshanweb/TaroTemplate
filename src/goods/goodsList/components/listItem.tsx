import { View,Image,Text} from '@tarojs/components'
import car from "../../../assets/img/car.png"
type ListItemProps = {
  detail: any,
  goToDetail:(item) => void
}
const ListItem = (props:ListItemProps) => {
  const {detail,goToDetail} = props
  return (
    <View className='goods-list-item' onClick={() => goToDetail(detail)}>
      <Image src={detail.Img} className='goods-img' />
      <View className='goods-info'>
        <View className='goods-title'>{detail.Name}</View>
        <View className='goods-price'>
          <View className="price-box">
            <View className='sale-price'><Text>￥</Text>{detail.Price}</View>
            <View className='market-price'>{detail.MarketPrice}</View>
          </View>
          <Image src={car} className='shopping-car'/>
        </View>
        <View className='goods-example'>
          <View>精选</View>
          <View>已售{ detail.SaleCount }</View>
        </View>
      </View>
    </View>
  )
}

export default ListItem
