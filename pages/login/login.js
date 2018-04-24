// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      account: '',
      psw: '',
      appId: null,
      userId: null,
     
      rePsw: '',
    },
    nick:'',
    regeister: {
      code: '101',
      msg: '确认',
      tips:'没有账号?'
    }
  },
  bindAccountInput:function(e){
    this.setData({
      account : e.detail.value
    })
  },
  bindPswInput:function(e){
    this.setData({
      psw : e.detail.value
    })
  },
  bindRePswInput: function (e) {
    this.setData({
      rePsw: e.detail.value
    })
  },
  bindChangeRegister:function(e){
    if (this.data.regeister.code == '101'){
    this.setData({
      regeister: {
        code: '102',
        msg: '注册',
        tips: '已有账号'
      }
    })
    }else{
      this.setData({
        regeister: {
          code: '101',
          msg: '确定',
          tips: '没有账号?'
        }
      })
    }
  },

  bindconfim: function(){
    var that = this;
    wx.request({
      url: getApp().data.path +'/user/login', //仅为示例，并非真实的接口地址
      data: {
        account: that.data.account,
        psw: that.data.psw
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code == 'USER_SUCCESS'){
          try {     
            that.setData({
              userInfo: {
                userId: res.data.data
              }
            });
            app.globalData.userId = res.data.data;
            wx.setStorageSync('userInfo', res.data.data);
            console.log(res.data.data);
            wx.redirectTo({
              url: '../main/home/home'
            })
          } catch (e) {
          }
        }else{
          console.log(res.data);
          wx.showToast({
            title: '账号密码错误',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail:function(){
        wx.showToast({
          title: '网络连接失败',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },
  //注册
  bindregister: function () {
    var that = this;
    if (that.data.rePsw != that.data.psw){
      wx.showToast({
        title: '密码不一致',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    if (that.data.account == null || that.data.account == '') {
      wx.showToast({
        title: '账号不能为空',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    if (that.data.psw == null || that.data.psw == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    that.setData({
      regeister: {
        code: '102',
        msg: '处理中...',
        tips: '已有账号'
      }
    })


    wx.request({
      url: getApp().data.path + '/user/register', //仅为示例，并非真实的接口地址
      data: {
        account: that.data.account,
        psw: that.data.psw
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code == 'USER_SUCCESS') {
          that.setData({
            regeister: {
              code: '101',
              msg: '确定',
              tips: '没有账号?'
            }
          })
          wx.showToast({
            title: '注册成功',
            icon: 'none',
            duration: 1500
          })
          return;
        } else if(res.data.code == 'USER_ACCOUNT_EXSITS'){
          console.log(res.data);
          wx.showToast({
            title: '账号存在',
            icon: 'none',
            duration: 1500
          })
        }else{
          wx.showToast({
            title: '注册失败',
            icon: 'none',
            duration: 1500
          })
        }
        that.setData({
          regeister: {
            code: '102',
            msg: '注册',
            tips: '已有账号'
          }
        })
      },
      fail: function () {
        wx.showToast({
          title: '网络连接失败',
          icon: 'none',
          duration: 1500
        })
        that.setData({
          regeister: {
            code: '102',
            msg: '注册',
            tips: '已有账号'
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      
      var userId = wx.getStorageSync('userInfo');
      app.globalData.userId = userId;
      wx.request({
        url: getApp().data.path + '/user/check', //仅为示例，并非真实的接口地址
        data: {
          token: userId,

        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.code == 'USER_SUCCESS'){
            if (userId) {
              wx.redirectTo({
                url: '../main/home/home'
              })
            }
          }else{
            wx.showToast({
              title: '请重新登录',
              icon: 'none',
              duration: 1500
            })
          }
         
        },
        fail: function () {
          wx.showToast({
            title: '网络连接失败',
            icon: 'none',
            duration: 1500
          })
        }
      })
      
    } catch (e) {
      // Do something when catch error
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})