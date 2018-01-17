// pages/bill_list/bill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item_distance : 20,
    touch :{
      startX : 0,
      startX : 0
    }
  },

  handletouchmove: function (event) {
    var i = this.data.item_distance +1;
    this.setData({
      item_distance: i
    });
    console.log(this.data.item_distance);
  },
  handletouchstart: function (event){
    console.log(event)
    this.setData({
      touch :{
        startX: event.touches[0].pageY,
        startX: event.touches[0].pageX
      }
    });
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