<template>
  <div class="bookshelf">
    <van-nav-bar title="书架" />
    <van-tabs v-model="active">
      <van-tab title="书架">
        <div v-if="user" class="section">
          <div class="body">
            <ul>
              <li v-for="(book,index) in historybooks" :key="index">
                <van-image
                  class="cover"
                  width="100"
                  height="150"
                  :src="book.cover"
                />
                <span>{{book.title}}</span>
                <span class="author">作者：{{book.author}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="login" v-else>
          <span class="tips">登录后使用书架</span>
          <router-link to="/login">
            <van-button type="warning">登录</van-button>
          </router-link>
        </div>
      </van-tab>
      <van-tab title="最近阅读">
        <div class="section">
          <div class="body">
            <ul>
              <router-link v-for="(book,index) in historybooks" :key="index" :to="'/book?bookId='+book.book_id" >
                <li >
                  <van-image class="cover" width="100" height="150" :src="book.cover" />
                  <span>{{book.title}}</span>
                  <span class="author">作者：{{book.author}}</span>
                </li>
              </router-link>
            </ul>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// @ is an alias to /srcicon:
import "../assets/list.css";
import store from "storejs";
export default {
  name: "home",
  components: {},
  data() {
    return {
      active: 0,
      error: false,
      loading: false,
      user: {},
      mybooks: [],
      historybooks: []
    };
  },
  created() {
    this.user = store.get('user') || {}
    if (!this.user) {
      this.active = 1;
    }
    this.historybooks = store.get("historyBooks");
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
  color: goldenrod;
  line-height: 50px;
}
.login button {
  width: 100px;
}
</style>