const { createProxyMiddleware } = require("http-proxy-middleware");

// 配置代理服务
const apiProxy = createProxyMiddleware("/api", {
	target: 'http://172.27.106.36:4000',
	// changeOrigin: true,
	// pathRewrite: { '^': '' },
});

module.exports = function (app) {
	app.use(apiProxy);
}
