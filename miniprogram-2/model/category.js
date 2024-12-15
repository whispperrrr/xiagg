export function getCategoryList() {
  return [{
      groupId: '10',
      name: '生活用品',
      children: [{
        groupId: '10',
        name: '生活用品',
        children: [{
            groupId: '101',
            name: '教材书籍',
            thumbnail: '/images1/image_categories/教材书籍.png',
          },
          {
            groupId: '102',
            name: '置物收纳',
            thumbnail: '/images1/image_categories/置物收纳.png',
          }
        ],
      }, ],
    },
    {
      groupId: '20',
      name: '服装',
      children: [{
        groupId: '20',
        name: '服装',
        children: [{
            groupId: '201',
            name: '女装',
            thumbnail: '/images1/image_categories/女装.png'
          },
          {
            groupId: '202',
            name: '男装',
            thumbnail: '/images1/image_categories/男装.png',
          },

        ],
      }, ],
    },
    {
      groupId: '30',
      name: '美妆',
      children: [{
        groupId: '30',
        name: '美妆',
        children: [{
            groupId: '301',
            name: '口红',
            thumbnail: '/images1/image_categories/口红.png',
          },
          {
            groupId: '302',
            name: '眼影',
            thumbnail: '/images1/image_categories/眼影.png',
          },
          {
            groupId: '303',
            name: '美妆工具',
            thumbnail: '/images1/image_categories/美妆.png',
          },
        ],
      }, ],
    },
    {
      groupId: '40',
      name: '数码',
      children: [{
        groupId: '40',
        name: '数码',
        children: [{
            groupId: '401',
            name: '相机',
            thumbnail: '/images1/image_categories/相机.png',
          },
          {
            groupId: '402',
            name: '手机',
            thumbnail: '/images1/image_categories/手机.png',
          },
          {
            groupId: '403',
            name: '平板',
            thumbnail: '/images1/image_categories/平板.png',
          }
        ],
      }, ],
    },


  ];
}