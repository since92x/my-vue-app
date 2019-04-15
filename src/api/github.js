import request from '../utils/network/request'
import github from '@/constants/github.config'
import { githubBaseUrl } from './baseUrl.config'

const DEFAULT_PARAMS = {
  client_id: github.CLIENT_ID,
  client_secret: github.CLIENT_SECRET 
}

export const getArticles = (page = 1, per_page = 10) => {
  const params = { creator: github.OWNER, state: 'open', filter: 'created', page, per_page }
  return request({
    url: `${githubBaseUrl}/repos/${github.OWNER}/${github.REPO}/issues`,
    method: 'get',
    params: {
      ...DEFAULT_PARAMS,
      ...params,
    }
  })
}

export const getArticleByNumber = (number) => {
  return request({
    url: `${githubBaseUrl}/repos/${github.OWNER}/${github.REPO}/issues/${number}`,
    method: 'get',
    params: {
      ...DEFAULT_PARAMS,
    }
  })
}

export const getArticleComments = (number, page = 1, per_page = 30) => {
  const params = { page, per_page }
  return request({
    url: `${githubBaseUrl}/repos/${github.OWNER}/${github.REPO}/issues/${number}/comments`,
    method: 'get',
    params: {
      ...DEFAULT_PARAMS,
      ...params
    }
  })
}
