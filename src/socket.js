const { v4: uuidv4 } = require('uuid')

module.exports = (errHandler, app) => {
  app.register(require('fastify-socket.io'))
  app.ready(err => {
    if (err) {
      return errHandler(err)
    }

    app.io.on('connect', socket => {
      app.log.info(`Socket connected: ${socket.id}`)

      socket.on('disconnect', () => app.log.info(`Socket disconnected: ${socket.id}`))

      socket.on('ping', data => {
        app.log.info(`Received ping with data: ${JSON.stringify(data)} from ${socket.id}`)
        const room = uuidv4()
        socket.join(room)
      })
    })
  })
}