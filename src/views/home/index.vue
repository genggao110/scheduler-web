<template>
  <div class="home" id="home">
    <img alt="Vue log" src="../../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "_com/HelloWorld.vue";
export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>

<style scoped>
#home {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>