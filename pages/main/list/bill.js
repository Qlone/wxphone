// pages/main/list/bill.js
const server = require('../list/server.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    pageNum: 1,
    pageSize: 10,
    isEnd:false,
    open:''
  },
  onBindScroll: function(){
    if (!this.data.isEnd){
      server.getBillList(this);
    }else{
      wx.showToast({
        title: '没有了',
        icon: 'none',
        duration: 1500
      })
    }
  },
  bindClick:function(e){
    var value = e.currentTarget.dataset.id;
    if (this.data.open == value){
      value = ''
    }
    this.setData({
      open: value
    })
  },
  bindDelete:function(e){
    var value = e.currentTarget.dataset.id;
    server.deleteBill(this,value);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    server.getBillList(this);
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