const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaJson = require('koa-json')
const koaBodyParser = require('koa-bodyparser')
const debug = require('debug')('rank::server')
const apiRoute = require('./routes/api')
const socketio = require('./socket')
const { PORT } = require('../config')

const app = new Koa()
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    debug('error', error)
    ctx.status = error.statusCode || error.status || 500
  }
})
app.use(koaBodyParser())
app.use(koaJson())

const router = new KoaRouter()
router.use('/api', apiRoute.routes(), apiRoute.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())

function start() {
  const server = app.listen(PORT, '0.0.0.0')
  socketio.attach(server, {
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  })
  server.on('listening', function() {
    debug('server start on port:', PORT)
  })
}

module.exports = start
