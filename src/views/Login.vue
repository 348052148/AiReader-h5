<template>
    <div :style="{background: '#fff',color: 'rgb(127, 127, 130)',}">
        <van-nav-bar
                title="登录与注册"
                left-text="返回"
                left-arrow
                fixed
                @click-left="onClickLeft"
        />
        <div style="height:46px;"></div>
        <van-row class="title">
            <van-col span="12">手机号免注册登录</van-col>
            <van-col span="6" offset="6" class="action" v-if="type == 'login'" @click="toPwLogin">密码登录</van-col>
        </van-row>
        <van-cell-group>
            <van-field
                    v-model="phone"
                    label="手机号"
                    placeholder="请输入手机号"
                    :error-message="errPhoneMsg"
            />
            <van-field
                    v-if="type != 'pwLogin'"
                    v-model="sms"
                    center
                    clearable
                    label="短信验证码"
                    placeholder="请输入短信验证码"
            >
                <van-button slot="button" size="small" type="primary">发送验证码</van-button>
            </van-field>
            <van-field
                    v-if="type == 'pwLogin'"
                    v-model="password"
                    label="密码"
                    type="password"
                    placeholder="请输入密码"
                    :error-message="passwordMsg"
            />
        </van-cell-group>
        <div v-if="type == 'login' || type == 'pwLogin'">
            <van-row class="warn">
                <van-col span="24">登录代表您同意<span>《幽斋读书网阅读协议》</span></van-col>
            </van-row>
            <div class="loginDiv">
                <van-button type="info" size="normal" class="login" @click="loginAction">登录</van-button>
            </div>
            <div class="loginDiv">
                <span :style="{fontSize: '15px', color: '#1989fa'}" @click="toRegister">注册新账号</span>
            </div>
        </div>
        <div v-if="type == 'register'">
            <van-field
                    v-model="password"
                    label="密码"
                    type="password"
                    placeholder="请输入密码"
                    :error-message="passwordMsg"
            />
            <van-field
                    v-model="surePassword"
                    type="password"
                    label="确认密码"
                    placeholder="请再次输入密码"
                    :error-message="surePasswordMsg"
            />
            <van-row class="warn">
                <van-checkbox v-model="checked" shape="square" icon-size="15px">
                    <van-col span="24">已阅读并同意<span>《幽斋读书网阅读协议》</span></van-col>
                </van-checkbox>

            </van-row>
            <div class="loginDiv">
                <van-button type="info" size="normal" class="login" @click="registerAction">注册</van-button>
            </div>
            <div class="loginDiv">
                <span :style="{fontSize: '15px', color: '#1989fa'}" @click="toLogin">返回登录</span>
            </div>
        </div>

        <div class="loginDiv" :style="{marginTop:'50px',}">
            <div>
                <label class="line"></label><span :style="{margin: '0px 4px'}">更多登录方式</span><label class="line"></label>
            </div>
            <div class="loginItem">
                <img src="../assets/weixin.png"/><span>微信</span>
            </div>
            <div class="loginItem">
                <img src="../assets/QQ.png"/><span>QQ</span>
            </div>
            <div class="loginItem">
                <img src="../assets/weibo.png"/><span>微博</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return {
                phone: '',
                sms: '',
                errPhoneMsg: '',
                type: 'login',
                password: '',
                surePassword: '',
                passwordMsg: '',
                surePasswordMsg: '',
                checked: false,
            }
        },
        methods: {
            toPwLogin(){
                this.type = 'pwLogin'
            },
            toRegister(){
                this.type = 'register';
            },
            toLogin(){
                this.type = 'login';
            },
            loginAction(){

            },
            registerAction(){

            },
            onClickLeft(){
                this.$router.go(-1);
            },
        },
    }
</script>

<style scoped>
    .title{
        color: rgb(41, 41, 41);
        padding: 0px 8px;
        font-size: 18px;
        margin-top: 50px;
        font-weight: 600;
        margin-bottom: 15px;
    }
    .warn{
        padding: 0px 15px;
        margin-top: 10px;
        font-size: 14px;
        font-weight: 200;
        color: #323233
    }
    .warn span{
        color: #1989fa;
    }
    .action{
        font-size: 15px;
    }
    .loginDiv{
        width: 100%;
        text-align: center;
        margin-top: 30px;
    }
    .login{
        width: 92%;
        font-size:19px;
    }
    .action{
        color: #f98726;
        font-weight: 400;
    }
    .line{
        width: 70px;
        border-bottom: 1px solid #efefef;
        display: inline-block;
    }
    .loginItem{
        display: inline-block;
        margin-top:25px;
        width: 30%;
        height:54px;
    }
    .loginItem span{
        display: block;
    }
</style>