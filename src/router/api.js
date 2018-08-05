// api 路由
const Router = require('koa-router');
const axios = require('axios');
const cheerio = require('cheerio')

//子路由1
let api = new Router()

api.get('/demo', async (ctx)=>{
  ctx.body = {
    code: 0,
    result: 'demo'
  }
})

api.get('/mtl/json',async (ctx)=>{  
  const url = 'https://m.moretickets.com/showapi/pub/site/1001/banner/app?siteCityOID=3101&time=1533441491946&src=m_web'
  try {
    const res = await axios.get(url)
    ctx.body = res.data.result 
  } catch (err) {
    ctx.body = {
      success: false,
      message: err.response.data.message
    }
  }   
})

api.get('/mtl/web',async (ctx)=>{  
  const url = 'https://www.moretickets.com/list/3101-1'
  try {
    const res = await axios.get(url)
    // console.log('res', res.data)
    const result = getShowInfo(res.data)
    ctx.body = {
      web: 'https://www.moretickets.com/list/3101-1',
      result
    }
  } catch (err) {
    ctx.body = {
      success: false,
      message: err.response.data.message
    }
  }   
})

function getShowInfo(htmlStr) {
  const result = []
  const $ = cheerio.load(htmlStr.toString())
  const list = $('.shows-container .show-items')
  // console.log('list', list)
  list.each(function (v) {
    const item = {}
    item.showName = $(this).find('.show-detail .show-name').text()
    item.showTime = $(this).find('.show-time').text()
    item.showAddr = $(this).find('.show-addr').text()
    item.showPrice = $(this).find('.show-price').text().trim().replace('元起', '')
    result.push(item)
  })
  // console.log('result', result)
  return result
}

module.exports = api