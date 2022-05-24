const calcRoute = require('./routes/calculation')
const gameRoute = require('./routes/game')

module.exports = () => {
  calcRoute()
  gameRoute()
}