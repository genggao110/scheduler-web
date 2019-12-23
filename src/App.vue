<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
//标准vue-base
export default {
  props: [
    //继承父组件数据
  ],
  data() {
    return {
      //该组件的数据
    };
  },
  watch: {
    //观察数据的变化
  },
  computed: {
    //属性的一个实时计算，当属性发生改变，会进行计算
  },
  methods: {
    //组件的方法
  },
  filter: {
    //过滤器
  },
  beforeRouteUpdate() {
    //在当前路由改变和该组件被复用时调用
  },
  created() {
    //调用该函数时，data和method已经构建完成
    //在Vue1.0中起到初始化数据的作用
    //在Vue2.0之后推荐使用computed进行数据初始化

    console.log(
      "%cOpenGMS",
      " text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em"
    );
  },
  mounted() {
    //调用该函数时，el已经构建完成
    //在这里发起后端请求，拿回数据
  },
  components: {}
};
</script>

<style>
body {
  margin: 0px;
}
</style>
