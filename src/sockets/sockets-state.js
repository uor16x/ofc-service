const appGetter = require('../app')
const calculate = require('./../services/calc')

let state

class SocketsState {
  // object which holds all active (OPEN) games by id keys:
  // games.62928e61f14df6487e85bbfa = {
  //   ...
  // }
  games = {}

  // getting all active ('OPEN') games from db and storing them in state in memory
  async init() {
    const app = appGetter()
    const allGames = await app.db.Game.find({ status: 'OPEN' }).lean()
    allGames.forEach(game => (this.games[game._id] = game))
  }

  async joinPlayer(gameId, playerName) {
    const game = this.getGame(gameId)
    // player already in the game
    if (game.players && game.players.find(player => player.name === playerName)) {
      return
    }
    // game is full
    if (game.players && game.players.length === 3) {
      //TODO send game full error message
    }
    // add player to the game
    const emptyHand = this.#getEmptyHandPlayer(playerName)
    game.players.push(emptyHand)
    game.stats.push({
      player: playerName,
      stat: 0
    })
    await this.updateGameInDb(game)
  }

  getGame(gameId) {
    return this.games[gameId]
  }

  addGame(newGame) {
    this.games[newGame._id] = newGame
    const app = appGetter()
    app.sockets.emitNewGameHosted(newGame._id)
  }

  removeGame(gameId) {
    delete this.games[gameId]
    const app = appGetter()
    app.sockets.emitGameDeleted(gameId)
  }

  updateHand(updateHandData) {
    const { gameId, playerName, hand } = updateHandData
    const game = this.games[gameId]
    const player = game.players.find(player => player.name === playerName)
    player.hand = hand
  }

  async calcGame(gameId) {
    const app = appGetter()
    const game = this.getGame(gameId)
    if (!game) {
      //TODO throw custom socket error
    }
    try {
      const calcBody = game.players.map((player) => {
        const playerCalcBody = {
          username: player.name,
          withFantasy: false,
          cards: [].concat(
            player.hand.top.cards,
            player.hand.middle.cards,
            player.hand.bottom.cards
          ),
        }
        if (playerCalcBody.cards.includes('')) {
          playerCalcBody.cards = []
        }
        return playerCalcBody
      })
      const calcResults = await calculate(calcBody)
      this.#setCalcResults(calcResults, game)
    } catch (e) {
      app.log.error(e)
      //TODO throw custom socket error
    }
  }

  async nextGame(gameId) {
    const app = appGetter()
    const game = this.getGame(gameId)
    if (!game) {
      //TODO throw custom socket error
    }
    try {
      game.players.forEach(player => {
        const gamePlayerStats = game.stats.find(stat => stat.player === player.name)
        if (!gamePlayerStats) {
          throw Error(`Game stat not found for player: ${player.name}`)
        }
        const playerHandTotal = 
          player.hand.top.stats.total + 
          player.hand.middle.stats.total + 
          player.hand.bottom.stats.total +
          player.hand.extraLineBonuses
        gamePlayerStats.stat += playerHandTotal
        player.hand = {
          isDone: false,
          isScoop: false,
          nextIsFantasy: false,
          extraLineBonuses: 0,
          ...this.#getEmptyHand()
        }
      })
      await this.updateGameInDb(game)
    } catch (e) {
      app.log.error(e)
      //TODO throw custom socket error
    }
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
        extraLineBonuses: 0,
        ...this.#getEmptyHand()
      }
    }
  }

  async updateGameInDb(game) {
    const app = appGetter()
    try {
      await app.db.Game.findByIdAndUpdate(game._id,{ ...game })
    } catch (e) {
      app.log.error(e)
      //TODO send custom error message
    }
  }

  #setCalcResults(calcResults, game) {
    game.players.forEach(player => {
      const playerCalcRes = calcResults.find(
        (result) => result.player.username === player.name
      )
      if (!playerCalcRes) {
        throw Error(`No calculation result found for player: ${player.name}`)
      }
      const setLineStats = (line) => {
        if (!playerCalcRes.player.scoop) {
          player.hand[line].combination = playerCalcRes[line].combination.name
        } else {
          player.hand.isScoop = true
        }
        player.hand[line].stats = {
          bonus: playerCalcRes[line].totalCombination,
          line: playerCalcRes[line].totalBonus,
          total: playerCalcRes[line].totalCombination + playerCalcRes[line].totalBonus
        }
      }
      setLineStats('top')
      setLineStats('middle')
      setLineStats('bottom')

      // super kostyl for extra line bonuses calc
      player.hand.extraLineBonuses = 0
      if (Math.abs(playerCalcRes.totalDetailed[1][0][2]) === 6) {
        player.hand.extraLineBonuses += playerCalcRes.totalDetailed[1][0][2] / 2
      }
      if (Math.abs(playerCalcRes.totalDetailed[1][1][2]) === 6) {
        player.hand.extraLineBonuses += playerCalcRes.totalDetailed[1][1][2] / 2
      }
    })
  }
}

module.exports = async () => {
  if (!state) {
    state = new SocketsState()
    await state.init()
  }
  return state
}