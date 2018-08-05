// api 路由
const Router = require('koa-router');

//子路由1
let api = new Router()

api.get('/demo', async(ctx)=>{
  ctx.body = {
    code: 0,
    result: 'demo'
  }
})

api.get('/todo',async(ctx)=>{
  ctx.body = "api/todo";
})

module.exports = api