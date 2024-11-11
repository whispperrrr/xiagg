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
              commentContent: item.commentContent || '用户未填写评价',
              userHeadUrl: item.isAnonymity ?
                this.anonymityAvatar :
                item.userHeadUrl || this.anonymityAvatar,
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
});