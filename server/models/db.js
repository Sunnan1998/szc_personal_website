const { Sequelize } = require("sequelize"); // 它内部是使用了一个连接池，它会自动帮我们管理连接

// const sequelize = new Sequelize('sqlite::memory:') // 这个实例里面就包含了一个连接池，有了它 数据库的各种操作我们都可以用了

// ORM实例 数据库密码 Sunnan1998
const sequelize = new Sequelize("myschooldb", "root", "Sunnan1998", {
  host: "localhost",
  dialect:
    "mysql" /* 数据库类型 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  logging: null, // 不再记录日志
});

module.exports = sequelize;
