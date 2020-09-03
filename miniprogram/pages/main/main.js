var app = getApp();
const util = require("../../utils/util.js")
//input.js
Page({
  data: {
    third_icon_name: "活动室预约"
  },
  apply: function() {
    //console.log('用户点击进入招新报名界面')
  },
  resume: function() {
    //console.log('用户点击进入华俱介绍界面')
  },
  developingOrDetail: function() {
    if (!app.globalData.trial_version) {
      //console.log('用户点击进入活动室预约界面')
      wx.showToast({
        title: "正在开发...",
        icon: "loading",
        duration: 500
      });
    } else {
      //console.log('用户点击进入报名详细信息')
      wx.navigateTo({
        url: '../EmployDetail/EmployDetail',
      })
    }
  },
  onShareAppMessage: function() {
    return {}
  },
  onLoad: function() {
    
  },
  onShow: function() {
    if (app.globalData.trial_version) {
      this.setData({
        third_icon_name: "查看报名"
      })
    }
  }
})