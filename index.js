#! /usr/bin/env node
const chalk = require('chalk')
const beautify = require('json-beautify')

const AdsAuth = require('./lib/ads-auth')

const argv = require('yargs-parser')(process.argv.slice(2))
const log = console.log

if (argv.gen_url && (!argv.client_id || !argv.client_secret)) {
  console.error('--client_id and --client_secret must be set')
  process.exit()
}

const auth = new AdsAuth({
  client_id: argv.client_id,
  client_secret: argv.client_secret
})

// generate auth url
if (argv.gen_url) {
  const authUrl = auth.generateAuthUrl()
  log(authUrl)
}

if (argv.code) {
  auth.getToken(argv.code, (error, tokens) => {
    if (tokens) {
      log(chalk.green('You can copy and add to a .json file'))
      log(beautify(tokens, null, 2, 80))
    } else {
      log(chalk.yellow('No token generated, generate the auth URL again!'))
    }
  })
}
