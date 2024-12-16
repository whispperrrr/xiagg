import { fetchPerson } from '../../../services/usercenter/fetchPerson';
import { phoneEncryption } from '../../../utils/util';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  onNavigateToPage2: function() {
    wx.navigateTo({
      url: '/pages/login/login' 
    });
  },
  data: {
    personInfo: {
      avatarUrl: '',
      nickName: '',
      gender: 0,
      phoneNumber: '',
      studentNumber: '',
    },
    showUnbindConfirm: false,
    pickerOptions: [
      {
        name: '男',
        code: '1',
      },
      {
        name: '女',
        code: '2',
      },
    ],
    typeVisible: false,
    genderMap: ['', '男', '女'],
  },
  onLoad() {
    this.init();
    const studentNumber = wx.getStorageSync('studentNumber');
    if (studentNumber) {
      this.setData({
        'personInfo.studentNumber': studentNumber,
      });
    }
  },
  onLoad: function () {
    this.loadPersonInfo();
  },

  // 页面显示时也加载数据，防止用户在输入学号后跳转回页面时没有更新
  onShow: function () {
    this.loadPersonInfo();
  },

  // 加载个人信息，包括学号
  loadPersonInfo: function () {
    const studentNumber = wx.getStorageSync('studentNumber');  // 获取存储的学号
    if (studentNumber) {
      this.setData({
        'personInfo.studentNumber': studentNumber,  // 更新学号
      });
    }
    const phoneNumber = wx.getStorageSync('phoneNumber');  // 获取存储的电话号码
    if (phoneNumber) {
      this.setData({
        'personInfo.phoneNumber': phoneNumber,  // 更新电话号码
      });
    }
  },
  onClickCellForPhoneNumber: function () {
    wx.navigateTo({
      url: '/pages/usercenter/person-info/inputPhoneNumber',
    });
  },

  onClickCellForStudentNumber: function () {
    wx.navigateTo({
      url: '/pages/usercenter/person-info/inputStudentNumber',
    });
  },
  init() {
    this.fetchData();
  },
  fetchData() {
    fetchPerson().then((personInfo) => {
      this.setData({
        personInfo,
        'personInfo.phoneNumber': phoneEncryption(personInfo.phoneNumber),
      });
    });
  },
  onClickCell({ currentTarget }) {
    const { dataset } = currentTarget;
    const { nickName } = this.data.personInfo;

    switch (dataset.type) {
      case 'gender':
        this.setData({
          typeVisible: true,
        });
        break;
      case 'name':
        wx.navigateTo({
          url: `/pages/usercenter/name-edit/index?name=${nickName}`,
        });
        break;
      case 'avatarUrl':
        this.toModifyAvatar();
        break;
      default: {
        break;
      }
    }
  },
  onClose() {
    this.setData({
      typeVisible: false,
    });
  },
  onConfirm(e) {
    const { value } = e.detail;
    this.setData(
      {
        typeVisible: false,
        'personInfo.gender': value,
      },
      () => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '设置成功',
          theme: 'success',
        });
      },
    );
  },
  async toModifyAvatar() {
    try {
      const tempFilePath = await new Promise((resolve, reject) => {
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: (res) => {
            const { path, size } = res.tempFiles[0];
            if (size <= 10485760) {
              resolve(path);
            } else {
              reject({ errMsg: '图片大小超出限制，请重新上传' });
            }
          },
          fail: (err) => reject(err),
        });
      });
      const tempUrlArr = tempFilePath.split('/');
      const tempFileName = tempUrlArr[tempUrlArr.length - 1];
      Toast({
        context: this,
        selector: '#t-toast',
        message: `已选择图片-${tempFileName}`,
        theme: 'success',
      });
    } catch (error) {
      if (error.errMsg === 'chooseImage:fail cancel') return;
      Toast({
        context: this,
        selector: '#t-toast',
        message: error.errMsg || error.msg || '修改头像出错了',
        theme: 'error',
      });
    }
  },
});