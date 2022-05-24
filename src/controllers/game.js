const { StatusCodes } = require('http-status-codes')
const appGetter = require('../app')

module.exports = {
  async createGame(request, reply) {
    const body = request.body
    const app = appGetter()
    try {
      return app.db.Game.create({
        ...body,
        creationTime: new Date(),
        status: 'OPEN'
      })
    } catch (e) {
      return reply
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(new Error('Failed to create game'))
    }
  },

  async getGameById(request, reply) {
    const id = request.params.id
    const app = appGetter()
    try {
      const game = await app.db.Game.findById(id)
      if (!game) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send(new Error(`Game with id: ${id} not found`))
      }
      return game
    } catch (e) {
      return reply
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(new Error(`Failed to fetch game by id ${id}`))
    }
  },

  async updateGameById(request, reply) {
    const id = request.params.id
    const body = request.body
    const app = appGetter()
    try {
      const updatedGame =
        await app.db.Game.findByIdAndUpdate(id, body, { new: true }).exec()
      if (!updatedGame) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send(new Error(`Game with id: ${id} not found`))
      }
      return updatedGame
    } catch (e) {
      return reply
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(new Error(`Failed to update game by id ${id}`))
    }

  },

  async deleteGameById(request, reply) {
    const id = request.params.id
    const app = appGetter()
    try {
      const deleteResult =
        await app.db.Game.findByIdAndDelete(id).exec()
      if (!deleteResult) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send(new Error(`Game with id: ${id} not found`))
      }
      return `Game ${id} was deleted successfully`
    } catch (e) {
      return reply
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(new Error(`Failed to delete game by id ${id}`))
    }
  },
}