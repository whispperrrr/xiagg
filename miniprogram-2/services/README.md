### services
`services`用于请求逻辑，可根据 `config.useMock` 配置来控制返回 `mock` 数据或是真实接口数据。

### _utils
- **delay**：用于模拟延迟执行。
- **timeout**：用于触发超时错误处理。

### address
- **fetchAddress**：用于获取用户的地址信息。

### comments
- **fetchComments**：用于获取用户的评论信息。
- **fetchCommentsCount**：用于获取用户的评论数量。

### good
- **comments**：
    - **fetchCommentDetails**：用于获取商品的评论详情信息。
- **fetchCategoriesList**：用于获取商品的分类列表。
- **fetchGood**：用于获取商品的详情信息。
- **fetchGoods**：用于获取商品列表。
- **fetchGoodsDetailsComments**：用于获取商品详情的评论信息。
- **fetchGoodsList**：用于获取商品列表。
- **fetchSearchHistory**：用于获取搜索历史。
- **fetchSearchResult**：用于获取搜索结果。

### home
- **fetchHomeData**：用于获取首页数据。

### usercenter
- **fetchPerson**：用于获取用户信息。
- **fetchUsercenter**：用于获取用户中心数据。 