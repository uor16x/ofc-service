let app = null
module.exports = () => {
  if (!app) {
    app = require('fastify')({ 
      logger: {
        prettyPrint: {
          translateTime: 'SYS:dd.mm HH:MM:ss',
          ignore: 'pid,hostname'
        }
      } 
    })

    app.register(require('@fastify/cors'))

    app.fatalErr = err => {
      app.log.error(err)
      process.exit(1)
    }
  }
  return app
}