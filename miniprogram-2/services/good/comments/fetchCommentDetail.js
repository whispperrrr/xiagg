import { config } from '../../../config/index';
/** 获取商品评价数据 */
export function fetchCommentDetail() {
  return new Promise((resolve) => {
    resolve({
      commentScore: 5,
      commentContent: '商品很好',
      commentTime: '2023-12-18',
      userAvatar: '/images/avatar.png',
      userName: '用户123'
    });
  });
}
