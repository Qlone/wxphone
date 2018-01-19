// pages/bill_list/bill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item_distance : 20,
    page : 1,
    billList:{
    },
    touch :{
      startX : 0,
      startX : 0,
      times : 1.0
    }
  },

  handletouchmove: function (event) {
    var b = this.data.touch.times;
    var isPull = (event.touches[0].pageY > this.data.touch.startY) ? 1 : 0;
    var x = this.data.touch.times+0.02
    var i = this.data.item_distance + isPull* 1 / (x * x+1);
    this.setData({
      startY: event.touches[0].pageY,
      startX: event.touches[0].pageX,
      item_distance: i
    });
  },
  handletouchstart: function (event){
    this.setData({
      touch :{
        startY: event.touches[0].pageY,
        startX: event.touches[0].pageX,
        times: 1.0
      }
    });
  },
  handletouchend: function(event){
    var offset = this.data.item_distance - 20;
    var i = offset / 300;
    for(var x = 0;x < 300 ;x++){
      var distance = this.data.item_distance - i;
      this.setData({
        item_distance: distance,
        touch: {
          startX: 0,
          startX: 0,
          times: 1.0
        }
      })
    }
    
  },
  httpGetBill: function(that){
    wx.request({
      url: getApp().data.path + "/data/bill/"+ this.data.page,
      data:{

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res){
        
        that.setData({
          billList: res.data.res
        });
        console.log(that.data.billList);
      }
    })
  },
  scrolltolower: function(){
    var that = this;
    wx.request({
      url: getApp().data.path + "/data/bill/" + ++this.data.page,
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var list = that.data.billList.concat(res.data.res);
        that.setData({
          billList: list
        });
        console.log(that.data.billList);
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
    this.httpGetBill(this);
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