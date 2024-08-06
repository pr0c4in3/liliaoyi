Page({
  data: {
    startTime: 0,
    elapsedTime: 0,
    timer: null,
    displayTime: '00:00:00',
    userName: '用户昵称', // 假设已经从某处获取了用户昵称
  },

  startTimer: function() {
    if (this.data.timer) {
      console.warn('Timer is already running.');
      return;
    }
    this.data.startTime = Date.now() - this.data.elapsedTime;
    this.data.timer = setInterval(() => {
      this.updateTimer();
    }, 1000);
  },

  updateTimer: function() {
    const now = Date.now();
    const diff = now - this.data.startTime;
    this.data.elapsedTime = diff;
    this.displayTime = this.formatTime(diff);
    this.setData({
      displayTime: this.data.displayTime,
    });
  },

  formatTime: function(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  },

  pauseTimer: function() {
    if (!this.data.timer) {
      console.warn('Timer is not running.');
      return;
    }
    clearInterval(this.data.timer);
    this.data.timer = null;
  },

  submitTimer: function() {
    if (!this.data.timer) {
      console.warn('Timer is not running or has been paused.');
      return;
    }
    clearInterval(this.data.timer);
    this.uploadData();
  },

  uploadData: function() {
    const startTime = new Date(this.data.startTime).toISOString();
    const duration = this.data.elapsedTime;
    const userInfo = {
      startTime: startTime,
      duration: duration,
      userName: this.data.userName,
    };

    // 这里使用 wx.request 来模拟数据上传到服务器
    wx.request({
      url: 'https://your-server.com/api/timer', // 替换为你的服务器地址
      method: 'POST',
      data: userInfo,
      success: function(res) {
        console.log('Data uploaded successfully:', res);
      },
      fail: function(err) {
        console.error('Failed to upload data:', err);
      }
    });
  }
});