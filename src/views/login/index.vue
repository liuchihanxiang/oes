<!-- 登录页面 -->
<template>
    <div class="login-page full-page">
        <el-form ref="loginForm" autoComplete="off" :model="loginForm" :rules="loginRule" class="login-form">
            <div class="loginTitle">OES考试系统</div>
            <el-form-item prop="username">
                <el-input v-model="loginForm.username"  :placeholder="$t('login.username')">
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" :placeholder="$t('login.password')"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :type="isActive" class="login-btn" @click="handleLogin">
                    <svg-icon icon-class="tree"></svg-icon>
                    {{$t('login.loginBtn')}}
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { login } from "@/api/login";
export default {
    data() {
        return {///info  primary
            loginForm: {
                username: "admin",
                password: "123456"
            },
            loginRule: {
                username: [
                    {
                        required: true,
                        message: this.$t("login.tips.emptyUsername")
                    },
                    {
                        pattern: /^[a-zA-Z]{3,10}$/,
                        message: this.$t("login.tips.usernameRules")
                    }
                ],
                password: [
                    {
                        required: true,
                        message: this.$t("login.tips.emptyPassword")
                    }
                ]
            }
        };
    },
    computed:{
        isActive(){            
            if(this.loginForm.username!=''&&this.loginForm.password!=''){
                return  'primary'
            }else{
                return 'info'
            }
        }
    },
    methods: {
        handleLogin() {
           if(this.isActive=='info')return false
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    login(
                        this.loginForm.username,
                        this.loginForm.password
                    ).then(res => {
                        this.$store.dispatch("setUsertoken", res.token.token);
                        this.$store.dispatch(
                            "setUsername",
                            this.loginForm.username
                        );
                        this.$router.push({ path: "/homePage" });
                    });
                }
            });
        }
    }
};
</script>
<style lang="scss"  scoped>
.login-page {
    background-image: url("./../../assets/reg-bg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .login-form {
        background-color: #ffffff;
        width: 460px;
        left: 50%;
        margin-left: -230px;
        border-radius: 5px;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
        padding: 65px 30px;
        position: fixed;
        top: 15%;
        .el-input__inner{
            border: none!important;
            // border-bottom:1px solid #e5e5e5; 
        }
        .loginTitle {
            background-image: url("./../../assets/head-logo.png");
            position: absolute;
            top: -47px;
            left: 116px;
            width: 228px;
            height: 93px;
            text-align: center;
            color: #fff;
            line-height: 93px;
        }
    }
    .login-btn {
        width: 100%;
    }
}
</style>