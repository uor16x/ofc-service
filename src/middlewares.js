const { StatusCodes } = require('http-status-codes')

module.exports = {
  async auth(request, reply) {
    return request.headers.apikey === process.env.API_KEY
      ? null
      : reply
        .code(StatusCodes.FORBIDDEN)
        .send(new Error('Invalid apikey'))
  }
}