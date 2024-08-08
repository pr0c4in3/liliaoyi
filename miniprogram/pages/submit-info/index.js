Page({
  data: {
    info: {
      nickname:'',
      name: '',
      gender: '男',
      birthday: '',
      phone: '',
    },
    genderOptions: ['男', '女']
  },
  onLoad: function() {
    // 页面加载时的逻辑
  },
  // bindNicknameInput: function(e) {
  //   this.setData({
  //     'info.nickname': e.detail.value
  //   });
  // },
  bindGenderChange: function(e) {
    this.setData({
      'info.gender': this.data.genderOptions[e.detail.value]
    });
  },


  submitUserInfo: function(e) {
    this.setData({
      'info.name': e.detail.value.name
    });
    this.setData({
      'info.birthday': e.detail.value.birthday
    });
    this.setData({
      'info.phone': e.detail.value.phone
    });
    this.setData({
      'info.nickname': wx.getStorageSync('userInfo').nickName
    });
    const userInfo = this.data.info;
    console.log(userInfo)
    const app = getApp();
    const baseURL = app.globalData.baseURL; // 获取 baseURL
    // 这里需要调用API接口提交数据
    wx.request({
      url: baseURL+'submitInfo',
      // url: 'http://6401f344.r3.cpolar.cn/submitInfo',
      // url: 'http://127.0.0.1:8080/submitInfo', // 你的API地址
      method: 'POST',
      data: userInfo,
      success: function(res) {
        wx.showToast({
          title: '提交成功',
          icon: 'success'
        });
      },
      fail: function(error) {
        wx.showToast({
          title: '提交失败',
          icon: 'none'
        });
      }
    });
  }
});