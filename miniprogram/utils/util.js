const networkError = function(e) {
  wx.showModal({
    title: '网络连接失败',
    content: '请检查网络设置',
    showCancel: false
  })
  console.error(e);
}
const login = function() {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: "login",
      data: {},
      success(res) {
        //console.log("用户登录成功")
        resolve(res)
      },
      fail(err) {
        reject(err)
        networkError(err);
      }
    })
  })
}
const init = function() {
  return new Promise((resolve, reject) => {
  var app=getApp()
  wx.cloud.callFunction({
    name: "checkall",
    data: {
      collectionName: 'About'
    },
    success(res) {
      const data = res.result.data[0]
      app.globalData.apply = parseInt(data.apply)
      app.globalData.check = parseInt(data.check)
      app.globalData.interview = parseInt(data.interview)
      app.globalData.noticeTextAtCheck = data.noticeTextAtCheck
      app.globalData.noticeTextAtEmployWhenApplyIs0 = data.noticeTextAtEmployWhenApplyIs0
      app.globalData.noticeTextAtEmployWhenApplyIs1 = data.noticeTextAtEmployWhenApplyIs1
      app.globalData.noticeTextAtEmployWhenApplyIs2 = data.noticeTextAtEmployWhenApplyIs2
      wx.cloud.database().collection('Recruit').where({
        _openid: app.globalData.openid
      }).get({
        success: function (res) {
          if (res.data.length != 0) {
            //console.log("信息查询成功，找到报名信息", res.data[0])
            app.globalData.registered = true
          } else {
            //console.log("信息查询成功,未找到报名信息")
          }
          resolve()
        },
        fail(err) {
          util.networkError(err);
        }
      })
    },
    fail(err) {
      networkError(err);
    }
  })
  })
}
module.exports = {
  networkError: networkError,
  login: login,
  init: init
}