const tabbarConfig = require('./tabbar.config')

export default defineAppConfig({
  subpackages: [
		{
			root: 'default',
			pages: ['404'],
		},
		{
			root: 'demo',
			pages: ['router/router', 'router/routerTarget', 'form/form','echarts/index'],
    },
    {
      root: 'project',
      pages:['task/task','ongoing/ongoing']
    },
    {
      root: 'goods',
      pages:['goodsList/list','goodsDetail/detail']
    }
  ],
  pages: [
    'pages/index/index',
    'pages/user/index',
    'pages/warning/index',
    'pages/map/index'
  ],
  window: {
    navigationStyle: 'custom',
  },
  tabBar: tabbarConfig,
  // 页面切换动画
  animation: {
    duration: 196, // 动画切换时间，单位毫秒
    delay: 50, // 切换延迟时间，单位毫秒
  },
  requiredBackgroundModes: ["audio", "location"],
  requiredPrivateInfos: ["getLocation","chooseLocation"],
  permission: {
    "scope.userLocation": {
      "desc": "你的位置信息将用于小程序位置接口的效果展示"
    }
  },
  lazyCodeLoading:'requiredComponents'
})
