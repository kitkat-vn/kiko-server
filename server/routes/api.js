const KoaRouter = require('koa-router')
const debug = require('debug')('kiko::server:api')
const redis = require('../../store/redis')
const router = new KoaRouter()

router.post('/', async ctx => {
  const { stream, user, score } = ctx.request.body
  debug('post', stream, user, score)
  ctx.body = { status: true }
})

router.get('/:stream', async ctx => {
  const stream = ctx.params.stream
  const { start = 0, stop = -1 } = ctx.query
  const data = await redis.zrevrangeScoreAsync(stream, start, stop)
  ctx.body = { status: true, data }
})

module.exports = router
