var app = getApp();
const util = require("../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    resultList: [],
    list: [],
    femaleicon: "../../images/female.png",
    maleicon: "../../images/male.png",
    resultLenth: 0,
    girls: 0,
    temp: 0,
    colleges: {
      "通信工程学院": "通院",
      "电子工程学院": "电院",
      "计算机学院": "计院",
      "机电工程学院": "机电院",
      "物理与光电工程学院": "物光院",
      "经济与管理学院": "经管院",
      "数学与统计学院": "数统院",
      "外国语学院": "外国语学院",
      "软件学院": "软院",
      "微电子学院": "微电子学院",
      "生命科学技术学院": "生科院",
      "空间科学与技术学院": "空间院",
      "先进材料与纳米科技学院": "材料院",
      "网络与信息安全学院": "网安院",
      "人工智能学院": "智能院"
    }
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
        collectionName: 'Recruit'
      },
      success: res => {
        console.log("[数据库Recruit]信息获取成功");
        try {
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
      },
      fail: err => {
        util.networkError(err);
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