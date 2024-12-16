// pages/inputStudentNumber/inputStudentNumber.js
Page({
  data: {
    studentNumber: '', // 当前输入的学号
  },
  
  // 监听输入变化
  onInputChange: function (e) {
    this.setData({
      studentNumber: e.detail.value,
    });
  },
  
  // 保存学号并返回
  onSave: function () {
    const { studentNumber } = this.data;
    
    if (studentNumber.trim() === '') {
      wx.showToast({
        title: '学号不能为空',
        icon: 'none',
      });
      return;
    }

    // 将学号保存到全局或缓存中
    wx.setStorageSync('studentNumber', studentNumber);

    // 返回上一个页面
    wx.navigateBack();
  }
});
