
const cookieUtil = require('cookie.js')

function buildHeader(){
  var cookie = cookieUtil.getCookieFromStorage()
  var header = {}
  header.Cookie = cookie
  return header
}

/**
 * 查询用户状态
 * 
 * @param app 全局唯一的app实例
 */
function getStatus(app){
  var url = app.globalData.serverUrl + '/api/v1.0/auth/status'
  var header = buildHeader()
  var promise = new Promise(function(resolve, reject){
    wx.request({
      url: url,
      header: header,
      success: function(res){
        if (res.data.data.is_authorized){
          resolve(true)
        }else{
          resolve(false)
        }
      }
    })
  })
  return promise
}

function authorize(app, data) {
  var url = app.globalData.serverUrl + app.globalData.apiVersion + '/auth/authorize'

  var header = {}
  var promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      success: function (res) {
        resolve(res)
      }
    })
  });
  return promise
}

function logout(app) {
  var url = app.globalData.serverUrl + app.globalData.apiVersion + '/auth/logout'

  var header = buildHeader()
  var promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      header: header,
      success: function (res) {
        console.log(res.data.result_code)
        if (res.data.result_code == 0) {
          resolve(true)
        } else {
          resolve(false)
        }
      }
    })
  });
  return promise
}

module.exports = {
  getStatus: getStatus,
  authorize: authorize,
  logout: logout
}