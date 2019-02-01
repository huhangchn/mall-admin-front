import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/admin/goods/list',
    method: 'get',
    params: query
  })
}

export function addOrUpdateGoods(data, params) {
  return request({
    url: '/admin/goods/addOrUpdateGoods',
    method: 'post',
    params: params,
    data: data
  })
}
export function fetchGoodsInfo(goodsId) {
  return request({
    url: '/admin/goods/goodsInfo/'+goodsId,
    method: 'get',
  })
}
export function changeGoodsSaleStatus(params) {
  return request({
    url: '/admin/goods/changeGoodsSaleStatus/',
    method: 'put',
    params: params
  })
}
