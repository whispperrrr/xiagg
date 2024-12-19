import { fetchGoodsList } from '../../services/good/fetchGoods';

Page({
  data: {
    goodsList: [], //存储商品列表数据
    goodsListLoadStatus: 0, //商品列表加载状态，0-未加载，1-加载中，2-加载失败
    loading: false,

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

    this.loadGoodsList(true);
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
    if (this.data.goodsListLoadStatus === 0 && !this.data.loading) {
      this.loadGoodsList();
    }
  },

  //下拉刷新
  async onPullDownRefresh() {
    if (this.data.loading) return;
    
    try {
      wx.showNavigationBarLoading();
      await this.loadGoodsList(true);
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 1000
      });
    } catch (error) {
      wx.showToast({
        title: '刷新失败',
        icon: 'error',
        duration: 1000
      });
    } finally {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }
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
    if (this.data.loading) return;

    if (fresh) { //fresh = true，表示强制刷新
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({ 
      goodsListLoadStatus: 1,
      loading: true 
    });

    const pageSize = this.goodListPagination.num;
    let pageIndex = this.goodListPagination.index + 1;
    if (fresh) {
      pageIndex = 0;
    }

    // 根据当前选中的校区加载商品
    const campusIndex = this.data.index;
    const campusGoodsList = this.data.campusGoods[campusIndex];

    try {
      const nextList = await fetchGoodsList(pageIndex, pageSize);
      
      this.setData({
        ['campusGoods.' + campusIndex]: fresh ? nextList : [...campusGoodsList, ...nextList],
        goodsList: fresh ? nextList : [...this.data.goodsList, ...nextList],
        goodsListLoadStatus: 0,
        loading: false
      });

      this.goodListPagination.index = pageIndex;
      this.goodListPagination.num = pageSize;
    } catch (err) {
      console.error('加载商品列表失败:', err);
      this.setData({ 
        goodsListLoadStatus: 2,
        loading: false
      });
      throw err;
    }
  },

  //跳转到商品详情页
  gotoGoodDetailPage(e) {
    const { index } = e.detail;  //获取点击事件传递的商品索引
    const { spuId } = this.data.goodsList[index]; //从商品列表中获取对应索引的商品的spuId
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  }
});
