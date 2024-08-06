Page({
  // 其他页面逻辑...

  // 定义跳转到使用说明页面的函数
  goToInstructions: function() {
    // 调用 wx.navigateTo 方法进行页面跳转
    wx.navigateTo({
      url: '/pages/instruction/index', // 指定要跳转到的页面路径
      success: function(res) {
        console.log('跳转成功');
      },
      fail: function(err) {
        console.error('跳转失败', err);
      }
    });
  }
});