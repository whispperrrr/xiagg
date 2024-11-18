Component({
  options: {
    addGlobalClass: true, //使用全局样式类
  },

  properties: {
    id: {
      type: String,
      value: '',
      observer(id) {
        this.genIndependentID(id);
      },
    },

    data: {
      type: Object,
      observer(data) {
        if (!data) {
          return;
        }
        this.setData({ goods: data });
      },
    },
  }, //properties

  data: {
    independentID: '', //用于给商品卡片设置独立的id
    goods: { id: '' }, //存储商品相关信息
  },

  lifetimes: {
    ready() {
      this.genIndependentID(this.properties.id);
    },
  },

  methods: {
    clickHandle() { //触发click自定义事件，并将当前组件的goods数据作为参数传递出去
      //console.log(this.data.goods);
      this.triggerEvent('click', { goods: this.data.goods });
    },

    genIndependentID(id) { //根据传入的 id 参数生成独立的 id，如果传入的 id 为空，则随机生成一个以 goods-card- 开头的 id，并更新组件内部的 independentID 数据
      let independentID;
      if (id) {
        independentID = id;
      } else {
        independentID = `goods-card-${~~(Math.random() * 10 ** 8)}`;
      }
      this.setData({ independentID });
    },
  }, //methods
});
