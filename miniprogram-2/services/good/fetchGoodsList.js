import {
  config
} from '../../config/index';

//获取模拟商品列表
function mockFetchGoodsList(params) {
  const {
    delay
  } = require('../_utils/delay');
  const {
    getSearchResult
  } = require('../../model/search');

  const data = getSearchResult(params);

  if (data.spuList.length) {
    data.spuList.forEach((item) => { //forEach对数组中的每一个元素执行一次给定的函数
      item.spuId = item.spuId;
      item.thumb = item.primaryImage;
      item.title = item.title;
      item.price = item.SalePrice;
      item.desc = '';
    });
  }
  return delay().then(() => {
    return data;
  });
}

//获取商品列表
export function fetchGoodsList(params) {
  if (config.useMock) {
    return mockFetchGoodsList(params);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}