// koa 搭建简单的服务

const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

// 子路由
const api = require('./router/api');
const main = require('./router/main');

//父级路由
router.use('/', main.routes(), main.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());


app.use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('app listen on 3000')
});