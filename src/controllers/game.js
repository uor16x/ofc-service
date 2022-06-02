const { StatusCodes } = require('http-status-codes')
const appGetter = require('../app')
const errHandler = require('../helpers/err')
const socketState = require('../sockets/sockets-state')

module.exports = {
  async createGame(request, reply) {
    const body = request.body
    const app = appGetter()
    try {
      const newGame = await app.db.Game.create({
        ...body,
        players: [],
        creationTime: new Date(),
        status: 'OPEN'
      })
      const state = await socketState()
      state.addGame(newGame.toObject())
      return newGame
    } catch (err) {
      errHandler(
        reply,
        err,
        StatusCodes.INTERNAL_SERVER_ERROR,
        `Failed to create game: ${err.message}`
      )
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
    } catch (err) {
      errHandler(
        reply,
        err,
        StatusCodes.INTERNAL_SERVER_ERROR,
        `Failed to fetch game by id ${id}: ${err.message}`
      )
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
    } catch (err) {
      errHandler(
        reply,
        err,
        StatusCodes.INTERNAL_SERVER_ERROR,
        `Failed to update game by id ${id}: ${err.message}`
      )
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
      const state = await socketState()
      state.removeGame(id)
      return {
        result: `Game ${id} was deleted successfully`
      }
    } catch (err) {
      errHandler(
        reply,
        err,
        StatusCodes.INTERNAL_SERVER_ERROR,
        `Failed to delete game by id ${id}: ${err.message}`
      )
    }
  },

  async getAllGames(request, reply) {
    const app = appGetter()
    try {
      return await app.db.Game.find().sort({ creationTime: -1 })
    } catch (err) {
      errHandler(
        reply,
        err,
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to fetch all games'
      )
    }
  },
}
