import { fetchComments } from '../../../services/comments/fetchComments';
import { fetchCommentsCount } from '../../../services/comments/fetchCommentsCount';
import dayjs from 'dayjs';
const layoutMap = {
  0: 'vertical',
};
Page({
  data: {
    pageLoading: false,
    commentList: [],
    pageNum: 1,
    myPageNum: 1,
    pageSize: 10,
    total: 0,
    myTotal: 0,
    hasLoaded: false,
    layoutText: layoutMap[0],
    loadMoreStatus: 0,
    myLoadStatus: 0,
    spuId: '1060004',
    commentLevel: '',
    commentType: '',
    totalCount: 0,
    countObj: {
      commentCount: '0',
      uidCount: '0',
    },
  },
  onLoad(options) {
    this.getCount(options);
    this.getComments(options);
  },
  async getCount(options) {
    try {
      const result = await fetchCommentsCount(
        {
          spuId: options.spuId,
        },
        {
          method: 'POST',
        },
      );
      this.setData({
        countObj: result,
      });
      // const { data, code = '' } = result;
      // if (code.toUpperCase() === 'SUCCESS') {
      //     wx.setNavigationBarTitle({
      //     title: `全部评价(${data.commentCount})`,
      //     });
      //     this.setData({
      //     countObj: data,
      //     });
      // } else {
      //     wx.showToast({
      //     title: '查询失败，请稍候重试',
      //     });
      // }
    } catch (error) {}
  },
  generalQueryData(reset) {
    const { pageNum, pageSize, spuId, commentLevel } = this.data;
    const params = {
      pageNum: 1,
      pageSize: 30,
      queryParameter: {
        spuId,
      },
    };
    if (
      Number(commentLevel) === 3 ||
      Number(commentLevel) === 2 ||
      Number(commentLevel) === 1
    ) {
      params.queryParameter.commentLevel = Number(commentLevel);
    }
    // 重置请求
    if (reset) return params;

    return {
      ...params,
      pageNum: pageNum + 1,
      pageSize,
    };
  },
  async init(reset = true) {
    const { loadMoreStatus, commentList = [] } = this.data;
    const params = this.generalQueryData(reset);

    // 在加载中或者无更多数据，直接返回
    if (loadMoreStatus !== 0) return;

    this.setData({
      loadMoreStatus: 1,
    });

    try {
      const data = await fetchComments(params, {
        method: 'POST',
      });
      const code = 'SUCCESS';
      if (code.toUpperCase() === 'SUCCESS') {
        const { pageList, totalCount = 0 } = data;
        pageList.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          item.commentTime = dayjs(Number(item.commentTime)).format(
            'YYYY/MM/DD HH:mm',
          );
        });

        if (Number(totalCount) === 0 && reset) {
          this.setData({
            commentList: [],
            hasLoaded: true,
            total: totalCount,
            loadMoreStatus: 2,
          });
          return;
        }
        const _commentList = reset ? pageList : commentList.concat(pageList);
        const _loadMoreStatus =
          _commentList.length === Number(totalCount) ? 2 : 0;
        this.setData({
          commentList: _commentList,
          pageNum: params.pageNum || 1,
          totalCount: Number(totalCount),
          loadMoreStatus: _loadMoreStatus,
        });
      } else {
        wx.showToast({
          title: '查询失败，请稍候重试',
        });
      }
    } catch (error) {}
    this.setData({
      hasLoaded: true,
    });
  },
  getScoreArray(score) {
    var array = [];
    for (let i = 0; i < 5; i++) {
      if (i < score) {
        array.push(2);
      } else {
        array.push(0);
      }
    }
    return array;
  },
  getComments(options) {
    const { commentLevel = -1, spuId } = options;
    if (commentLevel !== -1) {
      this.setData({
        commentLevel: commentLevel,
      });
    }
    this.setData({
      spuId: spuId,
    });
    this.init(true);
  },
  onReachBottom() {
    const { total = 0, commentList } = this.data;
    if (commentList.length === total) {
      this.setData({
        loadMoreStatus: 2,
      });
      return;
    }

    this.init(false);
  },
});
