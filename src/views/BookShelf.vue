<template>
  <div class="bookshelf">
    <van-nav-bar title="书架" />
    <van-tabs v-model="active">
      <van-tab title="书架">
        <div v-if="user" class="section">
          <div class="body">
            <ul>
              <router-link
                v-for="(book,index) in mybooks"
                :key="index"
                :to="'/reader?bookId='+book.book_id+'&chapter='+book.read_num"
              >
                <li>
                  <van-image class="cover" width="100" height="150" :src="book.cover" />
                  <span>{{book.title}}</span>
                  <span class="author">读到：{{book.chapter_title}}</span>
                </li>
              </router-link>
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
              <router-link
                v-for="(book,index) in historybooks"
                :key="index"
                :to="'/book?bookId='+book.book_id"
              >
                <li>
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
import "../assets/list.css";
import store from "storejs";
import Api from "../api.js";
import { Toast } from "vant";
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
    this.user = store.get("user") || {};
    if (this.user) {
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      Api.getBookShelf(this.user.user_id, res => {
        if (res.status == 200) {
          this.mybooks = res.data;
          Toast.clear();
        }
      });
    } else {
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