
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express();

const staticPath = path.resolve(__dirname, "../../dist/public");

console.log(staticPath, 'staticPathstaticPathstaticPath');

app.use(
  express.static(staticPath, {
    setHeaders(res, path) {
      if (!path.endsWith(".html")) {
        res.header("Cache-Control", `max-age=${3600 * 24}`);
      }
    },
  })
);
// 使用session中间间 存验证码
app.use(require('express-session')({
  secret: 'sunnan'
}))
app.use(cookieParser())
app.use(require('./tokenMiddleWare'))
app.use(express.urlencoded({
  extended: true, // 使用新的库qs来解析body消息体 // 消息体类型 app/x-www-form-urlencoded
}))
app.use(express.json()) // 消息体类型 app/json
// 生成验证码
app.use(require('./captchaMiddleWare'))
// 登录
app.use('/api/login', require('./api/login'))
// 注册
app.use('/api/register', require('./api/register'))
// 获取用户信息
app.use('/api/userInfo', require('./api/getUserInfo'))
// 处理错误的中间件
app.use(require('./errorMiddleWare'))

const port = 9527;
app.listen(port, () => {
  console.log("server listening on " + port);
});
