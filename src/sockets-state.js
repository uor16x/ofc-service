const appGetter = require('./app')

class SocketsState {
  // object which holds all active (OPEN) games by id keys:
  // games.62928e61f14df6487e85bbfa = {
  //   ...
  // }
  games = {}

  // getting all active ('OPEN') games from db and storing them in state in memory
  async init() {
    const app = appGetter()
    const allGames = await app.db.Game.find({ status: 'OPEN' })
    allGames.forEach(game => (this.games[game._id] = game))
    console.log(this.games)
  }

  async addGame(gameId) {
    const app = appGetter()
    const newGame = await app.db.Game.findById(gameId)
    if (!newGame) {
      //TODO send custom error message
    }
    this.games[gameId] = newGame
    return newGame
  }

  async joinPlayer(gameId, playerName) {
    const game = await this.getGame(gameId)

    // player already in the game
    if (game.players && game.players.find(player => player.name === playerName)) {
      return
    }

    // game is full
    if (game.players && game.players.length === 3) {
      //TODO send game full error message
    }

    // add player to the game
    game.players.push(this.#getEmptyHandPlayer(playerName))
    game.stats.push({
      player: playerName,
      stat: 0
    })
    await this.#updateGameInDb(game)
  }

  async getGame(gameId) {
    return this.games[gameId] || await this.addGame(gameId)
  }

  updateHand(updateHandData) {
    const { gameId, playerName, hand } = updateHandData
    const game = this.games[gameId]
    const player = game.players.find(player => player.name === playerName)
    player.hand = hand
  }

  #getEmptyHand() {
    return {
      top: {
        combination: null,
        cards: ['', '', ''],
        stats: {
          bonus: 0,
          line: 0,
          total: 0
        }
      },
      middle: {
        combination: null,
        cards: ['', '', '', '', ''],
        stats: {
          bonus: 0,
          line: 0,
          total: 0
        }
      },
      bottom: {
        combination: null,
        cards: ['', '', '', '', ''],
        stats: {
          bonus: 0,
          line: 0,
          total: 0
        }
      }
    }
  }

  #getEmptyHandPlayer(playerName) {
    return {
      name: playerName,
      hand: {
        isDone: false,
        isScoop: false,
        nextIsFantasy: false,
        ...this.#getEmptyHand()
      }
    }
  }

  async #updateGameInDb(game) {
    const app = appGetter()
    try {
      await app.db.Game.findByIdAndUpdate(game._id,{ ...game })
    } catch (e) {
      app.log.error(e)
      //TODO send custom error message
    }
  }
}

module.exports = async () => {
  const state = new SocketsState()
  await state.init()
  return state
}