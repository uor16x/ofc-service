const { StatusCodes } = require('http-status-codes')
const calculate = require('./../services/calc')

module.exports = {
  async calc(request, reply) {
    try {
      return calculate(request.body)
    } catch (err) {
      return reply
        .status(StatusCodes.BAD_REQUEST)
        .send(new Error(`Calc endpoint faile: ${err.message}`))
    }
  }
}