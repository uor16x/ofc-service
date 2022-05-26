const calcRoute = require('./routes/calculation')
const gameRoute = require('./routes/game')
const actionRoute = require('./routes/action')

module.exports = () => {
  calcRoute()
  gameRoute()
  actionRoute()
}