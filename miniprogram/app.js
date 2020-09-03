//app.js
const util = require("./utils/util.js")
App({
  onLaunch: function() {
    var _this=this
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: "huawei-213p7"
      })
      util.login().then((res) => {
        _this.globalData.openid = res.result.openid
        util.init()
      })
    }
  },
  //小程序有线上和体验两个版本
  //线上版面向大众使用
  //体验版面向华创内部成员使用，可以直接查看报名信息
  //如果要使用线上版，将下方globalData中trial_version设为false，然后将代码上传并提交审核上线即可
  //如果要使用体验版，将下方globalData中trial_version设为true，然后将代码上传为体验版即可
  globalData: {
    openid: "",
    trial_version: false,
    apply:0,
    check:0,
    interview:0,
    noticeTextAtCheck:"正在获取数据...",
    noticeTextAtEmployWhenApplyIs0:"正在获取数据...",
    noticeTextAtEmployWhenApplyIs1: "正在获取数据...",
    noticeTextAtEmployWhenApplyIs2: "正在获取数据...",
    registered:false
  }
})