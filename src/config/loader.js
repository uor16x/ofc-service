const appGetter = require('../app')
const fs = require('fs').promises
const path = require('path')

module.exports = async () => {
  const app = appGetter()
  try {
    const configPath = path.join(__dirname, 'config.json')
    const config = await fs.readFile(configPath, 'utf-8')
    app.config = JSON.parse(config)
  } catch (e) {
    app.log.error(e)
    throw new Error(`Error loading config: ${e}`)
  }
}