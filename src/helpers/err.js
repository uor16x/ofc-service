module.exports = (reply, err, code, message) => {
  const app = require('../app')()
  app.log.error(err)
  return reply
    .status(code)
    .send(new Error(message))
}