const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const Admin = sequelize.define(
  "Admin",
  {
    loginId: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    loginPwd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    paranoid: true,
  }
);

module.exports = Admin;
