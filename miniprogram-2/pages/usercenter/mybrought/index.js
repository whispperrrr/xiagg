// pages/usercenter/mybrought/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    browseList: [] // 浏览记录列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getBrowseHistory()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.getBrowseHistory()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 如果需要分页加载更多数据，可以在这里处理
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 获取浏览记录
  getBrowseHistory: function() {
    // 这里可以从本地存储或服务器获取浏览记录
    const browseHistory = wx.getStorageSync('browseHistory') || []
    this.setData({
      browseList: browseHistory
    })
  }
})