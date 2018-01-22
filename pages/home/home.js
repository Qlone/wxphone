// pages/home/home.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',
    typeArray:['获取类型中...','吃喝','其他'],
    sumbitBtnCss:'submit-view',
    sumbitBtnBind:'submitClick',
    sumbitBtnMsg:'提交',
    index: 0,
    submitTipVisibile:false,
    submitTips:'提交成功',
    isIncome:false,
    newType: false,
    newTypeText:'新的类型'
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
  bindtypeinput: function(e){
    this.setData({
      newTypeText: e.detail.value
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
        money: this.data.isIncome ? this.data.inputValue : -1*this.data.inputValue,
        type: this.data.newType ? this.data.newTypeText : this.data.typeArray[this.data.index],
        newType: this.data.newType,
        userId : app.globalData.userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        if (instance.data.newType){
          instance.initType();
        }
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
  chooseIncome:function(){
    this.setData({
      isIncome: true
    })
  },
  chooseConSume: function () {
    this.setData({
      isIncome: false
    })
  },
  newTypeSwitch: function(){
    this.setData({
      newType: !this.data.newType
    })
  },
  initType:function(){
    var that = this;
    wx.request({
      url: getApp().data.path + '/menu/type', //仅为示例，并非真实的接口地址
      data: {
        userId : app.globalData.userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.res);
        var list = [];
        for(var value in res.data.res){
          list.push(res.data.res[value].type);
        };
        that.setData({
          typeArray: list
        })
      },
      fail: function () {
        
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
    this.initType();
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