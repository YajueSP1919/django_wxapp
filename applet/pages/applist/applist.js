// pages/applist/applist.js

const app = getApp()
const cookieUtil = require('../../utils/cookie.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allAppData: [1, 2],
    userAppData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = JSON.parse(options.userMenu)
    this.setData({
      userAppData: data
    })
    var that = this
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/service/menu/list',
      header: {
        'content-type': 'application/json' // 默认值
      },

      success(res) {
        var menu_data = res.data.data;
        // 配置数据
        that.setData({
          allAppData: menu_data,
        }
        )
      }
    })
  },

  bindAppPickerChange: function(e) {
    var index = e.detail.value
    var newApp = this.data.allAppData[index]
    for(var i = 0; i < this.data.userAppData.length; i ++){
      if(this.data.userAppData[i].appid == newApp.appid){
        return
      }
    }
    var newUserAppData = this.data.userAppData
    newUserAppData.push(newApp)
    this.setData({
      userAppData: newUserAppData
    })
  },

  onSave: function(isShowModal){
    var that = this
    var header = {}
    var cookie = cookieUtil.getCookieFromStorage()
    header.Cookie = cookie
    wx.request({
      url: app.globalData.serverUrl + '/api/v1.0/service/menu/user',
      method: 'POST',
      data: {
        data: this.data.userAppData
      },
      header: header,
      success(res) {
        if (isShowModal) {
          wx.showToast({
            title: '保存成功',
          })
        }
      }
    })
  },

  deleteItem: function(e){
    var that = this
    var index = e.currentTarget.dataset.index
    wx.showModal({
      content: "确认删除此项吗？",
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          var appData = that.data.userAppData
            appData.splice(index, 1)
          that.setData({
            userAppData: appData
          })
          that.onSave(false)
        }
      }
    })
  }
})