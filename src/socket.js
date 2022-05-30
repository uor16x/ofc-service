const socketState = require('./sockets-state')

module.exports = () => {
  const app = require('./app')()

  app.register(require('fastify-socket.io'), {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })
  app.ready(async err => {
    if (err) {
      return app.fatalErr(err)
    }

    const state = await socketState()

    app.io.on('connect', socket => {
      app.log.info(`Socket connected: ${socket.id}`)

      const emitUpdatedGame = async (gameId) => {
        const game = await state.getGame(gameId)
        app.io.to(gameId).emit('game-update', game)
      }

      socket.on('disconnect', () => app.log.info(`Socket disconnected: ${socket.id}`))

      socket.on('joinGame', async joinData => {
        app.log.info(`Received joinGame: ${JSON.stringify(joinData, null, 2)}`)
        await state.joinPlayer(joinData.gameId, joinData.playerName)
        socket.join(joinData.gameId)
        emitUpdatedGame(joinData.gameId)
      })

      socket.on('updateHand', async updateHandData => {
        app.log.info(`Received updateHand: ${JSON.stringify(updateHandData, null, 2)}`)
        state.updateHand(updateHandData)
        emitUpdatedGame(updateHandData.gameId)
      })

      // for debugging
      socket.on('showCurrentState', () => {
        socket.emit('socketState', state)
      })
    })
  })
}