<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <div>
          <!-- 航班列表 -->
          <FlightsItem
            v-for="(item, index) in dataList"
            :key="index"
            :data="item"
          />

          <!-- 分页 -->
            <!-- size-change：切换条数时候触发 -->
            <!-- current-change：选择页数时候触发 -->
            <!-- current-page: 当前页数 -->
            <!-- page-size：当前条数 -->
            <!-- total：总条数 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-sizes="[5,10,15,20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
export default {
  data() {
    return {
      flightsData: {}, //航班总数据
      pageIndex:1, //当前页数
      pageSize:5, //显示条数
       total:0    //总条数
    };
  },
  computed:{
      dataList(){
          if(!this.flightsData.flights){
              //没有值返回一个空数组
              return[];
          }

          //第一页是0-5， 第二页是5-10 ， 第三页是10-15 
          const arr = this.flightsData.flights.slice(
              (this.pageIndex - 1) * this.pageSize,
              this.pageIndex * this.pageSize
          );
          return arr;
      }
  },
  methods: {
    //切换条数触角的事件
    handleSizeChange(index){
      this.pageSize = index
    },
    //切换页面时候触发的时间
    handleCurrentChange(index) {
      console.log(index);
      this.pageIndex = index 
    }
  },
  mounted(){
      //请求机票列表书库
      this.$axios({
          url:"/airs",
          params:this.$route.query
      }).then(res=>{
          //总数据
          this.flightsData = res.data;
          //修改总条数
          this.total = this.flightsData.total;
      });
  },
  components: {
    FlightsListHead,
    FlightsItem
  },
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>
