// pages/sell/sell.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //上传图片
    originFiles: [],
    gridConfig: {
      column: 3,
      width: 160,
      height: 160,
    },
    config: {
      count: 1,
    },

    //上拉页面
    isMovableVisible: false,

    //发布数据
    descriptionTextarea: '',
    priceInput: '',
    selectedCampus: '',
    selectedShippingMethod: ''
  },

  //返回上一页
  goBack() {
    wx.navigateBack();
  },

  //发布商品
  goPublish(){
    const description = this.data.descriptionTextarea;
    const price = this.data.priceInput; 
    const selectedCampus = this.data.selectedCampus;
    const shippingMethod = this.data.selectedShippingMethod;
    const images = this.data.originFiles;

    //错误提示
    if (!description.trim()) {
      wx.showToast({
        title: '请填写商品描述',
        icon:'none'
      });
      return;
    }
    if (!price.trim()) {
      wx.showToast({
        title: '请输入价格',
        icon: 'none'
      });
      return;
    }
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!priceRegex.test(price)) {
      wx.showToast({
        title: '价格格式不正确，请输入正确的数字格式',
        icon: 'none'
      });
      return;
    }
    if (!selectedCampus) {
      wx.showToast({
        title: '请选择校区',
        icon: 'none'
      });
      return;
    } 
    if (!shippingMethod) {
      wx.showToast({
        title: '请选择发货方式',
        icon: 'none'
      });
      return;
    }
    if(images.length==0){
      wx.showToast({
        title: '请上传图片',
        icon: 'none'
      });
      return;
    }

    wx.request({
      url: '#', //***接口
      method: 'POST',
      data: {
        description,
        price,
        selectedCampus,
        shippingMethod,
        images,
      },
      success: (res) => {
        console.log('数据上传成功', res);
      },
      fail: (err) => {
        console.error('数据上传失败', err);
      },
    });
  },

  //上传图片
  handleSuccess(e) {
    const { files } = e.detail;
    this.setData({
      originFiles: files,
    });
  },
  handleRemove(e) {
    const { index } = e.detail;
    const { originFiles } = this.data;
    originFiles.splice(index, 1);
    this.setData({
      originFiles,
    });
  },
  handleClick(e) {
    console.log(e.detail.file);
  },

  //获取商品描述信息
  onDescriptionInput(e) {
    this.setData({
      descriptionTextarea: e.detail.value
    });
  },
  //获取价格信息
  onPriceInput(e){
    this.setData({
      priceInput:e.detail.value
    })
  },
  //获取选择的校区
  onCampusChange(e) {
    this.setData({
      selectedCampus: e.detail.value
    });
  },
  //获取选择的发货方式
  onShippingMethodChange(e) {
    this.setData({
      selectedShippingMethod: e.detail.value
    });
  },
  
  //上拉选择发货方式页面
  moveElementUp() {  
    this.setData({  
      isMovableVisible: true  
    });  
  } ,
  confirmSelection() {  
    this.setData({  
      isMovableVisible: false  
    });  
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  }
})