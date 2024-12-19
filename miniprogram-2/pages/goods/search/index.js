Page({
  data: {
    searchValue: '',
    historyWords: [],
    dialogShow: false,
    dialog: {
      message: '',
      showCancelButton: false
    }
  },

  onLoad() {
    this.loadHistoryWords();
  },

  loadHistoryWords() {
    const history = wx.getStorageSync('searchHistory') || [];
    this.setData({
      historyWords: history
    });
  },

  saveHistoryWords(keyword) {
    let history = wx.getStorageSync('searchHistory') || [];
    
    // 如果已经存在相同的关键词，先删除旧的
    history = history.filter(item => item !== keyword);
    
    // 将新的关键词添加到开头
    history.unshift(keyword);
    
    // 只保留最近的10条记录
    if (history.length > 10) {
      history = history.slice(0, 10);
    }
    
    // 保存到本地存储
    wx.setStorageSync('searchHistory', history);
    
    // 更新页面显示
    this.setData({
      historyWords: history
    });
  },

  clearHistory() {
    wx.showModal({
      title: '提示',
      content: '确定要清空搜索历史吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('searchHistory');
          this.setData({
            historyWords: []
          });
        }
      }
    });
  },

  onHistoryItemClick(e) {
    const keyword = e.currentTarget.dataset.word;
    this.goToSearchResult(keyword);
  },

  onInput(e) {
    this.setData({
      searchValue: e.detail.value
    });
  },

  onSearch() {
    const keyword = this.data.searchValue.trim();
    if (keyword) {
      this.saveHistoryWords(keyword);
      this.goToSearchResult(keyword);
    } else {
      this.setData({
        dialogShow: true,
        dialog: {
          message: '请输入搜索关键词',
          showCancelButton: false
        }
      });
    }
  },

  close() {
    this.setData({
      dialogShow: false
    });
  },

  confirm() {
    this.setData({
      dialogShow: false
    });
  },

  goToSearchResult(keyword) {
    wx.navigateTo({
      url: `/pages/goods/list/index?keyword=${encodeURIComponent(keyword)}`
    });
  }
});
