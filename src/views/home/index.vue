<template>
  <div class="container">
    <Header></Header>
    <section class="content" :style="{minHeight: contentHeight}">
      <router-view></router-view>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "_com/headers/MyHeader.vue";
import Footer from "_com/footers/MyFooter.vue";
import { get } from "@/request/http.js";
export default {
  name: "home",
  data() {
    return {
      contentHeight: window.innerHeight - 120 + "px"
    };
  },
  components: {
    Header,
    Footer
  },
  methods: {
    initUser() {
      let name = localStorage.getItem("name");
      get(`/user/get?name=${name}`)
        .then(result => {
          //请求成功的话，要把信息存入到store
          console.log(result);
          this.$store.dispatch("User/handleUpdateUser", result);
        })
        .catch(err => {
          this.$throw(err);
        });
    },
    reSize() {
      if (window.innerHeight > 675) {
        this.contentHeight = window.innerHeight - 120 + "px";
      } else {
        this.contentHeight = 675;
      }
    }
  },
  mounted() {
    if (window.innerHeight > 675) {
      this.contentHeight = window.innerHeight - 120 + "px";
    } else {
      this.contentHeight = 675 - 120 + "px";
    }
    //TODO 存在token但是token可能已经过期了(token一定存在)，为此需要进行验证，后期考虑将该功能抽出来成为公共模块
    if (localStorage.getItem("token") != "" && localStorage.getItem("name")) {
      //发起http请求
      this.initUser();
    }
    window.addEventListener("resize", this.reSize);
  }
};
</script>

<style scoped>
*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.content {
  flex: 1 0 auto;
  margin-top: 60px;
}

.drag {
  margin: 40px 40px;
  position: absolute;
  width: 400px;
  height: 300px;
  background: red;
}
</style>
