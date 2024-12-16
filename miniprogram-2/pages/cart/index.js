Page({
  data: {
    goodsList: [],
  },

  onLoad: function() {
    const details = wx.getStorageSync('goodsList'); // 从本地缓存中获取商品信息

    // 将商品信息解析为对象
    const good = JSON.parse(details);

    // 更新购物车页面的数据
    this.setData({
      goodsList: [...this.data.goodsList, good],
    });
  },

  gotoGoodDetail: function(e){
    const index = e.currentTarget.dataset.index;
    const spuId = this.data.goodsList[index].spuId;
    console.log(spuId);
    wx.navigateTo({
        url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  },
});
