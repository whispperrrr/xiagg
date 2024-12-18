import {
  fetchGoodsList
} from '../../../services/good/fetchGoodsList';

Page({
  data: {
    goodsList: [],
    keywords: '', // 搜索关键词
    filteredGoodsList: [], // 筛选后的商品列表
    categoryId: '', // 当前选择的分类 ID
    hasLoaded: false,
    loadMoreStatus: 0,
    loading: true,
  },

  pageNum: 1,
  pageSize: 30,
  total: 0,

  goback: function () {
    wx.navigateBack({
      delta: 1
    });
  },

  goodListClickHandle(e) {
    const { index } = e.detail;
    const { spuId } = this.data.filteredGoodsList[index];
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  },

  generalQueryData(reset = false) {
    const { keywords, categoryId } = this.data;
    const { pageNum, pageSize } = this;
    return {
      pageNum: reset ? 1 : pageNum + 1,
      pageSize,
      keyword: keywords,
      categoryId,
    };
  },

  init: async function (reset = true) {
    const { loadMoreStatus } = this.data;
    const params = this.generalQueryData(reset);
    
    if (loadMoreStatus !== 0) return;
    
    this.setData({
      loadMoreStatus: 1,
      loading: true,
    });

    try {
      const result = await fetchGoodsList(params);
      const { spuList, totalCount = 0 } = result;

      if (totalCount === 0) {
        this.total = totalCount;
        this.setData({
          hasLoaded: true,
          loadMoreStatus: 0,
          loading: false,
          goodsList: [],
          filteredGoodsList: [],
        });
        return;
      }

      const _goodsList = reset ? spuList : this.data.goodsList.concat(spuList);
      const _loadMoreStatus = _goodsList.length === totalCount ? 2 : 0;
      
      this.pageNum = params.pageNum;
      this.total = totalCount;
      
      this.setData({
        goodsList: _goodsList,
        filteredGoodsList: _goodsList,
        loadMoreStatus: _loadMoreStatus,
      });

    } catch (error) {
      console.error('加载商品列表失败:', error);
      this.setData({
        loading: false,
        loadMoreStatus: 0,
      });
      wx.showToast({
        title: '加载失败，请重试',
        icon: 'none'
      });
    }

    this.setData({
      hasLoaded: true,
      loading: false,
    });
  },

  onLoad: function (options) {
    const { categoryId, keyword } = options;
    
    this.setData({
      categoryId: categoryId || '',
      keywords: decodeURIComponent(keyword || ''),
    }, () => {
      this.init(true);
    });
  },

  onReachBottom() {
    if (this.data.goodsList.length === this.total) {
      this.setData({ loadMoreStatus: 2 });
      return;
    }
    this.init(false);
  },

  // 跳转到搜索页面
  gotoSearch() {
    wx.navigateTo({
      url: '/pages/goods/search/index'
    });
  }
});