const cookieUtil = require('cookie.js')

function buildHeader() {
  var cookie = cookieUtil.getCookieFromStorage()
  var header = {}
  header.Cookie = cookie
  return header
}

function getWeather(app, withCookie) {
  var url = app.globalData.serverUrl + app.globalData.apiVersion + '/service/weather'
  var header = {}
  if (withCookie) {
    header = buildHeader()
  }
  var promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      header: header,
      success: function (res) {
        if (res) {
          resolve(res.data.data)
        }
      }
    })
  });
  return promise
}

function getConstellation(app, withCookie) {
  var url = app.globalData.serverUrl + app.globalData.apiVersion + '/service/constellation'
  var header = {}
  if (withCookie) {
    header = buildHeader()
  }
  var promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      header: header,
      success: function (res) {
        if (res) {
          resolve(res.data.data)
        }
      }
    })
  });
  return promise
}

function getStock(app, withCookie) {
  var url = app.globalData.serverUrl + app.globalData.apiVersion + '/service/stock'
  var header = {}
  if (withCookie) {
    header = buildHeader()
  }
  var promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      header: header,
      success: function (res) {
        if (res) {
          resolve(res.data.data)
        }
      }
    })
  });
  return promise
}

function getJoke(app) {
  var url = app.globalData.serverUrl + app.globalData.apiVersion + '/service/joke'
  var promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      success: function (res) {
        if (res) {
          resolve(res.data.data)
        }
      }
    })
  });
  return promise
}

module.exports = {
  getWeather: getWeather,
  getConstellation: getConstellation,
  getStock: getStock,
  getJoke: getJoke
}