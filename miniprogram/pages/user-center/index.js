// const { envList } = require('../../envList');
Page({
  data: {
    isLogin: false,
    isHaveName: false,
    userInfo: {}
  },
  
  onShow: function() {
    this.checkLoginStatus();
    this.isName();
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
  },
  onLogin: function(e) {
    // 定义发送用户信息到后台的函数
    function sendUserInfoToBackend(userInfo) {
      // // 从本地存储中读取用户信息
      // const userInfo = wx.getStorageSync('userInfo');
      
      // 检查用户信息是否存在
      if (userInfo) {
        // 发送用户信息到后台
        const app = getApp();
        const baseURL = app.globalData.baseURL; // 获取 baseURL
        wx.request({
          url: baseURL+'user',
          // url: 'http://127.0.0.1:8080/user', // 替换为你的后台API地址
          method: 'POST',
          data: {
            userInfo: userInfo
          },
          success: (res) => {
            console.log('用户信息发送成功', res);
            // 这里可以处理发送成功后的逻辑
          },
          fail: (err) => {
            console.error('发送用户信息失败', err);
            // 这里可以处理发送失败的逻辑
          }
        });
      } else {
        console.error('用户信息不存在');
        // 这里可以处理用户信息不存在的逻辑，例如提示用户重新授权
      }
    }


    // 调用微信内置的授权机制
    wx.login({
      success: (res) => {
        if (res.code) {
          const app = getApp();
          const baseURL = app.globalData.baseURL; // 获取 baseURL
          // 发起网络请求到本地服务器
          wx.request({
            url: baseURL+'login',
            // url: 'http://6401f344.r3.cpolar.cn/login',
            // url: 'http://127.0.0.1:8080/login', // 替换为你的本地服务器地址和登录接口路径
            method: 'POST',
            header: {
              'content-type': 'application/json' // 设置请求头为JSON类型
            },
            data: {
              code: res.code
            },
            success: (res) => {
              if (res.data.success) {
                // 获取用户信息
                // 检查用户是否已授权
                wx.getSetting({
                  success: res => {
                    if (res.authSetting['scope.userInfo']) {
                      // 已经授权，获取用户信息
                      wx.getUserInfo({
                        success: res => {
                          // 存储用户信息到全局变量
                          wx.setStorageSync('userInfo', res.userInfo);
                          //this.globalData.userInfo = res.userInfo;

                          // 发送用户信息到后台
                          sendUserInfoToBackend(res.userInfo);
                        }
                      });
                    }
                  }
                });
                // 假设后端返回用户信息
                this.setData({
                  isLogin: true,
                  userInfo: res.data.userInfo
                });
                // 存储用户信息到本地存储
                wx.setStorageSync('userInfo', this.data.userInfo);
                console.log(this.data.userInfo);
              } else {
                wx.showToast({
                  title: '登录失败',
                  icon: 'none'
                });
              }
            },
            fail: function(error) {
              console.error('请求失败', error);
              wx.showToast({
                title: '请求失败',
                icon: 'none'
              });
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg);
        }
      }
    });
    console.log("刷新页面");
    this.onShow();
  },
  isName: function(e) {
    let userInfo = wx.getStorageSync('userInfo');
    // console.log('name',userInfo.nickName);
    if(userInfo.nickName=='微信用户'||userInfo.nickName==null){
      this.setData({
        isHaveName:false
      })
      // console.log(this.isHaveName);
    }else{
      this.setData({
        isHaveName:true
      })
      // console.log(this.isHaveName);
    }
    console.log(this.isHaveName);
  },
  formsubmit(e){
    const nickName = e.detail.value.nickname;
    let userInfo = wx.getStorageSync('userInfo');
    userInfo.nickName=nickName;
    wx.setStorageSync('userInfo', userInfo);
    console.log("nickName", nickName)
    this.onShow();
    // do something
  }
});



