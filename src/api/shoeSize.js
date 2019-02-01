import request from '@/utils/request'

export function fetchShoeSizeOptions() {
  return request({
    url: '/shoeSize',
    method: 'get'
  })
}
