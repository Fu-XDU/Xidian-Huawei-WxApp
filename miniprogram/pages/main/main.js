var app = getApp();
//input.js
Page({
  data: {
  },
  apply: function () {
    console.log('用户点击进入招新报名界面')
  },
  resume: function () {
    console.log('用户点击进入华俱介绍界面')
  },
  detail: function () {
    console.log('用户点击进入报名详细信息')
  },
  developing: function () {
    console.log('用户点击进入活动室预约界面')
    wx.showToast({
      title: "正在开发...",
      icon: "loading",
      duration: 500
    });
  },
  onShareAppMessage: function() {
    return {}
  },
  onLoad:function(){
    wx.cloud.callFunction({
      name: "login",
      data: {},
      success(res) {
        console.log("用户登录成功", res)
        app.globalData.openid = res.result.openid
      }
    })
  }
})