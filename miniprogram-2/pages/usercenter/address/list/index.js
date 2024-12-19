/* eslint-disable no-param-reassign */
import { fetchDeliveryAddressList } from '../../../../services/address/fetchAddress';
import Toast from 'tdesign-miniprogram/toast/index';
import { resolveAddress, rejectAddress } from './util';
import { getAddressPromise } from '../edit/util';

Page({
  data: {
    addressList: []
  },

  onLoad() {
    this.init();
  },

  init() {
    // 使用本地数据
    this.setData({
      addressList: [{
        name: '张三',
        phone: '13800138000',
        address: '广东省深圳市南山区',
        isDefault: true
      }]
    });
  },

  onAddAddress() {
    wx.navigateTo({
      url: '/pages/usercenter/address/edit/index'
    });
  }
});
