const app = getApp();
const util = require('../../../utils/util.js')
const getType = that => {
  that.setData({
    typeArray: ['获取中...'],
    index: 0
  })
  //获取这个月
  wx.request({
    url: getApp().data.path + '/label/query', //仅为示例，并非真实的接口地址
    data: {
      token: app.globalData.userId,
      pageSize: 100
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      if (res.data.code == 'SUCCESS') {
        var obj = res.data.data; 
        var res = [];
        for (var i in obj) {
          res.push(obj[i].type);
        }
        that.setData({
          typeArray: res,
          index: 0
        });
        //初始化一个标签
        if (that.data.initType){
          var array = that.data.chooseType;
          array.push(that.data.typeArray[0]);
          that.setData({
            chooseType: array,
            initType: !that.data.initType
          });
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
//添加新的label
const addType = (that,typeName) => {
  that.setData({
    addSignal: {
      code: '102',
      msg: '添加中'
    }
  })
  //获取这个月
  wx.request({
    url: getApp().data.path + '/label/add', //仅为示例，并非真实的接口地址
    data: {
      token: app.globalData.userId,
      type: typeName
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      if (res.data.code == 'SUCCESS') {
        getType(that);
        wx.showToast({
          title: '添加成功',
          icon: 'none',
          duration: 1500})
      } else if (res.data.code == 'USER_ILLEGEL') {
        util.redirectLogin();
      } else {
        wx.showToast({
          title: '添加失败',
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
    },
    complete: function () {
      that.setData({
        addSignal: {
          code: '101',
          msg: '确定'
        }
      })
    }
  })
}

//删除label
const deleteType = (that, typeName) => {
  that.setData({
    deleteSignal: {
      code: '102',
      msg: '处理中'
    }
  })
  //获取这个月
  wx.request({
    url: getApp().data.path + '/label/del', //仅为示例，并非真实的接口地址
    data: {
      token: app.globalData.userId,
      type: typeName
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      if (res.data.code == 'SUCCESS') {
        getType(that);
        wx.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 1500
        })
      } else if (res.data.code == 'USER_ILLEGEL') {
        util.redirectLogin();
      } else {
        wx.showToast({
          title: '删除失败',
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
    },
    complete: function(){
      that.setData({
        deleteSignal: {
          code: '101',
          msg: '返回'
        }
      })
    }
  })
}

module.exports = {
  getType: getType,
  addType: addType,
  deleteType: deleteType
}