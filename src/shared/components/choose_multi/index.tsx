import { View } from '@tarojs/components'
import { useState } from 'react'
import { ChooseItem } from '../../utils/type'
import './index.scss'

type ChooseProps = {
  data: ChooseItem[],
  activeColor: string,
  onChange?: (item: any) => void
}


const ChooseIndex = (props: ChooseProps) => {

  const { data, activeColor, onChange } = props
  const [newData,setNewData] = useState(data)

  const chooseChange = (item:ChooseItem) => {
    const newData = data.map(s => {
      if (s.BrandId === item.BrandId) {
        s.isChoose = !s.isChoose
      }
      return s
    })
    setNewData(newData)
    onChange(newData.filter(f => f.isChoose))
  }
  return (
    <View className="choose-container">
      {
        newData.map((item) => (
          <View className='choose-item' onClick={()=>chooseChange(item)} key={item.BrandId}
            style={item.isChoose ? { color: activeColor, borderColor: activeColor,backgroundColor:'#fff' } : {}}>
            {item.BrandName}
          </View>
        ))
      }
    </View>
  )
}

export default ChooseIndex
