// const { envList } = require('../../envList');
Page({
  data: {
    isLogin: false,
    userInfo: {}
  },
  onLogin: function(e) {
    // 调用微信内置的授权机制
    wx.login({
      success: (res) => {
        if (res.code) {
          // 发起网络请求到本地服务器
          wx.request({
            url: 'http://127.0.0.1:8080/login', // 替换为你的本地服务器地址和登录接口路径
            method: 'POST',
            header: {
              'content-type': 'application/json' // 设置请求头为JSON类型
            },
            data: {
              code: res.code
            },
            success: (res) => {
              if (res.data.success) {
                // 假设后端返回用户信息
                this.setData({
                  isLogin: true,
                  userInfo: res.data.userInfo
                });
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
  }
});



// // pages/me/index.js
// Page({
  /**
   * 页面的初始数据
   */
//   data: {
//     openId: '',
//     showUploadTip: false,
//   },

//   getOpenId() {
//     wx.showLoading({
//       title: '',
//     });
//     wx.cloud
//       .callFunction({
//         name: 'quickstartFunctions',
//         data: {
//           type: 'getOpenId',
//         },
//       })
//       .then((resp) => {
//         this.setData({
//           haveGetOpenId: true,
//           openId: resp.result.openid,
//         });
//         wx.hideLoading();
//       })
//       .catch((e) => {
//         this.setData({
//           showUploadTip: true,
//         });
//         wx.hideLoading();
//       });
//   },

//   gotoWxCodePage() {
//     wx.navigateTo({
//       url: `/pages/exampleDetail/index?envId=${envList?.[0]?.envId}&type=getMiniProgramCode`,
//     });
//   },
// });
