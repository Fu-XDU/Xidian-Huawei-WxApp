var app = getApp();
const util = require("../../utils/util.js")
// miniprogram/pages/Check/Check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    sex: "",
    college: "",
    major: "",
    phone: "",
    stuid: "",
    direction: "",
    specialty: "",
    detail_specialty: "",
    department: "",
    adjust: "",
    profile: "",
    reward: "",
    experience: "",
    interest: "",
    purpose: "",
    openid: "",
    imgUrl: "",
    imgtext: "照片正在下载中...",
    noticeText:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    const db = wx.cloud.database()
    db.collection('Recruit').where({
      _openid: app.globalData.openid
    }).get({
      success: function(res) {
        if (res.data.length != 0) {
          wx.cloud.downloadFile({
            fileID: 'cloud://huawei-213p7.6875-huawei-213p7-1300112055/Photos/' + app.globalData.openid + res.data[0].imgType,
            success: res => {
              // get temp file path
              that.setData({
                imgUrl: res.tempFilePath,
                imgtext: ""
              })
            },
            fail: err => {
              util.networkError(err)
            }
          })
          that.setData({
            name: res.data[0].name,
            sex: res.data[0].sex,
            college: res.data[0].college,
            major: res.data[0].major,
            phone: res.data[0].phone,
            stuid: res.data[0].stuid,
            direction: res.data[0].direction,
            specialty: res.data[0].specialty,
            department: res.data[0].department,
            adjust: res.data[0].adjust,
            profile: res.data[0].profile,
            reward: res.data[0].reward,
            experience: res.data[0].experience,
            interest: res.data[0].interest,
            purpose: res.data[0].purpose
          })
        } else {
          //console.log("信息查询成功,未找到报名信息")
        }
      }
    })
    wx.cloud.callFunction({
      name: "checkall",
      data: {
        collectionName: 'About'
      },
      success(res) {
        that.setData({
          noticeText: res.result.data[0].noticeTextAtCheck
        })
      },
      fail(res) {
        that.setData({
          noticeText: '信息获取失败，请检查网络状态后重试。'
        })
        util.networkError(err);
      }
    })
  },
  showphone: function() {
    wx.showModal({
      title: '电话',
      content: this.data.phone
    });
  },
  showstuid: function() {
    wx.showModal({
      title: '学号',
      content: this.data.stuid
    });
  },
  preview: function(e) {
    wx.previewImage({
      current: this.data.imgUrl, // 当前显示图片的http链接
      urls: [this.data.imgUrl] // 需要预览的图片http链接列表
    })
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

  }
})