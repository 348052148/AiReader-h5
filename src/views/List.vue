<template>
  <div>
    <van-nav-bar
      title="书籍列表"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />

  <div style="height:46px;"></div>

<div scroll-x="true"  scroll-left="0" enable-flex="true"  class="classify">
  <div v-for="(tab,index) in searchTabs" :class="selectClass(tab)" :key="index" @click="selectTab(index)" >{{tab.title}}</div>
</div>
<div v-if="classifys.length > 0"  class="classify">
  <div v-for="(classify,index) in classifys" :class="selectClass(classify)" :key="index" @click="selectClassify(index)" >{{classify.title}}</div>
</div>

    <van-list v-model="loading" :error.sync="error" error-text="请求失败，点击重新加载" @load="onLoad">
      <van-cell class="book" v-for="(book,index) in books" :key="index">
        <van-image
          class="cover"
          width="100"
          height="140"
          :src="book.cover"
        />
        <div class="meta">
          <h3>{{book.title}}</h3>
          <span class="author">作者：{{book.author}}</span>
          <span
            class="desc"
          >{{book.detail}}</span>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import Api from '../api.js';
export default {
  name: "home",
  components: {},
  data() {
    return {
      classifys:[],
      searchTabs:[],
      books: [],
      page:1,
      error: false,
      loading: false,
      attr:'all'
    };
  },
  created(){
      Api.getClassifys((res)=>{
          this.searchTabs = res.data;
      });
  },
  methods: {
    onLoad() {
      Api.getBooks(this.attr,this.page, res => {
        for (let i = 0; i < 10; i++) {
          this.books.push( res.data.list[i]);
        }
        this.loading = false;
      });
      this.page = this.page + 1;
    },
    selectTab(index) {
      for(let i=0; i < this.searchTabs.length; i++) {
        this.searchTabs[i].active=false;
      }
      this.searchTabs[index].active = true;
      if (this.searchTabs[index].menus) {
          this.classifys = this.searchTabs[index].menus;
           this.classifys[0].active = true;
           //flag
          this.attr =  this.classifys[0].flag;
      }else {
          this.classifys = [];
          this.attr =  'all';
      }

      Api.getBooks(this.attr,1, res => {
        this.books = res.data.list;
        this.loading = false;
      });
    },
    selectClassify(index){
        for(let i=0; i < this.classifys.length; i++) {
        this.classifys[i].active=false;
      }
      this.classifys[index].active = true;
      //flag
      this.attr =  this.classifys[index].flag;
      this.$set(this.classifys);

      Api.getBooks(this.attr,1, res => {
        this.books = res.data.list;
        this.loading = false;
      });
    },
    selectClass(obj){
        if(obj.active) {
          return 'classify-item active'
        }else {
          return 'classify-item'
        }
    },
    onClickLeft(){
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>

.classify {
  display: flex;
  white-space: nowrap;
  background: #fff;
  height: 35px;
  line-height: 35px;
  padding-left: 8px;
  border-bottom: 1px #eee solid;
  color: black;
  overflow-y:auto; overflow-x:auto;
}

.classify .classify-item{
  margin-top: 15rpx;
  margin-left: 10rpx;
  height: 35px;
  display: inline-block;
  line-height: 35px;
  font-size: 16px;
  padding: 0 5px;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

.active {
  color: #ff6347;
  /* border: 2rpx solid #ff6347; */
  /* border-radius: 25rpx; */
}

.book {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
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