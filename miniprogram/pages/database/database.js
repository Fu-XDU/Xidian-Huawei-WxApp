// miniprogram/pages/remove/remove.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    add_inputValue: null,
    remove_inputValue: null,
    add_index: 0,
    remove_index: 0,
    array: ["有害垃圾", "可回收物", "湿垃圾", "干垃圾", "不属于垃圾，可能有害", "不属于垃圾，可以回收", "不属于日常生活垃圾", "装修垃圾", "大件垃圾"],
    array_en: ["harmfulLitter", "recyclableLitter", "wetLitter", "dryLitter", "notLitter_mayHarmful", "notLitter_canRecycled", "notDailyLitter", "buildingLitter", "largeLitter"],
    add_collectionName: '',
    remove_collectionName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
  remove_bindPickerChange: function(e) {
    this.setData({
      remove_index: e.detail.value,
      remove_collectionName: this.data.array_en[e.detail.value]
    })
  },

  add_bindPickerChange: function(e) {
    this.setData({
      add_index: e.detail.value,
      add_collectionName: this.data.array_en[e.detail.value]
    })
  },
  add: function(e) {
    const db = wx.cloud.database()
    db.collection('Litter').add({
        data: {
          litter: this.data.add_inputValue,
          type: this.data.array[this.data.add_index],
          createTime: db.serverDate()
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          wx.showToast({
            title: '新增记录成功',
          })
          console.log('[数据库Litter] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库Litter] [新增记录] 失败：', err)
        }
      }),
      db.collection(this.data.add_collectionName).add({
        data: {
          litter: this.data.add_inputValue
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          wx.showToast({
            title: '新增记录成功',
          })
          console.log('[数据库' + this.data.add_collectionName + '] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库' + this.data.add_collectionName + '] [新增记录] 失败：', err)
        }
      })
  },
  remove: function(e) {
    wx.cloud.callFunction({
        name: "remove",
        data: {
          litter: this.data.remove_inputValue,
          collectionName: 'Litter'
        },
        success(res) {
          wx.showToast({
            title: '数据删除成功',
          })
          console.log("[Litter]删除成功", res)
        },
        fail(res) {
          wx.showToast({
            icon: 'none',
            title: '数据删除失败'
          })
          console.log("[Litter]删除失败", res)
        }
      }),
      wx.cloud.callFunction({
        name: "remove",
        data: {
          litter: this.data.remove_inputValue,
          collectionName: this.data.remove_collectionName
        },
        success(res) {
          wx.showToast({
            title: '数据删除成功',
          })
          console.log("类别数据库数据删除成功", res)
        },
        fail(res) {
          wx.showToast({
            icon: 'none',
            title: '数据删除失败'
          })
          console.log("类别数据库数据删除失败", res)
        }
      })
  },
  add_res: function(e) {
    this.setData({
      add_inputValue: e.detail.value
    })
  },
  remove_res: function(e) {
    this.setData({
      remove_inputValue: e.detail.value
    })
  },
})