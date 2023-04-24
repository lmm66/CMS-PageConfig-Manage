import request from '@/utils/request'
// 查询所有页面列表
export function getCmsPageList (data) {
  return request.get('/atlas-cms/getPageList?' + new URLSearchParams(data).toString())
}
// 保存页面配置信息
export function saveCmsPage (data) {
  if (data.id) {
    return request.post('/atlas-cms/updateCmsJson', data)
  } else {
    return request.post('/atlas-cms/addPageJson', data)
  }
}
// 删除配置页面
export function delCmsPageById (pageId) {
  return request.post('/atlas-cms/deletePage', { params: { id: pageId } })
}
// 获取页面详情
export function getCmsPageById (pageId) {
  return request.get('/atlas-cms/getPageJson', {
    params: {
      id: pageId
    }
  })
}
// 更新活动状态
export function updateStatus (data) {
  return request.post('/atlas-cms/updatePageStatus', data)
}
// 删除活动页
export function deletePage (data) {
  return request.post('/atlas-cms/deletePage', data)
}
// 登录
export function login (data) {
  return request.post('/atlas-cms/login', data)
}