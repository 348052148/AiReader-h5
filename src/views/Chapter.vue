<template>
  <div class="reader">
    <van-nav-bar
      title="目录"
      left-text="返回"
      fixed
      left-arrow
      @click-left="onClickLeft"
    />
    <!--目录-->
    <div class="chapterContainer">
      <view class="chapter_topic">
        <view class="chapter_topic_title">目录</view>
      </view>

      <van-list v-model="loading" @load="onLoad" :finished="isfinish">
        <van-cell v-for="(chapter,item) in chapters" :key="item" is-link :to="'/reader?bookId='+bookId+'&chapter='+chapter.index" :title="chapter.title" />
      </van-list>
    </div>
  </div>
</template>

<script>
import Api from '../api.js';
export default {
  data() {
    return {
      error: false,
      loading: false,
      bookId:'',
      chapters:[],
      page:1,
      isfinish:false,
    };
  },
  created(){
    this.bookId = this.$route.query.bookId;
  },
  methods:{
    onLoad(){
      Api.getBookChapters(this.bookId,this.page, res=>{
        for(let i =0; i < res.data.count; i++) {
          this.chapters.push(res.data.list[i]);
        }
        if (res.data.count == 0) {
          this.isfinish = true;
        }
        this.loading = false;
        this.page = this.page+1;
      })
    },
    onClickLeft(){
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.chapterContainer {
  margin-top: 50px;
}
</style>