<template>
  <div class="body">
    <div class="login">
      <a class="logo">
        <svg
          height="48"
          class="octicon octicon-mark-github"
          viewBox="0 0 16 16"
          version="1.1"
          width="48"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          />
        </svg>
      </a>
      <div>
        <h1>Sign in to OpenGMS</h1>
        <el-card shadow="always" class="signCard">
          <el-form :model="formItem">
            <el-form-item>
              <label for="login_field">Username or email address</label>
              <el-input v-model="formItem.name"></el-input>
            </el-form-item>
            <el-form-item>
              <label for="password">
                password
                <a href="javascript:;">Forgot password?</a>
              </label>
              <el-input v-model="formItem.password" type="password"></el-input>
            </el-form-item>
            <V5Button name="v5" host="freetvks2vi2.verify5.com" token="b31a30f2ea8d4da19e7ae83b778c4433"></V5Button>
            <el-button class="signInButton" type="success" @click="login">Sign in</el-button>
          </el-form>
        </el-card>
        <p class="create-account-callout">
          New to OpenGMS?
          <a href="javascript:;" @click="register">Create an account</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from "@/request/http.js";
import md5 from "js-md5";
import { V5Button } from "verify5-vue";
export default {
  name: "login",
  data() {
    return {
      formItem: {
        name: "",
        password: ""
      }
    };
  },
  methods: {
    //进行登录
    async login() {
      try {
        let form = new FormData();
        form.append("name", this.formItem.name);
        form.append("password", md5(this.formItem.password));
        let response = await post("/user/login", form);
        let token = response.Authorization;
        this.$store.dispatch('User/handleLogIn', {
            name: this.formItem.name,
            token: token
        });
        let redirect = decodeURIComponent(this.$route.query.redirect || "/");
        if (redirect != undefined) {
            this.$message({
              message: "Login Success",
              type: 'success'
            });
            this.$router.push({
                path: redirect
            });
        } else {
            //测试，先跳转到about页面，主页逻辑还有问题
            this.$router.push({ name: "about"});
        }
      } catch (error) {
          this.$throw(error);
      }
    },

    validation() {
      //TODO 自定义校验规则
    },

    register () {
      this.$router.push({ name: "register"});
    }
  },
  components: {
      V5Button
  }
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}

.body {
    width: 100%;
    height: 100%;
    background: #eee;
    position: absolute;
}

.login {
  display: flex;
  flex-direction: column;
  margin: 6% auto;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
}

a {
  color: #0366d6;
  text-decoration: none;
}

.logo {
  margin: 0 auto;
}

h1 {
  margin: 20px auto;
  text-align: center;
}

// 登录formData样式

.signCard {
  margin: 15px auto;
  width: 25%;
}

label a {
  float: right;
}

.signInButton {
  width: 100%;
}

.create-account-callout {
  text-align: center;
}
</style>