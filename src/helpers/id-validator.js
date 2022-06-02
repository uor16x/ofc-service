const { isObjectIdOrHexString } = require('mongoose')
const { StatusCodes } = require('http-status-codes')

module.exports = (request, reply, done) => {
  const id = request.params.id
  if (!id || !isObjectIdOrHexString(id)) {
    return reply
      .status(StatusCodes.BAD_REQUEST)
      .send(new Error('Invalid id'))
  }
  done()
}