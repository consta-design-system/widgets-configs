const fs = require('fs')
const {join} = require('path')
const ora = require('ora')

const spinner = ora().start()

const DirentType = {
  FILE: 1,
  DIRECTORY: 2
}

/**
 * @typedef SearchResult
 * @property {Array.<fs.Dirent>} match
 * @property {Array.<fs.Dirent>} notMatch
 */

/**
 * @param {String} path
 * @param {RegExp} value
 * @returns {SearchResult}
 */
function searchAll(path, value) {
  /**
   * @type {Array.<fs.Dirent>}
   */
  const dirents = fs.readdirSync(path, { withFileTypes: true })

  return dirents.reduce(
    /**
     * @param {SearchResult} result
     * @param {fs.Dirent} dirent
     */
    (result, dirent) => {
    if (dirent.isDirectory()) {
      const {match, notMatch} = searchAll(join(path, dirent.name), value)

      return {
        match: notMatch.length === 0
          ? result.match.concat(match, new fs.Dirent(join(path, dirent.name), DirentType.DIRECTORY))
          : result.match.concat(match),
        notMatch: result.notMatch.concat(notMatch)
      }
    }

    if (dirent.isFile()) {
      const newDirent = new fs.Dirent(join(path, dirent.name), DirentType.FILE)

      if (value.test(dirent.name)) {
        result.match.push(newDirent)
      } else {
        result.notMatch.push(newDirent)
      }
    }

    return result
  }, { match: [], notMatch: [] })
}

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
