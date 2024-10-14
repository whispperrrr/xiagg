import TabMenu from './data';
Component({
  data: {
    active: 0,
    list: TabMenu,
    showTabBar: true// 默认显示 TabBar 
  },

  methods: {
    onChange(event) {
      const selectedItem = this.data.list[event.detail.value];  
    
      // 判断是否点击的是“卖”页面  
      if (selectedItem.text === '卖') {  
        this.setData({ showTabBar: false }); // 隐藏 TabBar  
      } else {  
        this.setData({ showTabBar: true }); // 显示 TabBar  
      }  
  
      this.setData({ active: event.detail.value });  
      wx.switchTab({  
        url: selectedItem.url.startsWith('/')  
          ? selectedItem.url  
          : `/${selectedItem.url}`,  
      });  
    },

    init() {
      const page = getCurrentPages().pop();  
      const route = page ? page.route.split('?')[0] : '';  
      const active = this.data.list.findIndex(  
        (item) =>  
          (item.url.startsWith('/') ? item.url.substr(1) : item.url) ===  
          `${route}`,  
      );  
      
      // 初始化时判断当前页面是否为“卖”页面  
      if (active !== -1 && this.data.list[active].text === '卖') {  
        this.setData({ showTabBar: false });  
      } else {  
        this.setData({ showTabBar: true });  
      }  
  
      this.setData({ active });  
    },
  },
});
