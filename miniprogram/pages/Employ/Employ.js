const app = getApp();
const util = require("../../utils/util.js")
const db = wx.cloud.database()
// miniprogram/pages/Employ/Employ.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    sex: null,
    college: null,
    major: null,
    phone: null,
    stuid: null,
    direction: null,
    specialty: "",
    detail_specialty: null,
    department: "",
    adjust: "是",
    profile: "",
    reward: "",
    experience: "",
    interest: "",
    purpose: "",
    detail_specialty_flag: false,
    disable_upload_photo: true,
    pickerList: {
      sex: ["男", "女"],
      college: ["通信工程学院", "电子工程学院", "计算机学院", "机电工程学院", "物理与光电工程学院", "经济与管理学院", "数学与统计学院", "外国语学院", "软件学院", "微电子学院", "生命科学技术学院", "空间科学与技术学院", "先进材料与纳米科技学院", "网络与信息安全学院", "人工智能学院"],
      specialty: ["软件编程", "硬件设计", "算法理论", "媒体运营", "主持演讲", "才艺表演", "文案编辑", "PS及海报制作", "视频制作", "其他"],
      department: ["技术部", "秘书部", "花粉部"],
      adjust: ["是", "否"]
    },
    showButton: false, //两个按钮，显示其一
    noticeText: '正在获取数据...', //最上方公告栏文本
    photo: '未选择，点击选择照片',
    imgSrc: null,
    imgType: null,
    apply: null,
    stuid_check: false,
    //for test
    hook_submit: false,
  },
  getImg: function() {
    var _this = this;
    if (!_this.data.apply || _this.data.disable_upload_photo) {
      wx.showToast({
        icon: 'none',
        title: !_this.data.apply ? _this.data.noticeText : '报名通道已经关闭'
      })
      return;
    }
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        _this.setData({
          imgType: res.tempFilePaths[0].match(/\.[^.]+?$/)[0],
          imgSrc: res.tempFilePaths[0],
          photo: '照片上传中......',
        })
        wx.cloud.uploadFile({
          cloudPath: 'Photos/' + app.globalData.openid + _this.data.imgSrc.match(/\.[^.]+?$/)[0],
          filePath: _this.data.imgSrc, // 文件路径
          success: res => {
            // get resource ID
            //console.log('照片上传成功', res.fileID)
            _this.setData({
              photo: '照片上传成功，重复上传可覆盖'
            })
          },
          fail: err => {
            // handle error
            //console.log(res)
            _this.setData({
              photo: '照片上传失败,点击重试'
            })
          }
        })
      }
    })
  },
  /**
   * 数据设置函数--设置表单数据
   */
  bindFormInput: function(t) {
    switch (t.currentTarget.dataset.area) {
      case "name":
        this.setData({
          name: t.detail.value
        })
        break;
      case "phone":
        this.setData({
          phone: t.detail.value
        })
        break;
      case "major":
        this.setData({
          major: t.detail.value
        })
        break;
      case "stuid":
        this.setData({
          stuid: t.detail.value
        })
        break;
      case "direction":
        this.setData({
          direction: t.detail.value
        })
        break;
      case "detail_specialty":
        this.setData({
          detail_specialty: t.detail.value
        })
        break;
      case "profile":
        this.setData({
          profile: t.detail.value
        })
        break;
      case "reward":
        this.setData({
          reward: t.detail.value
        })
        break;
      case "experience":
        this.setData({
          experience: t.detail.value
        })
        break;
      case "interest":
        this.setData({
          interest: t.detail.value
        })
        break;
      case "purpose":
        this.setData({
          purpose: t.detail.value
        })
        break;
    }
  },
  /**
   * 数据设置函数--设置选择器数据
   */
  bindPickerChange: function(t) {
    switch (t.currentTarget.dataset.area) {
      case "sex":
        this.setData({
          sex: this.data.pickerList.sex[t.detail.value]
        })
        break;
      case "college":
        this.setData({
          college: this.data.pickerList.college[t.detail.value]
        })
        break;
      case "specialty":
        this.setData({
          specialty: this.data.pickerList.specialty[t.detail.value]
        })
        if (this.data.pickerList.specialty[t.detail.value] == '其他') {
          this.setData({
            detail_specialty_flag: true
          })
        } else {
          this.setData({
            detail_specialty_flag: false
          })
        }
        break;
      case "department":
        this.setData({
          department: this.data.pickerList.department[t.detail.value]
        })
        break;
      case "adjust":
        this.setData({
          adjust: this.data.pickerList.adjust[t.detail.value]
        })
    }
  },
  /**
   * 表单检查函数--检查表单规范性
   */
  checkForm: function() {
    var _this = this;
    if (_this.data.apply != 1) {
      wx.showToast({
        icon: 'none',
        title: '报名通道已经关闭'
      })
      return;
    }
    if (!_this.data.hook_submit) {
      if (!_this.data.name || !_this.data.sex || !_this.data.college || !_this.data.major || !_this.data.phone || !_this.data.stuid || !_this.data.direction || !_this.data.specialty || !_this.data.department || !_this.data.adjust || !_this.data.profile || !_this.data.reward || !_this.data.experience || !_this.data.interest || !_this.data.purpose || (_this.data.detail_specialty_flag && !_this.data.detail_specialty)) {
        wx.showToast({
          icon: 'none',
          title: '请填写所有项目'
        })
        return;
      } else if (_this.data.stuid.length != 11 || _this.data.phone.length != 11) {
        //console.log("电话或学号错误")
        if (stuid_check && _this.data.stuid.length == 11 && _this.data.phone.length != 11) {
          wx.showToast({
            icon: 'none',
            title: '请正确填写电话'
          })
        } else if (_this.data.stuid.length != 11 && _this.data.phone.length == 11) {
          wx.showToast({
            icon: 'none',
            title: '请正确填写学号'
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '请正确填写电话和学号'
          })
        }
        return;
      } else if (_this.data.stuid_check && _this.data.stuid.charAt(1) != '0') {
        wx.showToast({
          icon: 'none',
          title: '本次只招收2020级本科新生'
        })
        return;
      } else if (_this.data.photo != '照片上传成功，重复上传可覆盖') {
        //console.log("照片出现错误")
        if (_this.data.photo == '未选择，点击选择照片') {
          wx.showToast({
            icon: 'none',
            title: '请选择并上传照片'
          })
        } else if (_this.data.photo == '照片选择成功,正在上传...') {
          wx.showToast({
            icon: 'none',
            title: '正在上传照片，请等待上传完成后提交'
          })
        }
        return;
      }
    }
    _this.submit();
  },
  /**
   * 表单提交函数--将表单写入数据库
   */
  submit: function() {
    var _this = this;
    var real_specialty = ''
    wx.showLoading({
      title: '正在提交',
    })
    const dbname = 'Recruit'
    db.collection(dbname).where({
      _openid: app.globalData.openid
    }).get({
      success: function(res) {
        if (res.data.length == 0) {
          real_specialty = _this.data.detail_specialty_flag ? _this.data.detail_specialty : _this.data.specialty;
          db.collection(dbname).add({
            data: {
              name: _this.data.name,
              sex: _this.data.sex,
              college: _this.data.college,
              major: _this.data.major,
              phone: _this.data.phone,
              stuid: _this.data.stuid,
              direction: _this.data.direction,
              specialty: real_specialty,
              department: _this.data.department,
              adjust: _this.data.adjust,
              profile: _this.data.profile,
              reward: _this.data.reward,
              experience: _this.data.experience,
              interest: _this.data.interest,
              purpose: _this.data.purpose,
              imgType: _this.data.imgType
            },
            success: res => {
              wx.redirectTo({
                url: '../Success/Success'
              })
              //console.log('[数据库' + dbname + '] [新增记录] 成功，记录 _id: ', res._id)
              //console.log('报名成功，用户进入Msg界面')
            },
            fail: err => {
              util.networkError(err);
            }
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '请勿重复提交'
          })
        }
      },
      fail: err => {
        util.networkError(err);
      }
    })
  },
  toCheck: function() {
    wx.navigateTo({
      url: '../Check/Check'
    })
    //console.log('用户进入搜索界面')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      disable_upload_photo: app.globalData.apply != 1 || app.globalData.registered,
      showButton: !app.globalData.registered, //两个按钮，显示其一
      noticeText: app.globalData.apply == 0 ? app.globalData.noticeTextAtEmployWhenApplyIs0 : app.globalData.apply == 1 ? app.globalData.noticeTextAtEmployWhenApplyIs1 : app.globalData.noticeTextAtEmployWhenApplyIs2, //最上方公告栏文本
      photo: app.globalData.registered ? '已报名，照片已上传' : '未选择，点击选择照片',
      apply: app.globalData.apply,
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
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    // 离开时询问是否存为草稿
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    util.init().then((res) => {
      this.onLoad()
      wx.stopPullDownRefresh()
    })
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