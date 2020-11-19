// pages/service/service.js

const app = getApp()
const serviceUtil = require('../../utils/service.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isConstellationView: false,
    isJokeView: false,
    constellationData: null,
    jokeData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var isConstellationViewTmp = false
    var isJokeViewTmp = false
    if (options.type == 'joke'){
      isJokeViewTmp = true
      this.updateJokeData()
    }else{
      isConstellationViewTmp = true
      this.updateConstellationData()
    }
    this.setData({
      isConstellationView: isConstellationViewTmp,
      isJokeView: isJokeViewTmp
    })
  },

  updateConstellationData: function() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var promise = serviceUtil.getConstellation(app, false)
    promise.then(function(data){
      that.setData({
        constellationData: data
      })
      wx.hideLoading()
    })
  },

  updateJokeData: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var promise = serviceUtil.getJoke(app)
    promise.then(function(data){
      that.setData({
        jokeData: data
      })
      wx.hideLoading()
    })
  },
})