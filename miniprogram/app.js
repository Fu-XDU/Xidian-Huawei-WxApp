//app.js
App({
  onLaunch: function() {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env:"huawei-213p7"
      })
    }
  },
  globalData: {
    wsData: [],
    secretKey: "afenfena",
    openid: "",
    adid: "",
    infos: [],
    userInfo: null,
    admin:false
  }
})