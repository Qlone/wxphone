// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',
    typeArray:['新建','吃喝','其他'],
    sumbitBtnCss:'submit-view',
    sumbitBtnBind:'submitClick',
    sumbitBtnMsg:'提交',
    index: 0,
    submitTipVisibile:true,
    submitTips:'提交成功'
    
  },
  bindPickerChange: function (e) {
  
    this.setData({
      index: e.detail.value
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  submitClick: function(){
    this.setData({
      sumbitBtnCss : 'submit-view submit-view-click',
      sumbitBtnMsg : '提交中...',
      sumbitBtnBind : '',
      submitTipVisibile :false
    });
    this.httprequst(this);
    
  },
  /**
   * 网络请求
   */
  httprequst : function(instance){
    var instanceApp = getApp();
    wx.request({
      url: instanceApp.data.path + '/menu/income', //仅为示例，并非真实的接口地址
      data: {
        money: this.data.inputValue,
        type: this.data.typeArray[this.data.index]
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        instance.setData({
          submitTips: res.data.res?'提交成功':'提交失败',
          sumbitBtnMsg: '提交',
          submitTipVisibile : true,
          sumbitBtnCss: 'submit-view',
          sumbitBtnBind: 'submitClick'
        })
      },
      fail:function(){
        instance.setData({
          submitTips: '网络错误',
          sumbitBtnMsg: '提交',
          submitTipVisibile: true,
          sumbitBtnCss: 'submit-view',
          sumbitBtnBind: 'submitClick'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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