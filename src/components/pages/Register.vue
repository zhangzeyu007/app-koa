<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-23 21:54:14
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-30 16:37:31
-->
<template>
  <div class="regiser">
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <!-- form表单 -->
    <div class="register-panel">
      <van-form ref="registerForm" @submit="onSubmit">
        <van-field
          v-model="form.email"
          label="邮箱"
          icon="clear"
          placeholder="请输入邮箱"
          @click-right-icon="form.email = ''"
          clearable
          :error-message="emailErrorMsg"
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
          v-model="form.captcha"
          label="验证码"
          icon="clear"
          placeholder="请输入验证码"
          @click-right-icon="form.captcha = ''"
          required
          clearable
          :error-message="captchaErrorMsg"
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
        <van-field
          v-model="form.username"
          label="用户名"
          icon="clear"
          placeholder="请输入用户名"
          @click-right-icon="form.username = ''"
          required
          clearable
          :error-message="usernameErrorMsg"
          :rules="[{ required: true, message: '必须填写' }]"
        >
        </van-field>
        <van-field
          v-model="form.password"
          type="password"
          label="用户密码"
          icon="clear"
          name="password"
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
          v-model="form.repasswd"
          type="password"
          name="repasswd"
          label="再次输入密码"
          icon="clear"
          placeholder="请确认密码"
          @click-right-icon="form.repasswd = ''"
          required
          clearable
          :error-message="repasswdErrorMsg"
          :rules="[{ required: true, message: '必须填写' }]"
        >
        </van-field>
      </van-form>
    </div>
    <div class="register-button">
      <van-button
        type="primary"
        @click="registerClick"
        size="large"
        :loading="openLoading"
        >马上注册</van-button
      >
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
        username: "",
        password: "",
        captcha: "",
        repasswd: "",
      },
      openLoading: false, // 是否开启注册的loading状态
      emailErrorMsg: "",
      usernameErrorMsg: "",
      passwordErrorMsg: "",
      captchaErrorMsg: "",
      repasswdErrorMsg: "",
      captchaImage: "",
    };
  },
  created() {
    this.getCaptcha();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getCaptcha() {
      this.$api.user.getCaptcha().then((response) => {
        this.captchaImage = response;
      });
    },
    // 注册
    registerClick() {
      this.$refs.registerForm.submit();
    },
    // from表单检查
    checkForm() {
      let isOk = true;
      if (this.form.repasswd != this.form.password) {
        this.repasswdErrorMsg = "确认密码不正确";
        return;
      }
      return isOk;
    },
    onSubmit() {
      console.log("验证成功");
      if (this.checkForm()) {
        this.openLoading = true;
        this.$api.user
          .setRegister("/register", {
            email: this.form.email,
            userName: this.form.username,
            password: md5(this.form.password),
            captcha: this.form.captcha,
          })
          .then((response) => {
            console.log(response);
            if (response.code == 200) {
              Toast.success(response.message);
              this.$router.push("/");
            } else {
              this.openLoading = false;
              Toast.fail(response.message);
            }
          })
          .catch((err) => {
            this.openLoading = false;
            console.log(err);
          });
      }
    },
  },
};
</script>

<style  scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 10px;
}
.register-button {
  padding: 0 15px;
}
</style>