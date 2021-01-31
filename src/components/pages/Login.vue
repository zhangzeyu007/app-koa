<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-23 21:54:14
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-30 22:06:42
-->
<template>
  <div class="login">
    <van-nav-bar
      title="用户登录"
      left-text="注册"
      left-arrow
      @click-left="goRegister"
    />
    <div class="login-panel">
      <van-form ref="loginForm" @submit="onSubmit">
        <van-field
          v-model="form.email"
          label="邮箱"
          icon="clear"
          placeholder="请输入邮箱"
          @click-right-icon="form.email = ''"
          clearable
          required
          :rules="[
            { required: true, message: '必须填写' },
            {
              pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
              message: '邮箱格式不正确',
            },
          ]"
        >
        </van-field>
        <van-field
          v-model="form.password"
          type="password"
          label="用户密码"
          icon="clear"
          placeholder="请输入用户密码"
          @click-right-icon="form.password = ''"
          required
          clearable
          :rules="[
            { required: true, message: '必须填写' },
            {
              pattern: /^[\w_-]{6,12}$/g,
              message: '密码格式不正确',
            },
          ]"
        >
        </van-field>
        <van-field
          v-model="form.captcha"
          label="验证码"
          icon="clear"
          placeholder="请输入验证码"
          @click-right-icon="form.captcha = ''"
          required
          clearable
          use-button-slot
          :rules="[{ required: true, message: '必须填写' }]"
        >
          <van-image
            slot="button"
            width="80"
            height="35"
            v-html="captchaImage"
            @click="getCaptcha"
          />
        </van-field>
      </van-form>
    </div>
    <div class="login-button">
      <van-button
        type="primary"
        size="large"
        @click="loginClick"
        :loading="openLoading"
      >
        登录
      </van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import md5 from "md5";

export default {
  data() {
    return {
      form: {
        email: "951642243@qq.com",
        password: "",
        captcha: "",
      },
      openLoading: false, // 是否开启注册的loading状态
      captchaImage: "",
    };
  },
  created() {
    if (localStorage.token) {
      Toast.success("您已经登录过了");
      this.$router.push("/shopingMall");
    }
    this.getCaptcha();
  },
  methods: {
    // 提交校验成功
    onSubmit() {
      if (this.checkForm()) {
        this.openLoading = true;
        this.$api.user
          .Login("/login", {
            email: this.form.email,
            password: md5(this.form.password),
            captcha: this.form.captcha,
          })
          .then((response) => {
            console.log(response);
            if (response.code == 200) {
              if (response.data.token) {
                new Promise((resolve, reject) => {
                  localStorage.setItem("token", response.data.token);
                  setTimeout(() => {
                    resolve();
                  }, 500);
                }).then(() => {
                  Toast.success("登录成功");
                  this.$router.push("/shopingMall");
                });
              } else {
                Toast.fail(response.message);
                this.openLoading = false;
              }
            } else {
              Toast.fail(response.message);
              this.openLoading = false;
            }
          })
          .catch((err) => {
            Toast.fail("服务器错误");
            this.openLoading = false;
          });
      }
    },
    getCaptcha() {
      this.$api.user.getCaptcha().then((response) => {
        this.captchaImage = response;
      });
    },
    // 登录
    loginClick() {
      this.$refs.loginForm.submit();
    },
    // form校验
    checkForm() {
      let isOk = true;

      return isOk;
    },
    goRegister() {
      this.$router.push({ path: "/register" });
    },
  },
};
</script>

<style  scoped>
.login-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 10px;
}
.login-button {
  padding: 0 15px;
}
</style>