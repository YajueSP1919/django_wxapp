// pages/homepage/homepage.js

const app = getApp()
const cookieUtil = require('../../utils/cookie.js')
const authUtil = require('../../utils/auth.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  onReadCookies: function() {
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/auth/test',
      success(res) {
        var cookie = cookieUtil.getSessionIDFromResponse(res)
        console.log(cookie)
      }
    })
  },

  // navigator跳转处理
  onNavigatorTap: function(event) {
    var that = this
    var promise = authUtil.getStatus(app)
    promise.then(function(isAuthorized) {
      if (isAuthorized) {
        that.setData({
          isLogin: true
        })
      } else {
        that.setData({
          isLogin: false
        })
        wx.showToast({
          title: '请先授权登录',
        })
      }

      if (isAuthorized) {
        // 获取由 data-type 标签传递过来的参数
        console.log(event.currentTarget.dataset.type)
        var navigatorType = event.currentTarget.dataset.type
        if (navigatorType == 'focusCity') {
          navigatorType = 'city'
        } else if (navigatorType == 'focusStock') {
          navigatorType = 'stock'
        } else {
          navigatorType = 'constellation'
        }
        var url = '../picker/picker?type=' + navigatorType
        console.log('navigateTo url: ' + url)
        wx.navigateTo({
          url: '../picker/picker?type=' + navigatorType,
        })
      }
    })
  },

  authorize: function() {
    console.log('authorize')
    var that = this
    // 登陆并获取cookie
    wx.login({
      success: function(res) {
        console.log(res)
        var code = res.code
        var appId = app.globalData.appId
        var nickname = app.globalData.userInfo.nickName
        // 请求后台

        var data = {
          code: code,
          appId: appId,
          nickname: nickname
        }
        var promise = authUtil.authorize(app, data)
        promise.then(function(resultData) {
          if (resultData.data.result_code == 0) {
            wx.showToast({
              title: '授权成功',
            })
            // 保存cookie
            var cookie = cookieUtil.getSessionIDFromResponse(resultData)
            cookieUtil.setCookieToStorage(cookie)
            that.setData({
              isLogin: true,
              userInfo: app.globalData.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
    })
  },

  logout: function() {
    var that = this
    var promise = authUtil.logout(app)
    promise.then(function(promiseData) {
      console.log(promiseData)
      if (promiseData) {
        that.setData({
          isLogin: false,
          userInfo: null,
          hasUserInfo: false
        })
        cookieUtil.setCookieToStorage('')
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var promise = authUtil.getStatus(app)
    promise.then(function(status){
      if (status) {
        that.setData({
          isLogin: true,
        })
      } else {
        that.setData({
          isLogin: false,
        })
      }
    })
  },

  onAuthorizeConfirm: function(res){
    var userInfo = res.detail.userInfo
    app.globalData.userInfo = userInfo
    this.authorize()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})