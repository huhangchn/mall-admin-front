import request from '@/utils/request'

export function fetchBrand() {
  return request({
    url: '/brand',
    method: 'get'
  })
}
