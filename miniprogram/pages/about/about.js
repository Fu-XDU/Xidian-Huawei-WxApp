// pages/about/about.js
const util = require("../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   * apply为网上申请，done为!1时不亮，数据库有三个可选参数即0、1和2
   * 0表示不亮，尚未进行；1表示亮，正在进行；2表示进行完毕，同时综合面试亮且显示为尚未进行
   * interview为综合面试，done为!1时不亮，数据库有两个可选参数0和1
   * 0表示综合面试亮且显示为尚未进行，1表示综合面试亮且显示为正在进行
   * check为部门审核，done为!1时不亮，数据库有三个可选参数即0、1和2
   * 0表示部门审核不亮且显示为尚未进行，1表示综合面试亮且显示为正在进行，2表示综合面试亮且显示为进行完毕
   */
  data: {
    stages: [{
      id: 1,
      title: "01 网上申请",
      done: !1,
      desc: "尚未进行"
    }, {
      id: 2,
      title: "02 综合面试",
      done: !1,
      desc: "尚未进行"
    }, {
      id: 3,
      title: "03 检验审核",
      done: !1,
      desc: "尚未进行"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //0不亮尚未进行 1亮正在进行 2亮进行完毕
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.showToast({
      title: "正在刷新...",
      icon: "loading",
      duration: 500
    });
    var t = this;
    this.setData({
      stages: [{
        id: 1,
        title: "01 网上申请",
        done: !0, //亮
        desc: "尚未进行"
      }, {
        id: 2,
        title: "02 综合面试",
        done: !1, //不亮
        desc: "尚未进行"
      }, {
        id: 3,
        title: "03 部门审核",
        done: !1,
        desc: "尚未进行"
      }]
    })
    wx.cloud.callFunction({
      name: "checkall",
      data: {
        collectionName: 'About'
      },
      success(res) {
        var c = t.data.stages
        switch (res.result.data[0].apply) {
          case '1':
            c[0].desc = "正在进行"
            t.setData({
              stages: c
            })
            break;
          case '2':
            c[0].done = !0 //apply
            c[1].done = !0 //interview
            c[0].desc = "进行完毕"
            t.setData({
              stages: c
            })
            break;
        }
        switch (res.result.data[0].interview) {
          case '1':
            c[1].done = !0
            c[2].done = !0
            c[1].desc = "正在进行"
            t.setData({
              stages: c
            })
            break;
        }
        switch (res.result.data[0].check) {
          case '1':
            c[1].desc = "进行完毕"
            c[2].done = !0
            c[2].desc = "正在进行"
            t.setData({
              stages: c
            })
            break;
          case '2':
            c[1].desc = "进行完毕"
            c[2].done = !0
            c[2].desc = "进行完毕"
            t.setData({
              stages: c
            })
            break;
        }
      },
      fail(err) {
        util.networkError(err);
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})