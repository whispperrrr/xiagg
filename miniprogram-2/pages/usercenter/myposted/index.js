// pages/usercenter/myposted/index.js
import { genGood, deleteUserGood } from '../../../model/good';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    goodsList: [], // 商品列表
    loading: false, // 是否正在加载
  },

  onLoad() {
    this.loadGoodsList();
  },

  onShow() {
    // 每次显示页面时重新加载列表，以获取最新数据
    this.loadGoodsList();
  },

  // 加载商品列表
  loadGoodsList() {
    this.setData({ loading: true });

    try {
      // 获取用户发布的商品
      const userGoods = wx.getStorageSync('userGoods') || [];
      
      this.setData({
        goodsList: userGoods,
        loading: false
      });

    } catch (error) {
      console.error('加载商品列表失败:', error);
      this.setData({ loading: false });
      Toast({
        context: this,
        selector: '#t-toast',
        message: '加载失败',
        theme: 'error',
      });
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadGoodsList();
    wx.stopPullDownRefresh();
  },

  // 跳转到商品详情
  gotoDetail(e) {
    const { spuId } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`
    });
  },

  // 删除商品
  deleteGoods(e) {
    const { spuId } = e.currentTarget.dataset;
    wx.showModal({
      title: '提示',
      content: '确定要删除这个商品吗？',
      success: (res) => {
        if (res.confirm) {
          if (deleteUserGood(spuId)) {
            // 重新加载列表
            this.loadGoodsList();
            
            Toast({
              context: this,
              selector: '#t-toast',
              message: '删除成功',
              theme: 'success',
            });
          } else {
            Toast({
              context: this,
              selector: '#t-toast',
              message: '删除失败',
              theme: 'error',
            });
          }
        }
      }
    });
  },

  // 跳转到发布页面
  gotoPost() {
    // 添加短暂延迟，让按钮动画效果更明显
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/sell/sell'
      });
    }, 150);
  }
});