import React, { Component } from 'react'
import { View, Button, Text,Canvas } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import Router from '@/utils/route'
import PageContainer from '@/components/page_container'

import './index.scss'

type PageStateProps = {
  store: {
    counterStore: {
      counter: number,
      increment: Function,
      decrement: Function,
      incrementAsync: Function
    }
  }
}

interface IndexProps extends PageStateProps {
  children?: React.ReactNode;
}

@inject('store')
@observer
class HomeIndex extends Component<IndexProps> {
  componentDidMount() {
    // this.initChart()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  increment = () => {
    const { counterStore } = this.props.store
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props.store
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props.store
    counterStore.incrementAsync()
  }

  initChart = () => {
      // const ctx = Taro.createCanvasContext('myChart')
      // const chart = echarts.init(ctx, null, {
      //   width: 375,
      //   height: 250
      // })
      // const option = {
      //   // ECharts 配置项
      // }
      // chart.setOption(option)
  }

  /**
	 * 跳转demo页面
	 */
	jumpToDemo = (demoType: 'router' | 'form' | 'echarts' | 'goods') => {
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
      case 'echarts':
				Router.navigateTo({
					url: '/demo/echarts/index',
				})
        break
      case 'goods':
        Router.navigateTo({
					url: '/goods/goodsList/list',
        })
        break
		}
	}

  render () {
    const { counterStore: { counter } } = this.props.store

    return (
      <PageContainer title='首页' containerClass="HomeIndex">
        <View className='container'>
          <Button onClick={this.increment}>+</Button>
          <Button onClick={this.decrement}>-</Button>
          <Button onClick={this.incrementAsync}>Add Async</Button>
          <Button>{counter}</Button>
          {/* <Canvas canvasId="myChart" style={{width: 375, height: 250}}></Canvas> */}
          <Button className="btn-style" onClick={() => this.jumpToDemo('router')}>
            路由跳转
          </Button>
          <Button className="btn-style" onClick={() => this.jumpToDemo('echarts')}>
            Echarts
          </Button>
          <Button className="btn-style" onClick={() => this.jumpToDemo('goods')}>
            Goods
          </Button>
        </View>
      </PageContainer>
    )
  }
}

export default HomeIndex
