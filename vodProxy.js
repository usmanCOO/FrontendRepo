// For servers like heroku this is the best way to redirect to https and desired url else u can use nginx;'s and apache's proxy services
/*
module.exports = function (req, res, next) {
  const host = req.headers.host
  const url = req.url
  const env = process.env.NODE_ENV
  const forceDomain = 'https://demo.vodlix.com'
  
  console.log(req.protocol)
  console.log(req.secure)
  
  if (env === 'production' && !req.secure) {
    res.writeHead(301, { Location: forceDomain + url })
    return res.end()
  }

  return next()
}
*/