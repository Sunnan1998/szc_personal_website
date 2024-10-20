// 处理错误信息的中间件 - 这个处理错误信息的中间件必须写四个参数
const sendMsg = require('./getSendResult')
const multer = require('multer')

module.exports = (err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send(sendMsg.getErr(err.message))
      return
    }
    const errorObj = err instanceof Error ? err.message : err
    // 如果有错误
    res.status(500).send(sendMsg.getErr(errorObj))
  } else {
    next()
  }
}