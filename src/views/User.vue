<template>
  <div>
    <van-nav-bar
      title="个人中心"
    />
    <div class="userInfo">
      <img src="" onerror="this.src='http://img.zcool.cn/community/01b7645deb9963a801213853840618.png@1280w_1l_2o_100sh.png';this.onerror=null" alt="http://img.zcool.cn/community/01b7645deb9963a801213853840618.png@1280w_1l_2o_100sh.png" />
      <span v-if="user"> {{user.nick_name}}</span>
      <button
        v-else
        class="login"
        style="border:none;"
        open-type="getUserInfo"
        lang="zh_CN"
        bindgetuserinfo="login"
      >请点击登陆</button>
    </div>
    <van-cell title="设置" icon="shop-o" is-link />
    <van-cell title="联系我们" icon="phone-circle-o" is-link />
    <van-cell title="帮助中心" icon="more-o" is-link />
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
  height: 60px;
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

.userInfo .login {
  display: inline-block;
  text-align: center;
  line-height: 50px;
  margin-left: 20px;
  text-indent: 30px;
  font-weight: bold;
  color: #cb1c36;
  border: none;
  background: #fff;
}
</style>