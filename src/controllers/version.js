const { StatusCodes } = require('http-status-codes')
const errHandler = require('../helpers/err')
const appGetter = require('../app')

module.exports = {
  async getLatestMobileVersion(request, reply) {
    const app = appGetter()
    if (!(app.config && app.config.latestMobileAppVersion)) {
      const errorMsg = 'latestMobileAppVersion config is missing'
      errHandler(
        reply,
        new Error(errorMsg),
        StatusCodes.INTERNAL_SERVER_ERROR,
        errorMsg
      )
      return
    }

    return app.config.latestMobileAppVersion
  }
}