var app = getApp();
//input.js
Page({
  data: {
    third_icon_name: "活动室预约"
  },
  apply: function() {
    console.log('用户点击进入招新报名界面')
  },
  resume: function() {
    console.log('用户点击进入华俱介绍界面')
  },
  developingOrDetail: function() {
    if (!app.globalData.admin) {
      console.log('用户点击进入活动室预约界面')
      wx.showToast({
        title: "正在开发...",
        icon: "loading",
        duration: 500
      });
    } else {
      console.log('用户点击进入报名详细信息')
      wx.navigateTo({
        url: '../EmployDetail/EmployDetail',
      })
    }
  },
  onShareAppMessage: function() {
    return {}
  },
  onLoad: function() {
    wx.cloud.callFunction({
      name: "login",
      data: {},
      success(res) {
        console.log("用户登录成功", res)
        app.globalData.openid = res.result.openid
      }
    })
    //TODO:
  },
  onShow: function() {
    //在数据库admin表单中搜索此openid是否是超级管理员账户，是的话修改第三个图标的功能信息为查看报名
    var that = this
    const db = wx.cloud.database()
    db.collection('admin').where({
      _openid: app.globalData.openid
    }).get({
      success: function(res) {
        if (res.data.length != 0) {
          console.log("超级管理员用户")
          app.globalData.admin = true;
          that.setData({
            third_icon_name: "查看报名"
          })
        } else {
          console.log("普通用户")
        }
      }
    })
  }
})