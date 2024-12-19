import { fetchGoodsList } from '../../services/good/fetchGoods';
import { fetchComments } from '../../services/comments/fetchComments';
import dayjs from 'dayjs';

Page({
  data: {
    goodsList: [], //存储商品列表
    commentsList: [], //存储评价列表
    tabPanelstyle: 'padding: 0 0 20rpx',
    currentTab: 0
  },

  onLoad: function () {
    this.getSoldGoodsList();
    this.getCommentsList();
  },

  //获取商品列表
  getSoldGoodsList() {
    fetchGoodsList().then((res) => {
      this.setData({
        goodsList: res
      });
    });
  },

  //获取评论列表
  getCommentsList() {
    fetchComments().then((res) => {
      const formattedList = res.pageList.map((item) => {
        return {
          ...item,
          commentTime: dayjs(Number(item.commentTime)).format('YYYY/MM/DD HH:mm') //处理时间格式
        };
      });
      this.setData({
        commentsList: formattedList
      });
    });
  },

  // Tab切换事件处理
  onTabsChange(e) {
    const { value } = e.detail;
    this.setData({ 
      currentTab: value 
    });
    
    // 切换到对应标签时加载数据
    if (value === 0) {
      this.getSoldGoodsList();
    } else {
      this.getCommentsList();
    }
  },

  onTabsClick(e) {
    const { value } = e.detail;
    this.setData({ 
      currentTab: value 
    });
  }
});