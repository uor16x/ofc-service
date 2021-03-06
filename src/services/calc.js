const util = require('util')
const exec = util.promisify(require('child_process').exec)

module.exports = async function calc(input) {
  if (!process.env.CALC_PATH) {
    throw new Error('Please provide CALC_PATH environment variable')
  }
  try {
    const arg = input
      .map(({ username, withFantasy, cards }) => `(\\"${username}\\", ${capitalizeBool(!!withFantasy)}, [${cards.map(card => `\\"${card}\\"`)}])`)
      .join(',')
    const { stdout } = await exec(`${process.env.CALC_PATH} "[${arg}]"`)
    return JSON.parse(JSON.parse(stdout)) // external calc binary requires double unpacking
  } catch (err) {
    throw new Error(`Failed to parse: ${err.stderr}`)
  }
}

function capitalizeBool(bool) {
  bool = bool.toString()
  return bool.charAt(0).toUpperCase() + bool.slice(1)
}