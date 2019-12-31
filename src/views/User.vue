<template>
  <div>
    <van-nav-bar
      title="个人中心"
    />
    <van-row class="userInfo">
      <van-col span="5">
        <img src="" onerror="this.src='http://img.zcool.cn/community/01b7645deb9963a801213853840618.png@1280w_1l_2o_100sh.png';this.onerror=null" alt="http://img.zcool.cn/community/01b7645deb9963a801213853840618.png@1280w_1l_2o_100sh.png" />
      </van-col>
      <van-col span="19" style="line-height: 60px;">
        <label v-if="false">随波逐流</label>
        <button v-else
                class="login"
                style="border:none;"
                open-type="getUserInfo"
                lang="zh_CN"
                bindgetuserinfo="login"
        >请点击登陆</button>
      </van-col>
    </van-row>
    <van-cell title="设置" icon="shop-o" is-link />
    <van-cell title="联系我们" icon="phone-circle-o" is-link />
    <van-cell title="帮助中心" icon="more-o" is-link />
  </div>
</template>

<script>
export default {
  data(){
    return {

    };
  },
  created() {
    // this.$router.replace("/login");
  },
  methods:{

  }
}
</script>

<style scoped>
.userInfo {
  background: #fff;
  display: flex;
  padding-top: 10px;
  padding-left: 20px;
  padding-bottom: 10px;
  color: #323233;
  margin-bottom: 5px;
}

.userInfo img {
  width: 60px;
  height: 60px;
  border-radius: 100px 100px;
  box-shadow: 0 2px 5px 0 #888;
}

.userInfo span {
  text-align: center;
  line-height: 150px;
  margin-left: 20px;
  text-indent: 30px;
  font-weight: bold;
}

.login {
  color: red;
  display: inline;
  background: #fff;
}
.van-cell__left-icon {
  margin-right: 10px;
  font-size: 25px;
  color: #1989fa;
}
</style>