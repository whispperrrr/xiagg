import { fetchComments } from '../../services/comments/fetchComments';
import dayjs from 'dayjs';

Page({
  data: {
    commentsList: [], //存储评论列表
  },

  onLoad: function () {
    this.getCommentsList();
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
    }); //getCommentsList

  }

})