import request from '@/utils/request'

export function orderList(params) {
  return request({
    url: '/admin/order',
    method: 'get',
    params: params
  })
}

export function sendOrder(params) {
  return request({
    url: '/admin/order/sendOrder',
    method: 'get',
    params: params
  })
}


