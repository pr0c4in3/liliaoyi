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
    if(this.data.isLogin){
      this.getUserUsageTime();
      this.getUserInfo();
      this.getUserPhoto();
    }
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
    
  },
  goToUse: function() {
    // 跳转到登录页面
    // 获取当前页面的完整路径（不包括查询字符串）
    // 跳转到应用内的某个页面
    wx.navigateTo({
      url: '/pages/therapy/index', // 替换为你的登录页面路径
      success: function(res) {
        console.log('跳转成功');
      },
      fail: function(err) {
        console.error('跳转失败', err);
      }
    });
  },
  goToInfo: function() {
    // 跳转到提交信息
    wx.navigateTo({
      url: '/pages/submit-info/index', // 替换为你的登录页面路径
      success: function(res) {
        console.log('跳转成功');
      },
      fail: function(err) {
        console.error('跳转失败', err);
      }
    });
  },


  getUserUsageTime: function() {
    console.log('gettime')
    let info= wx.getStorageSync('userInfo');
    const nickname = info.nickName;
    const app = getApp();
    const baseURL = app.globalData.baseURL; // 获取 baseURL

    wx.request({
      // url: 'http://127.0.0.1:8080/getUseTime', // 替换为你的后端地址
      // url: 'http://6401f344.r3.cpolar.cn/getUseTime',
      url: baseURL+'getUseTime',
      method: 'POST',
      data: {
        nickname: nickname
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res.data)
          this.setData({
            usageRecords: res.data 
          });
        } else {
          wx.showToast({
            title: '获取数据失败',
            icon: 'none'
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        });
      }
    });
  },
  getUserInfo: function() {
    console.log('getinfo')
    let info= wx.getStorageSync('userInfo');
    const nickname = info.nickName;
    const app = getApp();
    const baseURL = app.globalData.baseURL; // 获取 baseURL
    wx.request({
      // url: 'http://127.0.0.1:8080/getUserInfo', // 替换为你的后端地址
      // url: 'http://6401f344.r3.cpolar.cn/getUserInfo',
      url: baseURL+'getUserInfo',
      method: 'POST',
      data: {
        nickname: nickname
      },
      success: (res) => {
        if (res.statusCode === 200) {
          // console.log(res.data)
          this.setData({
            personInfo: res.data 
          });
          console.log(this.data.personInfo)
        } else {
          // wx.showToast({
          //   title: '获取数据失败',
          //   icon: 'none'
          // });
        }
      },
      fail: () => {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        });
      }
    });
  },
  getUserPhoto: function() {
    console.log('getphoto')
    let info= wx.getStorageSync('userInfo');
    const nickname = info.nickName;
    const that =this;
    const app = getApp();
    const baseURL = app.globalData.baseURL; // 获取 baseURL
    wx.request({
      // url: 'http://127.0.0.1:8080/getPhoto', // 替换为你的后端地址
      // url: 'http://6401f344.r3.cpolar.cn/getPhoto',
      url: baseURL+'getPhoto',
      method: 'POST',
      data: {
        nickname: nickname
      },
      success: function(res) {
        if (res.statusCode === 200) {
          // 假设后端返回的是治疗照片的URL数组
          that.setData({
            patientPhotos: res.data.photos
          });
          console.log(that.data.patientPhotos)
        } else {
          wx.showToast({
            title: '请求失败',
            icon: 'none'
          });
        }
      },
      fail: function() {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
      }
    });
  },
  chooseImage: function() {
    const that = this;
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        const tempFilePaths = res.tempFiles[0].tempFilePath;
        that.uploadPhoto(tempFilePaths);
      }
    });
  },
  uploadPhoto: function(tempFilePath) {
    let info= wx.getStorageSync('userInfo');
    const nickname = info.nickName;
    const that = this;
    const app = getApp();
    const baseURL = app.globalData.baseURL; // 获取 baseURL
    // console.log(tempFilePath)
    wx.uploadFile({
      // url: 'http://6401f344.r3.cpolar.cn/upload',
      // url: 'http://127.0.0.1:8080/upload', // 你的服务器上传接口
      url: baseURL+'upload',
      filePath: tempFilePath,
      name: 'photo',
      formData: {
        'nickname': nickname
      },
      success: function(res) {
        const data = JSON.parse(res.data);
        if (data.success) {
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000
          });
          that.setData({
            photoList: that.data.photoList.concat(data.filePath) // 假设服务器返回新文件的路径
          });
        } else {
          wx.showToast({
            title: '上传失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function(err) {
        console.error(err);
        wx.showToast({
          title: '上传失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
  
});

