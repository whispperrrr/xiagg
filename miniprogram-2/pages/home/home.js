import { fetchGoodsList } from '../../services/good/fetchGoods';

Page({
  data: {
    goodsList: [], //存储商品列表数据
    goodsListLoadStatus: 0, //商品列表加载状态，0-未加载，1-加载中，2-加载失败

    //校区选择
    index: 0,
    regions: ['思明', '翔安', '漳州'],

     // 商品数据按校区划分（模拟数据）
  campusGoods: {
    0: [], // 思明校区商品列表
    1: [], // 翔安校区商品列表
    2: [], // 漳州校区商品列表
  }  
  },

  //校区选择
  bindPickerChange: function(e) {
    const selectedIndex = e.detail.value;  // 获取选择的校区索引
  this.setData({
    index: selectedIndex,  // 更新当前选择的校区
    goodsList: [],  // 清空当前商品列表
    goodsListLoadStatus: 1, // 设置加载状态为加载中
  });

  this.loadGoodsList();
  },

  //跳转到搜索页
  gotoSearch(){
    wx.navigateTo({
      url: '/pages/goods/search/index',
    })
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

     // 根据当前选中的校区加载商品
  const campusIndex = this.data.index;
  const campusGoodsList = this.data.campusGoods[campusIndex];

  if (campusGoodsList.length === 0) {
    // 如果该校区商品为空，调用接口获取商品数据
    try {
      const nextList = await fetchGoodsList(pageIndex, pageSize);
      this.setData({
        ['campusGoods.' + campusIndex]: nextList,  // 将商品数据保存到对应的校区
        goodsList: fresh ? nextList : this.data.goodsList.concat(nextList), // 更新商品列表
        goodsListLoadStatus: 0, // 状态为0-加载完成
      });

      this.goodListPagination.index = pageIndex;
      this.goodListPagination.num = pageSize;
    } catch (err) {
      this.setData({ goodsListLoadStatus: 2 }); // 加载失败
    }
  } else {
    // 如果该校区已经有商品数据，直接加载
    this.setData({
      goodsList: fresh ? campusGoodsList : this.data.goodsList.concat(campusGoodsList),
      goodsListLoadStatus: 0, // 状态为0-加载完成
    });
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
