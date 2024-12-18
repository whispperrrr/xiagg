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
      // 触发父组件的事件处理函数
      this.triggerEvent('toAddWishList');
    },

    toBuyNow(e) {
      wx.showModal({
        title: '提示',
        content: '请在卖家详情页查看卖家联系方式，自行沟通购买',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定');
          }
        }
      });
    },

  },
});