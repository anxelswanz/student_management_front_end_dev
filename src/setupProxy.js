const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost:8080',
            changeOrigin: true, // Controls the value of host in the server request header
            pathRewrite: { '^/api': '' }  //Rewriting the request path
        })
    )
}
