/**
 * @description json test
 * @author Jeanne
 */

const server = require('./server')

test('json 接口返回数据格式正确', async() => {
    const res = await server.get('/json')
    // const res = await server.post('/login').send({
    //     userName: 'zhangsan',
    //     password: '123'
    // })
    expect(res.body).toEqual({
        title: 'koa2 json'
    })
    expect(res.body.title).toBe('koa2 json')
})