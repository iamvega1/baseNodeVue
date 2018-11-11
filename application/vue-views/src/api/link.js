import request from '@/utils/request'

export function getAll(params) {
    return request({
      url: '/link/all',
      method: 'get',
      params
    })
}

export function getLink(params) {
  return request({
    url: '/link',
    method: 'get',
    params
  })
}

export function fetchArticle() {
  return request({
    url: '/article/detail',
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
