//index.js
//获取应用实例
const app = getApp()
const cookieUtil = require('../../utils/cookie.js')
const authUtil = require('../../utils/auth.js')
const serviceUtil = require('../../utils/service.js')

Page({
  data: {
    isAuthorized: false,
    constellationData: null,
    stockData: null,
    weatherData: null
  },

  updateData: function() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var weatherPromise = serviceUtil.getWeather(app, true)
    weatherPromise.then(function(data){
      that.setData({
        weatherData: data
      })
      wx.hideLoading()
    })

    var constellationPromise = serviceUtil.getConstellation(app, true)
    constellationPromise.then(function (data) {
      that.setData({
        constellationData: data
      })
      wx.hideLoading()
    })

    var stockPromise = serviceUtil.getStock(app, true)
    stockPromise.then(function (data) {
      that.setData({
        stockData: data
      })
      wx.hideLoading()
    })
  },

  updateStatusAndData: function(){
    var that = this
    var promise = authUtil.getStatus(app)
    promise.then(function(status){
      if (status) {
        that.updateData()
        that.setData({
          isAuthorized: true
        })
      } else {
        that.setData({
          isAuthorized: false
        })
        wx.showToast({
          title: '请先授权登录',
        })
      }
    })
    
  },

  onPullDownRefresh: function() {
    this.updateStatusAndData()
  },

  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var that = this
    // 获取与django授权得到的sessionid
    this.updateStatusAndData()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})