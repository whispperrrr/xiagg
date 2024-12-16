// pages/inputPhoneNumber/inputPhoneNumber.js
// pages/inputPhoneNumber/inputPhoneNumber.js
Page({
  data: {
    phoneNumber: '', // 当前输入的电话号码
  },

  // 监听用户输入变化
  onInputChange: function (e) {
    this.setData({
      phoneNumber: e.detail.value,  // 更新电话号码的值
    });
  },

  // 保存电话号码
  onSave: function () {
    const { phoneNumber } = this.data;
    
    // 简单的手机号格式验证
    if (!/^1[3-9]\d{9}$/.test(phoneNumber)) {
      wx.showToast({
        title: '请输入有效的电话号码',
        icon: 'none',
      });
      return;
    }

    // 保存电话号码到缓存
    wx.setStorageSync('phoneNumber', phoneNumber);

    // 返回到主页面
    wx.navigateBack();
  },

  // 页面初始化时的逻辑
  onLoad: function () {
    const phoneNumber = wx.getStorageSync('phoneNumber');
    if (phoneNumber) {
      this.setData({
        phoneNumber: phoneNumber,  // 如果缓存中有电话号码，显示在输入框中
      });
    }
  },
});
