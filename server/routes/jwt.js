const jwt = require("jsonwebtoken");
const cookieKey = "token";
const secret = "sunnan";
// 颁发jwt
exports.publish = function (res, maxAge = 3600 * 24, info = {}) {
  const token = jwt.sign(
    {
      ...info,
    },
    secret,
    {
      expiresIn: maxAge,
    }
  );
  // 针对浏览器传输设置cookie
  res.cookie(cookieKey, token, {
    maxAge,
    path: "/",
  });
  // 添加其他传输
  res.header("authorization", token);
};

exports.verify = function (res) {
  // 第一步获取token
  let token;
  token = res.cookies[cookieKey]; // 尝试从cookie中获取
  if (!token) {
    // 如果cookie中没有，尝试从header中获取
    token = res.headers.authorization;
    if (!token) {
      // 没有token
      return null;
    }
    // authorization: bearer token
    token = token.split(' ')
    token = token[1] || token[0]
  }

  // 第二步验证token
  try {
    const result = jwt.verify(token, secret)
    return result
  } catch (error) {
    // 验证失败
    return null
  }
};
