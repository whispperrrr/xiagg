Component({
  externalClasses: ['custom-class'],

  properties: {
    category: { 
      type: Array,
    },
    initActive: { //初始化选中的分类
      type: Array,
      value: [],
      observer(newVal, oldVal) {
        if (newVal[0] !== oldVal[0]) {
          this.setActiveKey(newVal[0], 0);
        }
      },
    },
    isSlotRight: { //是否在右侧显示slot
      type: Boolean,
      value: false,
    },
    level: { //分类层级
      type: Number,
      value: 3,
    },
  },
  data: {
    activeKey: 0, //当前激活的父分类索引
    subActiveKey: 0, //当前激活的子分类索引
  },
  attached() {
    if (this.properties.initActive && this.properties.initActive.length > 0) {
      this.setData({
        activeKey: this.properties.initActive[0],
        subActiveKey: this.properties.initActive[1] || 0,
      });
    }
  },
  methods: {
    onParentChange(event) { //切换父分类
      this.setActiveKey(event.detail.index, 0).then(() => {
        this.triggerEvent('change', [
          this.data.activeKey,
          this.data.subActiveKey,
        ]);
      });
    },
    onChildChange(event) { //切换子分类, 并触发change事件, 用于传递分类id, 筛选商品
      this.setActiveKey(this.data.activeKey, event.detail.index).then(() => {
        this.triggerEvent('change', [
          this.data.activeKey,
          this.data.subActiveKey,
        ]);
      });
    },
    changCategory(event) { //切换分类
      const categoryId = event.currentTarget.dataset.categoryId;
      this.triggerEvent('changeCategory', { categoryId });

      const { item } = event.currentTarget.dataset;
      this.triggerEvent('changeCategory', {
        item,
      });
    },
    setActiveKey(key, subKey) { //设置当前激活的分类
      return new Promise((resolve) => {
        this.setData(
          {
            activeKey: key,
            subActiveKey: subKey,
          },
          () => {
            resolve();
          },
        );
      });
    },
  },
});
