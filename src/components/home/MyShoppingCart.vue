<template>
  <div>
    <Table border ref="selection" :columns="columns" :data="shoppingCart" size="large" no-data-text="您的购物车没有商品，请先添加商品到购物车再点击购买"></Table>
    <div class="go-to">
      <Button @click="goTo" type="primary">去付款</Button>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'MyShoppingCart',
  data () {
    return {
      shoppingCart: [],
      // 这个一定要写，要不然都不到数据
      columns: [
        {
          type: 'selection',
          width: 58,
          align: 'center'
        },
        {
          title: '图片',
          key: 'receiverName',
          width: 86,
          align: 'center'
        },
        {
          title: '标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '套餐',
          width: 198,
          key: 'package',
          align: 'center'
        },
        {
          title: '数量',
          key: 'count',
          width: 68,
          align: 'center'
        },
        {
          title: '价格',
          width: 68,
          key: 'receiverPhone',
          align: 'center'
        }
      ]
    };
  },
  created () {
    this.loadShoppingCart();
    this.getlist();
  },
  computed: {
    ...mapState(['shoppingCart'])
  },
  methods: {
    ...mapActions(['loadShoppingCart']),
    getlist: function () {
      var self = this;
      $.ajax({
        type: 'GET',
        url: 'http://mall.caimingyang.cn:8080/test',
        async: false,
        success: function (data) {
          self.shoppingCart = data;
        },
        error: function (message) {
        }
      });
    },
    goTo () {
      this.$router.push('/order');
    }
  },
  store
};
</script>

<style scoped>
.go-to {
  margin: 15px;
  display: flex;
  justify-content: flex-end;
}
</style>
<!--11111-->
