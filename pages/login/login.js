// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nick: '',
      phone: '',
      appId: null,
      userId: null
    },
    nick:''
  },
  bindNickInput:function(e){
    this.setData({
      nick : e.detail.value
    })
  },
  bindPhoneInput:function(e){
    this.setData({
      phone : e.detail.value
    })
  },

  bindconfim: function(){
    var that = this;
    wx.request({
      url: getApp().data.path +'/user/id', //仅为示例，并非真实的接口地址
      data: {
        activeCode: that.data.nick
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.data.res != null){
          try {     
            that.setData({
              userInfo: {
                userId: res.data.res
              }
            });
            app.globalData.userId = res.data.res;
            wx.setStorageSync('userInfo', res.data.res);
            console.log(res.data.res);
            wx.redirectTo({
              url: '../home/home'
            })
          } catch (e) {
          }
        }else{
          wx.showToast({
            title: '错误激活码',
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      
      var userId = wx.getStorageSync('userInfo');
      app.globalData.userId = userId;
      if (userId) {
        wx.redirectTo({
          url: '../home/home'
        })
      }
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