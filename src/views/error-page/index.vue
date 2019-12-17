<template>
  <div class="error404">
    <div class="error404-body-con">
      <div>
        <div class="error404-body-con-title">4 0 4</div>
        <p class="error404-body-con-message">
          YOU&nbsp;&nbsp;LOOK&nbsp;&nbsp;LOST
        </p>
        <div class="error404-btn-con">
          <el-button type="primary" @click="goHome" style="width: 200px;" plain>
            返回首页
          </el-button>
          <el-button
            type="primary"
            @click="backPage"
            style="width: 200px;margin-left: 40px"
            plain
          >
            返回上一页
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "error-page",
  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.push({
        name: "home"
      });
    },
    backPage() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.error404 {
  &-body-con {
    width: 700px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    &-title {
      text-align: center;
      font-size: 240px;
      font-weight: 700;
      color: #2d8cf0;
      height: 260px;
      line-height: 260px;
      margin-top: 40px;
      span {
        display: inline-block;
        color: #19be6b;
        font-size: 230px;
        animation: error404animation 3s ease 0s infinite alternate;
      }
    }
    &-message {
      display: block;
      text-align: center;
      font-size: 30px;
      font-weight: 500;
      letter-spacing: 12px;
      color: #dddde2;
    }
  }
  &-btn-con {
    text-align: center;
    padding: 20px 0;
    margin-bottom: 40px;
  }
}
</style>
