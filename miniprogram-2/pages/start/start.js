Page({
  goHome: function () {
    // 跳转到首页
    wx.switchTab({
      url: '/pages/home/home'
    });
  }
});