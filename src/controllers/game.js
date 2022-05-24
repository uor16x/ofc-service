const { StatusCodes } = require('http-status-codes')
const appGetter = require('../app')

module.exports = {
  async createGame(request) {
    const body = request.body
    const app = appGetter()
    return app.db.Game.create({
      ...body,
      creationTime: new Date(),
      status: 'OPEN'
    })
  },

  async getGameById(request, reply) {
    const id = request.params.id
    const app = appGetter()
    const game = await app.db.Game.findById(id)
    if (!game) {
      return reply
        .status(StatusCodes.BAD_REQUEST)
        .send(new Error(`Game with id: ${id} not found`))
    }
    return game
  },

  async updateGameById(request, reply) {
    const id = request.params.id
    const body = request.body
    const app = appGetter()
    const updatedGame =
      await app.db.Game.findByIdAndUpdate(id, body, { new: true }).exec()
    if (!updatedGame) {
      return reply
        .status(StatusCodes.BAD_REQUEST)
        .send(new Error(`Game with id: ${id} not found`))
    }
    return updatedGame
  },

  async deleteGameById(request, reply) {
    const id = request.params.id
    const app = appGetter()
    const deleteResult =
      await app.db.Game.findByIdAndDelete(id).exec()
    if (!deleteResult) {
      return reply
        .status(StatusCodes.BAD_REQUEST)
        .send(new Error(`Game with id: ${id} not found`))
    }
    return `Game ${id} was deleted successfully`
  },
}