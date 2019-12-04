const fs = require('fs')
const ora = require('ora')
const { searchAll } = require('./files-tools')

const spinner = ora().start()

const rootDir = process.cwd()

const packageInfo = require(`${rootDir}/package.json`)

/**
 * @param {String} name
 * @param {Number} index
 */
function formatMessage(name, index) {
  return String(`  ${index + 1}. ${name.slice(rootDir.length + 1)}`)
}

spinner.info('[TS] Start project validations')
;(async () => {
  const typesIndexFileIsExist = fs.existsSync(`${rootDir}/${packageInfo.types}`)
  const {notMatch} = searchAll(rootDir + '/types', /\.d.ts/)

  if (typesIndexFileIsExist && notMatch.length === 0) {
    return spinner.succeed('[TS] Validations complete')
  }

  if (!typesIndexFileIsExist) {
    spinner.fail('[TS] Type definitions in build folder not found')
  }

  if (notMatch.length > 0) {
    spinner.fail(`[TS] Found illegal files:\n${
      notMatch.map((item, index) => formatMessage(item.name, index)).join('\n')
    }\n`)
  }

  process.exit(1)
})()
