<template>
  <div>
    <van-nav-bar title="书籍详情" fixed left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="book-detail">
      <div class="book-head">
        <van-image
          class="cover"
          width="120"
          height="160"
          :src="getbookImg(book.book_id)"
          :show-loading="true"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
      <span class="title">{{book.title}}</span>
      <span class="author">{{book.author}}</span>
      <div class="op">
        <router-link :to="'/reader?bookId='+book.book_id+'&bookName='+book.title">
          <van-button plain hairline type="danger">开始阅读</van-button>
        </router-link>

        <span class="i"></span>
        <van-button
          plain
          hairline
          type="primary"
          @click="joinBookShelf"
          :disabled="canJoinBookShelf"
        >加入书架</van-button>
      </div>
      <span class="desc">{{book.detail}}</span>
    </div>
    <van-cell
      title="目录"
      icon="other-pay"
      is-link
      :value="'共'+book.chapter_count+'章'"
      :to="'/chapter?bookId='+book.book_id"
    />

    <van-panel title="推荐" status="换一换">
      <div>
        <van-list v-model="loading" :error.sync="error" error-text="请求失败，点击重新加载" @load="onLoad">
          <van-cell class="book" v-for="(index) in list" :key="index">
            <van-image
              class="cover"
              width="100"
              height="140"
              src="http://s2.zimgs.cn/ims?kt=url&at=novel&key=aHR0cHM6Ly9ndy5hbGljZG4uY29tL0wxLzcyMy8xNTA1Mjk1MzA3LzQ4LzVjLzUwLzQ4NWM1MGZhYmY0YzEzNmY5ZGRkYzMwOWUxMjJlZmUzLmpwZw==&sign=yx:mhfWIS-vhd_C2wcePuiowWM5WOA=&tv=320_320&x.jpg"
            />
            <div class="meta">
              <h3>源尊</h3>
              <span class="author">作者：天蚕土豆</span>
              <span
                class="desc"
              >天地为炉，万物为铜，阴阳为炭，造化为工。 气运之争，蟒雀吞龙。 究竟是蟒雀为尊，还是圣龙崛起，凌驾众生？ 这是气掌乾坤的世界，磅礴宏伟，一气可搬山，可倒海，可翻天，可掌阴阳乾坤。 世间源气分九品，三品称玄，六品成天，九品号圣。 吾有一口玄黄气，可吞天地日月…</span>
            </div>
          </van-cell>
        </van-list>
      </div>
    </van-panel>
  </div>
</template>

<script>
// @ is an alias to /srcicon:
import Api from "../api.js";
import "../assets/book.css";
import { Toast, Notify } from "vant";
import store from "storejs";
export default {
  name: "home",
  components: {},
  data() {
    return {
      list: [1, 2, 3],
      error: false,
      loading: false,
      book: {},
      canJoinBookShelf: true
    };
  },
  created() {
    Toast.loading({
      message: "加载中...",
      forbidClick: true
    });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    let bookId = this.$route.query.bookId;
    Api.getBook(
      bookId,
      res => {
        if (res.status == 200) {
          this.book = res.data;
          Toast.clear();
          //历史浏览书籍
          let historyBooks = store.get("historyBooks") || [];
          let is = this.inBooks(historyBooks, this.book);
          if (is) {
            historyBooks.push(this.book);
          }
          store.set("historyBooks", historyBooks);

          //加入书架
          let user = store.get("user") || {};
          if (user) {
            Api.getBookShelf(user.user_id, res => {
              if (res.status == 200) {
                this.canJoinBookShelf = !this.inBooks(res.data, this.book);
              }
            });
          }
        } else {
          this.$router.go(-1);
        }
      },
      () => {
        Toast.clear();
        Notify({ type: "warning", message: "书籍不存在！" });
        setTimeout(() => {
          this.$router.go(-1);
        }, 1000);
      }
    );
  },
  methods: {
    onLoad() {},
    onClickLeft() {
      this.$router.go(-1);
    },
    inBooks(books, book) {
      let is = true;
      for (let i = 0; i < books.length; i++) {
        if (books[i].book_id == book.book_id) {
          is = false;
          break;
        }
      }
      return is;
    },
    joinBookShelf() {
      let user = store.get("user") || {};
      if (Object.keys(user).length > 0) {
        Api.addBookIntoBookShelf(user.user_id, this.book.book_id, res => {
          if (res.status != 200) {
            Toast.loading({
              message: res.data
            });
          } else {
            Notify({ type: "success", message: "加入书架成功！" });
            this.canJoinBookShelf = true;
          }
        });
      } else {
        //跳出提示框，并且引导用户进行登录
      }
    },
    getbookImg(bookId) {
      if (!bookId) {
        return false;
      }
      return "https://api.rbxgg.cn/book/image/" + bookId + ".jpeg";
    }
  }
};
</script>

<style scoped>
.book-detail {
  background: #fff;
  margin-top: 46px;
}
.book-detail .book-head {
  display: block;
  width: auto;
  text-align: center;
}
.book-detail .book-head .cover {
  margin: 0 auto;
}

.book-detail .title {
  display: block;
  width: 100%;
  line-height: 1.5em;
  font-size: 1.2em;
  text-align: center;
  color: black;
}

.book-detail .op {
  display: block;
  width: 100%;
  line-height: 2em;
  font-size: 0.8em;
  text-align: center;
}

.book-detail .op button {
  border-radius: 2em 2em;
}

.book-detail .op .i {
  width: 1.8em;
  display: inline-block;
}

.book-detail .author {
  display: block;
  width: 100%;
  line-height: 2em;
  font-size: 0.8em;
  text-align: center;
  color: rgb(0, 0, 0.3, 0.5);
}
.book-detail .desc {
  padding: 1em 1em;
  text-indent: 1em;
  color: black;
  font-size: 0.9em;
  color: #333;
  height: 9em;
  display: block;
  border-bottom: 1px solid #eeeeee;
}
</style>