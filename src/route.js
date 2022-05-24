const { calc, createGame, getGameById, updateGameById, deleteGameById } = require('./controller')
const { auth } = require('./middlewares')
const { StatusCodes } = require('http-status-codes')
const { idValidator } = require('./helpers/id-validator')

const gameResponseJsonSchema = {
  type: 'object',
  properties: {
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
  const app = require('./app')()

  app.route({
    method: 'POST',
    url: '/calc',
    schema: {
      body: {
        type: 'array',
        maxItems: 3,
        minItems: 3,
        items: {
          type: 'object',
          required: ['username', 'cards'],
          properties: {
            username: { type: 'string' },
            cards: {
              type: 'array',
              minItems: 13,
              maxItems: 13,
              items: {
                type: 'string',
                maxLength: 2,
                minLength: 2
              }
            }
          }
        },
      },
      response: {
        [StatusCodes.OK]: {
          type: 'array',
          maxItems: 3,
          minItems: 3,
          items: {
            type: 'object',
            required: ['username', 'result'],
            properties: {
              username: { type: 'string' },
              result: {
                type: 'object'
              }
            }
          }
        }
      }
    },
    preHandler: auth,
    handler: calc
  })

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
}