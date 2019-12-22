<template>
  <div class="home">
    <div class="search">
      <div class="searchContainer">
        <van-icon class="searchIcon" color="#999" name="search" />
        <input
          type="text"
          confirm-type="search"
          placeholder-class="placerStyle"
          bindconfirm="search"
          placeholder="全网书籍搜索"
          disabled="true"
        />
      </div>
    </div>

    <van-swipe :autoplay="3000" :height="180">
      <van-swipe-item v-for="(bannar, index) in bannars" :key="index">
        <img height="180" :src="bannar.img" />
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
          <router-link v-for="(book,index) in hotBooks" :key="index" :to="'/book?bookId='+ book.book_id">
            <li >
              <van-image class="cover" width="100" height="140" :src="book.cover" />
              <span>{{book.title}}</span>
              <span class="author">作者：{{book.author}}</span>
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
          <router-link v-for="(book,index) in recommendBooks" :key="index" :to="'/book?bookId='+ book.book_id">
            <li >
              <van-image class="cover" width="100" height="140" :src="book.cover" />
              <span>{{book.title}}</span>
              <span class="author">作者：{{book.author}}</span>
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
        <van-image class="cover" width="100" height="140" :src="book.cover" />
        <div class="meta">
          <h3>{{book.title}}</h3>
          <span class="author">作者：{{book.author}}</span>
          <span class="desc">{{book.desc}}</span>
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
export default {
  name: "home",
  components: {},
  data() {
    return {
      images: [
        "https://gw.alicdn.com/L1/723/1559622921/7b/06/03/7b06031349b594432e34c9e4704b4ee9.png",
        "https://gw.alicdn.com/L1/723/1557815538/39/94/0a/39940a428e1efd6cc35b8b46b90e41aa.jpg"
      ],
      list: [1, 2, 4, 5, 6],
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
    Toast.loading({
      message: "加载中...",
      forbidClick: true
    });
    Api.getHomeBooks(res => {
      this.hotBooks = res.data.hot;
      this.recommendBooks = res.data.recommend;
      this.bannars = res.data.bannars;
      setTimeout(()=>{
        Toast.clear();
      },200)
    });
    //book/search?attr=all&page=1
  },
  methods: {
    onLoad() {
      Api.getBooks('all',this.page, res => {
        for (let i = 0; i < 10; i++) {
          this.books.push( res.data.list[i]);
        }
        this.loading = false;
      });
      this.page = this.page + 1;
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

.searchIcon {
  position: absolute;
  top: 0.4em;
  left: 0.4em;
  z-index: 20;
  font-size: 20px;
}

.searchContainer input {
  background: #efefef;
  text-indent: 3em;
  color: #333;
  height: 2em;
  line-height: 2em;
  outline: none;
  border-radius: 1em;
  width: 99%;
  margin: 0 auto;
  border: 1px solid #eeeeee;
}

.placerStyle {
  color: #999;
  font: 14px;
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
  border: 1px solid #eeeeee;
}
.section .head h3 {
  float: left;
  margin: 0%;
  line-height: 35px;
  text-indent: 10px;
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
  display: inline-block;
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

.book {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  font-size: 12px;
}
.book .cover {
  display: block;
  float: left;
}

.book .meta {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  height: 100%;
  padding: 5px 0;

  margin-left: 110px;
}
.book .meta .author {
  color: rgba(0, 0, 0, 0.3);
  line-height: 30px;
}
.book .meta .desc {
  line-height: 22px;
  word-break: break-all;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;

  font-size: 12px;
}
.book .meta > h3 {
  margin: 0;
}
</style>