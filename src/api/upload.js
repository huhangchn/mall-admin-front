import request from '@/utils/request'

export function upload(data) {
  return request({
    url: '/upload/uploadFile',
    method: 'post',
    data: data
  })
}
