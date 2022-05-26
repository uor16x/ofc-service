const { auth } = require('../middlewares')
const { StatusCodes } = require('http-status-codes')
const { getActions } = require('../controllers/action')

module.exports = () => {
  const app = require('../app')()

  app.route({
    method: 'GET',
    url: '/actions',
    schema: {
      querystring: {
        type: 'object',
        required: ['limit', 'offset'],
        properties: {
          type: { type: 'string' },
          limit: { type: 'number' },
          offset: { type: 'number' },
        }
      },
      response: {
        [StatusCodes.OK]: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            items: {
              type: 'array',
              items: {
                _id: { type: 'string' },
                ip: { type: 'string' },
                entryPoint: { type: 'string' },
                params: { type: 'object' },
                response: { type: 'string' },
                err: { 
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    stack: { type: 'string' }
                  }
                },
                timestamp: { type: 'date' },
                done: { type: 'boolean' }
              }
            }
          }
        }
      }
    },
    preHandler: auth,
    handler: getActions
  })
}