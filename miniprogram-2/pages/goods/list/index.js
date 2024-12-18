import {
  fetchGoodsList
} from '../../../services/good/fetchGoodsList';

Page({
  data: {
    goodsList: [],

    keywords: '', //搜索关键词

    filteredGoodsList: [], //筛选后的商品列表
    categoryId: '', // 当前选择的分类 ID

    hasLoaded: false, //是否已经加载完成
    loadMoreStatus: 0, //加载更多数据的状态
    loading: true, //页面是否处于加载数据的状态
  }, //data

  pageNum: 1,
  pageSize: 30,
  total: 0,

  goback: function () { //返回上一页
    wx.navigateBack({
      delta: 1
    });
  },

  goodListClickHandle(e) { //商品列表点击事件
    const {
      index
    } = e.detail;
    const {
      spuId
    } = this.data.filteredGoodsList[index];
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  },

  generalQueryData(reset = false) { //用于生成查询商品列表时所需的参数
    const {
      keywords
    } = this.data;
    const {
      pageNum,
      pageSize
    } = this;
    const params = {
      pageNum: 1,
      pageSize: 30,
      keyword: keywords,
    };

    return params;
  }, //generalQueryData

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
      
      this.pageNum = params.pageNum || 1;
      this.total = totalCount;
      
      this.setData({
        goodsList: _goodsList,
        loadMoreStatus: _loadMoreStatus,
      });

      // 根据分类ID筛选商品
      this.filterGoodsByCategory(this.data.categoryId);

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
    //从options中获取categoryId
    console.log(options.categoryId);
    const categoryId = options.categoryId || '';
    this.setData({
      categoryId: categoryId,
    });
    this.init(true);
  },

  onReachBottom() { //加载更多数据
    const {
      goodsList
    } = this.data;
    const {
      total = 0
    } = this;
    if (goodsList.length === total) {
      this.setData({
        loadMoreStatus: 2,
      });
      return;
    }
    this.init(false);
  },

  filterGoodsByCategory: function (categoryId) {
    if (!categoryId) {
      // 如果没有选择分类，则显示所有商品
      this.setData({
        filteredGoodsList: this.data.goodsList,
      });
      return;
    }

    // 根据 categoryId 过滤商品
    const filteredList = this.data.goodsList.filter(item => item.categoryId === categoryId);

    // 更新 filteredGoodsList
    this.setData({
      filteredGoodsList: filteredList,
    });
  },

  //更新 categoryId 并重新加载商品列表
  onChangeCategory: (e) => {
    const categoryId = e.detail.categoryId;
    this.setData({
      categoryId: categoryId,
    });
    this.init(true); // 重新加载商品列表
  },


});