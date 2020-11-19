// pages/menu/menu.js

const app = getApp()

const cookieUtil = require('../../utils/cookie.js')
const authUtil = require('../../utils/auth.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: null, // 九宫格内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.updateMenuData()
  },

  fillIconData: function(data){
    // var pathPrefix = '../../../resources/icons/application/'
    let pathPrefix = '../../resources/icons/application/'
    for(var index=0; index < data.length; index ++){
      var item = data[index]
      console.log(item.application)
      switch (item.application){
        case 'weather':
          item.icon = pathPrefix + 'application-weather.png'
          console.log('weather')
          break
        case 'stock':
          item.icon = pathPrefix + 'application-stock.png'
          break
        case 'joke':
          item.icon = pathPrefix + 'application-joke.png'
          break
        case 'constellation':
          item.icon = pathPrefix + 'application-constellation.png'
          break
        case 'backup-image':
          item.icon = pathPrefix + 'application-images.png'
          break
      }
    }
    return data
  },

  /**
   * 请求后台，更新menu数据
   */
  updateMenuData: function() {
    console.log(app.globalData.auth.isAuthorized)
    // 获取对象
    var that = this;
    if (!app.globalData.auth.isAuthorized) {
      wx.request({
        url: app.globalData.serverUrl + app.globalData.apiVersion + '/service/menu/list',
        header: {
          'content-type': 'application/json' // 默认值
        },

        success(res) {
          var menuData = res.data.data
          menuData = that.fillIconData(menuData)
          // 配置数据
          that.setData({
            grids: menuData,
          })
        }
      })
    } else {
      var cookie = cookieUtil.getCookieFromStorage()
      var header = {}
      header.Cookie = cookie
      wx.request({
        url: app.globalData.serverUrl + app.globalData.apiVersion + '/service/menu/user',
        header: header,
        success(res) {
          var menuData = []
          if (res.data.data) {
            menuData = res.data.data
            menuData = that.fillIconData(menuData)
          } else {
            wx.showToast({
              title: '用户暂无应用，请点击添加！',
              icon: 'none'
            })
          }
          // 配置数据
          that.setData({
            grids: menuData,
          })
        }
      })
    }
  },

  onNavigatorTap: function(e) {
    var index = e.currentTarget.dataset.index
    var item = this.data.grids[index]
    if (item.application == 'weather') {
      wx.navigateTo({
        url: '../weather/weather',
      })
    } else if (item.application == 'backup-image') {
      wx.navigateTo({
        url: '../backup/backup',
      })
    } else if (item.application == 'stock') {
      wx.navigateTo({
        url: '../stock/stock'
      })
    } else if (item.application == 'joke') {
      wx.navigateTo({
        url: '../service/service?type=joke'
      })
    } else if (item.application == 'constellation') {
      wx.navigateTo({
        url: '../service/service?type=constellation',
      })
    }
  },

  moreApp: function() {
    console.log('moreApp')
    var that = this
    var promise = authUtil.getStatus(app)
    promise.then(function(status){
      if (!status){
        wx.showToast({
          title: '请先登录',
          icon: 'none'
        })
        return
      }else{
        wx.navigateTo({
          url: '../applist/applist?userMenu=' + JSON.stringify(that.data.grids),
        })
      }
    })

  },

  onPullDownRefresh: function() {
    wx.showLoading({
      title: '加载中',
    })
    this.updateMenuData()
    wx.hideLoading()
  }
})