const { OAuth2Client } = require('google-auth-library')

const REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob' // see https://goo.gl/EQzqS3
const AUTH_SCOPE = 'https://www.googleapis.com/auth/adwords'

class AdsAuth {
  constructor(credentials) {
    this.credentials = credentials
    this.oauth2Client = new OAuth2Client(
      this.credentials.client_id,
      this.credentials.client_secret,
      REDIRECT_URI
    )
  }

  /**
   * Generates an auth url
   * @return {string} a URL to redirect to
   */
  generateAuthUrl() {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: AUTH_SCOPE,
    })
  }

  /**
   * Get access and refresh tokens from an authorization code
   * @param {string} code a string, returned as part of the redirect URL
   * @param {function} callback
   */
  getToken(code, callback) {
    this.oauth2Client.getToken(code, callback)
  }

  /**
   * Refresh access token
   * @param {string} refreshToken
   * @param {function} callback
   */
  refreshAccessToken(refreshToken, callback) {
    this.oauth2Client.setCredentials({
      refresh_token: refreshToken,
    })
    this.oauth2Client.refreshAccessToken(callback)
  }
}

module.exports = AdsAuth
