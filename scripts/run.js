const fs = require('fs')
const path = require('path')

const runScripts = {
  development: 'development',
  production: 'build',
}

// CTRL/CMD+C interrupts cleanly
;['SIGINT', 'SIGTERM'].forEach(function(sig) {
  process.on(sig, function() {
    process.exit(0)
  })
})

const script = path.resolve('node_modules/@gaz/configs/scripts', `${runScripts[process.env.NODE_ENV]}.js`)

if (!fs.existsSync(script)) {
  // eslint-disable-next-line no-console
  console.error(`Script doesn't exist: ${script}`)
  process.exit(1)
}

require(script)
