import { fetchGood } from '../../../services/good/fetchGood';
import {
  getGoodsDetailsCommentList,
  getGoodsDetailsCommentsCount,
} from '../../../services/good/fetchGoodsDetailsComments';

import { cdnBase } from '../../../config/index';
const imgPrefix = `${cdnBase}/`;

const recLeftImg = `${imgPrefix}common/rec-left.png`;
const recRightImg = `${imgPrefix}common/rec-right.png`;

//将一个对象转换为URL查询参数的字符串形式
//如果调用obj2Params({name: 'John Doe', age: 30}, true)，则返回name=John%20Doe&age=30
const obj2Params = (obj = {}) => {
  const result = [];
  Object.keys(obj).forEach((key) =>
    result.push(`${key}=${obj[key]}`),
  );
  return result.join('&');
};

Page({
  data: {
    commentsList: [], //评论列表
    commentsStatistics: { //评论统计数据
      commentCount: 0, //总评论数
    },
    recLeftImg,  //详情介绍图标左
    recRightImg, //详情介绍图标右

    details: {}, //商品详情
    SalePrice: 0,
    primaryImage: '',
    soldout: false, //是否售罄 
    spuId: '',
  },

  //根据spuId获取对应的商品详情到details数组里
  getDetail(spuId) {
    Promise.all([fetchGood(spuId)]).then((res) => {
      const [details] = res;
      const {
        primaryImage,
        isPutOnSale,
        SalePrice,
      } = details;
      this.setData({
        details,
        SalePrice: SalePrice ? parseInt(SalePrice) : 0,
        primaryImage,
        soldout: isPutOnSale === 0,
      });
    });
  },

  //获取评价列表
  async getCommentsList() {
    try {
      const code = 'Success';
      const data = await getGoodsDetailsCommentList();
      const {
        homePageComments
      } = data;
      if (code.toUpperCase() === 'SUCCESS') {
        const nextState = {
          commentsList: homePageComments.map((item) => {
            return {
              goodsSpu: item.spuId,
              userName: item.userName || '',
              commentContent: item.commentContent || '暂无评价',
              userHeadUrl: item.userHeadUrl,
            };
          }),
        };
        this.setData(nextState);
      }
    } catch (error) {
      console.error('comments error:', error);
    }
  },

  //获取评价统计
  async getCommentsStatistics() {
    try {
      const code = 'Success';
      const data = await getGoodsDetailsCommentsCount();
      if (code.toUpperCase() === 'SUCCESS') {
        const {
          commentCount,
        } = data;
        const nextState = {
          commentsStatistics: {
            commentCount: parseInt(`${commentCount}`),
          },
        };
        this.setData(nextState);
      }
    } catch (error) {
      console.error('comments statiistics error:', error);
    }
  },

  //跳转到卖家详情
  gotoSeller() {
    wx.navigateTo({
      url: '/pages/seller/seller',
    })
  },
  
  //页面加载时
  onLoad(query) {
    const {
      spuId
    } = query;
    this.setData({
      spuId: spuId,
    });
    this.getDetail(spuId);
    this.getCommentsList(spuId);
    this.getCommentsStatistics(spuId);
  },

  // 在商品详情页添加商品到购物车的方法
  addToCart: function() {
    // 等待商品详情加载完成
    if (!this.data.details || !this.data.spuId) {
      wx.showToast({
        title: '商品信息加载中',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 构建完整的商品对象
    const good = {
      spuId: this.data.spuId,
      primaryImage: this.data.primaryImage, // 使用正确的图片字段
      title: this.data.details.title,
      price: this.data.SalePrice,
      description: this.data.details.description,
    };

    console.log('要添加的商品信息：', good); // 调试日志

    const goodsList = wx.getStorageSync('goodsList');
    let currentList = [];
    
    try {
      // 获取现有的商品列表
      currentList = goodsList ? JSON.parse(goodsList) : [];
      
      // 检查商品是否已存在
      const existingIndex = currentList.findIndex(item => item.spuId === good.spuId);
      
      if (existingIndex === -1) {
        // 如果商品不存在，将新商品添加到现有列表中
        currentList.push(good);
        // 保存更新后的列表
        wx.setStorageSync('goodsList', JSON.stringify(currentList));
        
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        });
      } else {
        wx.showToast({
          title: '商品已在心愿单中',
          icon: 'none',
          duration: 2000
        });
      }

      console.log('当前心愿单商品列表：', currentList);
      
    } catch (e) {
      console.error('处理心愿单数据失败:', e);
      wx.showToast({
        title: '添加失败',
        icon: 'error',
        duration: 2000
      });
    }
  },

  navToCommentsListPage() {
    wx.navigateTo({
      url: `/pages/goods/comments/index?spuId=${this.data.spuId}`,
    });
  },
});