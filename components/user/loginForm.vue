<template>
  <el-form 
  :model="form" 
  ref="form" 
  :rules="rules" 
  class="form">
      <!-- 校验用户名 -->
    <el-form-item class="form-item" prop='username'>
      <el-input 
      v-model="form.username"
      placeholder="用户名/手机">
      </el-input>
    </el-form-item>
     <!-- 校验密码 -->
    <el-form-item class="form-item"  prop='password'>
      <el-input
        v-model="form.password"
        placeholder="密码"
        type="password"
      ></el-input>
    </el-form-item>
     <!-- 忘记密码 -->
    <p class="form-text">
        <nuxt-link to="#">忘记密码</nuxt-link>
        </p>
        <!-- 不存在用户信息展示登录注册连接 -->
        <nuxt-link to="/user/login" class="account-link"   >
        </nuxt-link>
        {{$store.state.user.userInfo.user.nickname}}
    <el-button 
    class="submit" 
    type="primary" 
    @click="handleLoginSubmit">
      登录
    </el-button>
  </el-form>
</template>

<script>
export default {
  data() {
      //校验的函数
      const validateUsername = (rule,value,callback)=>{
          //通过value校验到底是否是手机号码，true的的话表示通过，false就不通过
          const isValid = /^1[3-9][0-9]{9}$/.test(value);

          //不是手机号码报错
          if(!isValid){
              callback(new Error("手机号码格式错误"))
          }else {
              //通过
              callback();
          }
      };
    return {
      //表单数据
      form: {
        username: "",
        password: ""
      },
      //表单规则
      rules: {
          username:[
              //validator  是自定义的校验函数
              {validator:validateUsername, trigger:'blur'}
          ],
          password:[
              {
                  required:true,message:'密码不能为空',trigger:'blur'
              }
          ]
      }
    }
  },
  methods: {
    //提交登录
    handleLoginSubmit() {
      //valid是全部字段验证通过才会返回true
      this.$refs.form.validate(valid=>{
          if(valid){
              this.$axios({
                  url:"/accounts/login",
                  method:"POST",
                  data:this.form
              }).then(res=>{
                  const {data} =res;
                  //保存到本地
                  localStorage.setItem("store",JSON.stringify(data));
                  //通过commit调用mutations中的方法
                  this.$store.commit('user/setUserInfo',data);

                  //跳转到首页
                  //this.$router.push("/")
              })
          }
      })
    }
  }
}
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
