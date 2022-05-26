const { StatusCodes } = require('http-status-codes')
const appGetter = require('../app')
const errHandler = require('../helpers/err')

module.exports = {
  async getActions(request, reply) {
    const app = appGetter()
    const {
      type,
      limit,
      offset,
    } = request.query

    const searchParams = {
      _id: { $ne: request.action._id } // exclude current request from search
    }
    if (type) {
      searchParams.type = type
    }
   
    try {
      const total = await app.db.Action.count(searchParams)
      const items = await app.db.Action
        .find(searchParams)
        .limit(limit)
        .skip(offset)
        .sort('-timestamp')

      return {
        total,
        items,
      }
    } catch (err) {
      errHandler(
        reply,
        err,
        StatusCodes.INTERNAL_SERVER_ERROR,
        `Failed to get actions: ${err.message}`
      )
    }
  }
}