const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
// const jwtKoa = require('koa-jwt')

const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('./utils/env')

// 路由
const index = require('./routes/index')
const users = require('./routes/users')
const userViewRouter = require('./routes/view/user')
const errorViewRouter = require('./routes/view/error')

// error handler   在页面显示错误信息
let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}

onerror(app, onerrorConf)

// app.use(jwtKoa({
//   secret: SECRET
// }).unless({
//   path: [/^\/users\/login/]   // 自定义哪些目录忽略 jwt 验证
// }))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置
app.keys = ['UIsdf_7878#$']
app.use(session({
  key: 'weibo.sid',   // cookie name 默认是'koa.sid'
  prefix: 'weibo:sess:',  // redis key 的前缀，默认是 'koa:sess:',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000  // ms
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())  // 404 路由注册到最后

// error-handling  程序onerror时，在控制台打印的错误日志
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
