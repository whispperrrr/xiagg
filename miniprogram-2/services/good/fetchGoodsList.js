import {
  config
} from '../../config/index';

//获取模拟商品列表
function mockFetchGoodsList(params) {
  const {
    delay
  } = require('../_utils/delay');
  const {
    genGood
  } = require('../../model/good');

  // 获取所有商品数据
  const allGoods = genGood();
  
  // 根据分类ID筛选商品
  let filteredGoods = allGoods;
  if (params.categoryId) {
    filteredGoods = allGoods.filter(item => item.categoryId === params.categoryId);
  }

  // 根据关键词筛选商品
  if (params.keyword) {
    const keyword = params.keyword.toLowerCase();
    filteredGoods = filteredGoods.filter(item => 
      item.title.toLowerCase().includes(keyword)
    );
  }

  // 分页处理
  const startIndex = (params.pageNum - 1) * params.pageSize;
  const endIndex = startIndex + params.pageSize;
  const spuList = filteredGoods.slice(startIndex, endIndex);

  const data = {
    spuList,
    totalCount: filteredGoods.length,
    pageNum: params.pageNum,
    pageSize: params.pageSize
  };

  if (data.spuList.length) {
    data.spuList.forEach((item) => {
      item.thumb = item.primaryImage;
      item.price = item.SalePrice;
      item.desc = '';
    });
  }

  return delay().then(() => data);
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