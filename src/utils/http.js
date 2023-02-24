import axios from 'axios'
import { message } from 'antd'
import { history, getToken, removeToken } from './index'
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})


http.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

http.interceptors.response.use(res => {
  return res
}, error => {
  const { data } = error.response
  if (error.response.status === 401) {
    removeToken()
    message.error(data.message)
    history.push('/login')
  }
  return Promise.reject(error)
})

export default http