<template>
  <div class="demo">
    <h1>过滤器</h1>
    <div>{{ content | uppercase }}</div>
    <div>{{ content | transform("capitalize") }}</div>
    <hr />
    <h1>自定义指令</h1>
    <input type="text" v-focus />
    <div class="drag" v-drag>这个div可以拖拽</div>

    <hr />
    <div>
      <h1>组件父子间通信</h1>
      <my-component v-model="content"></my-component>
      <div>{{ content }}</div>
    </div>

    <hr />
    <button @click="changePage">切换</button>
  </div>
</template>

<script>
import drag from "@/plugin/drag.js";
import MyComponet from "_com/Component1.vue";

export default {
  name: "study",
  data() {
    return {
      content: "lafanfweewfs"
    };
  },
  components: {
    "my-component": MyComponet
  },
  filters: {
    uppercase: function(value) {
      return value.toUpperCase();
    },
    transform(value, type) {
      switch (type) {
        case "uppercase":
          return value.toUpperCase();
          break;
        case "lowercase":
          return value.toLowerCase();
          break;
        case "capitalize":
          return value.charAt(0).toUpperCase() + value.substr(1);
          break;
        default:
          break;
      }
    }
  },
  directives: {
    focus: {
      inserted: el => {
        el.focus();
      }
    },
    drag: {
      inserted: el => {
        drag(el);
      }
    }
  },
  methods: {
    changePage() {
      //通过js来切换
      this.$router.push("/about");
    }
  }
};
</script>

<style lang="less" scoped>
.drag {
  position: absolute;
  width: 400px;
  height: 300px;
  background: red;
}
</style>
