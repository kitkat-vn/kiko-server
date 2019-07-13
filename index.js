const msgProducer = require('./msg/producer')
const server = require('./server')

async function start() {
  await msgProducer.waitReady()
  server()
}

start()
