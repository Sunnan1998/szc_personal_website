const express = require("express");
const adminServer = require("../../services/adminServices");
const { asyncHandler, getErr, getResult } = require('../getSendResult');
const router = express.Router();
const jwt = require('../jwt')
const md5 = require('md5')

router.post(
  "/",
  asyncHandler(async (req, res) => {

    const hasExist = await adminServer.getAdminByLoginId({ loginId: req.body.loginId })
    if (!hasExist) {
      res.status(200).send(getErr("请先去注册哦"))
    }

    // 校验验证码
    // const reqCaptcha = req.body.captcha ? req.body.captcha.toLowerCase() : ""; //用户传递的验证码
    // if (reqCaptcha !== req.session.captcha) {
    //   console.log(req.session, 'req.sessionreq.sessionreq.session');
    //   req.session.captcha = "";
    //   //验证码有问题
    //   res.send({
    //     code: 200,
    //     msgInfo: "验证码错误，请重试",
    //     success: false
    //   });
    // }
    // req.session.captcha = "";
    const { loginId, loginPwd } = hasExist
    if (loginId === req.body.loginId && loginPwd === md5(req.body.loginPwd)) {
      jwt.publish(res, undefined, { loginId: hasExist.loginId })
      return hasExist;
    }
    res.status(200).send(getErr("密码错误，请重试"))
  })
);

module.exports = router;
