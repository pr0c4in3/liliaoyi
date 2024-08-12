Page({
  data: {
    introductions: []
  },
  onLoad: function() {
    this.fetchIntroductions();
  },
  fetchIntroductions: function() {
    const that = this;
    const app = getApp();
    const baseURL = app.globalData.baseURL; // 获取 baseURL
    wx.request({
      url: baseURL+'introductions', // 替换为你的后端API地址
      method: 'GET',
      success: function(res) {
        if (res.statusCode === 200) {
          that.setData({
            introductions: res.data.map(item => {
              return {
                title: item.title,
                content: item.content
              };
            })
          });
        }
      },
      fail: function() {
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        });
      }
    });
  }
});