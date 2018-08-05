// api 路由
const Router = require('koa-router');
const axios = require('axios');

//子路由1
let api = new Router()

api.get('/demo', async (ctx)=>{
  ctx.body = {
    code: 0,
    result: 'demo'
  }
})

api.get('/mtl',async (ctx)=>{  
  const url = 'https://m.moretickets.com/showapi/pub/site/1001/banner/app?siteCityOID=3101&time=1533441491946&src=m_web'
  try {
    const res = await axios.get(url)
    ctx.body = res.data.result 
  } catch (err) {
    // console.log(err)
    // console.log(err.response)
    ctx.body = {
      success: false,
      message: err.response.data.message
    }
  }   
})

module.exports = api