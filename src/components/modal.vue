<template>
  <div class="modal">
    <form class="form">
      <label class="form-item">
        <span class="label-text">姓名：</span>
        <input type="text" class="form-input" v-model="modelData.name" />
      </label>
      <label class="form-item">
        <span class="label-text">外号：</span>
        <input type="text" class="form-input" v-model="modelData.nickName" />
      </label>
      <label class="form-item">
        <span class="label-text">技能：</span>
        <textarea
          v-model="skill"
          placeholder="多个技能之间用回车隔开"
          rows="4"
          class="form-input textarea"
        />
      </label>
      <div class="form-item text-center">
        <input
          type="button"
          value="提交"
          class="btn btn_blue"
          @click="submit"
        />
        <input
          type="button"
          value="取消"
          class="btn btn_gray"
          @click="cancel"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: {
    data: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      modelData: this.data
    };
  },
  computed: {
    skill: {
      get() {
        return this.modelData.skill ? this.modelData.skill.join("\n") : "";
      },
      set(val) {
        let skill = val.split("\n");
        this.modelData = {
          ...this.modelData,
          skill
        };
      }
    }
  },
  methods: {
    submit() {
      const { name, nickName, skill } = this.modelData;
      if (!name) {
        alert("请输入姓名");
        return;
      } else if (!nickName) {
        alert("请输入外号");
        return;
      } else if (!skill || !skill.join("")) {
        alert("请输入技能");
        return;
      }
      this.$emit("on-submit", this.modelData);
    },
    cancel() {
      this.$emit("on-cancel", this.modelData);
    }
  }
};
</script>

<style lang="less" scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 16px;
    border-radius: 8px;
  }
  .form-item {
    display: block;
    text-align: left;
    margin-top: 10px;
    &.text-center {
      text-align: center;
    }
    .label-text {
      margin-right: 8px;
      line-height: 32px;
      font-size: 14px;
    }
    .form-input {
      width: 240px;
      padding: 0 8px;
      background: #fff;
      border: 1px solid #d0d0d0;
      border-radius: 4px;
      height: 32px;
      line-height: 1.8;
      font-size: 14px;
      vertical-align: top;
      &.textarea {
        height: auto;
      }
    }
    .btn {
      margin: 0 4px;
    }
  }
}
</style>
