const express = require("express");
const adminServer = require("../../services/adminServices");
const { asyncHandler, getErr } = require('../getSendResult');
const router = express.Router();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const hasExist = await adminServer.getAdminByLoginId({loginId: req.body.loginId })
    if (hasExist) {
      res.status(200).send(getErr("该名字已被注册，请更换"))
    }
    const result = await adminServer.addAdmin({
      loginId: req.body.loginId,
      loginPwd: req.body.loginPwd,
    });
    return result;
  })
);

module.exports = router;
