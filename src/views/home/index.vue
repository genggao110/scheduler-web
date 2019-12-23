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
export default {
  name: "home",
  data() {
    return {
      contentHeight: window.innerHeight - 120 + "px"
    }
  },
  components: {
    Header,
    Footer
  },
  mounted () {
    if(window.innerHeight > 675){
      this.contentHeight = window.innerHeight - 120 + "px";
      console.log(this.contentHeight)
    }else {
      this.contentHeight = 675 - 120 + "px";
    }
  },
};
</script>

<style scoped>

*, *:after, *:before { -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; }

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
