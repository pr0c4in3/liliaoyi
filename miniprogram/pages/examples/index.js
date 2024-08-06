// index.js
// const app = getApp()
// const { envList } = require('../../envList.js');
Page({
  data: {
    isLogin: false,
    userInfo: {}
  },
  onShow: function() {
    this.checkLoginStatus();
  },
  checkLoginStatus: function() {
    // 检查登录状态
    var that = this;
    wx.checkSession({
      success () {
                         // 从本地存储获取用户信息
        let userInfo = wx.getStorageSync('userInfo');
        that.setData({
              isLogin: true,
              userInfo: userInfo
            });
        console.log('用户信息',that.data.userInfo);
        //session_key 未过期，并且在本生命周期一直有效
      }
    })
    // const userInfo = wx.getStorageSync('userInfo');
    // if (userInfo) {
    //   this.setData({
    //     isLogin: true,
    //     userInfo: userInfo
    //   });
    // } else {
    //   this.setData({
    //     isLogin: false
    //   });
    // }
  },
  goToLogin: function() {
    // 跳转到登录页面
    // 获取当前页面的完整路径（不包括查询字符串）
    // 跳转到应用内的某个页面
    wx.switchTab({
      url: '/pages/user-center/index', // 替换为你的登录页面路径
      success: function(res) {
        console.log('跳转成功');
      },
      fail: function(err) {
        console.error('跳转失败', err);
      }
    });
    
  }
});

