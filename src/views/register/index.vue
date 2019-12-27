<template>
  <div class="register">
    <div class="text-center">
      <h1 class="title">Built for developers</h1>
      <p class="lead-mtkg">
        OpenGMS is a development platform inspired by the way you work. From open source to business,
        you can host and review code, manage projects, and build software alongside 40 million developers.
      </p>
    </div>
    <el-card class="register-panel" shadow="always">
      <div slot="header" class="clearfix">
        <span>Register</span>
      </div>
      <el-form
        :model="registerForm"
        status-icon
        :rules="rules"
        ref="registerForm"
        class="register-ruleForm"
      >
        <el-form-item prop="name">
          <label for="register_name">Username</label>
          <el-input v-model="registerForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <label for="register_email" aria-autocomplete="false">Email</label>
          <el-input v-model="registerForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <label for="register_password">Password</label>
          <el-input
            type="password"
            v-model="registerForm.password"
            auto-complete="off"
            @input="contentRefresh(registerForm.password)"
            show-password
          ></el-input>
        </el-form-item>
        <p class="form-control-note text-gray-dark">
          Make sure it's
          <span
            :class="[attentionStyle.total ? 'active' : 'normal']"
          >at least 8 characters</span>
          <span :class="[attentionStyle.number ? 'active' : 'normal']">including a number,</span>
          <span :class="[attentionStyle.upper ? 'active' : 'normal']">a uppercase letter</span>
          <span :class="[attentionStyle.lower ? 'active' : 'normal']">and a lowercase letter.</span>
        </p>
        <el-button
          class="signUpButton"
          type="success"
          @click="submitForm('registerForm')"
        >Sign up for OpenGMS</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { post, get } from "@/request/http.js";
import md5 from "js-md5";
import utils from "@/utils/validate.js";
import config from "@/config";
export default {
  name: "register",
  data() {
    var validUsername = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("please input the userName"));
      }
      get(`/user/validate?name=${value}`)
        .then(res => {
            if (!res) {
              return callback(
                new Error("Username " + value + " is not available")
              );
            } else {
              return callback();
            }
        })
        .catch(error => {
          console.log("失败的原因是" + error.data);
        });
    };
    var validPassword = (rule, value, callback) => {
      //至少8个字符包含一个数字和一个小写字母
      const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
      if (value === "") {
        return callback(new Error("please input the password"));
      }
      setTimeout(() => {
        if (passwordReg.test(value)) {
          return callback();
        } else {
          return callback(new Error("please input the right password"));
        }
      }, 500);
    };
    return {
      registerForm: {
        name: "",
        email: "",
        password: ""
      },
      rules: {
        name: [
          {
            required: true,
            validator: validUsername,
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "please input email", trigger: "blur" },
          {
            type: "email",
            message: "please input the right email address",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          { required: true, validator: validPassword, trigger: "blur" }
        ]
      },
      attentionStyle: {
        total: false,
        number: false,
        upper: false,
        lower: false
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.register();
        } else {
          this.$message.error("Register Information Fill Error");
        }
      });
    },
    register() {
      //密码进行md5加密
      let form = new FormData();
      form.append("name", this.registerForm.name);
      form.append("password", md5(this.registerForm.password));
      form.append("email", this.registerForm.email);
      post("/user/register", form)
        .then(token => {
          this.$store.dispatch("User/handleLogIn", {
            name: this.registerForm.name,
            token: token
          });
          //测试，先跳转到about页面，主页逻辑还有问题
          this.$message({
            message: "Login Success, Jump to Home Page",
            type: "success"
          });
          this.$router.push({ name: "about" });
        })
        .catch(err => {
          this.$throw(error);
        });
    },
    contentRefresh(value) {
      //针对输入的数据进行正则匹配，从而设定不同的css样式
      this.attentionStyle.total = value.length >= 8 ? true : false;
      this.attentionStyle.number = /\d/.test(value) ? true : false;
      this.attentionStyle.lower = /[a-z]/.test(value) ? true : false;
      this.attentionStyle.upper = /[A-Z]/.test(value) ? true : false;
    }
  }
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}

.register {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  background: url(../../assets/images/simple-codelines.svg), #2b3137;
  background-size: cover;
  position: absolute;
  height: 100%;
}

.text-center {
  text-align: center !important;
}

.text-center .title {
  font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica,
    Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  font-weight: 500;
  color: #fff !important;
  margin: 0.67em 0;
  font-size: 48px !important;
}

.lead-mtkg {
  font-size: 20px;
  font-weight: 400;
  font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica,
    Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  margin-bottom: 24px !important;
  display: block;
  text-align: center !important;
  color: hsla(0, 0%, 100%, 0.6);
  line-height: 1.5;
}

.clearfix::before,
.clearfix::after {
  display: table;
  content: "";
}
.clearfix::after {
  clear: both;
}

.clearfix span {
  text-align: center;
  font-size: 1.5rem;
  display: block;
}

.register-panel {
  margin-bottom: 8%;
  margin-top: 3%;
  width: 30%;
}

.form-control-note {
  margin-top: 5px;
  font-size: 12px;
  display: block;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  line-height: 1.5;
}

.text-gray-dark {
  color: #24292e !important;
}

.normal {
  color: #cb2431 !important;
  font-weight: 600 !important;
}

.active {
  color: #28a745 !important;
}

.signUpButton {
  width: 100%;
  background-color: #2ebc4f;
  border-color: #2ebc4f;
  padding: 20px 32px;
}
</style>