const { calc } = require('./controller')
const { auth } = require('./middlewares')
const { StatusCodes } = require('http-status-codes')

module.exports = app => {
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
}