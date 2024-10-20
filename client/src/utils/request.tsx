import { history } from 'umi';
import { message } from 'antd'
import { extend, RequestOptionsInit } from 'umi-request';

const GLOBAL_MSG = '系统异常，请重试';

// 用于 http api 请求的场景
export const requestWithCookie = extend({
  // prefix: '/api',         // 假如需要统一加前缀的参加
  credentials: 'include' // 默认请求是否带上cookie
});

export const runApi = async <ApiParams extends object | URLSearchParams | undefined>(
  api: string,
  params?: ApiParams,
  method = 'get',
  optionsConfig?: Record<string, any>,
) => {
  const options: Partial<RequestOptionsInit> = { method, ...(optionsConfig || {}) };
  if (method.toUpperCase() === 'GET') {
    options.params = params;
  }
  if (method.toUpperCase() === 'POST') {
    options.data = params;
  }
  return requestWithCookie(api, options).then((result: any) => {
    if (!result) return
    const { success, data, msgInfo: errorMessage, msgCode, code } = result;
    // 获取验证码图片
    if (api.includes('captcha')) {
      return result
    }
    // 验证码有问题
    if (msgCode === 1) {
      message.error(errorMessage || GLOBAL_MSG, 3);
      return result
    }
    if (!success) {
      if (code === 403) {
        history.push(`/login`)
        return
      }
      message.destroy()
      message.error(errorMessage || GLOBAL_MSG, 3);
    } else {
      return data;
    }
  });
};


/**
 *  post 请求
 * @url 请求地址
 * @param 参数
 */
 export const postRequest = (url: string, params: object, optionsConfig?: Record<string, any>) => runApi(url, params, 'post', optionsConfig);

 /**
  * get 请求
  * @url 请求地址
  * @param 参数
  */
 export const getRequest = (url: string, params: object, optionsConfig?: Record<string, any>) => runApi(url, params, 'get', optionsConfig);
