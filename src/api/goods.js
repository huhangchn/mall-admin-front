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

export function fetchbrandList(query) {
  return request({
    url: '/brand/listPage',
    method: 'get',
    params: query
  })
}

export function addBrand(data) {
  return request({
    url: '/brand',
    method: 'post',
    data: data
  })
}
export function deleteBrand(brandId) {
  return request({
    url: '/brand/' + brandId,
    method: 'delete'
  })
}
export function editBrand(data) {
  return request({
    url: '/brand/',
    method: 'put',
    data: data
  })
}

export function fetchCategoryList(query) {
  return request({
    url: '/category/listPage',
    method: 'get',
    params: query
  })
}

export function addCategory(data) {
  return request({
    url: '/category',
    method: 'post',
    data: data
  })
}
export function deleteCategory(id) {
  return request({
    url: '/category/' + id,
    method: 'delete'
  })
}
export function editCategory(data) {
  return request({
    url: '/category/',
    method: 'put',
    data: data
  })
}

export function fetchOrderList(query) {
  return request({
    url: '/order/listPage',
    method: 'get',
    params: query
  })
}
