Page({
  ToMain: function () {
    wx.switchTab({
      url: '../main/main'
    })
    console.log('用户返回主页')
  },
});