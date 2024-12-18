import {
  cdnBase
} from '../config/index';
const imgPrefix = cdnBase;

const defaultDesc = [`${imgPrefix}/goods/details-1.png`];

const allGoods = [{
    uid: '1111111111111111', //用户id，可以用学号表示
    spuId: '241119001', //标准化产品单元id（发布日期24.11.19+当日序号001）
    categoryId: '301', //分类id
    //教材书籍-101，置物收纳-102
    //女装-201，男装-202
    //口红-301，眼影-302，美妆工具-303
    //相机-401，手机-402，平板-403

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
    uid: '22222222222',
    spuId: '241119002',
    categoryId: '101',

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
    uid: '33333333333',
    spuId: '241119003',
    categoryId: '201',

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
    uid: '4444444444444',
    spuId: '241120001',
    categoryId: '201',

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
    uid: '55555555555',
    spuId: '241120002',
    categoryId: '401',

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
    uid: '66666666666',
    spuId: '240123001',
    categoryId: '201',

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
    uid: '7777777777',
    spuId: '240902001',
    categoryId: '401',

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
    uid: '888888888',
    spuId: '241120001',
    categoryId: '101',

    title: '大学课外必读书籍 炊烟升起 九成新',
    primaryImage: 'https://img.js.design/assets/img/66eff6e6c6ebda7a2a39a207.jpg#53f7edf498504720ac1f3b1a5734bbc0',
    SalePrice: '800',
    isPutOnSale: 1,
    description: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-2c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-2d.png',
    ],
  },
  {
    uid: '999999999',
    spuId: '241120003',
    categoryId: '302',

    title: '美妆眼影盘 16色 全新未拆封',
    primaryImage: 'https://p3-search.byteimg.com/img/labis/bb7491b0883f7fa25a6a6cfb3495c771~480x480.JPEG',
    SalePrice: '2900',
    isSoldOut: false,
    isPutOnSale: 1,
    description: [
      'https://p3-search.byteimg.com/img/labis/2961145754e9044a3a499ad9daab251d~480x480.JPEG',
      'https://p3-search.byteimg.com/img/labis/7829c88e0cd6f659ed7f8484a1794b4f~480x480.JPEG',
    ],
  },
  {
    uid: '101010101',
    spuId: '241120004',
    categoryId: '303',

    title: '美妆蛋套装 3个装 粉色',
    primaryImage: 'https://p3-search.byteimg.com/img/labis/dc6a1c5edd406db92604a8165bb92f5f~480x480.JPEG',
    SalePrice: '900',
    isSoldOut: false,
    isPutOnSale: 1,
    description: [
      'https://p3-search.byteimg.com/img/labis/aa8c6608035c8cc2b028bacda94bf164~480x480.JPEG',
      'https://p3-search.byteimg.com/img/labis/305a341b9021e57d843f7ffc28b3680b~480x480.JPEG',
    ],
  },
  {
    uid: '111111111',
    spuId: '241120005',
    categoryId: '102',

    title: '桌面收纳盒 木质',
    primaryImage: 'https://p3-search.byteimg.com/img/labis/d14956f5e96f4ac442701b1f32c68069~480x480.JPEG',
    SalePrice: '1900',
    isSoldOut: false,
    isPutOnSale: 1,
    description: [
      'https://p3-search.byteimg.com/img/labis/d6719e528facf6f67a56d679302f8e9a~480x480.JPEG',
      'https://p3-search.byteimg.com/img/labis/604fb5c1cdb01bedc0c71f3212bb8009~480x480.JPEG',
    ],
  },
  {
    uid: '121212121',
    spuId: '241120006',
    categoryId: '402',

    title: 'iPhone 13 128G 粉色 95新',
    primaryImage: 'https://p3-search.byteimg.com/img/tos-cn-i-qvj2lq49k0/5ddafae36aa2418f8360dde0533f108b~480x480.jpeg',
    SalePrice: '99900',
    isSoldOut: false,
    isPutOnSale: 1,
    description: [
      'https://p3-search.byteimg.com/img/pgc-image/e1d7492e94ee4b81ad01447eedd7b602~480x480.JPEG',
      'https://p3-search.byteimg.com/img/tos-cn-i-qvj2lq49k0/77b955f881c4447a88f3bc035208e40c~480x480.jpeg',
    ],
  },
  {
    uid: '131313131',
    spuId: '241120007',
    categoryId: '403',

    title: 'iPad Pro 2022 256G WIFI版',
    primaryImage: 'https://p3-search.byteimg.com/img/tos-cn-i-qvj2lq49k0/30ff5eeb5ff14a85b22b6c0072b33e4a~480x480.jpeg',
    SalePrice: '259900',
    isSoldOut: false,
    isPutOnSale: 1,
    description: [
      'https://p3-search.byteimg.com/img/tos-cn-i-qvj2lq49k0/d72ddab2072b4c0781332fc36bebfff6~480x480.png',
      'https://p3-search.byteimg.com/img/labis/5ba436c86cdab4af5add43ed5b583fc4~480x480.JPEG',
    ],
  },
  {
    uid: '141414141',
    spuId: '241120008',
    categoryId: '202',

    title: '男士休闲夹克 黑色 全新',
    primaryImage: 'https://p3-search.byteimg.com/img/labis/056985a0f663bccc8205f8cc909ce346~480x480.JPEG',
    SalePrice: '4900',
    isSoldOut: false,
    isPutOnSale: 1,
    description: [
      'https://p3-search.byteimg.com/img/labis/85cd52518146600c25d642e2a3edbec4~480x480.JPEG',
      'https://p3-search.byteimg.com/img/labis/056985a0f663bccc8205f8cc909ce346~480x480.JPEG',
    ],
  }
];



//从现有商品数据中查找或根据一定规则创建新的商品信息，因为是模拟数据，所以有重复
export function genGood(id) {
  // 如果id是字符串，按spuId查找商品
  if (typeof id === 'string') {
    const item = allGoods.find(good => good.spuId === id);
    if (item) {
      return {
        ...item,
        description: item?.description || defaultDesc,
        images: item.description?.[0] || item.primaryImage,
        primaryImage: item.primaryImage,
      };
    }
  }
  
  // 如果id是数字，返回单个商品
  if (typeof id === 'number') {
    const item = allGoods[id % allGoods.length];
    return {
      ...item,
      description: item?.description || defaultDesc,
      images: item.description?.[0] || item.primaryImage,
      primaryImage: item.primaryImage,
    };
  }
  
  // 如果没有传id，返回所有商品
  return allGoods.map(item => ({
    ...item,
    description: item?.description || defaultDesc,
    images: item.description?.[0] || item.primaryImage,
    primaryImage: item.primaryImage,
  }));
}