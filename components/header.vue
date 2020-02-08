<template>
  <header class="header">
       <el-row type="flex" justify="space-between" class="main">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
        <img src="/logo.jpg" alt />
        </nuxt-link>
      </div>
      <!-- 菜单栏 -->
      <el-row type="flex" class="navs">
          <nuxt-link to="/">首页</nuxt-link>
          <nuxt-link to="/post">旅游攻略</nuxt-link>
           <nuxt-link to="/hotel">酒店</nuxt-link>
            <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 登录用户信息 -->
      <el-row type="flex" align="middle"> 
          <el-dropdown v-if="false">
              <el-row type="flex" align="middle" class="el-dropdow-link">
                  <nuxt-link to="#">
                      <img src="https://www.qzone.cc/qqtouxiang/nvsheng/2959229.html"/>
                      用户名
                  </nuxt-link>
                  <i class="el-icon-caret-bottom el-icon--right"></i>
              </el-row>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdow-item>
                      <nuxt-link to="#">个人中心</nuxt-link>
                  </el-dropdow-item>
                  <el-dropdown-item>
                      <div @click="handleLogout">退出</div>
                  </el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
          <nuxt-link to="/user/login" class="account-link" >登录/注册</nuxt-link>  
      </el-row>
       </el-row>
  </header>
</template>

<script>
export default {
   mounted(){
       //测试打印仓库中的数据
       //this.$store.state代表是整个大的仓库，user是模块名字，name模块下的数据
       console.log(this.$store.state.user.name);
       
   }
}
</script>

<style scopend lang='less'>
.header{
    height: 60px;
    line-height: 60px;
    background: #fff;
    border-bottom: 1px solid #ddd;

}
.main{
    width: 1000px;
}
.logo{
    width: 156px;
    padding-top: 8px;
    img{
       display: block;
       width: 100%;
    }
}
.navs{
    margin: 0 20px;
    flex: 1;

    a{
        display: block;
        padding: 0 20px;
        height: 60px;
        box-sizing: border-box;

        &:hover,:focus,&active {
            border-bottom: 5px solid #409eff;
            color: #409eff;
        }
    }
    /deep/.nuxt-link-exact-active {
        background: #409eff;
        color: #fff!important;
    }
}
.message{
    height: 36px;
    line-height: 1;
    cursor: pointer;
    .el-icon-bell{
        margin-right: 2px;
        font-size: 18px;
    }
}
.el-dropdown-link{
    margin-left: 20px;

    &.hover {
        img {
            border-color: #409eff;
        }
    }
    a{
        display: block;
    }
    img {
        width: 32px;
        height: 32px;
        vertical-align:middle;
        border: 2px #fff solid;
        border-radius: 50px;
    }
}
.account-link{
    font-size: 14px;
    margin-left: 10px;
    color: #666;
    &:hover{
        color: #409eff;
        text-decoration: underline;
    }
}

</style>