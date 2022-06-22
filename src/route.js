const calcRoute = require('./routes/calculation')
const gameRoute = require('./routes/game')
const actionRoute = require('./routes/action')
const versionRoute = require('./routes/version')

module.exports = () => {
  calcRoute()
  gameRoute()
  actionRoute()
  versionRoute()
}