require('dotenv').config()
const route = require('./src/route')

process
  .on('unhandledRejection', processErr)
  .on('uncaughtException', processErr)

const fastify = require('fastify')({ logger: true })
route(fastify)

start()

function processErr(err) {
  fastify.log.error(err)
  process.exit(1)
}

async function start() {
  try {
    await fastify.listen(process.env.PORT)
  } catch (err) {
    processErr(err)
  }
}