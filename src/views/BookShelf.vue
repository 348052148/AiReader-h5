<template>
  <div class="bookshelf">
    <van-tabs v-model="active">
      <van-tab title="书架">
        <div
          v-if="mybooks.length < 1"
          style="color: #7d7e80; text-align: center;height:calc(100vh - 90px);line-height: 500px;"
        >
          <span>书架还是空的呢？亲快去逛逛吧！</span>
        </div>
        <div v-else>
          <van-row :style="{margin: '5px 17px'}">
            <van-col span="4" offset="20">
              <van-button
                plain
                type="info"
                size="small"
                @click="editShelf"
              >{{editStatus? '完成': '编辑'}}</van-button>
            </van-col>
          </van-row>
          <div v-if="user" class="section section_self" style="margin-bottom: 50px;">
            <div class="body" v-if="!editStatus">
              <ul>
                <router-link
                  v-for="(book,index) in mybooks"
                  :key="index"
                  :to="'/reader?bookId='+book.book_id+'&chapter='+book.read_num+'&bookName='+ book.title"
                >
                  <li>
                    <van-image
                      class="cover"
                      width="100"
                      height="150"
                      :src="getbookImg(book.book_id)"
                      :show-loading="true"
                      :error="book.cover"
                    >
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                    </van-image>

                    <span>
                      <label>{{book.title}}</label>
                    </span>
                    <span class="author">
                      <label>{{book.chapter_title}}</label>
                    </span>
                  </li>
                </router-link>
              </ul>
            </div>
            <div class="body" v-else>
              <ul>
                <van-checkbox-group v-model="checkedBook" ref="checkboxGroup">
                  <li v-for="(book, key) in mybooks" :key="key" :style="{position:'relative'}">
                    <div
                      :style="{background: 'rgb(51, 51, 51)',width: '100px', height: '150px', margin: '0 auto',position: 'relative'}"
                    >
                      <van-image
                        class="cover"
                        width="100"
                        height="150"
                        :src="book.cover"
                        :style="{opacity: '0.3'}"
                      />
                      <van-checkbox :name="book.book_id"></van-checkbox>
                    </div>

                    <span>
                      <label>{{book.title}}</label>
                    </span>
                    <span class="author">
                      <label>{{book.chapter_title}}</label>
                    </span>
                  </li>
                </van-checkbox-group>
              </ul>
              <div class="selfAction">
                <van-button
                  plain
                  type="primary"
                  style="margin-right:10px;"
                  size="small"
                  @click="checkAll"
                >全选</van-button>
                <van-button
                  plain
                  type="info"
                  size="small"
                  style="margin-right:10px;"
                  @click="toggleAll"
                >反选</van-button>
                <van-button plain type="info" size="small" @click="deleteShelf">删除</van-button>
              </div>
            </div>
          </div>
          <div class="login" v-else>
            <span class="tips">登录后使用书架</span>
            <router-link to="/login">
              <van-button type="warning">登录</van-button>
            </router-link>
          </div>
        </div>
      </van-tab>
      <van-tab title="最近阅读">
        <div
          v-if="historybooks.length < 1"
          style="color: #7d7e80; text-align: center;height:calc(100vh - 90px);line-height: 500px;"
        >
          <span>最近没有阅读记录，亲快去逛逛吧！</span>
        </div>
        <div v-else>
          <van-row :style="{margin: '5px 17px'}">
            <van-col span="12"></van-col>
            <van-col span="4" offset="8">
              <van-button plain type="info" size="small" @click="clearShelf">清空</van-button>
            </van-col>
          </van-row>
          <div class="section section_self">
            <div class="body">
              <ul>
                <router-link
                  v-for="(book,index) in historybooks"
                  :key="index"
                  :to="'/book?bookId='+book.book_id"
                >
                  <li>
                    <van-image class="cover" width="100" height="150" :src="book.cover" />
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
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import "../assets/list.css";
import store from "storejs";
import Api from "../api.js";
import { Toast, Notify } from "vant";
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
      historybooks: [],
      editStatus: false,
      checkedBook: []
    };
  },
  created() {
    this.user = store.get("user") || false;
    if (this.user) {
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      Api.getBookShelf(
        res => {
          this.mybooks = res.data.books;
          Toast.clear();
        },
        res => {
          Toast.clear();
          Notify({ type: "danger", message: res.data.message });
        }
      );
    } else {
      this.active = 1;
    }
    this.historybooks = store.get("historyBooks") || [];
  },
  methods: {
    clearShelf() {
      //清空历史记录
      this.historybooks = [];
      store.set("historyBooks", this.historybooks);
      Notify({ type: "success", message: "清除成功！" });
    },
    checkAll() {
      this.$refs.checkboxGroup.toggleAll(true);
    },
    toggleAll() {
      this.$refs.checkboxGroup.toggleAll();
    },
    deleteShelf() {
      //删除书架
      Api.removeBooksFromBookShelf(
        this.checkedBook,
        () => {
          Notify({ type: "success", message: "删除成功！" });
          //重新获取书架
          Api.getBookShelf(
            res => {
              this.mybooks = res.data.books;
              Toast.clear();
            },
            res => {
              Notify({ type: "danger", message: res.data.message });
            }
          );
        },
        res => {
          Notify({ type: "danger", message: res.data.message });
        }
      );
    },
    //书架编辑
    editShelf() {
      this.editStatus = !this.editStatus;
    },
    getbookImg(bookId) {
      if (!bookId) {
        return "";
      }
      return "https://api.rbxgg.cn/book/image/" + bookId + ".jpeg";
    },
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
.van-checkbox {
  padding: 0 7px;
  position: absolute;
  top: 5px;
  right: 3px;
  z-index: 3;
}
.selfAction {
  position: fixed;
  width: 100%;
  height: 50px;
  bottom: 50px;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.26);
  background: #fff;
  text-align: center;
  line-height: 50px;
}
</style>