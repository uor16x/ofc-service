const socketState = require('./sockets-state')

module.exports = async () => {
  const app = require('../app')()

  app.register(require('fastify-socket.io'), {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })

  const state = await socketState()

  const emitGameUpdated = (gameId) => {
    const game = state.getGame(gameId)
    app.io.to(gameId).emit('game-update', game)
  }

  const emitNewGameHosted = (gameId) => {
    const game = state.getGame(gameId)
    app.io.emit('game-hosted', game)
  }

  const emitGameDeleted = (gameId) => {
    app.io.emit('game-deleted', gameId)
  }

  app.sockets = {
    emitGameUpdated,
    emitNewGameHosted,
    emitGameDeleted
  }

  app.ready(async err => {
    if (err) {
      return app.fatalErr(err)
    }

    app.io.on('connect', socket => {
      app.log.info(`Socket connected: ${socket.id}`)

      socket.on('disconnect', () => app.log.info(`Socket disconnected: ${socket.id}`))

      socket.on('joinGame', async joinData => {
        app.log.info(`Received joinGame: ${JSON.stringify(joinData, null, 2)}`)
        await state.joinPlayer(joinData.gameId, joinData.playerName)
        socket.join(joinData.gameId)
        emitGameUpdated(joinData.gameId)
      })

      socket.on('updateHand', async updateHandData => {
        app.log.info(`Received updateHand: ${JSON.stringify(updateHandData, null, 2)}`)
        state.updateHand(updateHandData)
        emitGameUpdated(updateHandData.gameId)
      })

      socket.on('updateGame', async updateGameData => {
        app.log.info(`Received updateGame: ${JSON.stringify(updateGameData, null, 2)}`)
        const game = state.updateGame(updateGameData.game)
        emitGameUpdated(game._id)
      })

      socket.on('calc', async calcHandData => {
        app.log.info(`Received calc for game: ${calcHandData.gameId}`)
        await state.calcGame(calcHandData.gameId)
        emitGameUpdated(calcHandData.gameId)
      })

      socket.on('next', async nextHandData => {
        app.log.info(`Received next for game: ${nextHandData.gameId}`)
        await state.nextGame(nextHandData.gameId)
        emitGameUpdated(nextHandData.gameId)
      })

      // for debugging
      socket.on('showCurrentState', () => {
        socket.emit('socketState', state)
      })
    })
  })

}