const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    isMe: true,
    blogList: [
      {
        id: 1,
        title: '一场秋雨一场寒'
      },
      {
        id: 2,
        title: '天冷别忘加衣裳'
      },
      {
        id: 3,
        title: '愿你冬天有衣，夏日有雨'
      }
    ]
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/profile/:userName', async(ctx, next) => {
  const { userName } = ctx.params   // ctx.params 可以获取到路由中所有参数
  ctx.body = {
    title: 'this is profile page',
    userName
  }
})

router.get('/profile/:userName/:pageIndex', async(ctx, next) => {
  const { userName, pageIndex } = ctx.params   // ctx.params 可以获取到路由中所有参数
  ctx.body = {
    title: 'this is loadMore API',
    userName,
    pageIndex
  }
})

module.exports = router
