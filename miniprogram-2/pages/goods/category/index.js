import {
  getCategoryList
} from '../../../services/good/fetchCategoryList';
Page({
  data: {
    list: [],
    categoryId: 101,
  },
  async init() {
    try {
      const result = await getCategoryList();
      this.setData({
        list: result,
      });
    } catch (error) {
      console.error('err:', error);
    }
  },

  onShow() {
    this.getTabBar().init();
  },

  onChange(e) {
    //console.log(e.detail.item.groupId);
    wx.navigateTo({
      url: `/pages/goods/list/index?categoryId=${e.detail.item.groupId}`
    });
  },

  onLoad() {
    this.init(true);
  },
});