<template>
  <div class="home">
    <div class="search">
      <div class="searchContainer">
        <router-link to="/Search">
          <van-search placeholder="全网书籍搜索" shape="round" :style="{background: 'rgba(0,0,0,0)',}"></van-search>
        </router-link>
      </div>
    </div>

    <van-swipe :autoplay="3000" :height="180">
      <van-swipe-item v-for="(bannar, index) in bannars" :key="index">
        <img height="180" width="100%" :src="bannar.img" />
      </van-swipe-item>
    </van-swipe>
    <!-- 热门 -->
    <div v-if="hotBooks.length>0" class="section">
      <div class="head">
        <h3>热门</h3>
        <router-link to="/list?attr=hot">
          <a class="more">更多</a>
        </router-link>
      </div>
      <div class="body">
        <ul>
          <router-link
            v-for="(book,index) in hotBooks"
            :key="index"
            :to="'/book?bookId='+ book.book_id"
          >
            <li>
              <van-image
                class="cover"
                width="100"
                height="140"
                :src="getbookImg(book.book_id)"
                :show-loading="true"
                :alt="book.cover"
                @error="errorImg"
              >
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>
              <span>
                <label>{{book.title}}</label>
              </span>
              <span class="author">
                <label>作者：{{book.author}}</label>
              </span>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
    <!-- 推荐 -->
    <div v-if="recommendBooks.length>0" class="section">
      <div class="head">
        <h3>推荐</h3>
        <router-link to="/list">
          <router-link to="/list?attr=recomment">
            <a class="more">更多</a>
          </router-link>
        </router-link>
      </div>
      <div class="body">
        <ul>
          <router-link
            v-for="(book,index) in recommendBooks"
            :key="index"
            :to="'/book?bookId='+ book.book_id"
          >
            <li>
              <van-image
                class="cover"
                width="100"
                height="140"
                :src="getbookImg(book.book_id)"
                :show-loading="true"
              >
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>
              <span>
                <label>{{book.title}}</label>
              </span>
              <span class="author">
                <label>作者：{{book.author}}</label>
              </span>
            </li>
          </router-link>
        </ul>
      </div>
    </div>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      :offset="800"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <router-link v-for="(book,index) in books" :key="index" :to="'/book?bookId='+ book.book_id">
        <van-cell class="book">
          <van-image
            class="cover"
            width="100"
            height="140"
            :src="getbookImg(book.book_id)"
            :show-loading="true"
            :error="book.cover"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <div class="meta">
            <h3>{{book.title}}</h3>
            <span class="author">作者：{{book.author}}</span>
            <span class="desc">{{book.detail}}</span>
          </div>
        </van-cell>
      </router-link>
    </van-list>
  </div>
</template>

<script>
// @ is an alias to /srcicon:
import Api from "../api.js";
import { Toast } from "vant";
import "../assets/list.css";
import "../assets/book.css";
import store from "storejs";
export default {
  name: "home",
  components: {},
  data() {
    return {
      error: false,
      loading: false,
      finished: false,
      hotBooks: [],
      recommendBooks: [],
      bannars: [],
      books: [],
      page: 1
    };
  },
  created() {
    let home = store.get("home") || false;
    if (!home) {
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      Api.getHomeBooks(res => {
        this.hotBooks = res.data.hot;
        this.recommendBooks = res.data.recommend;
        this.bannars = res.data.bannars;
        setTimeout(() => {
          store.set("home", {
            hotBooks: res.data.hot,
            recommendBooks: res.data.recommend,
            bannars: res.data.bannars
          });
          Toast.clear();
        }, 200);
      });
    } else {
      this.hotBooks = home.hotBooks;
      this.recommendBooks = home.recommendBooks;
      this.bannars = home.bannars;
    }

    //book/search?attr=all&page=1
  },
  methods: {
    search() {},
    onLoad() {
      Api.getBooks("all", this.page, res => {
        for (let i = 0; i < 10; i++) {
          this.books.push(res.data.list[i]);
        }
        this.loading = false;
      });
      this.page = this.page + 1;
    },
    getbookImg(bookId) {
      if (!bookId) {
        return '';
      }
      return "https://api.rbxgg.cn/book/image/" + bookId + ".jpeg";
    }
  }
};
</script>

<style scoped>
.searchfix {
  width: 100%;
  height: 85px;
}

.search {
  position: fixed;
  z-index: 200;
  width: 100%;
}
.searchContainer {
  padding-top: 2px;
  position: relative;
  text-align: center;
  font-size: 14px;
}

.placerStyle {
  color: #999;
  font: 14px;
}

.van-search {
  padding: 5px 8px;
}
</style>