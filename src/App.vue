<template>
  <div id="app">
    <router-view />
    <van-tabbar v-if="main" v-model="active" @change="onChange">
      <van-tabbar-item
        v-for="(tabbar,index) in tabbars"
        :key="index"
        :icon="tabbar.icon"
        :to="tabbar.to"
      >{{tabbar.title}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      tabbars: [
        {
          icon: "home-o",
          title: "首页",
          to: "/home"
        },
        {
          icon: "bookmark-o",
          title: "书架",
          to: "/bookshelf"
        },
        {
          icon: "user-o",
          title: "个人",
          to: "/user"
        }
      ],
      main: true
    };
  },
  created() {
    let path = this.$route.path;
    this.tabHandle(path);
  },
  watch: {
    $route: {
      handler: function(val) {
        let path = val.path;
        this.tabHandle(path);
      }
    },
    deep: true
    
  },
  methods: {
    tabHandle(path){
      if (path == "/" || path == "/home" || path == "/bookshelf" || path == "/user") {
          if (path == "/home" || path == "/") {
            this.active = 0;
          }
          if (path == "/bookshelf") {
            this.active = 1;
          }
          if (path == "/user") {
            this.active = 2;
          }
          this.main = true;
      } else {
          this.main = false;
      }
    },
    onChange() {
      //this.tabbars[index].
    }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #fff;
  position: relative;
  opacity: 1;
  -webkit-transition: opacity 0.1s;
  transition: opacity 0.1s;
  min-height: 100%;
  margin: 0 auto;
  overflow: hidden;
  font-size: 15px;
}

.van-nav-bar__left {
  font-size: 15px;
  left: 5px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
