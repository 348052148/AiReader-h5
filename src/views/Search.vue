<template>
  <div :style="{background: '#fff',}">
    <van-nav-bar title="搜索" left-text="返回" left-arrow fixed @click-left="onClickLeft" />

    <div style="height:46px;"></div>
    <div class="search">
      <van-search
        v-model="searchKey"
        placeholder="全网书籍搜索"
        shape="round"
        :style="{
                        padding: '10px 7px',
                        position: 'fixed',
                        zIndex: 1000,
                        height:'40px',
                        width:'100%',
                    }"
        @search="onSearch"
        @cancel="onCancel"
      ></van-search>
    </div>
    <div
      :style="{color: 'rgb(127, 127, 130)',padding: '0px 8px',fontSize: '16px',marginTop:'50px',}"
      v-if="!searchKey"
    >
      <div
        :style="{
                    borderBottom: '1px solid #ccc',
                    marginBottom: '15px',
                    }"
      >
        <van-row>
          <van-col span="10">大家都在搜</van-col>
          <van-col span="5" offset="9" class="action">
            <van-icon name="replay" class="icon" />换一换
          </van-col>
        </van-row>
        <div class="item">
          <span v-for="(keyWord, index) in hotKeyWords" :key="index" @click="keywordSearch(keyWord)">{{keyWord}}</span>
        </div>
      </div>
      <div>
        <van-row>
          <van-col span="10">搜索历史</van-col>
          <van-col  @click="clearSearchHistory" span="4" offset="10" class="action">
            <van-icon name="delete" class="icon" />清空
          </van-col>
        </van-row>
        <div class="item">
          <span v-for="(keyWord, index) in hotKeyWords" :key="index"  @click="keywordSearch(keyWord)">{{keyWord}}</span>
        </div>
      </div>
    </div>
    <div :style="{marginTop: '50px'}" v-else>
      <van-list v-model="loading" :error.sync="error" :finished="finished" finished-text="没有更多了" error-text="请求失败，点击重新加载" @load="onLoad">
        <router-link v-for="(book,index) in books" :key="index" :to="'/book?bookId='+ book.book_id">
          <van-cell class="book">
            <van-image class="cover" width="100" height="140" :src="book.cover" />
            <div class="meta">
              <h3>{{book.title}}</h3>
              <span class="author">作者：{{book.author}}</span>
              <span class="desc">{{book.detail}}</span>
            </div>
          </van-cell>
        </router-link>
      </van-list>
    </div>
  </div>
</template>

<script>
import Api from "../api.js";
import "../assets/book.css";
import store from 'storejs';
export default {
  data() {
    return {
      searchKey: "",
      books: [],
      page: 1,
      error: false,
      loading: false,
      finished:false,
      hotKeyWords:["斗罗大陆","悲伤逆流成河"]
    };
  },
  created(){
      this.hotKeyWords = store.get('hotKeyWords') || [];
  },
  methods: {
    onCancel() {
      this.searchKey = "";
      this.books = [];
    },
    onLoad() {
      this.searchBooks(this.searchKey, this.page);
    },
    keywordSearch(keyWord){
        this.finished  = false;
        this.searchKey = keyWord;
        this.page =1;
        this.books = [];
    },
    searchBooks(searchKey, page){
        Api.searchBooks(searchKey, page, res => {
        if (res.data.list.length <= 0) {
            this.finished = true;
        }
        for (let i = 0; i < res.data.list.length; i++) {
          this.books.push(res.data.list[i]);
        }
        this.loading = false;
        this.page = page + 1;
      });
    },
    clearSearchHistory(){
        this.hotKeyWords = [];
        store.set('hotKeyWords',this.hotKeyWords);
    },
    onSearch() {
      this.books = [];
      this.page  = 1;
      if (!this.searchKey) {
        return;
      }
      //
      this.searchBooks(this.searchKey, this.page);

      if(!this.hotKeyWords.includes(this.searchKey)) {
          this.hotKeyWords.push(this.searchKey);
      }
      store.set('hotKeyWords', this.hotKeyWords.slice(-10));
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.icon {
  vertical-align: middle;
  font-size: 18px;
  margin-right: 3px;
}
.action {
  color: #f98726;
  font-size: 15px;
}
.item {
  margin-top: 10px;
  padding-bottom: 10px;
}
.item span {
  background: #f3f3f3;
  padding: 8px 8px;
  text-align: center;
  margin-right: 8px;
  font-size: 13px;
  margin-bottom: 8px;
  display: inline-block;
}
</style>