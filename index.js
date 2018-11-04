#! /usr/bin/env node
const beautify = require('json-beautify')
const chalk = require('chalk')
const clipboardy = require('clipboardy')

const AdsAuth = require('./lib/ads-auth')

const argv = require('yargs-parser')(process.argv.slice(2))
const log = console.log

const AW_CLIENT_ID = process.env.AW_CLIENT_ID
const AW_CLIENT_SECRET = process.env.AW_CLIENT_SECRET

if (!AW_CLIENT_ID || !AW_CLIENT_SECRET) {
  log(chalk.red('You must export AW_CLIENT_ID and AW_CLIENT_SECRET first'))
  process.exit()
}

const auth = new AdsAuth({
  client_id: process.env.AW_CLIENT_ID,
  client_secret: process.env.AW_CLIENT_SECRET,
})

// generate auth url
if (argv.url) {
  // --scope can be added to change scope from default adwords
  const authUrl = auth.generateAuthUrl(argv.scope)
  clipboardy.writeSync(authUrl)
  log(`${chalk.green('✓')} The auth URL has been ${chalk.bold.green('generated and stored in the clipboard')}. Paste it in your browser`)
}

if (argv.code) {
  auth.getToken(argv.code, (error, tokens) => {
    if (tokens) {
      const str = beautify(tokens, null, 2, 80)
      clipboardy.writeSync(str)
      log(chalk.green('Already copied in the clipboard, you can add to a .json file'))
      log(str)
    } else {
      log(chalk.yellow('No token generated, generate the auth URL again!'))
    }
  })
}
