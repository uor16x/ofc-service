const { auth } = require('../middlewares')
const { StatusCodes } = require('http-status-codes')
const idValidator = require('../helpers/id-validator')
const {
  createGame,
  getGameById,
  updateGameById,
  deleteGameById,
  getAllGames
} = require('../controllers/game')

const gameResponseJsonSchema = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    creationTime: {
      type: 'string',
      format: 'date-time'
    },
    hostName: { type: 'string' },
    name: { type: 'string' },
    stake: { type: 'number' },
    status: { type: 'string' },
    players: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    history: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    stats: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          player: { type: 'string' },
          stat: { type: 'number' }
        }
      }
    }
  }
}

module.exports = () => {
  const app = require('../app')()

  app.route({
    method: 'POST',
    url: '/game',
    schema: {
      body: {
        type: 'object',
        required: ['hostName', 'name', 'stake'],
        properties: {
          hostName: { type: 'string' },
          name: { type: 'string' },
          stake: { type: 'number' },
        }
      },
      response: {
        [StatusCodes.OK]: gameResponseJsonSchema
      }
    },
    preHandler: auth,
    handler: createGame
  })

  app.route({
    method: 'GET',
    url: '/game/:id',
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        [StatusCodes.OK]: gameResponseJsonSchema
      }
    },
    preHandler: auth,
    preValidation: idValidator,
    handler: getGameById
  })

  app.route({
    method: 'PATCH',
    url: '/game/:id',
    schema: {
      body: {
        type: 'object',
        properties: {
          hostName: { type: 'string' },
          name: { type: 'string' },
          stake: { type: 'number' },
          status: { type: 'string' },
          stats: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                player: { type: 'string' },
                stat: { type: 'number' }
              }
            }
          }
        }
      },
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        [StatusCodes.OK]: gameResponseJsonSchema
      }
    },
    preHandler: auth,
    preValidation: idValidator,
    handler: updateGameById
  })

  app.route({
    method: 'DELETE',
    url: '/game/:id',
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        [StatusCodes.OK]: { type: 'string' }
      }
    },
    preHandler: auth,
    preValidation: idValidator,
    handler: deleteGameById
  })

  app.route({
    method: 'GET',
    url: '/game',
    schema: {
      response: {
        [StatusCodes.OK]: {
          type: 'array',
          items: gameResponseJsonSchema
        }
      }
    },
    preHandler: auth,
    handler: getAllGames
  })
}