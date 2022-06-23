const { auth } = require('../middlewares')
const { StatusCodes } = require('http-status-codes')
const { getLatestMobileVersion } = require('../controllers/version')
const appGetter = require('../app')

module.exports = () => {
  const app = appGetter()

  app.route({
    method: 'GET',
    url: '/version',
    schema: {
      response: {
        [StatusCodes.OK]: {
          type: 'string',
        }
      }
    },
    preHandler: auth,
    handler: getLatestMobileVersion
  })
}