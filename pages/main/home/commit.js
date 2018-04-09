const app = getApp();
const count = require('../home/count.js');
const commit = (that,money,typeNames) => {
  that.setData({
    commitSignal: {
      code: '102',
      msg: '提交中...'
    }
  })
  //获取这个月
  wx.request({
    url: getApp().data.path + '/bill/add', //仅为示例，并非真实的接口地址
    data: {
      token: app.globalData.userId,
      money: money,
      type: typeNames
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      if (res.data.code == 'SUCCESS') {
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          duration: 1500
        })
        that.setData({
          money: 0
        });
        count.countMonth(that);
        count.countToday(that);
      } else if (res.data.code == 'USER_ILLEGEL') {
        util.redirectLogin();
      } else {
        wx.showToast({
          title: '失败',
          icon: 'none',
          duration: 1500
        })
      }
    },
    fail: function () {
      wx.showToast({
        title: '网络失败',
        icon: 'none',
        duration: 1500
      })
    },
    complete:function(){
      that.setData({
        commitSignal: {
          code: '101',
          msg: '提交'
        }
      })
    }

  })
}

module.exports = {
  commit: commit
}