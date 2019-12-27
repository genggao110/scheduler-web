<template>
  <div class="resetPassword">
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
      <el-card class="reset-panel" shadow="always">
        <div slot="header" class="clearfix">
          <span>Reset your password</span>
        </div>
        <el-form :model="resetForm" :rules="rules" ref="resetForm" class="reset-ruleForm">
          <el-form-item prop="email">
            <label for="email">Email</label>
            <el-input v-model="resetForm.email" placeholder="Email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="verifyCode">
            <label for="verifyCode">Verification Code</label>
            <el-input v-model="resetForm.verifyCode" placeholder="verifyCode" auto-complete="off"></el-input>
            <span class="el-input__suffix">
              <span class="el-input__suffix-inner">
                <el-button
                  class="timer-button"
                  @click="getCode"
                  :disabled="disabled=!show||resetForm.email==''"
                >
                  <span v-show="show">get verifyCode</span>
                  <span v-show="!show" class="count">{{count}} s</span>
                </el-button>
              </span>
            </span>
          </el-form-item>
          <el-form-item prop="newPassword">
            <label for="newPassword">new Password</label>
            <el-input
              type="password"
              v-model="resetForm.newPassword"
              placeholder="new Password"
              auto-complete="off"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <label for="confirmPassword">Confirm Password</label>
            <el-input
              type="password"
              v-model="resetForm.confirmPassword"
              placeholder="Confirm Password"
              auto-complete="off"
              show-password
            ></el-input>
          </el-form-item>
          <el-button
            class="resetButton"
            type="success"
            @click="submit('resetForm')"
            :loading="loading"
          >Commit</el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { post } from "@/request/http.js";
import md5 from "js-md5";
const TIME_COUNT = 60; //倒计时时间
const EMAIL_REGEX = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
export default {
  name: "reset",
  data() {
    const validVerifyCode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("verification code can not be null"));
      } else {
        return callback();
      }
    };

    const validatePass = (rule, value, callback) => {
      const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
      if (value === "") {
        return callback(new Error("please input the password"));
      }
      if (passwordReg.test(value)) {
        if (this.resetForm.validatePass2 !== "") {
          this.$refs.resetForm.validateField("confirmPassword");
        }
        return callback();
      } else {
        return callback(new Error("please input the right password"));
      }
    };

    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("please input the password again"));
      } else if (value !== this.resetForm.newPassword) {
        callback(new Error("the two input password are inconsistent"));
      } else {
        callback();
      }
    };
    return {
      resetForm: {
        email: "",
        verifyCode: "",
        newPassword: "",
        confirmPassword: ""
      },
      rules: {
        email: [
          { required: true, message: "please input email", trigger: "blur" },
          {
            type: "email",
            message: "please input the right email address",
            trigger: ["blur", "change"]
          }
        ],
        verifyCode: [
          {
            required: true,
            validator: validVerifyCode,
            trigger: "blur"
          }
        ],
        newPassword: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ],
        confirmPassword: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      },
      show: true, //初始化启用按钮
      count: "", //初始化次数
      timer: null,
      loading: false
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.commit();
        } else {
          this.$message.error("Reset Password Information Fill Error");
        }
      });
    },
    getCode() {
      //邮箱验证
      if (
        this.resetForm.email === "" ||
        !EMAIL_REGEX.test(this.resetForm.email)
      ) {
        this.$message({
          message: "the email is wrong, please check it!",
          type: "warning"
        });
      } else {
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
          this.sendEmail();
        }
      }
    },
    sendEmail() {
      let form = new FormData();
      form.append("email", this.resetForm.email);
      post("/validate/getCode", form)
        .then(result => {
          if (result) {
            this.$message({
              message: "验证码已经发送至您的邮箱，请注意查收",
              type: "success"
            });
          } else {
            this.$message.error("获取验证码失败，请稍后重试！");
          }
        })
        .catch(err => {
          this.$throw(error);
        });
    },
    commit() {
      let form = new FormData();
      form.append("email", this.resetForm.email);
      form.append("verifyCode", this.resetForm.verifyCode);
      form.append("password", md5(this.resetForm.newPassword));
      form.append("confirmPassword", md5(this.resetForm.confirmPassword));
      post("/user/resetPassword", form)
        .then(result => {
          let redirect = decodeURIComponent(this.$route.query.redirect || "/");
          this.loading = false;
          if (redirect != undefined) {
            this.$message({
              message: "Reset Password Success",
              type: "success"
            });
            this.$router.push({
              path: redirect
            });
          } else {
            //测试，先跳转到about页面，主页逻辑还有问题
            this.$message.error("Reset Password error,please try again");
            this.$router.push({ name: "about" });
          }
        })
        .catch(err => {
          this.loading = false;
          this.$throw(error);
        });
    }
  }
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}

.resetPassword {
  display: flex;
  flex-direction: column;
  margin: 2% auto;
}

.logo {
  margin: 0 auto;
}

.clearfix span {
  text-align: center;
  display: block;
  font-size: 20px;
  font-weight: 300;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
}

.reset-panel {
  margin: 10px auto;
  width: 40%;
}

.reset-panel .el-input__suffix-inner {
  line-height: 40px;
  display: block;
  margin-top: 39px;
}

.el-input__suffix {
  position: absolute;
  height: 100%;
  right: 5px;
  top: 0;
  text-align: center;
  color: #c0c4cc;
  transition: all 0.3s;
  pointer-events: none;
}

.timer-button {
  color: #81aa14;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: transparent;
}

.resetButton {
  width: 100%;
}
</style>