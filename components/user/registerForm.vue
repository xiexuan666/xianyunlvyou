<template>
  <!-- 1: model:指定的表单数据对象 -->
  <!-- 2: ref:用于获取dom对象 -->
  <!--3:  rules 表单验证规则 -->
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input v-model="form.captcha" placeholder="验证码">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input v-model="form.nickname" placeholder="你的名字"></el-input>
    </el-form-item>
 
    <el-form-item class="form-item" prop="password">
      <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input v-model="form.checkPassword" placeholder="确认密码" type="password"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    //   rule 当前的规则
    //   value是输入框的值
    // checkPass 执行的话 如果传入一个错误的对象,当前字段就会报错
    const validatePass = (rule, value, callback) => {
      // 这边是否为空
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        //   这边判断两个密码是否相等
        // 验证和确认密码是否一致
        if (this.form.checkPassword !== "") {
          this.$refs.form.validateField("checkPassword");
        }
        callback();
      }
    };
    // 验证确认密码
    const validatecheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 验证手机号码
    const validateusername = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请再次输入手机号码"));
      } else if (/^1[3-9][0-9]{9}$/.tset(value) == false) {
        //判断是否是手机号的正则
        callback(new Error("手机号码格式错误!"));
      } else {
        callback();
      }
    };

    return {
      // 表单数据
      form: {
        username: "",
        captcha: "",
        nickname: "",
        password: "",
        checkPassword: ""
      },
      // 表单规则
      // required:必填  message错误提示   trigger输入框失去焦点时触发的验证
      rules: {
        username: [[{ validator: validateusername, trigger: "blur" }]],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPassword: [{ validator: validatecheckPass, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送验证码功能
    handleSendCaptcha() {
      // 判断手机号不能为空
      if (this.form.username == "") {
        return;
      }
      // 调用store仓库中user模块下的发送验证码的方法
      this.$store.dispatch("user/sendCaptcha", this.form.username).then(res => {
        this.$message.success("模拟手机验证:000000");
      });
    },

    // 注册功能
    handleRegSubmit() {
      this.$refs.form.validate(valid => {
        // 表单验证全部通过
        if (valid) {
          // props是除checkPassword以外剩余的属性
          // 因为注册这边咱们不需要提交checkPassword,所以用解构的方式移除
          const { checkPassword, ...data } = this.form;
          // 调用store仓库中user模块下的注册的方法
          this.$store.dispatch("user/register", data).then(res => {
            this.$message.success("注册成功");
            // 跳转到首页
            this.$router.push("/");
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>