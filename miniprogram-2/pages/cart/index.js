Page({
  data: {
    goodsList: [],
  },

  onLoad: function() {
    this.loadGoodsList();
  },

  // 加载商品列表
  loadGoodsList: function() {
    const storageList = wx.getStorageSync('goodsList');
    if (storageList) {
      try {
        const goodsList = JSON.parse(storageList);
        console.log('加载的商品列表：', goodsList);
        
        if (Array.isArray(goodsList)) {
          // 确保所有必要的字段都存在
          const validGoodsList = goodsList.filter(item => 
            item && item.spuId && item.primaryImage && item.title
          );
          
          this.setData({
            goodsList: validGoodsList
          });
        } else {
          console.error('商品列表格式错误');
          wx.setStorageSync('goodsList', '[]');
        }
      } catch (e) {
        console.error('解析商品列表失败:', e);
        wx.setStorageSync('goodsList', '[]');
      }
    }
  },

  // 删除商品
  deleteGoods: function(e) {
    const { index } = e.currentTarget.dataset;
    wx.showModal({
      title: '提示',
      content: '确定要删除这个商品吗？',
      success: (res) => {
        if (res.confirm) {
          const newGoodsList = [...this.data.goodsList];
          newGoodsList.splice(index, 1);
          
          this.setData({
            goodsList: newGoodsList
          });
          
          wx.setStorageSync('goodsList', JSON.stringify(newGoodsList));
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  // 跳转到商品详情
  gotoGoodDetail: function(e) {
    const index = e.currentTarget.dataset.index;
    const spuId = this.data.goodsList[index].spuId;
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  },

  onShow: function() {
    this.loadGoodsList();
  },
});
