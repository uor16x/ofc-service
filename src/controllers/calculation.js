const { StatusCodes } = require('http-status-codes')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

module.exports = {
  async calc(request, reply) {
    const input = request.body
    if (!process.env.CALC_PATH) {
      throw new Error('Please provide CALC_PATH environment variable')
    }
    let result
    try {
      const arg = input
        .map(({ username, cards }) => `(\\"${username}\\", [${cards.map(card => `\\"${card}\\"`)}])`)
        .join(',')
      const { stdout } = await exec(`${process.env.CALC_PATH} "[${arg}]"`)
      result = JSON.parse(JSON.parse(stdout)) // external calc binary requires double unpacking
    } catch (err) {
      return reply
        .status(StatusCodes.BAD_REQUEST)
        .send(new Error(`Failed to parse: ${err.stderr}`))
    }
    return result
  }
}