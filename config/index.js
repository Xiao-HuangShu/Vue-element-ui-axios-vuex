// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionTip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/api/': {
              // Dev http://10.66.1.119:8002
              // Test http://10.66.1.119:8004
              // PRE http://10.66.140.81:8080
              // target: 'http://10.66.30.66:8009/',
              // target: 'http://10.66.49.51:8001',
              // target: 'http://10.66.150.140:81',
              // target: 'http://10.66.30.66:8001', // 测试地址
              // target: 'http://10.66.30.66:81', // 测试地址
              target: 'http://10.66.30.66:81',
              // target: 'http://10.66.140.9:8001', // 联调地址
              // target: 'http://10.66.150.135:81', // 生产地址
              // target: 'http://localhost:3330', // mock地址
              pathRewrite: {
                  '^/api': '',
              },
              changeOrigin: true,
          }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
