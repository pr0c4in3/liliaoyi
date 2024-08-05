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
          const res = wx.cloud.callContainer({
            config: {
              env: 'prod-6gqmrfeze3773805', // 微信云托管的环境ID
            },
            path: '/login', // 填入业务自定义路径和参数，根目录，就是 / 
            method: 'POST', // 按照自己的业务开发，选择对应的方法
            header: {
              'X-WX-SERVICE': 'liliaoyi-backward', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称），在上述实践中是 demo
            }
            // 其余参数同 wx.request
          });
          
          console.log(res);
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
