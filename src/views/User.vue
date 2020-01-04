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
        <label v-if="Object.keys(user).length > 0">{{user.nick_name}}</label>
        <button v-else
                class="login"
                style="border:none;"
                open-type="getUserInfo"
                lang="zh_CN"
                @click="login"
        >请点击登陆</button>
      </van-col>
    </van-row>
    <router-link to="/setting"><van-cell title="设置" icon="setting-o" is-link /></router-link>
  </div>
</template>

<script>
import store from 'storejs';
export default {
  data(){
    return {
      user:[]
    };
  },
  created() {
    let user = store.get('user');
    if (user) {
        this.user = user;
    }else {
      this.$router.replace("/login");
    }
  },
  methods:{
    login(){
      this.$router.replace('/login')
    },
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
  border-bottom: 3px solid #f2f2f4;
}

.userInfo img {
  width: 60px;
  height: 60px;
  border-radius: 100px 100px;
  box-shadow: 0 2px 5px 0 #888;
}

.userInfo span {
  text-align: center;
  line-height: 60px;
  margin-left: 20px;
  text-indent: 20px;
  font-weight: bold;
  color: #000;
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