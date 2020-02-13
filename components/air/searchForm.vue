<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions:  监听输入框的输入,然后我们可以在这个事件中请求API数据 -->
        <!-- select 点击选中建议项时触发 -->
        <!-- blur 失焦默认选中第一个 -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          @blur="handleDepartBlur"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          @blur="handleDestBlur"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          :picker-options="pickerOptions"
          v-model="form.departDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
// 时间转换的工具
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,

      // 表单的字段
      form: {
        departCity: "", //出发的城市
        departCode: "", //出发城市的代码
        destCity: "", //到达的城市
        destCode: "", //到达城市的代码
        departDate: "" //日期字符串
      },
      //   出发城市的列表
      departData: [],
      //   到达城市的列表
      destData: [],
      //日期可选配置
      pickerOptions:{
        disabledDate(time){
          return time.getTime()+ 3600 * 1000 * 24 < Date.now();
        }
      }
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
        if(index ==1){
             this.$alert('暂不支持往返', '提示', {
          confirmButtonText: '确定',
          type:"warning"
             })``
        }
    },

    // 监听出发城市 输入框获得焦点时触发
    // value 是输入框的值，cb是可以接收数组,把数组列表展示出来
    queryDepartSearch(value, cb) {
      // 如果输入框没有值就返回
      if (!value) {
        //（bug1） 如果value是空的就把原来的城市列表清空
        this.departData =[];
        //（bug2） 调用cb传入空数组,不会出现空白的加载中的下拉面板
          cb([])
        return;
      }
      // 根据value请求列表
      this.$axios({
        url: "/airs/city",
        // axios的get请求参数就使用params  post的话就使用data
        params: {
          name: value
        }
      }).then(res => {
        // data是一个数组,数组中的对象是没有value值的 然后一定套有value属性 只能用转换
        const { data } = res.data;

        // 给data每一项都添加value属性 (forEach,数组的map循环方法)
        // replace:替换的意思  这边把市替换为空
        const newData = data.map(v => {
          v.value = v.name.replace("市", "");
          // map返回的数组由return组成的
          return v;
        });
        console.log(newData);

        // 把newData保存到departData
        this.departData = newData;
        // cb把数组展示到列表中,数组中每一项必须是对象,对象中必须是value属性
        cb(newData);
      });
    },

    // 出发城市输入框失焦时触发
    handleDepartBlur() {
      if (this.departData.length === 0) {
        return;
      }
      this.form.departCity = this.departData[0].value;
      this.form.departCode = this.departData[0].sort;
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
    },

    // 到达目标城市
    queryDestSearch(value, cb) {
      if (!value) {
          //（bug1） 如果value是空的就把原来的城市列表清空
        this.destData =[];
        //（bug2） 调用cb传入空数组,不会出现空白的加载中的下拉面板
          cb([])
        return;
      }
      //   根据value请求城市列表
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;

        const newData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        // 把newData保存到departData
        this.destData = newData;
        cb(newData);
      });
    },

    // 到达城市输入框失去焦点默认选中第一个城市
    handleDestBlur() {
      if (this.destData.length === 0) {
        return;
      }
      //   默认选中第一个城市
      this.form.destCity = this.destData[0].value;
      this.form.destCode = this.destData[0].sort;
    },

    // 到达目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
    },

    // 确认选择日期时触发
    // value是一个时间的对象
    handleDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    //   console.log(moment(value).format("YYYY-MM-DD"));
    },

    // 触发和目标城市切换时触发
    handleReverse() {
        const {departCity,departCode,destCity,destcode} = this.form
        this.form.departCity =destCity
        this.form.departCode =destcode

        this.form.destCity =departCity
        this.form.destcode =departCode

    },

    // 提交表单是触发
    handleSubmit() {

        if(!this.form.departCity){
            this.$message.error("请输入出发城市")
            return;
        }

    if(!this.form.destCity){
            this.$message.error("请输入到达城市")
            return;

        }
        if(!this.form.departDate){
            this.$message.error("请输入时间")
            return;

        }


      //   console.log(this.form);
      // 跳转到/air/flights 保证该页面url参数有5个参数
      this.$router.push({
        path: "/air/flights",
        // query是url的参数
        query: this.form
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
