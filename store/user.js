//固定的属性，必须要export暴露出去的
export const state = {
    // name:'我的名字'
    //用户信息，来自于登录之后返回的数据
    userInfo:{
        user:{}
    }
}
//固定的属性，修改state中的值
export const mutations = {
    //函数名自定义
    //第一个参数必须是state，第二个参数调用时候传入的参数
    setUserInfo(state,data){
        state.userInfo=data;
    }
}

// 固定属性 异步修改state中的值的方法,一般放接口的请求
export const actions = {
     
  // 登录的方法
  // 第一个参数必须是store 第二个参数是调用传入的参数
  login(store, data) {
    //   提交登录接口
    // 用return是因为这边返回的是一个promise
    return this.$axios({
      url: "/accounts/login",
      method: "POST",
      data
    }).then(res => {
      // data是要保存到userInfo中的
      const { data } = res;
      // 调用commit保存数据到state
      store.commit("setUserInfo", data);
    });
  },

  // 注册的方法
  register(store, data) {
          // 调用接口
   return this.$axios({
      url: "/accounts/register",
      method: "POST",
      data
    }).then(res => {
     // data是要保存到userInfo中的
     const { data } = res;
     // 调用commit保存数据到state
     store.commit("setUserInfo", data);
    });
  },

  // 发送手机的验证码  data是手机号码的字符串
  sendCaptcha(store, data) {
    return this.$axios({
      url: "/captchas",
      method: "POST",
      data: {
        tel: data
      }
    }).then(res =>{
      return res
    })
  }
};