
const express = require('express')
require('dotenv').config();
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
// const host = process.env.HOST || '192.168.43.42'
const host = process.env.HOST || 'localhost'

const port = process.env.PORT || 4000
app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)
 
  // Listen the server
  let listener=app.listen(port, host)
  var GracefulServer = require('graceful-cluster').GracefulServer;
var gracefulServer = new GracefulServer({
    server: listener,
    shutdownTimeout: 10 * 1000,       
    // 10 sec.
});
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
