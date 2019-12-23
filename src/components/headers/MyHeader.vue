<template>
  <el-header>
    <img src="../../assets/images/OGMS.png" id="logo" />
    <div class="navPart">
      <h1>Integrate Modeling Scene</h1>
    </div>
    <div class="userState">
      <el-Menu
        class="el-menu-userState"
        mode="horizontal"
        background-color="#545c64"
        active-text-color="#ffd04b"
        text-color="#fff"
        v-show="!userState">
        <el-Menu-item index="1" name="login">
          <span>Login</span>
        </el-Menu-item>
        <el-Menu-item index="2" name="register">
          <span>Sign up</span>
        </el-Menu-item>
      </el-Menu>
      <el-Menu
        class="el-menu-userState"
        mode="horizontal"
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        v-show="userState">
        <el-Menu-item index="1" name="notification">
          <el-badge :value="12" class="item">
            <el-button class="share-button" type="primary" icon="el-icon-message-solid" circle></el-button>
          </el-badge>
        </el-Menu-item>
        <el-Menu-item index="2" name="personal" style="width:100px">
          <el-dropdown placement="bottom-start">
            <div>
              <el-avatar src="../../assets/logo.png"></el-avatar>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Log Out</el-dropdown-item>
            </el-dropdown-menu>    
          </el-dropdown>
        </el-Menu-item>
      </el-Menu>
    </div>
  </el-header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      
    };
  },
  mounted() {},
  computed: {
    userState() {
      return false;
    },
    userName() {
      return "wangming";
    }
  }
};
</script>

<style lang="less" scoped>
#logo {
    position: absolute;
    width: 129px;
    height: 40px;
    z-index: 1;
    margin-top: 5px;
    margin-left: 1.5%;
    cursor: pointer;
}
header {
  height: 60px;
  top: 0;
  z-index: 100;
  position: absolute;
  width: 100%;
  flex: 0 0 auto;
  position: absolute;
  min-width: 1200px;
  background: #545c64
}

.navPart {
  text-align: center;
  margin-top: -12px;
}

.navPart h1 {
  color: #e0dede;
}

.userState {
  position: absolute;
  margin-left: 85%;
  top: 0px;
  z-index: 1;
}
</style>