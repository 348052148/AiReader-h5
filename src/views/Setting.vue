<template>
    <div>
        <div id="top_nav" class="top-nav" @click="onClickLeft">
            <van-icon name="arrow-left" class="icon-back" style="font-size: 20px;"/>
            <label class="nav-title">返回</label>
        </div>
        <div class="back-content">
            <van-cell title="联系我们" is-link />
            <van-cell title="帮助中心" is-link />
            <van-button type="info" class="exit-bu" @click="exitLogin" block>退出登录</van-button>
        </div>

    </div>
</template>

<script>
    import store from "storejs";

    export default {
        name: "Setting",
        methods: {
            onClickLeft(){
                this.$router.replace({ path: `/user` });
            },
            exitLogin(){  //退出登录
                store.set('user', {});
                this.$router.replace('/login');
            },
        },
    }

</script>

<style scoped>
    .exit-bu{
        margin-top: 25px;
    }
</style>