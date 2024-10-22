import {useState,useEffect} from 'react'
import { View,ScrollView } from '@tarojs/components'
import PageContainer from '@/components/page_container'
import { useNavigationBarInfo } from '@/utils/hooks'
import Taro, { usePullDownRefresh, stopPullDownRefresh } from '@tarojs/taro'
import { AtFloatLayout } from "taro-ui"
import './task.scss'

interface TaskStatus {
  label: string
  status: number
  color: string
}

interface TaskList {
  name: string
  status: number
  creator: string
  limitTime: string
  taskName: string
  position: string
  taskDesc: string
}

const taskStatus:TaskStatus[] = [
  {label:'未开始',status:0,color:'#FFB800'},
  {label:'进行中',status:1,color:'#079298'},
  {label:'已完成',status:2,color:'#999999'},
  {label:'已关闭',status:3,color:'#999999'}
]


const taskList = [
  { name: '王建国', position: '平台研发一部', status: 0, limitTime: '2021-01-01', taskName: '页面-龙工惠报表问题优化', taskDesc: '分支：24.07.02日常迭代',creator:'XX' },
  { name: '王建国', position: '平台研发二部', status: 1, limitTime: '2021-01-01', taskName: '页面-MongoDb迁移-重写涉及到商品的V2的接口', taskDesc: '分支：24.07.02日常迭代',creator:'XX' },
  { name: '王建国', position: 'UI设计师', status: 2, limitTime: '2021-01-01', taskName: '页面-龙工惠报表问题优化', taskDesc: '分支：24.07.02日常迭代' ,creator:'XX'},
  {name:'王建国',position:'UI设计师',status:3,limitTime:'2021-01-01',taskName:'页面-龙工惠报表问题优化',taskDesc:'分支：24.07.02日常迭代',creator:'XX'},
  { name: '王建国', position: 'UI设计师', status: 0, limitTime: '2021-01-01', taskName: '页面-龙工惠报表问题优化', taskDesc: '分支：24.07.02日常迭代',creator:'XX' },
  { name: '王建国', position: 'UI设计师', status: 0, limitTime: '2021-01-01', taskName: '页面-龙工惠报表问题优化', taskDesc: '分支：24.07.02日常迭代', creator: 'XX' },
   { name: '王建国', position: '平台研发一部', status: 0, limitTime: '2021-01-01', taskName: '页面-龙工惠报表问题优化', taskDesc: '分支：24.07.02日常迭代',creator:'XX' },
  { name: '王建国', position: '平台研发二部', status: 1, limitTime: '2021-01-01', taskName: '页面-MongoDb迁移-重写涉及到商品的V2的接口', taskDesc: '分支：24.07.02日常迭代',creator:'XX' },
  { name: '王建国', position: 'UI设计师', status: 2, limitTime: '2021-01-01', taskName: '页面-龙工惠报表问题优化', taskDesc: '分支：24.07.02日常迭代' ,creator:'XX'},
  {name:'王建国',position:'UI设计师',status:3,limitTime:'2021-01-01',taskName:'页面-龙工惠报表问题优化',taskDesc:'分支：24.07.02日常迭代',creator:'XX'},
  { name: '王建国', position: 'UI设计师', status: 0, limitTime: '2021-01-01', taskName: '页面-龙工惠报表问题优化', taskDesc: '分支：24.07.02日常迭代',creator:'XX' },
  {name:'王建国',position:'UI设计师',status:0,limitTime:'2021-01-01',taskName:'页面-龙工惠报表问题优化',taskDesc:'分支：24.07.02日常迭代',creator:'XX'}
]

const TaskIndex = () => {
  const {screenWidth} = useNavigationBarInfo()
  const [translateX,setX] = useState(screenWidth/8 - 10)
  const [currentTab, setTab] = useState<Number>(0)
  const [list, setList] = useState<TaskList[]>([])
  const [refresherTriggered, setFefresherTriggered] = useState<boolean>(false)
  const [isOpen,setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    console.log('useNavigationBarInfo==', screenWidth)
    getList(0)
  },[])
  const clickTab = (item: object,index:number) => {
    console.log(item)
    setTab[index]
    setX(screenWidth / 4 * index + screenWidth / 8 - 10)
    getList(index)
  }

  const getList = (status:number) => {
    Taro.showLoading({
      title:'加载中～'
    })
    setTimeout(() => {
      setList(taskList.filter(item => item.status === status))
      Taro.hideLoading()
    },500)
  }

  usePullDownRefresh(() => {
    setTimeout(() => {
      stopPullDownRefresh()
    }, 1000)
  })
  const onRefresherRefresh = () => {
    if(refresherTriggered) return
    setFefresherTriggered(true)
    setTimeout(() => {
      setFefresherTriggered(false)
    }, 1000)
  }

  const renderStatus = (status: number) => {
    return taskStatus.find(item=>item.status === status)
  }

  // 操作
 const clickOp = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <PageContainer title='我的任务' containerClass='taskIndex'>
      <View className='tTab'>
        {taskStatus.map((item,index) => (
          <View className={index === currentTab ? 'tTab-item tTab-item-active' : 'tTab-item'} key={item.label} onClick={()=>clickTab(item,index)}>{item.label}</View>
        ))}
      </View>
      <View className="tTab-line" style={{ transform: `translateX(${translateX}px)` }}></View>

      <ScrollView
        className='tasklist-scrollview'
        scrollY
        refresherEnabled
        refresher-background="transparent"
        refresherTriggered={refresherTriggered}
        onRefresherRefresh={onRefresherRefresh}
      >
        <View className="list">
          {
            list.map((item, index) => (
              <View className="list-item" key={item.name}>
                <View className="list-item-title">
                  <View className="list-item-title-msg">{item.name}/{item.position}</View>
                  <View className="list-item-title-status" style={{color:renderStatus(item.status)?.color}}>{ renderStatus(item.status)?.label }</View>
                </View>
                <View className="list-item-task">{item.taskName}</View>
                <View className="list-item-endtime">预计{item.limitTime}前完成</View>
                {/* <View className="list-item-creator">{item.creator}</View> */}
                <View className="list-item-op">
                  <View className="list-item-op-btn list-item-op-assign" onClick={()=>clickOp()}>指派</View>
                  <View className="list-item-op-btn list-item-op-start" onClick={()=>clickOp()}>处理</View>
                </View>
              </View>
            ))
          }
        </View>
      </ScrollView>


      <AtFloatLayout isOpened={isOpen} title="这是个标题" onClose={()=>handleClose()}>
        这是内容区 随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写这是内容区
        随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写
      </AtFloatLayout>
    </PageContainer>
  )
}

export default TaskIndex
