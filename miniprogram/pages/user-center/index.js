// const { envList } = require('../../envList');
Page({
  data: {
    isLogin: false,
    userInfo: {}
  },
  onLogin(e) {
    // 调用微信内置的授权机制
    wx.login({
      success: (res) => {
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'https://your-backend.com/login', // 替换为你的后端登录接口
            method: 'POST',
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
