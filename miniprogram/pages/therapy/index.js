Page({
  data: {
    startTime: 0,
    elapsedTime: 0,
    timer: null,
    displayTime: '00:00:00',
    userName: '用户昵称', // 假设已经从某处获取了用户昵称
  },
  convertMillisecondsToMinutes :function(elapsedTime) {
    // 将毫秒转换为分钟
    const minutes = elapsedTime / 1000 / 60;
    return minutes;
  },
  formatTimestampToReadableString :function() {
    const now = new Date(); // 使用当前时间，如果需要时间戳，可以替换为 new Date(timestamp)
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // getMonth() 返回的月份是从 0 开始的
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },

  startTimer: function() {
    if (this.data.timer) {
      console.warn('Timer is already running.');
      return;
    }
    this.data.startTime = Date.now() - this.data.elapsedTime;
    // console.log(Date.now())
    this.data.timer = setInterval(() => {
      this.updateTimer();
    }, 1000);
  },

  updateTimer: function() {
    const now = Date.now();
    // console.log(now)
    const diff = now - this.data.startTime;
    this.data.elapsedTime = diff;
    this.displayTime = this.formatTime(diff);
    // console.log(this.displayTime)
    this.setData({
      displayTime: this.displayTime,
    }, () => {
      // console.log('Data updated:', this.data.displayTime);
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
    // clearInterval();
    this.data.timer = null;
  },

  submitTimer: function() {
    // if (!this.data.timer) {
    //   console.warn('Timer is not running or has been paused.');
    //   return;
    // }
    clearInterval(this.data.timer);
    this.uploadData();
    this.setData({
      startTime: 0,
      elapsedTime: 0,
      timer: null,
      displayTime: '00:00:00',
    });
  },

  uploadData: function() {
    let info = wx.getStorageSync('userInfo');
    let nickname = info.nickName;
    // console.log("nichen:",info)
    const startTime = this.formatTimestampToReadableString(Date(this.data.startTime));
    const duration = this.convertMillisecondsToMinutes(this.data.elapsedTime);
    const userInfo1 = {
      startTime: startTime,
      duration: duration,
      userName: nickname,
    };
    const app = getApp();
    const baseURL = app.globalData.baseURL; // 获取 baseURL
    // 这里使用 wx.request 来模拟数据上传到服务器
    wx.request({
      url: baseURL+'timer',
      // url: 'http://6401f344.r3.cpolar.cn/timer',
      // url: 'http://127.0.0.1:8080/timer', // 替换为你的服务器地址
      method: 'POST',
      data: userInfo1,
      success: function(res) {
        console.log('Data uploaded successfully:', res);
      },
      fail: function(err) {
        console.error('Failed to upload data:', err);
      }
    });
  }
});