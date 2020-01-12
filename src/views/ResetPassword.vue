<template>
  <div class="resetPassword">
    <van-nav-bar title="重置密码" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-row>
      <van-field v-model="password" label="密码" type="password" placeholder="请输入密码" />
      <van-field
        v-model="surePassword"
        type="password"
        label="确认密码"
        placeholder="请再次输入密码"
        :error-message="surePasswordMsg"
      />
    </van-row>
    <van-button type="info" @click="resetAction" block>重置</van-button>
  </div>
</template>

<script>
import Api from "../api.js";
export default {
  data() {
    return {
      password: "",
      surePassword: "",
      surePasswordMsg: ""
    };
  },
  methods: {
    resetAction() {
      this.surePasswordMsg = "";
      if (this.password != this.surePassword) {
        this.surePasswordMsg = "请输入一致的密码";
      }
      Api.resetPassword(this.password, res => {
        if (res.status == 200) {
          this.resetPasswordSuccess();
        } else {
          this.surePassword = res.data.message;
        }
      });
    },
    resetPasswordSuccess() {
      this.$router.go(-1);
    },
    onClickLeft(){
        this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.restBtn {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
</style>