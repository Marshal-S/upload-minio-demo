const { createProxyMiddleware } = require("http-proxy-middleware");

// 配置代理服务
const apiProxy = createProxyMiddleware("/api", {
	target: 'http://localhost:4000',
	changeOrigin: true,
	// pathRewrite: { '^': '' },
});

module.exports = function (app) {
	app.use(apiProxy);
}
