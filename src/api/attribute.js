import request from '@/utils/request'

export function fetchBasicAttrOptions() {
  return request({
    url: '/attribute/basicOptions',
    method: 'get',
  })
}
