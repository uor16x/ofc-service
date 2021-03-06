const { auth } = require('../middlewares')
const { StatusCodes } = require('http-status-codes')
const { calc } = require('../controllers/calculation')

const combinationSchema = { 
  type: ['object', 'null'],
  properties: {
    name: { type: 'string' },
    part1: {
      type: 'object',
      properties: {
        suit: { type: 'string' },
        value: { type: 'string' },
      }
    },
    part2: {
      type: 'object',
      properties: {
        suit: { type: 'string' },
        value: { type: 'string' },
      }
    },
    rank: {
      type: 'object',
      properties: {
        suit: { type: 'string' },
        value: { type: 'string' },
      }
    }
  }
}

const lineResponseSchema = {
  type: 'object',
  properties: {
    points: { type: 'number' },
    totalCombination: { type: 'number' },
    totalBonus: { type: 'number' },
    lineType: { type: 'string' },
    result: {
      type: 'array',
      maxItems: 2,
      minItems: 2,
      items: { type: 'number' }
    },
    combination: combinationSchema
  }
}

module.exports = () => {
  const app = require('../app')()

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
          required: ['username', 'withFantasy', 'cards'],
          properties: {
            username: { type: 'string' },
            withFantasy: { type: 'boolean' },
            cards: {
              type: 'array',
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
            properties: {
              player: {
                type: 'object',
                properties: {
                  username: { type: 'string' },
                  board: {
                    type: 'array', 
                    items: combinationSchema,
                  }
                }
              },
              isScoop: { type: 'boolean' },
              isNextFantasy: { type: 'boolean' },
              top: lineResponseSchema,
              middle: lineResponseSchema,
              bottom: lineResponseSchema,
              totalDetailed: {
                type: 'array',
                maxItems: 2,
                minItems: 2
              },
              total: { type: 'number' }
            }
          }
        }
      }
    },
    preHandler: auth,
    handler: calc
  })
}