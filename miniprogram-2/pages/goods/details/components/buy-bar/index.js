Component({
  externalClasses: ['wr-sold-out', 'wr-class'],

  options: {
    multipleSlots: true
  },

  properties: {
    soldout: {
      // 商品是否下架
      type: Boolean,
      value: false,
    },
    isStock: {
      type: Boolean,
      value: true,
    }, // 是否有库存
    isSlotButton: {
      type: Boolean,
      value: false,
    }, // 是否开启按钮插槽
    minDiscountPrice: {
      type: String,
      value: '',
    },
    SalePrice: {
      type: String,
      value: '',
    },
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

    toBuyNow(e) {
      const {
        isStock
      } = this.properties;
      if (!isStock) return;
      this.triggerEvent('toBuyNow', e);
    },

    toNav(e) {
      const {
        url
      } = e.currentTarget.dataset;
      return this.triggerEvent('toNav', {
        e,
        url,
      });
    },
  },
});