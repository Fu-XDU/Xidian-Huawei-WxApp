var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultList: [],
    collectionName: 'Recruit',
    list: [],
    femaleicon: "../../images/female.png",
    maleicon: "../../images/male.png",
    resultLenth: 0,
    girls: 0,
    temp: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(t) {
    //初始化数据
    this.setData({
      resultLenth: ['正在获取数据，请稍候......']
    })
    wx.cloud.callFunction({
      name: "checkall",
      data: {
        collectionName: this.data.collectionName
      },
      complete: res => {
        console.log("[数据库Recruit]信息获取成功");
        try {
          console.log(res.result.data);
          if (!res.result.data)
            console.log("获取成功");
          this.setData({
            resultList: [],
            list: res.result.data
          })
          for (let i in this.data.list) {
            this.data.resultList.push(this.data.list[i].name)
            if (this.data.list[i].sex == '女')
              ++this.data.girls;
          }
          this.data.list.sort(
            function(param1, param2) {
              return param1.name.localeCompare(param2.name, "zh");
            }
          );
          this.setData({
            resultList: this.data.resultList,
            list: this.data.list,
            resultLenth: '一共报名' + this.data.list.length + '人,女生' + this.data.girls + '人',
            girls: this.data.girls
          })
        } catch (e) {
          this.setData({
            resultLenth: '一共报名0人,女生0人'
          })
        }
      }
    })
  },
  /**
   * 显示详细信息
   */
  detail: function(e) {
    app.globalData.openid = e.currentTarget.dataset.id._openid
    wx.navigateTo({
      url: '../../pages/Check/Check'
    })
  },

  /**
   * 点击取消
   */
  modalCandel: function() {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  /**
   *  点击确认
   */
  modalConfirm: function() {
    // do something
    this.setData({
      modalHidden: true
    })
  }
})