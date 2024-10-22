import {useState,useEffect} from 'react'
import PageContainer from '@/components/page_container'

const GoodsListIndex = () => {
  const [list, setList] = useState([])
  useEffect(() => {
    setList[1]
  }, [])
  return (
    <PageContainer title='' containerClass="GoodsListIndex" >
      <div>
        { list.map(item => <div key={item}>{item}</div>)}
        <div>1111</div>
      </div>
    </PageContainer>
  )
}

export default GoodsListIndex
