<template>
  <!--search 查找商品-->
  <div>
    <div class="container">
      <i-input v-model="sreachData" size="large" class="sreach" placeholder="输入你想查找的商品">
        <!--i-input 输入文本框 HTML中placeholder默认数据-->
        <Button slot="append" icon="ios-search" @click="sreach"></Button>
        <!--当组件渲染的时候，<slot></slot> 将会被替换为“Your Profile”。插槽内可以包含任何模板代码，包括 HTML：-->
        <!--icon小图标-->
      </i-input>
      <Tag v-for="(item, index) in promotionTags" :key="index" closable  @on-close="closeTags(index)"><span @click="selectTags(index)">{{item}}</span></Tag>
    </div>
    <!--tag就是标记，可以有圆角型，方形，自定义等等-->
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      sreachData: '',
      promotionTags: ['买2免1', '领200神券', '199减100', '母婴5折抢', '充100送20']
    };
  },
  methods: {
    closeTags (index) {
      this.promotionTags.splice(index, 1);
      // splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。index：必需。整数，规定添加/删除项目的位置，
      // 使用负数可从数组结尾处规定位置。从index开始，删除一个元素
    },
    selectTags (index) {
      this.sreachData = this.promotionTags[index];
    },
    sreach () {
      this.$router.push({path: '/goodsList', query: { sreachData: this.sreachData }});
    // 还有一种方法patams传参 ，路径不能使用path 只能使用name,不然获取不到传的数据  this.$router.push({name: 'dispatch', params: {paicheNo: obj.paicheNo}})
      // vue this.$router.push()传参 this.$router.push({path: '/transport/dispatch', query: {paicheNo: obj.paicheNo}})   取数据：this.$route.query.paicheNo
    }

  }
};
</script>

<style scoped>
.container {
  padding-top: 15px;
  margin: 0px auto;
  margin-bottom: 15px;
  width: 460px;
}
.sreach {
  margin: 5px 0px;
}
</style>
<!--查找搜索-->
<!--111111-->
