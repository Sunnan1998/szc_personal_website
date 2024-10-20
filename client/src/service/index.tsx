import { postRequest, getRequest } from '@/utils/request'

const USER = {
  login: (params: { loginId: string, loginPwd: string }) => postRequest('/api/login', params),
  register: (params: { loginId: string, loginPwd: string }) => postRequest('/api/register', params),
  getUserInfo: () => getRequest('/api/userInfo', {}),
  getCaptcha: () => getRequest('/api/captcha', {})
}

export default {
  USER,
}