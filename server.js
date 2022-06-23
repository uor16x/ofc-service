require('dotenv').config()
const route = require('./src/route')
const socket = require('./src/sockets/socket')
const db = require('./src/db')

const app = require('./src/app')()

process
  .on('unhandledRejection', app.fatalErr)
  .on('uncaughtException', app.fatalErr)

route()
start()

async function start() {
  try {
    await db()
    await socket()
    app.config = require('./src/config.json')
    await app.listen(process.env.PORT, '0.0.0.0')
  } catch (err) {
    app.fatalErr(err)
  }
}