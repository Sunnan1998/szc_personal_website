// 一键同步所有模型（在每个模型里面单个去同步也可以）
require("./Admin");
const sequelize = require("./db");
sequelize
  .sync({
    alter: true,
  })
  .then((res) => {
    console.log("所有模型同步完成");
  }).catch(err => {
    console.log(err)
  });
