// main 路由
const Router = require('koa-router');

//子路由1
let api = new Router()

api.get('/', async(ctx)=>{
  ctx.body = {
    code: 0,
    result: 'koa hello'
  }
})

module.exports = api