<template>
  <div>
    <input type="text" v-model="val" />
    <button @click="submit">提交</button>
  </div>
</template>

<script>
export default {
  name: "Component",
  props: ["msg"],
  model: {
    prop: "text",
    event: "on-callback"
  },
  data() {
    return {
      val: this.msg
    };
  },
  methods: {
    submit() {
      // val返回给父组件
      this.$emit("on-callback", this.val);
    }
  }
};
</script>

<style lang="less" scoped></style>
