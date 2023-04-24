const decorateOrigin = process.env.NODE_ENV === 'production' ? window.location.origin : 'http://127.0.0.1:3010'
const baseURL = process.env.NODE_ENV === 'production' ? window.location.origin : '/api' // 接口地址

module.exports = {
  baseURL,
  jvBaseUrl: baseURL + (process.env.NODE_ENV === 'production' ? '/api' : ''),
  decorateOrigin, // 搭建模块跨源通信 - H5页面可获取到数据的 origin
  decorateViewSrc: decorateOrigin + '/crs/#/page', // 搭建预览页面地址
  previewSrc: decorateOrigin + '/crs/#/pagePreiview', // H5预览页面地址
  nodeUrl: 'http://127.0.0.1:3300/atlas-cms'
}
