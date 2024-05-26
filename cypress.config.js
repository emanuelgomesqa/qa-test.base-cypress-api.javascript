const { defineConfig } = require('cypress')

const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile (file) {
  const pathToConfigFile = path.resolve('config', `${file}.json`)

  return fs.readJson(pathToConfigFile)
}

module.exports = defineConfig({
  defaultCommandTimeout: 20000,
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 934,
    hideCredentials: true,
    requestMode: true,
    fixturesFolder: 'cypress/fixtures',
    experimentalRunAllSpecs: true,
    video: false,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents (on, config) {
      const file = config.env.configFile
      return getConfigurationByFile(file)
    }
  }
})
