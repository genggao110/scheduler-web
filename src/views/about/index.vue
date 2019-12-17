<template>
  <div class="demo">
    <h1>案例</h1>
    <div style="text-align: left; margin-bottom: 10px">
      <input class="btn" type="button" value="新增用户" @click="addUser" />
    </div>
    <table class="table">
      <tr>
        <th>姓名</th>
        <th>外号</th>
        <th>技能</th>
        <th>操作</th>
      </tr>
      <tr v-for="(user, index) of userList" :key="user.id">
        <td>{{user.name}}</td>
        <td>{{user.nickName}}</td>
        <td>
          <span class="tag" v-for="(skill, skillIndex) in user.skill" :key="skillIndex">{{skill}}</span>
        </td>
        <td>
          <a href="javascript:;" @click="editUser(user, index)">编辑</a>
          <a href="javascript:;" @click="deleteUser(index)">删除</a>
        </td>
      </tr>
    </table>
    <div class="modal" v-show="isShow">
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
          <textarea v-model="skill" placeholder="多个技能之间用回车隔开" rows="4" class="form-input textarea" />
        </label>
        <div class="form-item text-center">
          <input type="button" value="提交" class="btn btn_blue" @click="submit" />
          <input type="button" value="取消" class="btn btn_gray" @click="cancel" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      isShow: false,
      modelData: {},
      userIndex: -1,
      userList: [
        {
          id: 1562725945741,
          name: "欧阳峰",
          nickName: "西毒、老毒物",
          skill: ["蛤蟆功", "灵蛇杖法"]
        },
        {
          id: 1562726132751,
          name: "洪七公",
          nickName: "北丐、老叫花",
          skill: ["降龙十八掌", "打狗棒法"]
        },
        {
          id: 1562726139582,
          name: "黄药师",
          nickName: "东邪、黄老邪",
          skill: ["弹指神通", "碧海潮生曲"]
        },
        {
          id: 1562725945190,
          name: "段智兴",
          nickName: "南帝、一灯大师",
          skill: ["一阳指", "先天功"]
        }
      ]
    };
  },
  methods: {
    editUser(user, index) {
      this.isShow = true;
      this.modelData = { ...user };
      this.userIndex = index;
    },
    deleteUser(index) {
      if (window.confirm("是否确认删除?")) {
        this.userList.splice(index, 1);
      }
    },
    cancel() {
      this.isShow = false;
      this.modelData = {};
      this.userIndex = -1;
    },
    submit() {
      const { name, nickName, skill } = this.modelData;
      if (!name) {
        alert("请输入姓名");
        return;
      } else if (!nickName) {
        alert("请输入外号");
        return;
      } else if (!skill || !skill.join('')) {
        alert("请输入技能");
        return;
      }
      if (this.userIndex === -1) {
        //新增
        this.modelData = {
            ...this.modelData,
            id: Date.now()
        }
        this.userList.unshift(this.modelData);
        this.cancel();
      } else {
        this.userList.splice(this.userIndex, 1, this.modelData);
        this.cancel();
      }
    },
    addUser() {
      this.isShow = true;
    }
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
        console.log(this.modelData);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  font-size: 32px;
  color: blue;
}
.btn {
  border: none;
  height: 32px;
  line-height: 32px;
  padding: 0 16px;
  border-radius: 16px;
  cursor: pointer;
  outline: none;
  &.btn_blue {
    color: #fff;
    background: #00f;
  }
  &.btn_gray {
    color: #333;
    background: #e0e0e0;
  }
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
</style>
