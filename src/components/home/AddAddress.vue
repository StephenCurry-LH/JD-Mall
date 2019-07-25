<template>
  <div>
    <div class="add-container">
      <div class="add-title">
        <h1>添加收货地址</h1>
      </div>
      <div class="add-box">
        <Form :v-model="formData" label-position="left" :label-width="100" :rules="ruleInline">
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
      <div class="add-submit">
        <Button type="primary" @click="add">添加地址</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Distpicker from 'v-distpicker';
import axios from 'axios';
import qs from 'qs';
export default {
  name: 'AddAddress',
  data () {
    return {
      formData: {
        receiver_name: '',
        receiver_addr: '',
        receiver_phone: '',
        receiver_zip: '',
        receiver_province: '辽宁省',
        receiver_city: '沈阳市',
        receiver_district: '和平区',
        address_id: ''
      },
      ruleInline: {
        receiver_name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
          //           trigger: ‘blur’ 表示“当失去焦点时（光标不显示的时候），触发此提示”
          // 此处应该是有一个校验，若失去焦点，则触发trigger进行校验，若校验不成功，则进行提示
        ],
        receiver_addr: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        receiver_zip: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' }
        ],
        receiver_phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    getProvince (data) {
      this.formData.receiver_province = data.value;
    },
    getCity (data) {
      this.formData.receiver_city = data.value;
    },
    add () {
      // var li = this.formData.name + this.formData.province + this.formData.city + this.formData.area + this.formData.address + this.formData.phone + this.formData.postalcode;
      // alert(data);
      // this.data = JSON.parse(data);
      // alert(li);
      // var hang = JSON.parse(li);
      // axios.post(`http://mall.caimingyang.cn:8080/shipping`, this.formData)
      // // // http://mall.caimingyang.cn:8080
      //   .then(res => {
      //     console.log('res=>', res);
      //   });
      // this.$ajax({
      //   methods: 'post',
      //   url: 'http://mall.caimingyang.cn:8080/shipping',
      //   data:
      //     {
      //       name: 'lihang',
      //       info: 'wrong'
      //     }
      // }).then(function (res) {
      //   console.log(res);
      // }).catch(function (error) {
      //   console.log(error);
      // });
      // this.$ajax.post('http://mall.caimingyang.cn:8080/shipping')
      //   .then(function (res) {
      //     console.log(res.data);
      //   })
      //   .catch(function (res) {
      //     console.log(res);
      //   });
      // this.$http.post('http://mall.caimingyang.cn:8080/shipping', qs.stringify({
      //  formData.area
      // }),
      // {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      //   }
      // }).then(function (response) {
      //   console.log(response);
      // }).catch(function (error) {
      //   console.log(error);
      // });
      // this.$http.post('/user', {
      //   params: {
      //     formData
      //   }
      // })
      //   .then(response => {
      //     console.log(response);
      //   })
      //   // 错误处理
      //   .catch(error => {
      //     console.log(error);
      //   });
      // var from = new formData();
      $.ajax({
        type: 'POST',
        url: 'http://mall.caimingyang.cn:8080/shipping',
        // contentType: 'application/json; charset=utf-8',
        data: this.formData,
        // dataType: 'json',
        success: function (data) {
          alert('yes');
        },
        error: function (message) {
          alert('no');
        }
      });
      // $.ajax({
      //   type: 'GET',
      //   url: 'http://mall.caimingyang.cn:8080/shipping',
      //   success: function (data) {
      //     for (var i in data) {
      //       alert(data[i].receiver_addr);
      //     }
      //   },
      //   error: function (message) {
      //     alert(message);
      //   }
      // });
    },
    getdistrict (data) {
      this.formData.receiver_district = data.value;
    }
  },
  components: {
    Distpicker
  }
};
</script>

<style scoped>
.add-container {
  margin: 15px auto;
  width: 60%;
  min-width: 600px;
}
.add-title {
  margin-bottom: 15px;
  text-align: center;
}
.add-submit {
  display: flex;
  justify-content: center;
}
</style>
<!--11111-->
<!--<html>-->
<!--<body>-->
<!--<form method="post" action=".">-->
  <!--<input name="username">-->
  <!--<input name="password">-->
  <!--<input type="submit" />-->
<!--</form>-->
<!--</body>-->
<!--</html>-->
