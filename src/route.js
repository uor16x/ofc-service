module.exports = fastify => {
    fastify.route({
        method: 'POST',
        url: '/',
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
            200: {
              type: 'object',
              properties: {
                hello: { type: 'string' }
              }
            }
          }
        },
        preHandler: async (request, reply) => {
          console.log('pre')
        },
        handler: async (request, reply) => {
          return { hello: 'world' }
        }
      })
}