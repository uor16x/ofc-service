const mongoose = require('mongoose')

module.exports = async () => {
  const app = require('./app')()
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  } catch (err) {
    app.fatalErr(err)
  }
  app.db = {
    Game: require('./models/game'),
    Action: require('./models/action')
  }
}
