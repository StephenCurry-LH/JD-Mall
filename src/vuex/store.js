import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // state表示状态，可以认为state是一个数据库，保存了各种数据，但无法直接访问里面的数据
    isLoading: false, // 是否展示loading动画
    orderBy: 'sale', // 根据什么字段排序
    goodsInfo: { // 商品详情
      goodsImg: [],
      title: '',
      tags: [],
      discount: [],
      promotion: [],
      remarksNum: 0,
      setMeal: [],
      hot: [],
      goodsDetail: [],
      param: [],
      remarks: []
    },
    userInfo: {
      name: ''
    },
    signUpStep: 0, // 登陆步骤
    marketing: { // 营销
      CarouselItems: [], // 轮播图
      activity: [] // 活动
    },
    seckills: { // 秒杀
      deadline: {
        hours: 0,
        minute: 0,
        seconds: 0
      },
      goodsList: []
    },
    computer: {}, // 电脑专栏
    eat: {}, // 爱吃专栏
    asItems: [], // 广告
    goodsList: [], // 商品列表
    shoppingCart: [], // 购物车
    newShoppingCart: [], // 刚加入的购物车，作为展示
    recommend: [] // 推荐购买
  },
  getters,
  actions,
  mutations
//   mutations 表示变化，可以认为所有的state都是由mutations来驱动变化的，也可以认为他是setter
// getter 取值的方法，与setter相对
});
// 在整个vue.js中声明，我们要使用vuex进行状态管理
