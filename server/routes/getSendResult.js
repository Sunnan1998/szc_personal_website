exports.getErr = function (err = 'server error', errorCode = 500) {
  if (err === '你还没有登录') {
    return {
      code: 403,
      msgInfo: err,
      success: false
    }
  }
  return {
    msgInfo: err,
    success: false
  }
}

exports.getResult = function (result) {
  return {
    dataSize: 1,
    data: result,
    msgCode: null,
    msgInfo: null,
    success: true,
  }
}

exports.asyncHandler = function (handler) {
  return async (req, res, next) => {
    try {
      const result = await handler(req, res, next)
      res.send(exports.getResult(result))
    } catch (error) {
      next(error)
    }
  }
}