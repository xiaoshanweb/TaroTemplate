const path = require('path')

const config = {
  projectName: 'TaroTemplate',
  date: '2024-6-26',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  compiler: 'webpack5',
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  // 解析alias路径
	alias: {
		'@': path.resolve(__dirname, '..', 'src/shared'),
	},
  mini: {
    webpackChain (chain, webpack) {
      chain.plugin('analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, []),
        //修改默认打包产物不能超过 244kb
        chain.merge({
          performance: {
            //入口大小限制
            maxEntrypointSize: 980000,
            //生成文件大小限制
            maxAssetSize: 980000
          }
        })

    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {
        }
      },
      "postcss-px-scale": {
        enable: true,
        config: {
          scale: 0.5,
          units: 'rpx',
          includes:['taro-ui']
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    /**
     * 配置MiniApp的Webpack构建过程中的优化选项。
     * 通过修改Webpack配置的chain，来定制优化splitChunks的配置，以实现按需加载echarts模块。
     * @param {Object} chain Webpack配置的chain对象，用于链式操作Webpack配置。
     */
    // webpackChain(chain) {
    //   // 合并优化配置，针对splitChunks进行定制
    //   chain.merge({
    //     optimization: {
    //       splitChunks: {
    //         cacheGroups: {
    //           // 定义一个名为echartChunkName的缓存组，用于提取和分离echarts模块
    //           [echartChunkName]: {
    //             name: echartChunkName,// 将分离出的chunk命名为echartChunkName
    //             priority: 50,// 设置较高的优先级，确保这个缓存组优先处理
    //             test(module) {// 定义匹配条件，只处理符合正则表达式的模块
    //               // 使用正则表达式匹配模块资源路径，确保只处理特定的echarts模块
    //               return /subpackages[\\/]homeworkPage[\\/]studyData[\\/]ChartLine[\\/]ec-canvas[\\/]echarts.js/.test(module.resource);
    //             },
    //           },
    //         },
    //       },
    //     },
    //   });
    // },
    /**
   * 在指定的页面中添加对echarts chunk的引用。
   * 这使得只有在访问特定页面时，才会加载echarts模块，实现按需加载。
   * @param {Object} pages 一个映射表，用于配置页面和其所依赖的chunks。
   * @param {Array} pagesNames 需要添加echarts chunk的页面名称列表。
   */
    // addChunkPages(pages, pagesNames) {
    //   // 为指定的页面添加echarts chunk引用
    //   pages.set("pages/index/index",
    //      // 为ec-canvas页面也添加echarts chunk引用，确保在使用canvas渲染时也能按需加载echarts
    //   [echartChunkName]); pages.set("pages/index/index", [echartChunkName]);
    // }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['taro-ui'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      },
      "postcss-px-scale": {
        enable: true,
        config: {
          scale: 0.25,
          units: 'rem',
          includes:['taro-ui']
        }
      },
    },
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
