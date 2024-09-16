const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
  let target = process.env.TARGET_URL || "https://google.com/"; // 从环境变量获取目标 URL，如果未设置则使用默认值

  if (
    req.url.startsWith("/api") ||
    req.url.startsWith("/auth") ||
    req.url.startsWith("/signup") ||
    req.url.startsWith("/login")
  ) {
    res.statusCode = 404;
    res.end("Not Found");
    return;
  }

  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      // rewrite request path `/backend`
      //  /backend/user/login => http://google.com/user/login
      //   "^/backend/": "/",
    },
  })(req, res);
};
