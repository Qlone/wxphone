// pages/main/home/home.js
const app = getApp();
//logs.js
const count = require('../home/count.js');
const label = require('../home/label.js');
const commit = require('../home/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:{
      month: 0,
      yestoday: 0,
      today: 0
    },
    
    typeArray: ['获取中...'],
    chooseType: [],
    firstChoose:true,
    initType:true,
    moneyAdd:false,
    money: 0,
    index: 0,
    state: 0 ,//0 正常选择
    inputType: '',
    addSignal:{
      code:'101',
      msg:'确定'
    },
    deleteSignal: {
      code: '101',
      msg: '返回'
    },
    commitSignal:{
      code: '101',
      msg: '提交'
    }
  },
  //获取统计----------------start
  //绑定选择器
  bindPickerChange: function (e) {
    
    this.setData({
      index: e.detail.value
    });
   
    var array =  this.data.chooseType;
    if (this.data.firstChoose){
      array.splice(0,1);
      this.setData({
        firstChoose: !this.data.firstChoose
      })
    }
    console.log(this.data.firstChoose);
    array.push(this.data.typeArray[e.detail.value]);
    this.setData({
      chooseType: array
    })
  },
  //绑定编辑选择器
  bindPickerEditChange: function (e) {

    this.setData({
      index: e.detail.value
    });
  },
  bindEditBtn:function(e){
    this.setData({
      state: 1
    });
  },
  bindReturnBtn: function (e) {
    this.setData({
      state: 0
    });
  },
  bindCancleBtn: function (e) {
    this.setData({
      state: 0
    });
  },
  bindAddBtn: function (e) {
    this.setData({
      state: 2
    });
  },
  bindKeyInput: function (e) {
    this.setData({
      inputType: e.detail.value
    })
  },
  bindMoney: function (e) {
    this.setData({
      money: e.detail.value
    })
  },
  bindMoneyAdd: function (e) {
    this.setData({
      moneyAdd: !this.data.moneyAdd
    })
  },
  bindSummit:function(){
    if(this.data.money == 0 || this.data.money == null){
      wx.showToast({
        title: '金额为空',
        icon: 'none',
        duration: 1500
      })
    } else if (this.data.chooseType == null || this.data.chooseType.length < 1){
      wx.showToast({
        title: '请选择类型',
        icon: 'none',
        duration: 1500
      })
    }else{
      var resMoney = this.data.moneyAdd ? this.data.money : -1 * this.data.money
      commit.commit(this, resMoney,this.data.chooseType);
    }
  },
  bindInputConfirm: function(){
    label.addType(this, this.data.inputType);
  },
  bindDelete:function(){
    label.deleteType(this, this.data.typeArray[this.data.index]);
  },
  bindconfim:function(){
    count.countMonth(this);
    count.countYestoday(this);
    count.countToday(this);
  },
  
  //获取统计----------------end
  bindType:function(e){
    var array = this.data.chooseType;
    var i = e.currentTarget.dataset.typeindex;
    array.splice(i,1);
    this.setData({
      chooseType: array
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.bindconfim();
    //获取标签
    label.getType(this);
    
 
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