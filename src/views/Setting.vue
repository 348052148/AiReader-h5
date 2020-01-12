<template>
    <div>
        <van-nav-bar title="设置" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="back-content">
            <van-cell title="重置密码" to="/resetPassword" is-link />
            <van-cell title="联系我们" is-link />
            <van-cell title="帮助中心" is-link />
            <van-button type="info" class="exit-bu" @click="exitLogin" block>退出登录</van-button>
        </div>

    </div>
</template>

<script>
    import store from "storejs";
    import Api from '../api.js';
    export default {
        name: "Setting",
        methods: {
            onClickLeft(){
                this.$router.replace({ path: `/user` });
            },
            exitLogin(){  //退出登录
                Api.logout((res) => {
                    if (res.status == 200) {
                        store.set('user', false);
                        this.$router.replace('/login');
                    }
                })
            },
        },
    }

</script>

<style scoped>
    .exit-bu{
        margin-top: 25px;
    }
</style>