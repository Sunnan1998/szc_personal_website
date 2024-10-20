const express = require("express");
const adminServer = require("../../services/adminServices");
const { asyncHandler } = require('../getSendResult');
const router = express.Router();
const jwt = require('../jwt')

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const result = jwt.verify(req)
    const { loginId } = result
    const hasExist = await adminServer.getAdminByLoginId({ loginId })
    return hasExist;
  })
);

module.exports = router;
