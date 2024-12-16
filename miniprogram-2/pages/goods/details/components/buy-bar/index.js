Component({
  externalClasses: ['wr-sold-out', 'wr-class'],

  options: {
    multipleSlots: true
  },

  properties: {
    soldout: { // 商品是否下架
      type: Boolean,
      value: false,
    },
    isStock: { // 是否有库存
      type: Boolean,
      value: true,
    }, 
    isSlotButton: { // 是否开启按钮插槽
      type: Boolean,
      value: false,
    }, 
    SalePrice: {
      type: String,
      value: '',
    },
    details:{ // 商品详情
      type: Object,
      value: {}
    } 
  },

  data: {
    fillPrice: false,
  },

  methods: {
    gotoHome() {
      wx.switchTab({
        url: '/pages/home/home',
      })
    },

    gotoWishlist() {
      wx.navigateTo({
        url: '/pages/cart/index', 
      })
    },

    toAddWishList(e) {
      console.log("加入心愿单");
    
      // 将 goodsList 存储在本地缓存中
      const goodsList = JSON.stringify(this.properties.details);
      wx.setStorageSync('goodsList', goodsList);
    
      this.triggerEvent('toAddWishList', { details }); // 触发自定义事件，传递商品详情
    },

    toBuyNow(e) {
      const {
        isStock
      } = this.properties;
      if (!isStock) return;
      this.triggerEvent('toBuyNow', e);
    },

  },
});