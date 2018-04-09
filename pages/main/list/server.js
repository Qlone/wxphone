const app = getApp();
const count = require('../home/count.js');
const util = require('../../../utils/util.js')

//获取数据
const getBillList = that => {
  //获取这个月
  wx.request({
    url: getApp().data.path + '/bill/query', //仅为示例，并非真实的接口地址
    data: {
      token: app.globalData.userId,
      pageNum: that.data.pageNum,
      pageSize:10
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      if (res.data.code == 'SUCCESS') {
        if (res.data.data != null && res.data.data.length > 0){
          for (var i in res.data.data){
            var typeValue = res.data.data[i].type;
            typeValue = typeValue.replace(/{/g, '').replace(/}/g, '');
            var newValue = typeValue.split(',');
            res.data.data[i].type = newValue;
          }

          var bill = that.data.list.concat(res.data.data);

          that.setData({
            list: bill,
            pageNum: that.data.pageNum+1
          })
        }else{
          that.setData({
            isEnd:true
          })
        }
     
      } else if (res.data.code == 'USER_ILLEGEL') {
        util.redirectLogin();
      } else {
        wx.showToast({
          title: '获取失败',
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
module.exports = {
  getBillList: getBillList
}