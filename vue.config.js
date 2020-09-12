module.exports = {
  devServer: {
    proxy: {
      "/ip": {
        target: "https://apis.map.qq.com/ws/location/v1",
        changeOrigin: true
      },
      "/ajax": {
        target: "http://m.maoyan.com",
        changeOrigin: true
      }
    }
  }
};
