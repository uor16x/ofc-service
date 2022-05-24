const { StatusCodes } = require('http-status-codes')
const mongoose = require('mongoose')
const { gameSchema } = require('../schemas/game')

module.exports = {
  async createGame(request) {
    const body = request.body
    const Game = mongoose.model('Game', gameSchema)
    return await Game.create({
      ...body,
      creationTime: new Date(),
      status: 'OPEN'
    })
  },

  async getGameById(request, reply) {
    const id = request.params.id
    const Game = mongoose.model('Game', gameSchema)
    const game = await Game.findById(id)
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
    const Game = mongoose.model('Game', gameSchema)
    const updatedGame =
      await Game.findByIdAndUpdate(id, body, { new: true }).exec()
    if (!updatedGame) {
      return reply
        .status(StatusCodes.BAD_REQUEST)
        .send(new Error(`Game with id: ${id} not found`))
    }
    return updatedGame
  },

  async deleteGameById(request, reply) {
    const id = request.params.id
    const Game = mongoose.model('Game', gameSchema)
    const deleteResult =
      await Game.findByIdAndDelete(id).exec()
    if (!deleteResult) {
      return reply
        .status(StatusCodes.BAD_REQUEST)
        .send(new Error(`Game with id: ${id} not found`))
    }
    return `Game ${id} was deleted successfully`
  },
}