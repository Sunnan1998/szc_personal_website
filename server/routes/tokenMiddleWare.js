const { getErr } = require("./getSendResult");
const jwt = require('./jwt')

const notNeedTokentApi = [
  { method: 'POST', path: '/api/login' },
  { method: 'POST', path: '/api/register' },
  { method: 'GET', path: '/api/captcha' },
]

// 用于解析token
module.exports = (req, res, next) => {

  const apis = notNeedTokentApi.filter(api => {
    return api.method === req.method && api.path === req.path
  })

  // 说明没有需要认证的
  if (apis.length) {
    next()
    return
  }

  const result = jwt.verify(req)
  if (result) {
    req.userId = result.id
    next()
  }
  else {
    handleNoToken(req, res, next)
  }
};

// 处理没有登录的情况
const handleNoToken = (req, res, next) => {
  res.status(200).send(getErr("你还没有登录"));
};
