<template>
  <div>
    <!--<div><Button type="primary" size="large" long @click="li">修改</Button></div>-->
     <Table border :columns="columns" :data="order" size="large" no-data-text="你还没有订单，快点去购物吧"></Table>
     <div class="page-size">
       <Page :total="100" show-sizer></Page>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyOrder',
  data () {
    return {
      order: [],
      // order0: [{
      //   'w': '1',
      //   'e': '1'
      // },
      // {
      //   'w': '2',
      //   'e': '1'
      // }],
      columns: [
        {
          title: '订单号',
          key: 'receiverName',
          width: 180,
          align: 'center'
        },
        {
          title: '订单号',
          key: 'receiverPhone',
          width: 180,
          align: 'center'
        }
      ]
    };
  },
  created: function () {
    this.getlist();
  },
  methods: {
    li () {
      alert(this.order[0].receiverName);
    },
    getlist: function () {
      var self = this;
      $.ajax({
        type: 'GET',
        url: 'http://mall.caimingyang.cn:8080/test',
        async: false,
        success: function (data) {
          self.order = data;
        },
        error: function (message) {
        }
      });
    }
  }
};
</script>

<style scoped>
.page-size {
  margin: 15px 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
<!--11111-->
