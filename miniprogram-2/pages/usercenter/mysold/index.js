
Page({
  data: {
    goodsList: [], //存储商品列表数据
    goodsListLoadStatus: 0, //商品列表加载状态，0-未加载，1-加载中，2-加载失败

  },

  //分页
  goodListPagination: {
    num: 20, //每页的商品数量
    index: 0, //当前页码索引
  },

  //页面显示时，初始化底部标签栏
  onShow() {
    this.getTabBar().init();
  },

  //页面加载时
  onLoad() {
    this.loadHomePage();
  },

  //滚动到底部时
  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {
      this.loadGoodsList();
    }
  },

  //下拉刷新
  onPullDownRefresh() {
    this.loadHomePage();
  },

  //加载home页面
  loadHomePage() {
    wx.stopPullDownRefresh();
    this.loadGoodsList(true);
  },

  onReTry() {
    this.loadGoodsList();
  },

  // 加载商品列表
  async loadGoodsList(fresh = false) {
    if (fresh) { //fresh = true，表示强制刷新
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({ goodsListLoadStatus: 1 }); //状态为1-加载中

    const pageSize = this.goodListPagination.num;
    let pageIndex = this.goodListPagination.index + 1; //页数+1
    if (fresh) {
      pageIndex = 0;
    }

    try {
      const nextList = await fetchGoodsList(pageIndex, pageSize);
      this.setData({
        goodsList: fresh ? nextList : this.data.goodsList.concat(nextList),
        goodsListLoadStatus: 0, //状态为0-未加载
      });

      this.goodListPagination.index = pageIndex;
      this.goodListPagination.num = pageSize;
    } catch (err) { 
      this.setData({ goodsListLoadStatus: 2 }); //如果获取商品列表失败，状态为2-加载失败
    }
  },

  //跳转到商品详情页
  gotoGoodDetailPage(e) {
    const { index } = e.detail;  //获取点击事件传递的商品索引
    const { spuId } = this.data.goodsList[index]; //从商品列表中获取对应索引的商品的spuId
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  },
});
