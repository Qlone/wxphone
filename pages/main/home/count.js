const util = require('../../../utils/util.js')
const app = getApp();
const countMonth = that => {
  //获取这个月
  var d = new Date();
  var t = d.getTime() + 1000 * 60 * 60 * 24;
  var start = new Date();
  var end = new Date(t);
  start.setDate(1);
  wx.request({
    url: getApp().data.path + '/bill/multi', //仅为示例，并非真实的接口地址
    data: {
      token: app.globalData.userId,
      minDate: dataFormate(start),
      maxDate: dataFormate(end)
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      if (res.data.code == 'SUCCESS') {
        var money = res.data.data == null ? 0 : res.data.data.total;
        that.setData({
          count: {
            month: money,
            today: that.data.count.today,
            yestoday: that.data.count.yestoday
          }
        })
      } else if (res.data.code == 'USER_ILLEGEL') {
        util.redirectLogin();
      } else {
        wx.showToast({
          title: '其他错误',
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
}

/**
 * 统计昨天
 */
const countYestoday = that => {
  //获取这个月
  var d = new Date();

  var t = d.getTime() - 1000 * 60 * 60 * 24;
  var start = new Date(t);
  var end = new Date();
  
  wx.request({
    url: getApp().data.path + '/bill/multi', //仅为示例，并非真实的接口地址
    data: {
      token: app.globalData.userId,
      minDate: dataFormate(start),
      maxDate: dataFormate(end)
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      if (res.data.code == 'SUCCESS') {
       
        var money = res.data.data == null ? 0 : res.data.data.total;
        that.setData({
          count: {
            month: that.data.count.month,
            today: that.data.count.today,
            yestoday: money
          }
        })
      } else if (res.data.code == 'USER_ILLEGEL') {
        util.redirectLogin();
      } else {
        wx.showToast({
          title: '其他错误',
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
}

const countToday = that => {
  //获取这个月
  var d = new Date();

  var t = d.getTime() + 1000 * 60 * 60 * 24;
  var start = new Date();
  var end = new Date(t);

  wx.request({
    url: getApp().data.path + '/bill/multi', //仅为示例，并非真实的接口地址
    data: {
      token: app.globalData.userId,
      minDate: dataFormate(start),
      maxDate: dataFormate(end)
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      if (res.data.code == 'SUCCESS') {
        var money = res.data.data == null ? 0 : res.data.data.total;
        that.setData({
          count: {
            month: that.data.count.month,
            today: money,
            yestoday: that.data.count.yestoday
          }
        })
      } else if (res.data.code == 'USER_ILLEGEL') {
        util.redirectLogin();
      } else {
        wx.showToast({
          title: '其他错误',
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
}


const dataFormate= day => {
  var m = day.getMonth() + 1;
  return day.getFullYear() + '-' + m + '-' + day.getDate();
}


module.exports = {
  countMonth: countMonth,
  countYestoday: countYestoday,
  countToday: countToday
}