const devMode = true
const rootPath = devMode ? '../../' : '../../../'

const { resolve } = require('path')

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: resolve(__dirname, rootPath+'database.sqlite')
    },
    useNullAsDefault: true,
    migrations: {
      directory: resolve(__dirname, 'migrations')
    },
    seeds: {
      directory: resolve(__dirname, 'seeds')
    }
  },
}