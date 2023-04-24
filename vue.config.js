// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave: false
// })

/**
 * 
 * 当前Vue项目的配置
 * 在里面对Webpack打包以及本地服务进行一些相关配置
 *  
 * */
const path = require('path');
module.exports = {
  // transpileDependencies: true,
  // 关闭语法检查
  lintOnSave: false,
  // 当前项目启动的路径
  publicPath: '/cms-manage/',
  // 当前项目打包的文件名
  outputDir: 'dist',
  // 本地服务的相关配置
  devServer: {
    host: '127.0.0.1',    // ip地址
    port: 3011,   // 端口
    open: true,   // 项目启动时默认打开浏览器
    openPage: 'cms-manage/',
    proxy: {    // 代理后端服务的地址
      '/api/atlas-cms': {
        target: 'http://127.0.0.1:3300',
        pathRewrite: {
          '^/api/atlas-cms': '/atlas-cms'
        }
      }
    }
  },
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => {
      addStyleResource(config.module.rule('less').oneOf(type));
    })
    // 设置src别名
    config.resolve.alias.set('@', path.resolve(__dirname, './src'));
  },
}
// 将mixin.less中的变量全局注入
function addStyleResource (rule) {
  rule.use('style-resource').loader('style-resources-loader').options({
    patterns: [path.resolve(__dirname, './src/styles/mixin.less')]
  })
}


