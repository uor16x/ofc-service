require('dotenv').config()
const route = require('./src/route')
const socket = require('./src/socket')
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
    socket()
    await app.listen(process.env.PORT)
  } catch (err) {
    app.fatalErr(err)
  }
}