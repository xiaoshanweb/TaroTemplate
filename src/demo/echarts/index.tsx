// ChartPage.js
import React from 'react';
import { View, Button, Text, Canvas } from '@tarojs/components'
import PageContainer from '@/components/page_container'
import './index.scss'

import { EChart } from "echarts-taro3-react"
import echarts from "echarts-taro3-react/lib/ec-canvas/echarts";
import "echarts-taro3-react"

class ChartPage extends React.Component {
  componentDidMount() {
    const option = {
      title: {
        text: "某站点用户访问来源",
        subtext: "纯属虚构",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "horizontal",
        bottom: "bottom",
        data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          center: ["50%", "50%"],
          data: [
            { value: 335, name: "直接访问" },
            { value: 310, name: "邮件营销" },
            { value: 234, name: "联盟广告" },
            { value: 135, name: "视频广告" },
            { value: 1548, name: "搜索引擎" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    this.pieChart.refresh(option);
  }

  pieChart: any;
  refPieChart = (node) => (this.pieChart = node);

  render() {
    return (
      <PageContainer title='Echarts' containerClass="EchartsIndex" >
        <View className='pie-chart'>
          <EChart ref={this.refPieChart} canvasId='pie-chart' />
        </View>
      </PageContainer>
    );
  }
}

export default ChartPage;
