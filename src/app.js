let app = null
const Action = require('./models/action')

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

    app.addHook('onError', onErrorHook)
    app.addHook('onRequest', onRequestHook)
    app.addHook('preValidation', onPreValidationHook)
    app.addHook('onSend', onSendHook)
    app.addHook('onResponse', onResponseHook)

    app.register(require('@fastify/cors'))

    app.fatalErr = err => {
      app.log.error(err)
      process.exit(1)
    }
  }
  return app
}

async function onErrorHook(request, reply, err) {
  request.action.err = {
    message: err.message,
    stack: err.stack
  }
  await request.action.save()
}

async function onRequestHook(request) {
  const action = new Action({
    ip: request.ip,
    entryPoint: request.routerPath,
    timestamp: Date.now()
  })
  request.action = action
  await action.save()
}

async function onPreValidationHook(request) {
  request.action.params = {
    body: request.body,
    query: request.query,
    urlParams: request.params
  }
  await request.action.save()
}

async function onSendHook(request, _reply, payload) {
  request.action.response = payload
  await request.action.save()
}

async function onResponseHook(request) {
  request.action.done = true
  await request.action.save()
}