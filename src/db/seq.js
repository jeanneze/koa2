/**
 * @description sequelize 实例
 * @author Jeanne
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF

const conf = {
  host,
  dialect: 'mysql'
}

// const conf = {
//     host: 'localhost',
//     dialect: 'mysql'
// }

if (isTest) {
  conf.logging = () => {}
}

// 线上环境，才使用链接池
if (isProd) {
  conf.pool = {
    max: 5,  // 连接池中最大的链接数量
    min: 0,  // 最小
    idle: 10000  // 如果一个连接池 10s 之内没有被使用，则释放
  }
}

const seq = new Sequelize(database, user, password, conf)
// const seq = new Sequelize('koa2_weibo_db', 'root','zj829029', conf)

// 测试连接
// seq.authenticate().then(() => {
//     console.log('ok')
// }).catch(() => {
//     console.log('err')
// })

module.exports = seq