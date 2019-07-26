<template>
  <div>
    <div>
      <p slot="header">
        <Icon type="edit" ></Icon>
        <span>修改地址</span>
      </p>
    </div>
    <div class="address-box" v-for="(item, index) in address" :key="index">
      <div class="address-header">
        <span>{{item.receiver_name}}</span>
        <div class="address-action">
          <span @click="edit(index)"><Icon type="edit"></Icon> 修改</span>
          <span @click="del(index)"><Icon type="trash-a"></Icon> 删除</span>
        </div>
      </div>
      <div class="address-content">
        <p><span class="address-content-title"> 收 货 人 :</span> {{item.receiver_name}}</p>
        <p><span class="address-content-title">收货地区:</span> {{item.receiver_province}} {{item.receiver_city}} {{item.receiver_district}}</p>
        <p><span class="address-content-title">收货地址:</span> {{item.receiver_addr}}</p>
        <p><span class="address-content-title">邮政编码:</span> {{item.receiver_zip}}</p>
      </div>
    </div>
    <Modal v-model="modal" width="530">
      <!--Modal弹窗-->
        <p slot="header">
          <Icon type="edit"></Icon>
          <span>修改地址</span>
        </p>
        <div>
            <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
              <FormItem label="收件人" prop="name">
                <i-input v-model="formData.receiver_name" size="large"></i-input>
              </FormItem>
              <FormItem label="收件地区" prop="address">
                <Distpicker :province="formData.receiver_province" :city="formData.receiver_city" :area="formData.receiver_district" @province="getProvince" @city="getCity" @area="getdistrict"></Distpicker>
              </FormItem>
              <FormItem label="收件地址" prop="address">
                <i-input v-model="formData.receiver_addr" size="large"></i-input>
              </FormItem>
              <FormItem label="手机号码" prop="phone">
                <i-input v-model="formData.receiver_phone" size="large"></i-input>
              </FormItem>
              <FormItem label="邮政编码" prop="postalcode">
                <i-input v-model="formData.receiver_zip" size="large"></i-input>
              </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" long @click="editAction">修改</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapState, mapActions } from 'vuex';
import Distpicker from 'v-distpicker';
import axios from 'axios';
export default {
  name: 'MyAddress',
  data: function () {
    return {
      // address: {},
      modal: false,
      formData: {
        receiver_name: '',
        receiver_addr: '',
        receiver_phone: '',
        receiver_zip: '',
        receiver_province: '辽宁省',
        receiver_city: '沈阳市',
        receiver_distinct: '和平区'
      },
      ruleInline: {
        receiver_name: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        receiver_addr: [
          {required: true, message: '请输入地址', trigger: 'blur'}
        ],
        receiver_zip: [
          {required: true, message: '请输入邮政编码', trigger: 'blur'}
        ],
        receiver_phone: [
          {required: true, message: '手机号不能为空', trigger: 'blur'},
          {type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur'}
        ]
      }
    };
  },
  created: function () {
    this.getlist();
  },
  computed: {
    ...mapState(['address'])
  },
  methods: {
    ...mapActions(['loadAddress']),
    edit (index) {
      this.modal = true;
      this.formData.receiver_province = this.address[index].receiver_province;
      this.formData.receiver_city = this.address[index].receiver_city;
      this.formData.receiver_district = this.address[index].receiver_district;
      this.formData.receiver_addr = this.address[index].receiver_addr;
      this.formData.receiver_name = this.address[index].receiver_name;
      this.formData.receiver_phone = this.address[index].receiver_phone;
      this.formData.receiver_zip = this.address[index].receiver_zip;
    },
    li () {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/#/home/addAddress',
        async: false,
        success: function (data) {
          // this.address = this.data;
          // alert(this.data[0].recever_name);
          alert(data[0].receiver_city);
        },
        error: function (message) {
          alert(message);
        }
      });
    },
    getlist: function () {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/#/home/addAddress',
        // url: 'http://ipgw.neu.edu.cn',
        async: false,
        success: function (data) {
        // this.address = this.data;
        // alert(this.data[0].recever_name);
          alert('get数据成功');
        },
        error: function (message) {
          alert(message);
        }
      });
    },
    editAction () {
      this.modal = false;
      this.$Message.success('修改成功');
    },
    getProvince (data) {
      this.formData.receiver_province = data.value;
    },
    getCity (data) {
      this.formData.receiver_city = data.value;
    },
    getdistrict (data) {
      this.formData.receiver_district = data.value;
    },
    del (index) {
      this.$Modal.confirm({
        title: '信息提醒',
        content: '你确定删除这个收货地址',
        onOk: () => {
          this.$Message.success('删除成功');
        },
        onCancel: () => {
          this.$Message.info('取消删除');
        }
      });
    }
  },
  components: {
    Distpicker
  },
  store
};
</script>

<style scoped>
.address-box {
  padding: 15px;
  margin: 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #ccc;
}
.address-header {
  height: 35px;
  display: flex;
  justify-content: space-between;
  color: #232323;
  font-size: 18px;
}
.address-content {
  font-size: 14px;
}
.address-content-title {
  color: #999;
}
.address-action span{
  margin-left: 15px;
  font-size: 14px;
  color: #2d8cf0;
  cursor: pointer;
}
</style>
<!--11111-->
<!--// 获得商品评论数据-->
<!--getCommentByPage() {-->
<!--const url = `site/comment/getbypage/goods/${-->
<!--this.$route.params.goodsId-->
<!--}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;-->
<!--this.$axios.get(url).then(-->
<!--res => {-->
<!--this.comment = res.data;-->
<!--},-->
<!--err => {-->
<!--console.log(err);-->
<!--}-->
<!--);-->
<!--},-->
