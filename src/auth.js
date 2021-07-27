var axios = require('axios')
var qs = require('qs')

// Step One: Use OAuth to get a token for use with the API endpoint
// TODO: Runs every time, change to only run if we don't already have
//       a good one, they are good for one hour.
exports.doAuth = async ({ pluginOptions, scope }) => {
  try {
    auth_result = await axios.request({
      baseURL: 'https://service.commercev3.com/rest',
      url: 'oauth2/token',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: pluginOptions.rest_key,
        password: pluginOptions.rest_secret,
      },
      data: qs.stringify({
        grant_type: 'client_credentials',
        scope: scope,
      }),
    })
  } catch (err) {
    console.log('JS ERROR')
    console.log(err)
  }

  return auth_result.data.oauth2.access_token
}
