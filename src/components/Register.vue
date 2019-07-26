<template>
  <div>
    <div class="register-wrapper">
      <div id="register">
        <p class="title">注册</p>
        <el-form
          :model="rform"
          status-icon
          :rules="rrules"
          ref="rform"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="nickname">
            <el-input v-model="rform.nickname" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="rform.password" auto-complete="off" placeholder="输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input type="password" v-model="rform.checkPass" auto-complete="off" placeholder="确认密码" show-password></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input v-model="rform.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="rform.email" placeholder="请输入电子邮箱"></el-input>
          </el-form-item>
          <!--          <el-form-item prop="smscode" class="code">-->
          <!--            <el-input v-model="rform.smscode" placeholder="验证码"></el-input>-->
          <!--            <el-button type="primary" :disabled='isDisabled' @click="sendCode">{{buttonText}}</el-button>-->
          <!--          </el-form-item>-->
          <el-form-item prop="role">
            <el-select v-model="rform.role" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.role"
                :label="item.label"
                :value="item.role">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="question">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入安全问题"
              v-model="rform.question">
            </el-input>
          </el-form-item>
          <el-form-item prop="answer">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入安全问题的答案"
              v-model="rform.answer">
            </el-input>
          </el-form-item>
          <el-form-item>
            <head-shot></head-shot>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('rform')" style="width:100%;">注册</el-button>
            <p class="login" @click="gotoLogin">已有账号？立即登录</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import HeadShot from './HeadShot';
export default {
  name: 'Register',
  components: {HeadShot},
  data () {
    // <!--验证手机号是否合法-->
    let checkTel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'));
      } else if (!this.checkMobile(value)) {
        callback(new Error('手机号码不合法'));
      } else {
        callback();
      }
    };
    //  <!--验证码是否为空-->
    let checkSmscode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机验证码'));
      } else {
        callback();
      }
    };
    // <!--验证密码-->
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.rform.checkPass !== '') {
          if (value.length < 6) {
            callback(new Error('密码长度至少6位'));
          } else {
            this.$refs.rform.validateField('checkPass');
          }
        }
        callback();
      }
    };
    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.rform.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    let checkMail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱地址'));
      } else {
        if (value !== '') {
          let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if (!reg.test(value)) {
            callback(new Error('请输入有效的邮箱'));
          }
        }
        callback();
      }
    };
    return {
      options: [{
        role: 'SHOPKEEPER',
        label: '商家'
      }, {
        role: 'CUSTOMER',
        label: '消费者'
      }],
      rform: {
        nickname: '',
        password: '',
        checkPass: '',
        phone: '',
        email: '',
        role: '',
        question: '',
        answer: '',
        smscode: '',
        avatar: ''
      },
      rrules: {
        nickname: [{required: true, trigger: 'blur', message: '请输入用户名'}, {min: 3, max: 16, message: '用户名长度3-16个字符'}],
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        phone: [{ validator: checkTel, trigger: 'blur' }],
        email: [{validator: checkMail, trigger: 'blur'}],
        smscode: [{ validator: checkSmscode, trigger: 'blur' }]
      },
      buttonText: '发送验证码',
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true
    };
  },
  methods: {
    // <!--发送验证码-->
    sendCode () {
      let tel = this.rform.tel;
      if (this.checkMobile(tel)) {
        console.log(tel);
        let time = 60;
        this.buttonText = '已发送';
        this.isDisabled = true;
        if (this.flag) {
          this.flag = false;
          let timer = setInterval(() => {
            time--;
            this.buttonText = time + ' 秒';
            if (time === 0) {
              clearInterval(timer);
              this.buttonText = '重新获取';
              this.isDisabled = false;
              this.flag = true;
            }
          }, 1000);
        }
      }
    },
    // <!--提交注册-->
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // setTimeout(() => {
          //   alert('注册成功')
          // }, 400)
          this.trans();
        } else {
          console.log('error submit!!');
          alert('注册失败');
          return false;
        }
      });
    },
    trans () {
      let formData = new FormData();
      formData.append('nickname', this.rform.nickname);
      formData.append('password', this.rform.password);
      // formData.append('checkPass', this.rform.checkPass)
      formData.append('phone', this.rform.phone);
      formData.append('email', this.rform.email);
      formData.append('role', this.rform.role);
      formData.append('question', this.rform.question);
      formData.append('answer', this.rform.answer);
      formData.append('avatar', this.rform.avatar);

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      this.axios.post('http://mall.caimingyang.cn:8080/register', formData, config).then(function (res) {
        // if (res.status === 200) {
        /* 这里做处理 */
        alert('zhufukai');
        alert('res.data');
        console.log(res.data);
        // }
      })
        .catch(function (err) {
          if (err.response) {
            console.log(err.response);
            alert('hello test');
          }
        });
    },
    // newTrans () {
    //   // eslint-disable-next-line standard/object-curly-even-spacing
    //   this.axios.post('/api/test', this.qs.stringify({name: this.name, pass: this.pass, checkPass: this.checkPass, tel: this.tel, mail: +this.mail }), {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    //   })
    //     .then(function (res) {
    //       console.log(res.data)
    //       // 控制台打印请求成功时返回的数据
    //       // bind(this)可以不用
    //     })
    //     .catch(function (err) {
    //       if (err.response) {
    //         console.log(err.response)
    //         // 控制台打印错误返回的内容
    //       }
    //       // bind(this)可以不用
    //     })
    // },
    // <!--进入登录页-->
    gotoLogin () {
      this.$router.push({
        path: '/login'
      });
    },
    // 验证手机号
    checkMobile (str) {
      let re = /^1\d{10}$/;
      return re.test(str);
    }

  }
};
</script>

<style scoped>
  /*.loading-wrapper {*/
  /*  position: fixed;*/
  /*  top: 0;*/
  /*  right: 0;*/
  /*  left: 0;*/
  /*  bottom: 0;*/
  /*  background: #aedff8;*/
  /*  display: flex;*/
  /*  align-items: center;*/
  /*  justify-content: center;*/
  /*}*/
  /*.register-wrapper img {*/
  /*  position: absolute;*/
  /*  z-index: 1;*/
  /*}*/
  /*.register-wrapper {*/
  /*  position: fixed;*/
  /*  top: 0;*/
  /*  right: 0;*/
  /*  left: 0;*/
  /*  bottom: 0;*/
  /*}*/
  /*#register {*/
  /*  max-width: 340px;*/
  /*  margin: 60px auto;*/
  /*  background: #fff;*/
  /*  padding: 20px 40px;*/
  /*  border-radius: 10px;*/
  /*  position: relative;*/
  /*  z-index: 9;*/
  /*}*/
  /*.title {*/
  /*  font-size: 26px;*/
  /*  line-height: 50px;*/
  /*  font-weight: bold;*/
  /*  margin: 10px;*/
  /*  text-align: center;*/
  /*}*/
  /*.el-form-item {*/
  /*  text-align: center;*/
  /*}*/
  /*.login {*/
  /*  margin-top: 10px;*/
  /*  font-size: 14px;*/
  /*  line-height: 22px;*/
  /*  color: #1ab2ff;*/
  /*  cursor: pointer;*/
  /*  text-align: left;*/
  /*  text-indent: 8px;*/
  /*  width: 160px;*/
  /*}*/
  /*.login:hover {*/
  /*  color: #2c2fd6;*/
  /*}*/
  /*.code >>> .el-form-item__content {*/
  /*  display: flex;*/
  /*  align-items: center;*/
  /*  justify-content: space-between;*/
  /*}*/
  /*.code button {*/
  /*  margin-left: 20px;*/
  /*  width: 140px;*/
  /*  text-align: center;*/
  /*}*/
  /*.el-button--primary:focus {*/
  /*  background: #409EFF;*/
  /*  border-color: #409EFF;*/
  /*  color: #fff;*/
  /*}*/
</style>
