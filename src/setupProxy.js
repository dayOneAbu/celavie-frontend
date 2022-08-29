const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target:
        process.env === "production"
          ? "https://celavie-food.herokuapp.com/"
          : "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
