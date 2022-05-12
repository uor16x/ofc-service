require('dotenv').config()
const route = require('./src/route')
const socket = require('./src/socket')

process
  .on('unhandledRejection', processErr)
  .on('uncaughtException', processErr)

const app = require('fastify')({ 
  logger: {
    prettyPrint: {
      translateTime: 'SYS:dd.mm HH:MM:ss',
      ignore: 'pid,hostname'
    }
  } 
})
route(app)
socket(processErr, app)

start()

function processErr(err) {
  app.log.error(err)
  process.exit(1)
}

async function start() {
  try {
    await app.listen(process.env.PORT)
  } catch (err) {
    processErr(err)
  }
}