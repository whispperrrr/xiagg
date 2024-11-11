import {
  getGoodsList
} from './goods';

 //历史搜索
export function getSearchHistory() {
  return {
    historyWords: [
    ],
  };
}

//热门搜索
export function getSearchPopular() {
  return {
    popularWords: [
      '电脑',
      'iPhone12',
      '手机支架',
      '置物架',
      '小米10',
      '跑鞋',
    ],
  };
}

//
export function getSearchResult() {
  return {
    storeId: null,
    pageNum: 1,
    pageSize: 30,
    totalCount: 1,
    spuList: getGoodsList(7),
    algId: 0,
  };
}