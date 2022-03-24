module.exports = {
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = "知乎专栏";
        return args;
      })
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.vikingship.xyz/api',
        // 是否允许跨域,在本地会创建一个虚拟服务端，然后发送请求的数据
        changeOrigin: true,
        // 并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        // ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}