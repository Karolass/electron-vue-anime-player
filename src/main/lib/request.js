const request = require('request')

const baseRequest = request.defaults({
  baseUrl: 'http://myself-bbs.com/',
  headers: {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
  },
})

exports.get = (uri) => {
  return new Promise((resolve, reject) => {
    const option = {
      uri,
    }
    baseRequest(option, (err, response, body) => {
      if (err) reject(err)
      if (response.statusCode !== 200) reject(response)

      resolve(body)
    })
  })
}
