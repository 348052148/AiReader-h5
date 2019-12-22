<template>
  <div class="bookshelf">
      <van-nav-bar
      title="书架"
    />
    <van-tabs v-model="active">
      <van-tab title="书架">
        <div v-if="user.id" class="section">
          <div class="head">
          </div>
          <div class="body">
            <ul >
              <li v-for="(index) in list" :key="index">
                <van-image
                  class="cover"
                  width="100"
                  height="150"
                  src="http://s2.zimgs.cn/ims?kt=url&at=novel&key=aHR0cHM6Ly9ndy5hbGljZG4uY29tL0wxLzcyMy8xNTA1Mjk1MzA3LzQ4LzVjLzUwLzQ4NWM1MGZhYmY0YzEzNmY5ZGRkYzMwOWUxMjJlZmUzLmpwZw==&sign=yx:mhfWIS-vhd_C2wcePuiowWM5WOA=&tv=320_320&x.jpg"
                />
                <span>源尊</span>
                <span class="author">作者：天蚕土豆</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="login" v-else >
              <span class="tips">登录后使用书架</span>
              <van-button type="warning">登录</van-button>
        </div>
      </van-tab>
      <van-tab title="最近阅读">
        <div class="section">
          <div class="head">
          </div>
          <div class="body">
            <ul>
              <li v-for="(index) in list" :key="index">
                <van-image
                  class="cover"
                  width="100"
                  height="150"
                  src="http://s2.zimgs.cn/ims?kt=url&at=novel&key=aHR0cHM6Ly9ndy5hbGljZG4uY29tL0wxLzcyMy8xNTA1Mjk1MzA3LzQ4LzVjLzUwLzQ4NWM1MGZhYmY0YzEzNmY5ZGRkYzMwOWUxMjJlZmUzLmpwZw==&sign=yx:mhfWIS-vhd_C2wcePuiowWM5WOA=&tv=320_320&x.jpg"
                />
                <span>源尊</span>
                <span class="author">作者：天蚕土豆</span>
              </li>
            </ul>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// @ is an alias to /srcicon:

export default {
  name: "home",
  components: {},
  data() {
    return {
      active:0,
      list: [1, 2, 4, 5, 6],
      error: false,
      loading: false,
      user:{},
      mybooks:[],
      historybooks:[]
    };
  },
  created(){
    if (!this.user.id) {
      this.active = 1;
    }
  },
  methods: {
    onLoad() {}
  }
};
</script>

<style scoped>
.login {
  text-align: center;
  display: block;
  width: 100%;
  background: #ffffff;
}
.login .tips {
  display: block;
  width: 100%;
  text-align: center;
  color:goldenrod;
  line-height: 50px;
}
.login button {
  width: 100px;
}

.section {
  display: inline-block;
  background: #ffffff;
}
.section .head {
  display: block;
  float: left;
  width: 100%;
  background: #ffffff;
  height: 1.5em;
  border: 1px solid #eeeeee;
}

.section .head .edit {
  float: left;
  font-size: 30px;
  line-height: 3em;
  display: block;
  color: #000;
}
.section .head .more {
  float: right;
  line-height: 35px;
  margin-right: 10px;
  color: #000;
}
.section .body {
  background: #ffffff;
  display: block;
  width: 100%;
  float: left;
}
.section .body ul {
  display: inline-block;
}
.section .body ul li {
  float: left;
  width: 33.3%;
  text-align: center;
  /*HACK */
}

.section .body ul li .cover {
  margin: 0 auto;
}
.section .body ul li > span {
  display: block;
  float: left;
  text-align: center;
  width: 100%;
  color: #000;
}

.section .body ul li .author {
  color: rgba(0, 0, 0, 0.3);
  line-height: 30px;
  font-size: 12px;
}
</style>