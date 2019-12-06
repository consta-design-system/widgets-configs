const fs = require('fs')
const ora = require('ora')
const { searchAll } = require('./files-tools')

const spinner = ora().start()

/**
 * @param {fs.Dirent} item
 */
function remove(item) {
  if (item.isFile()) {
    fs.unlinkSync(item.name)
  }

  if (item.isDirectory()) {
    fs.rmdirSync(item.name)
  }
}

spinner.info('Start check folders for removing')
;(async () => {
  const {match} = searchAll(process.cwd() + '/src', /\.d.ts/)

  if (match.length === 0) {
    spinner.succeed('Nothing remove')
  } else {
    match.forEach(remove)
    spinner.succeed('Removed empty folders')
  }
})()
