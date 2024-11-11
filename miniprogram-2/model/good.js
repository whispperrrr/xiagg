import {
  cdnBase
} from '../config/index';
const imgPrefix = cdnBase;

const defaultDesc = [`${imgPrefix}/goods/details-1.png`];

const allGoods = [{
    storeId: '1000', //店铺的唯一标识
    spuId: '0', //标准化产品单元id
    title: '口红999色号 未拆封 半价出', //标题
    primaryImage: 'https://img.js.design/assets/img/656597320b61f2d1f3ba6d25.jpg#663918333f1452ecb596c743b80e01a4', //主图
    SalePrice: '29800', //价格
    isSoldOut: false, //是否售罄
    isPutOnSale: 1, //售卖数量
    description: [ //详情图
      'https://img.js.design/assets/img/67127e61e124ab54d352a36b.jpg#f5a94232a18b95bca9351a278a120f9a',
      'https://img.js.design/assets/img/67127e653beaeb6188299ed3.jpg#c01d1354a1449b186c9c358781dee859',
      'https://img.js.design/assets/img/67127e69e124ab54d352a3e5.jpg#fea9f7ced2de161816e7b09addbfc936',
    ],
  },
  {
    storeId: '1000',
    spuId: '135686633',
    title: '二手大一教材 八成新 计算机',
    primaryImage: 'https://img.js.design/assets/img/6712824ded2df1560db0b186.jpg#13187a593f096f06b9eda216574c6ed2',
    SalePrice: '800',
    isSoldOut: false,
    isPutOnSale: 1,
    description: [
      'https://img.js.design/assets/img/67128250e0f24202bd7d5a49.jpg#d15ecc68b466d6fd43dce211cbc60a35',
      'https://img.js.design/assets/img/67128252ed2df1560db0b199.jpg#e524aea52b3ecd62ceb88e1f9b7732bc',
    ],
  },
  {
    storeId: '1000',
    spuId: '135691628',
    title: '海军领毛衣 仅仅试穿一次',
    primaryImage: 'https://img.js.design/assets/img/670e03dde124ab54d394bc73.jpg#3479a1f36adef1af5d142e7b13e04b1d',
    SalePrice: '7500',
    isSoldOut: true,
    isPutOnSale: 1,
    description: [
      'https://img.js.design/assets/img/67128515e124ab54d35307e8.png#765e40414b34ac22265005788e06224a',
      'https://img.js.design/assets/img/67128512e466ac358f6b3a18.jpg#93b7603185fa7b8db04ccbcb6cb9bff5',
    ],
  },
  {
    storeId: '1000',
    spuId: '135686623',
    title: '基础款t恤 全新出 白色',
    primaryImage: 'https://img.js.design/assets/img/6712801ce0f24202bd7d335c.jpg#650d8ec95075aa89988d335a53e02ae3',
    SalePrice: '5000',
    isSoldOut: false,
    isPutOnSale: 1,
    description: [
      'https://img.js.design/assets/img/66113ad5388227996ddc7d35.jpg#b1e31bdf94a4f606724626ab29777eb8',
      'https://img.js.design/assets/img/6712802248e0a8436420f588.jpg#bf4e89a0590bdd55ae994515d19df514',
    ]
  },
  {
    storeId: '1000',
    spuId: '135681628',
    title: '单反相机 基础版 无镜头 黑色 九成新',
    primaryImage: 'https://img.js.design/assets/img/671281090c8862f00f16ab01.jpg#2bc935974222b8c306dc261488c284e5',
    SalePrice: '888800',
    isSoldOut: false,
    isPutOnSale: 1,
    description: [
      'https://img.js.design/assets/img/6712810ce466ac358f6aeafe.jpg#a8486762830233e6ab2a4c80ba093a8e',
      'https://img.js.design/assets/img/6603ac1a0600cad82bae3b92.jpg#503c58eda8244bfb70aeb1c8cb19865f',
    ],
  },
  {
    storeId: '1000',
    spuId: '135681626',
    title: '全新牛仔裤 深蓝色 仅仅试穿一次',
    primaryImage: 'https://img.js.design/assets/img/67132ae13c6b1508d8b1a1d3.jpg#86c5ed366a4e651b7866381ea5996e51',
    SalePrice: '9900',
    isSoldOut: false,
    isPutOnSale: 1,
    description: [
      'https://img.js.design/assets/img/67132ae53beaeb61882ed949.jpg#24b60933686eeee2fdfd09b873735e73',
      'https://img.js.design/assets/img/67132ae748e0a84364262641.jpg#7f7f10bec78af39e96c6de4b15f72304',
    ],
  },
  {
    storeId: '1000',
    spuId: '135681622',
    title: '佳能相机 微单 七成新 急出',
    primaryImage: 'https://img.js.design/assets/img/66eff6dce0f24202bde62e1b.png#bd5707dd44c846d4fdb8ee06129b9b22',
    SalePrice: '569900',
    isSoldOut: false,
    isPutOnSale: 1,
    description: [
      'https://img.js.design/assets/img/6712810ce466ac358f6aeafe.jpg#a8486762830233e6ab2a4c80ba093a8e',
      'https://img.js.design/assets/img/6603ac1a0600cad82bae3b92.jpg#503c58eda8244bfb70aeb1c8cb19865f',
    ],
  },
  {
    storeId: '1000',
    spuId: '135681624',
    title: '大学课外必读书籍 炊烟升起 九成新',
    primaryImage: 'https://img.js.design/assets/img/66eff6e6c6ebda7a2a39a207.jpg#53f7edf498504720ac1f3b1a5734bbc0',
    SalePrice: '800',
    isPutOnSale: 1,
    description: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-2c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-2d.png',
    ],
  },
];



//从现有商品数据中查找或根据一定规则创建新的商品信息，因为是模拟数据，所以有重复
export function genGood(id) {
  const item = allGoods[id % allGoods.length]; //从allGoods数组中根据id取模得到一个商品
  return { //创建一个新的对象
    ...item,
    spuId: `${id}`,
    description: item?.description || defaultDesc,
    images: item.primaryImage,
  };
}