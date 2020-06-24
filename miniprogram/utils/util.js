const networkError = function (e) {
  wx.showModal({
    title: '网络连接失败',
    content: '请检查网络设置',
    showCancel: false
  })
  console.error(e);
}
const login = function () {
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
module.exports = {
  networkError: networkError,
  login: login,
}