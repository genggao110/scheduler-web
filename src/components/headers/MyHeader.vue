<template>
  <el-header>
    <img src="../../assets/images/OGMS.png" id="logo" @click="goHome" />
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
        v-if="!userState">
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
        v-if="userState">
        <el-Menu-item index="1" name="notification">
          <el-badge :value="unreadNoticeCount" class="item" id="noticeBadge" type="primary">
            <i class="el-icon-message-solid" style="font-size:25px;margin-bottom:21px"></i>
          </el-badge>
        </el-Menu-item>
        <el-Menu-item index="2" name="personal" style="width:100px">
          <el-dropdown placement="bottom-start" @command="changeSelect">
            <div class="avatar-person">
              <img :src="avatar" v-if="avatar!==''&&avatar!==undefined&&avatar!==null" :title="userName">
              <avatar :username="userName" :size="40" style="margin-top:10px" :title="userName" v-else></avatar>
            </div>
            <el-dropdown-menu slot="dropdown" trigger="click">
              <el-dropdown-item command="space">Personal Space</el-dropdown-item>
              <el-dropdown-item command="github">Project Address</el-dropdown-item>
              <el-dropdown-item divided command="logout">Log Out</el-dropdown-item>
            </el-dropdown-menu>    
          </el-dropdown>
        </el-Menu-item>
      </el-Menu>
    </div>
  </el-header>
</template>

<script>
import Avatar from "vue-avatar";
import { mapState, mapGetters } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      //TODO 后期需要从父组件进行传递值，先尝试放在这里
      unreadNoticeCount: 1
    };
  },
  mounted() {},
  computed: {
    ...mapGetters('User', [
      'userState',
      'userName',
      'email'
    ]),
    avatar() {
      // 后期用户注册添加头像功能后实现
      return '';
    }
  },
  components: {
    Avatar,
  },
  methods: {
    goHome() {
      this.$router.push({name: "Home"});
    },
    changeSelect(name) {
      switch (name) {
        case 'space':
          console.log(name);
          break;
        case 'github': 
          console.log(name);
          break;
        case 'logout': 
          this.$store.dispatch("User/handleLogOut");
          this.$router.push({name: "login"});
        default: 
          console.log("飘逸到火星去了");
      }
    }
  },
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

.item {
  margin-top: 17px;
}


.avatar-person {
  width:40px;
  height:40px;
  vertical-align: middle;
  margin-bottom: 13px;
}
</style>