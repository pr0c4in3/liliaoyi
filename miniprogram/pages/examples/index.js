// index.js
// const app = getApp()
// const { envList } = require('../../envList.js');
Page({
  data: {
    isLogin: false,
    userInfo: {}
  },
  onLoad: function() {
    this.checkLoginStatus();
  },
  checkLoginStatus: function() {
    // 检查登录状态，这里以localStorage模拟，实际项目中可能需要调用后端接口
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        isLogin: true,
        userInfo: userInfo
      });
    } else {
      this.setData({
        isLogin: false
      });
    }
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

// Page({
//   data: {
//     showUploadTip: false,
//     powerList: [
//       {
//         title: '云函数',
//         tip: '安全、免鉴权运行业务代码',
//         showItem: false,
//         item: [
//           {
//             type: 'getOpenId',
//             title: '获取OpenId',
//           },
//           {
//             type: 'getMiniProgramCode',
//             title: '生成小程序码',
//           },
//         ],
//       },
//       {
//         title: '数据库',
//         tip: '安全稳定的文档型数据库',
//         showItem: false,
//         item: [
//           {
//             type: 'createCollection',
//             title: '创建集合',
//           },
//           {
//             type: 'selectRecord',
//             title: '查询记录',
//           },
//           {
//             title: '更新记录',
//             page: 'updateRecord',
//           },
//           {
//             title: '聚合操作',
//             page: 'sumRecord',
//           },
//         ],
//       },
//       {
//         title: '云存储',
//         tip: '自带CDN加速文件存储',
//         showItem: false,
//         item: [
//           {
//             type: 'uploadFile',
//             title: '上传文件',
//           },
//         ],
//       },
//       {
//         type: 'singleTemplate',
//         title: '云模板',
//         tip: '基于页面模板，快速配置、搭建小程序页面',
//         tag: 'new',
//       },
//       {
//         type: 'cloudBackend',
//         title: '云后台',
//         tip: '开箱即用的小程序后台管理系统',
//       },
//       {
//         title: '云托管',
//         tip: '不限语言的全托管容器服务',
//         link: 'https://cloud.weixin.qq.com/cloudrun',
//       },
//     ],
//     envList,
//     selectedEnv: envList?.[0],
//     haveCreateCollection: false,
//   },
//   onClickPowerInfo(e) {
//     const index = e.currentTarget.dataset.index;
//     const powerList = this.data.powerList;
//     const selectedItem = powerList[index];
//     selectedItem.showItem = !selectedItem.showItem;
//     if (selectedItem.link) {
//       wx.navigateTo({
//         url: `../web/index?url=${selectedItem.link}&title=${selectedItem.title}`,
//       });
//     } else if (selectedItem.type) {
//       wx.navigateTo({
//         url: `/pages/exampleDetail/index?envId=${this.data.selectedEnv?.envId}&type=${selectedItem.type}`,
//       });
//     } else if (selectedItem.page) {
//       wx.navigateTo({
//         url: `/pages/${selectedItem.page}/index`,
//       });
//     } else if (
//       selectedItem.title === '数据库' &&
//       !this.data.haveCreateCollection
//     ) {
//       this.onClickDatabase(powerList);
//     } else {
//       this.setData({
//         powerList,
//       });
//     }
//   },

//   onChangeShowEnvChoose() {
//     wx.showActionSheet({
//       itemList: this.data.envList.map((i) => i.alias),
//       success: (res) => {
//         this.onChangeSelectedEnv(res.tapIndex);
//       },
//       fail(res) {
//         console.log(res.errMsg);
//       },
//     });
//   },

//   onChangeSelectedEnv(index) {
//     if (this.data.selectedEnv?.envId === this.data.envList?.[index]?.envId) {
//       return;
//     }
//     const powerList = this.data.powerList;
//     powerList.forEach((i) => {
//       i.showItem = false;
//     });
//     this.setData({
//       selectedEnv: this.data.envList[index],
//       powerList,
//       haveCreateCollection: false,
//     });
//   },

//   jumpPage(e) {
//     const { type, page } = e.currentTarget.dataset;
//     if (type) {
//       wx.navigateTo({
//         url: `/pages/exampleDetail/index?envId=${this.data.selectedEnv?.envId}&type=${type}`,
//       });
//     } else {
//       wx.navigateTo({
//         url: `/pages/${page}/index?envId=${this.data.selectedEnv?.envId}`,
//       });
//     }
//   },

//   onClickDatabase(powerList) {
//     wx.showLoading({
//       title: '',
//     });
//     wx.cloud
//       .callFunction({
//         name: 'quickstartFunctions',
//         config: {
//           env: this.data.selectedEnv?.envId,
//         },
//         data: {
//           type: 'createCollection',
//         },
//       })
//       .then((resp) => {
//         if (resp.result.success) {
//           this.setData({
//             haveCreateCollection: true,
//           });
//         }
//         this.setData({
//           powerList,
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
// });
