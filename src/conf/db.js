/*
* @description 存储配置
* @author Jeanne
*/
const { isProd } = require('../utils/env')

let REDIS_CONF = {
  host: '127.0.0.1',
  port: 6379
}

let MYSQL_CONF = {
  host: 'localhost',
  port: 3306,    // 默认端口 3306
  user: 'root',
  password: 'zj829029',
  database: 'koa2_weibo_db'
}

if (isProd) {
  REDIS_CONF = {
    // 线上的 redis 配置
    port: 6379,
    host: '127.0.0.1'
  }
  MYSQL_CONF = {
    // 线上的 mysql 配置
    host: 'localhost',
    port: 3306,    // 默认端口 3306
    user: 'root',
    password: 'zj829029',
    database: 'koa2_weibo_db'
  }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}