var app = getApp();
// miniprogram/pages/Employ/Employ.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    pageWidth: 0,
    pickerWidth: 0,
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
    adjust: "是",
    profile: "",
    reward: "",
    experience: "",
    interest: "",
    purpose: "",
    detail_specialty_flag: false,
    disable_upload_photo: false,
    pickerList: {
      sex: ["男", "女"],
      college: ["通信工程学院", "电子工程学院", "计算机学院", "机电工程学院", "物理与光电工程学院", "经济与管理学院", "数学与统计学院", "外国语学院", "软件学院", "微电子学院", "生命科学技术学院", "空间科学与技术学院", "先进材料与纳米科技学院", "网络与信息安全学院", "人工智能学院"],
      specialty: ["软件编程", "硬件设计", "算法理论", "媒体运营", "主持演讲", "才艺表演", "文案编辑", "PS及海报制作", "视频制作", "其他"],
      department: ["技术部", "秘书部", "花粉部"],
      adjust: ["是", "否"]
    },
    showButton: true, //两个按钮，显示其一
    noticeText: '', //最上方公告栏文本
    photo: '未选择，点击选择照片',
    imgSrc: '',
    imgType: ''
  },
  getImg: function() {
    var _this = this;
    if (_this.data.disable_upload_photo) return;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths)
        _this.setData({
          imgType: res.tempFilePaths[0].match(/\.[^.]+?$/)[0],
          imgSrc: res.tempFilePaths[0],
          photo: '照片选择成功',
        })
        wx.cloud.uploadFile({
          cloudPath: 'Photos/' + _this.data.openid + _this.data.imgSrc.match(/\.[^.]+?$/)[0],
          filePath: _this.data.imgSrc, // 文件路径
          success: res => {
            // get resource ID
            console.log('照片上传成功', res.fileID)
            _this.setData({
              photo: '照片上传成功，重复上传可覆盖。'
            })
          },
          fail: err => {
            // handle error
            console.log(res)
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
   * 表单提交函数--写入数据库
   */
  checkFormDouble: function() {
    var _this = this;
    var real_specialty = ''
    wx.cloud.callFunction({
      name: "checkall",
      data: {
        collectionName: 'About'
      },
      success(res) {
        if (res.result.data[0].apply == -1) {
          wx.showToast({
            icon: 'none',
            title: '信息获取失败'
          })
        } else if (res.result.data[0].apply == 0) {
          wx.showToast({
            icon: 'none',
            title: '报名尚未开始'
          })
          console.log('报名尚未开始')
        } else if (res.result.data[0].apply == 2) {
          wx.showToast({
            icon: 'none',
            title: '报名已经截止'
          })
          console.log('报名已经截止')
        } else if (name == '' || sex == '' || college == '' || major == '' || phone == '' || stuid == '' || direction == '' || specialty == '' || department == '' || adjust == '' || profile == '' || reward == '' || experience == '' || interest == '' || purpose == '' || (detail_specialty_flag && detail_specialty == '')) {
          wx.showToast({
            icon: 'none',
            title: '请填写所有项目'
          })
        } else if (stuid.length != 11 || phone.length != 11) {
          if (stuid.length == 11 && phone.length != 11) {
            wx.showToast({
              icon: 'none',
              title: '请正确填写电话'
            })
          } else if (stuid.length != 11 && phone.length == 11) {
            wx.showToast({
              icon: 'none',
              title: '请正确填写学号'
            })
          } else if (stuid.length != 11 && phone.length != 11) {
            wx.showToast({
              icon: 'none',
              title: '请正确填写电话和学号'
            })
          }
        } else if (stuid.charAt(1) != '9') {
          wx.showToast({
            icon: 'none',
            title: '本次只招收2019级本科新生'
          })
        } else if (photo != '照片上传成功，重复上传可覆盖。') {
          if (photo == '未选择，点击选择照片') {
            wx.showToast({
              icon: 'none',
              title: '请选择并上传照片'
            })
          } else if (photo == '照片选择成功,正在上传...') {
            wx.showToast({
              icon: 'none',
              title: '正在上传照片，请等待上传完成后提交'
            })
          }
        } else {
          wx.showLoading({
            title: '正在提交',
          })
          wx.cloud.callFunction({
            name: "login",
            data: {},
            success(res) {
              console.log("用户登录成功", res)
              app.globalData.openid = res.result.openid
              const db = wx.cloud.database()
              db.collection('Recruit').where({
                _openid: res.result.openid
              }).get({
                success: function(res) {
                  if (res.data.length == 0) {
                    real_specialty = detail_specialty_flag ? detail_specialty : specialty;
                    db.collection('Recruit').add({
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
                        console.log('[数据库Recruit] [新增记录] 成功，记录 _id: ', res._id)
                        console.log('报名成功，用户进入Msg界面')
                      },
                      fail: err => {
                        wx.showToast({
                          icon: 'none',
                          title: '报名失败'
                        })
                        console.error('[数据库Recruit][新增记录] 失败：', err)
                      }
                    })
                  } else {
                    wx.showToast({
                      icon: 'none',
                      title: '请勿重复提交'
                    })
                  }
                }
              })
            },
            fail(res) {
              wx.showToast({
                  icon: 'none',
                  title: '登陆失败'
                }),
                console.log("用户登录失败", res)
            }
          })
        }
      },
      fail(res) {
        wx.showToast({
          icon: 'none',
          title: '获取信息失败'
        })
        console.log("获取信息失败", res)
      }
    })
  },
  ToCheck: function() {
    wx.navigateTo({
      url: '../Check/Check'
    })
    console.log('用户进入搜索界面')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.cloud.callFunction({
      name: "checkall",
      data: {
        collectionName: 'About'
      },
      success(res) {
        that.setData({
          noticeText: res.result.data[0].noticeTextAtEmploy
        })
      },
      fail(res) {
        that.setData({
          noticeText: '信息获取失败，请检查网络状态后重试。'
        })
      }
    })
    wx.cloud.callFunction({
      name: "login",
      data: {},
      success(res) {
        console.log("用户登录成功", res)
        app.globalData.openid = res.result.openid
        that.setData({
          openid: res.result.openid
        })
        const db = wx.cloud.database()
        db.collection('Recruit').where({
          _openid: res.result.openid
        }).get({
          success: function(res) {
            if (res.data.length != 0) {
              console.log("信息查询成功，找到报名信息", res.data[0])
              that.setData({
                showButton: false, //不显示提交按钮
                photo: '已报名，照片已上传',
                disable_upload_photo: true //禁止照片上传
              })
            } else {
              console.log("信息查询成功,未找到报名信息")
            }
          }
        })
      }
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